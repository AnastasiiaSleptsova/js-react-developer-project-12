import { Layout, Drawer } from 'antd'
import { useState, useCallback, useEffect } from 'react'

import { useChatSocket } from '@features/chat/hooks/useChatSocket'

import { useResponsive } from '@shared/hooks/useResponsive'

import { useHeaderConfig } from '@widgets/chatHeader'

import { ChannelsList } from './ChannelsList'
import { MessagesList } from './MessagesList'

import styles from './HomePage.module.scss'

export const HomePage = () => {
  useChatSocket()
  const { isMobile } = useResponsive()
  const { setHeaderConfig, resetHeaderConfig } = useHeaderConfig()
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  useEffect(() => {
    setHeaderConfig({
      isMobile,
      onToggleChannels: openDrawer,
      showUserControls: true,
    })

    return () => resetHeaderConfig()
  }, [isMobile, openDrawer, resetHeaderConfig, setHeaderConfig])

  return (
    <Layout className={styles.layoutRoot}>
      <Layout className={styles.mainArea}>
        <Layout.Sider width={250} className={styles.sider}>
          <ChannelsList onChannelSelected={closeDrawer} />
        </Layout.Sider>
        <Layout.Content className={styles.content}>
          <MessagesList />
        </Layout.Content>
      </Layout>
      <Drawer
        title={null}
        placement="left"
        width={280}
        onClose={closeDrawer}
        open={isMobile && isDrawerOpen}
        destroyOnClose
        rootClassName={styles.drawer}
      >
        <ChannelsList onChannelSelected={closeDrawer} />
      </Drawer>
    </Layout>
  )
}
