import { useEffect, useRef, useState } from 'react'

export const BREAKPOINTS = {
  mobile: 768, // < 768px
  desktop: 1024, // >= 1024px
} as const

type ResponsiveState = {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export const useResponsive = (): ResponsiveState => {
  const computeState = (width: number): ResponsiveState => ({
    isMobile: width < BREAKPOINTS.mobile,
    isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.desktop,
    isDesktop: width >= BREAKPOINTS.desktop,
  })

  const getInitialState = (): ResponsiveState => {
    if (typeof window === 'undefined') {
      return { isMobile: false, isTablet: false, isDesktop: true }
    }
    return computeState(window.innerWidth)
  }

  const [state, setState] = useState<ResponsiveState>(getInitialState)
  const debounceRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const handleResize = () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current)
      }
      debounceRef.current = window.setTimeout(() => {
        setState(computeState(window.innerWidth))
      }, 120)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current)
      }
    }
  }, [])

  return state
}
