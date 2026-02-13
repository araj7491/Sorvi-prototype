import { useEffect } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

interface LoadingOverlayProps {
  showText?: boolean
  text?: string
}

export function LoadingOverlay({ showText = false, text }: LoadingOverlayProps) {
  console.log('🟡 LoadingOverlay rendered', { showText, text })

  // Prevent scrolling when overlay is visible
  useEffect(() => {
    console.log('🟡 LoadingOverlay mounted - preventing scroll')
    document.body.style.overflow = 'hidden'
    return () => {
      console.log('🟡 LoadingOverlay unmounted - restoring scroll')
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <LoadingSpinner showText={showText} text={text} />
    </div>
  )
}
