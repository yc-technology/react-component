import { clsxm } from '@yc-tech/shared'
import { YcIconProps, YcIcon } from '../yc-icon'

type AtSpinnerProps = Partial<YcIconProps>

export function AtSpinner(props: AtSpinnerProps) {
  const { className, ...rest } = props
  return (
    <YcIcon icon="mingcute:loading-line" className={clsxm('animate-spin', className)} {...rest} />
  )
}
