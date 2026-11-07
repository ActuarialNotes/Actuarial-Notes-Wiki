// The Shop's **exam kit** — one exam's shelf as the steps a candidate goes
// through (lib/storeKit.ts, docs/store.md "The kit").
//
//   • a segmented bar, one piece per step, filled in the exam's colour as the
//     reader ticks steps off;
//   • **Next up**: the first step not yet sorted, filled with the exam's
//     colour — the one place on the page the colour is a surface, so it always
//     means "this needs you now";
//   • **Then**: every other step as a row that opens to its products, each
//     drawn against one price scale so a range reads at a glance;
//   • **Optional**: the syllabus textbooks and Pro; then the aisles, for
//     browsing the whole Shop.
//
// Every product still opens its sheet, whose one button goes to the seller —
// nothing is sold here. The page is Ink (style guide §7.0): grey panels,
// white text, the exam's colour only where it carries meaning.

import { useId, useState, type CSSProperties, type ReactNode } from 'react'
import { BookMarked, Calculator, ChevronDown, ChevronRight, Columns3, Layers, Ticket, type LucideIcon } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { LogoTile } from '@/components/LogoTile'
import { ProBadge } from '@/components/ProBadge'
import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { STORE_SELLERS } from '@/data/storeCatalog'
import { examAccentStyle } from '@/lib/examColors'
import {
  AISLE_LABEL,
  STORE_AISLES,
  dayLabel,
  formatPrice,
  inDays,
  registrationStatus,
  type StoreAisle,
  type StoreItem,
  type StudyKind,
} from '@/lib/store'
import {
  KIT_STEP_TITLE,
  comparableKinds,
  nextStep,
  priceBar,
  priceScale,
  priceSpan,
  type ExamKit as Kit,
  type KitStep,
  type KitStepId,
} from '@/lib/storeKit'
import { cn } from '@/lib/utils'

const AISLE_ICON: Record<StoreAisle, LucideIcon> = {
  registration: Ticket,
  study: Layers,
  calculators: Calculator,
  textbooks: BookMarked,
}

/** The section captions, the grouped list's own (`ListPanel`). */
const CAPTION = 'px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'

export function ExamKit({
  examKey,
  examName,
  kit,
  done,
  onToggle,
  today,
  isPro,
  counts,
  onOpen,
  onCompare,
  onBrowse,
}: {
  examKey: string
  examName: string
  kit: Kit
  done: ReadonlySet<string>
  onToggle: (step: KitStepId) => void
  today: string
  isPro: boolean
  /** How many of this exam's items each aisle holds, for the browse rows. */
  counts: Record<StoreAisle, number>
  onOpen: (item: StoreItem) => void
  onCompare: (kinds: StudyKind[], title: string) => void
  onBrowse: (aisle: StoreAisle) => void
}) {
  const spotlight = nextStep(kit.steps, done)
  const rest = kit.steps.filter(s => s !== spotlight)
  const sorted = kit.steps.filter(s => done.has(s.id)).length
  const status = registrationStatus(examKey, today)
  const sitting = status.sitting?.startDate

  return (
    <div className="space-y-6" style={examAccentStyle(examKey) as CSSProperties} data-testid="store-kit">
      <div className="flex items-center gap-3">
        <div
          className="flex flex-1 gap-1"
          role="img"
          aria-label={`${sorted} of ${kit.steps.length} steps sorted for ${examName}`}
          data-testid="store-kit-progress"
        >
          {kit.steps.map(step => (
            <span
              key={step.id}
              className={cn('h-1.5 flex-1 rounded-full', done.has(step.id) ? 'bg-[var(--exam-accent-vivid)]' : 'bg-muted')}
            />
          ))}
        </div>
        {sitting && (
          <span className="shrink-0 text-sm font-medium text-muted-foreground">Sitting {dayLabel(sitting, today)}</span>
        )}
      </div>

      <section aria-labelledby="kit-next" className="space-y-2">
        <h2 id="kit-next" className={CAPTION}>Next up</h2>
        {spotlight ? (
          <div className="rounded-2xl bg-[var(--exam-accent-vivid)] p-4 text-white shadow-sm sm:p-5" data-testid="store-kit-next">
            <StepHeading step={spotlight} index={kit.steps.indexOf(spotlight)} today={today} examKey={examKey} tone="spotlight" />
            <div className="mt-4 sm:pl-11">
              <StepBody step={spotlight} done={false} onToggle={() => onToggle(spotlight.id)} onOpen={onOpen} onCompare={onCompare} tone="spotlight" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl bg-card p-4">
            <CheckMark className="h-6 w-6" />
            <p className="text-sm font-medium">Every step for {examName} is sorted.</p>
          </div>
        )}
      </section>

      {rest.length > 0 && (
        <section aria-labelledby="kit-then" className="space-y-2">
          <h2 id="kit-then" className={CAPTION}>{spotlight ? 'Then' : 'Your kit'}</h2>
          <div className="overflow-hidden rounded-2xl bg-card">
            {rest.map((step, i) => (
              <StepRow
                key={step.id}
                step={step}
                index={kit.steps.indexOf(step)}
                first={i === 0}
                done={done.has(step.id)}
                today={today}
                examKey={examKey}
                onToggle={() => onToggle(step.id)}
                onOpen={onOpen}
                onCompare={onCompare}
              />
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="kit-optional" className="space-y-2">
        <h2 id="kit-optional" className={CAPTION}>Optional</h2>
        <ListPanel>
          {kit.textbooks.length > 0 && (
            <ListRow
              onClick={() => onBrowse('textbooks')}
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

      <section aria-labelledby="kit-browse" className="space-y-2">
        <h2 id="kit-browse" className={CAPTION}>Browse the Shop</h2>
        <ListPanel>
          {STORE_AISLES.filter(a => counts[a] > 0).map(aisle => {
            const Icon = AISLE_ICON[aisle]
            return (
              <ListRow
                key={aisle}
                onClick={() => onBrowse(aisle)}
                leading={
                  <LogoTile size="sm" className="bg-muted text-foreground">
                    <Icon className="h-4 w-4" />
                  </LogoTile>
                }
                title={AISLE_LABEL[aisle]}
                trailing={<span className="text-sm tabular-nums text-muted-foreground">{counts[aisle]}</span>}
              />
            )
          })}
        </ListPanel>
      </section>
    </div>
  )
}

type Tone = 'spotlight' | 'plain'

/** A step's number in a disc — white on the spotlight, grey elsewhere — or the done check. */
function StepMark({ index, done, tone }: { index: number; done: boolean; tone: Tone }) {
  if (done) return <CheckMark className="h-7 w-7" />
  return (
    <span
      aria-hidden
      className={cn(
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold tabular-nums',
        tone === 'spotlight' ? 'bg-white text-[var(--exam-accent-vivid)]' : 'bg-muted text-foreground',
      )}
    >
      {index + 1}
    </span>
  )
}

/** What a step's row says under its title: the registration's state, or how many products answer it. */
function stepSubtitle(step: KitStep, examKey: string, today: string): ReactNode {
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

/** The lowest price a step's products start at, in the first currency listed. */
function stepFrom(step: KitStep): string | null {
  const spans = step.items.map(priceSpan).filter(s => s !== null)
  if (spans.length === 0) return null
  const currency = spans[0]!.currency
  const low = Math.min(...spans.filter(s => s.currency === currency).map(s => s.low))
  return formatPrice({ amount: low, currency: currency as 'USD' | 'CAD' })
}

function StepHeading({ step, index, today, examKey, tone }: { step: KitStep; index: number; today: string; examKey: string; tone: Tone }) {
  return (
    <div className="flex items-start gap-3">
      <StepMark index={index} done={false} tone={tone} />
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-bold leading-tight">{KIT_STEP_TITLE[step.id]}</h3>
        <p className={cn('mt-0.5 text-sm', tone === 'spotlight' ? 'text-white/85' : 'text-muted-foreground')}>
          {stepSubtitle(step, examKey, today)}
        </p>
      </div>
    </div>
  )
}

/** A step in the Then list: a row that opens to its products. */
function StepRow({
  step,
  index,
  first,
  done,
  today,
  examKey,
  onToggle,
  onOpen,
  onCompare,
}: {
  step: KitStep
  index: number
  first: boolean
  done: boolean
  today: string
  examKey: string
  onToggle: () => void
  onOpen: (item: StoreItem) => void
  onCompare: (kinds: StudyKind[], title: string) => void
}) {
  const [open, setOpen] = useState(false)
  const bodyId = useId()
  const from = stepFrom(step)
  return (
    <div className={cn(!first && 'border-t border-border')} data-testid={`store-kit-step-${step.id}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen(o => !o)}
        data-sound="select"
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <StepMark index={index} done={done} tone="plain" />
        <span className="min-w-0 flex-1">
          <span className={cn('block font-semibold', done && 'text-muted-foreground')}>{KIT_STEP_TITLE[step.id]}</span>
          <span className="block truncate text-sm text-muted-foreground">
            {done ? 'Sorted' : stepSubtitle(step, examKey, today)}
          </span>
        </span>
        {from && !done && (
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
      {open && (
        <div id={bodyId} className="px-4 pb-4 sm:pl-14">
          <StepBody step={step} done={done} onToggle={onToggle} onOpen={onOpen} onCompare={onCompare} tone="plain" />
        </div>
      )}
    </div>
  )
}

/** A step opened: its products on one price scale, a comparison where there is a choice, and the tick. */
function StepBody({
  step,
  done,
  onToggle,
  onOpen,
  onCompare,
  tone,
}: {
  step: KitStep
  done: boolean
  onToggle: () => void
  onOpen: (item: StoreItem) => void
  onCompare: (kinds: StudyKind[], title: string) => void
  tone: Tone
}) {
  const spot = tone === 'spotlight'
  const registration = step.id === 'register' && step.items.length === 1 && step.items[0]!.type === 'registration' ? step.items[0]! : null
  const scale = priceScale(step.items)
  const kinds = comparableKinds(step)
  const toggleLabel = done
    ? 'Not sorted yet'
    : step.id === 'register' ? 'I’ve registered' : step.id === 'calculator' ? 'I have one' : 'I have this'

  return (
    <div className="space-y-3">
      {registration ? (
        <div className="flex items-center justify-between gap-3">
          <span className="text-3xl font-bold tabular-nums">{registration.prices[0] ? formatPrice(registration.prices[0]) : null}</span>
          <button
            type="button"
            onClick={() => onOpen(registration)}
            data-sound="open"
            data-testid={`store-item-${registration.id}`}
            className={cn(
              'inline-flex h-11 items-center gap-1 rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              spot ? 'bg-white text-black hover:bg-white/90' : 'bg-foreground text-background hover:bg-foreground/90',
            )}
          >
            Register
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      ) : (
        <div>
          {scale && (
            <div className="flex justify-end pb-1">
              <span className={cn('flex w-24 justify-between text-[10px] font-medium tabular-nums sm:w-32', spot ? 'text-white/75' : 'text-muted-foreground')} aria-hidden>
                <span>$0</span>
                <span>{formatPrice({ amount: scale, currency: 'USD' })}</span>
              </span>
            </div>
          )}
          <ul>
            {step.items.map(item => (
              <li key={item.id} className={cn('border-t', spot ? 'border-white/20' : 'border-border')}>
                <KitOption item={item} scale={scale} tone={tone} onOpen={() => onOpen(item)} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {kinds && (
          <button
            type="button"
            onClick={() => onCompare(kinds, KIT_STEP_TITLE[step.id])}
            data-testid={step.id === 'learn' ? 'store-compare' : `store-compare-${step.id}`}
            className={cn(
              'inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              spot ? 'bg-white text-black hover:bg-white/90' : 'bg-foreground text-background hover:bg-foreground/90',
            )}
          >
            <Columns3 className="h-4 w-4" aria-hidden />
            Compare {step.items.filter(i => i.type === 'study').length}
          </button>
        )}
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={done}
          data-sound="select"
          className={cn(
            'inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            spot ? 'border-white/40 text-white hover:bg-white/10' : 'border-border hover:bg-accent',
          )}
        >
          {toggleLabel}
        </button>
      </div>
    </div>
  )
}

/** One product in a step: its name, seller and price range, with its bar on the step's scale. */
function KitOption({ item, scale, tone, onOpen }: { item: StoreItem; scale: number | null; tone: Tone; onOpen: () => void }) {
  const spot = tone === 'spotlight'
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
    <button
      type="button"
      onClick={onOpen}
      data-sound="open"
      data-testid={`store-item-${item.id}`}
      className={cn(
        '-mx-2 flex w-[calc(100%+1rem)] items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        spot ? 'hover:bg-white/10' : 'hover:bg-accent/50',
      )}
    >
      <span className="min-w-0 flex-1">
        <span className="line-clamp-2 text-sm font-semibold leading-snug">{item.name}</span>
        <span className={cn('block truncate text-xs', spot ? 'text-white/80' : 'text-muted-foreground')}>
          {[seller?.name, range].filter(Boolean).join(' · ')}
        </span>
      </span>
      {scale && (
        <span className={cn('relative h-1.5 w-24 shrink-0 rounded-full sm:w-32', spot ? 'bg-white/25' : 'bg-muted')} aria-hidden>
          {bar && (
            <span
              className={cn('absolute top-0 h-1.5 min-w-[6px] rounded-full', spot ? 'bg-white' : 'bg-[var(--exam-accent-vivid)]')}
              style={{ left: `${bar.left}%`, width: `${bar.width}%` }}
            />
          )}
        </span>
      )}
    </button>
  )
}
