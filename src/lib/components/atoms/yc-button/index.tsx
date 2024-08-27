'use client'

import { Slot } from '@radix-ui/react-slot'
import { clsxm } from '@yc-tech/shared'
import { VariantProps, cva } from 'cva'
import React, { createContext, forwardRef, useMemo } from 'react'
import { useButton } from '~/lib/hooks/useButton'
import { YcIcon } from '../yc-icon'
interface ButtonContextValue {
  loading: boolean
}

const ButtonContext = createContext<ButtonContextValue>({ loading: false })

export const buttonVariants = cva({
  base: 'inline-flex transition-colors bg-transparent items-center justify-center whitespace-nowrap rounded text-sm font-medium focus-visible:outline-none disabled:bg-neutral-300 disabled:text-white',
  variants: {
    variant: {
      default: 'bg-primary text-white shadow hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
      outline:
        'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
      secondary:
        'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 border-neutral-100 border',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
      icon: 'hover:!bg-neutral-100 hover:text-accent-foreground'
    },
    size: {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded px-3 text-xs',
      lg: 'h-10 rounded px-8',
      icon: 'min-h-6 min-w-6 p-1',
      tiny: 'h-6 w-6 rounded',
      none: ''
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

export interface YcButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  autoSync?: boolean
  stopPropagation?: boolean
  preventDefault?: boolean
  loading?: boolean
  showLoading?: boolean
}

const DButton = forwardRef<HTMLButtonElement, YcButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      showLoading,
      loading: outLoading,
      autoSync,
      preventDefault,
      stopPropagation,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const { loading, onClick } = useButton({
      loading: outLoading,
      preventDefault: preventDefault,
      stopPropagation: stopPropagation,
      autoSync,
      ...props
    })

    const contextValue = useMemo(() => ({ loading }), [loading])

    return (
      <ButtonContext.Provider value={contextValue}>
        <Comp
          disabled={loading}
          className={clsxm(buttonVariants({ variant, size }), className, {
            'animate-pulse cursor-progress': loading
          })}
          ref={ref}
          onClick={onClick}
          {...props}>
          {children}
        </Comp>
      </ButtonContext.Provider>
    )
  }
)

type YcButtonIconProps = {
  asChild?: boolean
} & React.ComponentProps<typeof YcIcon> &
  React.ComponentProps<typeof Slot>

const YcButtonIcon = ({ asChild, icon, className, ...rest }: Partial<YcButtonIconProps>) => {
  const { loading } = React.useContext(ButtonContext)

  if (asChild) {
    if (loading) {
      return (
        <YcIcon
          icon="mingcute:loading-line"
          {...rest}
          className={clsxm('animate-spin', className)}
        />
      )
    }
    return <Slot {...rest} className={clsxm(className)} />
  }

  if (!loading && !icon) return null

  return (
    <YcIcon
      icon={loading ? 'mingcute:loading-line' : icon!}
      {...rest}
      className={clsxm({ 'animate-spin': loading }, className)}
    />
  )
}

const YcButton = DButton

YcButton.displayName = 'Button'

export { YcButton, YcButtonIcon }
export default YcButton
