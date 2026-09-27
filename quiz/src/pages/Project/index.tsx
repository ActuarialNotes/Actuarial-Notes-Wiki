import { useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { usePcpaAttempts } from '@/hooks/usePcpaAttempts'
import { useProjectSync } from '@/hooks/useProjectSync'
import { visibleTo } from '@/lib/pcpaAttempt'
import ProjectsHome from './ProjectsHome'
import ProjectAttemptPage from './ProjectAttempt'

/**
 * The Projects tab (`docs/pcpa-project.md`): the briefs and attempts at
 * `/project`, one attempt at `/project/pcpa/:attemptId`. One lazy chunk for
 * both, since a candidate who opens one goes to the other.
 *
 * The tab keeps a signed-in candidate's attempts with their account
 * (`useProjectSync`). A link to an attempt this browser hasn't seen — one
 * started on another device — waits for the account before deciding there is
 * no such attempt.
 */
export default function Project() {
  const { attemptId } = useParams()
  const { user } = useAuth()
  const userId = user?.id ?? null
  const heard = useProjectSync(userId)
  const known = usePcpaAttempts(s => !attemptId || s.attempts.some(a => a.id === attemptId && visibleTo(a, userId)))

  if (!attemptId) return <ProjectsHome />
  if (!known && !heard) {
    return (
      <div className="flex items-center gap-2 p-8 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Fetching your project…
      </div>
    )
  }
  return <ProjectAttemptPage />
}
