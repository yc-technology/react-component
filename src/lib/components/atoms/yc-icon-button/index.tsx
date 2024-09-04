import { clsxm } from '@yc-tech/shared'
import { useButton } from '~/lib/hooks/useButton'
import { YcButtonProps } from '../yc-button'
import { YcIcon, YcIconProps } from '../yc-icon'
import { cva } from 'cva'
import { Tooltip, TooltipProps } from 'antd'

export type IconButtonProps = Omit<YcButtonProps, 'size'> &
  YcIconProps & {
    size?: 'small' | 'medium' | 'large'
    showDefaultBgColor?: boolean
    tooltip?: string
    tooltipProps?: TooltipProps
  }
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
  tooltip,
  tooltipProps,
  stopPropagation,
  preventDefault,
  ...props
}: IconButtonProps) {
  const { onClick, loading } = useButton({
    onClick: outSideClick,
    stopPropagation,
    preventDefault,
    ...props
  })

  const renderIcon = () => {
    return (
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={clsxm(
          'transition-all duration-300 text-opacity-60 hover:text-opacity-100 text-black hover:bg-neutral-200 rounded p-[2px] disabled:cursor-not-allowed',
          showDefaultBgColor ? 'bg-neutral-100' : 'bg-transparent',
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

  if (tooltip) {
    return (
      <Tooltip title={tooltip} {...tooltipProps}>
        {renderIcon()}
      </Tooltip>
    )
  }

  return renderIcon()
}
