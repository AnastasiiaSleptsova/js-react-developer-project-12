import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChatService, Channel } from '@shared/api'
import { useAppDispatch } from '@app/store'
import { setSelectedChannel } from '@features/chat'

export const useCreateChannel = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: ({ name }: { name: string }) => ChatService.createChannel({ name }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['channels'] })
    },
    onSuccess: (data: Channel) => {
      // Переключаемся в созданный канал
      // Добавление канала в кеш произойдёт через socket событие newChannel
      if (data?.id) dispatch(setSelectedChannel(String(data.id)))
    },
  })
}
