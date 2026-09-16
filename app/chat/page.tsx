'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUp, Plus, Sparkles, Waves } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { MessageVisual, type VisualKind } from '@/components/chat/message-visuals'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { recentConversations, suggestedQuestions } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  visual?: VisualKind
  pending?: boolean
}

function resolveResponse(query: string): { content: string; visual: VisualKind } {
  const q = query.toLowerCase()
  if (q.includes('depth') || q.includes('salinity') || q.includes('profile')) {
    return {
      content:
        'Here is the vertical profile of temperature and salinity averaged across active floats. Notice the strong thermocline where temperature falls rapidly between 100m and 400m, while salinity peaks around the subsurface layer.',
      visual: 'depth',
    }
  }
  if (q.includes('trend') || q.includes('year') || q.includes('warming')) {
    return {
      content:
        'Sea surface temperature has shown a clear warming signal over the past five years, rising roughly 1.6°C. This exceeds the long-term basin average and aligns with observed marine heatwave frequency.',
      visual: 'trend',
    }
  }
  if (
    q.includes('region') ||
    q.includes('highest') ||
    q.includes('compare') ||
    q.includes('distribution') ||
    q.includes('indian ocean')
  ) {
    return {
      content:
        'Comparing average surface temperature across basins, the Bay of Bengal is the warmest at ~29.6°C, followed by the Arabian Sea. The Southern Ocean remains the coldest by a wide margin.',
      visual: 'region',
    }
  }
  if (q.includes('float') || q.includes('near') || q.includes('arabian')) {
    return {
      content:
        'I found several active ARGO floats operating in the Arabian Sea. Each is reporting recent temperature and salinity measurements from its latest profiling cycle.',
      visual: 'floats',
    }
  }
  return {
    content:
      'Based on the ARGO float network, I can help you explore temperature, salinity, and depth profiles across ocean basins. Try asking about depth profiles, regional comparisons, multi-year trends, or nearby floats.',
    visual: null,
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  function send(query: string) {
    const text = query.trim()
    if (!text) return
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
    }
    const pendingMsg: Message = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: '',
      pending: true,
    }
    setMessages((prev) => [...prev, userMsg, pendingMsg])
    setInput('')

    setTimeout(() => {
      const { content, visual } = resolveResponse(text)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === pendingMsg.id
            ? { ...m, content, visual, pending: false }
            : m,
        ),
      )
    }, 700)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing &&
      event.keyCode !== 229
    ) {
      event.preventDefault()
      send(input)
    }
  }

  const empty = messages.length === 0

  return (
    <AppShell
      title="Chat"
      description="Ask the ocean anything — powered by ARGO float data"
      actions={
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMessages([])}
          className="gap-1.5"
        >
          <Plus className="size-4" />
          New chat
        </Button>
      }
    >
      <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-6xl gap-6 px-4 py-6 sm:px-6">
        {/* Conversation column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div ref={scrollRef} className="flex-1 overflow-y-auto">
            {empty ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-chart-4 text-primary-foreground shadow-lg shadow-primary/20 animate-float-drift">
                  <Waves className="size-7" />
                </div>
                <h2 className="mt-5 text-balance text-2xl font-bold tracking-tight">
                  Explore the ocean, simply ask
                </h2>
                <p className="mt-2 max-w-md text-pretty text-sm text-muted-foreground">
                  Query millions of ARGO float observations in plain language.
                  Try one of these to get started:
                </p>
                <div className="mt-6 flex max-w-xl flex-wrap justify-center gap-2">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => send(question)}
                      className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6 pb-4">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="mt-4 rounded-2xl border border-border bg-card p-2 shadow-lg shadow-primary/5">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask about temperature, salinity, floats, or trends…"
                className="max-h-32 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button
                size="icon"
                onClick={() => send(input)}
                disabled={!input.trim()}
                aria-label="Send message"
                className="mb-0.5"
              >
                <ArrowUp className="size-4" />
              </Button>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            FloatChat can make mistakes. Verify critical measurements against
            source data.
          </p>
        </div>

        {/* Recent conversations */}
        <aside className="hidden w-64 shrink-0 flex-col xl:flex">
          <div className="flex items-center gap-2 px-1 pb-3">
            <Sparkles className="size-4 text-primary" />
            <p className="text-sm font-medium">Recent conversations</p>
          </div>
          <div className="flex flex-col gap-1">
            {recentConversations.map((conversation) => (
              <button
                key={conversation.id}
                className="rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-card"
              >
                <p className="truncate text-sm font-medium">
                  {conversation.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {conversation.time}
                </p>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </AppShell>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  return (
    <div className={cn('flex gap-3', isUser && 'flex-row-reverse')}>
      <Avatar
        className={cn(
          'size-8 shrink-0',
          isUser
            ? 'bg-secondary text-secondary-foreground'
            : 'bg-gradient-to-br from-primary to-chart-4 text-primary-foreground',
        )}
      >
        {isUser ? 'AL' : <Waves className="size-4" />}
      </Avatar>
      <div className={cn('min-w-0 max-w-[85%]', isUser && 'flex flex-col items-end')}>
        {!isUser && (
          <div className="mb-1 flex items-center gap-2">
            <span className="text-sm font-medium">FloatChat</span>
            <Badge variant="secondary" className="text-[10px]">
              AI
            </Badge>
          </div>
        )}
        <div
          className={cn(
            'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-card-foreground',
          )}
        >
          {message.pending ? (
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-current" />
            </span>
          ) : (
            message.content
          )}
        </div>
        {!isUser && !message.pending && message.visual && (
          <div className="w-full max-w-md">
            <MessageVisual kind={message.visual} />
          </div>
        )}
      </div>
    </div>
  )
}
