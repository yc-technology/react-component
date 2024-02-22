'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { YcButton } from '../yc-button'
import { clsxm } from '@yc-tech/shared'

export interface YcDialogRef {
  open: () => void
  close: () => void
}

const YcDialog = React.forwardRef<YcDialogRef, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>>(
  ({ open: propsOpen, ...props }, ref) => {
    const [innerOpen, setInnerOpen] = React.useState(false)

    React.useImperativeHandle(ref, () => ({
      open: () => setInnerOpen(true),
      close: () => setInnerOpen(false),
    }))

    const open = React.useMemo(() => {
      if (typeof propsOpen !== 'undefined') {
        return propsOpen
      }
      return innerOpen
    }, [innerOpen, propsOpen])

    const onOpenChange = React.useCallback(
      (open: boolean) => {
        if (typeof propsOpen === 'undefined') {
          setInnerOpen(open)
        }
      },
      [propsOpen],
    )

    return <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} {...props} />
  },
)

const YcDialogTrigger = DialogPrimitive.Trigger

const YcDialogPortal = DialogPrimitive.Portal

const YcDialogClose = DialogPrimitive.Close

const YcDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={clsxm(
      'fixed inset-0 z-50 bg-black/60  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
))
YcDialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const YcDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <YcDialogPortal>
    <YcDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      autoFocus={false}
      className={clsxm(
        'fixed left-[50%] top-[50%] z-50 grid overflow-hidden w-full md:max-w-[70vw] max-h-[80vh] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background  shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className,
      )}
      {...props}
    >
      <div className=" overflow-auto md:p-6 p-4 max-h-[inherit]">
        {children}
        <DialogPrimitive.Close autoFocus={false} asChild className="absolute right-4 top-4">
          <YcButton variant="ghost" size="tiny">
            <Cross2Icon className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </YcButton>
        </DialogPrimitive.Close>
      </div>
    </DialogPrimitive.Content>
  </YcDialogPortal>
))
YcDialogContent.displayName = DialogPrimitive.Content.displayName

const YcDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsxm('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
)
YcDialogHeader.displayName = 'DialogHeader'

const YcDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsxm('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)
YcDialogFooter.displayName = 'YcDialogFooter'

const YcDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={clsxm('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
YcDialogTitle.displayName = DialogPrimitive.Title.displayName

const YcDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={clsxm('text-sm text-muted-foreground', className)} {...props} />
))
YcDialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  YcDialog,
  YcDialogPortal,
  YcDialogOverlay,
  YcDialogTrigger,
  YcDialogClose,
  YcDialogContent,
  YcDialogHeader,
  YcDialogFooter,
  YcDialogTitle,
  YcDialogDescription,
}
