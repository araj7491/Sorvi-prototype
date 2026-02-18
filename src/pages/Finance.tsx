import { MainLayout } from '@/components/layout/MainLayout'
import { DashboardGridProvider } from '@/providers/DashboardGridProvider'
import { SizeGroupGrid } from '@/components/dashboard/SizeGroupGrid'
import { financeTabs } from '@/data/mockFinanceData.tsx'
import { createFinanceLayout } from '@/config/defaultLayouts'
import { useLoading } from '@/hooks/useLoading'
import { Button } from '@/components/ui/button'

export function Finance() {
  const { showLoading, hideLoading } = useLoading()

  const handleTestLoading = () => {
    console.log('🔴 Test button clicked!')
    showLoading('Synchronizing your workspace...')
    // Simulate loading for 10 seconds to see multiple animation cycles
    setTimeout(() => {
      console.log('🔴 Hiding loading after 10 seconds')
      hideLoading()
    }, 10000)
  }

  return (
    <MainLayout
      showContentHeader
      contentHeaderTabs={financeTabs}
      activeTab="overview"
      currentModule="finance"
    >
      <div className="container mx-auto space-y-6">
        {/* Test Loading Button */}
        <div className="flex justify-end">
          <Button onClick={handleTestLoading} variant="outline" size="sm">
            Test Loading Animation
          </Button>
        </div>

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
