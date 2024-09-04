'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { clsxm } from '@yc-tech/shared'

const AtTooltipProvider = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.TooltipProvider>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.TooltipProvider>
>(({ children, delayDuration = 200, ...rest }, ref) => {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} {...rest}>
      {children}
    </TooltipPrimitive.Provider>
  )
})

const AtTooltip = TooltipPrimitive.Root

const AtTooltipTrigger = TooltipPrimitive.Trigger

const AtTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={clsxm(
      'z-50 overflow-hidden rounded-md bg-black px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
))
AtTooltipContent.displayName = TooltipPrimitive.Content.displayName

export { AtTooltip, AtTooltipTrigger, AtTooltipContent, AtTooltipProvider }
