// The Shop's **exam kit** — one exam's shelf as the steps a candidate goes
// through (lib/storeKit.ts, docs/store.md "The kit").
//
//   • a segmented bar, one piece per step, filled in the exam's colour as
//     steps are sorted;
//   • the steps, in one list that never reorders. Each leads with its tick —
//     always there, always tappable, so sorting a step is undone the way it
//     was done — and the first step not yet sorted is open, marked *Next*;
//   • an open step lists its products on one price scale, each with a radio
//     for "this is the one I have", so the kit remembers *what* the reader
//     has, not just that they have something;
//   • **Optional**: the syllabus textbooks and Pro.
//
// Sorting a step folds it and opens the next, with an Undo bar for a few
// seconds. The surfaces are the page's own greys (style guide §7.0, Ink): the
// exam's colour is only the progress and the ticks, so it never sits under a
// list the reader is trying to compare.
//
// Every product still opens its sheet, whose one button goes to the seller —
// nothing is sold here. The aisles are the pill row above the kit (`Store.tsx`).

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { BookMarked, ChevronDown, ChevronRight, Columns3 } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { LogoTile } from '@/components/LogoTile'
import { ProBadge } from '@/components/ProBadge'
import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { STORE_SELLERS } from '@/data/storeCatalog'
import { examAccentStyle } from '@/lib/examColors'
import {
  dayLabel,
  formatPrice,
  inDays,
  registrationStatus,
  type StoreItem,
  type StudyKind,
} from '@/lib/store'
import {
  KIT_OWN,
  KIT_STEP_TITLE,
  comparableKinds,
  nextStep,
  priceBar,
  priceScale,
  priceSpan,
  type ExamKit as Kit,
  type KitPicks,
  type KitStep,
  type KitStepId,
} from '@/lib/storeKit'
import { cn } from '@/lib/utils'

/** The section captions, the grouped list's own (`ListPanel`). */
const CAPTION = 'px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'

/** How long the Undo bar stays after a step is sorted. */
const UNDO_MS = 5000

/** The row a study step ends its products with, for what the Shop doesn't list. */
const OTHER_LABEL = 'Something not listed here'

export function ExamKit({
  examKey,
  examName,
  kit,
  picks,
  onPick,
  today,
  isPro,
  onOpen,
  onCompare,
  onTextbooks,
}: {
  examKey: string
  examName: string
  kit: Kit
  /** What the reader has sorted, by step (`KIT_OWN` for a tick with no product). */
  picks: KitPicks
  /** Sort a step with a product (or `KIT_OWN`); the same pick again, or null, un-sorts it. */
  onPick: (step: KitStepId, pick: string | null) => void
  today: string
  isPro: boolean
  onOpen: (item: StoreItem) => void
  onCompare: (kinds: StudyKind[], title: string) => void
  onTextbooks: () => void
}) {
  const done = new Set(kit.steps.filter(s => picks[s.id] !== undefined).map(s => s.id))
  const next = nextStep(kit.steps, done)
  const sorted = done.size
  const status = registrationStatus(examKey, today)
  const sitting = status.sitting?.startDate

  // Which step is open: the next one, until the reader opens or folds one.
  // Sorting a step hands the choice back to "the next one".
  const [opened, setOpened] = useState<KitStepId | null | undefined>(undefined)
  const openId = opened === undefined ? next?.id ?? null : opened

  // The Undo bar: the step just sorted and what it was before.
  const [undo, setUndo] = useState<{ step: KitStepId; before: string | null } | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => () => clearTimeout(timer.current), [])
  // Another exam is another kit: its bar would undo the wrong one.
  useEffect(() => {
    setUndo(null)
    setOpened(undefined)
  }, [examKey])

  function pick(step: KitStepId, value: string | null) {
    const before = picks[step] ?? null
    const unsorting = value === null || before === value
    onPick(step, value)
    clearTimeout(timer.current)
    if (unsorting) {
      setUndo(null)
      return
    }
    setOpened(undefined)
    setUndo({ step, before })
    timer.current = setTimeout(() => setUndo(null), UNDO_MS)
  }

  return (
    <div className="space-y-6" style={examAccentStyle(examKey) as CSSProperties} data-testid="store-kit">
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-3 px-1 text-sm">
          <span className="font-semibold">
            {sorted === kit.steps.length ? `Your ${examName} kit is complete` : `${sorted} of ${kit.steps.length} sorted`}
          </span>
          {sitting && <span className="shrink-0 text-muted-foreground">Sitting {dayLabel(sitting, today)}</span>}
        </div>
        <div
          className="flex gap-1"
          role="img"
          aria-label={`${sorted} of ${kit.steps.length} steps sorted for ${examName}`}
          data-testid="store-kit-progress"
        >
          {kit.steps.map(step => (
            <span
              key={step.id}
              className={cn('h-1.5 flex-1 rounded-full transition-colors', done.has(step.id) ? 'bg-[var(--exam-accent-vivid)]' : 'bg-muted')}
            />
          ))}
        </div>
      </div>

      <section aria-label={`${examName} kit`} className="overflow-hidden rounded-2xl bg-card">
        {kit.steps.map((step, i) => (
          <Step
            key={step.id}
            step={step}
            index={i}
            pick={picks[step.id]}
            isNext={step === next}
            open={openId === step.id}
            examKey={examKey}
            today={today}
            onToggleOpen={() => setOpened(openId === step.id ? null : step.id)}
            onPick={value => pick(step.id, value)}
            onOpen={onOpen}
            onCompare={onCompare}
          />
        ))}
      </section>

      <section aria-labelledby="kit-optional" className="space-y-2">
        <h2 id="kit-optional" className={CAPTION}>Optional</h2>
        <ListPanel>
          {kit.textbooks.length > 0 && (
            <ListRow
              onClick={onTextbooks}
              leading={
                <LogoTile size="sm" className="bg-muted text-foreground">
                  <BookMarked className="h-4 w-4" />
                </LogoTile>
              }
              title="Syllabus textbooks"
              subtitle={`${kit.textbooks.length} on the ${examName} syllabus`}
            />
          )}
          <ListRow
            to="/upgrade"
            leading={
              <LogoTile size="sm" className="bg-foreground text-background">
                <ProBadge size="sm" className="bg-background text-foreground" />
              </LogoTile>
            }
            title="Actuarial Notes Pro"
            subtitle="A daily study plan paced to your exam date"
            trailing={
              isPro
                ? <span className="text-sm font-semibold text-green-700 dark:text-green-400">Active</span>
                : <span className="text-sm font-semibold tabular-nums">$10 / month</span>
            }
          />
        </ListPanel>
      </section>

      {undo && (
        <div
          role="status"
          className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-[46] mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-foreground py-1.5 pl-4 pr-1.5 text-background shadow-xl lg:left-[calc(var(--sidebar-width)+1rem)]"
          data-testid="store-kit-undo"
        >
          <span className="min-w-0 flex-1 truncate text-sm font-semibold">{KIT_STEP_TITLE[undo.step]} sorted</span>
          <button
            type="button"
            onClick={() => {
              onPick(undo.step, undo.before)
              clearTimeout(timer.current)
              setUndo(null)
              setOpened(undo.step)
            }}
            className="h-10 rounded-xl bg-background/15 px-4 text-sm font-bold transition-colors hover:bg-background/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background"
          >
            Undo
          </button>
        </div>
      )}
    </div>
  )
}

/** A step's mark: its number in a ring (the exam's colour on the next step), or the done check. */
function StepMark({ index, done, next }: { index: number; done: boolean; next: boolean }) {
  if (done) return <CheckMark className="h-7 w-7 text-[var(--exam-accent-vivid)]" />
  return (
    <span
      aria-hidden
      className={cn(
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold tabular-nums',
        next ? 'border-[var(--exam-accent-vivid)] text-foreground' : 'border-border text-muted-foreground',
      )}
    >
      {index + 1}
    </span>
  )
}

/** What a step says under its title: the registration's state, or how many products answer it. */
function stepSubtitle(step: KitStep, examKey: string, today: string): string {
  if (step.id === 'register') {
    const status = registrationStatus(examKey, today)
    if (status.state === 'open' && status.deadline) {
      return `Closes ${dayLabel(status.deadline, today)} · ${inDays(status.daysLeft ?? 0)}`
    }
    if (status.state === 'opens' && status.opens) {
      return `Opens ${status.opensWeekOf ? 'the week of ' : ''}${dayLabel(status.opens, today)}`
    }
    if (status.state === 'closed') return 'Closed for the next sitting'
    return 'Dates not published yet'
  }
  const n = step.items.length
  if (step.id === 'calculator') return `${n} allowed on the exam`
  return `${n} ${n === 1 ? 'option' : 'options'}`
}

/** What a sorted step says under its title. */
function sortedSubtitle(step: KitStep, pick: string): string {
  if (pick !== KIT_OWN) {
    const item = step.items.find(i => i.id === pick)
    if (item) return `You have the ${item.name}`
  }
  return step.id === 'register' ? 'You’ve registered' : step.id === 'calculator' ? 'You have one' : 'You have this sorted'
}

/** The lowest price a step's products start at, in the first currency listed. */
function stepFrom(step: KitStep): string | null {
  const spans = step.items.map(priceSpan).filter(s => s !== null)
  if (spans.length === 0) return null
  const currency = spans[0]!.currency
  const low = Math.min(...spans.filter(s => s.currency === currency).map(s => s.low))
  return formatPrice({ amount: low, currency: currency as 'USD' | 'CAD' })
}

function Step({
  step,
  index,
  pick,
  isNext,
  open,
  examKey,
  today,
  onToggleOpen,
  onPick,
  onOpen,
  onCompare,
}: {
  step: KitStep
  index: number
  pick: string | undefined
  isNext: boolean
  open: boolean
  examKey: string
  today: string
  onToggleOpen: () => void
  onPick: (value: string | null) => void
  onOpen: (item: StoreItem) => void
  onCompare: (kinds: StudyKind[], title: string) => void
}) {
  const bodyId = useId()
  const done = pick !== undefined
  const title = KIT_STEP_TITLE[step.id]
  const from = stepFrom(step)
  return (
    <div
      className={cn(index > 0 && 'border-t border-border')}
      data-testid={isNext ? 'store-kit-next' : `store-kit-step-${step.id}`}
    >
      <div className="flex items-center gap-1 pl-2 pr-3">
        <button
          type="button"
          onClick={() => onPick(done ? null : KIT_OWN)}
          aria-pressed={done}
          aria-label={done ? `${title}: sorted. Mark not sorted` : `Mark ${title} sorted`}
          data-sound="select"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <StepMark index={index} done={done} next={isNext} />
        </button>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={onToggleOpen}
          data-sound="select"
          className="flex min-w-0 flex-1 items-center gap-3 rounded-lg py-3.5 pl-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        >
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2">
              <span className={cn('font-semibold', done && 'text-muted-foreground')}>{title}</span>
              {isNext && <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Next</span>}
            </span>
            <span className={cn('block truncate text-sm', done ? 'text-foreground/80' : 'text-muted-foreground')}>
              {done ? sortedSubtitle(step, pick) : stepSubtitle(step, examKey, today)}
            </span>
          </span>
          {from && !done && !open && (
            <span className="shrink-0 text-sm text-muted-foreground">
              {from === 'Free' ? (
                <span className="font-semibold text-green-700 dark:text-green-400">Free option</span>
              ) : (
                <>
                  {step.id === 'register' ? '' : 'from '}
                  <span className="font-semibold tabular-nums text-foreground">{from}</span>
                </>
              )}
            </span>
          )}
          <ChevronDown className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} aria-hidden />
        </button>
      </div>
      {open && (
        <div id={bodyId} className="px-3 pb-4 sm:pl-14 sm:pr-4">
          <StepBody step={step} pick={pick} onPick={onPick} onOpen={onOpen} onCompare={onCompare} />
        </div>
      )}
    </div>
  )
}

/** A step opened: its products on one price scale, each one pickable, then the comparison. */
function StepBody({
  step,
  pick,
  onPick,
  onOpen,
  onCompare,
}: {
  step: KitStep
  pick: string | undefined
  onPick: (value: string | null) => void
  onOpen: (item: StoreItem) => void
  onCompare: (kinds: StudyKind[], title: string) => void
}) {
  const title = KIT_STEP_TITLE[step.id]
  const registration = step.id === 'register' && step.items.length === 1 && step.items[0]!.type === 'registration' ? step.items[0]! : null
  const scale = priceScale(step.items)
  const kinds = comparableKinds(step)
  const study = step.id === 'learn' || step.id === 'practise' || step.id === 'review'

  if (registration) {
    const done = pick !== undefined
    return (
      <div className="space-y-3 pl-11 sm:pl-0">
        <div className="flex items-center justify-between gap-3">
          <span className="text-3xl font-bold tabular-nums">{registration.prices[0] ? formatPrice(registration.prices[0]) : null}</span>
          <button
            type="button"
            onClick={() => onOpen(registration)}
            data-sound="open"
            data-testid={`store-item-${registration.id}`}
            className="inline-flex h-11 items-center gap-1 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Register
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <button
          type="button"
          onClick={() => onPick(done ? null : KIT_OWN)}
          aria-pressed={done}
          data-sound="select"
          className="inline-flex h-10 items-center gap-2 rounded-full bg-muted px-4 text-sm font-semibold transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {done ? 'Not registered yet' : 'I’ve registered'}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div>
        <div className="flex items-baseline justify-between gap-3 pb-1 pl-11 sm:pl-0">
          <span className="text-xs font-medium text-muted-foreground">
            {step.id === 'calculator' ? 'Which one do you have?' : 'Have one? Tick it'}
          </span>
          {scale && (
            <span className="flex w-20 shrink-0 justify-between text-[10px] font-medium tabular-nums text-muted-foreground sm:w-28" aria-hidden>
              <span>$0</span>
              <span>{formatPrice({ amount: scale, currency: 'USD' })}</span>
            </span>
          )}
        </div>
        <ul role="radiogroup" aria-label={`Which ${title.toLowerCase()} option you have`}>
          {step.items.map(item => (
            <li key={item.id} className="border-t border-border">
              <KitOption item={item} scale={scale} picked={pick === item.id} onPick={() => onPick(item.id)} onOpen={() => onOpen(item)} />
            </li>
          ))}
          {study && (
            <li className="border-t border-border">
              <PickRow picked={pick === KIT_OWN} label={OTHER_LABEL} onPick={() => onPick(KIT_OWN)}>
                <button
                  type="button"
                  onClick={() => onPick(KIT_OWN)}
                  className="min-w-0 flex-1 py-3 text-left text-sm font-semibold text-muted-foreground focus-visible:outline-none"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {OTHER_LABEL}
                </button>
              </PickRow>
            </li>
          )}
        </ul>
      </div>

      {kinds && (
        <div className="pl-11 sm:pl-0">
          <button
            type="button"
            onClick={() => onCompare(kinds, title)}
            data-testid={step.id === 'learn' ? 'store-compare' : `store-compare-${step.id}`}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-muted px-4 text-sm font-semibold transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Columns3 className="h-4 w-4" aria-hidden />
            Compare {step.items.filter(i => i.type === 'study').length} side by side
          </button>
        </div>
      )}
    </div>
  )
}

/** A row led by its radio: "this is the one I have". */
function PickRow({ picked, label, onPick, children }: { picked: boolean; label: string; onPick: () => void; children: ReactNode }) {
  return (
    <div className={cn('flex items-center rounded-lg transition-colors', picked && 'bg-accent/60')}>
      <button
        type="button"
        role="radio"
        aria-checked={picked}
        aria-label={`I have ${label}`}
        onClick={onPick}
        data-sound="select"
        className="flex h-12 w-11 shrink-0 items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {picked ? (
          <CheckMark className="h-5 w-5 text-[var(--exam-accent-vivid)]" />
        ) : (
          <span aria-hidden className="h-5 w-5 rounded-full border-2 border-muted-foreground/50" />
        )}
      </button>
      {children}
    </div>
  )
}

/** One product in a step: its radio, then its name, seller and price range, with its bar on the step's scale. */
function KitOption({
  item,
  scale,
  picked,
  onPick,
  onOpen,
}: {
  item: StoreItem
  scale: number | null
  picked: boolean
  onPick: () => void
  onOpen: () => void
}) {
  const span = priceSpan(item)
  const seller = item.sellerId ? STORE_SELLERS[item.sellerId] : undefined
  const discontinued = item.type === 'calculator' && item.calculator.discontinued
  const range = span
    ? span.high > span.low
      ? `${formatPrice({ amount: span.low, currency: span.currency as 'USD' })}–${formatPrice({ amount: span.high, currency: span.currency as 'USD' })}`
      : formatPrice({ amount: span.low, currency: span.currency as 'USD' })
    : discontinued ? 'Discontinued' : null
  const bar = span && scale ? priceBar(span, scale) : null
  return (
    <PickRow picked={picked} label={item.name} onPick={onPick}>
      <button
        type="button"
        onClick={onOpen}
        data-sound="open"
        data-testid={`store-item-${item.id}`}
        className="flex min-w-0 flex-1 items-center gap-3 rounded-lg py-2.5 pr-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="min-w-0 flex-1">
          <span className="line-clamp-2 text-sm font-semibold leading-snug">{item.name}</span>
          <span className="block truncate text-xs text-muted-foreground">{[range, seller?.name].filter(Boolean).join(' · ')}</span>
        </span>
        {scale && (
          <span className="relative h-1.5 w-20 shrink-0 rounded-full bg-muted sm:w-28" aria-hidden>
            {bar && (
              <span
                className="absolute top-0 h-1.5 min-w-[6px] rounded-full bg-foreground/60"
                style={{ left: `${bar.left}%`, width: `${bar.width}%` }}
              />
            )}
          </span>
        )}
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      </button>
    </PickRow>
  )
}
