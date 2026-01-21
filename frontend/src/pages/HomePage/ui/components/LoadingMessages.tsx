import { FC } from 'react'
import { Skeleton } from 'antd'

export const LoadingMessages: FC = () => {
  return (
    <div style={{ padding: '16px' }}>
      <Skeleton active paragraph={{ rows: 5 }} />
    </div>
  )
}
