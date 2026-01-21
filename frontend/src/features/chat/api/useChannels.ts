import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ChatService, Channel, socketService } from '@shared/api'

export const useChannels = () => {
  const queryClient = useQueryClient()

  const query = useQuery<Channel[], Error>({
    queryKey: ['channels'],
    queryFn: () => ChatService.getChannels(),
    staleTime: 1000 * 60 * 5,
  })

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
      queryClient.setQueryData(['channels'], (oldChannels: Channel[] | undefined) => {
        if (!oldChannels) return []
        return oldChannels.filter((ch) => ch.id !== payload.id)
      })
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
  }, [queryClient])

  return query
}

