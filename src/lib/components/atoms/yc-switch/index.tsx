import { forwardRef } from 'react'
import { Switch } from '@douyinfe/semi-ui'
import { SwitchProps } from '@douyinfe/semi-ui/lib/es/switch'

export type YcSwitchProps = SwitchProps

export const YcSwitch = forwardRef<Switch, YcSwitchProps>((props, ref) => {
  return <Switch ref={ref} {...props} />
})
