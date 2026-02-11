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

export * from './grid'
