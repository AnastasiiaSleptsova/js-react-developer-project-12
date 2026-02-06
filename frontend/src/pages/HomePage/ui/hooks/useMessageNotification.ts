import { notification } from 'antd'
import { useRef, useEffect } from 'react'

import type { Message } from '@shared/api'

type UseMessageNotificationProps = {
  filteredMessages: Message[]
  currentUsername: string | null
  selectedChannelId: string | null
}

export const useMessageNotification = ({
  filteredMessages,
  currentUsername,
  selectedChannelId,
}: UseMessageNotificationProps) => {
  const previousMessagesLengthRef = useRef(new Map<string | null, number>())

  useEffect(() => {
    const previousLength = previousMessagesLengthRef.current.get(selectedChannelId)

    // Показываем нотификацию только если:
    // 1. Этот чат уже был загружен ранее (previousLength !== undefined)
    // 2. И пришло новое сообщение (filteredMessages.length > previousLength)
    if (previousLength !== undefined && filteredMessages.length > previousLength) {
      const newMessage = filteredMessages[filteredMessages.length - 1]
      const isFromCurrentUser = newMessage.username === currentUsername

      // Показываем нотификацию только если сообщение не от текущего пользователя
      if (!isFromCurrentUser) {
        notification.info({
          message: `Новое сообщение от ${newMessage.username}`,
          description:
            newMessage.body.substring(0, 50) + (newMessage.body.length > 50 ? '...' : ''),
          placement: 'topRight',
          duration: 3,
        })
      }
    }

    previousMessagesLengthRef.current.set(selectedChannelId, filteredMessages.length)
  }, [filteredMessages, currentUsername, selectedChannelId])
}
