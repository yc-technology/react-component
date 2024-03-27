'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { YcButton, ButtonProps } from '../yc-button'
import { createPortal } from 'react-dom'
import { clsxm } from '@yc-tech/shared'

const YcTooltipProvider = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.TooltipProvider>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.TooltipProvider>
>(({ children, delayDuration = 100, ...rest }, ref) => {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} {...rest}>
      {children}
    </TooltipPrimitive.Provider>
  )
})

const YcTooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>
>(({ children, delayDuration = 100, ...rest }, ref) => {
  return (
    <TooltipPrimitive.Root delayDuration={delayDuration} {...rest}>
      {children}
    </TooltipPrimitive.Root>
  )
})

/**
 * hack failed 尝试将源代码的 onClick 中点击之后关闭 tooltip 的行为去掉，但是失败了
 * ```js
 * // 源代码
 * onBlur={composeEventHandlers(props.onBlur, context.onClose)}
 * onClick={composeEventHandlers(props.onClick, context.onClose)}
 * ```
 */
const YcToolTipButton = React.forwardRef<
  React.ElementRef<typeof YcButton>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ onPointerLeave, onPointerMove, onPointerEnter, onPointerDown, onClick, ...rest }: ButtonProps, ref) => {
  return (
    <YcButton
      ref={ref}
      onMouseEnter={onPointerEnter}
      onMouseMove={onPointerMove}
      onMouseLeave={onPointerLeave}
      onMouseDown={onPointerDown}
      {...rest}
    />
  )
})

const YcTooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ ...rest }, ref) => {
  return <TooltipPrimitive.Trigger ref={ref} {...rest} />
})

const YcTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) =>
  // 渲染到 body 上
  createPortal(
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={clsxm(
        'max-w-[360px] z-[50] overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />,
    document.body,
  ),
)
YcTooltipContent.displayName = TooltipPrimitive.Content.displayName

export { YcTooltip, YcTooltipTrigger, YcTooltipContent, YcTooltipProvider }
