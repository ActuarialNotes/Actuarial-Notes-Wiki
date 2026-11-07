import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { inkToolTile } from '@/components/ui/ink'

/**
 * A way to another page from an exam's sticky header strip, drawn as an Ink
 * tool tile (style guide §7.0): an icon over a one-word label, nothing filled
 * at rest. The study guide's **Quiz** and **Project**, and the quiz builder's
 * **Study Guide**, are all this.
 */
export function HeaderLinkButton({
  to,
  icon: Icon,
  label,
  title,
}: {
  to: string
  icon: LucideIcon
  label: string
  title: string
}) {
  return (
    <Link to={to} title={title} className={inkToolTile()}>
      <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
      <span>{label}</span>
    </Link>
  )
}
