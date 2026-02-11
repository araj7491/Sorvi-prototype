export interface GridItem {
  id: string
  type: 'kpi' | 'chart' | 'table'
  component: React.ComponentType<any>
  props: Record<string, any>
  size: 'small' | 'medium' | 'large' | 'xlarge'
  order: number
}

export interface GridLayoutConfig {
  items: GridItem[]
  lastModified: number
  version: string
}

export type CardSize = 'small' | 'medium' | 'large' | 'xlarge'
