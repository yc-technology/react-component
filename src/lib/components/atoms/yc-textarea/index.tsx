'use client'

import { clsxm } from '@yc-tech/shared'
import Textarea, { TextAreaRef } from 'rc-textarea'
import React, { forwardRef, useImperativeHandle, useMemo } from 'react'
import { InputProps } from 'rc-input'

type YcTextareaProps = {
  option?: React.ComponentProps<typeof Textarea> & { onValueChange?: (value: string) => void }
  suffix?: React.ReactNode
  prefix?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export type YcTextareaRef = {
  value: string
  setValue: (value: string) => void
}
export const YcTextarea = forwardRef<YcTextareaRef, YcTextareaProps>(function (
  { className, option, suffix, prefix, ...rest },
  ref
) {
  const {
    className: textareaClassName,
    value: outValue,
    onInput,
    onValueChange,
    ...restOption
  } = option || {}
  const textareaRef = React.useRef<TextAreaRef>(null)
  const [innerValue, setInnerValue] = React.useState(outValue)

  const value = React.useMemo(() => {
    return (outValue as string) ?? innerValue
  }, [outValue, innerValue])

  const setValue = (value: string) => {
    setInnerValue(value)
    onValueChange && onValueChange(value)
  }

  const onInnerInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value)
    onInput && onInput(e)
  }

  useImperativeHandle(
    ref,
    () => ({
      value,
      setValue
    }),
    [value]
  )

  return (
    <div
      {...rest}
      className={clsxm(
        'inline-flex items-center py-1 px-2 transition-colors border border-neutral-100 focus-visible:border-primary-500 rounded',
        className
      )}>
      {prefix}
      <Textarea
        ref={textareaRef}
        value={value}
        onInput={onInnerInput}
        {...restOption}
        className={clsxm(' outline-none flex-1 max-h-full', textareaClassName)}
      />
      {suffix}
    </div>
  )
})
