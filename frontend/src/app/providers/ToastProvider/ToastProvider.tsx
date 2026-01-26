import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import styles from './ToastProvider.module.scss'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
  children: ReactNode
}

export const ToastProvider = ({ children }: Props) => {
  return (
    <>
      {children}
      <ToastContainer
        position="bottom-left"
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
