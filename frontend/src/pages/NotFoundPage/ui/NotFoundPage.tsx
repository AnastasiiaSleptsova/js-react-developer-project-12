import { Result, Button } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { routePaths } from '@shared/config/routes'

import { useHeaderConfig } from '@widgets/chatHeader'

import styles from './NotFoundPage.module.scss'

export const NotFoundPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { resetHeaderConfig } = useHeaderConfig()

  useEffect(() => {
    resetHeaderConfig()
  }, [resetHeaderConfig])

  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle={t('К сожалению, страница которую вы ищете, не существует.')}
        extra={
          <Button
            type="primary"
            size="large"
            onClick={() => {
              void navigate(routePaths.home)
            }}
          >
            {t('Вернуться на главную')}
          </Button>
        }
      />
    </div>
  )
}
