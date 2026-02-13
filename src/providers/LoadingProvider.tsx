import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { LoadingOverlay } from '@/components/common/LoadingOverlay'

interface LoadingContextType {
  isLoading: boolean
  showLoading: (text?: string) => void
  hideLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

interface LoadingProviderProps {
  children: ReactNode
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState<string | undefined>(undefined)

  const showLoading = (text?: string) => {
    console.log('🔵 showLoading called', { text })
    setLoadingText(text)
    setIsLoading(true)
  }

  const hideLoading = () => {
    console.log('🔴 hideLoading called')
    setIsLoading(false)
    setLoadingText(undefined)
  }

  console.log('🟢 LoadingProvider render', { isLoading, loadingText })

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      {isLoading && <LoadingOverlay showText={!!loadingText} text={loadingText} />}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider')
  }
  return context
}
