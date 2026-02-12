export interface Tab {
  id: string
  label: string
  href: string
  icon?: React.ReactNode
}

export interface Module {
  id: string
  name: string
  icon: React.ReactNode
  href: string
  color: string
}

export interface KPIData {
  title: string
  value: string | number
  change?: {
    value: number
    direction: 'up' | 'down'
    period: string
  }
  icon?: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error'
}

export interface ChartData {
  name: string
  [key: string]: string | number
}

export type Layout = 'modern' | 'classic'

export interface SidebarNavItem {
  id: string
  label: string
  icon: React.ComponentType
  href: string
  color: string
  isActive?: boolean
}

// Quote data structure
export interface Quote {
  id: string
  date: string
  customer: string
  items: number
  amount: number
  status: 'accepted' | 'pending' | 'declined'
  validUntil?: string
  salesPerson?: string
}

// API Response types for server-side operations
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

export interface SortConfig {
  column: string
  direction: 'asc' | 'desc'
}

export interface FilterConfig {
  [key: string]: any
}

export interface FetchDataParams {
  page: number
  pageSize: number
  sort?: SortConfig
  filters?: FilterConfig
}

// Generic DataGrid types
export interface DataGridColumn<TData> {
  id: string
  header: string
  accessorKey?: keyof TData
  accessorFn?: (row: TData) => any
  cell?: (info: any) => React.ReactNode
  enableSorting?: boolean
  enableColumnFilter?: boolean
  size?: number
  minSize?: number
  maxSize?: number
}

export interface DataGridProps<TData> {
  data: TData[]
  columns: DataGridColumn<TData>[]
  title?: string
  pageCount: number
  totalRows: number
  pagination: {
    pageIndex: number
    pageSize: number
  }
  onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void
  sorting?: SortConfig
  onSortingChange?: (sort: SortConfig | undefined) => void
  isLoading?: boolean
}

export * from './grid'
