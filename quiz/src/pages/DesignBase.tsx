// The redesign's visual base on one page (docs/redesign-spec.md §2, style
// guide §13). Development only: `App.tsx` mounts it at /design/base when
// `import.meta.env.DEV` is true, so it is never in a production build. Every
// figure here is sample data, the canvas's own (Exam P at 27%).
//
// It exists so the shared pieces can be looked at in both themes and at both
// sizes without a screen that uses them yet.

import { useState } from 'react'
import { ChevronDown, ChevronRight, Lock, Play, RotateCcw, Plus, Repeat, X, Check } from 'lucide-react'
import { AnswerDot } from '@/components/AnswerDot'
import { CheckMark } from '@/components/CheckMark'
import { ExamLogo } from '@/components/ExamLogo'
import { LevelSquare, LevelSquareKey, LevelSquares } from '@/components/LevelSquare'
import { ProBadge } from '@/components/ProBadge'
import { Button } from '@/components/ui/button'
import { GROUND, OUTLINE_ROW_RULE, OUTLINE_TILE, OUTLINE_TILE_PRESSABLE, OutlineCard } from '@/components/ui/OutlineCard'
import { Popup, PopupTitle } from '@/components/ui/Popup'
import { ANSWER_EDGE, ANSWER_FILL, ANSWER_LABEL, ANSWER_PENDING, ANSWER_SOLID, ANSWER_STATES, ANSWER_TEXT, type AnswerState } from '@/lib/answerState'
import type { MasteryState } from '@/lib/mastery'
import { MASTERY_LABEL } from '@/lib/masteryBadge'
import { LEVEL_SQUARE_ORDER } from '@/lib/levelSquare'
import { cn } from '@/lib/utils'

const CODE: Record<string, MasteryState> = { n: 'new', a: 'level1', b: 'level2', c: 'level3', f: 'forgotten' }

/** The canvas's shorthand: one letter a concept, a capital one in today's session. */
function cells(code: string): { states: MasteryState[]; today: Set<number> } {
  const today = new Set<number>()
  const states = code.split('').map((k, i) => {
    if (k === k.toUpperCase()) today.add(i)
    return CODE[k.toLowerCase()]
  })
  return { states, today }
}

const OBJECTIVES = [
  { name: 'General Probability', weight: '23–30%', pct: '60%', ...cells('ccccccbBFnnnnn') },
  { name: 'Univariate Random Variables', weight: '44–50%', pct: '22%', ...cells('cccbbbBBaaaAAAfnnnnnnnnnnnnnnn') },
  { name: 'Multivariate Random Variables', weight: '23–30%', pct: '5%', ...cells('aaaNNnnnnnnnnnnn') },
]

const STEPS = [
  { icon: RotateCcw, name: 'Fix mistakes', count: 3, of: 'of 15' },
  { icon: Plus, name: 'Learn', count: 2 },
  { icon: Repeat, name: 'Review', count: 4 },
]

/** A nine-question session part-way through: answered, the current one, not reached. */
const PROGRESS: (AnswerState | 'current' | 'pending')[] = [
  'correct', 'incorrect', 'correct', 'partial', 'unanswered', 'current', 'pending', 'pending', 'pending',
]

const LENGTHS = [
  { minutes: 10, dots: [1, 1, 2] },
  { minutes: 25, dots: [3, 2, 4] },
  { minutes: 45, dots: [6, 3, 7] },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[13px] font-bold uppercase tracking-wider">{title}</h2>
      {children}
    </section>
  )
}

export default function DesignBase() {
  const [popup, setPopup] = useState(() => new URLSearchParams(window.location.search).has('popup'))
  const [length, setLength] = useState(25)

  return (
    <div className={cn(GROUND, 'min-h-screen')} data-testid="design-base">
      <div className="mx-auto grid max-w-5xl gap-x-12 gap-y-10 px-3 py-6 sm:px-8 lg:grid-cols-2">
        <Section title="Outline card, main action">
          <OutlineCard className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Today</h3>
              <Button variant="edge" size="sm" className="gap-1.5 px-3 text-[15px]" aria-haspopup="dialog" onClick={() => setPopup(true)}>
                {length} min
                <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
              </Button>
            </div>
            <div aria-hidden="true" className="flex h-2 gap-1">
              <span className="rounded bg-foreground" style={{ flex: '8 1 0' }} />
              <span className="rounded bg-border" style={{ flex: '7 1 0' }} />
              <span className="rounded bg-border" style={{ flex: '10 1 0' }} />
            </div>
            <ul className="flex flex-col">
              {STEPS.map(step => (
                <li key={step.name} className={cn('flex h-[52px] items-center gap-3.5', OUTLINE_ROW_RULE)}>
                  <step.icon className="h-[22px] w-[22px]" aria-hidden="true" />
                  <span className="flex-1 text-[17px] font-medium">{step.name}</span>
                  <span className="text-[17px] font-bold tabular-nums">{step.count}</span>
                  <span className="w-11 text-right text-sm">{step.of}</span>
                </li>
              ))}
            </ul>
            <Button size="main" className="w-full">
              <Play className="h-[18px] w-[18px] fill-current" aria-hidden="true" />
              Start
            </Button>
          </OutlineCard>

          <a href="#upgrade" className={cn('flex h-[52px] items-center gap-3 rounded-2xl border-[1.5px] border-border px-5 text-[15px] font-medium', OUTLINE_TILE_PRESSABLE)}>
            <Lock className="h-[18px] w-[18px]" aria-hidden="true" />
            <span className="flex-1">Pace my plan to Jan 14</span>
            <ProBadge />
          </a>
        </Section>

        <Section title="Tiles">
          <div className="grid grid-cols-2 gap-2.5">
            <a href="#syllabus" className={cn(OUTLINE_TILE, OUTLINE_TILE_PRESSABLE, 'flex flex-col gap-2 px-4 py-3.5')}>
              <span className="flex items-center justify-between text-sm">
                Syllabus
                <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="text-2xl font-bold leading-none">27%</span>
              <span className="flex h-4 items-center">
                <span className="relative block h-2 flex-1 rounded bg-border">
                  <span className="absolute inset-y-0 left-0 w-[27%] rounded bg-foreground" />
                  <span className="absolute -inset-y-1 left-[31%] w-0.5 bg-foreground" />
                </span>
              </span>
            </a>
            <a href="#analytics" className={cn(OUTLINE_TILE, OUTLINE_TILE_PRESSABLE, 'flex flex-col gap-2 px-4 py-3.5')}>
              <span className="flex items-center justify-between text-sm">
                Analytics
                <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="text-2xl font-bold leading-none">74%</span>
              <span aria-hidden="true" className="flex h-4 items-end gap-[3px]">
                {[[2, 3], [3, 5], [0, 7], [3, 7], [3, 6], [0, 14], [4, 11], [3, 8], [0, 8], [3, 7]].map(([missed, right], i) => (
                  <span key={i} className="flex flex-1 flex-col gap-px">
                    {missed > 0 && <span className={cn('rounded-sm', ANSWER_FILL.incorrect)} style={{ height: missed }} />}
                    <span className={cn('rounded-sm', ANSWER_FILL.correct)} style={{ height: right }} />
                  </span>
                ))}
              </span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="main">Check</Button>
            <Button variant="edge" size="main" className="font-semibold">Keep going · 10 min</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="edge">Try a similar one</Button>
            <Button variant="edge" size="sm">Edit</Button>
            <Button variant="edge" size="icon" aria-label="Close"><X className="h-5 w-5" /></Button>
            <span className="flex items-center gap-2.5 text-[17px] font-semibold">
              <ExamLogo examKey="P" size="sm" />
              Exam P
            </span>
          </div>
        </Section>

        <Section title="Concept levels">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {LEVEL_SQUARE_ORDER.map(state => (
              <li key={state} className="flex items-center gap-2 text-[15px]">
                <LevelSquare state={state} decorative />
                {MASTERY_LABEL[state]}
              </li>
            ))}
            <li className="flex items-center gap-3 text-[15px]">
              <LevelSquare state="level2" today decorative />
              In today's session
            </li>
          </ul>
          <div className="flex flex-col">
            {OBJECTIVES.map(o => (
              <div key={o.name} className="flex flex-col gap-3 border-t border-border py-5">
                <div className="flex items-baseline gap-2.5">
                  <span className="flex-1 text-[17px] font-semibold">{o.name}</span>
                  <span className="text-[17px] font-bold tabular-nums">{o.pct}</span>
                </div>
                <LevelSquares states={o.states} today={o.today} />
                <span className="text-sm">{o.weight} of the exam</span>
              </div>
            ))}
          </div>
          <LevelSquareKey />
          <div className="flex flex-wrap gap-2">
            {(['level3', 'level1', 'new'] as const).map((state, i) => (
              <span key={state} className={cn('flex h-9 items-center gap-2 rounded-full border-[1.5px] px-3 text-[15px]', i === 1 ? 'border-foreground' : 'border-border')}>
                <LevelSquare state={state} size="xs" decorative />
                {['Sample Space', 'Conditional Probability', 'Bayes Theorem'][i]}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Answer states">
          <div role="img" aria-label="Question 6 of 9" className="flex h-2 gap-1">
            {PROGRESS.map((p, i) => (
              <span
                key={i}
                className={cn('flex-1 rounded', p === 'current' ? 'bg-foreground' : p === 'pending' ? ANSWER_PENDING : ANSWER_FILL[p])}
              />
            ))}
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
            {ANSWER_STATES.map(state => (
              <li key={state} className="flex items-center gap-2">
                <AnswerDot state={state} decorative />
                {ANSWER_LABEL[state]}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2.5">
            <div className={cn('flex min-h-[56px] items-center gap-3 rounded-2xl px-4 text-[17px]', ANSWER_EDGE.incorrect)}>
              <X className={cn('h-5 w-5 shrink-0', ANSWER_TEXT.incorrect)} strokeWidth={3} aria-hidden="true" />
              <span className="sr-only">Your answer, incorrect:</span>
              <span className="font-semibold">B</span>
              <span className="line-through">0.18</span>
            </div>
            <div className={cn('flex min-h-[56px] items-center gap-3 rounded-2xl px-4 text-[17px] font-semibold', ANSWER_SOLID.correct)}>
              <Check className="h-5 w-5 shrink-0" strokeWidth={3} aria-hidden="true" />
              <span className="sr-only">Correct answer:</span>
              <span>D</span>
              <span>0.42</span>
            </div>
            <div className={cn('flex min-h-[56px] items-center gap-3 rounded-2xl px-4 text-[17px] font-semibold', ANSWER_SOLID.partial)}>
              <span>Partial</span>
            </div>
          </div>
          <p className="flex items-baseline gap-3">
            <span className="text-[56px] font-bold leading-none tracking-tight">6</span>
            <span className="text-[22px] font-medium">of 9</span>
            <span className={cn('ml-auto text-[17px] font-semibold', ANSWER_TEXT.correct)}>▲ 2 today</span>
          </p>
        </Section>
      </div>

      {popup && (
        <Popup onClose={() => setPopup(false)} labelledBy="design-base-popup">
          <PopupTitle id="design-base-popup">How long today?</PopupTitle>
          <div role="radiogroup" aria-label="Session length" className="flex flex-col gap-2.5">
            {LENGTHS.map(option => {
              const on = option.minutes === length
              return (
                <button
                  key={option.minutes}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setLength(option.minutes)}
                  className={cn(
                    'grid h-[72px] grid-cols-[96px_minmax(0,1fr)_28px] items-center gap-x-3.5 rounded-[18px] px-[18px] text-left',
                    on ? 'border-2 border-foreground' : 'border-[1.5px] border-border',
                  )}
                >
                  <span className="flex items-baseline gap-1.5">
                    <span className="text-[26px] font-bold">{option.minutes}</span>
                    <span className="text-[15px]">min</span>
                  </span>
                  <span aria-hidden="true" className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    {option.dots.map((n, g) => (
                      <span key={g} className="flex flex-wrap gap-[3px]">
                        {Array.from({ length: n }, (_, i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-foreground" />)}
                      </span>
                    ))}
                  </span>
                  {on && <CheckMark className="h-7 w-7 text-foreground" />}
                </button>
              )
            })}
          </div>
          <Button size="main" className="w-full" onClick={() => setPopup(false)}>Done</Button>
        </Popup>
      )}
    </div>
  )
}
