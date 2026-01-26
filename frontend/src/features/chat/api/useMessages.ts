import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChatService, Message } from '@shared/api'

export const useMessages = (channelId: string | null) => {
  // Храним полный список сообщений под единым ключом
  const baseQuery = useQuery<Message[], Error>({
    queryKey: ['messages', 'all'],
    queryFn: () => ChatService.getMessages(),
    staleTime: 1000 * 30,
  })

  // Отдаём наружу только сообщения выбранного канала, без дополнительного запроса
  const filteredMessages = useMemo(() => {
    if (!channelId || !baseQuery.data) return []
    return baseQuery.data.filter((m) => m.channelId === channelId)
  }, [baseQuery.data, channelId])

  return {
    ...baseQuery,
    data: filteredMessages,
  }
}
