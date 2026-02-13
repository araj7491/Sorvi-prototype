import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { LayoutProvider } from '@/providers/LayoutProvider'
import { Finance } from '@/pages/Finance'
import { Inventory } from '@/pages/Inventory'
import { Repairs } from '@/pages/Repairs'
import { CRM } from '@/pages/CRM'
import { PurchaseOrders } from '@/pages/PurchaseOrders'
import { Quotes } from '@/pages/Quotes'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="sorvi-ui-theme">
      <LayoutProvider defaultLayout="modern" storageKey="sorvi-layout-preference">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/finance" replace />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/repairs" element={<Repairs />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/finance/purchases" element={<PurchaseOrders />} />
            <Route path="/finance/quotes" element={<Quotes />} />
          </Routes>
        </BrowserRouter>
      </LayoutProvider>
    </ThemeProvider>
  )
}

export default App
