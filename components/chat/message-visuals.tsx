'use client'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { MapPin, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  argoFloats,
  depthProfile,
  regionTemperatures,
  temperatureTrend,
} from '@/lib/mock-data'

const axisStyle = {
  fontSize: 11,
  fill: 'var(--muted-foreground)',
}

function ChartFrame({
  title,
  caption,
  children,
}: {
  title: string
  caption: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-3 rounded-xl border border-border bg-background/60 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-sm font-medium">{title}</p>
        <Badge variant="secondary" className="gap-1">
          <TrendingUp />
          Live view
        </Badge>
      </div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{caption}</p>
    </div>
  )
}

export function DepthProfileChart() {
  return (
    <ChartFrame
      title="Temperature & Salinity vs Depth"
      caption="Vertical profile averaged across active floats. Temperature drops sharply through the thermocline (100–400m)."
    >
      <LineChart data={depthProfile} margin={{ left: -12, right: 8, top: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis
          dataKey="depth"
          tick={axisStyle}
          tickLine={false}
          axisLine={false}
          unit="m"
        />
        <YAxis tick={axisStyle} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            background: 'var(--popover)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            fontSize: 12,
            color: 'var(--popover-foreground)',
          }}
        />
        <Line
          type="monotone"
          dataKey="temperature"
          name="Temp (°C)"
          stroke="var(--chart-1)"
          strokeWidth={2.5}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="salinity"
          name="Salinity (PSU)"
          stroke="var(--chart-4)"
          strokeWidth={2.5}
          dot={false}
        />
      </LineChart>
    </ChartFrame>
  )
}

export function TrendChart() {
  return (
    <ChartFrame
      title="Sea Surface Temperature — 5 Year Trend"
      caption="Basin-averaged surface temperature has risen 1.6°C since 2021, outpacing the long-term mean."
    >
      <AreaChart data={temperatureTrend} margin={{ left: -12, right: 8, top: 4 }}>
        <defs>
          <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.5} />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="year" tick={axisStyle} tickLine={false} axisLine={false} />
        <YAxis
          domain={[26, 29]}
          tick={axisStyle}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            background: 'var(--popover)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            fontSize: 12,
            color: 'var(--popover-foreground)',
          }}
        />
        <Area
          type="monotone"
          dataKey="temperature"
          name="Temp (°C)"
          stroke="var(--chart-1)"
          strokeWidth={2.5}
          fill="url(#tempGrad)"
        />
      </AreaChart>
    </ChartFrame>
  )
}

export function RegionBarChart() {
  return (
    <ChartFrame
      title="Average Temperature by Region"
      caption="The Bay of Bengal records the warmest surface waters; the Southern Ocean the coldest."
    >
      <BarChart data={regionTemperatures} margin={{ left: -12, right: 8, top: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="region"
          tick={{ ...axisStyle, fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          interval={0}
        />
        <YAxis tick={axisStyle} tickLine={false} axisLine={false} unit="°" />
        <Tooltip
          cursor={{ fill: 'var(--muted)' }}
          contentStyle={{
            background: 'var(--popover)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            fontSize: 12,
            color: 'var(--popover-foreground)',
          }}
        />
        <Bar
          dataKey="temperature"
          name="Temp (°C)"
          fill="var(--chart-1)"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ChartFrame>
  )
}

export function FloatList() {
  const nearby = argoFloats.filter((f) => f.region === 'Arabian Sea')
  return (
    <div className="mt-3 rounded-xl border border-border bg-background/60 p-4">
      <p className="mb-3 text-sm font-medium">
        ARGO floats near the Arabian Sea
      </p>
      <div className="flex flex-col gap-2">
        {nearby.map((float) => (
          <div
            key={float.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5"
          >
            <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
              <MapPin className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Float {float.id}</p>
              <p className="text-xs text-muted-foreground">
                {float.location} · {float.latitude.toFixed(2)}°,{' '}
                {float.longitude.toFixed(2)}°
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{float.temperature}°C</p>
              <p className="text-xs text-muted-foreground">
                {float.salinity} PSU
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export type VisualKind = 'depth' | 'trend' | 'region' | 'floats' | null

export function MessageVisual({ kind }: { kind: VisualKind }) {
  if (kind === 'depth') return <DepthProfileChart />
  if (kind === 'trend') return <TrendChart />
  if (kind === 'region') return <RegionBarChart />
  if (kind === 'floats') return <FloatList />
  return null
}
