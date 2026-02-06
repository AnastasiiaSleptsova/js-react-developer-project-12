import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AppLayout } from '@app/layouts'
import { AppInitializer, ProtectedRoute } from '@app/providers'
import { HomePage, LoginPage, SignupPage, NotFoundPage } from '@pages'
import { HeaderConfigProvider } from '@widgets/chatHeader'

import 'antd/dist/reset.css'

const App = () => {
  return (
    <BrowserRouter>
      <AppInitializer />
      <HeaderConfigProvider>
        {/* TODO: вынести конфиг роутов в отдельный модуль/роутер и использовать lazy для страниц */}
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
