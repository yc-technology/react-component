'use client'

import { Select } from '@douyinfe/semi-ui'
import { SelectProps, OptionProps } from '@douyinfe/semi-ui/lib/es/select'
export type YcSelectOptionProps = OptionProps

export function YcSelect(props: SelectProps) {
  return <Select {...props} />
}

YcSelect.displayName = 'YcSelect'
