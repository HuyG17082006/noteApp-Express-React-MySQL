import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import './Login.scss'

import authService from '../../services/authService.js';
import { validateLogin } from '../../validate/auth.validate.js';
import useLockAction from '../../hooks/useLockAction.js';

import { NotiContext } from '../../context/notiProvider/NotiProvider.jsx';

import eyeOpenIcon from '../../assets/icon/eye-solid.svg';
import eyeClosedIcon from '../../assets/icon/eye-closed.svg';

const DELAY_LOGIN_BUTTON = 1000;

export default function Login({ NavigateToRegister }) {

    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({});

    const { addNoti } = useContext(NotiContext);


    const [user, setUser] = useState({
        username : '',
        password : ''
    })

    const navigate = useNavigate();

    const handleInput = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const login = async (user) => {

        const { isValid, errors } = validateLogin(user);

        if (!isValid) {
            setErrors(errors);
            return;
        }

        const { isOk, message, data } =  await authService.login(user);

        if (!isOk) {
            addNoti(message, 'error');
            return;
        }

        addNoti(message, 'success');
        navigate('/notes');
    }

    const { runFunc, isLocked } = useLockAction(() => login(user), DELAY_LOGIN_BUTTON);


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
