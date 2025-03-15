'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { clsxm } from '@yc-tech/shared'
import { useControllableState } from '~/lib/hooks'
import { AtLabel } from '../at-label'

type AtCheckboxGroupContextValue = {
  value?: string[]
  setValue?: React.Dispatch<React.SetStateAction<string[] | undefined>>
}
const AtCheckboxGroupContext = React.createContext<AtCheckboxGroupContextValue | null>(null)

export type AtCheckboxGroupProps = React.ComponentPropsWithoutRef<'div'> & {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}
export type AtCheckboxGroupIns = React.ComponentRef<'div'>
const AtCheckboxGroup = React.forwardRef<AtCheckboxGroupIns, AtCheckboxGroupProps>(
  ({ children, value: valueProps, defaultValue, onValueChange, ...props }, ref) => {
    const [value, setValue] = useControllableState<string[]>({
      prop: valueProps,
      onChange: onValueChange,
      defaultProp: defaultValue
    })

    const contextValue = React.useMemo(() => ({ value, setValue }), [value, setValue])

    return (
      <AtCheckboxGroupContext.Provider value={contextValue}>
        <div ref={ref} {...props}>
          {children}
        </div>
      </AtCheckboxGroupContext.Provider>
    )
  }
)

export type AtCheckboxProps = Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  'value'
> & {
  value?: string
  label?: string
  boxClassName?: string
}
export type AtCheckboxIns = React.ComponentRef<typeof CheckboxPrimitive.Root>
const AtCheckbox = React.forwardRef<AtCheckboxIns, AtCheckboxProps>(
  (
    {
      children,
      className,
      boxClassName,
      value,
      checked: checkProps,
      defaultChecked,
      label,
      onCheckedChange,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(AtCheckboxGroupContext)
    const [checked, setChecked] = useControllableState<CheckboxPrimitive.CheckedState>({
      prop: checkProps,
      defaultProp: defaultChecked,
      onChange: onCheckedChange
    })

    const _onCheckedChange = (checked: boolean) => {
      if (context?.setValue && value) {
        const newValue = checked
          ? [...(context.value ?? []), value]
          : (context.value ?? []).filter((v) => v !== value)
        context.setValue(newValue)
      } else {
        setChecked?.(checked)
      }
    }

    React.useEffect(() => {
      if (context?.value && value) {
        setChecked(context.value.includes(value))
      }
    }, [context?.value])

    const _onClick = (e: React.MouseEvent<HTMLDivElement>) => {
      _onCheckedChange(!checked)
    }

    return (
      <div className={clsxm('flex items-center gap-2', className)}>
        <CheckboxPrimitive.Root
          ref={ref}
          checked={checked}
          className={clsxm(
            'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
            boxClassName
          )}
          onCheckedChange={_onCheckedChange}
          {...props}>
          <CheckboxPrimitive.Indicator
            className={clsxm('flex items-center justify-center text-current')}>
            <CheckIcon className="h-4 w-4" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <div onClick={_onClick}>
          {label && <AtLabel>{label}</AtLabel>}
          {children}
        </div>
      </div>
    )
  }
)
AtCheckbox.displayName = CheckboxPrimitive.Root.displayName

export { AtCheckboxGroup, AtCheckbox }
