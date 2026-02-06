import { ToastContainer } from 'react-toastify'
import type { ReactNode } from 'react'

import { useResponsive } from '@shared/hooks/useResponsive'

import styles from './ToastProvider.module.scss'

import 'react-toastify/dist/ReactToastify.css'

type ToastProviderProps = {
  children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const { isMobile } = useResponsive()

  return (
    <>
      {children}
      <ToastContainer
        position={isMobile ? 'top-center' : 'bottom-left'}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className={styles.container}
        toastClassName={styles.toast}
      />
    </>
  )
}
