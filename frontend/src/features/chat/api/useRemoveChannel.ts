import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChatService, Channel, Message } from '@shared/api'
import { setSelectedChannel } from '@features/chat'
import { useAppDispatch } from '@app/store'
import { useTranslation } from 'react-i18next'
import { showError, showSuccess } from '@shared/lib/toast'
import { isNetworkError } from '@shared/lib/networkError'

export const useRemoveChannel = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: (id: string) => ChatService.removeChannel(id),
    networkMode: 'always',
    retry: false,
    onSuccess: (data: { id: string }) => {
      const removedId = String(data.id)
      queryClient.setQueryData(['channels'], (old: Channel[] | undefined) => {
        if (!old) return []
        return old.filter((ch) => String(ch.id) !== removedId)
      })

      queryClient.setQueryData(['messages', 'all'], (old: Message[] | undefined) => {
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
      showSuccess(t('Канал удалён'))
    },
    onError: (error) => {
      if (isNetworkError(error)) {
        showError(t('Похоже, нет соединения с интернетом'))
      } else {
        showError(t('Ошибка удаления канала'))
      }
    },
  })
}
