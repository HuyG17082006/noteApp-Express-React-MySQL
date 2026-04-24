import React, { useContext } from 'react'
import { replace, useNavigate } from 'react-router'

import { NotiContext } from '../context/notiProvider/NotiProvider.jsx';

import { validateLogin, validateRegister } from '../validate/auth.validate.js'

import authService from '../services/authService.js'
import authStore from "../store/authStore.js";

export default function useAuth({ setErrors = () => {}, setAuthDisplay = () => {}}) {
    const { addNoti } = useContext(NotiContext);

    

    const navigate = useNavigate();

    const login = async (user) => {

        const { isValid, errors } = validateLogin(user);

        if (!isValid) {
            setErrors(errors);
            return;
        }

        const { isOk, message, accessToken } = await authService.login(user);

        if (!isOk) {
            addNoti(message, 'error');
            return;
        }

        authStore.setToken(accessToken);

        addNoti(message, 'success');
        navigate('/notes');
    }
    
    const register = async (user) => {
        const { isValid, errors } = validateRegister(user);

        if (!isValid) {
            setErrors(errors);
            return;
        }

        const { isOk, message } = await authService.register(user);

        if (!isOk) {
            addNoti(message, 'error');
            return;
        }

        addNoti(message, 'success');
        setAuthDisplay('login');
    }

    const logout = async () => {

        const { isOk, message } = await authService.logout();

        if (!isOk) {
            addNoti(message, 'error');
            return;
        }

        authStore.deleteToken();

        addNoti(message, 'success');

        navigate('/auth', replace)

    }

    return {
        login,
        register,
        logout
    }
}
