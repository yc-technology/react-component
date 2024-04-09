'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import {
  CollapsibleProps as CollapsiblePrimitiveProps,
  CollapsibleTriggerProps as CollapsibleTriggerPrimitiveProps,
  CollapsibleContentProps as CollapsibleContentPrimitiveProps
} from '@radix-ui/react-collapsible'
import './style.scss'
import { clsxm } from '@yc-tech/shared'

export type CollapsibleProps = {} & CollapsiblePrimitiveProps & React.RefAttributes<HTMLDivElement>
type CollapsibleTriggerProps = {} & CollapsibleTriggerPrimitiveProps &
  React.RefAttributes<HTMLButtonElement>
type CollapsibleContentProps = {} & CollapsibleContentPrimitiveProps &
  React.RefAttributes<HTMLDivElement>

const YcCollapsible = ({ children, className, onOpenChange, ...rest }: CollapsibleProps) => {
  return (
    <CollapsiblePrimitive.Root className={clsxm(className)} onOpenChange={onOpenChange} {...rest}>
      {children}
    </CollapsiblePrimitive.Root>
  )
}

const YcCollapsibleTrigger = ({ children, className, ...rest }: CollapsibleTriggerProps) => {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      className={clsxm(className, 'CollapsibleTrigger')}
      {...rest}>
      {children}
    </CollapsiblePrimitive.CollapsibleTrigger>
  )
}

const YcCollapsibleContent = ({ children, className, ...rest }: CollapsibleContentProps) => {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      className={clsxm(className, 'CollapsibleContent')}
      {...rest}>
      {children}
    </CollapsiblePrimitive.CollapsibleContent>
  )
}

export { YcCollapsible, YcCollapsibleTrigger, YcCollapsibleContent }
