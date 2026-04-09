import { BrowserRouter, Routes, Route, Navigate } from 'react-router'


import ProtectedRoute from './routes/ProtectedRoute.jsx'

import NotiProvider from './context/notiProvider/NotiProvider.jsx'
import NotePage from './pages/NotePage.jsx'
import AuthPage from './pages/AuthPage.jsx'

import './App.css'

function App() {

  return (
    <NotiProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<Navigate to="/auth" replace />}/>
          <Route path='/auth' element={<AuthPage/>}/>

          <Route 
            path='/notes' 
            element={
              <ProtectedRoute>
                <NotePage/>
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<Navigate to="/auth" replace />}/>
        </Routes>
      </BrowserRouter>
    </NotiProvider>
  )
}

export default App
