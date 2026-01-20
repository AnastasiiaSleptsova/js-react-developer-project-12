import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FC } from 'react'

import { HomePage, LoginPage, NotFoundPage } from '@pages'
import { ProtectedRoute } from '@app/providers'

import 'antd/dist/reset.css'

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

