import { FC } from 'react'
import classNames from 'classnames'

import styles from './SelectedChannelInfo.module.scss'

type SelectedChannelInfoProps = {
  channelName: string
  messageCount: number
  className?: string
}

export const SelectedChannelInfo: FC<SelectedChannelInfoProps> = ({
  channelName,
  messageCount,
  className,
}) => {
  const displayName = channelName || '—'

  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.name} title={displayName}>
        {displayName}
      </div>
      <div className={styles.count}>({messageCount})</div>
    </div>
  )
}
