import { EditOutlined, SendOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useAppSelector } from '@app/store'

import { useEditMessage, useSendMessage } from '@features/chat'

import type { Message } from '@shared/api'

type MessageFormData = {
  body: string
}

type MessageInputProps = {
  editingMessage: Message | null
  onResetEditing: () => void
}

export const MessageInput = ({ editingMessage, onResetEditing }: MessageInputProps) => {
  const { t } = useTranslation()
  const inputRef = useRef<any>(null)
  const { control, handleSubmit, reset, watch, setValue } = useForm<MessageFormData>({
    defaultValues: { body: '' },
  })
  const { mutate: sendMessage, isPending: isSendPending } = useSendMessage()
  const { mutate: editMessage, isPending: isEditPending } = useEditMessage()
  const username = useAppSelector((state) => state.auth.username) // TODO использовать селекторы
  const selectedChannelId = useAppSelector((state) => state.chat.selectedChannelId)
  const messageValue = watch('body')

  useEffect(() => {
    if (editingMessage) {
      setValue('body', editingMessage.body, { shouldDirty: true })
      if (inputRef.current?.resizableTextArea?.textArea) {
        setTimeout(() => {
          inputRef.current.resizableTextArea.textArea.focus()
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
            if (inputRef.current?.resizableTextArea?.textArea) {
              setTimeout(() => {
                inputRef.current.resizableTextArea.textArea.focus()
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
          if (inputRef.current?.resizableTextArea?.textArea) {
            setTimeout(() => {
              inputRef.current.resizableTextArea.textArea.focus()
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
      style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }} // TODO вынести стили
    >
      <div style={{ marginBottom: '8px' }}>
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
              style={{ resize: 'none' }}
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
