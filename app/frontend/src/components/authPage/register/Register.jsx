import React, { useState } from 'react'
import './Register.scss'

import eyeOpenIcon from '../../../assets/icon/eye-solid.svg';
import eyeClosedIcon from '../../../assets/icon/eye-closed.svg';

function Register({ NavigateToLogin, handleInput, showPassword, handleShowPassword, errors, runFunc, isLocked }) {

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
                    <label>Email</label>
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
                <button onClick={runFunc} disabled={isLocked}>Đăng ký</button>

                <span onClick={NavigateToLogin}>Đăng nhập</span>
            </div>
        </div>
    )
}

export default Register