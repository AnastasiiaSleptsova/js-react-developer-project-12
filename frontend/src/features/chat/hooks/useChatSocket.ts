import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

// eslint-disable-next-line no-restricted-imports -- нужен типизированный хук для побочных эффектов сокетов
import { useAppDispatch } from '@app/store'
import { setSelectedChannel } from '@features/chat'

import type { Channel, Message, RemoveChannelResponse } from '@shared/api'
import { socketService } from '@shared/api'

/**
 * Единая точка подписки на сокет-события чата.
 * Подключает сокет один раз и синхронизирует кеш react-query + redux.
 */
export const useChatSocket = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const subscribedRef = useRef(false)

  useEffect(() => {
    if (subscribedRef.current) return
    subscribedRef.current = true

    socketService.connect()

    const handleNewChannel = (channel: Channel) => {
      queryClient.setQueryData(['channels'], (oldChannels: Channel[] | undefined) => {
        if (!oldChannels) return [channel]
        return [...oldChannels, channel]
      })
    }

    const handleRemoveChannel = (payload: RemoveChannelResponse) => {
      const removedId = String(payload.id)
      queryClient.setQueryData(['channels'], (oldChannels: Channel[] | undefined) => {
        if (!oldChannels) return []
        return oldChannels.filter((ch) => String(ch.id) !== removedId)
      })

      // Удаляем сообщения из кеша
      queryClient.setQueryData(['messages', 'all'], (oldMessages: Message[] | undefined) => {
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

    const handleNewMessage = (message: Message) => {
      queryClient.setQueryData(['messages', 'all'], (oldMessages: Message[] | undefined) => {
        if (!oldMessages) return [message]
        return [...oldMessages, message]
      })
    }

    socketService.onNewChannel(handleNewChannel)
    socketService.onRemoveChannel(handleRemoveChannel)
    socketService.onRenameChannel(handleRenameChannel)
    socketService.onNewMessage(handleNewMessage)

    return () => {
      socketService.offNewChannel(handleNewChannel)
      socketService.offRemoveChannel(handleRemoveChannel)
      socketService.offRenameChannel(handleRenameChannel)
      socketService.offNewMessage(handleNewMessage)
      subscribedRef.current = false
    }
  }, [dispatch, queryClient])
}
