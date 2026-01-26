import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import styles from '../ChannelsList.module.scss'

type ChannelsListHeaderProps = {
  onAdd: () => void
}

export const ChannelsListHeader = ({ onAdd }: ChannelsListHeaderProps) => {
  const { t } = useTranslation()

  return (
    <div className={styles.header}>
      <div className={styles.title}>{t('📢 Каналы')}</div>
      <Button type="text" icon={<PlusOutlined />} onClick={onAdd}>
        {t('Добавить')}
      </Button>
    </div>
  )
}
