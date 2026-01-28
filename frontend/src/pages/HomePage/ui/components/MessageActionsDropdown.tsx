import { FC, ReactNode, useMemo, useState } from 'react'
import { Dropdown, ButtonProps, MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'

type MessageActionsDropdownProps = {
  onEdit: () => void
  onRemove: () => void
  renderTrigger: (args: { open: boolean; buttonProps?: Partial<ButtonProps> }) => ReactNode
}

export const MessageActionsDropdown: FC<MessageActionsDropdownProps> = ({
  onEdit,
  onRemove,
  renderTrigger,
}) => {
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
