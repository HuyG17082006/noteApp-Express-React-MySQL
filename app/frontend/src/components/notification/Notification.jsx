import React, { useContext } from 'react'

import './Notification.scss'

import { NOTIFICATION_CONFIG } from '../../utils/constant';

export default function Notification({ type, message, time }) {


    let notiStyle = NOTIFICATION_CONFIG[type.toLowerCase()];

    return (
        (
            <div
                className='Notification'
                style={{
                    background: notiStyle.background_color,
                    border: `1px solid ${notiStyle.border_color}`,
                    animation: `flyup ${time}ms linear forwards`
                }}
            >
                <div
                    className='Notification-icon'
                    style={{
                        background: `url(${notiStyle.icon}) center / 24px no-repeat`
                    }}
                />

                <div
                    className='Notification-message'
                    style={{ color: notiStyle.color }}
                >
                    <h3>{notiStyle.title}</h3>
                    <p>{message}</p>
                </div>

                <div
                    className='time-bar'
                    style={{
                        animation: `timeload ${time}ms linear forwards`
                    }}
                />
            </div>
        )
    )
}
