import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import type { ReactNode } from 'react'

type HeaderConfig = {
  isMobile?: boolean
  onToggleChannels?: () => void
  showUserControls?: boolean
}

const DEFAULT_HEADER_CONFIG: HeaderConfig = {
  showUserControls: false,
}

type HeaderConfigContextValue = {
  headerConfig: HeaderConfig
  setHeaderConfig: (config: Partial<HeaderConfig>) => void
  resetHeaderConfig: () => void
}

const HeaderConfigContext = createContext<HeaderConfigContextValue | undefined>(undefined)

export const HeaderConfigProvider = ({ children }: { children: ReactNode }) => {
  const [headerConfig, setHeaderConfigState] = useState<HeaderConfig>(DEFAULT_HEADER_CONFIG)

  const setHeaderConfig = useCallback((config: Partial<HeaderConfig>) => {
    setHeaderConfigState((prev) => ({ ...prev, ...config }))
  }, [])

  const resetHeaderConfig = useCallback(() => setHeaderConfigState(DEFAULT_HEADER_CONFIG), [])

  const value = useMemo(
    () => ({
      headerConfig,
      setHeaderConfig,
      resetHeaderConfig,
    }),
    [headerConfig, resetHeaderConfig, setHeaderConfig],
  )

  return <HeaderConfigContext.Provider value={value}>{children}</HeaderConfigContext.Provider>
}

export const useHeaderConfig = (): HeaderConfigContextValue => {
  const context = useContext(HeaderConfigContext)
  if (!context) {
    throw new Error('useHeaderConfig must be used within HeaderConfigProvider')
  }
  return context
}
