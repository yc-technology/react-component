import { ButtonHTMLAttributes } from 'react'

import { cva } from 'class-variance-authority'
import { clsxm } from '@yc-tech/shared'

const variants = cva('', {
  variants: {
    variant: {
      PRIMARY: 'bg-green-200 hover:bg-green-400 active:bg-green-500',
      SECONDARY: 'bg-blue-200 hover:bg-blue-400 active:bg-blue-500',
      TERTIARY: 'bg-red-200 hover:bg-red-400 active:bg-red-500',
    },
  },
})
export const AT_BUTTON_VARIANT = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
} as const
export type AtButtonVariant = keyof typeof AT_BUTTON_VARIANT

export interface AtButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  variant?: AtButtonVariant
  isDisabled?: boolean
}

export const AtButton = ({ label, variant = 'PRIMARY', isDisabled = false, onClick }: AtButtonProps) => {
  return (
    <button
      className={clsxm(
        variants({ variant }),
        `transition-colors px-6 py-2 rounded-md ${
          isDisabled ? 'bg-gray-300 text-slate-600 cursor-not-allowed pointer-events-none' : ''
        }`,
      )}
      onClick={isDisabled ? onClick : undefined}
    >
      {label}
    </button>
  )
}
