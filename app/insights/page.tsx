'use client'

import { Bookmark, MapPin, Share2, Sparkles } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { savedInsights } from '@/lib/mock-data'

function ConfidenceRing({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-medium text-muted-foreground">{value}%</span>
    </div>
  )
}

export default function InsightsPage() {
  return (
    <AppShell
      title="Saved Insights"
      description="AI-generated findings you've bookmarked"
    >
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-4">
          <Sparkles className="size-5 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            FloatChat surfaces confidence-scored insights automatically as you
            explore. Bookmark them here to revisit and share.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {savedInsights.map((insight) => (
            <Card key={insight.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base leading-snug">
                    {insight.title}
                  </CardTitle>
                  <Bookmark className="size-4 shrink-0 fill-primary text-primary" />
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3" />
                  {insight.region} · {insight.date}
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {insight.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {insight.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <div>
                    <p className="mb-1 text-xs text-muted-foreground">
                      Confidence
                    </p>
                    <ConfidenceRing value={insight.confidence} />
                  </div>
                  <Button variant="ghost" size="icon-sm" aria-label="Share insight">
                    <Share2 className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
