import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ChevronLeft, ChevronRight, Loader2, Trash2, X } from 'lucide-react'
import { useFlashcards } from '@/hooks/useFlashcards'
import { fetchWikiFile } from '@/lib/github'
import { entryRefToRepoPath } from '@/lib/wikiRoutes'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { WikiArticle } from '@/components/wiki/WikiArticle'

function extractFirstBullet(markdown: string): string {
  const match = markdown.match(/^[-*]\s+(.+)/m)
  if (match) return match[1]
  return (
    markdown.split('\n').find(l => {
      const t = l.trim()
      return t && !t.startsWith('#')
    })?.trim() ?? ''
  )
}

function FlashcardStudy({
  cards,
  onDone,
}: {
  cards: WikiEntryRef[]
  onDone: () => void
}) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [loadStatus, setLoadStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  const current = cards[index]

  useEffect(() => {
    setFlipped(false)
    setExpanded(false)
    setMarkdown(null)
    setLoadStatus('idle')
  }, [index])

  function handleFlip() {
    if (!flipped) {
      setFlipped(true)
      if (markdown === null && loadStatus === 'idle') {
        setLoadStatus('loading')
        fetchWikiFile(entryRefToRepoPath(current))
          .then(raw => { setMarkdown(raw); setLoadStatus('idle') })
          .catch(() => setLoadStatus('error'))
      }
    } else {
      setFlipped(false)
      setExpanded(false)
    }
  }

  const definition = markdown ? extractFirstBullet(markdown) : null

  return (
    <div className="flex flex-col items-center min-h-screen bg-background px-4 py-8">
      {/* Top bar */}
      <div className="w-full max-w-xl flex items-center justify-between mb-8">
        <span className="text-sm text-muted-foreground">
          {index + 1} / {cards.length}
        </span>
        <button
          type="button"
          onClick={onDone}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" /> Done
        </button>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-xl min-h-56 rounded-2xl border bg-card text-card-foreground shadow-xl flex flex-col cursor-pointer select-none transition-all"
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        aria-label={flipped ? 'Click to flip back' : 'Click to reveal definition'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip() } }}
      >
        {!flipped ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 gap-3">
            <span className="text-3xl font-bold text-center leading-tight">{current.name}</span>
            <span className="text-xs text-muted-foreground mt-2">click to flip</span>
          </div>
        ) : (
          <div className="flex-1 flex flex-col p-6 gap-4" onClick={e => e.stopPropagation()}>
            <p className="text-sm font-medium text-muted-foreground">{current.name}</p>
            {loadStatus === 'loading' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading…
              </div>
            )}
            {loadStatus === 'error' && (
              <p className="text-sm text-destructive">Couldn't load content.</p>
            )}
            {definition && (
              <p className="text-base leading-relaxed">{definition}</p>
            )}

            {!expanded && markdown && (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="self-start text-xs text-primary hover:underline mt-1"
              >
                Expand
              </button>
            )}

            {expanded && markdown && (
              <div className="border-t pt-4 overflow-y-auto max-h-96">
                <WikiArticle markdown={markdown} sourcePath={entryRefToRepoPath(current)} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="flex items-center gap-6 mt-8">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setIndex(i => i - 1)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>
        <button
          type="button"
          disabled={index === cards.length - 1}
          onClick={() => setIndex(i => i + 1)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default function Flashcards() {
  const { cards, removeCard } = useFlashcards()
  const [studying, setStudying] = useState(false)

  if (studying && cards.length > 0) {
    return <FlashcardStudy cards={cards} onDone={() => setStudying(false)} />
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Flashcards</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {cards.length === 0
              ? 'No flashcards yet.'
              : `${cards.length} concept${cards.length === 1 ? '' : 's'} saved`}
          </p>
        </div>
        <button
          type="button"
          disabled={cards.length === 0}
          onClick={() => setStudying(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Study
        </button>
      </div>

      {cards.length === 0 ? (
        <div className="rounded-xl border bg-card text-card-foreground p-12 text-center space-y-3">
          <BookOpen className="h-10 w-10 mx-auto text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            Open a concept in the Study Guide, click the{' '}
            <span className="font-medium">▷ Play</span> button, and choose{' '}
            <span className="font-medium">Add to Flashcards</span>.
          </p>
          <Link
            to="/wiki"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <BookOpen className="h-4 w-4" /> Go to Study Guides
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map(card => (
            <div
              key={card.name}
              className="group relative rounded-xl border bg-card text-card-foreground p-5 flex items-center justify-between gap-3 hover:shadow-md transition-shadow"
            >
              <span className="font-medium text-sm leading-snug flex-1 min-w-0 truncate">
                {card.name}
              </span>
              <button
                type="button"
                onClick={() => removeCard(card.name)}
                aria-label={`Remove ${card.name}`}
                className="shrink-0 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
