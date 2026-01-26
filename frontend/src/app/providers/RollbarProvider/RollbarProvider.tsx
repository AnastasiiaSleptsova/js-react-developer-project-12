import { Provider as RollbarReactProvider, useRollbar } from '@rollbar/react'
import type { Configuration } from 'rollbar'
import type { ReactNode } from 'react'

import { AppErrorBoundary } from '@shared/ui/ErrorBoundary'

const rollbarAccessToken = (import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN ?? '').trim()
const rollbarEnvironment = (
  import.meta.env.VITE_ROLLBAR_ENVIRONMENT ?? import.meta.env.MODE ?? 'development'
).trim()
const rollbarConfig: Configuration | null = rollbarAccessToken
  ? {
      accessToken: rollbarAccessToken,
      environment: rollbarEnvironment,
      captureUncaught: true,
      captureUnhandledRejections: true,
    }
  : null

export type RollbarProviderProps = {
  children: ReactNode
}

const RollbarAwareBoundary = ({ children }: RollbarProviderProps) => {
  const rollbar = useRollbar()
  return <AppErrorBoundary rollbar={rollbar}>{children}</AppErrorBoundary>
}

export const RollbarProvider = ({ children }: RollbarProviderProps) => {
  if (!rollbarConfig) {
    if (import.meta.env.DEV) {
      console.warn(
        'Rollbar is not configured. Set VITE_ROLLBAR_ACCESS_TOKEN as a secret for production builds.',
      )
    }

    return <AppErrorBoundary>{children}</AppErrorBoundary>
  }

  return (
    <RollbarReactProvider config={rollbarConfig}>
      <RollbarAwareBoundary>{children}</RollbarAwareBoundary>
    </RollbarReactProvider>
  )
}
