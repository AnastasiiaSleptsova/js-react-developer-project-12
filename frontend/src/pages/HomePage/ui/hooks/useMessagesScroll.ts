import { useRef, useEffect } from 'react'

type UseMessagesScrollProps = {
  filteredMessages: any[] // TODO: заменить any на тип Message и не хранить лишний ререндерный стейт
  selectedChannelId: string | null
}

export const useMessagesScroll = ({
  filteredMessages,
  selectedChannelId,
}: UseMessagesScrollProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const previousMessagesLengthRef = useRef(0)
  const previousChannelRef = useRef<string | null>(null)

  useEffect(() => {
    // Скролл при переключении между чатами
    if (previousChannelRef.current !== selectedChannelId) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
      }, 0)
      previousChannelRef.current = selectedChannelId
    }
    // Скролл при получении новых сообщений
    else if (filteredMessages.length > previousMessagesLengthRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 0)
    }

    previousMessagesLengthRef.current = filteredMessages.length
  }, [filteredMessages, selectedChannelId])

  return messagesEndRef
}
