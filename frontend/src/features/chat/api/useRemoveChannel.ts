import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { setSelectedChannel } from '@features/chat'

import type { Channel, Message } from '@shared/api'
import { ChatService } from '@shared/api'
import { isNetworkError } from '@shared/lib/networkError'
import { showError, showSuccess } from '@shared/lib/toast'

export const useRemoveChannel = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
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
        showError(t('Ошибка соединения'))
      } else {
        showError(t('Ошибка удаления канала'))
      }
    },
  })
}
