import {
  ChartLineUp,
  Package,
  Wrench,
  Users
} from '@phosphor-icons/react'

export const MODULES = [
  {
    id: 'finance',
    name: 'Finance',
    icon: ChartLineUp,
    href: '/finance',
    color: 'text-blue-500'
  },
  {
    id: 'inventory',
    name: 'Inventory',
    icon: Package,
    href: '/inventory',
    color: 'text-green-500'
  },
  {
    id: 'repairs',
    name: 'Repairs',
    icon: Wrench,
    href: '/repairs',
    color: 'text-orange-500'
  },
  {
    id: 'crm',
    name: 'CRM',
    icon: Users,
    href: '/crm',
    color: 'text-purple-500'
  }
]
