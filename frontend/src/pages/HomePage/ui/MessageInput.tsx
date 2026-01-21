import { useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button, Input } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useSendMessage } from '@features/chat'
import { useAppSelector } from '@app/store'

interface MessageFormData {
  body: string
}

export const MessageInput = () => {
  const inputRef = useRef<any>(null)
  const { control, handleSubmit, reset, watch } = useForm<MessageFormData>({
    defaultValues: { body: '' }, // TODO добавить сохранение черновиков в localStorage и восстановление при монтировании
  })
  const { mutate: sendMessage, isPending } = useSendMessage()
  const username = useAppSelector((state) => state.auth.username) // TODO использовать селекторы
  const selectedChannelId = useAppSelector((state) => state.chat.selectedChannelId)
  const messageValue = watch('body')

  const onSubmit = (data: MessageFormData) => {
    if (!messageValue.trim() || !selectedChannelId || !username) return

    sendMessage(
      {
        body: data.body,
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
    // Enter без Shift отправляет сообщение
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  if (!selectedChannelId) {
    return null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
      <div style={{ marginBottom: '8px' }}>
        <Controller
          name="body"
          control={control}
          render={({ field }) => (
            <Input.TextArea
              placeholder="Введите сообщение..."
              {...field}
              rows={3}
              disabled={isPending}
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
        icon={<SendOutlined />}
        loading={isPending}
        disabled={!messageValue.trim()}
        block
      >
        Отправить
      </Button>
    </form>
  )
}


