import {
  ChartLineUp,
  Package,
  Wrench,
  Users,
  type Icon
} from '@phosphor-icons/react'

export interface AppModule {
  id: string
  name: string
  icon: Icon
  href: string
  color: string
  hoverColor: string
  category: 'finance' | 'operations' | 'customer' | 'analytics'
  description?: string
  keywords?: string[]
}

export const MODULES: AppModule[] = [
  {
    id: 'finance',
    name: 'Finance',
    icon: ChartLineUp,
    href: '/finance',
    color: 'text-green-500',
    hoverColor: 'group-hover:text-green-500',
    category: 'finance',
    description: 'Manage accounting and financial operations',
    keywords: ['money', 'accounting', 'invoices', 'payments', 'expenses', 'ledger']
  },
  {
    id: 'inventory',
    name: 'Inventory',
    icon: Package,
    href: '/inventory',
    color: 'text-amber-500',
    hoverColor: 'group-hover:text-amber-500',
    category: 'operations',
    description: 'Track stock levels and warehouse management',
    keywords: ['stock', 'warehouse', 'products', 'items', 'supplies']
  },
  {
    id: 'repairs',
    name: 'Repairs',
    icon: Wrench,
    href: '/repairs',
    color: 'text-red-500',
    hoverColor: 'group-hover:text-red-500',
    category: 'operations',
    description: 'Service orders and maintenance tracking',
    keywords: ['service', 'maintenance', 'fix', 'tickets', 'jobs']
  },
  {
    id: 'crm',
    name: 'CRM',
    icon: Users,
    href: '/crm',
    color: 'text-blue-500',
    hoverColor: 'group-hover:text-blue-500',
    category: 'customer',
    description: 'Customer relationship and contact management',
    keywords: ['customers', 'contacts', 'clients', 'relationships', 'leads']
  }
]
