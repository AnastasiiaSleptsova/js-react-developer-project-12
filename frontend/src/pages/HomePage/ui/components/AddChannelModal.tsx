import { zodResolver } from '@hookform/resolvers/zod'
import { Modal, Input, Button } from 'antd'
import type { InputRef } from 'antd'
import { useEffect, useMemo, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import styles from './AddChannelModal.module.scss'
import { buildChannelNameSchema } from './channelNameSchema'

type AddChannelModalProps = {
  open: boolean
  onClose: () => void
  onSubmit: (name: string) => Promise<void>
  existingNames: string[]
}

export const AddChannelModal = ({
  open,
  onClose,
  onSubmit,
  existingNames,
}: AddChannelModalProps) => {
  const { t } = useTranslation()
  const inputRef = useRef<InputRef>(null)

  const schema = useMemo(() => buildChannelNameSchema(t, existingNames), [t, existingNames])
  const resolver = useMemo(() => zodResolver(schema), [schema])

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<{ name: string }>({
    resolver,
    defaultValues: { name: '' },
  })
  const handleFormSubmit = handleSubmit(async (values) => {
    await onSubmit(values.name)
  })

  useEffect(() => {
    if (!open) {
      reset()
      return
    }
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
    return () => clearTimeout(timer)
  }, [open, reset])

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={t('Добавить канал')}
      centered
      width={520}
    >
      <form
        className={styles.form}
        onSubmit={(event) => {
          handleFormSubmit(event)
        }}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input placeholder={t('Имя канала')} {...field} ref={inputRef} />}
        />
        {errors.name && <div className={styles.error}>{errors.name.message}</div>}
        <div className={styles.footer}>
          <Button onClick={onClose}>{t('Отмена')}</Button>
          <Button htmlType="submit" type="primary" loading={isSubmitting}>
            {t('Создать')}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
