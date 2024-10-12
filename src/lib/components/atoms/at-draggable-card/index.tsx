import { clsxm } from '@yc-tech/shared'
import { useRef } from 'react'
import { ReactNode } from 'react'
import { useDraggable } from '~/lib/hooks/useDraggable'
import {
  AtCard,
  AtCardContent,
  AtCardDescription,
  AtCardFooter,
  AtCardHeader,
  AtCardProps,
  AtCardTitle
} from '../at-card'
import { YcIcon } from '../yc-icon'
import { Position } from '~/types'

export type AtDraggableCardProps = {
  children: ReactNode
  initialPosition?: Position
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  contentClassName?: string
  footerClassName?: string
  title?: ReactNode
  footer?: ReactNode
  description?: ReactNode
} & AtCardProps

export function AtDraggableCard(props: AtDraggableCardProps) {
  const {
    children,
    initialPosition,
    className,
    title,
    description,
    titleClassName,
    descriptionClassName,
    contentClassName,
    footerClassName,
    footer,
    ...rest
  } = props

  const target = useRef<HTMLDivElement>(null)
  const handle = useRef<HTMLDivElement>(null)
  const { style } = useDraggable(target, { handle, initialValue: initialPosition })

  return (
    <AtCard
      ref={target}
      className={clsxm('absolute min-w-[300px]', className)}
      style={style}
      {...rest}>
      <AtCardHeader
        ref={handle}
        className="cursor-move py-4 bg-transparent hover:bg-muted transition-colors border-b">
        <AtCardTitle className={clsxm('flex justify-between items-center', titleClassName)}>
          {title}
          <YcIcon icon="mingcute:dots-line" className="w-5 h-5" />
        </AtCardTitle>
        {description && (
          <AtCardDescription className={descriptionClassName}>{description}</AtCardDescription>
        )}
      </AtCardHeader>
      <AtCardContent className={clsxm('py-4', contentClassName)}>{children}</AtCardContent>
      {footer && <AtCardFooter className={clsxm('pb-4', footerClassName)}>{footer}</AtCardFooter>}
      {/* {children} */}
    </AtCard>
  )
}
