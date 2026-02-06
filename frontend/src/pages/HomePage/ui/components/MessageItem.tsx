import classNames from 'classnames'
import { EllipsisOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

import type { Message } from '@shared/api'

import { MessageActionsDropdown } from './MessageActionsDropdown'

import styles from '../MessagesList.module.scss'

type MessageItemProps = {
  message: Message
  isCurrentUser: boolean
  onEdit: (message: Message) => void
  onRemove: (message: Message) => void
}

export const MessageItem = ({ message, isCurrentUser, onEdit, onRemove }: MessageItemProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={classNames(styles.messageItem, {
        [styles.isCurrentUser]: isCurrentUser,
        [styles.isOtherUser]: !isCurrentUser,
      })}
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
