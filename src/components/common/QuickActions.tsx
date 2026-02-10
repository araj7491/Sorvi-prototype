import { Bell, Calendar, MessageSquare, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function QuickActions() {
  return (
    <div className="hidden lg:flex items-center gap-1">
      <Button variant="ghost" size="icon" className="relative h-9 w-9">
        <MessageSquare className="h-4 w-4" />
        <Badge
          variant="destructive"
          className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
        >
          3
        </Badge>
      </Button>
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Users className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Calendar className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="relative h-9 w-9">
        <Bell className="h-4 w-4" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />
      </Button>
    </div>
  )
}
