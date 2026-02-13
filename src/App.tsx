import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { LayoutProvider } from '@/providers/LayoutProvider'
import { Finance } from '@/pages/Finance'
import { Inventory } from '@/pages/Inventory'
import { Repairs } from '@/pages/Repairs'
import { CRM } from '@/pages/CRM'
import { PurchaseOrders } from '@/pages/PurchaseOrders'
import { Quotes } from '@/pages/Quotes'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

function AnimatedRoutes() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState('fade-in')

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fade-out')
    }
  }, [location, displayLocation])

  useEffect(() => {
    if (transitionStage === 'fade-out') {
      const timeout = setTimeout(() => {
        setDisplayLocation(location)
        setTransitionStage('fade-in')
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [transitionStage, location])

  return (
    <div
      className={cn(
        'transition-all duration-300',
        transitionStage === 'fade-out' && 'opacity-0 -translate-x-4',
        transitionStage === 'fade-in' && 'opacity-100 translate-x-0'
      )}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<Navigate to="/finance" replace />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/repairs" element={<Repairs />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/finance/purchases" element={<PurchaseOrders />} />
        <Route path="/finance/quotes" element={<Quotes />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="sorvi-ui-theme">
      <LayoutProvider defaultLayout="modern" storageKey="sorvi-layout-preference">
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </LayoutProvider>
    </ThemeProvider>
  )
}

export default App
