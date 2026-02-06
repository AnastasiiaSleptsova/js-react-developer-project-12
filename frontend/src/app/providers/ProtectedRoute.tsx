import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'

import { getAuthToken } from '@features/auth/lib/tokenStorage'


type ProtectedRouteProps = {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getAuthToken()

  if (!token) {
    return <Navigate to="/login" replace /> // TODO: вынести роуты в централизованные константы/роутер конфиг
  }

  return <>{children}</>
}
