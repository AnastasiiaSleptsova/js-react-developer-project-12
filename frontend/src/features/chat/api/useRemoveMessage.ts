import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChatService, Message } from '@shared/api'
import { useTranslation } from 'react-i18next'
import { showError, showSuccess } from '@shared/lib/toast'
import { isNetworkError } from '@shared/lib/networkError'

export const useRemoveMessage = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: (id: string) => ChatService.removeMessage(id),
    networkMode: 'always',
    retry: false,
    onSuccess: (data: { id: string }) => {
      const removedId = String(data.id)
      queryClient.setQueryData(['messages', 'all'], (old: Message[] | undefined) => {
        if (!old) return []
        return old.filter((message) => String(message.id) !== removedId)
      })
      showSuccess(t('Сообщение удалено'))
    },
    onError: (error) => {
      if (isNetworkError(error)) {
        showError(t('Похоже, нет соединения с интернетом'))
      } else {
        showError(t('Ошибка удаления сообщения'))
      }
    },
  })
}
