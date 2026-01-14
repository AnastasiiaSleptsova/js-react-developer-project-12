import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { PageOne } from './сomponents/PageOne'
import { LoginPage } from './сomponents/LoginPage'
import { NotFoundPage } from './сomponents/NotFoundPage'

import './App.css'
import 'antd/dist/reset.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageOne />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
