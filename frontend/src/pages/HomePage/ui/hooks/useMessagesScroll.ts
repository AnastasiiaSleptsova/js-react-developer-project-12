import { useEffect, useRef } from 'react'

import type { Message } from '@shared/api'

type UseMessagesScrollProps = {
  filteredMessages: Message[]
  selectedChannelId: string | null
}

export const useMessagesScroll = ({
  filteredMessages,
  selectedChannelId,
}: UseMessagesScrollProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const previousMessagesLengthRef = useRef(0)
  const previousChannelRef = useRef<string | null>(null)
  const messagesLength = filteredMessages.length

  useEffect(() => {
    // Скролл при переключении между чатами
    if (previousChannelRef.current !== selectedChannelId) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
      }, 0)
      previousChannelRef.current = selectedChannelId
    }
    // Скролл при получении новых сообщений
    else if (messagesLength > previousMessagesLengthRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 0)
    }

    previousMessagesLengthRef.current = messagesLength
  }, [messagesLength, selectedChannelId])

  return messagesEndRef
}
