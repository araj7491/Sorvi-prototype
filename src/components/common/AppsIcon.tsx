import { cn } from '@/lib/utils'

interface AppsIconProps {
  className?: string
}

export function AppsIcon({ className }: AppsIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={cn(
        "transition-colors duration-200",
        "text-gray-600 dark:text-gray-400",
        className
      )}
      aria-hidden="true"
    >
      {/* 3x3 Grid of dots */}
      <circle cx="3" cy="3" r="1.5" />
      <circle cx="10" cy="3" r="1.5" />
      <circle cx="17" cy="3" r="1.5" />

      <circle cx="3" cy="10" r="1.5" />
      <circle cx="10" cy="10" r="1.5" />
      <circle cx="17" cy="10" r="1.5" />

      <circle cx="3" cy="17" r="1.5" />
      <circle cx="10" cy="17" r="1.5" />
      <circle cx="17" cy="17" r="1.5" />
    </svg>
  )
}
