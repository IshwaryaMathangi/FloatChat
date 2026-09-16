import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

function Avatar({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-medium',
        className,
      )}
      {...props}
    />
  )
}

export { Avatar }
