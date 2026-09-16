'use client'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  argoFloats,
  depthProfile,
  observationTimeline,
  regionTemperatures,
} from '@/lib/mock-data'

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

export function ObservationsChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={observationTimeline} margin={{ left: -10, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="obsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.5} />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" tick={axisStyle} tickLine={false} axisLine={false} />
        <YAxis tick={axisStyle} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area
          type="monotone"
          dataKey="observations"
          name="Observations"
          stroke="var(--chart-1)"
          strokeWidth={2.5}
          fill="url(#obsGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function DepthChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={depthProfile} margin={{ left: -10, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="depth" tick={axisStyle} tickLine={false} axisLine={false} unit="m" />
        <YAxis tick={axisStyle} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
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
    </ResponsiveContainer>
  )
}

export function RegionChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={regionTemperatures} margin={{ left: -10, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="region"
          tick={{ ...axisStyle, fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          interval={0}
        />
        <YAxis tick={axisStyle} tickLine={false} axisLine={false} unit="°" />
        <Tooltip cursor={{ fill: 'var(--muted)' }} contentStyle={tooltipStyle} />
        <Bar dataKey="temperature" name="Temp (°C)" radius={[6, 6, 0, 0]}>
          {regionTemperatures.map((entry, index) => (
            <Cell key={entry.region} fill={pieColors[index % pieColors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function StatusPieChart() {
  const counts = argoFloats.reduce<Record<string, number>>((acc, float) => {
    acc[float.status] = (acc[float.status] ?? 0) + 1
    return acc
  }, {})
  const data = Object.entries(counts).map(([name, value]) => ({ name, value }))

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={3}
          strokeWidth={0}
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  )
}
