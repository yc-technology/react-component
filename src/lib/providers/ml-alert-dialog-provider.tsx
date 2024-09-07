import React from 'react'

export type MlAlertDialogOptions = {
  title?: string
  description?: string
  type?: 'info' | 'warning' | 'error' | 'confirm'
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}
export type MlAlertDialogContextValue = {
  confirm: (options?: MlAlertDialogOptions) => void
}
export const MlAlertDialogContext = React.createContext({})

type MlAlertDialogProviderProps = {
  children: React.ReactNode
}

export function MlAlertDialogProvider({ children, ...props }: MlAlertDialogProviderProps) {
  return <MlAlertDialogContext.Provider value={{}}>{children}</MlAlertDialogContext.Provider>
}
