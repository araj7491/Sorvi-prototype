import { useState, useEffect } from 'react'
import { X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { FilterConfig } from '@/types'

interface DataGridFiltersProps {
  onFiltersChange: (filters: FilterConfig) => void
}

export function DataGridFilters({ onFiltersChange }: DataGridFiltersProps) {
  const [statusFilter, setStatusFilter] = useState('all')

  // Update filters when status changes
  useEffect(() => {
    const filters: FilterConfig = {}

    if (statusFilter !== 'all') {
      filters.status = statusFilter
    }

    onFiltersChange(filters)
  }, [statusFilter, onFiltersChange])

  const handleClearFilters = () => {
    setStatusFilter('all')
  }

  const hasActiveFilters = statusFilter !== 'all'

  return (
    <div className="flex items-center gap-3 border-b border-border bg-muted/20 dark:bg-background px-4 py-3">
      {/* Status filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Status:</span>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear filters button */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="h-9 gap-2"
        >
          <X className="h-4 w-4" />
          Clear filters
        </Button>
      )}
    </div>
  )
}
