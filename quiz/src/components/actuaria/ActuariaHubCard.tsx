// The way into Actuaria from Study Mode: a card in the Study Guides home page's
// general-guides row (docs/actuaria-online.md §6.2) — the same grid, card and
// 48px tile the *How to Study* guide and the Quiz tab's *Quiz Battle* card use,
// so the exam lists under them still line up. It follows the app's theme (it
// is not in space); only the tile carries `.actuaria`, which defines the
// signal its orbit ring is drawn in. Dismissible, and the dismissal is kept
// with the player's Actuaria settings.

import { Link } from 'react-router-dom'
import { ChevronRight, X } from 'lucide-react'
import { ActuariaMark } from '@/components/actuaria/ActuariaMark'
import { LogoTile } from '@/components/LogoTile'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useActuariaAccess } from '@/hooks/useActuariaAccess'
import { useActuariaPrefs } from '@/hooks/useActuariaPrefs'

export function ActuariaHubCard() {
  const { prefs, update } = useActuariaPrefs()
  // Only for a viewer who may enter — Pro (lib/actuaria/access.ts).
  const { allowed } = useActuariaAccess()
  if (!allowed || prefs.hubDismissed) return null

  return (
    <div className="relative" data-testid="actuaria-hub-card">
      <Link
        to="/actuaria"
        className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Card className="transition-all duration-150 hover:bg-accent/30">
          <CardHeader className="flex-row items-center gap-3 space-y-0 p-4 pr-12">
            <LogoTile size="lg" className="actuaria bg-background shadow-sm">
              <ActuariaMark size={40} surface="background" />
            </LogoTile>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base leading-snug">Actuaria Online</CardTitle>
              <CardDescription className="mt-0.5">Your exams as a star system to chart</CardDescription>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          </CardHeader>
        </Card>
      </Link>
      <button
        type="button"
        onClick={() => void update({ hubDismissed: true })}
        aria-label="Dismiss Actuaria Online"
        className="absolute right-2 top-2 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        data-testid="actuaria-hub-dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
