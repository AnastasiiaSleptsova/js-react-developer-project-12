import { memo, useMemo } from 'react'
import classNames from 'classnames'

import { Button, Dropdown, List } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'

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
  const menuItems = useMemo(() => ([
    {
      key: 'rename',
      label: 'Переименовать',
      onClick: () => onRename(id, name),
    },
    {
      key: 'remove',
      label: 'Удалить',
      disabled: !removable,
      onClick: () => onRemove(id, name),
    },
  ]), [id, name, removable, onRemove, onRename])

  return (
    <List.Item
      className={classNames(styles.item, {
        [styles.selected]: isSelected,
      })}
      onClick={() => onSelect(id)}
    >
      <div className={styles.itemContent}>
        <span className={styles.channelName}># {name}</span>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <Dropdown
          menu={{ items: menuItems }}
          trigger={["click"]}
        >
          <Button type="text" icon={<EllipsisOutlined />} />
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
