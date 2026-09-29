// The **ability tray** — a private room with abilities on, above the answer
// pad (docs/actuaria-online.md §6.8, §7.2): this player's loadout, each ready,
// armed or used, and what the other player has spent, since a used ability
// shows as spent on both screens.

import { AbilityButton } from '@/components/battle/AbilityButton'
import { abilityDef } from '@/data/actuariaAbilities'
import { canUse, otherSeat, type AbilityId, type BattleState, type Seat } from '@/lib/battle'
import { abilityUiState } from '@/lib/battleDisplay'

export function AbilityTray({
  battle,
  me,
  pending = null,
  onUse,
}: {
  battle: BattleState
  me: Seat
  /** Online, a power sent and not yet in the host's room. */
  pending?: AbilityId | null
  onUse: (ability: AbilityId) => void
}) {
  const mine = battle.loadouts[me]
  const theirs = battle.spent[otherSeat(me)]
  if (!battle.config.abilities || (mine.length === 0 && theirs.length === 0)) return null
  const oppName = battle.players[otherSeat(me)].name

  return (
    <div className="space-y-1.5" data-testid="battle-ability-tray">
      {mine.length > 0 && (
        <div role="group" aria-label="Your abilities" className="flex justify-center gap-2">
          {mine.map(id => {
            const def = abilityDef(id)
            if (!def) return null
            const state = abilityUiState(battle, me, id, pending)
            return (
              <AbilityButton
                key={id}
                def={def}
                state={state}
                compact
                className="min-w-0 max-w-[12rem] flex-1 basis-0"
                label={state === 'armed' ? 'Armed' : state === 'used' ? 'Used' : undefined}
                disabled={state !== 'ready' || !!pending || !canUse(battle, me, id)}
                onClick={() => onUse(id)}
              />
            )
          })}
        </div>
      )}
      {theirs.length > 0 && (
        <p className="text-center text-xs text-muted-foreground" data-testid="battle-opponent-abilities">
          {oppName} used {theirs.map(id => abilityDef(id)?.name ?? id).join(', ')}
        </p>
      )}
    </div>
  )
}
