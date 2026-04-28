import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, ChevronLeft, ChevronRight, GripHorizontal, Loader2, Maximize2, Minimize2, X } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { entryRefToRepoPath, type WikiEntryRef } from '@/lib/wikiRoutes'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useSplitHeight } from '@/hooks/useSplitHeight'
import { WikiArticle } from '@/components/wiki/WikiArticle'

export function ConceptPopup() {
  const { open, list, index, navigate, jumpTo, close } = useConceptPopup()
  const current: WikiEntryRef | undefined = list[index]
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const { height, beginDrag } = useSplitHeight()
  const routerNavigate = useNavigate()
  const [maximized, setMaximized] = useState(false)

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

  // Keyboard: Esc closes, arrows navigate. Scoped to the popup so typing in
  // the sidebar search input still works.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') navigate(-1)
      else if (e.key === 'ArrowRight') navigate(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close, navigate])

  // Publish the pane's height to the layout so it can reserve space below
  // the main column. Cleaned up on close.
  useEffect(() => {
    const root = document.documentElement
    if (open) {
      root.style.setProperty('--concept-split-height', `${height}px`)
      root.dataset.conceptSplitOpen = 'true'
    } else {
      root.style.removeProperty('--concept-split-height')
      delete root.dataset.conceptSplitOpen
    }
    return () => {
      root.style.removeProperty('--concept-split-height')
      delete root.dataset.conceptSplitOpen
    }
  }, [open, height])

  if (!open || !current) return null

  const canPrev = index > 0
  const canNext = index < list.length - 1
  const position = `${index + 1} of ${list.length}`
  const sourcePath = current ? entryRefToRepoPath(current) : undefined

  return (
    <aside
      className="fixed left-0 right-0 lg:left-72 bottom-0 z-40 border-t bg-card text-card-foreground shadow-2xl flex flex-col"
      style={{ height: maximized ? '100vh' : `min(${height}px, 100vh)` }}
      role="complementary"
      aria-label={`Concept: ${current.name}`}
    >
      {/* Drag handle — hidden on mobile where the pane goes full-width */}
      <div
        role="separator"
        aria-orientation="horizontal"
        aria-label="Resize concept panel"
        onMouseDown={e => {
          e.preventDefault()
          beginDrag(e.clientY)
        }}
        onTouchStart={e => {
          if (e.touches[0]) beginDrag(e.touches[0].clientY)
        }}
        className="hidden sm:flex h-3 items-center justify-center cursor-row-resize hover:bg-accent/60 transition-colors select-none"
      >
        <GripHorizontal className="h-3 w-6 text-muted-foreground/60" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 px-4 h-11 border-b shrink-0">
        <span className="flex-1 truncate font-semibold text-sm">{current.name}</span>
        <button
          type="button"
          onClick={() => setMaximized(v => !v)}
          className="text-muted-foreground hover:text-foreground p-1"
          title={maximized ? 'Restore size' : 'Maximize'}
          aria-label={maximized ? 'Restore size' : 'Maximize'}
        >
          {maximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={() => {
            routerNavigate('/browse?concept=' + encodeURIComponent(current.name))
            close()
          }}
          className="text-muted-foreground hover:text-foreground p-1"
          title="Browse questions for this concept"
          aria-label="Browse questions for this concept"
        >
          <BookOpen className="h-4 w-4" />
        </button>
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

      {/* Body — only this scrolls; wheel events don't propagate to the page
          behind because the pane isn't transparent and covers the bottom. */}
      <div
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4"
      >
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
            sourcePath={sourcePath}
            onWikiLink={ref => {
              // Stay inside the popup: swap the body instead of navigating.
              jumpTo(ref)
              return true
            }}
          />
        )}
      </div>

      {/* Footer nav */}
      <div className="flex items-center border-t h-10 px-2 shrink-0 bg-background/60">
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
    </aside>
  )
}
