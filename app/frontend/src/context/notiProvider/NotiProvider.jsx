import React, { createContext, useState } from 'react'

import Notification from '../../components/notification/Notification.jsx';
import { useEffect } from 'react';

const NotiContext = createContext()

import { NOTIFICATION_DURATION } from '../../utils/constant.js';

import './NotiProvider.scss';

export default function NotiProvider({ children }) {

    const [notifications, setNotifications] = useState([]);

    const addNoti = (message, type = 'success', time = NOTIFICATION_DURATION) => {
        const id = Date.now()

        setNotifications(prev => [
            ...prev,
            {
                id,
                message,
                type,
                time
            }
        ])

        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, time);
    }

    return (
        <NotiContext.Provider value={{ notifications, setNotifications, addNoti }}>
            {children}

            <div className='noti-container'>
                {
                    notifications.map(({ id, type, message, time }) => (
                        <Notification key={id} type={type} message={message} time={time} />
                    ))
                }
            </div>
        </NotiContext.Provider>
    )
}

export { NotiContext }