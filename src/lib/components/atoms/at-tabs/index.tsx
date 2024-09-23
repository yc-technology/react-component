'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { clsxm, uuid_v4 } from '@yc-tech/shared'
import * as React from 'react'
import { useControllableState } from '../../../hooks/useControllableState'
import { motion } from 'framer-motion'

type AtTabsContextValue = {
  id: string
  value?: string
  setValue: (value: string) => void
}
const AtTabsContext = React.createContext<AtTabsContextValue>({} as AtTabsContextValue)

export type AtTabsProps = React.ComponentProps<typeof TabsPrimitive.Root>
const AtTabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, AtTabsProps>(
  ({ className, value: valueProp, onValueChange, defaultValue, ...props }, ref) => {
    const id = React.useRef(uuid_v4())
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue
    })

    const contextValue = React.useMemo(
      () => ({ value, setValue, id: id.current }),
      [value, setValue]
    )

    return (
      <AtTabsContext.Provider value={contextValue}>
        <TabsPrimitive.Root
          ref={ref}
          value={value}
          onValueChange={setValue}
          className={clsxm('flex flex-col', className)}
          {...props}
        />
      </AtTabsContext.Provider>
    )
  }
)

const AtTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={clsxm(
      'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
      className
    )}
    {...props}
  />
))
AtTabsList.displayName = TabsPrimitive.List.displayName

const AtTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AtTabsContext)
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={clsxm(
        'relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}>
      {context.value === props.value && (
        <motion.div
          layoutId={`tabs-${context.id}-select-bg`}
          data-state={context.value === props.value ? 'active' : 'inactive'}
          className="z-[1] w-full rounded-md h-full absolute top-0 left-0 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"></motion.div>
      )}
      <div className="z-[2]">{children}</div>
    </TabsPrimitive.Trigger>
  )
})
AtTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const AtTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={clsxm(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
))
AtTabsContent.displayName = TabsPrimitive.Content.displayName

export { AtTabs, AtTabsContent, AtTabsList, AtTabsTrigger }