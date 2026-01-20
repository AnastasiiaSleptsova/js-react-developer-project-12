import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FC } from 'react'

import { HomePage, LoginPage } from '@/pages'
import { ProtectedRoute } from '@/app/providers'

import './App.css'
import 'antd/dist/reset.css'
import { NotFoundPage } from './сomponents/NotFoundPage'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        {/* Страница 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

