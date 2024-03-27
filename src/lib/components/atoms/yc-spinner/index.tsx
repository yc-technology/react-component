'use client'

import { clsxm } from '@yc-tech/shared'
import Icon, { YcIconProps } from '../yc-icon'

type YcSpinnerProps = Partial<YcIconProps>

export function YcSpinner(props: YcSpinnerProps) {
  const { className, ...rest } = props
  return <Icon icon="mingcute:loading-line" className={clsxm('animate-spin', className)} {...rest} />
}
