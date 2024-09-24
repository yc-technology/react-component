'use client'

import * as React from 'react'
import { useFormField } from '../yc-form'
import { clsxm } from '@yc-tech/shared'
import { Slot } from '@radix-ui/react-slot'

export type YcInputTextProps = React.InputHTMLAttributes<HTMLInputElement>
export type YcInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> & {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  textarea?: boolean
  inputClassName?: string
}

const YcInputText = React.forwardRef<HTMLInputElement, YcInputTextProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsxm(
          'focus-visible:outline-none inline-block flex-1 bg-transparent disabled:cursor-not-allowed max-w-full',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
YcInputText.displayName = 'InputText'

const YcInput = React.forwardRef<HTMLInputElement, YcInputProps>(
  ({ prefix, suffix, className, inputClassName, ...rest }, ref) => {
    const { error, formItemId } = useFormField()

    return (
      <div
        aria-disabled={!!rest.disabled}
        className={clsxm(
          'at-input flex gap-1 relative items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:bg-white focus-within:border-primary',
          { '!border-destructive': !!error },
          { 'cursor-not-allowed bg-neutral-50': !!rest.disabled },

          className
        )}>
        {prefix}
        <YcInputText ref={ref} className={clsxm(suffix && 'pr-6', inputClassName)} {...rest} />
        <Slot className="input-suffix absolute right-2">{suffix}</Slot>
      </div>
    )
  }
)
YcInput.displayName = 'Input'

export { YcInputText, YcInput }
