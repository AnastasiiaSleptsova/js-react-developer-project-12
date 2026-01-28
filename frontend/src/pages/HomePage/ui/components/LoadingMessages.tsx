import { FC, useMemo } from 'react'
import { Skeleton } from 'antd'

import styles from '../MessagesList.module.scss'

const SKELETON_MESSAGES_COUNT = 6

export const LoadingMessages: FC = () => {
  const skeletonMessages = useMemo(
    () => {
      const base = Array.from({ length: SKELETON_MESSAGES_COUNT }, (_, index) => ({
        side: (index % 2 === 0 ? 'left' : 'right'),
        width: `${64 - index * 4}%`,
        height: index % 3 === 0 ? 74 : 54,
      }))

      // Добавляем дополнительный пузырь справа, чтобы подчеркнуть сообщения текущего пользователя
      return [
        ...base,
        {
          side: 'right' as const,
          width: '58%',
          height: 62,
        },
      ]
    },
    [],
  )

  return (
    <div className={styles.loadingPlaceholder}>
      <div className={styles.loadingHeader}>
        <Skeleton.Input active size="small" style={{ width: 180 }} />
        <Skeleton.Button active size="small" style={{ width: 90 }} />
      </div>

      <div className={styles.loadingMessages}>
        {skeletonMessages.map((item, idx) => (
          <div
            key={idx}
            className={`${styles.skeletonMessage} ${
              item.side === 'right' ? styles.skeletonMessageRight : ''
            }`}
          >
            {item.side === 'left' && (
              <Skeleton.Avatar active size="small" shape="circle" />
            )}
            <Skeleton.Input
              active
              block
              style={{ width: item.width, height: item.height }}
            />
            {item.side === 'right' && (
              <Skeleton.Avatar active size="small" shape="circle" />
            )}
          </div>
        ))}
      </div>

      <div className={styles.loadingInput}>
        <Skeleton.Input active block style={{ height: 48 }} />
      </div>
    </div>
  )
}
