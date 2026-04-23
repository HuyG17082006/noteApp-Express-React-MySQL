import { BrowserRouter, Routes, Route, Navigate } from 'react-router'


import ProtectedRoute from './routes/ProtectedRoute.jsx'

import AuthLayout from './Layout/AuthLayout.jsx'
import MainLayout from './Layout/MainLayout.jsx'

import NotiProvider from './context/notiProvider/NotiProvider.jsx'
import ConfirmProvider from './context/confirmProvider/ConfirmProvider.jsx'
import NotePage from './pages/NotePage.jsx'
import AuthPage from './pages/AuthPage.jsx'

import './App.css'

function App() {

	return (
		<NotiProvider>

			<ConfirmProvider>

				<BrowserRouter>

					<Routes>

						<Route path='/' element={<Navigate to="/auth" replace />} />
						<Route
							path='/auth'
							element={
								<AuthLayout>
									<AuthPage />
								</AuthLayout>
							}
						/>

						<Route
							path='/notes'
							element={
								<ProtectedRoute>
									<MainLayout>
										<NotePage />
									</MainLayout>
								</ProtectedRoute>
							}
						/>

						<Route path='*' element={<Navigate to="/auth" replace />} />
					</Routes>

				</BrowserRouter>

			</ConfirmProvider>

		</NotiProvider>
	)
}

export default App
