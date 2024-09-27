'use client'

import { clsxm } from '@yc-tech/shared'
import { cva, VariantProps } from 'cva'
import { motion } from 'framer-motion'

const atDotVariants = cva({
  base: 'rounded-full  bg-destructive p-1 leading-none text-white flex items-center justify-center w-full h-full',
  variants: {
    size: {
      small: 'min-w-4 h-4 text-xs',
      medium: 'min-w-[18px] h-[18px] text-sm',
      large: 'min-w-5 h-5 text-base',
      dot: 'min-w-2 h-2 text-xs'
    }
  },
  defaultVariants: {
    size: 'small'
  }
})

export type AtDotProps = {
  x?: number
  y?: number
  value?: string | number
  dot?: boolean
  showZero?: boolean
  show?: boolean
  wrapperClassName?: string
  containerClassName?: string
} & React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof atDotVariants>
export function AtDot({
  value,
  showZero,
  children,
  dot,
  y,
  x,
  show,
  className,
  wrapperClassName,
  containerClassName,
  size
}: AtDotProps) {
  if (show === false) return children
  return (
    <div className={clsxm('relative inline-flex', containerClassName)}>
      {children}
      {(value || showZero || dot) && (
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          className={clsxm(
            'rounded-full bg-white p-[2px]',
            // 有子元素时，设置为绝对定位
            children && 'absolute',
            wrapperClassName
          )}
          style={{ top: y || -4, right: x || -5 }}>
          <div className={clsxm(atDotVariants({ size: dot ? 'dot' : size }), className)}>
            {dot ? undefined : value}
          </div>
        </motion.div>
      )}
    </div>
  )
}
