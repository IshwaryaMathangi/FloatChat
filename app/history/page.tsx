'use client'

import { useMemo, useState } from 'react'
import {
  BarChart3,
  Download,
  MessageSquare,
  Search,
  Trash2,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { historyEntries, type HistoryEntry } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const typeConfig: Record<
  HistoryEntry['type'],
  { icon: typeof MessageSquare; label: string }
> = {
  chat: { icon: MessageSquare, label: 'Chat' },
  visualization: { icon: BarChart3, label: 'Visualization' },
  export: { icon: Download, label: 'Export' },
}

const filters: (HistoryEntry['type'] | 'all')[] = [
  'all',
  'chat',
  'visualization',
  'export',
]

export default function HistoryPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<HistoryEntry['type'] | 'all'>('all')

  const filtered = useMemo(() => {
    return historyEntries.filter((entry) => {
      const matchesFilter = filter === 'all' || entry.type === filter
      const matchesQuery =
        query === '' ||
        entry.query.toLowerCase().includes(query.toLowerCase()) ||
        entry.region.toLowerCase().includes(query.toLowerCase())
      return matchesFilter && matchesQuery
    })
  }, [query, filter])

  return (
    <AppShell
      title="History"
      description="Your past queries, visualizations, and exports"
      actions={
        <Button variant="outline" size="sm" className="gap-1.5">
          <Trash2 className="size-4" />
          Clear all
        </Button>
      }
    >
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search history…"
              className="pl-9"
            />
          </div>
          <div className="flex gap-1.5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                  filter === f
                    ? 'border-primary bg-primary/15 text-primary'
                    : 'border-border text-muted-foreground hover:text-foreground',
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          {filtered.map((entry) => {
            const config = typeConfig[entry.type]
            return (
              <Card
                key={entry.id}
                className="flex items-center gap-4 p-4 transition-colors hover:border-primary/40"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <config.icon className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{entry.query}</p>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{entry.time}</span>
                    <span aria-hidden>·</span>
                    <span>{entry.region}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="hidden sm:inline-flex">
                  {config.label}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Delete entry"
                  className="text-muted-foreground"
                >
                  <Trash2 className="size-4" />
                </Button>
              </Card>
            )
          })}
          {filtered.length === 0 && (
            <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
              No history entries match your search.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
