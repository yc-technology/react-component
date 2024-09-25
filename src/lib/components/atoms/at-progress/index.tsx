import * as RProgress from '@radix-ui/react-progress'
import { clsxm } from '@yc-tech/shared'
import { cva, VariantProps } from 'cva'

const progressVariants = cva({
  variants: {
    type: {
      primary: '[&>.indicator]:bg-primary-300',
      secondary: '[&>.indicator]:bg-secondary-500',
      success: '[&>.indicator]:bg-success-500',
      warning: '[&>.indicator]:bg-warning-500',
      danger: '[&>.indicator]:bg-danger bg-danger'
    }
  },
  defaultVariants: {
    type: 'primary'
  }
})

export interface AtProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  progress: number
}

export function AtProgress({ progress, type, className }: AtProgressProps) {
  return (
    <RProgress.Root
      className={clsxm(
        'h-1 w-full bg-neutral-100 rounded-sm overflow-hidden',
        progressVariants({ type }),
        className
      )}
      value={progress}>
      <RProgress.Indicator
        className={clsxm('indicator', 'rounded-1 transition h-full')}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </RProgress.Root>
  )
}
