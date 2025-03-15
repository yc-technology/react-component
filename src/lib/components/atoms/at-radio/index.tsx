'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { clsxm, uuid_v4 } from '@yc-tech/shared'
import { motion } from 'framer-motion'
import * as React from 'react'
import { AtLabel } from '../at-label'

export type AtRadioGroupIns = React.ComponentRef<typeof RadioGroupPrimitive.Root>
export type AtRadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
const AtRadioGroup = React.forwardRef<AtRadioGroupIns, AtRadioGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Root className={clsxm('grid gap-2', className)} {...props} ref={ref} />
    )
  }
)
AtRadioGroup.displayName = RadioGroupPrimitive.Root.displayName

type AtRadioProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
  label?: string
  boxClassName?: string
}
const AtRadio = React.forwardRef<React.ComponentRef<typeof RadioGroupPrimitive.Item>, AtRadioProps>(
  ({ className, boxClassName, children, label, ...props }, ref) => {
    const _id = React.useRef(uuid_v4())
    return (
      <div className={clsxm('flex items-center gap-1', className)}>
        <RadioGroupPrimitive.Item
          ref={ref}
          id={_id.current}
          className={clsxm(
            'relative aspect-square shrink-0 h-4 w-4 rounded-full before:border before:border-primary before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            boxClassName
          )}
          {...props}>
          <RadioGroupPrimitive.Indicator className="flex items-center w-full h-full justify-center">
            <div className="w-full h-full rounded-full">
              <motion.div
                variants={{
                  initial: { scale: 0, opacity: 0 },
                  animate: { scale: 1, opacity: 1 }
                }}
                initial="initial"
                animate="animate"
                className="h-full w-full bg-primary rounded-full flex items-center justify-center">
                <motion.div
                  variants={{
                    initial: { scale: 0, opacity: 0 },
                    animate: { scale: 1, opacity: 1 }
                  }}
                  initial="initial"
                  animate="animate"
                  className="h-2/5 w-2/5 bg-background rounded-full"></motion.div>
              </motion.div>
            </div>
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        <AtLabel htmlFor={_id.current}>
          {label}
          {children}
        </AtLabel>
      </div>
    )
  }
)
AtRadio.displayName = RadioGroupPrimitive.Item.displayName

export { AtRadio, AtRadioGroup }
