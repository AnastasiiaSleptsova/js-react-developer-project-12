import { Skeleton } from 'antd'
import classNames from 'classnames'

import styles from '../MessagesList.module.scss'

const skeletonMessages = [
  {
    side: 'left' as const,
    widthClass: 'width64',
    heightClass: 'heightTall',
  },
  {
    side: 'right' as const,
    widthClass: 'width60',
    heightClass: 'heightRegular',
  },
  {
    side: 'left' as const,
    widthClass: 'width56',
    heightClass: 'heightRegular',
  },
  {
    side: 'right' as const,
    widthClass: 'width52',
    heightClass: 'heightTall',
  },
  {
    side: 'left' as const,
    widthClass: 'width48',
    heightClass: 'heightRegular',
  },
  {
    side: 'right' as const,
    widthClass: 'width44',
    heightClass: 'heightRegular',
  },
  {
    side: 'right' as const,
    widthClass: 'width58',
    heightClass: 'heightMedium',
  },
]

export const LoadingMessages = () => {
  return (
    <div className={styles.loadingPlaceholder}>
      <div className={styles.loadingHeader}>
        <Skeleton.Input active size="small" className={styles.loadingTitleSkeleton} />
        <Skeleton.Button active size="small" className={styles.loadingActionSkeleton} />
      </div>

      <div className={styles.loadingMessages}>
        {skeletonMessages.map((item, idx) => (
          <div
            key={idx}
            className={classNames(styles.skeletonMessage, {
              [styles.skeletonMessageRight]: item.side === 'right',
            })}
          >
            {item.side === 'left' && <Skeleton.Avatar active size="small" shape="circle" />}
            <Skeleton.Input
              active
              block
              className={classNames(
                styles.skeletonBubbleBlock,
                styles[item.widthClass],
                styles[item.heightClass],
              )}
            />
            {item.side === 'right' && <Skeleton.Avatar active size="small" shape="circle" />}
          </div>
        ))}
      </div>

      <div className={styles.loadingInput}>
        <Skeleton.Input active block className={styles.loadingInputSkeleton} />
      </div>
    </div>
  )
}
