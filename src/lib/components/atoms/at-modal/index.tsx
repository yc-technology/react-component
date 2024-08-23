import { Modal } from '@douyinfe/semi-ui'
import { ModalReactProps } from '@douyinfe/semi-ui/lib/es/modal'
import { ForwardedRef, forwardRef, useImperativeHandle } from 'react'
import { useButton } from '~/lib/hooks/useButton'

export type AtModalProps = ModalReactProps & {
  onChange?: (visible: boolean) => void
  maskFilter?: number
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
  { onChange, maskFilter = 2, maskStyle, autoAsync, onCancel, onOk, ...props }: AtModalProps,
  ref: ForwardedRef<AtModalIns>
) {
  const { onClick: cancel, loading: cancelLoading } = useButton({
    autoSync: autoAsync ?? true,
    stopPropagation: true,
    onClick: async (e: React.MouseEvent) => {
      await onCancel?.(e)
      close()
    }
  })

  const { onClick: ok, loading: okLoading } = useButton({
    autoSync: autoAsync ?? true,
    stopPropagation: true,
    onClick: async (e: React.MouseEvent) => {
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
      onCancel={cancel as (e: React.MouseEvent) => void | Promise<any>}
      cancelLoading={cancelLoading}
      onOk={ok as (e: React.MouseEvent) => void | Promise<any>}
      confirmLoading={okLoading}
      maskStyle={{ backdropFilter: maskFilter ? `blur(${maskFilter}px)` : undefined, ...maskStyle }}
      {...props}
    />
  )
}

export const AtModal = forwardRef<AtModalIns, AtModalProps>(AtModalComp)
