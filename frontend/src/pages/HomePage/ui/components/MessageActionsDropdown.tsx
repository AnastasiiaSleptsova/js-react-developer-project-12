import { Dropdown } from 'antd'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { ButtonProps, MenuProps } from 'antd'
import type { ReactNode } from 'react'

type MessageActionsDropdownProps = {
  onEdit: () => void
  onRemove: () => void
  renderTrigger: (args: { open: boolean; buttonProps?: Partial<ButtonProps> }) => ReactNode
}

export const MessageActionsDropdown = ({
  onEdit,
  onRemove,
  renderTrigger,
}: MessageActionsDropdownProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const menuItems = useMemo<MenuProps['items']>(
    () => [
      {
        key: 'edit',
        label: t('Редактировать сообщение'),
        onClick: () => {
          onEdit()
          setOpen(false)
        },
      },
      {
        key: 'remove',
        label: t('Удалить сообщение'),
        danger: true,
        onClick: () => {
          onRemove()
          setOpen(false)
        },
      },
    ],
    [onEdit, onRemove, t],
  )

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={['click']}
      open={open}
      onOpenChange={setOpen}
      placement="bottomRight"
    >
      {renderTrigger({ open })}
    </Dropdown>
  )
}
