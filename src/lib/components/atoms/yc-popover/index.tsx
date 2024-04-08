import { createContext, useContext, useMemo, useState } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
  useHover,
  UseFloatingOptions,
  UseFloatingReturn,
  useTransitionStyles,
  arrow
} from '@floating-ui/react'

import './styles.scss'
import { AnimatePresence, MotionProps, motion } from 'framer-motion'
import YcButton, { YcButtonProps } from '../yc-button'
import { clsxm, createNamespace } from '@yc-tech/shared'
import { useRef } from 'react'
type PopoverProps = {
  children?: React.ReactNode
  trigger?: 'click' | 'hover'
  open?: boolean
  onOpenChange?: (open: boolean) => void
} & Partial<UseFloatingOptions>

type PopoverTriggerProps = {} & YcButtonProps

export type YcPopoverContextValue = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  getReferenceProps: (userProps?: React.HTMLProps<Element> | undefined) => Record<string, unknown>
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>
  floatingReturn: UseFloatingReturn
}
const YcPopoverContext = createContext<YcPopoverContextValue>({} as YcPopoverContextValue)

function YcPopover({ children, trigger = 'click', open, onOpenChange, ...rest }: PopoverProps) {
  const [innerOpen, setInnerOpen] = useState(false)
  const arrowRef = useRef(null)
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
    onOpenChange: setIsOpen,
    middleware: [flip(), offset(10), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
    ...rest
  })

  const click = useClick(res.context, { enabled: trigger === 'click' || !trigger })
  const dismiss = useDismiss(res.context)
  const role = useRole(res.context)
  const hover = useHover(res.context, { enabled: trigger === 'hover', delay: { close: 300 } })

  const { getReferenceProps, getFloatingProps } = useInteractions([click, hover, dismiss, role])

  return (
    <YcPopoverContext.Provider
      value={{ floatingReturn: res, getReferenceProps, getFloatingProps, isOpen, setIsOpen }}>
      {children}
    </YcPopoverContext.Provider>
  )
}

/**
 * Popover trigger
 * @param param0
 * @returns
 */
function YcPopoverTrigger({ children }: PopoverTriggerProps) {
  const { getReferenceProps, floatingReturn } = useContext(YcPopoverContext)
  const { refs, placement, y, floatingStyles } = floatingReturn
  return (
    <YcButton ref={refs.setReference} {...getReferenceProps()}>
      {children}
      placement:{placement}y:{y}
    </YcButton>
  )
}

type PopoverContentProps = {
  children?: React.ReactNode
  /**
   * 固定宽度
   */
  fixedWidth?: boolean
} & MotionProps

/**
 * Popover content
 * @param param0
 * @returns
 */
function YcPopoverContent({ children, fixedWidth, ...res }: PopoverContentProps) {
  const { floatingReturn, getFloatingProps } = useContext(YcPopoverContext)
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
              className={clsxm('bg-white rounded-md p-2 shadow', name)}
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
              {children}
            </motion.div>
          </FloatingFocusManager>
        )}
      </AnimatePresence>
    </>
  )
}

export { YcPopover, YcPopoverTrigger, YcPopoverContent, YcPopoverContext }
