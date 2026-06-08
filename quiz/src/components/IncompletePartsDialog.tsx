import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface IncompletePartsDialogProps {
  onCancel: () => void
  onConfirm: () => void
}

export function IncompletePartsDialog({ onCancel, onConfirm }: IncompletePartsDialogProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-sm rounded-lg border bg-card text-card-foreground shadow-lg p-5 space-y-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="space-y-1">
          <h2 className="text-base font-semibold">Submit without answering every part?</h2>
          <p className="text-sm text-muted-foreground">
            You haven't filled in all parts of this question. Unanswered parts will be marked incorrect.
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onCancel}>
            Keep Answering
          </Button>
          <Button variant="default" size="sm" onClick={onConfirm}>
            Submit Anyway
          </Button>
        </div>
      </div>
    </div>
  )
}
