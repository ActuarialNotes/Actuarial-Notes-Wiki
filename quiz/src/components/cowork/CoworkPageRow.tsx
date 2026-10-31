// The way across between Cowork's two shelves — **Sources** (`/cowork`, the
// publishers) and **Resources** (`/cowork/resources`, what they publish). It
// is the Study Guides tab's row between its exam ladder and its Resources
// shelf (`components/wiki/StudyGuidesPageRow.tsx`): the same list row and 48px
// tile, with the icon the sidebar gives that page, so the row and the sidebar
// entry are recognisably one destination. The sidebar lists both, but below
// `lg` it is a drawer, so each page also carries the way to the other.

import { Library, LibraryBig } from 'lucide-react'
import { LogoTile } from '@/components/LogoTile'
import { ListPanel, ListRow } from '@/components/ui/ListPanel'

export type CoworkShelf = 'sources' | 'resources'

export const COWORK_RESOURCES_ROUTE = '/cowork/resources'

const PAGES: Record<CoworkShelf, { to: string; title: string; Icon: typeof Library; noun: string }> = {
  sources: { to: '/cowork', title: 'Sources', Icon: Library, noun: 'source' },
  resources: { to: COWORK_RESOURCES_ROUTE, title: 'Resources', Icon: LibraryBig, noun: 'resource' },
}

/** A one-row panel opening the Cowork shelf `page`, with how many entries it holds. */
export function CoworkPageRow({ page, count }: { page: CoworkShelf; count?: number }) {
  const { to, title, Icon, noun } = PAGES[page]
  return (
    <ListPanel>
      <ListRow
        to={to}
        data-testid={`cowork-link-${page}`}
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
