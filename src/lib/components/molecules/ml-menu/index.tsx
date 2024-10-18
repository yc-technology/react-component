'use client'

import { clsxm, uuid_v4 } from '@yc-tech/shared'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { AtTooltip, AtTooltipContent, AtTooltipTrigger } from '../../atoms/at-tooltip'
import { AtDot } from '../../atoms/at-dot'
import { Slot } from '@radix-ui/react-slot'
import { motion } from 'framer-motion'

export type MlMenuOptions = {
  title?: React.ReactNode
  label?: string
  value: string
  to?: string
  icon?: (props: { className: string }) => React.ReactNode
  className?: string
  [key: string]: any
}

export interface MlMenuProps {
  isCollapsed: boolean
  className?: string
  value?: string
  onValueChange?: (value: string) => void
  labelClassName?: string
  options?: MlMenuOptions[]
}

export function MlMenu({ options, value, isCollapsed, className, onValueChange }: MlMenuProps) {
  const uuid = useRef(uuid_v4())
  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = e.currentTarget
    const value = target.getAttribute('data-value')
    if (value && onValueChange) {
      onValueChange(value)
    }
  }

  const renderActiveBg = () => {
    return (
      <motion.div
        layoutId={uuid.current}
        className="absolute left-0 top-0 w-full h-full rounded-md bg-muted z-[-1]"></motion.div>
    )
  }

  return (
    <div
      data-collapsed={isCollapsed}
      className={clsxm(
        'group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 text-xl',
        className
      )}>
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {options?.map((item, index) =>
          isCollapsed ? (
            <AtTooltip key={index} delayDuration={0}>
              <AtTooltipTrigger asChild>
                <Link
                  data-value={item.value}
                  data-label={item.label}
                  data-active={item.value === value}
                  to={item.to || '#'}
                  className={clsxm(
                    'h-9 w-9 flex items-center justify-center rounded-md text-muted-foreground relative',
                    '[&[data-active=true]]:text-primary'
                  )}
                  onClick={onLinkClick}>
                  {item.value === value && renderActiveBg()}
                  {!!item.icon && item.icon({ className: 'h-4 w-4' })}
                  <span className="sr-only">{item.title}</span>
                </Link>
              </AtTooltipTrigger>
              <AtTooltipContent side="right" className="flex items-center gap-4">
                {typeof item.title === 'string' ? (
                  <div className="flex-1">{item.title}</div>
                ) : (
                  <Slot className="flex-1">{item.title}</Slot>
                )}
                {item.label && <AtDot value={item.label} />}
              </AtTooltipContent>
            </AtTooltip>
          ) : (
            <Link
              key={index}
              to={item.to || '#'}
              data-value={item.value}
              data-label={item.label}
              data-active={item.value === value}
              className={clsxm(
                'flex items-center text-sm justify-start py-2 px-3 rounded-md text-muted-foreground relative hover:text-primary',
                '[&[data-active=true]]:text-primary',
                item.className
              )}
              onClick={onLinkClick}>
              {item.value === value && renderActiveBg()}
              {!!item.icon && item.icon({ className: 'h-4 w-4 mr-2' })}
              {typeof item.title === 'string' ? (
                <div className="flex-1">{item.title}</div>
              ) : (
                <Slot className="flex-1">{item.title}</Slot>
              )}
              {item.label && <AtDot value={item.label} />}
            </Link>
          )
        )}
      </nav>
    </div>
  )
}
