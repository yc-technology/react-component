import React, { forwardRef } from 'react'
import {
  AtAlertDialog,
  AtAlertDialogAction,
  AtAlertDialogCancel,
  AtAlertDialogContent,
  AtAlertDialogDescription,
  AtAlertDialogFooter,
  AtAlertDialogHeader,
  AtAlertDialogTitle,
  AtAlertDialogTrigger
} from '../../atoms/at-alert-dialog'

export type MlAlertDialogIns = React.ComponentRef<typeof AtAlertDialog>
export type MlAlertDialogProps = React.ComponentPropsWithoutRef<typeof AtAlertDialog> & {
  onAction?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>
  cancelLabel?: string
  actionLabel?: string
  trigger?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  showCancel?: boolean
}
export const MlAlertDialog = forwardRef<MlAlertDialogIns, MlAlertDialogProps>(
  (
    {
      onAction,
      onCancel,
      children,
      showCancel = true,
      title = 'Are you absolutely sure?',
      description = 'This action cannot be undone.',
      cancelLabel = 'Cancel',
      actionLabel = 'Continue',
      trigger,
      ...props
    },
    ref
  ) => {
    return (
      <AtAlertDialog {...props} ref={ref}>
        {trigger && <AtAlertDialogTrigger>{trigger}</AtAlertDialogTrigger>}
        <AtAlertDialogContent>
          <AtAlertDialogHeader>
            <AtAlertDialogTitle>{title}</AtAlertDialogTitle>
            <AtAlertDialogDescription>{description}</AtAlertDialogDescription>
          </AtAlertDialogHeader>
          {children}
          <AtAlertDialogFooter>
            {showCancel && (
              <AtAlertDialogCancel onClick={onCancel}>{cancelLabel}</AtAlertDialogCancel>
            )}
            <AtAlertDialogAction onClick={onAction}>{actionLabel}</AtAlertDialogAction>
          </AtAlertDialogFooter>
        </AtAlertDialogContent>
      </AtAlertDialog>
    )
  }
)
