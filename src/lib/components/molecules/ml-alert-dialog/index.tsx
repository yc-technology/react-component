import React, { forwardRef } from 'react'
import { AtButton } from '../../atoms'
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

export type MlAlertDialogIns = React.ElementRef<typeof AtAlertDialog>
export type MlAlertDialogProps = React.ComponentPropsWithoutRef<typeof AtAlertDialog> & {
  onAction?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>
}
export const MlAlertDialog = forwardRef<MlAlertDialogIns, MlAlertDialogProps>(
  ({ onAction, onCancel, children, ...props }, ref) => {
    return (
      <AtAlertDialog {...props} ref={ref}>
        {children}
        <AtAlertDialogContent>
          <AtAlertDialogHeader>
            <AtAlertDialogTitle>Are you absolutely sure?</AtAlertDialogTitle>
            <AtAlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </AtAlertDialogDescription>
          </AtAlertDialogHeader>
          <AtAlertDialogFooter>
            <AtAlertDialogCancel onClick={onCancel}>Cancel</AtAlertDialogCancel>
            <AtAlertDialogAction onClick={onAction}>Continue</AtAlertDialogAction>
          </AtAlertDialogFooter>
        </AtAlertDialogContent>
      </AtAlertDialog>
    )
  }
)
