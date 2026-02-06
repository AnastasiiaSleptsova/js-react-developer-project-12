import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import type { Message } from '@shared/api'
import { ChatService } from '@shared/api'

export const useMessages = (channelId: string | null) => {
  // Храним полный список сообщений под единым ключом
  // TODO: разделить queryKey по channelId вместо единого кеша и вынести ключи в константы
  const baseQuery = useQuery<Message[], Error>({
    queryKey: ['messages', 'all'],
    queryFn: () => ChatService.getMessages(),
    staleTime: 30_000,
    refetchInterval: 30_000,
    refetchIntervalInBackground: true,
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
