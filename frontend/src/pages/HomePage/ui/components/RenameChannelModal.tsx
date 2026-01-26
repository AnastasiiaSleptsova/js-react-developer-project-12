import React, { useEffect, useRef } from 'react'
import { Modal, Input, Button } from 'antd'
import type { InputRef } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import styles from './RenameChannelModal.module.scss'

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
  id: string
  initialName: string
  existingNames: string[]
}

export const RenameChannelModal: React.FC<Props> = ({ open, onClose, onSubmit, id, initialName, existingNames }) => {
  const inputRef = useRef<InputRef>(null)
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<{ name: string }>({ 
    resolver: zodResolver(schema(existingNames)),
    defaultValues: { name: initialName },
  })

  useEffect(() => {
    if (open) {
      reset({ name: initialName })
    }
  }, [open, initialName, reset])

  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
    return () => clearTimeout(timer)
  }, [open])

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Переименовать канал"
      centered
      width={520}
    >
      <form
        className={styles.form}
        onSubmit={handleSubmit(async (values) => {
          await onSubmit(values.name)
        })}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Имя канала"
              {...field}
              ref={inputRef}
            />
          )}
        />
        {errors.name && <div className={styles.error}>{errors.name.message}</div>}
        <div className={styles.footer}>
          <Button onClick={onClose}>
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" loading={isSubmitting}>
            Сохранить
          </Button>
        </div>
      </form>
    </Modal>
  )
}
