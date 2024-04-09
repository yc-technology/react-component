'use client'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import { HTMLMotionProps, Variants, motion } from 'framer-motion'
import React, {
  HTMLAttributes,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { YcButton, YcButtonProps } from '../yc-button'
import { clsxm } from '@yc-tech/shared'

type CollapseTransitionProviderProps = {
  open?: boolean
  children?: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

type CollapseTransitionContentProps = HTMLAttributes<HTMLDivElement> & {
  defaultMaxHeight?: number
  canExpand?: boolean
  showShadow?: boolean
  expandTrigger?: React.ReactNode
} & HTMLMotionProps<'div'>

type CollapseTransitionContextValue = {
  open: boolean
  setOpen: (v: boolean) => void
}

const YcCollapseTransitionContext = createContext<CollapseTransitionContextValue>(
  {} as CollapseTransitionContextValue
)

const YcCollapseTransition = ({
  children,
  open: outerOpen,
  onOpenChange
}: CollapseTransitionProviderProps) => {
  const [innerOpen, setInnerOpen] = useState(!!outerOpen)

  const open = useMemo(() => {
    return outerOpen !== undefined ? outerOpen : innerOpen
  }, [innerOpen, outerOpen])

  const setOpen = (v: boolean) => {
    if (outerOpen === undefined) {
      setInnerOpen(v)
    }
    onOpenChange?.(v)
  }

  const contextValue = useMemo(() => {
    return {
      open,
      setOpen
    }
  }, [open])
  return (
    <YcCollapseTransitionContext.Provider value={contextValue}>
      {children}
    </YcCollapseTransitionContext.Provider>
  )
}

export function YcCollapseTransitionContent({
  children,
  defaultMaxHeight,
  canExpand,
  expandTrigger,
  className,
  ...rest
}: CollapseTransitionContentProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [offsetHeight, setOffsetHeight] = useState<number | undefined>(undefined)

  const { open, setOpen } = useContext(YcCollapseTransitionContext)

  const variants: Variants = {
    init: {
      maxHeight: 0,
      transition: {
        duration: 0.3
      }
    },
    active: {
      maxHeight: offsetHeight,
      transition: {
        duration: 0.3
      }
    },
    inactive: {
      maxHeight: defaultMaxHeight,
      transition: {
        duration: 0.3
      }
    }
  }

  // 是否需要显示展开按钮
  const overHeight = useMemo(() => {
    return offsetHeight && defaultMaxHeight && offsetHeight > defaultMaxHeight
  }, [offsetHeight, defaultMaxHeight])

  // 不做监听依赖
  useEffect(() => {
    if (rootRef.current && rootRef.current.offsetHeight !== offsetHeight) {
      setOffsetHeight(rootRef.current.offsetHeight)
    }
  })

  return (
    <motion.div
      variants={variants}
      initial="init"
      animate={open ? 'active' : 'inactive'}
      className={clsxm('overflow-hidden relative', className)}
      {...rest}>
      <div ref={rootRef}>{children}</div>
      {!!overHeight && canExpand && !open && (
        <>
          <div
            className=" absolute bottom-0 w-full h-[50px] bg-gradient-to-t from-black/10 to-[#ffffff00] flex justify-center items-center"
            onClick={() => setOpen(!open)}>
            {expandTrigger || 'Expand'}
          </div>
        </>
      )}
    </motion.div>
  )
}

/** 折叠变化触发器 */
type YcCollapseTransitionTriggerProps = {} & YcButtonProps
function YcCollapseTransitionTrigger({
  children,
  onClick,
  ...rest
}: YcCollapseTransitionTriggerProps) {
  const { setOpen, open } = React.useContext(YcCollapseTransitionContext)
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOpen(!open)
    onClick?.(e)
  }
  return (
    <YcButton onClick={handleClick} {...rest}>
      {children}
    </YcButton>
  )
}

/** 箭头动画组件 */
type YcCollapseTransitionIconProps = { icon?: React.ReactNode } & HTMLMotionProps<'div'>
function YcCollapseTransitionIcon({ icon, ...rest }: YcCollapseTransitionIconProps) {
  const { open } = React.useContext(YcCollapseTransitionContext)
  return (
    <motion.div
      variants={{ active: { rotate: 180 }, inactive: { rotate: 0 } }}
      animate={open ? 'active' : 'inactive'}
      {...rest}>
      {icon ? icon : <ChevronDownIcon className="w-5 h-5" />}
    </motion.div>
  )
}

export {
  YcCollapseTransitionContext,
  YcCollapseTransition,
  YcCollapseTransitionTrigger,
  YcCollapseTransitionIcon
}
