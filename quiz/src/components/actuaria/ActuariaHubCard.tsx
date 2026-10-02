// The way into Actuaria from Study Mode: a one-row panel in the Study Guides
// home page's general-guides row (docs/actuaria-online.md §6.2) — the same list
// row and 48px tile the *How to Study* guide and the Quiz tab's *Quiz Battle*
// use (`components/ui/ListPanel.tsx`), so the exam lists under them line up. It follows the app's theme (it
// is not in space); only the tile carries `.actuaria`, which defines the
// signal its orbit ring is drawn in. Dismissible, and the dismissal is kept
// with the player's Actuaria settings.

import { X } from 'lucide-react'
import { ActuariaMark } from '@/components/actuaria/ActuariaMark'
import { LogoTile } from '@/components/LogoTile'
import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { useActuariaAccess } from '@/hooks/useActuariaAccess'
import { useActuariaPrefs } from '@/hooks/useActuariaPrefs'

export function ActuariaHubCard() {
  const { prefs, update } = useActuariaPrefs()
  // Only for a viewer who may enter — Pro (lib/actuaria/access.ts).
  const { allowed } = useActuariaAccess()
  if (!allowed || prefs.hubDismissed) return null

  return (
    <div className="relative" data-testid="actuaria-hub-card">
      <ListPanel>
        <ListRow
          to="/actuaria"
          // Room on the right for the dismiss button, which sits outside the
          // row so it isn't a button inside a link.
          className="pr-12"
          leading={
            <LogoTile size="lg" className="actuaria bg-background shadow-sm">
              <ActuariaMark size={40} surface="background" />
            </LogoTile>
          }
          title="Actuaria Online"
          subtitle="Your exams as a star system to chart"
        />
      </ListPanel>
      <button
        type="button"
        onClick={() => void update({ hubDismissed: true })}
        aria-label="Dismiss Actuaria Online"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        data-testid="actuaria-hub-dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
