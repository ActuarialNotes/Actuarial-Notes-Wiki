import { CheckCheck, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useShowFlaggedQuestions } from '@/hooks/useShowFlaggedQuestions'
import { cn } from '@/lib/utils'

/**
 * Settings → Fact check.
 *
 * One switch, and it is worth being explicit about which way round it is. Off —
 * the default — means a question with an unresolved critical finding never
 * reaches a quiz session: the record says it is wrong, so serving it would teach
 * the wrong thing, which is the failure the whole fact-check layer exists to
 * prevent. On means show them anyway, which is what someone reviewing the bank
 * needs, because a question nobody can see is a question nobody fixes.
 */
export function FactCheckSettingsCard() {
  const [showFlagged, setShowFlagged] = useShowFlaggedQuestions()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fact check</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium mb-1">Questions with a known error</p>
          <p className="text-xs text-muted-foreground mb-3">
            When a fact check finds something critically wrong with a question, it is kept
            out of quiz sessions until the finding is resolved.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              data-sound="tap"
              onClick={() => setShowFlagged(false)}
              aria-pressed={!showFlagged}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                !showFlagged
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )}
            >
              <CheckCheck className="h-4 w-4" />
              Hide them
            </button>
            <button
              type="button"
              data-sound="tap"
              onClick={() => setShowFlagged(true)}
              aria-pressed={showFlagged}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                showFlagged
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )}
            >
              <AlertTriangle className="h-4 w-4" />
              Show them
            </button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Every page keeps a fact-check record of what has been checked about it, and against
          which source — on a concept or resource page it is the <strong>Fact Check</strong> item
          of the action menu. Open one to read the page's full history, or to report something
          that looks wrong.
        </p>
      </CardContent>
    </Card>
  )
}
