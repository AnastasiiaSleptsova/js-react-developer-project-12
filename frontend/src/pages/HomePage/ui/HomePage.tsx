import { FC } from 'react'
import { Layout } from 'antd'
import { ChatHeader } from './ChatHeader'
import { ChannelsList } from './ChannelsList'
import { MessagesList } from './MessagesList'
import { useChatSocket } from '@features/chat/hooks/useChatSocket'

export const HomePage: FC = () => {
  useChatSocket()

  return (
    <Layout style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ChatHeader />
      <Layout style={{ flex: 1, overflow: 'hidden' }}>
        <Layout.Sider width={250} style={{ overflow: 'auto', backgroundColor: '#fafafa' }}>
          <ChannelsList />
        </Layout.Sider>
        <Layout.Content style={{ overflow: 'auto', backgroundColor: '#fff' }}>
          <MessagesList />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
