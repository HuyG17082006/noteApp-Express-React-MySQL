
```
noteApp
└─ app
   ├─ backend
   │  ├─ .env
   │  ├─ controller
   │  │  ├─ authController.js
   │  │  └─ noteController.js
   │  ├─ database
   │  │  └─ database.js
   │  ├─ middleware
   │  │  └─ authMiddleware.js
   │  ├─ package-lock.json
   │  ├─ package.json
   │  ├─ repository
   │  │  ├─ noteRepo.js
   │  │  ├─ tokenRepo.js
   │  │  └─ userRepo.js
   │  ├─ routes
   │  │  ├─ authRoutes.js
   │  │  └─ noteRoutes.js
   │  ├─ server.js
   │  ├─ service
   │  │  ├─ noteService.js
   │  │  ├─ tokenService.js
   │  │  └─ userService.js
   │  └─ utils
   │     ├─ bcrypt.js
   │     └─ jwt.js
   └─ frontend
      ├─ .env
      ├─ eslint.config.js
      ├─ index.html
      ├─ package-lock.json
      ├─ package.json
      ├─ public
      │  ├─ favicon.svg
      │  └─ icons.svg
      ├─ README.md
      ├─ src
      │  ├─ App.css
      │  ├─ App.jsx
      │  ├─ assets
      │  │  └─ icon
      │  │     ├─ eye-closed.svg
      │  │     └─ eye-solid.svg
      │  ├─ components
      │  │  ├─ login
      │  │  │  ├─ Login.jsx
      │  │  │  └─ Login.scss
      │  │  └─ register
      │  │     ├─ Register.jsx
      │  │     └─ Register.scss
      │  ├─ hooks
      │  ├─ index.css
      │  ├─ main.jsx
      │  ├─ pages
      │  │  ├─ AuthPage.jsx
      │  │  ├─ AuthPage.scss
      │  │  ├─ NotePage.jsx
      │  │  └─ NotePage.scss
      │  ├─ routes
      │  │  └─ ProtectedRoute.jsx
      │  ├─ services
      │  │  ├─ authService.js
      │  │  └─ Fetch.js
      │  ├─ store
      │  │  └─ authStore.js
      │  ├─ utils
      │  └─ validate
      │     └─ auth.validate.js
      └─ vite.config.js

```