import React from 'react'
import { Navigate } from 'react-router';
import { useState, useEffect } from 'react';

import authService from '../services/authService.js';
import authStore from '../store/authStore.js';

export default function ProtectedRoute({ children }) {

	const [isAuth, setIsAuth] = useState(null);

	useEffect(() => {
		const checkAuth = async () => {

			const token = authStore.getToken();

			if (token) {
				setIsAuth(true);
				return null;
			}
			
			const { isOk, data } = await authService.refresh();

			if (isOk) {
				authStore.setToken(data.accessToken);
				setIsAuth(true);
			}
			else
				setIsAuth(false);
		}
		checkAuth();
	}, [])

	if (isAuth === null)
		return null;

	if (!isAuth) {
		return <Navigate to="/auth" replace />;
	}

	if (isAuth)
		return children
}
