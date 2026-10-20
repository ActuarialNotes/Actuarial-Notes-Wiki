import { ChevronLeft } from 'lucide-react'
import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { BattleLogo } from '@/components/battle/BattleLogo'
import { CraftLogo } from '@/components/craft/CraftLogo'
import { backLabel, useBack } from '@/hooks/useBack'

/**
 * Games (`/games`), the Quiz tab's games section: Quiz Battle and Concept
 * Craft, opened from the one Games row above the exam ladder. The same list
 * the exams are drawn in, one row per game.
 */
export default function Games() {
  const back = useBack({ to: '/', label: 'Quiz' })
  const label = backLabel(back)
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={back.go}
          aria-label={label}
          title={label}
          className="-ml-1.5 shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h1 className="min-w-0 flex-1 truncate text-2xl font-bold tracking-tight">Games</h1>
      </div>
      <ListPanel>
        <ListRow
          to="/battle"
          data-testid="quiz-battle-entry"
          leading={<BattleLogo size="lg" />}
          title="Quiz Battle"
          subtitle="Race a friend through the same questions"
        />
        <ListRow
          to="/craft"
          data-testid="concept-craft-entry"
          leading={<CraftLogo size="lg" />}
          title="Concept Craft"
          subtitle="Connect concepts to make new ones"
        />
      </ListPanel>
    </div>
  )
}
