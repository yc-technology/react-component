import { Modal, ModalProps } from 'antd'
import { ForwardedRef, forwardRef, useImperativeHandle } from 'react'
import { useButton } from '~/lib/hooks/useButton'
import './style.less'
import { clsxm } from '@yc-tech/shared'

export type AtModalProps = Omit<ModalProps, 'onCancel' | 'onOk'> & {
  onChange?: (visible: boolean) => void
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void
  autoAsync?: boolean
}

export type AtModalIns = {
  open: () => void
  close: () => void
}

/**
 * 默认 filter 2px 毛玻璃
 * @param param0
 * @param ref
 * @returns
 */
export function AtModalComp(
  { onChange, autoAsync, onCancel, onOk, className, ...props }: AtModalProps,
  ref: ForwardedRef<AtModalIns>
) {
  const { onClick: cancel } = useButton({
    autoSync: autoAsync ?? true,
    stopPropagation: true,
    onClick: async (e) => {
      await onCancel?.(e)
      close()
    }
  })

  const { onClick: ok, loading: okLoading } = useButton({
    autoSync: autoAsync ?? true,
    stopPropagation: true,
    onClick: async (e) => {
      await onOk?.(e)
      close()
    }
  })

  const open = () => {
    onChange?.(true)
  }

  const close = () => {
    onChange?.(false)
  }

  useImperativeHandle(ref, () => ({
    open,
    close
  }))
  return (
    <Modal
      onCancel={cancel}
      onOk={ok}
      onClose={close}
      confirmLoading={okLoading}
      className={clsxm('ycc', className)}
      {...props}
      transitionName="at-modal-ycc"
    />
  )
}

export const AtModal = forwardRef<AtModalIns, AtModalProps>(AtModalComp)
