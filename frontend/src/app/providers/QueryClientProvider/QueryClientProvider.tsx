import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider as TanstackProvider } from '@tanstack/react-query'

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

type Props = {
  children: ReactNode
}

export const QueryClientProvider = ({ children }: Props) => {
  return <TanstackProvider client={queryClient}>{children}</TanstackProvider>
}
