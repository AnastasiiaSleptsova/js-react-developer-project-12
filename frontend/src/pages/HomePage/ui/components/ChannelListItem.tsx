import { EllipsisOutlined } from '@ant-design/icons'
import { Button, Dropdown, List } from 'antd'
import classNames from 'classnames'
import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import styles from '../ChannelsList.module.scss'

type ChannelListItemProps = {
  id: string
  name: string
  removable: boolean
  isSelected: boolean
  onSelect: (id: string) => void
  onRename: (id: string, name: string) => void
  onRemove: (channelId: string, channelName: string) => void
}

const ChannelListItemComponent = ({
  id,
  name,
  removable,
  isSelected,
  onSelect,
  onRename,
  onRemove,
}: ChannelListItemProps) => {
  const { t } = useTranslation()

  const menuItems = useMemo(
    () => [
      {
        key: 'rename',
        label: t('Переименовать'),
        onClick: () => onRename(id, name),
      },
      {
        key: 'remove',
        label: t('Удалить'),
        disabled: !removable,
        onClick: () => onRemove(id, name),
      },
    ],
    [id, name, onRemove, onRename, removable, t],
  )

  return (
    <List.Item
      className={classNames(styles.item, {
        [styles.selected]: isSelected,
      })}
      onClick={() => onSelect(id)}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(id)
        }
      }}
    >
      <div className={styles.itemContent}>
        <span className={styles.channelName}># {name}</span>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <span className={styles.srOnly}>{t('Управление каналом')}</span>
        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
          <Button type="text" icon={<EllipsisOutlined />} aria-label={t('Управление каналом')} />
        </Dropdown>
      </div>
    </List.Item>
  )
}

export const ChannelListItem = memo(
  ChannelListItemComponent,
  (prev, next) =>
    prev.id === next.id &&
    prev.name === next.name &&
    prev.removable === next.removable &&
    prev.isSelected === next.isSelected,
)

ChannelListItem.displayName = 'ChannelListItem'
