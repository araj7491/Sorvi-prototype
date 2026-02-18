import sorviLogo from '@/assets/sorviloadingicon.svg'

interface LoadingSpinnerProps {
  showText?: boolean
  text?: string
}

export function LoadingSpinner({ showText = false, text = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-0">
      {/* Spinner container with elliptical orbit */}
      <div className="relative w-[300px] h-[300px]">
        {/* Center S Logo (static) - using updated logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={sorviLogo}
            alt="Sorvi Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Orbiting dot - independent circular path */}
        <div
          className="absolute left-1/2 animate-circular-orbit"
          style={{ width: '0', height: '0', top: 'calc(50% + 4px)' }}
        >
          <div
            className="w-4 h-4 rounded-full shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #7DD3FC 0%, #3B82F6 100%)',
              position: 'absolute',
              left: '45px',
              top: '-8px',
            }}
          />
        </div>
      </div>

      {/* Optional loading text */}
      {showText && (
        <p className="-mt-16 text-sm text-muted-foreground font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  )
}
