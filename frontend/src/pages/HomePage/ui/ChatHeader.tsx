import { FC } from 'react'
import { Layout, Button, Space } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@app/store'
import { logout } from '@features/auth'
import { clearSelectedChannel } from '@features/chat'

const { Header } = Layout

export const ChatHeader: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const username = useSelector((state: RootState) => state.auth.username)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearSelectedChannel())
    navigate('/login')
  }

  return (
    <Header
      style={{
        background: '#1890ff',
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: '18px', fontWeight: 600 }}>💬 Чат</div>
      <Space size='middle'>
        <span style={{ fontSize: '14px', color: '#333' }}>👤 {username}</span>
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Выйти
        </Button>
      </Space>
    </Header>
  )
}
