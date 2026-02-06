import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import type { Channel } from '@shared/api'
import { ChatService } from '@shared/api'
import { isNetworkError } from '@shared/lib/networkError'
import { showError, showSuccess } from '@shared/lib/toast'

export const useEditChannel = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ id, newName }: { id: string; newName: string }) =>
      ChatService.editChannel(id, { name: newName }),
    networkMode: 'always',
    retry: false,
    onSuccess: (data: Channel) => {
      queryClient.setQueryData(['channels'], (old: Channel[] | undefined) => {
        if (!old) return [data]
        return old.map((ch) => (String(ch.id) === String(data.id) ? data : ch))
      })
      showSuccess(t('Канал переименован'))
    },
    onError: (error) => {
      if (isNetworkError(error)) {
        showError(t('Ошибка соединения'))
      } else {
        showError(t('Ошибка переименования канала'))
      }
    },
  })
}
