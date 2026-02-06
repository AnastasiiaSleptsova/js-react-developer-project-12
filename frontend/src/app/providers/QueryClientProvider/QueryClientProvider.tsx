import { QueryClient, QueryClientProvider as TanstackProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'always',
      retry: 3,
    },
    mutations: {
      networkMode: 'always',
      retry: false,
    },
  },
})

type QueryClientProviderProps = {
  children: ReactNode
}

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
  return <TanstackProvider client={queryClient}>{children}</TanstackProvider>
}
