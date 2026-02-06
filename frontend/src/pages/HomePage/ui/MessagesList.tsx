import { Layout, Modal } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppSelector } from '@app/store'

import { useChannels, useMessages, useRemoveMessage } from '@features/chat'

import type { Message } from '@shared/api'

import { ErrorMessages } from './components/ErrorMessages'
import { LoadingMessages } from './components/LoadingMessages'
import { MessagesContainer } from './components/MessagesContainer'
import { SelectedChannelInfo } from './components/SelectedChannelInfo'
import { useMessageNotification } from './hooks/useMessageNotification'
import { useMessagesScroll } from './hooks/useMessagesScroll'
import { MessageInput } from './MessageInput'

import styles from './MessagesList.module.scss'

export const MessagesList = () => {
  const { t } = useTranslation()
  const selectedChannelId = useAppSelector((state) => state.chat.selectedChannelId)
  const currentUsername = useAppSelector((state) => state.auth.username)
  const {
    data: filteredMessages = [],
    isLoading: isMessagesLoading,
    error,
  } = useMessages(selectedChannelId)
  const { data: channels = [], isLoading: isChannelsLoading } = useChannels()
  const removeMessage = useRemoveMessage()
  const [editingMessage, setEditingMessage] = useState<Message | null>(null)

  const selectedChannelName = useMemo(() => {
    if (!selectedChannelId) return ''
    const foundChannel = channels.find((channel) => channel.id === selectedChannelId)
    return foundChannel?.name ?? ''
  }, [channels, selectedChannelId])

  const messagesEndRef = useMessagesScroll({
    filteredMessages,
    selectedChannelId,
  })

  useMessageNotification({
    filteredMessages,
    currentUsername,
    selectedChannelId,
  })

  useEffect(() => {
    // Сбрасываем редактируемое сообщение при смене канала
    setEditingMessage(null)
  }, [selectedChannelId])

  const handleEditMessage = useCallback((message: Message) => {
    setEditingMessage(message)
  }, [])

  const handleRemoveMessage = useCallback(
    (message: Message) => {
      Modal.confirm({
        title: t('Подтвердите удаление'),
        content: t('Удалить сообщение?'),
        okText: t('Удалить'),
        cancelText: t('Отмена'),
        okButtonProps: { danger: true },
        centered: true,
        onOk: async () => {
          await removeMessage.mutateAsync(String(message.id))
          if (editingMessage && String(editingMessage.id) === String(message.id)) {
            setEditingMessage(null)
          }
        },
      })
    },
    [editingMessage, removeMessage, t],
  )

  if (isChannelsLoading || !selectedChannelId || isMessagesLoading) {
    return <LoadingMessages />
  }

  if (error) {
    return <ErrorMessages />
  }

  return (
    <Layout className={styles.contentLayout}>
      <Layout.Content className={styles.layoutContent}>
        <SelectedChannelInfo
          channelName={selectedChannelName}
          messageCount={filteredMessages.length}
        />
        <MessagesContainer
          filteredMessages={filteredMessages}
          currentUsername={currentUsername}
          messagesEndRef={messagesEndRef}
          onEditMessage={handleEditMessage}
          onRemoveMessage={handleRemoveMessage}
        />
      </Layout.Content>
      <MessageInput
        editingMessage={editingMessage}
        onResetEditing={() => setEditingMessage(null)}
      />
    </Layout>
  )
}
