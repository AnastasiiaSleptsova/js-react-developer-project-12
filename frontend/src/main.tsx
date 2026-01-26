import { createRoot } from 'react-dom/client'
import { RollbarProvider, ReduxProvider, ToastProvider, QueryClientProvider } from '@app/providers'
import '@shared/i18n/i18n'

import App from './App.tsx'

const root = document.getElementById('root')
if (!root) {
  throw new Error('Root element not found')
}

createRoot(root).render(
  // <StrictMode>
  <RollbarProvider>
    <ReduxProvider>
      <QueryClientProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </QueryClientProvider>
    </ReduxProvider>
  </RollbarProvider>

  // </StrictMode>,
)
