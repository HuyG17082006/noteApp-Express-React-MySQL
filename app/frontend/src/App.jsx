import { BrowserRouter, Routes, Route, Navigate, replace } from 'react-router'


import ProtectedRoute from './routes/ProtectedRoute.jsx'

import NotePage from './pages/NotePage.jsx'
import AuthPage from './pages/AuthPage.jsx'

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Navigate to="/auth" replace />}/>
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
