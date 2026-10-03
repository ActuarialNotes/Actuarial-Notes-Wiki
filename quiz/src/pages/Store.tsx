import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { BookMarked, Calculator, ChevronRight, Columns3, Gem, Layers, ShoppingBag, Ticket, X, type LucideIcon } from 'lucide-react'
import booksBundle from 'virtual:store-books'
import { ExamLogo } from '@/components/ExamLogo'
import { LogoTile } from '@/components/LogoTile'
import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { BookCard, ProductCard, RegistrationTicket } from '@/components/store/StoreCards'
import { ProductSheet } from '@/components/store/ProductSheet'
import { CompareSheet } from '@/components/store/CompareSheet'
import { MultiSelectDropdown } from '@/components/MultiSelectDropdown'
import { STORE_REVIEWS } from '@/data/storeReviews'
import { CALCULATORS, STUDY_PRODUCTS } from '@/data/storeCatalog'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { useAuth } from '@/hooks/useAuth'
import { useGems } from '@/hooks/useGems'
import { usePageHead } from '@/hooks/usePageHead'
import { STORE_HEAD } from '@/lib/seo'
import { examAccentStyle } from '@/lib/examColors'
import {
  AISLE_LABEL,
  PRICE_BANDS,
  STORE_AISLES,
  aisleCounts,
  buildStoreItems,
  comparableExams,
  hasRefinement,
  makerOptions,
  parsePriceBands,
  reviewsFor,
  type PriceBand,
  type ShelfFilter,
  isoDay,
  parseAisle,
  parseStoreExam,
  registrationUrgency,
  showcase,
  stockedExams,
  storeExam,
  storeDisclaimer,
  storeShelf,
  type StoreAisle,
  type StoreExam,
  type StoreItem,
} from '@/lib/store'
import { cn } from '@/lib/utils'

/** The gem shop's tabs, which used to live at `/store?tab=…` — sent on to `/store/gems`. */
const GEM_SHOP_TABS = new Set(['characters', 'skins', 'banners', 'ships'])

const AISLE_ICON: Record<StoreAisle, LucideIcon> = {
  registration: Ticket,
  study: Layers,
  calculators: Calculator,
  textbooks: BookMarked,
}

/** How many of an aisle the "everything" view shows before "See all". */
const SHELF_PREVIEW = 6

/**
 * The **Store** (`/store`) — real products an actuarial candidate buys,
 * gathered by exam: registration, study materials, the calculators the exams
 * allow, and the syllabus textbooks. Nothing is sold here: every product opens
 * a sheet of what its seller says about it, and the sheet's one button goes to
 * the seller's own page (docs/store.md).
 *
 * Two choices narrow the shelf, and both ride the URL (`?exam=FM&aisle=study`)
 * so Back and a shared link keep them: the **exam** — a strip of the ladder's
 * own logos, blue at Exam P to red at Exam 9 — and the **aisle**. With no
 * aisle chosen each aisle shows its first few products and a way to see the
 * rest, so the Store reads as four shelves rather than one long list.
 */
export default function Store() {
  usePageHead(STORE_HEAD)
  const [params, setParams] = useSearchParams()
  const exam = parseStoreExam(params.get('exam'))
  const aisle = parseAisle(params.get('aisle'))
  const free = params.get('free') === '1'
  const prices = useMemo(() => parsePriceBands(params.getAll('price')), [params])
  const makers = useMemo(() => params.getAll('by'), [params])
  const [comparing, setComparing] = useState<string | null>(null)
  const [today] = useState(() => isoDay(new Date()))
  const [open, setOpen] = useState<StoreItem | null>(null)
  const shelfTop = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const { balance } = useGems()
  const { progress } = useExamProgress()

  const items = useMemo(() => buildStoreItems({ study: STUDY_PRODUCTS, calculators: CALCULATORS }, booksBundle), [])
  const exams = useMemo(() => stockedExams(items), [items])
  const filter: ShelfFilter = useMemo(() => ({ exam, aisle, free, prices, makers }), [exam, aisle, free, prices, makers])
  const refined = hasRefinement(filter)
  const shelf = useMemo(() => storeShelf(items, filter), [items, filter])
  const counts = useMemo(() => aisleCounts(items, { ...filter, aisle: null }), [items, filter])
  const comparable = useMemo(() => comparableExams(items), [items])
  const reviewCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const item of items) counts.set(item.id, reviewsFor(item.id, STORE_REVIEWS).length)
    return counts
  }, [items])
  const studying = useMemo(
    () => new Set(Object.entries(progress).filter(([, status]) => status === 'in_progress').map(([key]) => key)),
    [progress],
  )

  // A filter is the same page showing something else: it replaces the history
  // entry rather than stacking one per tap (as the Resources shelf does).
  function choose(next: { exam?: string | null; aisle?: StoreAisle | null }) {
    const p = new URLSearchParams(params)
    const nextExam = next.exam === undefined ? exam : next.exam
    const nextAisle = next.aisle === undefined ? aisle : next.aisle
    if (nextExam) p.set('exam', nextExam)
    else p.delete('exam')
    if (nextAisle) p.set('aisle', nextAisle)
    else p.delete('aisle')
    setParams(p, { replace: true })
  }

  // The refinements: free, price bands and makers, each its own param
  // (`?free=1&price=under-100&by=ACTEX+Learning`), repeated for several.
  function refine(next: { free?: boolean; prices?: readonly PriceBand[]; makers?: readonly string[] }) {
    const p = new URLSearchParams(params)
    if (next.free !== undefined) {
      if (next.free) p.set('free', '1')
      else p.delete('free')
    }
    if (next.prices) {
      p.delete('price')
      for (const band of next.prices) p.append('price', band)
    }
    if (next.makers) {
      p.delete('by')
      for (const name of next.makers) p.append('by', name)
    }
    setParams(p, { replace: true })
  }
  const toggle = <T,>(list: readonly T[], value: T) => (list.includes(value) ? list.filter(v => v !== value) : [...list, value])
  const options = makerOptions(items, filter)
  const compareExam = comparing ?? null
  function openCompare() {
    const start = exam && comparable.some(e => e.key === exam) ? exam : [...studying].find(k => comparable.some(e => e.key === k)) ?? comparable[0]?.key ?? null
    setComparing(start)
  }

  // "See all" lands on the top of the shelf it opened, not halfway down it.
  function seeAll(a: StoreAisle) {
    choose({ aisle: a })
    requestAnimationFrame(() => {
      const top = shelfTop.current
      if (!top || top.getBoundingClientRect().top >= 0) return
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      top.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
    })
  }

  // Links into the old Store, which was the gem shop: `/store?tab=ships`.
  const legacyTab = params.get('tab')
  if (legacyTab && GEM_SHOP_TABS.has(legacyTab)) return <Navigate to={`/store/gems?tab=${legacyTab}`} replace />

  const examName = exam ? storeExam(exam)?.name : null

  return (
    <div className="container mx-auto max-w-5xl space-y-6 px-4 py-8">
      <header className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="min-w-0 flex-1 text-2xl font-bold tracking-tight">Store</h1>
          <Link
            to="/store/gems"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-500/20 dark:text-emerald-300"
          >
            <Gem className="h-4 w-4" aria-hidden />
            Gem Shop
            {user && <span className="tabular-nums">· {balance.toLocaleString()}</span>}
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          Registration, study materials, calculators and textbooks — each bought from the people who sell it.
        </p>
      </header>

      <ExamStrip exams={exams} value={exam} studying={studying} onChange={key => choose({ exam: key })} />

      <div ref={shelfTop} className="scroll-mt-16 lg:scroll-mt-2" />
      <AisleNav value={aisle} counts={counts} onChange={a => choose({ aisle: a })} />

      <div className="-mt-3 flex flex-wrap items-center gap-2" data-testid="store-filters">
        <button
          type="button"
          aria-pressed={free}
          onClick={() => refine({ free: !free })}
          data-sound="select"
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            free ? 'border-green-600 bg-green-600 text-white' : 'bg-card hover:bg-accent',
          )}
        >
          Free
        </button>
        <MultiSelectDropdown
          label="Price"
          surface="card"
          options={PRICE_BANDS.map(b => ({ value: b.id, label: b.label }))}
          selected={new Set(prices)}
          onToggle={v => refine({ prices: toggle(prices, v as PriceBand) })}
        />
        <MultiSelectDropdown
          label="Publisher / author"
          surface="card"
          options={[
            ...options.publishers.map(([name]) => ({ value: name, label: name, group: 'Publishers' })),
            ...options.authors.filter(([name]) => !options.publishers.some(([p]) => p === name)).map(([name]) => ({ value: name, label: name, group: 'Authors' })),
          ]}
          selected={new Set(makers)}
          onToggle={v => refine({ makers: toggle(makers, v) })}
          getCount={v => (options.publishers.find(([n]) => n === v) ?? options.authors.find(([n]) => n === v))?.[1] ?? 0}
          emptyTitle="Nothing on this shelf names a publisher or author"
        />
        {refined && (
          <button
            type="button"
            onClick={() => refine({ free: false, prices: [], makers: [] })}
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
            Clear
          </button>
        )}
        {comparable.length > 0 && (
          <button
            type="button"
            onClick={openCompare}
            data-testid="store-compare"
            className="ml-auto inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Columns3 className="h-4 w-4" aria-hidden />
            Compare study materials
          </button>
        )}
      </div>

      {shelf.length === 0 ? (
        <EmptyAisle
          examName={examName ?? null}
          aisle={aisle}
          refined={refined}
          onReset={() => (refined ? refine({ free: false, prices: [], makers: [] }) : choose({ aisle: null }))}
        />
      ) : (
        <div className="space-y-10">
          {shelf.map(group => {
            const preview = !aisle && !refined && group.items.length > SHELF_PREVIEW + 1
            // The front shelf, for every exam, shows the range up the ladder;
            // narrowed to one exam it shows that exam's own first few.
            // Registration leads with what is open now, soonest deadline first.
            const shown = !preview
              ? group.items
              : exam
                ? group.items.slice(0, SHELF_PREVIEW)
                : group.aisle === 'registration'
                  ? registrationUrgency(group.items, today).slice(0, SHELF_PREVIEW)
                  : showcase(group.items, SHELF_PREVIEW)
            return (
              <Aisle
                key={group.aisle}
                aisle={group.aisle}
                count={group.items.length}
                action={preview ? (
                  <button
                    type="button"
                    onClick={() => seeAll(group.aisle)}
                    className="inline-flex items-center gap-0.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    See all {group.items.length}
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </button>
                ) : null}
              >
                {shown.map(item =>
                  item.aisle === 'registration' ? (
                    <RegistrationTicket key={item.id} item={item} today={today} onOpen={() => setOpen(item)} />
                  ) : item.type === 'book' ? (
                    <BookCard key={item.id} item={item} onOpen={() => setOpen(item)} />
                  ) : (
                    <ProductCard key={item.id} item={item} reviewCount={reviewCounts.get(item.id) ?? 0} onOpen={() => setOpen(item)} />
                  ),
                )}
              </Aisle>
            )
          })}
        </div>
      )}

      <ListPanel>
        <ListRow
          to="/store/gems"
          leading={
            <LogoTile size="lg" className="bg-emerald-500 text-white shadow-sm">
              <Gem className="h-6 w-6" />
            </LogoTile>
          }
          title="Gem Shop"
          subtitle="Spend the gems you earn on characters, skins and banners"
          trailing={user ? <span className="text-sm font-semibold tabular-nums text-emerald-700 dark:text-emerald-300">{balance.toLocaleString()}</span> : undefined}
        />
      </ListPanel>

      <footer className="mx-auto max-w-2xl space-y-1.5 text-[11px] leading-relaxed text-muted-foreground" data-testid="store-disclaimer">
        <h2 className="font-semibold uppercase tracking-wider">Disclaimer</h2>
        {storeDisclaimer(null, null).map(p => <p key={p}>{p}</p>)}
      </footer>

      {open && <ProductSheet item={open} today={today} onClose={() => setOpen(null)} />}
      {compareExam && (
        <CompareSheet
          items={items}
          exams={comparable}
          examKey={compareExam}
          onExam={setComparing}
          onOpen={item => {
            setComparing(null)
            setOpen(item)
          }}
          onClose={() => setComparing(null)}
        />
      )}
    </div>
  )
}

/**
 * The exams, as the ladder's logos left to right — the accent ramp from blue
 * to red — with **All** first. A radiogroup: one tab stop, arrows move. An
 * exam the reader is studying carries a dot.
 */
function ExamStrip({
  exams,
  value,
  studying,
  onChange,
}: {
  exams: readonly StoreExam[]
  value: string | null
  studying: ReadonlySet<string>
  onChange: (key: string | null) => void
}) {
  const groupRef = useRef<HTMLDivElement>(null)
  const choices: (string | null)[] = [null, ...exams.map(e => e.key)]

  function onKeyDown(e: ReactKeyboardEvent) {
    const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (delta === 0) return
    e.preventDefault()
    const at = choices.indexOf(value)
    const next = choices[(at + delta + choices.length) % choices.length] ?? null
    onChange(next)
    groupRef.current?.querySelector<HTMLElement>(`[data-exam="${next ?? 'all'}"]`)?.focus()
  }

  // Keep the chosen exam in view when the strip scrolls sideways (a phone).
  // The strip alone scrolls, never the page: `scrollIntoView` would also move
  // the window, and fight the router putting a returning reader back where
  // they were (lib/routeScrollMemory.ts).
  useEffect(() => {
    const strip = groupRef.current
    const el = strip?.querySelector<HTMLElement>(`[data-exam="${value ?? 'all'}"]`)
    if (!strip || !el || strip.scrollWidth <= strip.clientWidth) return
    const left = el.offsetLeft - (strip.clientWidth - el.offsetWidth) / 2
    strip.scrollTo({ left: Math.max(0, left) })
  }, [value])

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label="Exam"
      onKeyDown={onKeyDown}
      className="relative -mx-4 flex gap-1 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:flex-wrap [&::-webkit-scrollbar]:hidden"
    >
      <ExamChoice id="all" ariaLabel="All exams" active={value === null} onSelect={() => onChange(null)}>
        <LogoTile size="md" className="bg-foreground text-[13px] font-bold text-background shadow-sm">
          All
        </LogoTile>
      </ExamChoice>
      {exams.map(exam => (
        <ExamChoice
          key={exam.key}
          id={exam.key}
          ariaLabel={exam.name}
          active={value === exam.key}
          dimmed={value !== null && value !== exam.key}
          studying={studying.has(exam.key)}
          accent={exam.key}
          onSelect={() => onChange(value === exam.key ? null : exam.key)}
        >
          <ExamLogo examKey={exam.key} size="md" />
        </ExamChoice>
      ))}
    </div>
  )
}

function ExamChoice({
  id,
  ariaLabel,
  active,
  dimmed,
  studying,
  accent,
  onSelect,
  children,
}: {
  id: string
  ariaLabel: string
  active: boolean
  dimmed?: boolean
  studying?: boolean
  accent?: string
  onSelect: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      aria-label={`${ariaLabel}${studying ? ' (studying)' : ''}`}
      title={ariaLabel}
      tabIndex={active ? 0 : -1}
      data-exam={id}
      onClick={onSelect}
      style={accent ? examAccentStyle(accent) : undefined}
      className={cn(
        'group relative flex shrink-0 items-center justify-center rounded-xl p-1.5 transition-[background-color,opacity] duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        active
          ? accent
            ? 'bg-[var(--exam-accent-soft)] ring-1 ring-[var(--exam-accent-muted)]'
            : 'bg-accent'
          : 'hover:bg-accent/60',
        dimmed && 'opacity-55 hover:opacity-100',
      )}
    >
      <span className="transition-transform duration-200 ease-out motion-safe:group-hover:-translate-y-0.5">{children}</span>
      {studying && (
        <span className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" aria-hidden />
      )}
    </button>
  )
}

/** The aisle pills, pinned under the app header as the shelf scrolls past. */
function AisleNav({
  value,
  counts,
  onChange,
}: {
  value: StoreAisle | null
  counts: Record<StoreAisle, number>
  onChange: (aisle: StoreAisle | null) => void
}) {
  const total = STORE_AISLES.reduce((n, a) => n + counts[a], 0)
  return (
    <nav
      aria-label="Aisles"
      className="sticky top-14 z-20 -mx-4 flex gap-2 overflow-x-auto bg-background/95 px-4 py-2 backdrop-blur-sm [scrollbar-width:none] lg:top-0 [&::-webkit-scrollbar]:hidden"
    >
      <AislePill active={value === null} onClick={() => onChange(null)} count={total}>
        Everything
      </AislePill>
      {STORE_AISLES.map(a => {
        const Icon = AISLE_ICON[a]
        return (
          <AislePill key={a} active={value === a} disabled={counts[a] === 0} onClick={() => onChange(value === a ? null : a)} count={counts[a]}>
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {AISLE_LABEL[a]}
          </AislePill>
        )
      })}
    </nav>
  )
}

function AislePill({
  active,
  disabled,
  count,
  onClick,
  children,
}: {
  active: boolean
  disabled?: boolean
  count: number
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      data-sound="select"
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40',
        active ? 'bg-primary text-primary-foreground' : 'bg-accent text-foreground hover:bg-accent/80',
      )}
    >
      {children}
      <span className={cn('text-xs tabular-nums', active ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{count}</span>
    </button>
  )
}

function Aisle({ aisle, count, action, children }: { aisle: StoreAisle; count: number; action?: ReactNode; children: ReactNode }) {
  const Icon = AISLE_ICON[aisle]
  return (
    <section aria-labelledby={`aisle-${aisle}`} className="space-y-3" data-testid={`aisle-${aisle}`}>
      <div className="flex items-center gap-2.5">
        <LogoTile size="sm" className="bg-muted text-foreground">
          <Icon className="h-4 w-4" />
        </LogoTile>
        <h2 id={`aisle-${aisle}`} className="text-lg font-semibold tracking-tight">
          {AISLE_LABEL[aisle]}
        </h2>
        <span className="text-sm tabular-nums text-muted-foreground">{count}</span>
        {action && <span className="ml-auto">{action}</span>}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  )
}

function EmptyAisle({ examName, aisle, refined, onReset }: { examName: string | null; aisle: StoreAisle | null; refined: boolean; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed px-4 py-12 text-center">
      <LogoTile size="lg" className="bg-primary/10 text-foreground">
        <ShoppingBag className="h-6 w-6" />
      </LogoTile>
      <p className="text-sm font-medium">
        Nothing in {aisle ? AISLE_LABEL[aisle].toLowerCase() : 'the Store'}
        {examName ? ` for ${examName}` : ''}
        {refined ? ' matches these filters.' : ' yet.'}
      </p>
      {(aisle || refined) && (
        <button
          type="button"
          onClick={onReset}
          className="rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          {refined ? 'Clear the filters' : 'Show every aisle'}
        </button>
      )}
    </div>
  )
}
