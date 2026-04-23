import React, { createContext, useState, useEffect, useRef } from 'react'

import './ConfirmProvider.scss'

import Confirm from '../../components/confirm/Confirm.jsx';

const ConfirmContext = createContext();

export default function ConfirmProvider({ children }) {

    const [showConfirm, setShowConfirm] = useState(false);

    const [confirmFeature, setConfirmFeature] = useState({
        title: '',
        message: '',
        func: null
    })

    const addConfirm = ({ title, message, func }) => {
        setConfirmFeature({
            title,
            message,
            func
        })
        setShowConfirm(true)
    }

    console.log(showConfirm)

    const handleClose = () => {
        setShowConfirm(false)
    }

    return (
        <ConfirmContext.Provider value={{ addConfirm }}>

            {
                showConfirm ?
                    <div
                        className='confirm-overlay'
                        onClick={handleClose}
                    >
                        <Confirm
                            handleClose={handleClose}
                            confirmFeature={confirmFeature}
                        />
                    </div>
                    :
                    ''
            }

            {children}

        </ConfirmContext.Provider>
    )
}

export {
    ConfirmContext
}