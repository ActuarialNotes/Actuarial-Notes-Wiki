import { useEffect } from 'react'
import { BookOpen, HelpCircle, X } from 'lucide-react'

interface Props {
  conceptName: string
  onBrowseQuestions: () => void
  onReadConcept: () => void
  onClose: () => void
}

export function ConceptSelectorPopup({ conceptName, onBrowseQuestions, onReadConcept, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Options for ${conceptName}`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-card border rounded-xl shadow-2xl w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold min-w-0 truncate" title={conceptName}>
            {conceptName}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 shrink-0 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onBrowseQuestions}
            className="flex flex-col items-center gap-2 p-5 rounded-lg border hover:bg-accent transition-colors text-sm font-medium"
          >
            <HelpCircle className="h-6 w-6 text-primary" />
            Browse Questions
          </button>
          <button
            type="button"
            onClick={onReadConcept}
            className="flex flex-col items-center gap-2 p-5 rounded-lg border hover:bg-accent transition-colors text-sm font-medium"
          >
            <BookOpen className="h-6 w-6 text-primary" />
            Read Concept
          </button>
        </div>
      </div>
    </div>
  )
}
