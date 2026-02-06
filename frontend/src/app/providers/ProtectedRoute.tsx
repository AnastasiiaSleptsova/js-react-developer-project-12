import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { getAuthToken } from '@features/auth/lib/tokenStorage'

import { routePaths } from '@shared/config/routes'

type ProtectedRouteProps = {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getAuthToken()

  if (!token) {
    return <Navigate to={routePaths.login} replace />
  }

  return <>{children}</>
}
