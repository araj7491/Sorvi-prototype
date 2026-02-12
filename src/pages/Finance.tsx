import { MainLayout } from '@/components/layout/MainLayout'
import { DashboardGridProvider } from '@/providers/DashboardGridProvider'
import { SizeGroupGrid } from '@/components/dashboard/SizeGroupGrid'
import { financeTabs } from '@/data/mockFinanceData.tsx'
import { createFinanceLayout } from '@/config/defaultLayouts'

export function Finance() {
  return (
    <MainLayout
      showContentHeader
      contentHeaderTabs={financeTabs}
      activeTab="overview"
      currentModule="finance"
    >
      <div className="container mx-auto space-y-6">
        {/* Dashboard Grid with Size-Grouped Drag & Drop */}
        <DashboardGridProvider
          dashboardId="finance-overview"
          defaultItems={createFinanceLayout()}
        >
          <SizeGroupGrid />
        </DashboardGridProvider>
      </div>
    </MainLayout>
  )
}
