import { FC, useState, useCallback } from 'react'
import { Layout, Drawer } from 'antd'
import { ChatHeader } from './ChatHeader'
import { ChannelsList } from './ChannelsList'
import { MessagesList } from './MessagesList'
import { useChatSocket } from '@features/chat/hooks/useChatSocket'
import { useResponsive } from '@shared/hooks/useResponsive'

import styles from './HomePage.module.scss'

export const HomePage: FC = () => {
  useChatSocket()
  const { isMobile } = useResponsive()
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return (
    <Layout className={styles.layoutRoot}>
      <ChatHeader onToggleChannels={openDrawer} isMobile={isMobile} />
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
        bodyStyle={{ padding: 0 }}
        headerStyle={{ display: 'none' }}
      >
        <ChannelsList onChannelSelected={closeDrawer} />
      </Drawer>
    </Layout>
  )
}
