import type { Quote } from '@/types'

// Helper functions for formatting
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString))
}

// Sample customer names
const customers = [
  'Acme Corporation',
  'TechStart Inc',
  'Global Industries',
  'Precision Manufacturing',
  'Blue Ocean Logistics',
  'Summit Enterprises',
  'NextGen Solutions',
  'Cornerstone Group',
  'Velocity Systems',
  'Horizon Technologies',
  'Pioneer Industries',
  'Atlas Corporation',
  'Quantum Solutions',
  'Meridian Group',
  'Vertex Systems',
  'Cascade Manufacturing',
  'Pinnacle Enterprises',
  'Synergy Corporation',
  'Fusion Technologies',
  'Apex Industries',
  'Sterling Solutions',
  'Phoenix Group',
  'Nexus Corporation',
  'Titan Enterprises',
  'Zenith Systems',
  'Omega Industries',
  'Delta Solutions',
  'Vanguard Corporation',
  'Beacon Technologies',
  'Crown Enterprises',
]

// Sample sales people
const salesPeople = [
  'Sarah Chen',
  'Michael Torres',
  'Emily Johnson',
  'David Kim',
  'Jessica Martinez',
  'Robert Anderson',
  'Maria Garcia',
  'James Wilson',
]

// Generate 89 quotes programmatically
export const mockQuotes: Quote[] = Array.from({ length: 89 }, (_, index) => {
  const quoteNumber = 1000 + index
  const dayOffset = Math.floor(index / 2) // 2 quotes per day roughly
  const date = new Date(2024, 0, 1 + dayOffset) // Starting from Jan 1, 2024

  // Distribute statuses to match KPI: ~45 accepted, ~18 pending, ~26 declined
  let status: 'accepted' | 'pending' | 'declined'
  if (index < 45) {
    status = 'accepted'
  } else if (index < 63) {
    status = 'pending'
  } else {
    status = 'declined'
  }

  // Random amount between $1,000 and $50,000
  const amount = Math.floor(Math.random() * 49000) + 1000

  // Random number of items between 1 and 15
  const items = Math.floor(Math.random() * 15) + 1

  // Random customer
  const customer = customers[Math.floor(Math.random() * customers.length)]

  // Random sales person
  const salesPerson = salesPeople[Math.floor(Math.random() * salesPeople.length)]

  // Valid until 30 days after quote date
  const validUntil = new Date(date)
  validUntil.setDate(validUntil.getDate() + 30)

  return {
    id: `QT-${quoteNumber}`,
    date: date.toISOString().split('T')[0],
    customer,
    items,
    amount,
    status,
    validUntil: validUntil.toISOString().split('T')[0],
    salesPerson,
  }
})

// Sort by date descending (most recent first) by default
mockQuotes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
