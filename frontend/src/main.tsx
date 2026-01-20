import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ReduxProvider } from '@app/providers'

import App from './App.tsx'

const root = document.getElementById('root')
if (!root) {
  throw new Error('Root element not found')
}

createRoot(root).render(
  <StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </StrictMode>,
)
