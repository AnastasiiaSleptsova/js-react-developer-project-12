import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { setSelectedChannel } from '@features/chat'

import type { Channel } from '@shared/api'
import { ChatService } from '@shared/api'
import { isNetworkError } from '@shared/lib/networkError'
import { showError, showSuccess } from '@shared/lib/toast'

export const useCreateChannel = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ name }: { name: string }) => ChatService.createChannel({ name }),
    networkMode: 'always',
    retry: false,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['channels'] })
    },
    onSuccess: (data: Channel) => {
      // Переключаемся в созданный канал
      // Добавление канала в кеш произойдёт через socket событие newChannel
      if (data?.id) dispatch(setSelectedChannel(String(data.id)))
      showSuccess(t('Канал создан'))
    },
    onError: (error) => {
      if (isNetworkError(error)) {
        showError(t('Ошибка соединения'))
      } else {
        showError(t('Ошибка создания канала'))
      }
    },
  })
}
