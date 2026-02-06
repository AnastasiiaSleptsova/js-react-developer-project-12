import { LogoutOutlined, BugOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Button, Space, Tooltip, Dropdown, Segmented } from 'antd'
import type { MenuProps } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { logout, selectAuthUsername } from '@features/auth'
import { clearSelectedChannel } from '@features/chat'
import { LanguageSelect, useLanguage } from '@features/i18n'

import { routePaths } from '@shared/config/routes'
import { useAppDispatch, useAppSelector } from '@shared/hooks/useAppStore'

import styles from './ChatHeader.module.scss'

const { Header } = Layout

type ChatHeaderProps = {
  onToggleChannels?: () => void
  isMobile?: boolean
  showUserControls?: boolean
}

export const ChatHeader = ({
  onToggleChannels,
  isMobile = false,
  showUserControls = true,
}: ChatHeaderProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const username = useAppSelector(selectAuthUsername)
  const [shouldCrash, setShouldCrash] = useState(false)
  const { language, changeLanguage } = useLanguage()
  const displayUserControls = showUserControls !== false
  const handleToggleChannels = onToggleChannels ?? (() => undefined)

  const handleLogout = useCallback(() => {
    dispatch(logout())
    dispatch(clearSelectedChannel())
    void navigate(routePaths.login)
  }, [dispatch, navigate])

  if (shouldCrash) {
    throw new Error(t('Тестовая ошибка: {{time}}', { time: new Date().toISOString() }))
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
                <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
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
