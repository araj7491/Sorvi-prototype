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
  onRowClick?: (row: TData) => void
}

// Quote Detail types
export interface Address {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface QuoteCustomer {
  name: string
  email: string
  phone: string
  billingAddress: Address
  shippingAddress: Address
}

export interface QuoteLineItem {
  id: string
  description: string
  partNumber: string
  manufacturer: string
  condition: string
  leadTime: string
  quantity: number
  rate: number
  vatPercent: number
  amount: number
}

export interface QuoteSummary {
  subTotal: number
  shippingCharges: number
  discount: number
  tax: number
  total: number
}

export interface QuoteDetail extends Quote {
  quoteNumber: string
  creationDate: string
  pdfTemplate: string
  customerDetails: QuoteCustomer
  lineItems: QuoteLineItem[]
  summary: QuoteSummary
  filesCount: number
  commentsCount: number
}

export interface QuoteActivity {
  id: string
  type: 'comment' | 'audit' | 'email' | 'status'
  author: string
  text: string
  details: string | null
  internal: boolean
  createdAt: string
}

// Kanban types
export type QuoteStatus = Quote['status']

export interface KanbanStatusConfig {
  label: string
  colorDot: string
  colorBadge: string
}

export interface KanbanColumnResponse extends PaginatedResponse<Quote> {
  totalAmount: number
  hasMore: boolean
}

export interface FetchKanbanColumnParams {
  status: QuoteStatus
  page: number
  pageSize: number
  sort?: SortConfig
}

export interface UpdateQuoteStatusParams {
  quoteId: string
  fromStatus: QuoteStatus
  toStatus: QuoteStatus
}

export interface UpdateQuoteStatusResponse {
  success: boolean
  quote: Quote
}

export * from './grid'
