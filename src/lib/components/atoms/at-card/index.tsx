import { clsxm } from '@yc-tech/shared'
import * as React from 'react'

export type AtCardProps = React.HTMLAttributes<HTMLDivElement>

const AtCard = React.forwardRef<HTMLDivElement, AtCardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsxm('rounded-md border bg-card text-card-foreground shadow', className)}
    {...props}
  />
))
AtCard.displayName = 'AtCard'

const AtCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsxm('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
)
AtCardHeader.displayName = 'AtCardHeader'

const AtCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={clsxm('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
AtCardTitle.displayName = 'AtCardTitle'

const AtCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={clsxm('text-sm text-muted-foreground', className)} {...props} />
))
AtCardDescription.displayName = 'AtCardDescription'

const AtCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsxm('p-6 pt-0', className)} {...props} />
  )
)
AtCardContent.displayName = 'AtCardContent'

const AtCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsxm('flex items-center p-6 pt-0', className)} {...props} />
  )
)
AtCardFooter.displayName = 'AtCardFooter'

export { AtCard, AtCardHeader, AtCardFooter, AtCardTitle, AtCardDescription, AtCardContent }
