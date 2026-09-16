import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Compass,
  MessageSquare,
  Play,
  Sparkles,
  Waves,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    icon: MessageSquare,
    title: 'Conversational AI',
    description:
      'Ask questions in plain language and get instant, grounded answers from millions of ARGO float observations.',
  },
  {
    icon: Compass,
    title: 'ARGO Data Discovery',
    description:
      'Locate and filter autonomous floats across every ocean basin by region, depth, and measurement window.',
  },
  {
    icon: BarChart3,
    title: 'Interactive Visualization',
    description:
      'Generate temperature-depth profiles, salinity charts, heatmaps, and trend lines from a single prompt.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Insights',
    description:
      'Surface trends, anomalies, and confidence-scored findings automatically as you explore the data.',
  },
]

const stats = [
  { value: '3,800+', label: 'Active ARGO Floats' },
  { value: '18.4M', label: 'Data Points' },
  { value: '27', label: 'Ocean Regions' },
  { value: '99.9%', label: 'Query Uptime' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 glass">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#preview" className="transition-colors hover:text-foreground">
              Platform
            </a>
            <a href="#stats" className="transition-colors hover:text-foreground">
              Data
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<Link href="/login" />}
            >
              Sign in
            </Button>
            <Button size="sm" nativeButton={false} render={<Link href="/chat" />}>
              Launch app
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-[-10%] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
          </div>
          <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28">
            <Badge variant="outline" className="mx-auto mb-6 backdrop-blur">
              <Waves className="text-primary" />
              Powered by ARGO oceanographic float data
            </Badge>
            <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
              Explore the Ocean.{' '}
              <span className="bg-gradient-to-r from-primary to-chart-4 bg-clip-text text-transparent">
                Simply Ask.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
              An intelligent conversational interface for discovering, analyzing,
              and visualizing ARGO oceanographic data — no query language required.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-11 px-6 text-sm"
                nativeButton={false}
                render={<Link href="/chat" />}
              >
                Start Exploring
                <ArrowRight />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 px-6 text-sm"
                nativeButton={false}
                render={<Link href="/dashboard" />}
              >
                <Play />
                View Demo
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div id="preview" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/5">
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background/40 to-transparent" />
              <Image
                src="/ocean-dashboard-preview.png"
                alt="FloatChat ocean data dashboard preview with float map and depth charts"
                width={1600}
                height={900}
                className="w-full"
                priority
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-border/60 bg-card/30 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                A research-grade platform, driven by conversation
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                FloatChat bridges natural language and rigorous oceanographic
                data, so anyone can move from question to insight in seconds.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section id="stats" className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-6 rounded-2xl border border-border bg-gradient-to-br from-card to-card/40 p-10 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 text-center sm:p-16">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-chart-4/10" />
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to dive into the data?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
                Start a conversation with the ocean. Explore floats, chart
                profiles, and uncover trends in real time.
              </p>
              <Button
                size="lg"
                className="mt-8 h-11 px-6 text-sm"
                nativeButton={false}
                render={<Link href="/chat" />}
              >
                Start Exploring
                <ArrowRight />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <Logo />
          <p>FloatChat — Final-year B.Tech AI/ML Project · ARGO Float Data</p>
        </div>
      </footer>
    </div>
  )
}
