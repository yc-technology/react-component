'use client'

import { Select, RefSelectProps } from 'antd'
import { DefaultOptionType, SelectProps } from 'antd/es/select'
import { forwardRef } from 'react'
export type YcSelectOptionType = DefaultOptionType
export type YcSelectIns = React.Ref<RefSelectProps>
function YcSelectComp<T>(props: SelectProps, ref?: YcSelectIns) {
  return <Select<T> {...props} ref={ref} />
}

export const YcSelect = forwardRef(YcSelectComp) as <T = any>(
  p: SelectProps<T> & { ref?: RefSelectProps }
) => React.ReactElement
