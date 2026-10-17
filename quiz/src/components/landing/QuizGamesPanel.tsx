import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { BattleLogo } from '@/components/battle/BattleLogo'
import { CraftLogo } from '@/components/craft/CraftLogo'

/**
 * Quiz Battle and Concept Craft — ways of quizzing rather than exams, so they
 * sit above the ladder, where the Study Guides tab keeps its general guide:
 * one-row panels of the same list the exams are drawn in, with the same 48px
 * tile, so the two tabs line up.
 */
export function QuizGamesPanel() {
  return (
    <section>
      <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2">
        <ListPanel>
          <ListRow
            to="/battle"
            data-testid="quiz-battle-entry"
            leading={<BattleLogo size="lg" />}
            title="Quiz Battle"
            subtitle="Race a friend through the same questions"
          />
        </ListPanel>
        <ListPanel>
          <ListRow
            to="/craft"
            data-testid="concept-craft-entry"
            leading={<CraftLogo size="lg" />}
            title="Concept Craft"
            subtitle="Connect concepts to make new ones"
          />
        </ListPanel>
      </div>
    </section>
  )
}
