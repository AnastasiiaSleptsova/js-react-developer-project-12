import { Empty } from 'antd'
import { useTranslation } from 'react-i18next'
import type { RefObject } from 'react'

import type { Message } from '@shared/api'

import { MessageItem } from './MessageItem'

import styles from '../MessagesList.module.scss'

type MessagesContainerProps = {
  filteredMessages: Message[]
  currentUsername: string | null
  messagesEndRef: RefObject<HTMLDivElement | null>
  onEditMessage: (message: Message) => void
  onRemoveMessage: (message: Message) => void
}

export const MessagesContainer = ({
  filteredMessages,
  currentUsername,
  messagesEndRef,
  onEditMessage,
  onRemoveMessage,
}: MessagesContainerProps) => {
  const { t } = useTranslation()

  if (filteredMessages.length === 0) {
    return (
      <div className={styles.emptyPlaceholder}>
        <Empty description={t('Нет сообщений в этом канале')} />
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
              onEdit={onEditMessage}
              onRemove={onRemoveMessage}
            />
          )
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
