'use client'

import { Toaster as Sonner, toast as YcToast } from 'sonner'

type YcToasterProps = React.ComponentProps<typeof Sonner>

const YcToaster = ({ ...props }: YcToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      richColors
      expand
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

export { YcToaster, YcToast }
