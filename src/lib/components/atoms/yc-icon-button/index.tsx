import { clsxm } from '@yc-tech/shared'
import { useButton } from '~/lib/hooks/useButton'
import { YcButtonProps } from '../yc-button'
import { YcIcon, YcIconProps } from '../yc-icon'
import { cva } from 'cva'

export type IconButtonProps = Omit<YcButtonProps, 'size'> &
  YcIconProps & { size?: 'small' | 'medium' | 'large'; showDefaultBgColor?: boolean }
const variants = cva({
  variants: {
    size: {
      small: 'w-4 h-4',
      medium: 'w-5 h-5',
      large: 'w-6 h-6'
    },
    padding: {
      small: 'p-0.5',
      medium: 'p-1',
      large: 'p-1.5'
    }
  }
})

export function YcIconButton({
  onClick: outSideClick,
  className,
  size = 'medium',
  icon,
  disabled,
  showDefaultBgColor = true,
  ...props
}: IconButtonProps) {
  const { onClick, loading } = useButton({ onClick: outSideClick, ...props })
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={clsxm(
        'transition-all duration-500 text-opacity-60 hover:text-opacity-100 text-black hover:bg-neutral-50 rounded p-[2px] disabled:cursor-not-allowed',
        showDefaultBgColor ? 'bg-neutral-25' : 'bg-transparent',
        variants({ padding: size }),
        className
      )}>
      <YcIcon
        icon={loading ? 'mingcute:loading-line' : icon}
        {...props}
        className={clsxm({ 'animate-spin': loading }, variants({ size: size }))}
      />
    </button>
  )
}
