import { FC } from 'react'

import styles from '../MessagesList.module.scss'

interface Message {
  id: string | number
  body: string
  username: string
  channelId: string
}

interface MessageItemProps {
  message: Message
  isCurrentUser: boolean
}

export const MessageItem: FC<MessageItemProps> = ({ message, isCurrentUser }) => {
  return (
    <div
      className={`${styles.messageItem} ${
        isCurrentUser ? styles.isCurrentUser : styles.isOtherUser
      }`}
    >
      <div className={styles.messageBubble}>
        <span className={styles.username}>{message.username}</span>
        <p className={styles.body}>{message.body}</p>
      </div>
    </div>
  )
}
