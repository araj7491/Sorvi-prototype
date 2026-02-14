interface SorviLogoSVGProps {
  size?: number
  className?: string
}

export function SorviLogoSVG({ size = 64, className = '' }: SorviLogoSVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 491 508"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sorvi Logo"
    >
      <defs>
        {/* Blue gradient for top ribbon */}
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>

        {/* Blue gradient for bottom ribbon */}
        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>

        {/* Radial gradient for the dot */}
        <radialGradient id="dotGradient">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#3B82F6" />
        </radialGradient>
      </defs>

      {/* Blue top ribbon - simplified S curve */}
      <path
        d="M 80 80 Q 150 40, 280 80 Q 350 100, 360 180 Q 365 240, 300 280 Q 250 310, 200 300 L 180 260 Q 220 270, 260 250 Q 310 225, 305 185 Q 300 140, 250 120 Q 180 90, 120 110 Q 70 130, 70 180 Q 70 220, 100 250 L 80 290 Q 30 250, 30 180 Q 30 100, 80 80 Z"
        fill="url(#blueGradient)"
        opacity="0.95"
      />

      {/* Blue bottom ribbon - complementary S curve */}
      <path
        d="M 410 430 Q 340 470, 210 430 Q 140 410, 130 330 Q 125 270, 190 230 Q 240 200, 290 210 L 310 250 Q 270 240, 230 260 Q 180 285, 185 325 Q 190 370, 240 390 Q 310 420, 370 400 Q 420 380, 420 330 Q 420 290, 390 260 L 410 220 Q 460 260, 460 330 Q 460 410, 410 430 Z"
        fill="url(#purpleGradient)"
        opacity="0.95"
      />

      {/* Small blue dot in upper right */}
      <circle
        cx="410"
        cy="140"
        r="28"
        fill="url(#dotGradient)"
        opacity="0.95"
      />
    </svg>
  )
}
