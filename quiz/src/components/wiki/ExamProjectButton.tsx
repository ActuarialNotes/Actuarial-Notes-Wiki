import { Link } from 'react-router-dom'
import { FlaskConical } from 'lucide-react'

/**
 * The way into the PCPA project simulator (`docs/pcpa-project.md`), in the PCPA
 * study guide's sticky header beside the syllabus button and drawn the same
 * size. PCPA is two parts — an exam and a project — and the page below is a
 * reading of the exam's syllabus; this is the other half.
 *
 * Only PCPA has a project, so the exam page renders this for `CAS-PCPA` alone.
 */
export function ExamProjectButton({ iconOnlyOnPhone = false }: { iconOnlyOnPhone?: boolean }) {
  return (
    <Link
      to="/project/pcpa"
      title="The PCPA project — build, validate and report on a GLM in a simulated project window"
      className="not-prose inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground no-underline shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <FlaskConical className="h-4 w-4 shrink-0 text-primary" aria-hidden />
      <span className={iconOnlyOnPhone ? 'hidden sm:inline' : undefined}>Project</span>
    </Link>
  )
}
