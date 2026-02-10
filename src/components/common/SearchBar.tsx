import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function SearchBar() {
  return (
    <div className="relative hidden md:block w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search... (⌘K)"
        className="pl-9 pr-4"
        disabled
      />
    </div>
  )
}
