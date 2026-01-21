import { FC } from 'react'
import { Empty } from 'antd'
import styles from '../MessagesList.module.scss'

export const EmptyMessages: FC = () => { 
  return (
    <div className={styles.emptyPlaceholder}>
      <Empty description="Выберите канал для просмотра сообщений" />
    </div>
  )
}
