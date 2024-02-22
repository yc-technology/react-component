import { Icon as Iconily, IconProps as IconilyProps, addIcon } from '@iconify/react'
export { addIcon } from '@iconify/react'
export type IconProps = IconilyProps
export default function YcIcon(props: IconProps) {
  return <Iconily {...props}></Iconily>
}
