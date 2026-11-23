import { Navigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { usePcpaAttempts } from '@/hooks/usePcpaAttempts'
import { useProjectSync } from '@/hooks/useProjectSync'
import { useSubscription } from '@/hooks/useSubscription'
import { visibleTo } from '@/lib/pcpaAttempt'
import ProjectsHome from './ProjectsHome'
import BriefPage from './BriefPage'
import ProjectAttemptPage from './ProjectAttempt'

/**
 * The Projects tab (`docs/pcpa-project.md`): the briefs and attempts at
 * `/project`, one brief at `/project/brief/:caseId`, one attempt at
 * `/project/pcpa/:attemptId`. One lazy chunk for all three, since a candidate
 * who opens one goes to the others.
 *
 * Anyone can read a brief (decided 2026-11-23). **Working one is Pro's**: a
 * reader without Pro, signed out included, finds the briefs at `/project` and
 * reads any of them, and the button that would start a project leads to
 * Upgrade. Nothing of an attempt mounts for them (no sync, no attempt store
 * reads), and a link to an attempt goes back to `/project`.
 */
export default function Project() {
  const { attemptId, caseId } = useParams()
  const { isPro, loading } = useSubscription()

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-8 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading…
      </div>
    )
  }
  if (caseId) return <BriefPage />
  if (!isPro) return attemptId ? <Navigate to="/project" replace /> : <ProjectsHome canStart={false} />
  return <ProjectTab />
}

/**
 * The tab keeps a signed-in candidate's attempts with their account
 * (`useProjectSync`). A link to an attempt this browser hasn't seen — one
 * started on another device — waits for the account before deciding there is
 * no such attempt.
 */
function ProjectTab() {
  const { attemptId } = useParams()
  const { user } = useAuth()
  const userId = user?.id ?? null
  const heard = useProjectSync(userId)
  const known = usePcpaAttempts(s => !attemptId || s.attempts.some(a => a.id === attemptId && visibleTo(a, userId)))

  if (!attemptId) return <ProjectsHome canStart />
  if (!known && !heard) {
    return (
      <div className="flex items-center gap-2 p-8 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Fetching your project…
      </div>
    )
  }
  return <ProjectAttemptPage />
}
