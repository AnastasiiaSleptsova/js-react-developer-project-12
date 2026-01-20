import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { logout } from '@/features/auth'
import { RootState } from '@/app/store'

// Компонент главной страницы (страница с чатом)
export const HomePage: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // Username хранится в Redux для отображения в UI
  const username = useSelector((state: RootState) => state.auth.username)

  // Обработчик выхода из аккаунта
  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div style={{ padding: '24px' }}>
      <h1>Добро пожаловать, {username}!</h1>
      <p>Это будет ваша страница с чатом</p>
      <Button danger onClick={handleLogout}>
        Выйти
      </Button>
    </div>
  )
}
