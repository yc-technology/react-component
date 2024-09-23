import { isArray } from 'lodash-es'
import moment, { Moment } from 'moment'
import { PickerPanel, PickerPanelProps, RangePicker } from 'rc-picker'
import momentGenerateConfig from 'rc-picker/lib/generate/moment'
import en_GB from 'rc-picker/lib/locale/en_GB'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import './index.scss'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@radix-ui/react-icons'
import { PickerPanelRef } from 'rc-picker/lib/PickerPanel'
import { useControllableState } from '~/lib/hooks'

export type AtDatePickerPanelProps = Omit<
  PickerPanelProps<Moment>,
  'generateConfig' | 'locale' | 'value' | 'defaultValue'
> & {
  range?: boolean
  onValueChange?: (value?: Moment | Moment[]) => void
  onConfirm?: (value?: Moment | Moment[]) => void
  value?: Moment | Moment[]
  defaultValue?: Moment | Moment[]
}

export function AtDatePickerPanel({
  value: outerValue,
  defaultValue,
  range,
  onValueChange,
  onConfirm,
  mode,
  ...rest
}: AtDatePickerPanelProps) {
  const [value, setValue] = useControllableState({
    prop: outerValue,
    onChange: onValueChange,
    defaultProp: defaultValue ?? (range ? [] : moment())
  })
  const isRange = range && isArray(value)

  const hoverRangeValue = useMemo(() => {
    if (isRange) {
      return [value[0], value[1]] as [start: Moment, end: Moment]
    }
    return undefined
  }, [value, range, mode])

  // const [pickerValue, setPickerValue] = React.useState<Moment | undefined>(undefined)

  const [confirm, setConfirm] = React.useState(true)
  const [selectedValue, setSelectedValue] = React.useState<Moment>()
  const pickerRef = useRef<PickerPanelRef>(null)

  pickerRef.current?.nativeElement
  const onSelect = (newValue: Moment) => {
    if (isRange) {
      // 第一次选择记录开始时间
      if (confirm) {
        setValue?.([newValue, newValue])
      } else {
        // 第二次选择记录结束时间 range 选择结束
        onConfirm?.(value)
      }
      setSelectedValue(confirm ? newValue : undefined)
      setConfirm(!confirm)
    } else {
      setConfirm(true)
      setValue?.(newValue)
      onConfirm?.(value)
    }
  }

  // useUpdateEffect(() => {
  //   if (isRange && !confirm) {
  //     return
  //   }
  //   setPickerValue(isArray(value) ? value?.[1] : value)
  // }, [value])

  const onChange = (newValue: Moment | Moment[] | undefined, formatString?: string) => {
    console.log('Change:', newValue, formatString)
    // setValue(newValue)
  }

  const calculateHoverRangeValue = useCallback(
    function (newValue: Moment) {
      if (selectedValue) {
        const diff = newValue.diff(selectedValue)
        if (diff <= 0) {
          setValue?.([newValue, selectedValue])
        } else {
          setValue?.([selectedValue, newValue])
        }
      }
    },
    [selectedValue]
  )

  const onHover = (newValue: Moment) => {
    if (isRange) {
      // 还没有选择完成
      if (!confirm && newValue) {
        calculateHoverRangeValue(newValue)
      }
    }
  }

  const nextIcon = useMemo(() => {
    return <ChevronRightIcon className="w-4 h-4" />
  }, [])

  const prevIcon = useMemo(() => {
    return <ChevronLeftIcon className="w-4 h-4" />
  }, [])

  const superNextIcon = useMemo(() => {
    return <ArrowRightIcon className="w-4 h-4" />
  }, [])

  const superPrevIcon = useMemo(() => {
    return <ArrowLeftIcon className="w-4 h-4" />
  }, [])

  useEffect(() => {}, [])

  return (
    <PickerPanel<Moment>
      hoverRangeValue={hoverRangeValue}
      mode={mode}
      nextIcon={nextIcon}
      prevIcon={prevIcon}
      superNextIcon={superNextIcon}
      superPrevIcon={superPrevIcon}
      onSelect={onSelect}
      onChange={onChange}
      onHover={onHover}
      value={value}
      // pickerValue={pickerValue}
      // onPickerValueChange={setPickerValue}
      {...rest}
      generateConfig={momentGenerateConfig}
      locale={en_GB}
      ref={pickerRef}
    />
  )
}

export function AtDateRangPicker() {
  return (
    <>
      <RangePicker<Moment> value={undefined} locale={en_GB} generateConfig={momentGenerateConfig} />
    </>
    // <RangePicker components={{input: }}/>
  )
}
