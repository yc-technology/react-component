'use client'

import { clsxm } from '@yc-tech/shared'

type YcDotProps = {
  x?: number
  y?: number
  value?: string | number
  dot?: boolean
  showZero?: boolean
  show?: boolean
  wrapperClassName?: string
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
  wrapperClassName
}: YcDotProps) {
  if (show === false) return children
  return (
    <div className={clsxm('relative')}>
      {children}
      {(value || showZero || dot) && (
        <div
          className={clsxm('rounded-full absolute bg-white p-[2px]', wrapperClassName)}
          style={{ top: y || 0, right: x || 0 }}>
          <div className={clsxm('rounded-full  bg-danger p-1 leading-none text-white', className)}>
            {dot ? undefined : value}
          </div>
        </div>
      )}
    </div>
  )
}
