import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { HomePage, LoginPage, SignupPage, NotFoundPage } from '@pages'

import { AppLayout } from '@app/layouts'
import { ProtectedRoute, HeaderConfigProvider } from '@app/providers'

import 'antd/dist/reset.css'

const App = () => {
  return (
    <BrowserRouter>
      <HeaderConfigProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HeaderConfigProvider>
    </BrowserRouter>
  )
}

export default App
