import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Space } from 'antd'
import type { MenuProps } from 'antd'
import { useMemo } from 'react'

import { useLanguage } from '../hooks/useLanguage'

import styles from './LanguageSelect.module.scss'

const FLAGS: Record<'ru' | 'en', string> = {
  ru: '🇷🇺',
  en: '🇬🇧',
}

export const LanguageSelect = () => {
  const { language, changeLanguage } = useLanguage()

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'ru',
        label: (
          <Space size={8} className={styles.option}>
            <span>{FLAGS.ru}</span>
            <span>RU</span>
          </Space>
        ),
        onClick: () => changeLanguage('ru'),
      },
      {
        key: 'en',
        label: (
          <Space size={8} className={styles.option}>
            <span>{FLAGS.en}</span>
            <span>EN</span>
          </Space>
        ),
        onClick: () => changeLanguage('en'),
      },
    ],
    [changeLanguage],
  )

  const currentLabel = (
    <Space size={6} className={styles.triggerContent}>
      <span>{FLAGS[language]}</span>
      <span className={styles.code}>{language === 'en' ? 'EN' : 'RU'}</span>
      <DownOutlined className={styles.caret} />
    </Space>
  )

  return (
    <Dropdown menu={{ items }} trigger={['click']} overlayClassName={styles.dropdown}>
      <Button type="default" size="middle" className={styles.trigger}>
        {currentLabel}
      </Button>
    </Dropdown>
  )
}
