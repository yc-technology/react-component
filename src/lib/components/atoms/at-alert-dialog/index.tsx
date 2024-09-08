'use client'

import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { clsxm, sleep } from '@yc-tech/shared'
import { AtButton } from '../at-button'

type AtAlertDialogContextValue = {
  open: () => void
  close: () => void
  cancelLoading: boolean
  setCancelLoading: (loading: boolean) => void
  actionLoading: boolean
  setActionLoading: (loading: boolean) => void
}
const AtAlertDialogContext = React.createContext<AtAlertDialogContextValue>(
  {} as AtAlertDialogContextValue
)
export interface AtAlertDialogIns {
  open: () => void
  close: () => void
}

AlertDialogPrimitive.createAlertDialogScope
export type AtAlertDialogProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Root
> & {
  onCloseAfter?: () => void | Promise<void>
  onOpenAfter?: () => void | Promise<void>
}
const AtAlertDialog = React.forwardRef<AtAlertDialogIns, AtAlertDialogProps>(
  ({ open: propsOpen, onOpenChange, onCloseAfter, onOpenAfter, ...props }, ref) => {
    const [innerOpen, setInnerOpen] = React.useState(false)
    const [cancelLoading, setCancelLoading] = React.useState(false)
    const [actionLoading, setActionLoading] = React.useState(false)

    const _onOpenChange = (open: boolean) => {
      if (!open) {
        sleep(150).then(() => {
          // 关闭动画结束后，调用回调
          onCloseAfter?.()
        })
      } else {
        // 打开动画结束后，调用回调
        onOpenAfter?.()
      }

      if (typeof propsOpen === 'undefined') {
        setInnerOpen(open)
      }
      onOpenChange?.(open)
    }

    React.useImperativeHandle(ref, () => ({
      open: () => _onOpenChange(true),
      close: () => _onOpenChange(false)
    }))

    const open = React.useMemo(() => {
      if (typeof propsOpen !== 'undefined') {
        return propsOpen
      }
      return innerOpen
    }, [innerOpen, propsOpen])

    const contextValue = React.useMemo(() => {
      return {
        open: () => _onOpenChange(true),
        close: () => _onOpenChange(false),
        cancelLoading,
        setCancelLoading,
        actionLoading,
        setActionLoading
      }
    }, [propsOpen, cancelLoading, actionLoading])

    return (
      <AtAlertDialogContext.Provider value={contextValue}>
        <AlertDialogPrimitive.Root open={open} onOpenChange={_onOpenChange} {...props} />
      </AtAlertDialogContext.Provider>
    )
  }
)

const AtAlertDialogTrigger = AlertDialogPrimitive.Trigger

const AtAlertDialogPortal = AlertDialogPrimitive.Portal

const AtAlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={clsxm(
      'fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
))
AtAlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AtAlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AtAlertDialogPortal>
    <AtAlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={clsxm(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      {...props}
    />
  </AtAlertDialogPortal>
))
AtAlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AtAlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsxm('flex flex-col space-y-2 text-center sm:text-left', className)}
    {...props}
  />
)
AtAlertDialogHeader.displayName = 'AlertDialogHeader'

const AtAlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsxm('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
)
AtAlertDialogFooter.displayName = 'AlertDialogFooter'

const AtAlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={clsxm('text-lg font-semibold', className)}
    {...props}
  />
))
AtAlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AtAlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={clsxm('text-sm text-muted-foreground', className)}
    {...props}
  />
))
AtAlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName

const AtAlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AtButton>,
  React.ComponentPropsWithoutRef<typeof AtButton>
>(({ className, onClick, ...props }, ref) => {
  const { close, cancelLoading, setActionLoading } = React.useContext(AtAlertDialogContext)
  const _onClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (cancelLoading) return
    if (onClick) {
      try {
        setActionLoading(true)
        await onClick(e)
      } catch (error) {
        throw error
      } finally {
        setActionLoading(false)
      }
    }
    close()
  }
  return <AtButton ref={ref} autoSync onClick={_onClick} className={clsxm(className)} {...props} />
})

AtAlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AtAlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AtButton>,
  React.ComponentPropsWithoutRef<typeof AtButton>
>(({ className, onClick, ...props }, ref) => {
  const { close, actionLoading, setCancelLoading } = React.useContext(AtAlertDialogContext)
  const _onClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (actionLoading) return
    if (onClick) {
      try {
        setCancelLoading(true)
        await onClick(e)
      } catch (error) {
        throw error
      } finally {
        setCancelLoading(false)
      }
    }
    close()
  }

  return (
    <AtButton
      ref={ref}
      variant="outline"
      className={clsxm('mt-2 sm:mt-0', className)}
      onClick={_onClick}
      autoSync
      {...props}
    />
  )
})
AtAlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AtAlertDialog,
  AtAlertDialogPortal,
  AtAlertDialogOverlay,
  AtAlertDialogTrigger,
  AtAlertDialogContent,
  AtAlertDialogHeader,
  AtAlertDialogFooter,
  AtAlertDialogTitle,
  AtAlertDialogDescription,
  AtAlertDialogAction,
  AtAlertDialogCancel
}
