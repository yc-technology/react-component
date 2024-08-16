import { clsxm } from '@yc-tech/shared'

type YcAvatarProps = {
  image?: string
  label?: string
  rounded?: boolean
  className?: string
}
const YcAvatar = (props: YcAvatarProps) => {
  if (props.image) {
    return (
      <img
        src={props.image}
        className={clsxm(
          'w-8 h-8 rounded-2 flex-shrink-0',
          { 'rounded-full': props.rounded },
          props.className
        )}
      />
    )
  }
  return (
    <div
      className={clsxm(
        'flex items-center justify-center w-7 h-7 rounded-2 bg-neutral-100 flex-shrink-0',
        { 'rounded-full': props.rounded },
        props.className
      )}>
      {props.label?.toString().charAt(0)}
    </div>
  )
}

export { YcAvatar }
