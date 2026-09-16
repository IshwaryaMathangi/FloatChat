'use client'

import { useMemo, useState } from 'react'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  BatteryMedium,
  Gauge,
  MapPin,
  Search,
  Thermometer,
  Waves,
  X,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  argoFloats,
  depthProfile,
  regions,
  type ArgoFloat,
  type FloatStatus,
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const statusVariant: Record<FloatStatus, 'success' | 'warning' | 'secondary'> = {
  active: 'success',
  maintenance: 'warning',
  inactive: 'secondary',
}

export default function FloatsPage() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All regions')
  const [selected, setSelected] = useState<ArgoFloat | null>(null)

  const filtered = useMemo(() => {
    return argoFloats.filter((float) => {
      const matchesRegion = region === 'All regions' || float.region === region
      const matchesQuery =
        query === '' ||
        float.id.includes(query) ||
        float.location.toLowerCase().includes(query.toLowerCase()) ||
        float.region.toLowerCase().includes(query.toLowerCase())
      return matchesRegion && matchesQuery
    })
  }, [query, region])

  return (
    <AppShell
      title="ARGO Float Explorer"
      description="Browse, filter, and inspect autonomous profiling floats"
    >
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by float ID, location, or region…"
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                  region === r
                    ? 'border-primary bg-primary/15 text-primary'
                    : 'border-border text-muted-foreground hover:text-foreground',
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filtered.length}</span>{' '}
          of {argoFloats.length} floats
        </p>

        {/* Table */}
        <Card className="mt-3 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Float ID</th>
                  <th className="px-5 py-3 font-medium">Region</th>
                  <th className="hidden px-5 py-3 font-medium md:table-cell">
                    Coordinates
                  </th>
                  <th className="px-5 py-3 font-medium">Temp</th>
                  <th className="hidden px-5 py-3 font-medium sm:table-cell">
                    Salinity
                  </th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((float) => (
                  <tr
                    key={float.id}
                    onClick={() => setSelected(float)}
                    className="cursor-pointer border-b border-border/60 transition-colors last:border-0 hover:bg-muted/50"
                  >
                    <td className="px-5 py-3 font-medium">{float.id}</td>
                    <td className="px-5 py-3">
                      <span className="text-muted-foreground">{float.region}</span>
                    </td>
                    <td className="hidden px-5 py-3 font-mono text-xs text-muted-foreground md:table-cell">
                      {float.latitude.toFixed(2)}°, {float.longitude.toFixed(2)}°
                    </td>
                    <td className="px-5 py-3">{float.temperature}°C</td>
                    <td className="hidden px-5 py-3 sm:table-cell">
                      {float.salinity} PSU
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={statusVariant[float.status]}>
                        {float.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-sm text-muted-foreground"
                    >
                      No floats match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Detail drawer */}
      {selected && (
        <FloatDetail float={selected} onClose={() => setSelected(null)} />
      )}
    </AppShell>
  )
}

function FloatDetail({
  float,
  onClose,
}: {
  float: ArgoFloat
  onClose: () => void
}) {
  const stats = [
    { icon: Thermometer, label: 'Temperature', value: `${float.temperature}°C` },
    { icon: Waves, label: 'Salinity', value: `${float.salinity} PSU` },
    { icon: Gauge, label: 'Max Depth', value: `${float.depth} m` },
    { icon: BatteryMedium, label: 'Battery', value: `${float.battery}%` },
  ]

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close details"
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-xs text-muted-foreground">ARGO Float</p>
            <h2 className="text-lg font-semibold">{float.id}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex items-center gap-2">
            <Badge variant={statusVariant[float.status]}>{float.status}</Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-3.5" />
              {float.location}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-background/60 p-4"
              >
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <stat.icon className="size-4" />
                  <span className="text-xs">{stat.label}</span>
                </div>
                <p className="mt-1.5 text-xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>

          <Separator className="my-5" />

          <p className="mb-3 text-sm font-medium">Depth Profile</p>
          <div className="h-52 rounded-xl border border-border bg-background/60 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={depthProfile} margin={{ left: -14, right: 6, top: 6 }}>
                <XAxis
                  dataKey="depth"
                  tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                  tickLine={false}
                  axisLine={false}
                  unit="m"
                />
                <YAxis
                  tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
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
                <Line
                  type="monotone"
                  dataKey="temperature"
                  name="Temp (°C)"
                  stroke="var(--chart-1)"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <Separator className="my-5" />

          <dl className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Region</dt>
              <dd className="font-medium">{float.region}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Coordinates</dt>
              <dd className="font-mono">
                {float.latitude.toFixed(2)}°, {float.longitude.toFixed(2)}°
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Last observation</dt>
              <dd className="font-medium">{float.date}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Profiling cycles</dt>
              <dd className="font-medium">{float.cycles}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
