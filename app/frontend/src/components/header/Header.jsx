import React from 'react'

import './Header.scss'

export default function Header() {
  return (
    <header className="header-container">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-dot" />
          <h1>Note App</h1>
        </div>

        <div className="header-actions">
          <div className="status">
            <span className="dot" />
            <span>Đang hoạt động</span>
          </div>
        </div>
      </div>
    </header>
  );
}