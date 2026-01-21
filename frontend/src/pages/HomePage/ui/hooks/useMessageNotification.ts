import { useRef, useEffect } from 'react'
import { notification } from 'antd'

interface UseMessageNotificationProps {
  filteredMessages: any[]
  currentUsername: string | null
}

export const useMessageNotification = ({
  filteredMessages,
  currentUsername,
}: UseMessageNotificationProps) => {
  const previousMessagesLengthRef = useRef(0)

  useEffect(() => {
    // Показываем нотификацию если пришло новое сообщение
    if (filteredMessages.length > previousMessagesLengthRef.current) {
      const newMessage = filteredMessages[filteredMessages.length - 1]
      const isFromCurrentUser = newMessage.username === currentUsername

      // Показываем нотификацию только если сообщение не от текущего пользователя
      if (!isFromCurrentUser) {
        notification.info({
          message: `Новое сообщение от ${newMessage.username}`,
          description:
            newMessage.body.substring(0, 50) +
            (newMessage.body.length > 50 ? '...' : ''),
          placement: 'topRight',
          duration: 3,
        })
      }
    }

    previousMessagesLengthRef.current = filteredMessages.length
  }, [filteredMessages, currentUsername])
}
