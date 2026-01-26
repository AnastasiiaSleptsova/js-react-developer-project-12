import { FC, useState } from 'react'
import { Layout, Button, Space, Tooltip } from 'antd'
import { LogoutOutlined, BugOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RootState } from '@app/store'
import { logout } from '@features/auth'
import { clearSelectedChannel } from '@features/chat'
import { LanguageSelect } from '@features/i18n'

const { Header } = Layout

export const ChatHeader: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const username = useSelector((state: RootState) => state.auth.username)
  const [shouldCrash, setShouldCrash] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearSelectedChannel())
    navigate('/login')
  }

  if (shouldCrash) {
    throw new Error(t('Тестовая ошибка', { time: new Date().toISOString() }))
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
        <div style={{ fontSize: '18px', fontWeight: 600 }}>{t('💬 Hexlet Chat')}</div>
        <Space size='middle'>
          <span style={{ fontSize: '14px', color: '#333' }}>👤 {username}</span>
          <Tooltip title={t('Сознательно вызвать ошибку для проверки')}>
            <Button
              type="default"
              danger
              // ghost
              icon={<BugOutlined />}
              onClick={() => setShouldCrash(true)}
            >
              {t('Вызвать ошибку')}
            </Button>
          </Tooltip>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            {t('Выйти')}
          </Button>
          <LanguageSelect />
        </Space>
      </Header>
  )
}
