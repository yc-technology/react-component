import { Popconfirm, PopconfirmProps } from 'antd'
import { useState } from 'react'
import { useButton } from '~/lib/hooks/useButton'

export type AtPopconfirmProps = PopconfirmProps & {
  autoAsync?: boolean
  stopPropagation?: boolean
}

export function AtPopconfirm({
  onConfirm,
  onCancel,
  onOpenChange,
  open,
  autoAsync,
  stopPropagation,
  ...props
}: AtPopconfirmProps) {
  const [_open, _setOpen] = useState(false)
  const innerOpen = open ?? _open
  const _onOpenChange = (open: boolean) => {
    _setOpen(open)
    onOpenChange?.(open)
  }

  const { onClick: _onConfirm, loading: confirmLoading } = useButton({
    autoSync: autoAsync ?? true,
    stopPropagation: stopPropagation ?? true,
    onClick: async (e) => {
      if (autoAsync) {
        await onConfirm?.(e)
      } else {
        onConfirm?.(e)
      }
      _onOpenChange(false)
    }
  })

  const { onClick: _onCancel } = useButton({
    stopPropagation: stopPropagation ?? true,
    onClick: async (e) => {
      await onCancel?.(e)
      _onOpenChange(false)
    }
  })

  return (
    <Popconfirm
      open={innerOpen}
      okButtonProps={{
        loading: confirmLoading,
        onClick: _onConfirm
      }}
      cancelButtonProps={{
        onClick: _onCancel
      }}
      onOpenChange={_onOpenChange}
      {...props}
    />
  )
}
