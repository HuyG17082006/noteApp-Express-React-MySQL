import React from 'react'
import authStore from '../store/authStore.js'
import { Navigate } from 'react-router'

export default function ProtectedRoute({ children }) {
    
    const token = authStore.getToken();

    if (!token) {
        alert('Bạn chưa đăng nhập hoặc token hết hạn')
        return <Navigate to={"/auth"} replace/>
    }
  
    return (
    children
  )
}
