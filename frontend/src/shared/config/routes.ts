export const routePaths = {
  home: '/',
  login: '/login',
  signup: '/signup',
  notFound: '*',
} as const

export type AppRouteKey = keyof typeof routePaths
