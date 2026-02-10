import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { Finance } from '@/pages/Finance'
import { Inventory } from '@/pages/Inventory'
import { Repairs } from '@/pages/Repairs'
import { CRM } from '@/pages/CRM'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="sorvi-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/finance" replace />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/repairs" element={<Repairs />} />
          <Route path="/crm" element={<CRM />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
