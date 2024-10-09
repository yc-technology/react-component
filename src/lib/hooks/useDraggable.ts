import { defaultWindow, isClient } from '@yc-tech/shared'
import { useEventListener } from 'ahooks'
import { BasicTarget, getTargetElement } from 'ahooks/es/utils/domTarget'
import { useRef } from 'react'
import { useState } from 'react'
import { PointerType, Position } from '~/types'

export interface UseDraggableOptions<T extends BasicTarget = BasicTarget> {
  /**
   * Only start the dragging when click on the element directly
   *
   * @default false
   */
  exact?: boolean

  /**
   * Prevent events defaults
   *
   * @default false
   */
  preventDefault?: boolean

  /**
   * Prevent events propagation
   *
   * @default false
   */
  stopPropagation?: boolean

  /**
   * Whether dispatch events in capturing phase
   *
   * @default true
   */
  capture?: boolean

  /**
   * Element to attach `pointermove` and `pointerup` events to.
   *
   * @default window
   */
  draggingElement?: HTMLElement | SVGElement | Window | Document | null | undefined

  /**
   * Element for calculating bounds (If not set, it will use the event's target).
   *
   * @default undefined
   */
  containerElement?: HTMLElement | SVGElement | null | undefined

  /**
   * Handle that triggers the drag event
   *
   * @default target
   */
  handle?: T

  /**
   * Pointer types that listen to.
   *
   * @default ['mouse', 'touch', 'pen']
   */
  pointerTypes?: PointerType[]

  /**
   * Initial position of the element.
   *
   * @default { x: 0, y: 0 }
   */
  initialValue?: Position

  /**
   * Callback when the dragging starts. Return `false` to prevent dragging.
   */
  onStart?: (position: Position, event: PointerEvent) => void | false

  /**
   * Callback during dragging.
   */
  onMove?: (position: Position, event: PointerEvent) => void

  /**
   * Callback when dragging end.
   */
  onEnd?: (position: Position, event: PointerEvent) => void

  /**
   * Axis to drag on.
   *
   * @default 'both'
   */
  axis?: 'x' | 'y' | 'both'

  /**
   * Disabled drag and drop.
   *
   * @default false
   */
  disabled?: boolean

  /**
   * Mouse buttons that are allowed to trigger drag events.
   *
   * - `0`: Main button, usually the left button or the un-initialized state
   * - `1`: Auxiliary button, usually the wheel button or the middle button (if present)
   * - `2`: Secondary button, usually the right button
   * - `3`: Fourth button, typically the Browser Back button
   * - `4`: Fifth button, typically the Browser Forward button
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#value
   * @default [0]
   */
  buttons?: number[]
}

export function useDraggable<T extends BasicTarget = BasicTarget>(
  _target?: T,
  options: UseDraggableOptions = {}
) {
  const {
    pointerTypes,
    preventDefault,
    stopPropagation,
    exact,
    onMove,
    onEnd,
    onStart,
    initialValue,
    axis = 'both',
    draggingElement = defaultWindow(),
    containerElement,
    handle: draggingHandle = _target,
    buttons = [0]
  } = options

  const [position, setPosition] = useState<Position>(initialValue ?? { x: 0, y: 0 })
  const [pressedDelta, setPressedDelta] = useState<Position>()

  const filterEvent = (e: PointerEvent) => {
    if (pointerTypes) return pointerTypes.includes(e.pointerType as PointerType)
    return true
  }

  const handleEvent = (e: PointerEvent) => {
    if (preventDefault) e.preventDefault()
    if (stopPropagation) e.stopPropagation()
  }

  const start = (e: PointerEvent) => {
    const target = getTargetElement(_target)
    if (!buttons.includes(e.button)) return
    if (options.disabled || !filterEvent(e)) return
    if (exact && e.target !== target) return

    const container = containerElement
    const containerRect = container?.getBoundingClientRect?.()
    const targetRect = target!.getBoundingClientRect()
    const pos = {
      x:
        e.clientX -
        (container
          ? targetRect.left - containerRect!.left + container.scrollLeft
          : targetRect.left),
      y:
        e.clientY -
        (container ? targetRect.top - containerRect!.top + container.scrollTop : targetRect.top)
    }
    if (onStart?.(pos, e) === false) return
    setPressedDelta(pos)
    handleEvent(e)
  }
  const move = (e: PointerEvent) => {
    if (options.disabled || !filterEvent(e)) return
    if (!pressedDelta) return
    const target = getTargetElement(_target)

    const container = containerElement
    const targetRect = target!.getBoundingClientRect()
    let { x, y } = position
    if (axis === 'x' || axis === 'both') {
      x = e.clientX - pressedDelta.x
      if (container) x = Math.min(Math.max(0, x), container.scrollWidth - targetRect!.width)
    }
    if (axis === 'y' || axis === 'both') {
      y = e.clientY - pressedDelta.y
      if (container) y = Math.min(Math.max(0, y), container.scrollHeight - targetRect!.height)
    }
    setPosition({
      x,
      y
    })
    onMove?.(position, e)
    handleEvent(e)
  }
  const end = (e: PointerEvent) => {
    if (options.disabled || !filterEvent(e)) return
    if (!pressedDelta) return
    setPressedDelta(undefined)
    onEnd?.(position, e)
    handleEvent(e)
  }

  if (isClient()) {
    const config = { capture: options.capture ?? true }
    useEventListener('pointerdown', start, { ...config, target: draggingHandle })
    useEventListener('pointermove', move, { ...config, target: draggingElement })
    useEventListener('pointerup', end, { ...config, target: draggingElement })
  }

  return {
    ...position,
    position,
    isDragging: !!pressedDelta,
    styleStr: `left:${position.x}px;top:${position.y}px;`,
    style: {
      left: `${position.x}px`,
      top: `${position.y}px`
    }
  }
}
