'use client'

import { useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Activity,
  BarChart3,
  Download,
  LineChart as LineIcon,
  ScatterChart as ScatterIcon,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  argoFloats,
  depthProfile,
  regions,
  regionTemperatures,
  temperatureTrend,
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

type ChartType = 'line' | 'area' | 'bar' | 'scatter'
type Variable = 'temperature' | 'salinity'

const chartTypes: { id: ChartType; label: string; icon: typeof LineIcon }[] = [
  { id: 'line', label: 'Line', icon: LineIcon },
  { id: 'area', label: 'Area', icon: Activity },
  { id: 'bar', label: 'Bar', icon: BarChart3 },
  { id: 'scatter', label: 'Scatter', icon: ScatterIcon },
]

const axisStyle = { fontSize: 11, fill: 'var(--muted-foreground)' }
const tooltipStyle = {
  background: 'var(--popover)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  fontSize: 12,
  color: 'var(--popover-foreground)',
}
const pieColors = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
]

export default function VisualizePage() {
  const [chartType, setChartType] = useState<ChartType>('line')
  const [variable, setVariable] = useState<Variable>('temperature')
  const [region, setRegion] = useState('All regions')

  const stroke = variable === 'temperature' ? 'var(--chart-1)' : 'var(--chart-4)'
  const scatterData = argoFloats.map((f) => ({
    x: f.depth,
    y: f[variable],
    id: f.id,
  }))

  return (
    <AppShell
      title="Visualization Workspace"
      description="Compose custom charts from ARGO measurements"
      actions={
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="size-4" />
          Export chart
        </Button>
      }
    >
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Controls */}
          <div className="flex flex-col gap-5">
            <Card>
              <CardContent className="p-5">
                <p className="text-sm font-medium">Chart type</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {chartTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setChartType(type.id)}
                      className={cn(
                        'flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3 text-xs font-medium transition-colors',
                        chartType === type.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground hover:text-foreground',
                      )}
                    >
                      <type.icon className="size-4" />
                      {type.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <p className="text-sm font-medium">Variable</p>
                <div className="mt-3 flex flex-col gap-2">
                  {(['temperature', 'salinity'] as Variable[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => setVariable(v)}
                      className={cn(
                        'flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm capitalize transition-colors',
                        variable === v
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {v}
                      {variable === v && (
                        <span className="size-2 rounded-full bg-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <p className="text-sm font-medium">Region</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {regions.map((r) => (
                    <button
                      key={r}
                      onClick={() => setRegion(r)}
                      className={cn(
                        'rounded-full border px-2.5 py-1 text-xs transition-colors',
                        region === r
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart canvas */}
          <Card>
            <CardContent className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold capitalize">
                    {variable} visualization
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {region} · {chartType} chart
                  </p>
                </div>
                <Badge variant="secondary">{argoFloats.length} floats</Badge>
              </div>

              <div className="h-[420px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'line' ? (
                    <LineChart data={depthProfile} margin={{ left: -6, right: 8, top: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="depth" tick={axisStyle} tickLine={false} axisLine={false} unit="m" />
                      <YAxis tick={axisStyle} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Line type="monotone" dataKey={variable} stroke={stroke} strokeWidth={2.5} dot={{ r: 3 }} />
                    </LineChart>
                  ) : chartType === 'area' ? (
                    <AreaChart data={temperatureTrend} margin={{ left: -6, right: 8, top: 8 }}>
                      <defs>
                        <linearGradient id="vizGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={stroke} stopOpacity={0.5} />
                          <stop offset="100%" stopColor={stroke} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="year" tick={axisStyle} tickLine={false} axisLine={false} />
                      <YAxis tick={axisStyle} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Area type="monotone" dataKey={variable} stroke={stroke} strokeWidth={2.5} fill="url(#vizGrad)" />
                    </AreaChart>
                  ) : chartType === 'bar' ? (
                    <BarChart data={regionTemperatures} margin={{ left: -6, right: 8, top: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="region" tick={{ ...axisStyle, fontSize: 10 }} tickLine={false} axisLine={false} interval={0} />
                      <YAxis tick={axisStyle} tickLine={false} axisLine={false} />
                      <Tooltip cursor={{ fill: 'var(--muted)' }} contentStyle={tooltipStyle} />
                      <Bar dataKey="temperature" radius={[6, 6, 0, 0]}>
                        {regionTemperatures.map((entry, index) => (
                          <Cell key={entry.region} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  ) : (
                    <ScatterChart margin={{ left: -6, right: 8, top: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis type="number" dataKey="x" name="Depth" unit="m" tick={axisStyle} tickLine={false} axisLine={false} />
                      <YAxis type="number" dataKey="y" name={variable} tick={axisStyle} tickLine={false} axisLine={false} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={tooltipStyle} />
                      <Scatter data={scatterData} fill={stroke} />
                    </ScatterChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
