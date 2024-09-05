'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { clsxm } from '@yc-tech/shared'

export type AtCheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
export type AtCheckboxIns = React.ElementRef<typeof CheckboxPrimitive.Root>
const AtCheckbox = React.forwardRef<AtCheckboxIns, AtCheckboxProps>(
  ({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={clsxm(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        className
      )}
      {...props}>
      <CheckboxPrimitive.Indicator
        className={clsxm('flex items-center justify-center text-current')}>
        <CheckIcon className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
)
AtCheckbox.displayName = CheckboxPrimitive.Root.displayName

export { AtCheckbox }
