import { io, Socket } from 'socket.io-client'

// Инстанс сокета
let socket: Socket | null = null

export const socketService = {
  // Инициализация соединения
  connect: () => {
    if (!socket) {
      socket = io('http://localhost:5001', {
        auth: {
          token: localStorage.getItem('token') || '',
        },
      })

      socket.on('connect', () => {
        console.log('Socket connected:', socket?.id)
      })

      socket.on('disconnect', () => {
        console.log('Socket disconnected')
      })

      socket.on('error', (error) => {
        console.error('Socket error:', error)
      })
    }
    return socket
  },

  // Получить сокет
  getSocket: (): Socket => {
    if (!socket) {
      socketService.connect()
    }
    return socket!
  },

  // Отключить соединение
  disconnect: () => {
    if (socket) {
      socket.disconnect()
      socket = null
    }
  },

  // Подписаться на событие новое сообщение
  onNewMessage: (callback: (message: any) => void) => {
    socketService.getSocket().on('newMessage', callback)
  },

  // Подписаться на событие новый канал
  onNewChannel: (callback: (channel: any) => void) => {
    socketService.getSocket().on('newChannel', callback)
  },

  // Подписаться на событие удаления канала
  onRemoveChannel: (callback: (payload: any) => void) => {
    socketService.getSocket().on('removeChannel', callback)
  },

  // Подписаться на событие переименования канала
  onRenameChannel: (callback: (channel: any) => void) => {
    socketService.getSocket().on('renameChannel', callback)
  },

  // Отписаться от события
  offNewMessage: (callback: (message: any) => void) => {
    socketService.getSocket().off('newMessage', callback)
  },

  offNewChannel: (callback: (channel: any) => void) => {
    socketService.getSocket().off('newChannel', callback)
  },

  offRemoveChannel: (callback: (payload: any) => void) => {
    socketService.getSocket().off('removeChannel', callback)
  },

  offRenameChannel: (callback: (channel: any) => void) => {
    socketService.getSocket().off('renameChannel', callback)
  },
}
