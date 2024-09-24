import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@radix-ui/react-icons'
import { clsxm, nextTick } from '@yc-tech/shared'
import { isArray } from 'lodash-es'
import { Moment } from 'moment'
import { PickerPanel, PickerPanelProps, RangePicker } from 'rc-picker'
import momentGenerateConfig from 'rc-picker/lib/generate/moment'
import en_GB from 'rc-picker/lib/locale/en_GB'
import { PickerPanelRef } from 'rc-picker/lib/PickerPanel'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useControllableState } from '~/lib/hooks'
import { AtButton } from '../at-button'
import { AtPopover, AtPopoverContent, AtPopoverTrigger } from '../at-popover'
import { YcInput } from '../yc-input'
import './index.scss'

export type AtDatePickerPanelProps = Omit<
  PickerPanelProps<Moment>,
  'generateConfig' | 'locale' | 'value' | 'defaultValue'
> & {
  range?: boolean
  panel?: boolean
  onValueChange?: (value?: Moment | Moment[]) => void
  onConfirm?: (value?: Moment | Moment[]) => void
  value?: Moment | Moment[]
  defaultValue?: Moment | Moment[]
}

export function AtDatePickerPanel({
  value: outerValue,
  defaultValue,
  panel,
  range,
  onValueChange,
  onConfirm,
  mode,
  ...rest
}: AtDatePickerPanelProps) {
  const [value, setValue] = useControllableState({
    prop: outerValue,
    onChange: onValueChange,
    defaultProp: defaultValue ?? (range ? [] : undefined)
  })
  const [lastValue, setLastValue] = React.useState<Moment | Moment[] | undefined>(value)
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

export type AtDatePickerProps = AtDatePickerPanelProps & {
  placeholder?: string
  className?: string
  clearable?: boolean
  inputClassName?: string
}

export function AtDatePicker({
  placeholder,
  value: valueProps,
  onValueChange,
  defaultValue,
  clearable,
  className,
  format = 'YYYY-MM-DD',
  onConfirm,
  inputClassName,
  ...props
}: AtDatePickerProps) {
  const [value, setValue] = useControllableState<Moment | Moment[]>({
    prop: valueProps,
    onChange: onValueChange,
    defaultProp: defaultValue ?? (props.range ? [] : undefined)
  })
  const [show, setShow] = React.useState(false)
  const [confirm, setConfirm] = React.useState(false)
  const [lastValue, setLastValue] = React.useState<Moment | Moment[] | undefined>(value)

  const _onConfirm = async (v?: Moment | Moment[]) => {
    onConfirm?.(v)
    setConfirm(true)
    setLastValue(v)
    await nextTick()
    setShow(false)
  }

  const onClear = () => {
    setValue?.(isArray(value) ? [] : undefined)
    _onConfirm?.(isArray(value) ? [] : undefined)
  }

  // 确保在 range 模式下，点击确认后，再次点击输入框，否则显示上次的值
  useEffect(() => {
    if (props.range) {
      if (!show && !confirm) {
        setValue?.(lastValue)
      }

      if (show && confirm) {
        setConfirm(false)
      }
    }
  }, [props.range, show, confirm])

  const valueFormat = useMemo(() => {
    if (isArray(value)) {
      return value.map((v) => v.format(format)).join(' ~ ') || undefined
    }
    return value?.format(format)
  }, [value])

  const hasValue = isArray(value) ? value.length > 0 : !!value

  return (
    <AtPopover open={show} onOpenChange={setShow}>
      <AtPopoverTrigger asChild>
        <YcInput
          value={valueFormat ?? placeholder}
          suffix={
            clearable &&
            hasValue && (
              <AtButton
                icon="mingcute:close-circle-line"
                size="icon"
                variant="icon"
                tooltip="clear"
                autoSync={false}
                className="transition-opacity opacity-0 group-hover:opacity-100 bg-transparent w-6 h-6"
                onClick={onClear}
              />
            )
          }
          className={clsxm('group', inputClassName)}
          inputClassName={clsxm(!hasValue && 'text-muted-foreground', 'text-left')}
        />
      </AtPopoverTrigger>
      <AtPopoverContent>
        <div className={clsxm('[&>.rc-picker-panel]:p-0')}>
          <AtDatePickerPanel
            value={value}
            onValueChange={setValue}
            onConfirm={_onConfirm}
            {...props}
          />
        </div>
      </AtPopoverContent>
    </AtPopover>
  )
}
