import { useState } from 'react'

export interface UseButtonOptions {
  loading?: boolean
  onClick?: (e: any) => void | Promise<any>
  autoSync?: boolean
  stopPropagation?: boolean
  preventDefault?: boolean
}

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
