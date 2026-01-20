import { useQuery } from '@tanstack/react-query'
import { ChatService, Message } from '@shared/api'

export const useMessages = () => {
  return useQuery<Message[], Error>({
    queryKey: ['messages'],
    queryFn: () => ChatService.getMessages(),
    staleTime: 1000 * 30,
  })
}
