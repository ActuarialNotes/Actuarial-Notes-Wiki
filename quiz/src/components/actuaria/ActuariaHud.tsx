// The **in-world HUD row** — the top of every Actuaria screen but the title
// (docs/actuaria-online.md §5, §6.3): the mark and wordmark (the way home, to
// the map), the in-world tabs at `lg`, the Large Numbers board, and the way out
// to the Study Guides. Below `lg` the tabs move to the bottom bar
// (`ActuariaBottomBar`), and this row carries the sidebar's hamburger on its own
// line, the way a floating search bar does (`lib/mobileNavHost.ts`), so a phone
// spends one row on chrome and it stays in space.

import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BookOpen, Trophy } from 'lucide-react'
import { MobileNavButton } from '@/components/MobileNavButton'
import { LeaderboardPanel, type LeagueExamOption } from '@/components/LeaderboardPanel'
import { ActuariaWordmark } from '@/components/actuaria/ActuariaMark'
import { ActuariaDialog } from '@/components/actuaria/ActuariaDialog'
import { Term } from '@/components/actuaria/Term'
import { useAuth } from '@/hooks/useAuth'
import { actuariaTabFor, visibleTabs } from '@/lib/actuaria/nav'
import { TAB_ICONS } from '@/components/actuaria/tabIcons'
import { LEAGUES_ENABLED } from '@/lib/featureFlags'
import { cn } from '@/lib/utils'

export function ActuariaHud({ leagueExams }: { leagueExams: LeagueExamOption[] }) {
  const { pathname } = useLocation()
  const current = actuariaTabFor(pathname)
  const [ranksOpen, setRanksOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-2 px-3 sm:px-4">
        <MobileNavButton className="-ml-0.5" />
        <Link
          to="/actuaria/map"
          aria-label="Actuaria Online — the star map"
          className="flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ActuariaWordmark markSize={28} size="sm" />
        </Link>

        <nav aria-label="Actuaria" className="ml-4 hidden items-center gap-1 lg:flex">
          {visibleTabs().map(tab => {
            const Icon = TAB_ICONS[tab.id]
            return (
              <NavLink
                key={tab.id}
                to={tab.path}
                aria-current={current === tab.id ? 'page' : undefined}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  current === tab.id ? 'bg-card font-medium text-foreground' : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {tab.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          {LEAGUES_ENABLED && (
            <button
              type="button"
              onClick={() => setRanksOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-testid="actuaria-ranks"
            >
              <Trophy className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Ranks</span>
            </button>
          )}
          <Link
            to="/wiki"
            className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-testid="actuaria-exit"
          >
            <BookOpen className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Exit to Notes</span>
            <span className="sr-only sm:hidden">Exit to Notes</span>
          </Link>
        </div>
      </div>

      {ranksOpen && (
        <ActuariaDialog title={<Term id="largeNumbers" />} onClose={() => setRanksOpen(false)}>
          <RanksBody exams={leagueExams} />
        </ActuariaDialog>
      )}
    </header>
  )
}

/** Large Numbers is the per-exam league board — the app's own, not a second ladder (D4). */
function RanksBody({ exams }: { exams: LeagueExamOption[] }) {
  const { user } = useAuth()
  if (!user) {
    return (
      <p className="text-sm text-muted-foreground">
        The weekly leagues are for signed-in players.{' '}
        <Link to="/auth" className="font-medium text-foreground underline underline-offset-2">Sign in</Link> to join one.
      </p>
    )
  }
  if (exams.length === 0) {
    return <p className="text-sm text-muted-foreground">Chart a sector to join its weekly league.</p>
  }
  return <LeaderboardPanel exams={exams} />
}
