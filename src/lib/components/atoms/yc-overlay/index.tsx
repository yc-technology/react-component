'use client'

import { AnimatePresence, HTMLMotionProps, Variants, motion } from 'framer-motion'
import { forwardRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'
type YcOverlayProps = {
  container?: Element | null
  open?: boolean
  onUpdateOpen?: (v: boolean) => void
} & HTMLMotionProps<'div'>
type OverlayRef = {}

export const YcOverlay = forwardRef<OverlayRef, YcOverlayProps>(
  ({ children, container, open, onUpdateOpen, ...rest }, ref) => {
    useImperativeHandle(ref, () => ({}))

    const variants: Variants = {
      open: {
        opacity: 1,
        transition: {
          duration: 0.3,
        },
      },
      closed: {
        opacity: 0,
        transition: {
          duration: 0.3,
        },
      },
    }

    const onClick = () => {
      onUpdateOpen?.(false)
    }

    return ReactDOM.createPortal(
      <>
        <AnimatePresence>
          {open && (
            <motion.div
              variants={variants}
              animate={'open'}
              initial={'closed'}
              exit={'closed'}
              data-state={'closed'}
              className="absolute top-0 h-screen w-screen bg-black/60"
              {...rest}
              onClick={onClick}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </>,
      container || document.body,
    )
  },
)
