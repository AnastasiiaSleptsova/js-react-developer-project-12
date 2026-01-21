import { FC, RefObject } from 'react'
import { Empty } from 'antd'
import { MessageItem } from './MessageItem'

import styles from '../MessagesList.module.scss'

interface Message {
  id: string | number
  body: string
  username: string
  channelId: string
}

interface MessagesContainerProps {
  filteredMessages: Message[]
  currentUsername: string | null
  messagesEndRef: RefObject<HTMLDivElement | null>
}

export const MessagesContainer: FC<MessagesContainerProps> = ({
  filteredMessages,
  currentUsername,
  messagesEndRef,
}) => {
  if (filteredMessages.length === 0) {
    return (
      <div className={styles.emptyPlaceholder}>
        <Empty description="Нет сообщений в этом канале" />
      </div>
    )
  }

  return (
    <div className={styles.messagesList}>
      <div className={styles.messagesContainer}>
        {filteredMessages.map((message) => {
          const isCurrentUser = message.username === currentUsername
          return (
            <MessageItem
              key={message.id}
              message={message}
              isCurrentUser={isCurrentUser}
            />
          )
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
