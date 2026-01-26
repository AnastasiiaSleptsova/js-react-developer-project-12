import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChatService, Channel } from '@shared/api'

export const useEditChannel = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, newName }: { id: string; newName: string }) => ChatService.editChannel(id, { name: newName }),
    onSuccess: (data: Channel) => {
      queryClient.setQueryData(['channels'], (old: Channel[] | undefined) => {
        if (!old) return [data]
        return old.map((ch) => (String(ch.id) === String(data.id) ? data : ch))
      })
    },
  })
}
