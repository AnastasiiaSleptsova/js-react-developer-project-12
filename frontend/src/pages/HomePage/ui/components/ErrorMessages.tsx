import { FC } from 'react'
import { Alert } from 'antd'
import { useTranslation } from 'react-i18next'

export const ErrorMessages: FC = () => {
  const { t } = useTranslation()
  
  return (
    <Alert
      title={t('Ошибка')}
      description={t('Не удалось загрузить сообщения')}
      type="error"
    />
  )
}
