import { useState } from 'react'
import { YcButtonProps } from '../components'

type UseButtonOptions = YcButtonProps

export function useButton({
  loading: outerLoading,
  onClick,
  autoSync,
  stopPropagation: stop,
  preventDefault: prevent
}: UseButtonOptions) {
  const [innerLoading, setInnerLoading] = useState(false)

  const loading = outerLoading || innerLoading
  let packOnClick = onClick
  packOnClick = (e) => {
    if (loading) return
    if (autoSync) {
      if (onClick) {
        const res: Promise<any> | any = onClick(e)
        if (res instanceof Promise) {
          setInnerLoading(true)
          res.finally(() => setInnerLoading(false))
        }
      }
    } else {
      onClick?.(e)
    }
    if (stop) e.stopPropagation()
    if (prevent) e.preventDefault()
  }
  return { onClick: packOnClick, loading }
}
