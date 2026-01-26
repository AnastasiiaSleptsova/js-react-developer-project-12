import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChatService, Channel } from '@shared/api'
import { useTranslation } from 'react-i18next'
import { showError, showSuccess } from '@shared/lib/toast'
import { isNetworkError } from '@shared/lib/networkError'

export const useEditChannel = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ id, newName }: { id: string; newName: string }) => ChatService.editChannel(id, { name: newName }),
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
        showError(t('Похоже, нет соединения с интернетом'))
      } else {
        showError(t('Ошибка переименования канала'))
      }
    },
  })
}
