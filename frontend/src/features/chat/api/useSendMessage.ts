import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChatService, CreateMessagePayload, Message } from '@shared/api'

export const useSendMessage = () => {
  const queryClient = useQueryClient()

  return useMutation<Message, Error, CreateMessagePayload>({
    mutationFn: (payload) => ChatService.createMessage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] }) // TODO вынести messages в queryKey константу и переиспользовать по проекту
    },
  })
}
