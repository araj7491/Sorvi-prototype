import { cn } from '@/lib/utils'

interface GridLayoutProps {
  children: React.ReactNode
  className?: string
}

export function GridLayout({ children, className }: GridLayoutProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6",
        className
      )}
    >
      {children}
    </div>
  )
}
