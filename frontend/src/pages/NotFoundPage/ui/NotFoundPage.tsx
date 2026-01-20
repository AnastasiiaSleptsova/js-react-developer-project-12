import { FC } from 'react'
import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export const NotFoundPage: FC = () => {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Result
        status="404"
        title="404"
        subTitle="К сожалению, страница которую вы ищете, не существует."
        extra={
          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/')}
          >
            Вернуться на главную
          </Button>
        }
      />
    </div>
  )
}
