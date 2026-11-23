import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { BriefView } from '@/components/project/BriefView'
import { NewProjectDialog } from '@/components/project/NewProjectDialog'
import { ProjectTopBar } from '@/components/project/ProjectTopBar'
import { projectCase as findCase } from '@/data/pcpaProjects'
import { useAuth } from '@/hooks/useAuth'
import { usePcpaAttempts } from '@/hooks/usePcpaAttempts'
import { useSubscription } from '@/hooks/useSubscription'
import { visibleTo } from '@/lib/pcpaAttempt'

/**
 * A brief on its own (`/project/brief/<case id>`): the business problem, the
 * stakeholders' notes, the scope and the data dictionary, read before any
 * attempt at it. Anyone can read one (decided 2026-11-23). Starting a project
 * is Pro's, so the one button starts it for a Pro reader and leads to Upgrade
 * for anyone else.
 */

const MAIN = 'mx-auto flex h-[58px] w-full max-w-xl items-center justify-center rounded-full bg-primary px-6 text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'

export default function BriefPage() {
  const { caseId } = useParams()
  const { user } = useAuth()
  const userId = user?.id ?? null
  const { isPro } = useSubscription()
  const allAttempts = usePcpaAttempts(s => s.attempts)
  const [starting, setStarting] = useState(false)
  const brief = caseId ? findCase(caseId) : undefined
  if (!brief) return <Navigate to="/project" replace />

  return (
    <div className="flex h-[100dvh] flex-col" data-testid="brief-page">
      <ProjectTopBar backTo="/project" backLabel="Projects" title={brief.title} subtitle={`PCPA Project · ${brief.company}`} />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <BriefView projectCase={brief} />
      </div>
      <div className="shrink-0 border-t border-border bg-background px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3">
        {isPro ? (
          <button type="button" className={MAIN} onClick={() => setStarting(true)} data-testid="brief-start">
            Start this project
          </button>
        ) : (
          <Link to="/upgrade" className={MAIN} data-testid="brief-upgrade">
            Upgrade to start
          </Link>
        )}
      </div>
      {starting && (
        <NewProjectDialog
          attempts={allAttempts.filter(a => visibleTo(a, userId))}
          owner={userId ?? undefined}
          initialBrief={brief}
          onClose={() => setStarting(false)}
        />
      )}
    </div>
  )
}
