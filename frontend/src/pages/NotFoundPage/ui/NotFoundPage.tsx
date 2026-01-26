import { FC } from 'react'
import { Result, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const NotFoundPage: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Result
        status="404"
        title="404"
        subTitle={t('К сожалению, страница которую вы ищете, не существует.')}
        extra={
          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/')}
          >
            {t('Вернуться на главную')}
          </Button>
        }
      />
    </div>
  )
}
