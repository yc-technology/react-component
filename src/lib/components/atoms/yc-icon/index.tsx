'use client'

import { Icon as Iconily, IconProps as IconilyProps, addIcon } from '@iconify/react'
export { addIcon } from '@iconify/react'
export type YcIconProps = IconilyProps
export default function YcIcon(props: YcIconProps) {
  return <Iconily {...props}></Iconily>
}
