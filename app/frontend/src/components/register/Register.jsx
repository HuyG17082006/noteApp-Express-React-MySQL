import React, { useState } from 'react'

import eyeOpenIcon from '../../assets/icon/eye-solid.svg';
import eyeClosedIcon from '../../assets/icon/eye-closed.svg';

import './Register.scss'

function Register({ NavigateToLogin }) {

    const [showPassword, setShowPassword] = useState(false);
    
        const [user, setUser] = useState({
            username : '',
            password : '',
            email : ''
        })
    
        function handleInput (e) {
            setUser({
                ...user,
                [e.target.name] : e.target.value
            })
        }
    
        function handleShowPassword() {
            setShowPassword(!showPassword);
        }
    
        function register () {
    
            
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
                        <span></span>
                    </div>

                    <div className='input__group'>
                        <label>Tên đăng nhập</label>
                        <input 
                            name='email'
                            type="text" 
                            onChange={handleInput}
                        />
                        <span></span>
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
                        <span>asd</span>
                    </div>
    
                </div>
    
                <div className='footer'>
                    <button>Đăng ký</button>
    
                    <span onClick={NavigateToLogin}>Đăng nhập</span>
                </div>
            </div>
        )
}

export default Register