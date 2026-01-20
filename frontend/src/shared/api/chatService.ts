import { apiClient } from './apiClient'
import { Channel, Message } from './types'

// Сервис для работы с каналами и сообщениями чата
export class ChatService {
  // Получение списка всех каналов
  static async getChannels(): Promise<Channel[]> {
    const response = await apiClient.get<Channel[]>('/v1/channels')
    return response.data
  }

  // Получение всех сообщений
  static async getMessages(): Promise<Message[]> {
    const response = await apiClient.get<Message[]>('/v1/messages')
    return response.data
  }
}
