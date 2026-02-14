import { useState } from 'react'
import {
  ClockCounterClockwise,
  ChatCircle,
  PaperclipHorizontal,
  PaperPlaneTilt,
  Envelope,
  CheckCircle,
  Info,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import type { QuoteActivity } from '@/types'

interface QuoteActivityPanelProps {
  activities: QuoteActivity[]
}

function formatRelativeTime(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function ActivityIcon({ type, internal }: { type: QuoteActivity['type']; internal: boolean }) {
  const base = 'h-8 w-8 rounded-full border-2 border-card shadow-sm grid place-items-center shrink-0'

  switch (type) {
    case 'comment':
      return (
        <div
          className={cn(
            base,
            internal
              ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
              : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
          )}
        >
          <ChatCircle size={14} weight="fill" />
        </div>
      )
    case 'email':
      return (
        <div className={cn(base, 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400')}>
          <Envelope size={14} weight="fill" />
        </div>
      )
    case 'status':
      return (
        <div className={cn(base, 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400')}>
          <CheckCircle size={14} weight="fill" />
        </div>
      )
    case 'audit':
      return (
        <div className={cn(base, 'bg-slate-100 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400')}>
          <Info size={14} weight="fill" />
        </div>
      )
  }
}

function ActivityEntry({ activity }: { activity: QuoteActivity }) {
  const isComment = activity.type === 'comment'

  return (
    <div className="relative flex gap-3 pb-6 last:pb-0">
      <ActivityIcon type={activity.type} internal={activity.internal} />
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{activity.author}</span>
          <span className="text-[11px] text-muted-foreground">
            {formatRelativeTime(activity.createdAt)}
          </span>
        </div>

        {isComment ? (
          <div
            className={cn(
              'mt-1.5 rounded-xl border p-3 text-sm',
              activity.internal
                ? 'bg-amber-500/5 border-amber-200/50 dark:border-amber-800/30'
                : 'bg-blue-500/5 border-blue-200/50 dark:border-blue-800/30'
            )}
          >
            <p>{activity.text}</p>
            {activity.details && (
              <p className="mt-1 text-xs text-muted-foreground">{activity.details}</p>
            )}
          </div>
        ) : (
          <p className="mt-0.5 text-sm text-muted-foreground">{activity.text}</p>
        )}
      </div>
    </div>
  )
}

export function QuoteActivityPanel({ activities }: QuoteActivityPanelProps) {
  const [viewMode, setViewMode] = useState<'internal' | 'customer'>('internal')
  const [comment, setComment] = useState('')

  return (
    <div className="flex flex-col h-full rounded-lg border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/70 dark:bg-muted/25">
        <div className="flex items-center gap-2">
          <ClockCounterClockwise size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium">Activity & Comments</span>
          <span className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground">
            {activities.length}
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => setViewMode('internal')}
            className={cn(
              'rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors',
              viewMode === 'internal'
                ? 'border border-primary/40 bg-primary/10 text-primary'
                : 'border border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            Internal
          </button>
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={cn(
              'rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors',
              viewMode === 'customer'
                ? 'border border-primary/40 bg-primary/10 text-primary'
                : 'border border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            Customer
          </button>
        </div>
      </div>

      {/* Comment Input */}
      <div className="p-3 border-b">
        <div className="rounded-lg border border-border bg-muted/30 p-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={viewMode === 'internal' ? 'Add an internal note...' : 'Add a comment for customer...'}
            className="w-full min-h-[84px] resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
          <div className="flex items-center justify-between mt-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <PaperclipHorizontal size={14} />
              Attach
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <PaperPlaneTilt size={12} />
              Add
            </button>
          </div>
        </div>
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          {viewMode === 'internal'
            ? 'Internal notes are only visible to your team.'
            : 'This comment will be visible to the customer.'}
        </p>
      </div>

      {/* Timeline Feed */}
      <div className="relative flex-1 overflow-y-auto p-4">
        {/* Vertical connector line */}
        <div className="absolute left-[31px] top-4 bottom-4 w-px bg-border/50" />

        {activities.map((activity) => (
          <ActivityEntry key={activity.id} activity={activity} />
        ))}

        {activities.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No activity yet
          </div>
        )}
      </div>
    </div>
  )
}
