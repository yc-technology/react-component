'use client'
import {
  ClientRectObject,
  FloatingArrow,
  FloatingDelayGroup,
  FloatingFocusManager,
  UseFloatingOptions,
  UseFloatingReturn,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useClientPoint,
  useDelayGroup,
  useDismiss,
  useFloating,
  useHover,
  useId,
  useInteractions,
  useRole,
  useTransitionStyles
} from '@floating-ui/react'
import { createContext, useContext, useMemo, useState } from 'react'

import { clsxm, createNamespace } from '@yc-tech/shared'
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import { useRef } from 'react'
import YcButton, { YcButtonProps } from '../yc-button'
import './styles.scss'

/** 类型 */
type PopoverProps = {
  children?: React.ReactNode
  trigger?: 'click' | 'hover'
  open?: boolean
  onOpenChange?: (open: boolean) => void
  delay?:
    | number
    | Partial<{
        open: number
        close: number
      }>
  clientPoint?: boolean
  x?: number
  y?: number
} & Partial<UseFloatingOptions>

type PopoverTriggerProps = {} & YcButtonProps

type YcPopoverGroupProps = {
  timeoutMs?: number
  delay:
    | number
    | Partial<{
        open: number
        close: number
      }>
  children: React.ReactNode
}

export type YcPopoverContextValue = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  getReferenceProps: (userProps?: React.HTMLProps<Element> | undefined) => Record<string, unknown>
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>
  floatingReturn: UseFloatingReturn
  arrowRef: React.MutableRefObject<null>
}

export type YcPopoverGroupContextValue = {
  rectRef: React.MutableRefObject<ClientRectObject | null>
}

const YcPopoverContext = createContext<YcPopoverContextValue>({} as YcPopoverContextValue)
const YcPopoverGroupContext = createContext<YcPopoverGroupContextValue>(
  {} as YcPopoverGroupContextValue
)

/** 类型 */

/**
 * YcPopoverGroup 做一些组合动画和延迟操作
 */

function YcPopoverGroup({ children, ...rest }: YcPopoverGroupProps) {
  const rectRef = useRef<ClientRectObject | null>(null)
  return (
    <YcPopoverGroupContext.Provider value={{ rectRef }}>
      <FloatingDelayGroup {...rest}>{children}</FloatingDelayGroup>
    </YcPopoverGroupContext.Provider>
  )
}

/**
 * YcPopover 配置一些 floating 的参数
 * @param param0
 * @returns
 */
function YcPopover({
  children,
  trigger = 'click',
  open,
  onOpenChange,
  delay,
  clientPoint: clientPointEnabled,
  x,
  y,
  ...rest
}: PopoverProps) {
  const [innerOpen, setInnerOpen] = useState(false)
  const arrowRef = useRef(null)
  const id = useId()
  const isOpen = useMemo(() => {
    return open || innerOpen
  }, [open, innerOpen])

  function setIsOpen(open: boolean) {
    setInnerOpen(open)
    onOpenChange && onOpenChange(open)
  }

  const res = useFloating({
    open: isOpen,
    placement: 'bottom',
    onOpenChange: (open: boolean) => {
      setIsOpen(open)
    },
    middleware: [flip(), offset(10), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
    ...rest
  })
  const { delay: groupDelay, currentId } = useDelayGroup(res.context, { id })
  const click = useClick(res.context, { enabled: trigger === 'click' || !trigger })
  const dismiss = useDismiss(res.context)
  const role = useRole(res.context)
  const clientPoint = useClientPoint(res.context, { enabled: clientPointEnabled, x, y })
  const hover = useHover(res.context, {
    enabled: trigger === 'hover',
    delay: delay ?? groupDelay
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    hover,
    dismiss,
    role,
    clientPoint
  ])

  return (
    <YcPopoverContext.Provider
      value={{
        floatingReturn: res,
        getReferenceProps,
        getFloatingProps,
        isOpen,
        setIsOpen,
        arrowRef
      }}>
      {children}
    </YcPopoverContext.Provider>
  )
}

/**
 * Popover trigger
 * @param param0
 * @returns
 */
function YcPopoverTrigger({ children, ...rest }: PopoverTriggerProps) {
  const { getReferenceProps, floatingReturn } = useContext(YcPopoverContext)
  const { refs } = floatingReturn
  return (
    <YcButton ref={refs.setReference} {...getReferenceProps()} {...rest}>
      {children}
    </YcButton>
  )
}

type PopoverContentProps = {
  children?: React.ReactNode
  /**
   * 固定宽度
   */
  fixedWidth?: boolean

  showArrow?: boolean
} & HTMLMotionProps<'div'>

/**
 * Popover content
 * @param param0
 * @returns
 */
function YcPopoverContent({
  children,
  fixedWidth,
  className,
  showArrow = true,
  ...res
}: PopoverContentProps) {
  const { floatingReturn, getFloatingProps, arrowRef } = useContext(YcPopoverContext)
  const { refs, floatingStyles, context } = floatingReturn
  const { isMounted, styles } = useTransitionStyles(context, {
    initial: ({ side }) => ({
      opacity: 0,
      top: side === 'bottom' ? 10 : -10
    }),
    open: ({ side }) => ({
      top: 0,
      opacity: 1
    })
  })

  const headingId = useId()

  const [name] = createNamespace('popover-content')

  return (
    <>
      <AnimatePresence>
        {isMounted && (
          <FloatingFocusManager context={context} modal={false}>
            <motion.div
              className={clsxm(
                'bg-white rounded-md p-2 border border-neutral-75 focus-visible:outline-none',
                name,
                className
              )}
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                ...styles,
                width: fixedWidth
                  ? refs.reference?.current?.getBoundingClientRect().width
                  : undefined
              }}
              aria-labelledby={headingId}
              {...getFloatingProps()}
              {...res}>
              {showArrow && (
                <FloatingArrow
                  ref={arrowRef}
                  strokeWidth={1}
                  context={context}
                  className="fill-white 
    [&>path:first-of-type]:stroke-neutral-75
    [&>path:last-of-type]:stroke-white"
                />
              )}
              {children}
            </motion.div>
          </FloatingFocusManager>
        )}
      </AnimatePresence>
    </>
  )
}

export { YcPopover, YcPopoverContent, YcPopoverContext, YcPopoverGroup, YcPopoverTrigger }
