import { Button, Result } from 'antd'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './ErrorBoundary.module.scss'

export type ErrorBoundaryFallbackProps = {
  error: Error | null
  resetError: () => void
}

export const ErrorBoundaryFallback = ({ error, resetError }: ErrorBoundaryFallbackProps) => {
  const { t } = useTranslation()
  const errorMessage = error?.message

  const actions: ReactNode[] = [
    (
      <Button key="retry" type="default" size="large" onClick={resetError}>
        {t('Попробовать ещё раз')}
      </Button>
    ),
    (
      <Button
        key="reload"
        size="large"
        type="primary"
        onClick={() => window.location.reload()}
      >
        {t('Обновить страницу')}
      </Button>
    ),
  ]

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <Result
          className={styles.result}
          status="error"
          title={t('Упс, что-то пошло не так')}
          subTitle={t('Мы уже работаем над этой проблемой и скоро всё восстановим.')}
          extra={actions}
        />
        {errorMessage && <p className={styles.details}>{errorMessage}</p>}
      </div>
    </section>
  )
}
