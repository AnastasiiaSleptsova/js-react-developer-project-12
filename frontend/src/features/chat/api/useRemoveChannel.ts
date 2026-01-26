import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChatService, Channel, Message } from '@shared/api'
import { setSelectedChannel } from '@features/chat'
import { useAppDispatch } from '@app/store'

export const useRemoveChannel = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: (id: string) => ChatService.removeChannel(id),
    onSuccess: (data: { id: string }) => {
      const removedId = String(data.id)
      queryClient.setQueryData(['channels'], (old: Channel[] | undefined) => {
        if (!old) return []
        return old.filter((ch) => String(ch.id) !== removedId)
      })

      queryClient.setQueryData(['messages'], (old: Message[] | undefined) => {
        if (!old) return []
        return old.filter((m) => String(m.channelId) !== removedId)
      })

      // Если был удалён выбранный канал - выбрать первый из доступных
      const channels = queryClient.getQueryData<Channel[]>(['channels']) || []
      if (channels.length > 0) {
        dispatch(setSelectedChannel(String(channels[0].id)))
      } else {
        dispatch(setSelectedChannel(''))
      }
    },
  })
}
