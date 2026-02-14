import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { LayoutProvider } from '@/providers/LayoutProvider'
import { LoadingProvider } from '@/providers/LoadingProvider'
import { Finance } from '@/pages/Finance'
import { Inventory } from '@/pages/Inventory'
import { Repairs } from '@/pages/Repairs'
import { PurchaseOrders } from '@/pages/PurchaseOrders'
import { Quotes } from '@/pages/Quotes'
import { CreateQuote } from '@/pages/CreateQuote'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="sorvi-ui-theme">
      <LayoutProvider defaultLayout="modern" storageKey="sorvi-layout-preference">
        <LoadingProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/finance" replace />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/repairs" element={<Repairs />} />
              <Route path="/finance/purchases" element={<PurchaseOrders />} />
              <Route path="/finance/quotes" element={<Quotes />} />
              <Route path="/finance/quotes/create" element={<CreateQuote />} />
            </Routes>
          </BrowserRouter>
        </LoadingProvider>
      </LayoutProvider>
    </ThemeProvider>
  )
}

export default App
