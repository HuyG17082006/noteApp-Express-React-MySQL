import React, { useContext } from 'react'

import './Notification.scss'

export default function Notification({ type, message, time }) {

    const config = {
        "success": {
            title: "Thành công",
            background_color: 'rgba(110, 231, 183, 0.22)',
            border_color: "#34d399",
            icon: '/mark.png',
            color: "#065f46"
        },
        "warning": {
            title: "Cảnh báo",
            background_color: "rgba(253, 224, 71, 0.22)",
            icon: '/warning.png',
            border_color: "#facc15",
            color: "#78350f"
        },
        "error": {
            title: "Lỗi",
            background_color: "rgba(251, 113, 133, 0.22)",
            icon: '/error.png',
            color: "#7f1d1d"
        }
    }

    let notiStyle = config[type.toLowerCase()];

    return (
        (
            <div
                className='Notification'
                style={{
                    background: notiStyle.background_color,
                    border: `1px solid ${notiStyle.border_color}`,
                    animation: `flyup ${time}ms ease forwards`
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
                    style={{ animation: `timeload ${time}ms linear forwards` }}
                />
            </div>
        )
    )
}
