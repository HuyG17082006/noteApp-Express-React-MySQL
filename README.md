
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
   │     ├─ createResponse.js
   │     ├─ jwt.js
   │     └─ sendRespone.js
   └─ frontend
      ├─ .env
      ├─ eslint.config.js
      ├─ index.html
      ├─ package-lock.json
      ├─ package.json
      ├─ public
      │  ├─ error.png
      │  ├─ favicon.svg
      │  ├─ icons.svg
      │  ├─ mark.png
      │  └─ warning.png
      ├─ README.md
      ├─ src
      │  ├─ App.css
      │  ├─ App.jsx
      │  ├─ assets
      │  │  └─ icon
      │  │     ├─ eye-b.svg
      │  │     ├─ eye-closed.svg
      │  │     ├─ eye-solid.svg
      │  │     ├─ eye.svg
      │  │     ├─ recycle.svg
      │  │     ├─ star-b.svg
      │  │     ├─ star-off.svg
      │  │     ├─ star.svg
      │  │     └─ trash.svg
      │  ├─ components
      │  │  ├─ authPage
      │  │  │  ├─ login
      │  │  │  │  ├─ Login.jsx
      │  │  │  │  └─ Login.scss
      │  │  │  └─ register
      │  │  │     ├─ Register.jsx
      │  │  │     └─ Register.scss
      │  │  ├─ confirm
      │  │  │  ├─ Confirm.jsx
      │  │  │  └─ Confirm.scss
      │  │  ├─ footer
      │  │  │  ├─ Footer.jsx
      │  │  │  └─ Footer.scss
      │  │  ├─ header
      │  │  │  ├─ Header.jsx
      │  │  │  └─ Header.scss
      │  │  ├─ notePage
      │  │  │  ├─ EmptyNote
      │  │  │  │  ├─ EmptyNote.jsx
      │  │  │  │  └─ EmptyNote.scss
      │  │  │  ├─ Form
      │  │  │  │  ├─ Form.jsx
      │  │  │  │  └─ Form.scss
      │  │  │  ├─ List
      │  │  │  │  ├─ List.jsx
      │  │  │  │  └─ List.scss
      │  │  │  ├─ Note
      │  │  │  │  ├─ Note.jsx
      │  │  │  │  └─ Note.scss
      │  │  │  ├─ Pagination
      │  │  │  │  ├─ Pagination.jsx
      │  │  │  │  └─ Pagination.scss
      │  │  │  ├─ Tool
      │  │  │  │  ├─ Tool.jsx
      │  │  │  │  └─ Tool.scss
      │  │  │  └─ Type
      │  │  │     ├─ Type.jsx
      │  │  │     └─ Type.scss
      │  │  ├─ notification
      │  │  │  ├─ Notification.jsx
      │  │  │  └─ Notification.scss
      │  │  └─ README.md
      │  ├─ context
      │  │  ├─ confirmProvider
      │  │  │  ├─ ConfirmProvider.jsx
      │  │  │  └─ ConfirmProvider.scss
      │  │  └─ notiProvider
      │  │     ├─ NotiProvider.jsx
      │  │     └─ NotiProvider.scss
      │  ├─ hooks
      │  │  ├─ useAuth.jsx
      │  │  ├─ useLockAction.jsx
      │  │  └─ useNote.jsx
      │  ├─ index.css
      │  ├─ Layout
      │  │  ├─ AuthLayout.jsx
      │  │  ├─ MainLayout.jsx
      │  │  └─ MainLayout.scss
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
      │  │  ├─ Fetch.js
      │  │  └─ noteService.js
      │  ├─ store
      │  │  └─ authStore.js
      │  ├─ utils
      │  │  ├─ constant.js
      │  │  └─ formatDate.js
      │  └─ validate
      │     └─ auth.validate.js
      └─ vite.config.js

```