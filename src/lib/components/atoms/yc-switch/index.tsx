import { forwardRef } from 'react'
import { SwitchProps, Switch } from 'antd'

export type YcSwitchProps = SwitchProps

export const YcSwitch = forwardRef<HTMLButtonElement, YcSwitchProps>((props, ref) => {
  return <Switch ref={ref} {...props} />
})
