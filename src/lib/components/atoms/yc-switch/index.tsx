import { Switch, SwitchProps } from 'antd'
import { forwardRef, useRef } from 'react'

export type YcSwitchProps = SwitchProps
export type YcSwitchIns = HTMLButtonElement

export const YcSwitch = forwardRef<HTMLButtonElement, YcSwitchProps>((props, ref) => {
  const r = useRef<HTMLButtonElement>(null)
  return <Switch ref={ref} {...props} />
})
