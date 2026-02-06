import { EditOutlined, SendOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import type { TextAreaRef } from 'antd/es/input/TextArea'
import { useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useAppSelector } from '@app/store'

import { selectAuthUsername } from '@features/auth'
import { selectSelectedChannelId, useEditMessage, useSendMessage } from '@features/chat'

import type { Message } from '@shared/api'

import styles from './MessageInput.module.scss'

type MessageFormData = {
  body: string
}

type MessageInputProps = {
  editingMessage: Message | null
  onResetEditing: () => void
}

export const MessageInput = ({ editingMessage, onResetEditing }: MessageInputProps) => {
  const { t } = useTranslation()
  const inputRef = useRef<TextAreaRef | null>(null)
  const { control, handleSubmit, reset, watch, setValue } = useForm<MessageFormData>({
    defaultValues: { body: '' },
  })
  const { mutate: sendMessage, isPending: isSendPending } = useSendMessage()
  const { mutate: editMessage, isPending: isEditPending } = useEditMessage()
  const username = useAppSelector(selectAuthUsername)
  const selectedChannelId = useAppSelector(selectSelectedChannelId)
  const messageValue = watch('body')

  useEffect(() => {
    if (editingMessage) {
      setValue('body', editingMessage.body, { shouldDirty: true })
      const textArea = inputRef.current?.resizableTextArea?.textArea
      if (textArea) {
        setTimeout(() => {
          textArea.focus()
        }, 0)
      }
    }
  }, [editingMessage, setValue])

  const onSubmit = (data: MessageFormData) => {
    const trimmedBody = data.body.trim()
    if (!trimmedBody || !selectedChannelId || !username) return

    if (editingMessage) {
      editMessage(
        { id: String(editingMessage.id), body: trimmedBody },
        {
          onSuccess: () => {
            reset()
            onResetEditing()
            const textArea = inputRef.current?.resizableTextArea?.textArea
            if (textArea) {
              setTimeout(() => {
                textArea.focus()
              }, 0)
            }
          },
        },
      )
      return
    }

    sendMessage(
      {
        body: trimmedBody,
        channelId: selectedChannelId,
        username,
      },
      {
        onSuccess: () => {
          reset()
          // Возвращаем фокус на инпут после отправки
          const textArea = inputRef.current?.resizableTextArea?.textArea
          if (textArea) {
            setTimeout(() => {
              textArea.focus()
            }, 0)
          }
        },
      },
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  if (!selectedChannelId) {
    return null
  }

  const isSubmitting = isSendPending || isEditPending

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(onSubmit)(event)
      }}
      className={styles.form}
    >
      <div className={styles.inputWrapper}>
        <Controller
          name="body"
          control={control}
          render={({ field }) => (
            <Input.TextArea
              placeholder={t('Введите сообщение...')}
              {...field}
              rows={3}
              disabled={isSubmitting}
              onKeyDown={handleKeyDown}
              className={styles.textArea}
              ref={inputRef}
            />
          )}
        />
      </div>
      <Button
        htmlType="submit"
        type="primary"
        icon={editingMessage ? <EditOutlined /> : <SendOutlined />}
        loading={isSubmitting}
        disabled={!messageValue.trim()}
        block
      >
        {editingMessage ? t('Изменить сообщение') : t('Отправить')}
      </Button>
    </form>
  )
}
