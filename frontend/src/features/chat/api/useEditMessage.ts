import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import type { Message } from '@shared/api'
import { ChatService } from '@shared/api'
import { isNetworkError } from '@shared/lib/networkError'
import { cleanProfanity } from '@shared/lib/profanity'
import { showError, showSuccess } from '@shared/lib/toast'

export const useEditMessage = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: string }) =>
      ChatService.editMessage(id, { body: cleanProfanity(body) }),
    networkMode: 'always',
    retry: false,
    onSuccess: (updatedMessage: Message) => {
      queryClient.setQueryData(['messages', 'all'], (old: Message[] | undefined) => {
        if (!old) return [updatedMessage]
        return old.map((message) =>
          String(message.id) === String(updatedMessage.id) ? updatedMessage : message,
        )
      })
      showSuccess(t('Сообщение обновлено'))
    },
    onError: (error) => {
      if (isNetworkError(error)) {
        showError(t('Ошибка соединения'))
      } else {
        showError(t('Ошибка обновления сообщения'))
      }
    },
  })
}
