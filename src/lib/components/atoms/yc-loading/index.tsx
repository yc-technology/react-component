'use client'

import { clsxm } from '@yc-tech/shared'
import { YcSpinner } from '../yc-spinner'

interface YcLoadingProps {
  children: React.ReactNode
  className?: string
  loadingClassName?: string
  loading?: boolean
  lazy?: boolean
}
export function YcLoading(props: YcLoadingProps) {
  const { children, lazy, className, loadingClassName, loading } = props
  return (
    <div className={clsxm(className, 'relative')}>
      {((lazy && !loading) || !lazy) && children}
      {loading && (
        <div
          className={clsxm(
            'absolute top-0 left-0 bg-white/40 w-full h-full flex justify-center items-center',
            loadingClassName
          )}>
          <YcSpinner className=" m-auto h-6 w-6"></YcSpinner>
        </div>
      )}
    </div>
  )
}
