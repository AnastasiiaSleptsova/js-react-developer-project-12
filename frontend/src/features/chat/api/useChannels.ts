import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { ChatService, Channel, Message, socketService } from '@shared/api'
import { useAppDispatch } from '@app/store'
import { setSelectedChannel } from '@features/chat'

export const useChannels = () => {
  const queryClient = useQueryClient()

  const query = useQuery<Channel[], Error>({
    queryKey: ['channels'],
    queryFn: () => ChatService.getChannels(),
    staleTime: 1000 * 60 * 5,
  })
  const dispatch = useAppDispatch()

  // Подписываемся на события WebSocket для реального времени
  useEffect(() => {
    socketService.connect()

    const handleNewChannel = (channel: Channel) => {
      queryClient.setQueryData(['channels'], (oldChannels: Channel[] | undefined) => {
        if (!oldChannels) return [channel]
        return [...oldChannels, channel]
      })
    }

    const handleRemoveChannel = (payload: { id: string }) => {
      const removedId = String(payload.id)
      queryClient.setQueryData(['channels'], (oldChannels: Channel[] | undefined) => {
        if (!oldChannels) return []
        return oldChannels.filter((ch) => String(ch.id) !== removedId)
      })

      // Удаляем сообщения из кеша
      queryClient.setQueryData(['messages'], (oldMessages: Message[] | undefined) => {
        if (!oldMessages) return []
        return oldMessages.filter((m) => String(m.channelId) !== removedId)
      })

      // Если текущий выбранный канал был удалён — переключаем на первый
      const channels = queryClient.getQueryData<Channel[]>(['channels']) || []
      if (channels.length > 0) {
        dispatch(setSelectedChannel(String(channels[0].id)))
      } else {
        dispatch(setSelectedChannel(''))
      }
    }

    const handleRenameChannel = (channel: Channel) => {
      queryClient.setQueryData(['channels'], (oldChannels: Channel[] | undefined) => {
        if (!oldChannels) return [channel]
        return oldChannels.map((ch) => (ch.id === channel.id ? channel : ch))
      })
    }

    socketService.onNewChannel(handleNewChannel)
    socketService.onRemoveChannel(handleRemoveChannel)
    socketService.onRenameChannel(handleRenameChannel)

    return () => {
      socketService.offNewChannel(handleNewChannel)
      socketService.offRemoveChannel(handleRemoveChannel)
      socketService.offRenameChannel(handleRenameChannel)
    }
  }, [queryClient, dispatch])

  return query
}

