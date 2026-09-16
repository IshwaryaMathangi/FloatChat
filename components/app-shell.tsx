'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  BarChart3,
  Bookmark,
  Compass,
  History,
  LayoutDashboard,
  MessageSquare,
  Menu,
  X,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/floats', label: 'Float Explorer', icon: Compass },
  { href: '/visualize', label: 'Visualize', icon: BarChart3 },
  { href: '/insights', label: 'Saved Insights', icon: Bookmark },
  { href: '/history', label: 'History', icon: History },
]

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5">
        <Link href="/" onClick={onNavigate}>
          <Logo />
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground',
              )}
            >
              <item.icon className="size-4" />
              {item.label}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <Avatar className="bg-gradient-to-br from-primary to-chart-4 text-primary-foreground">
            AL
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Ada Lovelace</p>
            <p className="truncate text-xs text-muted-foreground">
              Marine Research
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AppShell({
  children,
  title,
  description,
  actions,
}: {
  children: React.ReactNode
  title: string
  description?: string
  actions?: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sidebar-border bg-sidebar lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64 border-r border-sidebar-border bg-sidebar">
            <button
              aria-label="Close menu"
              className="absolute right-3 top-4 text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              <X className="size-5" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border glass px-4 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="truncate text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {actions}
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
