import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChatService, CreateMessagePayload, Message } from '@shared/api'
import { cleanProfanity } from '@shared/lib/profanity'
import { showError } from '@shared/lib/toast'
import { useTranslation } from 'react-i18next'
import { isNetworkError } from '@shared/lib/networkError'

export const useSendMessage = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<Message, Error, CreateMessagePayload>({
    mutationFn: (payload) =>
      ChatService.createMessage({
        ...payload,
        body: cleanProfanity(payload.body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', 'all'] }) // TODO вынести messages в queryKey константу и переиспользовать по проекту
    },
    onError: (error) => {
      if (isNetworkError(error)) {
        showError(t('Ошибка соединения'))
        return
      }

      showError(t('Не удалось отправить сообщение'))
    },
  })
}
