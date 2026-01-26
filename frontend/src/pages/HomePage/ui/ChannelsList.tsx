import { useEffect, useState } from 'react'
import { Alert, List, Skeleton, Button, Dropdown, Modal } from 'antd'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons'

import { useAppDispatch, useAppSelector } from '@app/store'
import { setSelectedChannel } from '@features/chat'
import { useChannels, useCreateChannel, useEditChannel, useRemoveChannel } from '@features/chat'


import { AddChannelModal } from './components/AddChannelModal'
import { RenameChannelModal } from './components/RenameChannelModal'
import styles from './ChannelsList.module.scss'

export const ChannelsList = () => {
  const { data: channels = [], isLoading, error } = useChannels()
  const dispatch = useAppDispatch()
  const reduxSelectedChannelId = useAppSelector((state) => state.chat.selectedChannelId) // TODO использовать селектор
  const createChannel = useCreateChannel()
  const editChannel = useEditChannel()
  const removeChannel = useRemoveChannel()

  const [isAddOpen, setAddOpen] = useState(false)
  const [renameInfo, setRenameInfo] = useState<{ id: string; name: string } | null>(null)
  
  // Выбираем первый канал при загрузке, если ничего не выбрано
  useEffect(() => {
    if (channels.length > 0 && !reduxSelectedChannelId) {
      dispatch(setSelectedChannel(channels[0].id))
    }
  }, [channels, reduxSelectedChannelId, dispatch])

  const selectedChannelId = reduxSelectedChannelId || (channels.length > 0 ? channels[0].id : null)

  if (isLoading) {
    return (
      <div style={{ padding: '16px' }}>
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    )
  }

  if (error) {
    return <Alert title="Ошибка" description="Не удалось загрузить каналы" type="error" />
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>📢 Каналы</div>
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={() => setAddOpen(true)}
        >
          Добавить
        </Button>
      </div>

      <List
        dataSource={channels}
        renderItem={(channel) => (
          <List.Item
            key={channel.id}
            className={styles.item}
            style={{
              backgroundColor: selectedChannelId === channel.id ? '#e6f7ff' : 'transparent',
              borderLeft: selectedChannelId === channel.id ? '4px solid #1890ff' : 'none',
              paddingLeft: '12px',
            }}
          >
            <div
              className={styles.itemContent}
              onClick={() => dispatch(setSelectedChannel(channel.id))}
            >
              <span className={styles.channelName}># {channel.name}</span>
            </div>
            <div>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'rename',
                      label: 'Переименовать',
                      onClick: () => setRenameInfo({ id: String(channel.id), name: String(channel.name) }),
                    },
                    {
                      key: 'remove',
                      label: 'Удалить',
                      disabled: !channel.removable,
                      onClick: () => {
                        Modal.confirm({
                          title: 'Подтвердите удаление',
                          content: `Удалить канал "${channel.name}"? Все сообщения канала будут удалены.`,
                          okText: 'Удалить',
                          okButtonProps: { danger: true },
                          onOk: async () => {
                            await removeChannel.mutateAsync(String(channel.id))
                          },
                        })
                      },
                    },
                  ],
                }}
                trigger={["click"]}
              >
                <Button type="text" icon={<EllipsisOutlined />} />
              </Dropdown>
            </div>
          </List.Item>
        )}
      />

      <AddChannelModal
        open={isAddOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={async (name) => {
          await createChannel.mutateAsync({ name })
          setAddOpen(false)
        }}
        existingNames={channels.map((c) => String(c.name))}
      />

      {renameInfo && (
        <RenameChannelModal
          open={Boolean(renameInfo)}
          onClose={() => setRenameInfo(null)}
          id={renameInfo.id}
          initialName={renameInfo.name}
          onSubmit={async (newName) => {
            await editChannel.mutateAsync({ id: renameInfo.id, newName })
            setRenameInfo(null)
          }}
          existingNames={channels.map((c) => String(c.name)).filter((n) => n !== renameInfo.name)}
        />
      )}
    </div>
  )
}
