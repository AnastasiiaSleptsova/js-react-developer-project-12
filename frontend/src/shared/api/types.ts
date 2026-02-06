// Типы для работы с каналами и сообщениями
export type Channel = {
  id: string
  name: string
  removable: boolean
}

export type Message = {
  id: string
  body: string
  channelId: string
  username: string
}

export type CreateChannelRequest = {
  name: string
}

export type EditChannelRequest = {
  name: string
}

export type RemoveChannelResponse = {
  id: string
}

export type GetChannelsResponse = {
  channels: Channel[]
}

export type GetMessagesResponse = {
  messages: Message[]
}
