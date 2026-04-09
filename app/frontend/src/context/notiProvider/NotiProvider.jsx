import React, { createContext, useState } from 'react'

import Notification from '../../components/notification/Notification.jsx';
import { useEffect } from 'react';

const NotiContext = createContext()

import './NotiProvider.scss';

export default function NotiProvider({ children }) {

    const [notifications, setNotifications] = useState([]);

    const addNoti = (message, type = 'success') => {
        setNotifications(prev => [
            ...prev,
            {
                id: Date.now(),
                message,
                type,
                createdAt: Date.now(),
                duration: 3000
            }
        ])
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();

            setNotifications(prev =>
                prev.filter(n => now - n.createdAt < n.duration)
            )
        }, 500)

        return () => clearInterval(interval);
    }, [])

    return (
        <NotiContext.Provider value={{ notifications, setNotifications, addNoti }}>
            {children}

            <div className='noti-container'>
                {
                    notifications.map(({ id, type, message, duration }) => (
                        <Notification key={id} type={type} message={message} time={duration} />
                    ))
                }
            </div>
        </NotiContext.Provider>
    )
}

export { NotiContext }