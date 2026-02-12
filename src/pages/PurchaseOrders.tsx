import { MainLayout } from '@/components/layout/MainLayout'
import { DashboardGridProvider } from '@/providers/DashboardGridProvider'
import { SizeGroupGrid } from '@/components/dashboard/SizeGroupGrid'
import { KPICard } from '@/components/dashboard/KPICard'
import { ChartWidget } from '@/components/dashboard/ChartWidget'
import { DataTable } from '@/components/common/DataTable'
import { financeTabs } from '@/data/mockFinanceData.tsx'
import { ShoppingBag, TrendUp, Clock, CheckCircle } from '@phosphor-icons/react'
import type { GridItem } from '@/types/grid'

const purchaseOrderKPIs = {
  totalPOs: {
    title: 'Total Purchase Orders',
    value: '156',
    change: {
      value: 8.3,
      direction: 'up' as const,
      period: 'vs last month',
    },
    icon: <ShoppingBag size={24} weight="duotone" className="text-blue-500" />,
    variant: 'default' as const,
  },
  pendingPOs: {
    title: 'Pending Orders',
    value: '23',
    change: {
      value: 12.5,
      direction: 'down' as const,
      period: 'vs last month',
    },
    icon: <Clock size={24} weight="duotone" className="text-orange-500" />,
    variant: 'default' as const,
  },
  completedPOs: {
    title: 'Completed This Month',
    value: '89',
    change: {
      value: 15.2,
      direction: 'up' as const,
      period: 'vs last month',
    },
    icon: <CheckCircle size={24} weight="duotone" className="text-green-500" />,
    variant: 'default' as const,
  },
  totalValue: {
    title: 'Total PO Value',
    value: '$342,850',
    change: {
      value: 18.7,
      direction: 'up' as const,
      period: 'vs last month',
    },
    icon: <TrendUp size={24} weight="duotone" className="text-purple-500" />,
    variant: 'default' as const,
  },
}

const monthlyPOData = [
  { name: 'Jan', orders: 45, value: 125000 },
  { name: 'Feb', orders: 52, value: 148000 },
  { name: 'Mar', orders: 48, value: 132000 },
  { name: 'Apr', orders: 61, value: 178000 },
  { name: 'May', orders: 58, value: 165000 },
  { name: 'Jun', orders: 67, value: 195000 },
]

const recentPurchaseOrders = [
  {
    id: 'PO-2401',
    date: '2024-02-10',
    supplier: 'Tech Supplies Co',
    items: '15 items',
    amount: '$12,450',
    status: 'delivered',
  },
  {
    id: 'PO-2402',
    date: '2024-02-09',
    supplier: 'Office Mart',
    items: '8 items',
    amount: '$3,200',
    status: 'pending',
  },
  {
    id: 'PO-2403',
    date: '2024-02-08',
    supplier: 'Global Parts Ltd',
    items: '22 items',
    amount: '$18,900',
    status: 'in-transit',
  },
  {
    id: 'PO-2404',
    date: '2024-02-07',
    supplier: 'Industrial Supply',
    items: '30 items',
    amount: '$24,500',
    status: 'delivered',
  },
  {
    id: 'PO-2405',
    date: '2024-02-06',
    supplier: 'Equipment Plus',
    items: '5 items',
    amount: '$8,750',
    status: 'pending',
  },
]

const purchaseOrderColumns = [
  { key: 'id', label: 'PO Number', className: 'font-medium' },
  { key: 'date', label: 'Date' },
  { key: 'supplier', label: 'Supplier' },
  { key: 'items', label: 'Items' },
  { key: 'amount', label: 'Amount', className: 'font-semibold' },
  {
    key: 'status',
    label: 'Status',
    render: (value: string) => {
      return (
        <span
          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
            value === 'delivered'
              ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : value === 'in-transit'
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
          }`}
        >
          {value === 'in-transit' ? 'In Transit' : value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
  },
]

function createPurchaseOrdersLayout(): GridItem[] {
  return [
    {
      id: 'kpi-total-pos',
      type: 'kpi',
      component: KPICard,
      props: purchaseOrderKPIs.totalPOs,
      size: 'small',
      order: 0,
    },
    {
      id: 'kpi-pending-pos',
      type: 'kpi',
      component: KPICard,
      props: purchaseOrderKPIs.pendingPOs,
      size: 'small',
      order: 1,
    },
    {
      id: 'kpi-completed-pos',
      type: 'kpi',
      component: KPICard,
      props: purchaseOrderKPIs.completedPOs,
      size: 'small',
      order: 2,
    },
    {
      id: 'kpi-total-value',
      type: 'kpi',
      component: KPICard,
      props: purchaseOrderKPIs.totalValue,
      size: 'small',
      order: 3,
    },
    {
      id: 'chart-monthly-pos',
      type: 'chart',
      component: ChartWidget,
      props: {
        type: 'bar',
        title: 'Monthly Purchase Orders',
        data: monthlyPOData,
        dataKeys: ['orders'],
        colors: ['#3b82f6'],
      },
      size: 'medium',
      order: 4,
    },
    {
      id: 'chart-po-value',
      type: 'chart',
      component: ChartWidget,
      props: {
        type: 'area',
        title: 'Purchase Order Value Trend',
        data: monthlyPOData,
        dataKeys: ['value'],
        colors: ['#8b5cf6'],
      },
      size: 'medium',
      order: 5,
    },
    {
      id: 'table-recent-pos',
      type: 'table',
      component: DataTable,
      props: {
        title: 'Recent Purchase Orders',
        columns: purchaseOrderColumns,
        data: recentPurchaseOrders,
      },
      size: 'xlarge',
      order: 6,
    },
  ]
}

export function PurchaseOrders() {
  return (
    <MainLayout
      showContentHeader
      contentHeaderTabs={financeTabs}
      activeTab="purchases"
      currentModule="finance"
    >
      <div className="container mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold">Purchase Orders</h1>
          <p className="text-muted-foreground">This Month</p>
        </div>

        {/* Dashboard Grid with Size-Grouped Drag & Drop */}
        <DashboardGridProvider
          dashboardId="purchase-orders"
          defaultItems={createPurchaseOrdersLayout()}
        >
          <SizeGroupGrid />
        </DashboardGridProvider>
      </div>
    </MainLayout>
  )
}
