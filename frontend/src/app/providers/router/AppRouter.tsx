import { Suspense } from 'react'
import { BrowserRouter, useRoutes } from 'react-router-dom'

import { routeConfig } from './routeConfig'
import { RouterLoader } from './ui/RouterLoader'

const RoutesRenderer = () => {
  return useRoutes(routeConfig)
}

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouterLoader />}>
        <RoutesRenderer />
      </Suspense>
    </BrowserRouter>
  )
}
