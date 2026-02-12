import type { Quote, QuoteDetail, QuoteLineItem, Address, QuoteCustomer, QuoteActivity } from '@/types'

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

const streets = [
  '123 Main Street', '456 Oak Avenue', '789 Pine Road', '321 Elm Boulevard',
  '555 Cedar Lane', '888 Maple Drive', '102 Birch Court', '234 Walnut Way',
  '670 Spruce Circle', '411 Willow Path',
]

const cities = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
  'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'Austin',
]

const states = [
  'NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'TX',
]

const zips = [
  '10001', '90001', '60601', '77001', '85001',
  '19101', '78201', '92101', '75201', '78701',
]

const emails = [
  'procurement@', 'orders@', 'purchasing@', 'info@', 'accounts@',
]

const phoneAreaCodes = ['212', '310', '312', '713', '602', '215', '210', '619', '214', '512']

const partDescriptions = [
  'Hydraulic Pump Assembly', 'Servo Motor Controller', 'Precision Bearing Set',
  'Pneumatic Valve Block', 'Linear Actuator Unit', 'Thermal Sensor Module',
  'Power Supply Unit 24V', 'Gearbox Assembly G-200', 'Filter Element Pack',
  'Drive Belt Kit Premium', 'Coupling Adapter Set', 'Control Board PCB',
  'Solenoid Valve 3-Way', 'Pressure Regulator PRV', 'Shaft Seal Kit',
]

const partPrefixes = ['HP', 'SM', 'PB', 'PV', 'LA', 'TS', 'PS', 'GB', 'FE', 'DB', 'CA', 'CB', 'SV', 'PR', 'SS']

const manufacturers = [
  'Bosch Rexroth', 'Siemens', 'Parker Hannifin', 'ABB', 'Eaton',
  'Schneider Electric', 'Emerson', 'Honeywell', 'Rockwell', 'Festo',
]

const conditions = ['New', 'Refurbished', 'OEM New', 'Certified Pre-Owned']

const leadTimes = ['2-3 Days', '1 Week', '2 Weeks', '3-4 Weeks', '6-8 Weeks', 'In Stock']

const pdfTemplates = ['Standard Template', 'Professional Template', 'Minimal Template', 'Branded Template']

function generateAddress(rng: () => number): Address {
  const idx = Math.floor(rng() * cities.length)
  return {
    street: streets[Math.floor(rng() * streets.length)],
    city: cities[idx],
    state: states[idx],
    zip: zips[idx],
    country: 'United States',
  }
}

function generateCustomer(name: string, rng: () => number): QuoteCustomer {
  const domain = name.toLowerCase().replace(/[^a-z]/g, '') + '.com'
  const emailPrefix = emails[Math.floor(rng() * emails.length)]
  const areaCode = phoneAreaCodes[Math.floor(rng() * phoneAreaCodes.length)]
  const phone1 = String(Math.floor(rng() * 900) + 100)
  const phone2 = String(Math.floor(rng() * 9000) + 1000)

  return {
    name,
    email: emailPrefix + domain,
    phone: `(${areaCode}) ${phone1}-${phone2}`,
    billingAddress: generateAddress(rng),
    shippingAddress: generateAddress(rng),
  }
}

function generateLineItems(count: number, rng: () => number): QuoteLineItem[] {
  const items: QuoteLineItem[] = []
  for (let i = 0; i < count; i++) {
    const descIdx = Math.floor(rng() * partDescriptions.length)
    const qty = Math.floor(rng() * 10) + 1
    const rate = Math.floor(rng() * 4500) + 500
    const vatPercent = [0, 5, 10, 18][Math.floor(rng() * 4)]
    const amount = qty * rate

    items.push({
      id: `LI-${i + 1}`,
      description: partDescriptions[descIdx],
      partNumber: `${partPrefixes[descIdx]}-${Math.floor(rng() * 9000) + 1000}`,
      manufacturer: manufacturers[Math.floor(rng() * manufacturers.length)],
      condition: conditions[Math.floor(rng() * conditions.length)],
      leadTime: leadTimes[Math.floor(rng() * leadTimes.length)],
      quantity: qty,
      rate,
      vatPercent,
      amount,
    })
  }
  return items
}

const activityAuthors = [
  'Sarah Johnson', 'Mike Chen', 'Emily Davis', 'Alex Turner', 'Lisa Wang',
]

const commentTexts = [
  'Updated pricing based on new supplier rates',
  'Customer requested expedited delivery',
  'Approved by management',
  'Waiting for customer confirmation',
  'Added additional items per customer request',
  'Applied volume discount',
  'Checked inventory availability',
  'Shipping terms confirmed with logistics',
]

const emailTexts = [
  'Quote sent to customer via email',
  'Follow-up email sent',
  'Customer replied with questions',
  'Revised quote emailed',
]

const statusTexts = [
  'Quote created',
  'Quote status changed to Pending',
  'Quote marked as Accepted',
  'Quote sent to customer',
]

export function generateQuoteActivities(quoteId: string): QuoteActivity[] {
  const seed = quoteId.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const rng = mulberry32(seed * 7919)

  const count = Math.floor(rng() * 6) + 3 // 3-8 entries
  const activities: QuoteActivity[] = []
  const baseDate = new Date('2025-01-15')

  for (let i = 0; i < count; i++) {
    const typeRoll = rng()
    let type: QuoteActivity['type']
    let text: string
    let internal = false
    let details: string | null = null

    if (typeRoll < 0.35) {
      type = 'comment'
      text = commentTexts[Math.floor(rng() * commentTexts.length)]
      internal = rng() > 0.5
      if (rng() > 0.6) {
        details = 'See attached document for reference.'
      }
    } else if (typeRoll < 0.55) {
      type = 'email'
      text = emailTexts[Math.floor(rng() * emailTexts.length)]
    } else if (typeRoll < 0.75) {
      type = 'status'
      text = statusTexts[Math.floor(rng() * statusTexts.length)]
    } else {
      type = 'audit'
      text = 'Quote viewed by ' + activityAuthors[Math.floor(rng() * activityAuthors.length)]
    }

    const dayOffset = Math.floor(rng() * 30)
    const hourOffset = Math.floor(rng() * 24)
    const activityDate = new Date(baseDate)
    activityDate.setDate(activityDate.getDate() - dayOffset)
    activityDate.setHours(hourOffset, Math.floor(rng() * 60))

    activities.push({
      id: `act-${quoteId}-${i}`,
      type,
      author: activityAuthors[Math.floor(rng() * activityAuthors.length)],
      text,
      details,
      internal,
      createdAt: activityDate.toISOString(),
    })
  }

  // Sort newest first
  activities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return activities
}

export function generateQuoteDetail(quote: Quote): QuoteDetail {
  // Use quote id as seed for deterministic output
  const seed = quote.id.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const rng = mulberry32(seed * 31337)

  const lineItemCount = Math.max(quote.items, 1)
  const lineItems = generateLineItems(lineItemCount, rng)

  const subTotal = lineItems.reduce((sum, item) => sum + item.amount, 0)
  const shippingCharges = Math.floor(rng() * 500) + 50
  const discountPercent = [0, 5, 10, 15][Math.floor(rng() * 4)]
  const discount = Math.round(subTotal * discountPercent / 100)
  const taxableAmount = subTotal - discount + shippingCharges
  const tax = Math.round(taxableAmount * 0.08)
  const total = taxableAmount + tax

  const creationDate = new Date(quote.date)
  creationDate.setDate(creationDate.getDate() - Math.floor(rng() * 3))

  return {
    ...quote,
    quoteNumber: quote.id,
    creationDate: creationDate.toISOString().split('T')[0],
    pdfTemplate: pdfTemplates[Math.floor(rng() * pdfTemplates.length)],
    customerDetails: generateCustomer(quote.customer, rng),
    lineItems,
    summary: {
      subTotal,
      shippingCharges,
      discount,
      tax,
      total,
    },
    filesCount: Math.floor(rng() * 5),
    commentsCount: Math.floor(rng() * 12) + 1,
  }
}
