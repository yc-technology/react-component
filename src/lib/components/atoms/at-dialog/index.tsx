'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { YcButton } from '../yc-button'
import { clsxm } from '@yc-tech/shared'
import { AtButton } from '../at-button'

export interface AtDialogIns {
  open: () => void
  close: () => void
}
export type AtDialogProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>
const AtDialog = React.forwardRef<AtDialogIns, AtDialogProps>(
  ({ open: propsOpen, onOpenChange, ...props }, ref) => {
    const [innerOpen, setInnerOpen] = React.useState(false)

    React.useImperativeHandle(ref, () => ({
      open: () => setInnerOpen(true),
      close: () => setInnerOpen(false)
    }))

    const open = React.useMemo(() => {
      if (typeof propsOpen !== 'undefined') {
        return propsOpen
      }
      return innerOpen
    }, [innerOpen, propsOpen])

    const _onOpenChange = React.useCallback(
      (open: boolean) => {
        if (typeof propsOpen === 'undefined') {
          setInnerOpen(open)
        }
        onOpenChange?.(open)
      },
      [propsOpen]
    )

    return <DialogPrimitive.Root open={open} onOpenChange={_onOpenChange} {...props} />
  }
)

const AtDialogTrigger = DialogPrimitive.Trigger

const AtDialogPortal = DialogPrimitive.Portal

const AtDialogClose = DialogPrimitive.Close

const AtDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={clsxm(
      'fixed inset-0 z-50 bg-black/60  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
AtDialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const AtDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AtDialogPortal>
    <AtDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      autoFocus={false}
      className={clsxm(
        'fixed left-[50%] md:p-6 p-4 top-[50%] z-50 grid overflow-hidden w-full md:max-w-[70vw] max-h-[80vh] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background  shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      {...props}>
      <div className=" overflow-auto  max-h-[inherit]">
        {children}
        <DialogPrimitive.Close autoFocus={false} asChild className="absolute right-4 top-4">
          <AtButton variant="icon" size="icon" className="w-6 h-6">
            <Cross2Icon className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </AtButton>
        </DialogPrimitive.Close>
      </div>
    </DialogPrimitive.Content>
  </AtDialogPortal>
))
AtDialogContent.displayName = DialogPrimitive.Content.displayName

const AtDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsxm('flex flex-col space-y-1.5 text-center sm:text-left', className)}
    {...props}
  />
)
AtDialogHeader.displayName = 'DialogHeader'

const AtDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsxm('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
)
AtDialogFooter.displayName = 'YcDialogFooter'

const AtDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={clsxm('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
AtDialogTitle.displayName = DialogPrimitive.Title.displayName

const AtDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={clsxm('text-sm text-muted-foreground', className)}
    {...props}
  />
))
AtDialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  AtDialog,
  AtDialogPortal,
  AtDialogOverlay,
  AtDialogTrigger,
  AtDialogClose,
  AtDialogContent,
  AtDialogHeader,
  AtDialogFooter,
  AtDialogTitle,
  AtDialogDescription
}
