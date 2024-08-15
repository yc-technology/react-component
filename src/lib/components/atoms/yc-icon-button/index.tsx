import { YcButtonProps } from '../yc-button'
import { YcIcon, YcIconProps } from '../yc-icon'

type IconButtonProps = YcButtonProps & YcIconProps

export function YcIconButton(props: IconButtonProps) {
  return <YcIcon {...props} />
}
