import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router'

import Login from '../components/authPage/login/Login.jsx'
import Register from '../components/authPage/register/Register.jsx'

import useLockAction from '../hooks/useLockAction.jsx'

import useAuth from '../hooks/useAuth.jsx'

import './AuthPage.scss'

const DELAY_BUTTON_TIME = 1000;

export default function AuthPage() {

    const {
        login,
        register
    } = useAuth();

    const [authDisplay, setAuthDisplay] = useState('login');

    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({});

    const [user, setUser] = useState({
        username: '',
        password: '',
        email: ''
    })

    useEffect(() => {
        setUser({})
        setErrors({})
        setShowPassword(false)
    }, [authDisplay])

    const handleAuthDisplayChange = (display = 'login') => {
        setAuthDisplay(display)
    }

    const navigate = useNavigate();

    const handleInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const { runFunc, isLocked } = useLockAction(authDisplay === 'login' ? () => login(user) : () => register(user), DELAY_BUTTON_TIME);

    return (
        <div className="auth-container">
            {authDisplay === 'login' ?
                <Login
                    NavigateToRegister={() => handleAuthDisplayChange('register')}
                    errors={errors}
                    handleInput={handleInput}
                    handleShowPassword={handleShowPassword}
                    showPassword={showPassword}
                    runFunc={runFunc}
                    isLocked={isLocked}
                />
                : 
                <Register 
                    NavigateToLogin={() => handleAuthDisplayChange('login')}
                    errors={errors}
                    handleInput={handleInput}
                    handleShowPassword={handleShowPassword}
                    showPassword={showPassword}
                    runFunc={runFunc}
                    isLocked={isLocked}
                />
            }
        </div>
    )
}
