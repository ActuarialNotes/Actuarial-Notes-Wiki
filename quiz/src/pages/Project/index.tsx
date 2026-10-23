import { Link, Navigate, useParams } from 'react-router-dom'
import { FlaskConical, Loader2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { ProBadge } from '@/components/ProBadge'
import { useAuth } from '@/hooks/useAuth'
import { usePcpaAttempts } from '@/hooks/usePcpaAttempts'
import { useProjectSync } from '@/hooks/useProjectSync'
import { useSubscription } from '@/hooks/useSubscription'
import { visibleTo } from '@/lib/pcpaAttempt'
import ProjectsHome from './ProjectsHome'
import ProjectAttemptPage from './ProjectAttempt'

/**
 * The Projects tab (`docs/pcpa-project.md`): the briefs and attempts at
 * `/project`, one attempt at `/project/pcpa/:attemptId`. One lazy chunk for
 * both, since a candidate who opens one goes to the other.
 *
 * Projects are a **Pro** feature: anyone else — signed out included — gets the
 * locked page at `/project`, and nothing behind it mounts (no sync, no attempt
 * store reads). A link to an attempt goes there too: an attempt's route hosts
 * its own top bar's hamburger (`lib/mobileNavHost.ts`), which the locked page
 * doesn't draw.
 */
export default function Project() {
  const { attemptId } = useParams()
  const { user } = useAuth()
  const { isPro, loading } = useSubscription()

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-8 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading…
      </div>
    )
  }
  if (!isPro) return attemptId ? <Navigate to="/project" replace /> : <ProjectsLocked signedIn={!!user} />
  return <ProjectTab />
}

/** What a reader without Pro finds at `/project`: what the tab is, and the way in. */
function ProjectsLocked({ signedIn }: { signedIn: boolean }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <FlaskConical className="h-5 w-5 text-primary" aria-hidden />
      </div>
      <div>
        <h1 className="flex items-center justify-center gap-1.5 text-lg font-semibold">
          Projects
          <ProBadge />
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Rehearse the PCPA project: a brief, a data set, R and Python in the browser, and a report graded against the true model.
        </p>
      </div>
      {signedIn ? (
        <Link to="/upgrade" className={buttonVariants({ size: 'sm' })}>
          Upgrade to Pro
        </Link>
      ) : (
        <Link to="/auth" state={{ from: '/project' }} className={buttonVariants({ size: 'sm' })}>
          Sign in
        </Link>
      )}
    </div>
  )
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
