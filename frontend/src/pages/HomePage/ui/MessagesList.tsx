import { Layout } from 'antd'

import { useMessages } from '@features/chat'
import { useAppSelector } from '@app/store'
import { MessageInput } from './MessageInput'
import { useMessagesScroll } from './hooks/useMessagesScroll'
import { useMessageNotification } from './hooks/useMessageNotification'
import { MessagesContainer } from './components/MessagesContainer'
import { EmptyMessages } from './components/EmptyMessages'
import { LoadingMessages } from './components/LoadingMessages'
import { ErrorMessages } from './components/ErrorMessages'

import styles from './MessagesList.module.scss'

export const MessagesList = () => {
  const selectedChannelId = useAppSelector((state) => state.chat.selectedChannelId)
  const currentUsername = useAppSelector((state) => state.auth.username)
  const { data: messages = [], isLoading, error } = useMessages()

  const filteredMessages = messages.filter((msg) => msg.channelId === selectedChannelId)

  const messagesEndRef = useMessagesScroll({
    filteredMessages,
    selectedChannelId,
  })

  useMessageNotification({
    filteredMessages,
    currentUsername,
  })

  if (!selectedChannelId) {
    return <EmptyMessages />
  }

  if (isLoading) {
    return <LoadingMessages />
  }

  if (error) {
    return <ErrorMessages />
  }

  return (
    <Layout className={styles.contentLayout}>
      <Layout.Content className={styles.layoutContent}>
        <MessagesContainer
          filteredMessages={filteredMessages}
          currentUsername={currentUsername}
          messagesEndRef={messagesEndRef}
        />
      </Layout.Content>
      <MessageInput />
    </Layout>
  )
}


