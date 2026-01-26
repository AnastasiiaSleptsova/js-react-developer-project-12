import React, { useEffect } from 'react'
import { Modal, Input, Button } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = (existingNames: string[]) =>
  z.object({
    name: z
      .string()
      .min(1, { message: 'Введите имя канала' })
      .min(3, { message: 'Минимум 3 символа' })
      .max(20, { message: 'Максимум 20 символов' })
      .refine((val) => !existingNames.includes(val), { message: 'Канал с таким именем уже существует' }),
  })

type Props = {
  open: boolean
  onClose: () => void
  onSubmit: (name: string) => Promise<void>
  existingNames: string[]
}

export const AddChannelModal: React.FC<Props> = ({ open, onClose, onSubmit, existingNames }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<{ name: string }>({ 
    resolver: zodResolver(schema(existingNames)),
    defaultValues: { name: '' },
  })

  useEffect(() => {
    if (!open) reset()
  }, [open, reset])

  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Добавить канал">
      <form
        onSubmit={handleSubmit(async (values) => {
          await onSubmit(values.name)
        })}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input autoFocus placeholder="Имя канала" {...field} />}
        />
        {errors.name && <div style={{ color: 'red', marginTop: 6 }}>{errors.name.message}</div>}
        <div style={{ marginTop: 12, textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" loading={isSubmitting}>
            Создать
          </Button>
        </div>
      </form>
    </Modal>
  )
}
