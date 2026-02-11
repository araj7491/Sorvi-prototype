import type { GridItem } from '@/types/grid'
import { KPICard } from '@/components/dashboard/KPICard'
import { ChartWidget } from '@/components/dashboard/ChartWidget'
import { DataTable } from '@/components/common/DataTable'
import {
  financeKPIs,
  cashFlowData,
  cashTrendData,
  recentTransactions,
  transactionColumns,
} from '@/data/mockFinanceData'

export function createFinanceLayout(): GridItem[] {
  return [
    {
      id: 'kpi-receivables',
      type: 'kpi',
      component: KPICard,
      props: financeKPIs.receivables,
      size: 'small',
      order: 0,
    },
    {
      id: 'kpi-payables',
      type: 'kpi',
      component: KPICard,
      props: financeKPIs.payables,
      size: 'small',
      order: 1,
    },
    {
      id: 'kpi-net-exposure',
      type: 'kpi',
      component: KPICard,
      props: financeKPIs.netExposure,
      size: 'small',
      order: 2,
    },
    {
      id: 'chart-cashflow',
      type: 'chart',
      component: ChartWidget,
      props: {
        type: 'bar',
        title: 'Cash Flow',
        data: cashFlowData,
        dataKeys: ['inflow', 'outflow'],
        colors: ['#3b82f6', '#f59e0b'],
      },
      size: 'medium',
      order: 3,
    },
    {
      id: 'chart-cash-trend',
      type: 'chart',
      component: ChartWidget,
      props: {
        type: 'area',
        title: 'Cash Balance Trend',
        data: cashTrendData,
        dataKeys: ['balance'],
        colors: ['#10b981'],
      },
      size: 'medium',
      order: 4,
    },
    {
      id: 'table-transactions',
      type: 'table',
      component: DataTable,
      props: {
        title: 'Recent Transactions',
        columns: transactionColumns,
        data: recentTransactions,
      },
      size: 'xlarge',
      order: 5,
    },
  ]
}
