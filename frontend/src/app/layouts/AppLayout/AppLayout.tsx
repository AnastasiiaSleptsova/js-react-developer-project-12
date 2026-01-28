import { FC } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

import { ChatHeader } from '@pages/HomePage/ui/ChatHeader'
import { useResponsive } from '@shared/hooks/useResponsive'
import { useHeaderConfig } from '@app/providers/HeaderConfigProvider'

import styles from './AppLayout.module.scss'

export const AppLayout: FC = () => {
  const { isMobile } = useResponsive()
  const { headerConfig } = useHeaderConfig()

  return (
    <Layout className={styles.layout}>
      <ChatHeader
        isMobile={headerConfig.isMobile ?? isMobile}
        onToggleChannels={headerConfig.onToggleChannels}
        showUserControls={headerConfig.showUserControls}
      />
      <Layout.Content className={styles.content}>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}
