import { useId, type ReactNode } from 'react'
import { ExamLogo } from '@/components/ExamLogo'
import { SectorTile } from '@/components/actuaria/SectorTile'
import { useBattleSkin } from '@/hooks/useBattleSkin'
import { sectorName } from '@/lib/actuaria/lexicon'
import { EXAM_LABEL_TO_ID } from '@/lib/examIds'
import { PlayerTile } from '@/components/battle/PlayerTile'
import { Input } from '@/components/ui/input'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { MAX_NAME_LENGTH, ROUND_COUNTS, ROUND_TIME_PRESETS, roundSecondsFor, type Seat } from '@/lib/battle'
import { BATTLE_DIFFICULTIES, type BattleSetup } from '@/lib/battleSetup'
import { DEFAULT_PLAYER_NAMES, battleExamKey, battleExamName } from '@/lib/battleDisplay'
import { examAccentStyle } from '@/lib/examColors'
import { formatClock } from '@/lib/quizTiming'
import { cn } from '@/lib/utils'

function Field({ label, children, htmlFor }: { label: string; children: ReactNode; htmlFor?: string }) {
  return (
    <div className="space-y-2">
      {htmlFor ? (
        <label htmlFor={htmlFor} className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      ) : (
        <p className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      )}
      {children}
    </div>
  )
}

function NameInput({
  seat,
  value,
  onChange,
  placeholder,
  avatarUrl,
  label,
}: {
  seat: Seat
  value: string
  onChange: (value: string) => void
  placeholder: string
  avatarUrl?: string
  label: string
}) {
  const id = useId()
  return (
    <div className="flex items-center gap-3 rounded-lg bg-card px-3 py-2.5">
      <PlayerTile seat={seat} player={{ name: value || placeholder, avatarUrl }} size={32} />
      <div className="min-w-0 flex-1">
        <label htmlFor={id} className="sr-only">{label}</label>
        <Input
          id={id}
          value={value}
          maxLength={MAX_NAME_LENGTH}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          autoComplete="off"
          className="h-9 border-0 bg-transparent px-1 text-base font-medium focus-visible:ring-offset-0"
          data-testid={`battle-name-${seat}`}
        />
      </div>
    </div>
  )
}

/**
 * The settings a battle starts from. On one screen it names both players;
 * online, only this one — the other names themselves when they join.
 */
export function BattleSetupForm({
  setup,
  onChange,
  exams,
  players,
  avatarUrl,
  offerAbilities = false,
  loadoutSize = 0,
}: {
  setup: BattleSetup
  onChange: (next: BattleSetup) => void
  /** The exams with enough raceable questions, and how many each has — in ladder order. */
  exams: readonly { exam: string; count: number }[]
  /** 2 on one screen, 1 online. */
  players: 1 | 2
  /** The signed-in account's avatar, for the first player's tile. */
  avatarUrl?: string
  /** Offer the room's *Abilities* setting — a private channel under the Actuaria skin. */
  offerAbilities?: boolean
  /** How many abilities this player would take in — the Hangar's loadout, unlocked now. */
  loadoutSize?: number
}) {
  const skin = useBattleSkin()
  const set = (patch: Partial<BattleSetup>) => onChange({ ...setup, ...patch })
  const setName = (seat: Seat, name: string) => {
    const names: [string, string] = [...setup.names]
    names[seat] = name
    set({ names })
  }

  return (
    <div className="space-y-6">
      <Field label={players === 2 ? 'Players' : 'Your name'}>
        <div className={cn('grid gap-2', players === 2 && 'sm:grid-cols-2')}>
          <NameInput
            seat={0}
            value={setup.names[0]}
            onChange={v => setName(0, v)}
            placeholder={DEFAULT_PLAYER_NAMES[0]}
            avatarUrl={avatarUrl}
            label={players === 2 ? 'Player 1 name' : 'Your name'}
          />
          {players === 2 && (
            <NameInput
              seat={1}
              value={setup.names[1]}
              onChange={v => setName(1, v)}
              placeholder={DEFAULT_PLAYER_NAMES[1]}
              label="Player 2 name"
            />
          )}
        </div>
      </Field>

      <Field label={skin.id === 'actuaria' ? 'Sector' : 'Exam'}>
        {exams.length === 0 ? (
          <div className="h-16 animate-pulse rounded-lg bg-muted/50" />
        ) : skin.id === 'actuaria' ? (
          <SectorPicker exams={exams} value={setup.exam} onChange={exam => set({ exam })} />
        ) : (
          <div role="radiogroup" aria-label="Exam" className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {exams.map(({ exam, count }) => {
              const key = battleExamKey(exam)
              const selected = setup.exam === exam
              return (
                <button
                  key={exam}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => set({ exam })}
                  style={key ? examAccentStyle(key) : undefined}
                  data-testid={`battle-exam-${exam}`}
                  className={cn(
                    'flex items-center gap-3 rounded-lg bg-card px-3 py-2.5 text-left ring-2 transition-colors',
                    'focus-visible:outline-none focus-visible:ring-ring',
                    selected
                      ? 'bg-[var(--exam-accent-soft)] ring-[var(--exam-accent)]'
                      : 'ring-transparent hover:bg-[var(--exam-accent-soft)]',
                  )}
                >
                  {key && <ExamLogo examKey={key} size="md" />}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{battleExamName(exam)}</span>
                    <span className="block text-xs text-muted-foreground">{count} questions</span>
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </Field>

      <Field label="Questions">
        <SegmentedControl
          label="Questions"
          value={String(setup.rounds)}
          onChange={v => set({ rounds: Number(v) })}
          options={ROUND_COUNTS.map(n => ({ value: String(n), label: <span className="tabular-nums">{n}</span> }))}
        />
      </Field>

      <Field label="Time per question">
        <SegmentedControl
          label="Time per question"
          value={setup.time}
          onChange={time => set({ time })}
          options={ROUND_TIME_PRESETS.map(p => ({
            value: p.id,
            ariaLabel: `${p.label}, ${formatClock(roundSecondsFor(p.id, setup.exam))}`,
            label: (
              <span className="flex items-baseline gap-1.5 truncate">
                <span className="truncate sm:hidden">{p.short}</span>
                <span className="hidden truncate sm:inline">{p.label}</span>
                <span className="text-xs tabular-nums text-muted-foreground">{formatClock(roundSecondsFor(p.id, setup.exam))}</span>
              </span>
            ),
          }))}
        />
      </Field>

      {offerAbilities && (
        <Field label="Abilities">
          <SegmentedControl
            label="Abilities"
            value={setup.abilities ? 'on' : 'off'}
            onChange={v => set({ abilities: v === 'on' })}
            options={[{ value: 'off', label: 'Off' }, { value: 'on', label: 'On' }]}
          />
          <p className="px-1 text-xs text-muted-foreground">
            {setup.abilities
              ? `Each of you brings up to three from the Hangar — you’d bring ${loadoutSize}. Each works once.`
              : 'The plain rules. Turn on to let each of you bring abilities from the Hangar.'}
          </p>
        </Field>
      )}

      <Field label="Difficulty">
        <SegmentedControl
          label="Difficulty"
          value={setup.difficulty}
          onChange={difficulty => set({ difficulty })}
          options={BATTLE_DIFFICULTIES.map(d => ({ value: d.id, label: d.label }))}
        />
      </Field>
    </div>
  )
}

/**
 * Under the Actuaria skin the exam is picked as a sector (docs/actuaria-online.md
 * §6.8): every exam with a question bank, in ladder order, each on its own tile.
 * One whose bank has no raceable questions is listed and disabled, with the
 * reason — a written paper can't be raced — rather than left off.
 */
function SectorPicker({
  exams,
  value,
  onChange,
}: {
  exams: readonly { exam: string; count: number }[]
  value: string
  onChange: (exam: string) => void
}) {
  const counts = new Map(exams.map(e => [e.exam, e.count]))
  return (
    <div role="radiogroup" aria-label="Sector" className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {Object.keys(EXAM_LABEL_TO_ID).map(exam => {
        const key = EXAM_LABEL_TO_ID[exam]
        const count = counts.get(exam) ?? 0
        const raceable = count > 0
        const selected = value === exam
        return (
          <button
            key={exam}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-disabled={!raceable}
            disabled={!raceable}
            onClick={() => onChange(exam)}
            style={examAccentStyle(key)}
            data-testid={`battle-exam-${exam}`}
            className={cn(
              'flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5 text-left transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              selected
                ? 'border-[var(--exam-accent-muted)] bg-[var(--exam-accent-soft)]'
                : 'border-transparent',
              raceable ? !selected && 'hover:bg-[var(--exam-accent-soft)]' : 'cursor-not-allowed opacity-60',
            )}
          >
            <SectorTile examKey={key} size="md" charted={raceable} />
            <span className="min-w-0 flex-1">
              <span className="actuaria-display block truncate text-xs">{sectorName(key)}</span>
              <span className="block truncate text-xs text-muted-foreground">
                {raceable ? `${battleExamName(exam)} · ${count} questions` : `${battleExamName(exam)} · written papers can’t be raced`}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
