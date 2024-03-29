'use client'

import { clsxm } from '@yc-tech/shared'
import { YcIconProps, YcIcon } from '../yc-icon'

type YcSpinnerProps = Partial<YcIconProps>

export function YcSpinner(props: YcSpinnerProps) {
  const { className, ...rest } = props
  return (
    <YcIcon icon="mingcute:loading-line" className={clsxm('animate-spin', className)} {...rest} />
  )
}
