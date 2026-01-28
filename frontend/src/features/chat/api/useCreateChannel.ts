import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChatService, Channel } from '@shared/api'
import { useAppDispatch } from '@app/store'
import { setSelectedChannel } from '@features/chat'
import { useTranslation } from 'react-i18next'
import { showError, showSuccess } from '@shared/lib/toast'
import { isNetworkError } from '@shared/lib/networkError'

export const useCreateChannel = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
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
