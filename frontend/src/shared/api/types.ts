// Типы для работы с каналами и сообщениями
export interface Channel {
  id: string
  name: string
  removable: boolean
}

export interface Message {
  id: string
  body: string
  channelId: string
  username: string
}

export interface GetChannelsResponse {
  channels: Channel[]
}

export interface GetMessagesResponse {
  messages: Message[]
}
