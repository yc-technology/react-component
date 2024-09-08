import { useContext } from 'react'
import { MlAlertDialogContext, MlAlertDialogContextValue } from '../providers'

export function useMlAlertDialog() {
  const { ...rest } = useContext(MlAlertDialogContext)
  return { ...rest } as MlAlertDialogContextValue
}
