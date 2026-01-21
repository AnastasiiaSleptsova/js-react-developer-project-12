import { FC } from 'react'
import { Alert } from 'antd'

export const ErrorMessages: FC = () => {
  return (
    <Alert
      title="Ошибка"
      description="Не удалось загрузить сообщения"
      type="error"
    />
  )
}
