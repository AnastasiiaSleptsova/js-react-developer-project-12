import { apiClient } from './apiClient'

import type { Channel, Message } from './types'

export type CreateMessagePayload = {
  body: string
  channelId: string
  username: string
}

export type EditMessagePayload = {
  body: string
}

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

  // Создание нового сообщения
  static async createMessage(payload: CreateMessagePayload): Promise<Message> {
    const response = await apiClient.post<Message>('/v1/messages', payload)
    return response.data
  }

  // Редактирование сообщения
  static async editMessage(id: string, payload: EditMessagePayload): Promise<Message> {
    const response = await apiClient.patch<Message>(`/v1/messages/${id}`, payload)
    return response.data
  }

  // Удаление сообщения
  static async removeMessage(id: string): Promise<{ id: string }> {
    const response = await apiClient.delete<{ id: string }>(`/v1/messages/${id}`)
    return response.data
  }

  // Создать канал
  static async createChannel(payload: { name: string }) {
    const response = await apiClient.post('/v1/channels', payload)
    return response.data
  }

  // Переименовать канал
  static async editChannel(id: string, payload: { name: string }) {
    const response = await apiClient.patch(`/v1/channels/${id}`, payload)
    return response.data
  }

  // Удалить канал
  static async removeChannel(id: string) {
    const response = await apiClient.delete(`/v1/channels/${id}`)
    return response.data
  }
}
