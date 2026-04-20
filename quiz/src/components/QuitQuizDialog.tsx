import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface QuitQuizDialogProps {
  mode: 'quiz' | 'mock-exam'
  onCancel: () => void
  onConfirm: () => void
}

export function QuitQuizDialog({ mode, onCancel, onConfirm }: QuitQuizDialogProps) {
  const label = mode === 'mock-exam' ? 'mock exam' : 'quiz'

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
          <h2 className="text-base font-semibold">Quit this {label}?</h2>
          <p className="text-sm text-muted-foreground">
            Your progress in this session will be lost. This can't be undone.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" size="sm" onClick={onConfirm}>
            Quit {label}
          </Button>
        </div>
      </div>
    </div>
  )
}
