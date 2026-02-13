import sorviLogo from '@/assets/Adobe Express - file.png'

interface LoadingSpinnerProps {
  showText?: boolean
  text?: string
}

export function LoadingSpinner({ showText = false, text = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Spinner container with elliptical orbit */}
      <div className="relative w-[200px] h-[200px]">
        {/* Center S Logo (static) - using updated logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={sorviLogo}
            alt="Sorvi Logo"
            className="w-16 h-16 object-contain"
          />
        </div>

        {/* Orbiting dot - matches logo's blue dot */}
        {/* Position at center, let animation move it in elliptical orbit */}
        <div className="absolute top-1/2 left-1/2 -ml-1.5 -mt-1.5">
          <div
            className="w-3 h-3 rounded-full animate-elliptical-orbit shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #7DD3FC 0%, #3B82F6 100%)',
            }}
          />
        </div>
      </div>

      {/* Optional loading text */}
      {showText && (
        <p className="text-sm text-muted-foreground font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  )
}
