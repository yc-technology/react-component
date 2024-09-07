import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

import { clsxm } from '@yc-tech/shared'
import { cva, VariantProps } from 'cva'
import { useButton, UseButtonOptions } from '~/lib/hooks/useButton'
import { AtSpinner } from '../at-spinner'
import { AtTooltip, AtTooltipContent, AtTooltipTrigger } from '../at-tooltip'

const atButtonVariants = cva({
  base: 'bg-transparent inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
      outline:
        'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
      icon: 'transition-all bg-icon duration-300 text-opacity-60 hover:text-opacity-100 text-black hover:bg-icon-foreground rounded p-[2px] disabled:cursor-not-allowed'
    },
    size: {
      default: 'h-9 px-4 py-2 [&>.btn-icon]:w-4 [&>.btn-icon]:h-4',
      sm: 'h-8 rounded-md px-3 text-xs [&>.btn-icon]:w-3.5 [&>.btn-icon]:h-3.5',
      lg: 'h-10 rounded-md px-8 [&>.btn-icon]:w-4 [&>.btn-icon]:h-4',
      icon: 'h-9 w-9'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

export interface AtButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof atButtonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  loading?: boolean
  autoSync?: boolean
  stopPropagation?: boolean
  preventDefault?: boolean
  tooltip?: string
}

const AtButton = React.forwardRef<HTMLButtonElement, AtButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading: outerLoading,
      stopPropagation,
      onClick,
      preventDefault,
      autoSync,
      children,
      disabled,
      icon,
      tooltip,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const { onClick: _onClick, loading } = useButton({
      loading: outerLoading,
      onClick,
      autoSync,
      stopPropagation,
      preventDefault
    })

    const renderBtn = () => (
      <Comp
        className={clsxm(atButtonVariants({ variant, size, className }))}
        ref={ref}
        onClick={_onClick}
        disabled={disabled || loading}
        {...props}>
        {loading ? (
          <AtSpinner className="mr-2 btn-icon" />
        ) : (
          <Slot className="mr-2 btn-icon">{icon}</Slot>
        )}
        {children}
      </Comp>
    )

    if (tooltip) {
      return (
        <AtTooltip>
          <AtTooltipTrigger asChild>{renderBtn()}</AtTooltipTrigger>
          <AtTooltipContent>{tooltip}</AtTooltipContent>
        </AtTooltip>
      )
    }

    return renderBtn()
  }
)
AtButton.displayName = 'Button'

export { AtButton, atButtonVariants }
