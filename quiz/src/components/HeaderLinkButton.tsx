import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'

/**
 * A way to another page from an exam's sticky header strip, drawn at the
 * height of the strip's other controls (the version menu, the syllabus
 * button): an icon and a label, the label dropped on a phone when the row is
 * crowded. The study guide's **Start Quiz** and **Project**, and the quiz
 * builder's **Study Guide**, are all this.
 */
export function HeaderLinkButton({
  to,
  icon: Icon,
  label,
  title,
  iconOnlyOnPhone = false,
}: {
  to: string
  icon: LucideIcon
  label: string
  title: string
  iconOnlyOnPhone?: boolean
}) {
  return (
    <Link
      to={to}
      title={title}
      aria-label={iconOnlyOnPhone ? label : undefined}
      className="not-prose inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground no-underline shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
      <span className={iconOnlyOnPhone ? 'hidden sm:inline' : undefined}>{label}</span>
    </Link>
  )
}
