import React, { useState } from 'react'

import Login from '../components/login/Login.jsx'
import Register from '../components/register/Register.jsx'

import './AuthPage.scss'

export default function AuthPage() {

    const [authDisplay, setAuthDisplay] = useState('login');

    function handleAuthDisplayChange (display = 'login') {
        setAuthDisplay(display)
    }


  return (
        <div className="auth-container">
            {authDisplay === 'login'
                ? <Login NavigateToRegister={() => handleAuthDisplayChange('register')} />
                : <Register NavigateToLogin={() => handleAuthDisplayChange('login')}/>}
        </div>
    )
}
