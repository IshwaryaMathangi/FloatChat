import { Waves } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  showText = true,
  textClassName,
}: {
  className?: string
  showText?: boolean
  textClassName?: string
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={cn(
          'flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-chart-4 text-primary-foreground shadow-lg shadow-primary/20',
          className,
        )}
      >
        <Waves className="size-5" aria-hidden />
      </div>
      {showText && (
        <span className={cn('text-base font-semibold tracking-tight', textClassName)}>
          FloatChat
        </span>
      )}
    </div>
  )
}
