import { MainLayout } from '@/components/layout/MainLayout'
import { GridLayout } from '@/components/dashboard/GridLayout'
import { KPICard } from '@/components/dashboard/KPICard'
import { ChartWidget } from '@/components/dashboard/ChartWidget'
import { DataTable } from '@/components/common/DataTable'
import {
  financeTabs,
  financeKPIs,
  cashFlowData,
  cashTrendData,
  recentTransactions,
  transactionColumns,
} from '@/data/mockFinanceData.tsx'

export function Finance() {
  return (
    <MainLayout
      showContentHeader
      contentHeaderTabs={financeTabs}
      activeTab="overview"
      currentModule="finance"
    >
      <div className="container mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold">Finance Overview</h1>
          <p className="text-muted-foreground">This Month</p>
        </div>

        {/* Dashboard Grid */}
        <GridLayout>
          {/* KPI Cards */}
          <KPICard {...financeKPIs.receivables} />
          <KPICard {...financeKPIs.payables} />
          <KPICard {...financeKPIs.netExposure} />

          {/* Cash Flow Chart */}
          <ChartWidget
            type="bar"
            title="Cash Flow"
            data={cashFlowData}
            dataKeys={['inflow', 'outflow']}
            colors={['#3b82f6', '#f59e0b']}
            height={300}
          />

          {/* Cash Trend Chart */}
          <ChartWidget
            type="area"
            title="Cash Balance Trend"
            data={cashTrendData}
            dataKeys={['balance']}
            colors={['#10b981']}
            height={300}
          />

          {/* Recent Transactions Table */}
          <DataTable
            title="Recent Transactions"
            columns={transactionColumns}
            data={recentTransactions}
            className="col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4"
          />
        </GridLayout>
      </div>
    </MainLayout>
  )
}
