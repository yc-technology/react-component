'use client'

import RcSelect, { BaseSelectRef } from 'rc-select'
import { BaseOptionType, DefaultOptionType, SelectProps } from 'rc-select/lib/Select'
import './index.less'
import { ArchiveIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { YcIcon } from '../yc-icon'

export function YcSelect<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType
>({
  ...rest
}: SelectProps<ValueType, OptionType> & {
  children?: React.ReactNode
} & React.RefAttributes<BaseSelectRef>) {
  const SuffixIcon = () => <ChevronDownIcon className="w-5 h-5" />
  const CloseIcon = () => <YcIcon icon="mingcute:close-circle-fill" className="w-5 h-5 bg-white" />
  const EmptyNode = () => (
    <div className="p-4 w-full h-full flex flex-col items-center justify-center">
      <ArchiveIcon className="w-5 h-5 text-neutral-400 mx-auto" />
      <div className="text-neutral-400 text-xs mt-2">No data available</div>
    </div>
  )
  return (
    <RcSelect
      // allowClear={{ clearIcon: <CloseIcon /> }}
      placeholder="Select an option"
      style={{ width: '100%' }}
      animation="slide-up"
      // showSearch
      dropdownMatchSelectWidth={false}
      dropdownStyle={{
        width: 'auto'
      }}
      notFoundContent={<EmptyNode />}
      menuItemSelectedIcon={false}
      suffixIcon={SuffixIcon}
      {...rest}></RcSelect>
  )
}
