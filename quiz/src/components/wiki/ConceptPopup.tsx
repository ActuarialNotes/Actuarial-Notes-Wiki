import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronLeft, ChevronRight, ExternalLink, Loader2, X } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { entryRefToRepoPath, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useLearnedConcepts } from '@/hooks/useLearnedConcepts'
import { WikiArticle } from '@/components/wiki/WikiArticle'

interface ConceptPopupProps {
  // Exam id used for the learned-concepts store; resolved from the source
  // page (e.g. "p-1"). Learned toggle is hidden when no exam is known.
  examId?: string | null
}

export function ConceptPopup({ examId = null }: ConceptPopupProps) {
  const { open, list, index, navigate, jumpTo, close } = useConceptPopup()
  const current: WikiEntryRef | undefined = list[index]
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const { isLearned, toggle } = useLearnedConcepts(examId)

  // Fetch markdown whenever the active ref changes.
  useEffect(() => {
    if (!open || !current) return
    let cancelled = false
    setStatus('loading')
    setContent(null)
    fetchWikiFile(entryRefToRepoPath(current))
      .then(raw => {
        if (cancelled) return
        setContent(raw)
        setStatus('idle')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [open, current?.kind, current?.name])

  // Keyboard: Esc closes, arrows navigate.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') navigate(-1)
      else if (e.key === 'ArrowRight') navigate(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close, navigate])

  if (!open || !current) return null

  const learned = current.kind === 'concept' && isLearned(current.name)
  const canPrev = index > 0
  const canNext = index < list.length - 1
  const position = `${index + 1} of ${list.length}`
  const fullRoute = wikiRoute(current)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-background/80 backdrop-blur-sm p-0 sm:p-4"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={`Concept: ${current.name}`}
    >
      <div
        className="w-full sm:max-w-3xl h-[85vh] sm:h-[80vh] rounded-t-lg sm:rounded-lg border bg-card text-card-foreground shadow-lg flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 h-12 border-b shrink-0">
          {current.kind === 'concept' && (
            <button
              type="button"
              onClick={() => toggle(current.name)}
              title={learned ? 'Unmark as learned' : 'Mark as learned'}
              aria-pressed={learned}
              className={
                'h-7 w-7 rounded-full border flex items-center justify-center transition-colors ' +
                (learned
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:text-foreground hover:bg-accent/60')
              }
            >
              <Check className="h-4 w-4" />
            </button>
          )}
          <span className="flex-1 truncate font-semibold text-sm">{current.name}</span>
          <Link
            to={fullRoute}
            onClick={close}
            className="text-muted-foreground hover:text-foreground p-1"
            title="Open full page"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={close}
            className="text-muted-foreground hover:text-foreground p-1"
            title="Close"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4">
          {status === 'loading' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading…
            </div>
          )}
          {status === 'error' && (
            <div className="text-sm text-muted-foreground">
              Couldn't load <span className="font-medium">{current.name}</span>.
            </div>
          )}
          {content !== null && (
            <WikiArticle
              markdown={content}
              onWikiLink={ref => {
                // Stay inside the popup: swap the body instead of navigating.
                jumpTo(ref)
                return true
              }}
            />
          )}
        </div>

        {/* Footer nav */}
        <div className="flex items-center border-t h-11 px-2 shrink-0 bg-background/60">
          <button
            type="button"
            disabled={!canPrev}
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md hover:bg-accent/60 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <span className="flex-1 text-center text-xs text-muted-foreground tabular-nums">
            {position}
          </span>
          <button
            type="button"
            disabled={!canNext}
            onClick={() => navigate(1)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md hover:bg-accent/60 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
