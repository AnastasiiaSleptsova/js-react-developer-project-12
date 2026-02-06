import { Provider } from 'react-redux'
import type { ReactNode } from 'react'

import { store } from '@app/store'

type ReduxProviderProps = {
  children: ReactNode
}

export const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return <Provider store={store}>{children}</Provider>
}
