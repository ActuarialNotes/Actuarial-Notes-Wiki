import { useEffect } from 'react'
import { UploadCloud } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  /** Open the sign-up form; the review is where it returns to. */
  onCreateAccount: () => void
  onSignIn: () => void
  onClose: () => void
}

/**
 * Asks a guest to save their progress, once, after their first finished quiz
 * (the rule is `lib/guestSavePrompt.ts`). It plays after the post-quiz
 * celebrations, so it never covers a level-up or a streak. Signing up or in from
 * here lands back on /review, which syncs the finished quiz to the new account.
 */
export function GuestSavePrompt({ onCreateAccount, onSignIn, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm paper-scrim"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guest-save-title"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-sm space-y-4 rounded-2xl bg-card p-6 shadow-2xl">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <UploadCloud className="h-7 w-7 text-primary" />
          </div>
          <h2 id="guest-save-title" className="text-xl font-bold tracking-tight">Save your progress</h2>
          <p className="text-sm text-muted-foreground">
            Your results are only saved in this browser. Create an account to keep your
            scores, concept levels and streak, and see them on any device.
          </p>
        </div>

        <div className="space-y-2">
          <Button className="w-full" onClick={onCreateAccount} autoFocus>
            Create an account
          </Button>
          <Button variant="outline" className="w-full" onClick={onSignIn}>
            I have an account
          </Button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-full text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Not now
        </button>
      </div>
    </div>
  )
}
