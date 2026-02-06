import { Spin } from 'antd'
import { useTranslation } from 'react-i18next'

import styles from './RouterLoader.module.scss'

export const RouterLoader = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.loader}>
      <Spin size="large" tip={t('Подготавливаем интерфейс...')} />
    </div>
  )
}
