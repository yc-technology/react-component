'use client'

import { Select, RefSelectProps } from 'antd'
import { OptionProps, SelectProps } from 'antd/es/select'
import { forwardRef } from 'react'
export type YcSelectOptionProps = OptionProps
export type YcSelectIns = React.LegacyRef<RefSelectProps>
function YcSelectComp<T>(props: SelectProps, ref?: YcSelectIns) {
  return <Select<T> {...props} ref={ref} />
}

export const YcSelect = forwardRef(YcSelectComp) as <T = any>(
  p: SelectProps<T> & { ref?: RefSelectProps }
) => JSX.Element
