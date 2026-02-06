import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

import { AppLayout } from '@app/layouts'

import { routePaths } from '@shared/config/routes'

import { ProtectedRoute } from '../ProtectedRoute'

const HomePage = lazy(async () => ({ default: (await import('@pages/HomePage')).HomePage }))
const LoginPage = lazy(async () => ({ default: (await import('@pages/LoginPage')).LoginPage }))
const SignupPage = lazy(async () => ({ default: (await import('@pages/SignupPage')).SignupPage }))
const NotFoundPage = lazy(async () => ({
  default: (await import('@pages/NotFoundPage')).NotFoundPage,
}))

export const routeConfig: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        path: routePaths.login,
        element: <LoginPage />,
      },
      {
        path: routePaths.signup,
        element: <SignupPage />,
      },
      {
        path: routePaths.home,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: routePaths.notFound,
        element: <NotFoundPage />,
      },
    ],
  },
]
