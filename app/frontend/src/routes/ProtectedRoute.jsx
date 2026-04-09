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
				return;
			}
			
			const { isOk } = await authService.refresh();

			if (isOk) {
				setIsAuth(true);
			}
			else
				setIsAuth(false);
		}
		checkAuth();
	}, [])

	if (isAuth === null)
		return;

	if (!isAuth) {
		return <Navigate to="/auth" replace />;
	}

	return (
		children
	)
}
