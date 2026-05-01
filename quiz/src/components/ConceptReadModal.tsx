import { useEffect, useState } from 'react'
import { Loader2, X } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { WikiArticle } from '@/components/wiki/WikiArticle'

interface Props {
  conceptName: string
  onClose: () => void
}

export function ConceptReadModal({ conceptName, onClose }: Props) {
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'loading' | 'error' | 'idle'>('loading')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setContent(null)
    fetchWikiFile(`Concepts/${conceptName}.md`)
      .then(raw => {
        if (cancelled) return
        setContent(raw)
        setStatus('idle')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })
    return () => { cancelled = true }
  }, [conceptName])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Read: ${conceptName}`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-2xl bg-card border rounded-xl shadow-2xl flex flex-col my-8">
        <div className="flex items-center gap-3 px-4 h-12 border-b shrink-0">
          <span className="flex-1 truncate font-semibold text-sm">{conceptName}</span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {status === 'loading' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground py-8 justify-center">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading…
            </div>
          )}
          {status === 'error' && (
            <div className="text-center py-8 text-sm text-muted-foreground">
              Couldn't load <span className="font-medium">{conceptName}</span>.
            </div>
          )}
          {content !== null && (
            <WikiArticle
              markdown={content}
              sourcePath={`Concepts/${conceptName}.md`}
            />
          )}
        </div>
      </div>
    </div>
  )
}
