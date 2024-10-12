import * as React from 'react'
import { cva, type VariantProps } from 'cva'
import { clsxm } from '@yc-tech/shared'
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion'
import { YcIcon } from '../yc-icon'
import { AtButton } from '../at-button'
import { useControllableState } from '~/lib/hooks'

const atAlertVariants = cva({
  base: 'relative w-full border px-4 py-3 text-sm flex gap-3',
  variants: {
    variant: {
      default: 'bg-background text-foreground',
      destructive:
        'border-destructive/20 bg-destructive/10 dark:border-destructive [&>.at-alert-icon]:text-destructive',
      success:
        'border-success/20 bg-success/10 dark:border-success [&>.at-alert-icon]:text-success',
      info: 'border-info/20 bg-info/10 dark:border-info [&>.at-alert-icon]:text-info',
      warning: 'border-warning/20 bg-warning/10 dark:border-warning [&>.at-alert-icon]:text-warning'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})
export type AtAlertProps = Omit<HTMLMotionProps<'div'>, 'children'> &
  VariantProps<typeof atAlertVariants> & {
    title?: React.ReactNode
    radius?: number | string
    show?: boolean
    onShowChange?: (show: boolean) => void
    description?: React.ReactNode
    children?: React.ReactNode
    action?: (api: { open: () => void; close: () => void }) => React.ReactNode
    contentClassName?: string
    contentStyle?: React.CSSProperties
    showIcon?: boolean
    showClose?: boolean
  }

export type AtAlertRef = {
  nativeElement?: React.Ref<HTMLDivElement>
  show: () => void
  close: () => void
}
const AtAlert = React.forwardRef<AtAlertRef, AtAlertProps>(
  (
    {
      radius = 8,
      className,
      contentClassName,
      contentStyle,
      title,
      description,
      action,
      showClose = true,
      showIcon = true,
      variant,
      children,
      ...props
    },
    ref
  ) => {
    const [show, setShow] = useControllableState({
      prop: props.show,
      defaultProp: true,
      onChange: props.onShowChange
    })

    const elementRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => ({
      nativeElement: elementRef,
      show: () => setShow(true),
      close: () => setShow(false)
    }))

    const iconMap = {
      default: '',
      destructive: 'mingcute:close-circle-fill',
      success: 'mingcute:check-circle-fill',
      info: 'mingcute:warning-fill',
      warning: 'mingcute:warning-fill'
    }
    return (
      <AnimatePresence>
        {show && (
          <motion.div
            ref={elementRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, height: 0 },
              visible: { opacity: 1, height: 'auto' },
              exit: { opacity: 0, height: 0 }
            }}
            role="alert"
            className={clsxm('overflow-hidden', className)}
            {...props}>
            <div
              className={clsxm(atAlertVariants({ variant }), contentClassName)}
              style={{
                borderRadius: `${typeof radius === 'number' ? `${radius}px` : radius}`,
                ...contentStyle
              }}>
              {showIcon && variant && (
                <YcIcon icon={iconMap[variant]} className="w-5 h-5 at-alert-icon" />
              )}
              <div className="flex flex-col flex-1">
                {typeof title === 'string' ? <AtAlertTitle>{title}</AtAlertTitle> : title}
                {typeof description === 'string' ? (
                  <AtAlertDescription>{description}</AtAlertDescription>
                ) : (
                  description
                )}
                {children}
              </div>
              {action?.({ open: () => setShow(true), close: () => setShow(false) })}
              {showClose && (
                <AtButton
                  icon="mingcute:close-line"
                  variant="icon"
                  size="icon"
                  className="bg-transparent hover:bg-muted/40 w-6 h-6"
                  onClick={() => setShow(false)}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)
AtAlert.displayName = 'Alert'

const AtAlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={clsxm(' font-medium leading-none tracking-tight mb-1', className)}
    {...props}
  />
))
AtAlertTitle.displayName = 'AlertTitle'

const AtAlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={clsxm('text-sm [&_p]:leading-relaxed', className)} {...props} />
))
AtAlertDescription.displayName = 'AlertDescription'

export { AtAlert, AtAlertTitle, AtAlertDescription }
