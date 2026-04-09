import React, { useState } from 'react'
import './Register.scss'

import authService from '../../services/authService.js';
import { validateRegister } from '../../validate/auth.validate.js';

import eyeOpenIcon from '../../assets/icon/eye-solid.svg';
import eyeClosedIcon from '../../assets/icon/eye-closed.svg';



function Register({ NavigateToLogin }) {

    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({});

    const [user, setUser] = useState({
        username: '',
        password: '',
        email: ''
    })

    const handleInput = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const register = async (user) => {
        const { isValid, errors } = validateRegister(user);

        if (!isValid) {
            setErrors(errors);
            return;
        }

        const { isOk, message } = await authService.register(user);

        if (!isOk) {
            alert(message);
            return;
        }

        alert(message);
        navigate('/notes');

    }

    return (
        <div className='Register'>

            <div className='header'>
                <h2>Đăng ký</h2>
            </div>

            <div className='body'>

                <div className='input__group'>
                    <label>Tên đăng nhập</label>
                    <input
                        name='username'
                        type="text"
                        onChange={handleInput}
                    />
                    <span>{errors.username}</span>
                </div>

                <div className='input__group'>
                    <label>Tên đăng nhập</label>
                    <input
                        name='email'
                        type="text"
                        onChange={handleInput}
                    />
                    <span>{errors.email}</span>
                </div>

                <div className='input__group password'>
                    <label>Mật khẩu</label>
                    <input
                        name='password'
                        type={
                            showPassword ? 'text' : "password"
                        }
                        onChange={handleInput}
                    />
                    <img
                        src={
                            showPassword ? eyeOpenIcon : eyeClosedIcon
                        }
                        alt="Ẩn / hiện mật khẩu"
                        onClick={handleShowPassword}
                    />
                    <span>{errors.password}</span>
                </div>

            </div>

            <div className='footer'>
                <button onClick={() => register(user)}>Đăng ký</button>

                <span onClick={NavigateToLogin}>Đăng nhập</span>
            </div>
        </div>
    )
}

export default Register