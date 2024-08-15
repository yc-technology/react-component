'use client'

import RcSelect, { BaseSelectRef } from 'rc-select'
import { BaseOptionType, DefaultOptionType, SelectProps } from 'rc-select/lib/Select'
import './index.less'
import { ArchiveIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { YcIcon } from '../yc-icon'
import { forwardRef } from 'react'
import { YcSpinner } from '../yc-spinner'

type YcSelectState = {
  loading?: boolean
  open?: boolean
  focused?: boolean
  showSearch?: boolean
  searchValue: string
}

export type YcSelectOptionType = BaseOptionType | DefaultOptionType

type YcSelectProps<
  ValueType = any,
  OptionType extends YcSelectOptionType = DefaultOptionType
> = SelectProps<ValueType, OptionType> & {
  children?: React.ReactNode
} & React.RefAttributes<BaseSelectRef>

export const YcSelect = forwardRef<BaseSelectRef, YcSelectProps>(function ({ ...rest }, ref) {
  const SuffixIcon = ({ loading }: YcSelectState) => {
    if (loading) {
      return <YcSpinner className="w-5 h-5" />
    }
    return <ChevronDownIcon className="w-5 h-5" />
  }
  const CloseIcon = () => <YcIcon icon="mingcute:close-line" className="w-3.5 h-3.5 " />
  const EmptyNode = () => (
    <div className="p-4 w-full h-full flex flex-col items-center justify-center">
      <ArchiveIcon className="w-5 h-5 text-neutral-400 mx-auto" />
      <div className="text-neutral-400 text-xs mt-2">No data available</div>
    </div>
  )
  return (
    <RcSelect
      // allowClear={{ clearIcon: <CloseIcon /> }}
      ref={ref}
      placeholder="Select an option"
      style={{ width: '100%' }}
      animation="slide-up"
      removeIcon={<CloseIcon />}
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
})
