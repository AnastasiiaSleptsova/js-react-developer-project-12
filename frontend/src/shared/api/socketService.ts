import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'

// Инстанс сокета
let socket: Socket | null = null
// TODO: добавить типизацию payload'ов и централизованный reconnect, refresh токена, disconnect при logout

// URL сокет-сервера:
// - в dev всё ходит через прокси Vite на текущий origin (порт 5002),
// - в проде бэкенд и статика на одном origin, поэтому тоже берём его,
// - при необходимости можно задать VITE_SOCKET_URL.
const socketUrl = import.meta.env.VITE_SOCKET_URL ?? window.location.origin

export const socketService = {
  // Инициализация соединения
  connect: () => {
    if (!socket) {
      socket = io(socketUrl, {
        auth: {
          token: localStorage.getItem('token') || '',
        },
        // Конфигурация для работы с CORS и инкогнито сессиями
        withCredentials: true,
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        // Для работы в инкогнито и различных браузерах
        closeOnBeforeunload: false,
      })

      socket.on('connect', () => {
        console.info('Socket connected:', socket?.id)
      })

      socket.on('disconnect', () => {
        console.info('Socket disconnected')
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
