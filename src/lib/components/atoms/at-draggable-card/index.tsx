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
  AtCardTitle
} from '../at-card'
import { YcIcon } from '../yc-icon'
import { Position } from '~/types'

export type AtDraggableCardProps = {
  children: ReactNode
  initialPosition?: Position
  className?: string
  title?: ReactNode
  footer?: ReactNode
  description?: ReactNode
}

export function AtDraggableCard(props: AtDraggableCardProps) {
  const { children, initialPosition, className, title, description, footer } = props

  const target = useRef<HTMLDivElement>(null)
  const handle = useRef<HTMLDivElement>(null)
  const { style } = useDraggable(target, { handle, initialValue: initialPosition })

  return (
    <AtCard ref={target} className={clsxm('absolute min-w-[300px]', className)} style={style}>
      <AtCardHeader
        ref={handle}
        className="cursor-move py-4 bg-transparent hover:bg-muted transition-colors border-b">
        <AtCardTitle className="flex justify-between items-center ">
          {title}
          <YcIcon icon="mingcute:dots-line" className="w-5 h-5" />
        </AtCardTitle>
        {description && <AtCardDescription>{description}</AtCardDescription>}
      </AtCardHeader>
      <AtCardContent className="py-4">{children}</AtCardContent>
      {footer && <AtCardFooter className="pb-4">{footer}</AtCardFooter>}
      {/* {children} */}
    </AtCard>
  )
}
