import React, { useState } from 'react'
import './Login.scss'

import eyeOpenIcon from '../../../assets/icon/eye-solid.svg';
import eyeClosedIcon from '../../../assets/icon/eye-closed.svg';

export default function Login({ NavigateToRegister, handleInput, errors, runFunc, isLocked, handleShowPassword, showPassword }) {


    return (
        <div className='Login'>
            
            <div className='header'>
                <h2>Đăng nhập</h2>
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
                <button onClick={runFunc} disabled={isLocked}>Đăng nhập</button>

                <span onClick={NavigateToRegister}>Đăng ký</span>
            </div>
        </div>
    )
}
