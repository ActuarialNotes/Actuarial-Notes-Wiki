import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useSoundOnMount } from '@/hooks/useSoundEffects'

interface QuizSignInPromptProps {
  onSignIn: () => void
  onContinue: () => void
}

/**
 * Shown to a signed-out reader who opened today's quiz from the daily email,
 * once they start it: sign in so the answers count toward their plan, or go
 * on as a guest — the quiz works either way.
 */
export function QuizSignInPrompt({ onSignIn, onContinue }: QuizSignInPromptProps) {
  useSoundOnMount('open')

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onContinue()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onContinue])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 paper-scrim"
      onClick={onContinue}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-sign-in-title"
    >
      <div
        className="w-full max-w-sm rounded-lg bg-card text-card-foreground shadow-lg p-5 space-y-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="space-y-1">
          <h2 id="quiz-sign-in-title" className="text-base font-semibold">Sign in to save your progress</h2>
          <p className="text-sm text-muted-foreground">
            Your answers will count toward today's plan. You can also take the quiz without an account.
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onContinue}>
            Continue without signing in
          </Button>
          <Button variant="default" size="sm" onClick={onSignIn}>
            Sign in
          </Button>
        </div>
      </div>
    </div>
  )
}
