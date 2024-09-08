import React, { forwardRef, useImperativeHandle } from 'react'
import { MlAlertDialog, MlAlertDialogIns, MlAlertDialogProps } from '../../components'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { AtAlertDialogProps } from '../../components/atoms/at-alert-dialog'
import { nextTick } from '@yc-tech/shared'

export type MlAlertDialogOptions = {
  type?: 'info' | 'warning' | 'error' | 'confirm'
  content?: React.ReactNode
} & MlAlertDialogProps
export type MlAlertDialogContextValue = {
  confirm: (options?: MlAlertDialogOptions) => void
  error: (options?: MlAlertDialogOptions) => void
  warning: (options?: MlAlertDialogOptions) => void
  info: (options?: MlAlertDialogOptions) => void
}
export const MlAlertDialogContext = React.createContext<MlAlertDialogContextValue>(
  {} as MlAlertDialogContextValue
)

type MlAlertDialogProviderProps = {
  children: React.ReactNode
}

const InnerMlAlertDialog = forwardRef<MlAlertDialogContextValue, AtAlertDialogProps>(
  ({ ...props }, ref) => {
    const dialogRef = React.useRef<MlAlertDialogIns>(null)
    const [show, setShow] = React.useState(false)
    const [options, setOptions] = React.useState<MlAlertDialogOptions>({})
    const { content, type, ...rest } = options

    const open = async () => {
      setShow(true)
      await nextTick()
      dialogRef.current?.open()
    }

    const confirm = (options: MlAlertDialogOptions = {}) => {
      options.type = 'confirm'
      setOptions(options)
      open()
    }

    const error = (options: MlAlertDialogOptions = {}) => {
      options.type = 'error'
      options.title = (
        <div className="flex items-center gap-2">
          <InfoCircledIcon className="w-5 h-5 text-destructive" />
          {options.title}
        </div>
      )
      setOptions(options)
      open()
    }

    const warning = (options: MlAlertDialogOptions = {}) => {
      options.type = 'warning'
      options.title = (
        <div className="flex items-center gap-2">
          <InfoCircledIcon className="w-5 h-5 text-orange-300" />
          {options.title}
        </div>
      )
      setOptions(options)
      open()
    }

    const info = (options: MlAlertDialogOptions = {}) => {
      options.type = 'info'
      options.title = (
        <div className="flex items-center gap-2">
          <InfoCircledIcon className="w-5 h-5 text-blue-500" />
          {options.title}
        </div>
      )
      setOptions(options)
      open()
    }

    const onCloseAfter = () => {
      setShow(false)
      setOptions({})
    }

    useImperativeHandle(ref, () => ({
      confirm,
      error,
      warning,
      info
    }))

    return (
      <>
        {show && (
          <MlAlertDialog ref={dialogRef} onCloseAfter={onCloseAfter} {...rest}>
            {content}
          </MlAlertDialog>
        )}
      </>
    )
  }
)

export function MlAlertDialogProvider({ children, ...props }: MlAlertDialogProviderProps) {
  const dialogRef = React.useRef<MlAlertDialogContextValue>(null)
  const confirm = (options: MlAlertDialogOptions = {}) => dialogRef.current?.confirm(options)
  const error = (options: MlAlertDialogOptions = {}) => dialogRef.current?.error(options)
  const warning = (options: MlAlertDialogOptions = {}) => dialogRef.current?.warning(options)
  const info = (options: MlAlertDialogOptions = {}) => dialogRef.current?.info(options)
  return (
    <MlAlertDialogContext.Provider value={{ confirm, error, warning, info }}>
      {children}

      {<InnerMlAlertDialog ref={dialogRef} />}
    </MlAlertDialogContext.Provider>
  )
}
