import React from 'react'

import './Confirm.scss'

import warningIcon from '../../../public/warning.png';

export default function Confirm({ handleClose, confirmFeature }) {

    const { title, message, func } = confirmFeature;

    const handleConfirm = () => {
        func?.();
        handleClose();
    };

    return (
        <div 
            className='confirm-container'
            onClick={(e) => e.stopPropagation()}
        >

            <div className='icon'>
                <img src={warningIcon} alt="warning" />
            </div>

            <div className='info-group'>
                <h3>{title || 'Xác nhận'}</h3>
                <p>{message || 'Bạn có chắc muốn thực hiện hành động này?'}</p>
            </div>

            <div className='button-group'>
                <button 
                    className='cancel'
                    onClick={() => handleClose()}
                >
                    Hủy
                </button>

                <button 
                    className='confirm'
                    onClick={() => handleConfirm()}
                >
                    Đồng ý
                </button>
            </div>

        </div>
    )
}
