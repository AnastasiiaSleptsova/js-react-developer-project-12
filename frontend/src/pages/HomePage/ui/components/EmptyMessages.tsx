import { FC } from 'react'
import { Empty } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from '../MessagesList.module.scss'

export const EmptyMessages: FC = () => {
  const { t } = useTranslation()
  
  return (
    <div className={styles.emptyPlaceholder}>
      <Empty description={t('Выберите канал для просмотра сообщений')} />
    </div>
  )
}
