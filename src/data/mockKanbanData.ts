import type { Quote, QuoteStatus } from '@/types'

// Seeded PRNG (mulberry32) for deterministic generation
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const customers = [
  'Acme Corporation', 'TechStart Inc', 'Global Industries',
  'Precision Manufacturing', 'Blue Ocean Logistics', 'Summit Enterprises',
  'NextGen Solutions', 'Cornerstone Group', 'Velocity Systems',
  'Horizon Technologies', 'Pioneer Industries', 'Atlas Corporation',
  'Quantum Solutions', 'Meridian Group', 'Vertex Systems',
  'Cascade Manufacturing', 'Pinnacle Enterprises', 'Synergy Corporation',
  'Fusion Technologies', 'Apex Industries', 'Sterling Solutions',
  'Phoenix Group', 'Nexus Corporation', 'Titan Enterprises',
  'Zenith Systems', 'Omega Industries', 'Delta Solutions',
  'Vanguard Corporation', 'Beacon Technologies', 'Crown Enterprises',
]

const salesPeople = [
  'Sarah Chen', 'Michael Torres', 'Emily Johnson', 'David Kim',
  'Jessica Martinez', 'Robert Anderson', 'Maria Garcia', 'James Wilson',
]

// Pre-computed totals per status
export const KANBAN_TOTALS: Record<QuoteStatus, number> = {
  accepted: 1_200_000,
  pending: 800_000,
  declined: 500_000,
}

/**
 * Generate a single quote deterministically from its index and status.
 * O(1) per call, no storage needed.
 */
export function generateQuote(index: number, status: QuoteStatus): Quote {
  const statusSeed = status === 'accepted' ? 1 : status === 'pending' ? 2 : 3
  const rng = mulberry32(index * 7 + statusSeed * 100003)

  const quoteNumber = statusSeed * 1_000_000 + index
  const dayOffset = Math.floor(rng() * 730) // ~2 years of dates
  const date = new Date(2023, 0, 1 + dayOffset)
  const amount = Math.floor(rng() * 49000) + 1000
  const items = Math.floor(rng() * 15) + 1
  const customer = customers[Math.floor(rng() * customers.length)]
  const salesPerson = salesPeople[Math.floor(rng() * salesPeople.length)]

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
}
