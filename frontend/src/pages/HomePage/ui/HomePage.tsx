import { FC } from 'react'
import { Layout } from 'antd'
import { ChatHeader } from './ChatHeader'
import { ChannelsList } from './ChannelsList'
import { MessagesList } from './MessagesList'

export const HomePage: FC = () => {
  return (
    <Layout style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ChatHeader />
      <Layout style={{ flex: 1, overflow: 'hidden' }}>
        <Layout.Sider width={250} style={{ overflow: 'auto', backgroundColor: '#fafafa' }}>
          <div style={{ padding: '16px', fontWeight: 'bold', borderBottom: '1px solid #d9d9d9' }}>
            📢 Каналы
          </div>
          <ChannelsList />
        </Layout.Sider>
        <Layout.Content style={{ overflow: 'auto', backgroundColor: '#fff' }}>
          <MessagesList />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
