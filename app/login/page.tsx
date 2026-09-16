'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight, Lock, Mail } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    router.push('/chat')
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src="/ocean-depth-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-background/20" />
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <Logo textClassName="text-lg" />
          <div className="max-w-md">
            <blockquote className="text-balance text-2xl font-medium leading-snug text-foreground">
              &ldquo;From a single question to a full oceanographic picture — the
              deep ocean, made conversational.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-muted-foreground">
              Intelligent Ocean Exploration · ARGO Float Data
            </p>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center bg-background px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === 'signin'
              ? 'Sign in to continue exploring ocean data.'
              : 'Start exploring ARGO float data in seconds.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            {mode === 'signup' && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium">
                  Full name
                </label>
                <Input id="name" placeholder="Ada Lovelace" required />
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@research.org"
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="mt-2 h-10">
              {mode === 'signin' ? 'Sign in' : 'Create account'}
              <ArrowRight />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === 'signin'
              ? "Don't have an account? "
              : 'Already have an account? '}
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="font-medium text-primary hover:underline"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
