'use client'

import { Slot } from '@radix-ui/react-slot'
import { VariantProps, cva } from 'class-variance-authority'
import React, { createContext, forwardRef, useMemo, useState } from 'react'
import { clsxm } from '@yc-tech/shared'
import YcIcon from '../yc-icon'
interface ButtonContextValue {
  loading: boolean
}

const ButtonContext = createContext<ButtonContextValue>({ loading: false })

export const buttonVariants = cva(
  'inline-flex transition-colors bg-transparent items-center justify-center whitespace-nowrap rounded text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:bg-neutral-300 disabled:text-white',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 border-neutral-100 border',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded px-3 text-xs',
        lg: 'h-10 rounded px-8',
        icon: 'h-8 w-8',
        tiny: 'h-6 w-6 rounded',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  autoSync?: boolean
  stopPropagation?: boolean
  preventDefault?: boolean
  loading?: boolean
}

const DButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      onClick,
      stopPropagation: stop,
      preventDefault: prevent,
      children,
      loading: outerLoading,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    const [innerLoading, setInnerLoading] = useState(false)

    const loading = outerLoading || innerLoading

    const contextValue = useMemo(() => ({ loading }), [innerLoading, outerLoading])

    let packOnClick = onClick
    packOnClick = (e) => {
      onClick?.(e)
      if (stop) e.stopPropagation()
      if (prevent) e.preventDefault()
    }

    return (
      <ButtonContext.Provider value={contextValue}>
        <Comp
          disabled={loading}
          className={clsxm(buttonVariants({ variant, size }), className, {
            'animate-pulse': loading,
          })}
          ref={ref}
          onClick={packOnClick}
          {...props}
        >
          {children}
        </Comp>
      </ButtonContext.Provider>
    )
  },
)

type ButtonIconProps = {
  asChild?: boolean
} & React.ComponentProps<typeof YcIcon> &
  React.ComponentProps<typeof Slot>

const YcButtonIcon = ({ asChild, icon, className, ...rest }: ButtonIconProps) => {
  const { loading } = React.useContext(ButtonContext)

  if (asChild) {
    if (loading) {
      return <YcIcon icon="mingcute:loading-line" {...rest} className={clsxm('animate-spin', className)} />
    }
    return <Slot {...rest} className={clsxm(className)} />
  }

  return (
    <YcIcon
      icon={loading ? 'mingcute:loading-line' : icon}
      {...rest}
      className={clsxm({ 'animate-spin': loading }, className)}
    />
  )
}

const YcButton = DButton

YcButton.displayName = 'Button'

export { YcButton, YcButtonIcon }
export default YcButton
