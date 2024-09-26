'use client'

import { clsxm } from '@yc-tech/shared'
import { motion } from 'framer-motion'

type YcDotProps = {
  x?: number
  y?: number
  value?: string | number
  dot?: boolean
  showZero?: boolean
  show?: boolean
  wrapperClassName?: string
  containerClassName?: string
} & React.HTMLAttributes<HTMLDivElement>
export function YcDot({
  value,
  showZero,
  children,
  dot,
  y,
  x,
  show,
  className,
  wrapperClassName,
  containerClassName
}: YcDotProps) {
  if (show === false) return children
  return (
    <div className={clsxm('relative', containerClassName)}>
      {children}
      {(value || showZero || dot) && (
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          className={clsxm('rounded-full absolute bg-white p-[2px]', wrapperClassName)}
          style={{ top: y || 0, right: x || 0 }}>
          <div
            className={clsxm(
              'rounded-full  bg-destructive p-1 leading-none text-white flex items-center justify-center w-full h-full',
              className
            )}>
            {dot ? undefined : value}
          </div>
        </motion.div>
      )}
    </div>
  )
}
