import { createContext, useContext, useState } from 'react'

type Layout = 'modern' | 'classic'

type LayoutProviderProps = {
  children: React.ReactNode
  defaultLayout?: Layout
  storageKey?: string
}

type LayoutProviderState = {
  layout: Layout
  setLayout: (layout: Layout) => void
}

const initialState: LayoutProviderState = {
  layout: 'modern',
  setLayout: () => null,
}

const LayoutProviderContext = createContext<LayoutProviderState>(initialState)

export function LayoutProvider({
  children,
  defaultLayout = 'modern',
  storageKey = 'sorvi-layout-preference',
  ...props
}: LayoutProviderProps) {
  const [layout, setLayout] = useState<Layout>(
    () => (localStorage.getItem(storageKey) as Layout) || defaultLayout
  )

  const value = {
    layout,
    setLayout: (layout: Layout) => {
      localStorage.setItem(storageKey, layout)
      setLayout(layout)
    },
  }

  return (
    <LayoutProviderContext.Provider {...props} value={value}>
      {children}
    </LayoutProviderContext.Provider>
  )
}

export const useLayout = () => {
  const context = useContext(LayoutProviderContext)

  if (context === undefined)
    throw new Error('useLayout must be used within a LayoutProvider')

  return context
}
