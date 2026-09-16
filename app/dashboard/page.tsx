'use client'

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Database,
  Minus,
  Waves,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import {
  DepthChart,
  ObservationsChart,
  RegionChart,
  StatusPieChart,
} from '@/components/dashboard/dashboard-charts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { argoFloats, dashboardMetrics } from '@/lib/mock-data'

const trendIcon = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: Minus,
}

const statusColor: Record<string, string> = {
  active: 'bg-chart-5',
  maintenance: 'bg-amber-500',
  inactive: 'bg-muted-foreground',
}

export default function DashboardPage() {
  const legend = [
    { label: 'Active', key: 'active', color: 'bg-chart-1' },
    { label: 'Maintenance', key: 'maintenance', color: 'bg-chart-2' },
    { label: 'Inactive', key: 'inactive', color: 'bg-chart-3' },
  ]

  return (
    <AppShell
      title="Ocean Dashboard"
      description="Live overview of the ARGO float network"
      actions={
        <Button variant="outline" size="sm" className="gap-1.5">
          <Database className="size-4" />
          Export
        </Button>
      }
    >
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardMetrics.map((metric) => {
            const Icon = trendIcon[metric.trend]
            return (
              <Card key={metric.label}>
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight">
                    {metric.value}
                  </p>
                  <div
                    className={
                      'mt-2 flex items-center gap-1 text-xs ' +
                      (metric.trend === 'up'
                        ? 'text-chart-5'
                        : metric.trend === 'down'
                          ? 'text-destructive'
                          : 'text-muted-foreground')
                    }
                  >
                    <Icon className="size-3.5" />
                    {metric.change}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Primary charts */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Observation Volume</CardTitle>
                <CardDescription>
                  Monthly float profiles ingested across all basins
                </CardDescription>
              </div>
              <Badge variant="success" className="gap-1">
                <Activity />
                +11% MoM
              </Badge>
            </CardHeader>
            <CardContent>
              <ObservationsChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Float Status</CardTitle>
              <CardDescription>Distribution of network health</CardDescription>
            </CardHeader>
            <CardContent>
              <StatusPieChart />
              <div className="mt-3 flex flex-wrap justify-center gap-4">
                {legend.map((item) => (
                  <div key={item.key} className="flex items-center gap-1.5">
                    <span className={`size-2.5 rounded-full ${item.color}`} />
                    <span className="text-xs text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary charts */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Temperature & Salinity vs Depth</CardTitle>
              <CardDescription>
                Averaged vertical profile across active floats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DepthChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Temperature by Region</CardTitle>
              <CardDescription>Surface temperature per ocean basin</CardDescription>
            </CardHeader>
            <CardContent>
              <RegionChart />
            </CardContent>
          </Card>
        </div>

        {/* Recent floats */}
        <Card className="mt-6">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Float Activity</CardTitle>
              <CardDescription>
                Latest profiling cycles reported to the network
              </CardDescription>
            </div>
            <Waves className="size-5 text-primary" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {argoFloats.slice(0, 6).map((float) => (
                <div
                  key={float.id}
                  className="flex items-center gap-4 px-5 py-3"
                >
                  <span
                    className={`size-2 shrink-0 rounded-full ${statusColor[float.status]}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">Float {float.id}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {float.region} · {float.location}
                    </p>
                  </div>
                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-medium">{float.temperature}°C</p>
                    <p className="text-xs text-muted-foreground">Temp</p>
                  </div>
                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-medium">{float.salinity}</p>
                    <p className="text-xs text-muted-foreground">PSU</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{float.date}</p>
                    <p className="text-xs text-muted-foreground">
                      {float.cycles} cycles
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
