import {
  CurrencyDollar,
  TrendUp,
  Wallet,
  ChartPieSlice,
  ShoppingCart,
  ShoppingBag,
  FileText,
  Money,
  ChartBar,
  Receipt
} from '@phosphor-icons/react'
import type { KPIData, ChartData, QuoteStatus, KanbanStatusConfig } from '@/types'

export const financeTabs = [
  {
    id: 'overview',
    label: 'Overview',
    href: '/finance',
    icon: <ChartPieSlice size={20} weight="duotone" />
  },
  {
    id: 'quotes',
    label: 'Quotes',
    href: '/finance/quotes',
    icon: <Receipt size={20} weight="duotone" />
  },
  {
    id: 'sales',
    label: 'Sales Orders',
    href: '/finance/sales',
    icon: <ShoppingCart size={20} weight="duotone" />
  },
  {
    id: 'purchases',
    label: 'Purchase Orders',
    href: '/finance/purchases',
    icon: <ShoppingBag size={20} weight="duotone" />
  },
  {
    id: 'invoices',
    label: 'Invoices',
    href: '/finance/invoices',
    icon: <FileText size={20} weight="duotone" />
  },
  {
    id: 'payments',
    label: 'Payments',
    href: '/finance/payments',
    icon: <Money size={20} weight="duotone" />
  },
  {
    id: 'reports',
    label: 'Reports',
    href: '/finance/reports',
    icon: <ChartBar size={20} weight="duotone" />
  },
]

// Kanban board configuration
export const QUOTE_STATUSES: readonly QuoteStatus[] = ['accepted', 'pending', 'declined'] as const

export const quoteKanbanConfig: Record<QuoteStatus, KanbanStatusConfig> = {
  accepted: {
    label: 'Accepted',
    colorDot: 'bg-green-500',
    colorBadge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  pending: {
    label: 'Pending',
    colorDot: 'bg-yellow-500',
    colorBadge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  },
  declined: {
    label: 'Declined',
    colorDot: 'bg-red-500',
    colorBadge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
}

export const financeKPIs: Record<string, KPIData> = {
  receivables: {
    title: 'Accounts Receivable',
    value: '$124,500',
    change: {
      value: 12.5,
      direction: 'up',
      period: 'vs last month',
    },
    icon: <CurrencyDollar size={24} weight="duotone" className="text-blue-500" />,
    variant: 'default',
  },
  payables: {
    title: 'Accounts Payable',
    value: '$82,300',
    change: {
      value: 8.2,
      direction: 'down',
      period: 'vs last month',
    },
    icon: <Wallet size={24} weight="duotone" className="text-orange-500" />,
    variant: 'default',
  },
  netExposure: {
    title: 'Net Exposure',
    value: '$42,200',
    change: {
      value: 18.7,
      direction: 'up',
      period: 'vs last month',
    },
    icon: <TrendUp size={24} weight="duotone" className="text-green-500" />,
    variant: 'default',
  },
}

export const cashFlowData: ChartData[] = [
  { name: 'Jan', inflow: 65000, outflow: 45000 },
  { name: 'Feb', inflow: 72000, outflow: 48000 },
  { name: 'Mar', inflow: 68000, outflow: 52000 },
  { name: 'Apr', inflow: 78000, outflow: 49000 },
  { name: 'May', inflow: 85000, outflow: 55000 },
  { name: 'Jun', inflow: 92000, outflow: 58000 },
]

export const cashTrendData: ChartData[] = [
  { name: 'Jan', balance: 120000 },
  { name: 'Feb', balance: 144000 },
  { name: 'Mar', balance: 160000 },
  { name: 'Apr', balance: 189000 },
  { name: 'May', balance: 219000 },
  { name: 'Jun', balance: 253000 },
]

export const recentTransactions = [
  {
    id: 'INV-001',
    date: '2024-02-10',
    customer: 'Acme Corp',
    type: 'Invoice',
    amount: '$12,450',
    status: 'paid',
  },
  {
    id: 'INV-002',
    date: '2024-02-09',
    customer: 'TechStart Inc',
    type: 'Invoice',
    amount: '$8,900',
    status: 'pending',
  },
  {
    id: 'PO-087',
    date: '2024-02-08',
    customer: 'Global Supplies',
    type: 'Purchase',
    amount: '$3,200',
    status: 'paid',
  },
  {
    id: 'INV-003',
    date: '2024-02-07',
    customer: 'MegaCorp Ltd',
    type: 'Invoice',
    amount: '$24,500',
    status: 'overdue',
  },
  {
    id: 'PO-088',
    date: '2024-02-06',
    customer: 'Office Depot',
    type: 'Purchase',
    amount: '$1,850',
    status: 'paid',
  },
  {
    id: 'INV-004',
    date: '2024-02-05',
    customer: 'StartUp Co',
    type: 'Invoice',
    amount: '$6,700',
    status: 'pending',
  },
]

export const transactionColumns = [
  { key: 'id', label: 'ID', className: 'font-medium' },
  { key: 'date', label: 'Date' },
  { key: 'customer', label: 'Customer' },
  { key: 'type', label: 'Type' },
  { key: 'amount', label: 'Amount', className: 'font-semibold' },
  {
    key: 'status',
    label: 'Status',
    render: (value: string) => {
      return (
        <span
          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
            value === 'paid'
              ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : value === 'pending'
              ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
  },
]
