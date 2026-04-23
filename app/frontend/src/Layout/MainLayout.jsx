import React from 'react'

import Header from '../components/header/Header.jsx'
import Footer from '../components/footer/Footer.jsx'

import './MainLayout.scss'

export default function MainLayout({ children }) {
    return (
        <div className='main-layout'>
            <Header />
            <div className='main-content'>
                {children}
            </div>
            <Footer />
        </div>
    )
}
