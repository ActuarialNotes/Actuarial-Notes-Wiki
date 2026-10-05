// The way across between the Study Guides tab's two pages — the exam ladder
// (`/wiki`) and the Resources shelf (`/wiki/resources`). The sidebar lists both
// under the tab, but below `lg` the sidebar is a drawer, so each page also
// carries a one-row panel leading to the other: the same list row and 48px
// tile as the *How to Study* guide above the ladder (`ui/ListPanel.tsx`), with
// the icon the sidebar gives that page, so the row and the sidebar entry are
// recognisably one destination.

import { GraduationCap, LibraryBig } from 'lucide-react'
import { LogoTile } from '@/components/LogoTile'
import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { RESOURCES_ROUTE, type StudyGuidesSection } from '@/lib/wikiRoutes'

const PAGES: Record<StudyGuidesSection, { to: string; title: string; Icon: typeof GraduationCap; noun: string }> = {
  exams: { to: '/wiki', title: 'Exam Study Guides', Icon: GraduationCap, noun: 'exam' },
  resources: { to: RESOURCES_ROUTE, title: 'Resources', Icon: LibraryBig, noun: 'resource' },
}

/** A one-row panel opening the Study Guides page `page`, with how many entries it holds. */
export function StudyGuidesPageRow({ page, count }: { page: StudyGuidesSection; count?: number }) {
  const { to, title, Icon, noun } = PAGES[page]
  return (
    <ListPanel>
      <ListRow
        to={to}
        data-testid={`study-guides-link-${page}`}
        // The guide card's tile: a page of the tab has no place on the exam
        // colour ramp either, so it takes the same wiki teal.
        leading={
          <LogoTile size="lg" className="bg-teal-500 text-white shadow-sm">
            <Icon className="h-6 w-6" />
          </LogoTile>
        }
        title={title}
        meta={count ? <span>{count} {noun}{count === 1 ? '' : 's'}</span> : undefined}
      />
    </ListPanel>
  )
}
