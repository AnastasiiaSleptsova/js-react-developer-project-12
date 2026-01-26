import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import styles from '../ChannelsList.module.scss'

type ChannelsListHeaderProps = {
  onAdd: () => void
}

export const ChannelsListHeader = ({ onAdd }: ChannelsListHeaderProps) => (
  <div className={styles.header}>
    <div className={styles.title}>📢 Каналы</div>
    <Button type="text" icon={<PlusOutlined />} onClick={onAdd}>
      Добавить
    </Button>
  </div>
)
