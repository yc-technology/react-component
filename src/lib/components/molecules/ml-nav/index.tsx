'use client'

import React from 'react'
import { AtTooltip, AtTooltipContent, AtTooltipTrigger } from '../../atoms/at-tooltip'
import { clsxm } from '@yc-tech/shared'
import { atButtonVariants } from '../../atoms'
import { Slot } from '@radix-ui/react-slot'
import { NavLink, Link } from 'react-router-dom'

export interface MlNavProps {
  isCollapsed: boolean
  className?: string
  labelClassName?: string
  links?: {
    title: string
    label?: string
    icon?: (props: { className: string }) => React.ReactNode
    variant: 'default' | 'ghost'
  }[]
}

export function MlNav({ links, isCollapsed, className, labelClassName }: MlNavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className={clsxm(
        'group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 text-xl',
        className
      )}>
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links?.map((link, index) =>
          isCollapsed ? (
            <AtTooltip key={index} delayDuration={0}>
              <AtTooltipTrigger asChild>
                <Link
                  to="#"
                  className={clsxm(
                    atButtonVariants({ variant: link.variant, size: 'icon' }),
                    'h-9 w-9',
                    link.variant === 'default' &&
                      'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                  )}>
                  {!!link.icon && link.icon({ className: 'h-4 w-4' })}
                  <span className="sr-only">{link.title}</span>
                </Link>
              </AtTooltipTrigger>
              <AtTooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span
                    className={clsxm(
                      'ml-auto bg-destructive px-1 rounded-full text-white text-xs',
                      labelClassName
                    )}>
                    {link.label}
                  </span>
                )}
              </AtTooltipContent>
            </AtTooltip>
          ) : (
            <Link
              key={index}
              to="#"
              className={clsxm(
                atButtonVariants({ variant: link.variant, size: 'default' }),
                link.variant === 'default' &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start'
              )}>
              {!!link.icon && link.icon({ className: 'h-4 w-4 mr-2' })}
              {link.title}
              {link.label && (
                <span
                  className={clsxm(
                    'ml-auto bg-destructive px-1 rounded-full text-white text-xs flex items-center justify-center',
                    link.variant === 'default' && 'text-background dark:text-white',
                    labelClassName
                  )}>
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  )
}
