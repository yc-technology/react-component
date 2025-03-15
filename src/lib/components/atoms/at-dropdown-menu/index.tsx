'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from '@radix-ui/react-icons'
import { clsxm, uuid_v4 } from '@yc-tech/shared'

const AtDropdownMenuRoot = DropdownMenuPrimitive.Root

const AtDropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const AtDropdownMenuGroup = DropdownMenuPrimitive.Group

const AtDropdownMenuPortal = DropdownMenuPrimitive.Portal

const AtDropdownMenuSub = DropdownMenuPrimitive.Sub

const AtDropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const AtDropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={clsxm(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
      inset && 'pl-8',
      className
    )}
    {...props}>
    {children}
    <ChevronRightIcon className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
AtDropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

const AtDropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={clsxm(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
))
AtDropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

const AtDropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={clsxm(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
AtDropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const AtDropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={clsxm(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
))
AtDropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const AtDropdownMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={clsxm(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    checked={checked}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
AtDropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

const AtDropdownMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={clsxm(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <DotFilledIcon className="h-4 w-4 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
AtDropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const AtDropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={clsxm('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
    {...props}
  />
))
AtDropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const AtDropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={clsxm('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
AtDropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const AtDropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={clsxm('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
  )
}
AtDropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

// django--------------
export type AtDropdownMenuOption = {
  label: string
  value: string | number
  disabled?: boolean
  [key: string]: any
}
export type AtDropdownMenuCheckBoxesProps = React.ComponentProps<typeof AtDropdownMenuRoot> & {
  className?: string
  value?: (string | number)[]
  defaultValue?: (string | number)[]
  options?: AtDropdownMenuOption[]
  triggerProps?: React.ComponentProps<typeof AtDropdownMenuTrigger>
  onValueChange?: (value: (string | number)[]) => void
  label?: string
}
// 下拉多选
const AtDropdownMenuCheckboxes = React.forwardRef<
  React.ComponentRef<typeof AtDropdownMenuRoot>,
  AtDropdownMenuCheckBoxesProps
>(
  (
    {
      className,
      children,
      triggerProps,
      options,
      value: outerValue,
      label,
      defaultValue,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const _idRef = React.useRef(uuid_v4())
    const [_value, _setValue] = React.useState<(string | number)[]>(defaultValue || [])

    const value = outerValue || _value

    const onCheckedChange = (v: string | number, checked: boolean) => {
      let temp = [...value] as (string | number)[]
      if (checked) {
        temp.push(v as never)
      } else {
        temp = temp.filter((item) => item !== v)
      }
      if (!outerValue) _setValue(temp)
      onValueChange?.(temp)
    }
    return (
      <AtDropdownMenuRoot {...props}>
        <AtDropdownMenuTrigger asChild {...triggerProps}>
          {children}
        </AtDropdownMenuTrigger>
        <AtDropdownMenuContent className="w-56">
          {label && (
            <>
              <AtDropdownMenuLabel>{label}</AtDropdownMenuLabel>
              <AtDropdownMenuSeparator />
            </>
          )}

          {options?.map((option) => (
            <AtDropdownMenuCheckboxItem
              key={`${_idRef.current}-at-dropdown-menu-checkbox-item-${option.value}`}
              checked={value?.includes(option.value as never)}
              onCheckedChange={(e) => onCheckedChange(option.value, e)}
              disabled={option.disabled}>
              {option.label}
            </AtDropdownMenuCheckboxItem>
          ))}
        </AtDropdownMenuContent>
      </AtDropdownMenuRoot>
    )
  }
)
export type AtDropdownMenuRadiosProps = React.ComponentProps<typeof AtDropdownMenuRoot> & {
  className?: string
  value?: string
  defaultValue?: string
  options?: AtDropdownMenuOption[]
  triggerProps?: React.ComponentProps<typeof AtDropdownMenuTrigger>
  radioGroupProps?: React.ComponentProps<typeof AtDropdownMenuRadioGroup>
  onValueChange?: (value: string) => void
  label?: string
}
// 下拉单选
const AtDropdownMenuRadios = React.forwardRef<
  React.ComponentRef<typeof AtDropdownMenuRoot>,
  AtDropdownMenuRadiosProps
>(
  (
    {
      className,
      children,
      triggerProps,
      options,
      value: outerValue,
      label,
      onValueChange,
      radioGroupProps,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const _idRef = React.useRef(uuid_v4())
    const [_value, _setValue] = React.useState<string>(defaultValue || '')
    const value = outerValue || _value
    const _onValueChange = (v: string) => {
      if (onValueChange) onValueChange?.(v)
      else _setValue(v)
    }
    return (
      <AtDropdownMenuRoot {...props}>
        <AtDropdownMenuTrigger asChild {...triggerProps}>
          {children}
        </AtDropdownMenuTrigger>
        <AtDropdownMenuContent className="w-56">
          {label && (
            <>
              <AtDropdownMenuLabel>{label}</AtDropdownMenuLabel>
              <AtDropdownMenuSeparator />
            </>
          )}
          <AtDropdownMenuRadioGroup
            {...radioGroupProps}
            value={value}
            onValueChange={_onValueChange}>
            {options?.map((option) => (
              <AtDropdownMenuRadioItem
                key={`${_idRef.current}-at-dropdown-menu-radio-item-${option.value}`}
                value={`${option.value}`}
                disabled={option.disabled}>
                {option.label}
              </AtDropdownMenuRadioItem>
            ))}
          </AtDropdownMenuRadioGroup>
        </AtDropdownMenuContent>
      </AtDropdownMenuRoot>
    )
  }
)

export {
  AtDropdownMenuRoot,
  AtDropdownMenuTrigger,
  AtDropdownMenuContent,
  AtDropdownMenuItem,
  AtDropdownMenuCheckboxItem,
  AtDropdownMenuRadioItem,
  AtDropdownMenuLabel,
  AtDropdownMenuSeparator,
  AtDropdownMenuShortcut,
  AtDropdownMenuGroup,
  AtDropdownMenuPortal,
  AtDropdownMenuSub,
  AtDropdownMenuSubContent,
  AtDropdownMenuSubTrigger,
  AtDropdownMenuRadioGroup,
  AtDropdownMenuCheckboxes,
  AtDropdownMenuRadios
}
