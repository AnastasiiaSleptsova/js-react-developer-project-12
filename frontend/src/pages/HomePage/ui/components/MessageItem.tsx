import { FC } from 'react'
import { Button } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import { Message } from '@shared/api'
import { useTranslation } from 'react-i18next'
import { MessageActionsDropdown } from './MessageActionsDropdown'

import styles from '../MessagesList.module.scss'

interface MessageItemProps {
  message: Message
  isCurrentUser: boolean
  onEdit: (message: Message) => void
  onRemove: (message: Message) => void
}

export const MessageItem: FC<MessageItemProps> = ({ message, isCurrentUser, onEdit, onRemove }) => {
  const { t } = useTranslation()

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
      {isCurrentUser && (
        <MessageActionsDropdown
          onEdit={() => onEdit(message)}
          onRemove={() => onRemove(message)}
          renderTrigger={() => (
            <Button
              size="small"
              type="text"
              className={styles.actionsButton}
              icon={<EllipsisOutlined />}
              aria-label={t('Действия с сообщением')}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        />
      )}
    </div>
  )
}
