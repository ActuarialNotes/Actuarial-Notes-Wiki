import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { CheckMark } from '@/components/CheckMark'
import { CharacterSkinSelector } from '@/components/MascotWidget'
import { TutorCharacter } from '@/components/tutor/TutorCharacter'
import { EXAM_SITTINGS, formatSittingDate } from '@/data/examSittings'
import { useTutorStore, SESSION_MINUTES, type SessionMinutes } from '@/stores/tutorStore'
import type { TutorEngine } from '@/hooks/useTutorEngine'
import type { TutorActions } from '@/components/tutor/actions'
import { JOURNEY_STEPS, PHASES, phaseStartDays, type JourneyPhase } from '@/lib/tutor/journey'
import { examDateLine } from '@/lib/tutor/copy'
import type { TutorCharacter as Character } from '@/lib/tutor/character'

// The walk through the exam (docs/tutor.md §3): the phases, where the candidate
// stands, the date it is all measured from, and the few settings there are.

interface Props {
  engine: TutorEngine
  actions: TutorActions
  character: Character
}

function formatDay(day: string): string {
  return new Date(`${day}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function TutorJourneyView({ engine, actions, character }: Props) {
  const [picking, setPicking] = useState(false)
  const settings = useTutorStore(s => s.settings)
  const setSettings = useTutorStore(s => s.setSettings)
  const [dateDraft, setDateDraft] = useState(engine.examDate.day ?? '')
  const [saving, setSaving] = useState(false)
  const current: JourneyPhase = engine.phase === 'after' ? 'setup' : engine.phase
  const at = JOURNEY_STEPS.indexOf(current)
  const starts = engine.examDate.day ? phaseStartDays(engine.examDate.day) : {}
  const upcoming = EXAM_SITTINGS
    .filter(s => s.examId === engine.exam.progressKey && (s.endDate ?? s.startDate) >= engine.today)
    .filter((s, i, all) => all.findIndex(o => o.startDate === s.startDate) === i)

  async function save(day: string | null) {
    setSaving(true)
    await actions.setExamDate(day)
    setSaving(false)
  }

  return (
    <div className="space-y-5">
      <ol className="space-y-1" aria-label="Your walk through the exam">
        {JOURNEY_STEPS.map((step, i) => {
          const done = i < at
          const here = i === at
          const start = starts[step]
          return (
            <li
              key={step}
              aria-current={here ? 'step' : undefined}
              className={`flex items-start gap-3 rounded-lg px-2 py-1.5 ${here ? 'bg-muted' : ''}`}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                {done ? <CheckMark className="h-5 w-5" /> : (
                  <span className={`h-2.5 w-2.5 rounded-full ${here ? 'bg-primary' : 'bg-border'}`} />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block text-sm ${here ? 'font-semibold' : done ? 'text-muted-foreground' : ''}`}>
                  {PHASES[step].label}
                  {start && <span className="font-normal text-muted-foreground"> · from {formatDay(start)}</span>}
                </span>
                {here && <span className="block text-xs text-muted-foreground">{PHASES[step].purpose}</span>}
              </span>
            </li>
          )
        })}
      </ol>

      <section className="space-y-2" aria-label="Exam date">
        <h3 className="text-sm font-semibold">Your sitting</h3>
        <p className="text-xs text-muted-foreground">{examDateLine(engine.examDate, engine.today)}</p>
        {upcoming.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {upcoming.map(s => (
              <Button key={s.startDate} size="sm" variant="outline" disabled={saving} onClick={() => save(s.startDate)}>
                {formatSittingDate(s)}
              </Button>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2">
          <label htmlFor="tutor-exam-date" className="sr-only">Exam date</label>
          <input
            id="tutor-exam-date"
            type="date"
            value={dateDraft}
            min={engine.today}
            onChange={e => setDateDraft(e.target.value)}
            className="h-9 flex-1 rounded-lg border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button size="sm" disabled={saving || !dateDraft || dateDraft === engine.examDate.day} onClick={() => save(dateDraft)}>
            Set
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          This is your Exam 5 date everywhere in the app — the dashboard and the study plan read it too.
        </p>
      </section>

      <section className="space-y-1" aria-label="Syllabus met">
        <h3 className="text-sm font-semibold">Syllabus met</h3>
        <p className="text-sm">{engine.coverage.met} of {engine.coverage.total} concepts checked at least once</p>
      </section>

      <section className="space-y-3" aria-label="Settings">
        <h3 className="text-sm font-semibold">Settings</h3>
        <div className="flex items-center gap-3">
          <TutorCharacter avatarUrl={character.avatarUrl} size={40} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Your Tutor: {character.name}</p>
            <p className="text-xs text-muted-foreground">
              {character.chosen ? 'Your character — dress it in the Gem Shop.' : 'Pick your character, and it tutors you.'}
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={() => setPicking(true)}>Change</Button>
        </div>
        {/* The Gem Shop's own picker: owned characters and colourways equip,
            locked ones lead to the shop. Portalled, so it clears the panel. */}
        {picking && createPortal(
          <CharacterSkinSelector currentAvatarUrl={character.avatarUrl} onClose={() => setPicking(false)} />,
          document.body,
        )}
        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground">Session length</p>
          <SegmentedControl<`${SessionMinutes}`>
            label="Session length"
            size="sm"
            value={`${settings.sessionMinutes}`}
            onChange={v => setSettings({ sessionMinutes: Number(v) as SessionMinutes })}
            options={SESSION_MINUTES.map(m => ({ value: `${m}` as `${SessionMinutes}`, label: `${m} min` }))}
          />
        </div>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={settings.quiet}
            onChange={e => setSettings({ quiet: e.target.checked })}
            className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
          />
          <span>
            Quiet — no bubbles
            <span className="block text-xs text-muted-foreground">The Tutor keeps a count of what’s waiting, and nothing more.</span>
          </span>
        </label>
        <Button size="sm" variant="ghost" onClick={() => setSettings({ hidden: true })}>Tuck the Tutor away</Button>
      </section>
    </div>
  )
}
