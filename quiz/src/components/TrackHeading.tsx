import type { ReactNode } from 'react'
import type { Track } from '@/data/tracks'
import { useConceptPopup } from '@/hooks/useConceptPopup'

// The floating search bar's height: h-[calc(3.5rem-1px)] + 1px border = 56px
// (sticky top-0). Both exam lists pin their headings just under it.
export const SEARCH_BAR_H = 56

/**
 * A group's heading bar — sticky, just below the search bar, so the group
 * being scrolled through stays named.
 */
export function StickyGroupHeading({ children }: { children: ReactNode }) {
  return (
    <div
      className="sticky z-10 -mx-4 sm:-mx-6 px-4 sm:px-6 py-1.5 mb-3 bg-background/95 backdrop-blur-sm"
      style={{ top: `${SEARCH_BAR_H}px` }}
    >
      {children}
    </div>
  )
}

/**
 * A credential's heading, the same on the Study Guides and Quiz tabs: the
 * short label as the title, a step below the page's own, with the long form
 * beneath it. It is a button: the designation is a page of its own (what it
 * is, what it takes, what it lets an actuary sign), so the heading is the way
 * into it.
 */
export function TrackHeading({ track, sourcePath }: { track: Track; sourcePath: string }) {
  const openAt = useConceptPopup(s => s.openAt)
  return (
    <StickyGroupHeading>
      {track.conceptPage ? (
        <button
          type="button"
          onClick={() => openAt([{ kind: 'concept', name: track.conceptPage! }], 0, sourcePath)}
          className="group block min-w-0 max-w-full text-left appearance-none bg-transparent p-0"
        >
          <h2 className="text-xl font-bold tracking-tight underline-offset-4 group-hover:underline">
            {track.label}
          </h2>
          {track.fullName && (
            <p className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
              {track.fullName}
            </p>
          )}
        </button>
      ) : (
        <h2 className="text-xl font-bold tracking-tight">{track.name}</h2>
      )}
    </StickyGroupHeading>
  )
}
