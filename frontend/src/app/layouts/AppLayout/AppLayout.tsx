import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

import { useResponsive } from '@shared/hooks/useResponsive'

import { ChatHeader, useHeaderConfig } from '@widgets/chatHeader'

import styles from './AppLayout.module.scss'

export const AppLayout = () => {
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
