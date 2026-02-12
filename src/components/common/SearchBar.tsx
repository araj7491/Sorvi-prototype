import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useEffect, useRef } from 'react'

export function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      // Press Escape to blur/close search
      if (e.key === 'Escape') {
        inputRef.current?.blur()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="relative hidden md:block w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
      <Input
        ref={inputRef}
        type="search"
        placeholder="Search... (⌘K)"
        className="pl-9 pr-4 bg-white/90 dark:bg-gray-950/90 border-white/40 dark:border-gray-800/40 backdrop-blur-sm"
      />
    </div>
  )
}
