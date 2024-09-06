'use client'

import * as React from 'react'
import { CaretSortIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import { clsxm, uuid_v4 } from '@yc-tech/shared'

const AtSelectRoot = SelectPrimitive.Root

const AtSelectGroup = SelectPrimitive.Group

const AtSelectValue = SelectPrimitive.Value

const AtSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={clsxm(
      'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className
    )}
    {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <CaretSortIcon className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
AtSelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const AtSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={clsxm('flex cursor-default items-center justify-center py-1', className)}
    {...props}>
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
))
AtSelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const AtSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={clsxm('flex cursor-default items-center justify-center py-1', className)}
    {...props}>
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
))
AtSelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

const AtSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={clsxm(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}>
      <AtSelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={clsxm(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}>
        {children}
      </SelectPrimitive.Viewport>
      <AtSelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
AtSelectContent.displayName = SelectPrimitive.Content.displayName

const AtSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={clsxm('px-2 py-1.5 text-sm font-semibold', className)}
    {...props}
  />
))
AtSelectLabel.displayName = SelectPrimitive.Label.displayName

const AtSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={clsxm(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}>
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
AtSelectItem.displayName = SelectPrimitive.Item.displayName

const AtSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={clsxm('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
AtSelectSeparator.displayName = SelectPrimitive.Separator.displayName

export type AtSelectOption = {
  value: string
  label: string
  disabled?: boolean
  selected?: boolean
  icon?: React.ReactNode
  children?: AtSelectOption[]
}
export type AtSelectProps = React.ComponentProps<typeof AtSelectRoot> & {
  children?: React.ReactNode
  contentProps?: React.ComponentProps<typeof AtSelectContent>
  triggerProps?: React.ComponentProps<typeof AtSelectTrigger>
  valueProps?: React.ComponentProps<typeof AtSelectValue>
  options?: AtSelectOption[]
  trigger?: React.ReactNode
}
type AtSelectIns = React.ElementRef<typeof AtSelectRoot>

const AtSelect = React.forwardRef<AtSelectIns, AtSelectProps>(
  ({ children, options, contentProps, triggerProps, valueProps, trigger, ...props }, ref) => {
    const _idRef = React.useRef(uuid_v4())

    return (
      <AtSelectRoot {...props}>
        {
          <AtSelectTrigger {...triggerProps}>
            {trigger ?? <AtSelectValue {...valueProps} />}
          </AtSelectTrigger>
        }
        <AtSelectContent {...contentProps}>
          {options?.map((option) => {
            return (
              <AtSelectItem
                key={`${_idRef.current}-select-item-${option.value}`}
                value={option.value}
                disabled={option.disabled}>
                {option.label}
              </AtSelectItem>
            )
          })}
          {children}
        </AtSelectContent>
      </AtSelectRoot>
    )
  }
)

export {
  AtSelect,
  AtSelectGroup,
  AtSelectValue,
  AtSelectTrigger,
  AtSelectContent,
  AtSelectLabel,
  AtSelectItem,
  AtSelectSeparator,
  AtSelectScrollUpButton,
  AtSelectScrollDownButton
}
