import type { CardSize } from '@/types/grid'

export const sizeToSpanClass: Record<CardSize, string> = {
  small: 'col-span-1',
  medium: 'col-span-1 md:col-span-2',
  large: 'col-span-1 md:col-span-2 lg:col-span-3',
  xlarge: 'col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4',
}

export function reorderArray<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  const newArray = [...array]
  const [removed] = newArray.splice(fromIndex, 1)
  newArray.splice(toIndex, 0, removed)
  return newArray
}
