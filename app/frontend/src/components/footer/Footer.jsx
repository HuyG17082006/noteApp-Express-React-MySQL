import React from 'react'

import './Footer.scss'

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-inner">

        <div className="footer-left">
          <div className="logo">
            <span className="logo-dot" />
            <span className="brand">Note App</span>
          </div>

          <span className="sub">
            Simple note management • React + Express
          </span>
        </div>

        <div className="footer-center">
          <span>© 2026</span>
          <span>•</span>
          <span>Made by Huy Gay</span>
        </div>

        <div className="footer-links">

          <a
            href="https://www.facebook.com/HuyLe060817"
            target="_blank"
            rel="noreferrer"
            className="link facebook"
          >

            <svg viewBox="0 0 24 24">
              <path d="M13 22v-8h3l1-4h-4V7c0-1 .3-2 2-2h2V1h-3c-3 0-5 2-5 5v4H6v4h3v8h4z"/>
            </svg>
            <span>Facebook</span>
          </a>

          <a
            href="https://github.com/HuyG17082006"
            target="_blank"
            rel="noreferrer"
            className="link github"
          >

            <svg viewBox="0 0 24 24">
              <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.6-1.3-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.3-3.3-.1-.3-.6-1.5.1-3.1 0 0 1.1-.3 3.4 1.3a11.6 11.6 0 0 1 6.2 0c2.3-1.6 3.4-1.3 3.4-1.3.7 1.6.2 2.8.1 3.1.8.9 1.3 2 1.3 3.3 0 4.5-2.7 5.5-5.3 5.8.4.3.9 1 .9 2v3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12c0-6.4-5.1-11.5-11.5-11.5z"/>
            </svg>
            <span>GitHub</span>
          </a>

        </div>

      </div>
    </footer>
  );
}