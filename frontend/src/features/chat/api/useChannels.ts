import { useQuery } from '@tanstack/react-query'

import { ChatService, Channel } from '@shared/api'

export const useChannels = () => {
  return useQuery<Channel[], Error>({
    queryKey: ['channels'],
    queryFn: () => ChatService.getChannels(),
    staleTime: 1000 * 60 * 5,
  })
}
