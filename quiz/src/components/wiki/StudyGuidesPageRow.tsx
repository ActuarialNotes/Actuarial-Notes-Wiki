// The way across between the Study Guides tab's two pages — the exam ladder
// (`/wiki`) and the Resources shelf (`/wiki/resources`). Both are in Learn, and
// the navigation lists neither, so each page carries a one-row panel leading
// to the other: the same list row and 48px tile as the *How to Study* guide
// above the ladder (`ui/ListPanel.tsx`).

import { GraduationCap, LibraryBig } from 'lucide-react'
import { LogoTile } from '@/components/LogoTile'
import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { RESOURCES_ROUTE, type StudyGuidesSection } from '@/lib/wikiRoutes'

const PAGES: Record<StudyGuidesSection, { to: string; title: string; Icon: typeof GraduationCap; noun: string }> = {
  exams: { to: '/wiki', title: 'Exam Study Guides', Icon: GraduationCap, noun: 'exam' },
  resources: { to: RESOURCES_ROUTE, title: 'Exam Resources', Icon: LibraryBig, noun: 'resource' },
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
        // colour ramp either, so it takes the same ink — black on white in
        // light mode, white on black in dark.
        leading={
          <LogoTile size="lg" className="bg-foreground text-background shadow-sm">
            <Icon className="h-6 w-6" />
          </LogoTile>
        }
        title={title}
        meta={count ? <span>{count} {noun}{count === 1 ? '' : 's'}</span> : undefined}
      />
    </ListPanel>
  )
}
