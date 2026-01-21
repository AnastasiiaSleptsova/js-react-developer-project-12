import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ChatService, Message, socketService } from '@shared/api'

export const useMessages = () => {
  const queryClient = useQueryClient()

  const query = useQuery<Message[], Error>({
    queryKey: ['messages'],
    queryFn: () => ChatService.getMessages(),
    staleTime: 1000 * 30,
  })

  // Подписываемся на события WebSocket для реального времени
  useEffect(() => {
    socketService.connect()

    const handleNewMessage = (message: Message) => {
      queryClient.setQueryData(['messages'], (oldMessages: Message[] | undefined) => {
        if (!oldMessages) return [message]
        return [...oldMessages, message]
      })
    }

    socketService.onNewMessage(handleNewMessage)

    return () => {
      socketService.offNewMessage(handleNewMessage)
    }
  }, [queryClient])

  return query
}

