import { Spin } from 'antd'

import styles from './RouterLoader.module.scss'

export const RouterLoader = () => {
  return (
    <div className={styles.loader}>
      <Spin size="large" tip="Подготавливаем интерфейс..." />
    </div>
  )
}
