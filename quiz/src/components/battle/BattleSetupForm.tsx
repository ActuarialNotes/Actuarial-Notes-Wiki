import { useId, type ReactNode } from 'react'
import { ExamLogo } from '@/components/ExamLogo'
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
}: {
  setup: BattleSetup
  onChange: (next: BattleSetup) => void
  /** The exams with enough raceable questions, and how many each has — in ladder order. */
  exams: readonly { exam: string; count: number }[]
  /** 2 on one screen, 1 online. */
  players: 1 | 2
  /** The signed-in account's avatar, for the first player's tile. */
  avatarUrl?: string
}) {
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

      <Field label="Exam">
        {exams.length === 0 ? (
          <div className="h-16 animate-pulse rounded-lg bg-muted/50" />
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
