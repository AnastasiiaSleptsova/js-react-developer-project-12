import { FC, useMemo, useState } from 'react'
import { Layout, Button, Space, Tooltip, Dropdown, MenuProps, Segmented } from 'antd'
import { LogoutOutlined, BugOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RootState } from '@app/store'
import { logout } from '@features/auth'
import { clearSelectedChannel } from '@features/chat'
import { LanguageSelect } from '@features/i18n'
import { useLanguage } from '@features/i18n/hooks/useLanguage'
import styles from './ChatHeader.module.scss'

const { Header } = Layout

interface ChatHeaderProps {
  onToggleChannels?: () => void
  isMobile?: boolean
  showUserControls?: boolean
}

export const ChatHeader: FC<ChatHeaderProps> = ({
  onToggleChannels,
  isMobile = false,
  showUserControls = true,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const username = useSelector((state: RootState) => state.auth.username)
  const [shouldCrash, setShouldCrash] = useState(false)
  const { language, changeLanguage } = useLanguage()
  const displayUserControls = showUserControls !== false
  const handleToggleChannels = onToggleChannels ?? (() => {})

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearSelectedChannel())
    navigate('/login')
  }

  if (shouldCrash) {
    throw new Error(t('Тестовая ошибка', { time: new Date().toISOString() }))
  }

  const mobileMenuItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'crash',
        label: (
          <Button
            type="default"
            danger
            block
            size="middle"
            className={styles.menuAction}
            onClick={() => setShouldCrash(true)}
            icon={<BugOutlined />}
          >
            {t('Вызвать ошибку')}
          </Button>
        ),
      },
      {
        key: 'logout',
        label: (
          <Button
            type="primary"
            danger
            block
            size="middle"
            className={styles.menuAction}
            onClick={handleLogout}
            icon={<LogoutOutlined />}
          >
            {t('Выйти')}
          </Button>
        ),
      },
      { type: 'divider' },
      {
        key: 'lang',
        label: (
          <div className={styles.langToggle}>
            <Segmented
              options={[
                { label: 'RU', value: 'ru' },
                { label: 'EN', value: 'en' },
              ]}
              size="small"
              value={language}
              onChange={(val) => changeLanguage(val as 'ru' | 'en')}
            />
          </div>
        ),
      },
    ],
    [changeLanguage, handleLogout, language, t],
  )

  return (
    <Header className={styles.header}>
      <div className={styles.titleRow}>
        {isMobile && !!onToggleChannels && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            aria-label={t('Каналы')}
            className={styles.menuButton}
            onClick={handleToggleChannels}
          />
        )}
        <div className={styles.title}>{t('Hexlet Chat')}</div>
      </div>
      {isMobile ? (
        displayUserControls ? (
          <Dropdown menu={{ items: mobileMenuItems }} trigger={['click']}>
            <Button type="text" icon={<UserOutlined />} className={styles.userButton}>
              <span className={styles.userButtonText}>{username}</span>
            </Button>
          </Dropdown>
        ) : (
          <div className={styles.mobileActions}>
            <LanguageSelect />
          </div>
        )
      ) : (
        <div className={styles.actions}>
          <Space size="middle" wrap className={styles.actionsSpace}>
            {displayUserControls && (
              <>
                <span className={styles.username}>👤 {username}</span>
                <Tooltip title={t('Сознательно вызвать ошибку для проверки')}>
                  <Button
                    type="default"
                    danger
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
              </>
            )}
            <LanguageSelect />
          </Space>
        </div>
      )}
    </Header>
  )
}
