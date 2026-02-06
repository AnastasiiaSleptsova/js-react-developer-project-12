import { Alert, List, Skeleton, Modal } from 'antd'
import { useEffect, useState, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from '@app/store'

import {
  useChannels,
  useCreateChannel,
  useEditChannel,
  useRemoveChannel,
  setSelectedChannel,
} from '@features/chat'

import { AddChannelModal } from './components/AddChannelModal'
import { ChannelListItem } from './components/ChannelListItem'
import { ChannelsListHeader } from './components/ChannelsListHeader'
import { RenameChannelModal } from './components/RenameChannelModal'

import styles from './ChannelsList.module.scss'

type ChannelsListProps = {
  onChannelSelected?: () => void
}

export const ChannelsList = ({ onChannelSelected }: ChannelsListProps) => {
  const { t } = useTranslation()
  const { data: channels = [], isLoading, error } = useChannels()
  const dispatch = useAppDispatch()
  const reduxSelectedChannelId = useAppSelector((state) => state.chat.selectedChannelId) // TODO использовать селектор
  const createChannel = useCreateChannel()
  const editChannel = useEditChannel()
  const removeChannel = useRemoveChannel()

  const [isAddOpen, setAddOpen] = useState(false)
  const [renameInfo, setRenameInfo] = useState<{ id: string; name: string } | null>(null)

  // Мемоизируем existingNames для избежания лишних пересчетов
  const existingNames = useMemo(() => channels.map((c) => String(c.name)), [channels])

  // Выбираем первый канал при загрузке, если ничего не выбрано
  useEffect(() => {
    if (channels.length > 0 && !reduxSelectedChannelId) {
      dispatch(setSelectedChannel(channels[0].id))
    }
  }, [channels, reduxSelectedChannelId, dispatch])

  const selectedChannelId = reduxSelectedChannelId || (channels.length > 0 ? channels[0].id : null)

  const handleSelectChannel = useCallback(
    (id: string) => {
      dispatch(setSelectedChannel(id))
      onChannelSelected?.()
    },
    [dispatch, onChannelSelected],
  )

  const handleRenameChannel = useCallback((id: string, name: string) => {
    setRenameInfo({ id, name })
  }, [])

  const handleRemoveChannel = useCallback(
    (channelId: string, channelName: string) => {
      Modal.confirm({
        title: t('Подтвердите удаление'),
        content: t('Удалить канал "{{channelName}}"? Все сообщения канала будут удалены.', {
          channelName,
        }),
        okText: t('Удалить'),
        cancelText: t('Отмена'),
        okButtonProps: { danger: true },
        centered: true,
        onOk: async () => {
          await removeChannel.mutateAsync(String(channelId))
        },
      })
    },
    [removeChannel, t],
  )

  if (isLoading) {
    return (
      <div style={{ padding: '16px' }}>
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    )
  }

  if (error) {
    return <Alert title={t('Ошибка')} description={t('Не удалось загрузить каналы')} type="error" />
  }

  return (
    <div className={styles.container}>
      <ChannelsListHeader onAdd={() => setAddOpen(true)} />

      <List
        dataSource={channels}
        renderItem={(channel) => (
          <ChannelListItem
            key={channel.id}
            id={channel.id}
            name={channel.name}
            removable={channel.removable}
            isSelected={selectedChannelId === channel.id}
            onSelect={handleSelectChannel}
            onRename={handleRenameChannel}
            onRemove={handleRemoveChannel}
          />
        )}
      />

      <AddChannelModal
        open={isAddOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={async (name) => {
          await createChannel.mutateAsync({ name })
          setAddOpen(false)
        }}
        existingNames={existingNames}
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
          existingNames={existingNames.filter((n) => n !== renameInfo.name)}
        />
      )}
    </div>
  )
}
