import { useChannels } from '@features/chat'
import { useAppDispatch, useAppSelector } from '@app/store'
import { setSelectedChannel } from '@features/chat'
import { Alert, List, Skeleton } from 'antd'

export const ChannelsList = () => {
  const { data: channels = [], isLoading, error } = useChannels()
  const dispatch = useAppDispatch()
  const selectedChannelId = useAppSelector((state) => state.chat.selectedChannelId)

  if (isLoading) {
    return (
      <div style={{ padding: '16px' }}>
        <Skeleton active paragraph={{ rows: 5 }} />
      </div>
    )
  }

  if (error) {
    return <Alert title="Ошибка" description="Не удалось загрузить каналы" type="error" />
  }

  return (
    <List
      dataSource={channels}
      renderItem={(channel) => (
        <List.Item
          key={channel.id}
          onClick={() => dispatch(setSelectedChannel(channel.id))}
          style={{
            backgroundColor: selectedChannelId === channel.id ? '#e6f7ff' : 'transparent',
            borderLeft: selectedChannelId === channel.id ? '4px solid #1890ff' : 'none',
            paddingLeft: '12px',
            cursor: 'pointer',
            transition: 'all .3s ease',
          }}
        >
          <span># {channel.name}</span>
        </List.Item>
      )}
    />
  )
}
