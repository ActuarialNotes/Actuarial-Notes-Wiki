import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { GamesLogo } from '@/components/GamesLogo'

/**
 * Games — Quiz Battle and Concept Craft — are ways of quizzing rather than
 * exams, so they sit above the ladder as one row, where the Study Guides tab
 * keeps its general guide: a one-row panel of the same list the exams are
 * drawn in, with the same 48px tile, so the two tabs line up. The games
 * themselves are listed on their own page (`pages/Games.tsx`).
 */
export function QuizGamesPanel() {
  return (
    <section>
      <ListPanel>
        <ListRow
          to="/games"
          data-testid="quiz-games-entry"
          leading={<GamesLogo size="lg" />}
          title="Games"
          subtitle="Quiz Battle and Concept Craft"
        />
      </ListPanel>
    </section>
  )
}
