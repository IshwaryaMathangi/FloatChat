export type FloatStatus = 'active' | 'inactive' | 'maintenance'

export type ArgoFloat = {
  id: string
  region: string
  location: string
  latitude: number
  longitude: number
  date: string
  temperature: number
  salinity: number
  depth: number
  status: FloatStatus
  cycles: number
  battery: number
}

export const argoFloats: ArgoFloat[] = [
  { id: '2902746', region: 'Arabian Sea', location: 'W of Mumbai', latitude: 18.42, longitude: 68.15, date: '2026-09-08', temperature: 28.4, salinity: 36.2, depth: 1985, status: 'active', cycles: 214, battery: 82 },
  { id: '2902811', region: 'Bay of Bengal', location: 'SE of Chennai', latitude: 12.11, longitude: 84.63, date: '2026-09-09', temperature: 29.1, salinity: 33.8, depth: 2010, status: 'active', cycles: 189, battery: 74 },
  { id: '2903155', region: 'Indian Ocean', location: 'Equatorial', latitude: -1.24, longitude: 78.9, date: '2026-09-07', temperature: 27.8, salinity: 34.9, depth: 1950, status: 'active', cycles: 302, battery: 65 },
  { id: '2903402', region: 'Arabian Sea', location: 'Off Oman', latitude: 20.05, longitude: 60.32, date: '2026-09-06', temperature: 26.5, salinity: 36.7, depth: 2000, status: 'maintenance', cycles: 401, battery: 38 },
  { id: '2903619', region: 'Southern Ocean', location: 'S of Madagascar', latitude: -34.7, longitude: 45.2, date: '2026-09-05', temperature: 14.2, salinity: 35.1, depth: 1900, status: 'active', cycles: 156, battery: 91 },
  { id: '2904021', region: 'Bay of Bengal', location: 'Off Kolkata', latitude: 15.88, longitude: 88.41, date: '2026-09-09', temperature: 29.6, salinity: 32.4, depth: 1780, status: 'active', cycles: 98, battery: 88 },
  { id: '2904288', region: 'Indian Ocean', location: 'Central Basin', latitude: -8.5, longitude: 72.1, date: '2026-09-04', temperature: 25.9, salinity: 35.3, depth: 2015, status: 'inactive', cycles: 512, battery: 12 },
  { id: '2904517', region: 'Arabian Sea', location: 'Laccadive Sea', latitude: 10.33, longitude: 72.88, date: '2026-09-08', temperature: 28.9, salinity: 36.0, depth: 1995, status: 'active', cycles: 167, battery: 79 },
  { id: '2905033', region: 'Southern Ocean', location: 'SW Indian Ridge', latitude: -42.1, longitude: 38.6, date: '2026-09-03', temperature: 11.6, salinity: 34.8, depth: 1850, status: 'active', cycles: 233, battery: 58 },
  { id: '2905290', region: 'Bay of Bengal', location: 'Andaman Sea', latitude: 10.75, longitude: 93.2, date: '2026-09-07', temperature: 30.1, salinity: 32.9, depth: 1720, status: 'active', cycles: 121, battery: 84 },
  { id: '2905744', region: 'Indian Ocean', location: 'Mid-Ocean Ridge', latitude: -15.4, longitude: 66.7, date: '2026-09-02', temperature: 24.3, salinity: 35.5, depth: 2020, status: 'maintenance', cycles: 388, battery: 41 },
  { id: '2906101', region: 'Arabian Sea', location: 'Gulf of Aden', latitude: 13.2, longitude: 48.9, date: '2026-09-06', temperature: 27.2, salinity: 37.1, depth: 1960, status: 'active', cycles: 205, battery: 70 },
]

export type DepthProfilePoint = {
  depth: number
  temperature: number
  salinity: number
}

export const depthProfile: DepthProfilePoint[] = [
  { depth: 0, temperature: 29.2, salinity: 34.1 },
  { depth: 50, temperature: 28.6, salinity: 34.6 },
  { depth: 100, temperature: 26.1, salinity: 35.2 },
  { depth: 200, temperature: 20.4, salinity: 35.6 },
  { depth: 400, temperature: 14.8, salinity: 35.4 },
  { depth: 600, temperature: 10.9, salinity: 35.1 },
  { depth: 800, temperature: 8.2, salinity: 34.9 },
  { depth: 1000, temperature: 6.4, salinity: 34.8 },
  { depth: 1500, temperature: 4.1, salinity: 34.7 },
  { depth: 2000, temperature: 2.3, salinity: 34.7 },
]

export type TrendPoint = {
  year: string
  temperature: number
  salinity: number
}

export const temperatureTrend: TrendPoint[] = [
  { year: '2021', temperature: 26.8, salinity: 35.0 },
  { year: '2022', temperature: 27.1, salinity: 35.1 },
  { year: '2023', temperature: 27.0, salinity: 35.2 },
  { year: '2024', temperature: 27.6, salinity: 35.1 },
  { year: '2025', temperature: 27.9, salinity: 35.3 },
  { year: '2026', temperature: 28.4, salinity: 35.2 },
]

export type TimelinePoint = {
  month: string
  observations: number
}

export const observationTimeline: TimelinePoint[] = [
  { month: 'Apr', observations: 1240 },
  { month: 'May', observations: 1580 },
  { month: 'Jun', observations: 1890 },
  { month: 'Jul', observations: 2110 },
  { month: 'Aug', observations: 2460 },
  { month: 'Sep', observations: 2730 },
]

export type RegionTemp = {
  region: string
  temperature: number
}

export const regionTemperatures: RegionTemp[] = [
  { region: 'Bay of Bengal', temperature: 29.6 },
  { region: 'Arabian Sea', temperature: 28.4 },
  { region: 'Indian Ocean', temperature: 25.9 },
  { region: 'Southern Ocean', temperature: 13.2 },
]

export type Metric = {
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'flat'
}

export const dashboardMetrics: Metric[] = [
  { label: 'Active ARGO Floats', value: '3,842', change: '+124 this month', trend: 'up' },
  { label: 'Data Points', value: '18.4M', change: '+2.1M this month', trend: 'up' },
  { label: 'Regions Covered', value: '27', change: '+3 new basins', trend: 'up' },
  { label: 'Latest Observation', value: '4m ago', change: 'Bay of Bengal', trend: 'flat' },
]

export type Conversation = {
  id: string
  title: string
  time: string
}

export const recentConversations: Conversation[] = [
  { id: 'c1', title: 'Temperature distribution — Indian Ocean', time: '2m ago' },
  { id: 'c2', title: 'ARGO floats near Arabian Sea', time: '1h ago' },
  { id: 'c3', title: 'Salinity comparison by depth', time: 'Yesterday' },
  { id: 'c4', title: '5-year temperature trends', time: '2d ago' },
  { id: 'c5', title: 'Highest ocean temperature regions', time: '4d ago' },
]

export const suggestedQuestions: string[] = [
  'Show temperature distribution in the Indian Ocean',
  'Find ARGO floats near the Arabian Sea',
  'Compare salinity at different depths',
  'Show temperature trends over the last 5 years',
  'Which regions have the highest ocean temperature?',
]

export type SavedInsight = {
  id: string
  title: string
  summary: string
  region: string
  confidence: number
  date: string
  tags: string[]
}

export const savedInsights: SavedInsight[] = [
  {
    id: 'i1',
    title: 'Thermocline deepening in Arabian Sea',
    summary:
      'The selected region shows a gradual increase in temperature between 50m and 150m depth, indicating a deepening thermocline over the monsoon season.',
    region: 'Arabian Sea',
    confidence: 92,
    date: '2026-09-08',
    tags: ['temperature', 'thermocline', 'monsoon'],
  },
  {
    id: 'i2',
    title: 'Surface freshening in Bay of Bengal',
    summary:
      'Salinity in the upper 100m has decreased by 0.8 PSU compared to the seasonal average, consistent with elevated river discharge.',
    region: 'Bay of Bengal',
    confidence: 87,
    date: '2026-09-07',
    tags: ['salinity', 'freshwater'],
  },
  {
    id: 'i3',
    title: 'Warming trend in equatorial Indian Ocean',
    summary:
      'Sea surface temperature has risen 1.6°C over 5 years across equatorial float clusters, exceeding the basin-wide mean.',
    region: 'Indian Ocean',
    confidence: 81,
    date: '2026-09-05',
    tags: ['trend', 'warming', 'sst'],
  },
]

export type HistoryEntry = {
  id: string
  query: string
  type: 'chat' | 'visualization' | 'export'
  time: string
  region: string
}

export const historyEntries: HistoryEntry[] = [
  { id: 'h1', query: 'Show temperature distribution in the Indian Ocean', type: 'chat', time: 'Today, 10:42', region: 'Indian Ocean' },
  { id: 'h2', query: 'Temperature vs depth profile for float 2902746', type: 'visualization', time: 'Today, 09:18', region: 'Arabian Sea' },
  { id: 'h3', query: 'Export salinity dataset — Bay of Bengal', type: 'export', time: 'Yesterday, 16:05', region: 'Bay of Bengal' },
  { id: 'h4', query: 'Compare salinity at 200m vs 1000m', type: 'chat', time: 'Yesterday, 14:30', region: 'Indian Ocean' },
  { id: 'h5', query: 'Historical warming trend 2021–2026', type: 'visualization', time: '2 days ago', region: 'Southern Ocean' },
  { id: 'h6', query: 'Find inactive floats needing maintenance', type: 'chat', time: '3 days ago', region: 'All regions' },
]

export const regions = [
  'All regions',
  'Arabian Sea',
  'Bay of Bengal',
  'Indian Ocean',
  'Southern Ocean',
]
