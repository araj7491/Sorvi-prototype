import { cn } from '@/lib/utils'

interface SorviOrbitLogoProps {
  className?: string
  showOrbit?: boolean
}

export function SorviOrbitLogo({ className, showOrbit = true }: SorviOrbitLogoProps) {
  return (
    <span className={cn(
      "inline-flex items-center font-bold text-xl tracking-tight text-foreground",
      "transition-all duration-300",
      className
    )}>
      {/* "Sorvi" text */}
      <span>Sorvi</span>

      {showOrbit && (
        <>
          {/* Small space before Orbit */}
          <span className="w-1.5" />

          {/* "Orbit" text */}
          <span>Orbit</span>
        </>
      )}
    </span>
  )
}
