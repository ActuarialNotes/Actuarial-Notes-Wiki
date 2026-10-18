import { useMemo, useRef, useState, type ReactNode } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { BookMarked, Calculator, ChevronRight, Columns3, Layers, ShoppingBag, Ticket, X, type LucideIcon } from 'lucide-react'
import booksBundle from 'virtual:store-books'
import { ExamStrip } from '@/components/ExamStrip'
import { ExamVariantPicker } from '@/components/ExamVariantPicker'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { StoreSearchBar } from '@/components/store/StoreSearchBar'
import { LogoTile } from '@/components/LogoTile'
import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { BookCard, ProductCard, RegistrationTicket } from '@/components/store/StoreCards'
import { ProductSheet } from '@/components/store/ProductSheet'
import { CompareSheet } from '@/components/store/CompareSheet'
import { MultiSelectDropdown } from '@/components/MultiSelectDropdown'
import { STORE_REVIEWS } from '@/data/storeReviews'
import { CALCULATORS, STUDY_PRODUCTS } from '@/data/storeCatalog'
import { useExamProgress } from '@/contexts/examProgress'
import { useSubscription } from '@/hooks/useSubscription'
import { ProBadge } from '@/components/ProBadge'
import { usePageHead } from '@/hooks/usePageHead'
import { STORE_HEAD } from '@/lib/seo'
import { defaultBody, loadBody, saveBody, type ExamBody } from '@/lib/bodyFilter'
import { variantRegion } from '@/lib/examVariants'
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
  storeBodyForExam,
  storeExam,
  storeDisclaimer,
  storeShelf,
  type StoreAisle,
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
 * Its header is the Resources page's: the search bar on top (`?q=`), the title
 * with the **SOA / CAS** picker beside it (the same stored choice as the Study
 * Guides and Quiz tabs, `lib/bodyFilter.ts`), and the strip of that body's exam
 * logos under it. An exam sat under a syllabus per region (Exam 6) is one logo,
 * and choosing it puts a **region** picker under the strip (`?region=6C`).
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
  const variants = (exam && storeExam(exam)?.variants) || null
  const regionParam = params.get('region')
  const variant = variants && regionParam && variants.includes(regionParam) ? regionParam : null
  const query = params.get('q') ?? ''
  const aisle = parseAisle(params.get('aisle'))
  const free = params.get('free') === '1'
  const prices = useMemo(() => parsePriceBands(params.getAll('price')), [params])
  const makers = useMemo(() => params.getAll('by'), [params])
  const [comparing, setComparing] = useState<string | null>(null)
  const [today] = useState(() => isoDay(new Date()))
  const [open, setOpen] = useState<StoreItem | null>(null)
  const shelfTop = useRef<HTMLDivElement>(null)
  const { isPro } = useSubscription()
  const { progress, selectedTrack } = useExamProgress()
  // The SOA/CAS picker the Study Guides and Quiz tabs carry, the same stored
  // choice (`lib/bodyFilter.ts`); an exam in the URL opens on its own ladder.
  const [bodyOverride, setBodyOverride] = useState<ExamBody | null>(loadBody)
  const body = storeBodyForExam(exam, bodyOverride ?? defaultBody(selectedTrack))

  const items = useMemo(() => buildStoreItems({ study: STUDY_PRODUCTS, calculators: CALCULATORS }, booksBundle), [])
  const exams = useMemo(() => stockedExams(items, body), [items, body])
  const filter: ShelfFilter = useMemo(
    () => ({ exam, aisle, free, prices, makers, body, variant, query }),
    [exam, aisle, free, prices, makers, body, variant, query],
  )
  const refined = hasRefinement(filter)
  const shelf = useMemo(() => storeShelf(items, filter), [items, filter])
  const counts = useMemo(() => aisleCounts(items, { ...filter, aisle: null }), [items, filter])
  // The comparison table's exam strip is the body's ladder, like the shelf's.
  const comparable = useMemo(() => comparableExams(items).filter(e => e.ladders.includes(body)), [items, body])
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
    // A region is one exam's: another exam starts on all of its own.
    if (nextExam !== exam) p.delete('region')
    if (nextAisle) p.set('aisle', nextAisle)
    else p.delete('aisle')
    setParams(p, { replace: true })
  }

  // The refinements: free, price bands and makers, each its own param
  // (`?free=1&price=under-100&by=ACTEX+Learning`), repeated for several.
  function refine(next: { free?: boolean; prices?: readonly PriceBand[]; makers?: readonly string[]; query?: string }) {
    const p = new URLSearchParams(params)
    if (next.query === '') p.delete('q')
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
  // The search and the region ride the URL like every other choice.
  function setParam(key: 'q' | 'region', value: string | null) {
    const p = new URLSearchParams(params)
    if (value) p.set(key, value)
    else p.delete(key)
    setParams(p, { replace: true })
  }

  // The other body's ladder may not hold the chosen exam, so the choice goes.
  function chooseBody(next: ExamBody) {
    saveBody(next)
    setBodyOverride(next)
    if (exam && !storeExam(exam)?.ladders.includes(next)) choose({ exam: null })
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

  // Actuarial Notes' own offer leads the study materials, ahead of what other
  // people sell.
  const proRow = (
    <ListPanel>
      <ListRow
        to="/upgrade"
        leading={
          <LogoTile size="lg" className="bg-foreground text-background shadow-sm">
            <ProBadge size="md" className="bg-background text-foreground" />
          </LogoTile>
        }
        title="Actuarial Notes Pro"
        subtitle="A daily study plan paced to your exam date, so you walk in confident"
        trailing={
          isPro
            ? <span className="text-sm font-semibold text-green-700 dark:text-green-400">Active</span>
            : <span className="text-sm font-semibold tabular-nums">$10 / month</span>
        }
      />
    </ListPanel>
  )

  return (
    <>
      <StoreSearchBar query={query} onQuery={q => setParam('q', q || null)} />
      <div className="container mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        {/* The Resources page's title row, picker and all. */}
        <header className="flex items-center gap-2">
          <h1 className="min-w-0 flex-1 truncate text-2xl font-bold tracking-tight">Shop</h1>
          <SegmentedControl
            label="Examining body"
            size="lg"
            pill
            value={body}
            onChange={chooseBody}
            options={[
              { value: 'SOA', label: 'SOA' },
              { value: 'CAS', label: 'CAS' },
            ]}
            className="shrink-0"
          />
        </header>

        <ExamStrip
          exams={exams.map(e => ({ value: e.key, name: e.name, logoKey: e.key }))}
          value={exam}
          studying={studying}
          onChange={key => choose({ exam: key })}
          className="sm:-mx-6 sm:px-6"
        />

        {variants && examName && (
          <ExamVariantPicker
            className="-mt-3"
            examName={examName}
            options={variants.map(v => ({ value: v, label: variantRegion(v) ?? v }))}
            value={variant}
            onChange={v => setParam('region', v)}
          />
        )}

        <div ref={shelfTop} className="scroll-mt-16" />
        <AisleNav value={aisle} counts={counts} onChange={a => choose({ aisle: a })} />

        {/* The refinements, one row of pills under the aisles. Registration is
            one fee per exam — nothing to narrow by price or maker — so it has none. */}
        {aisle !== 'registration' && (
          <div className="-mt-3 flex flex-wrap items-center gap-2" data-testid="store-filters">
            <button
              type="button"
              aria-pressed={free}
              onClick={() => refine({ free: !free })}
              data-sound="select"
              className={cn(
                'inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                free ? 'border-primary/40 bg-primary/10 text-primary' : 'bg-card hover:bg-accent',
              )}
            >
              Free
            </button>
            <MultiSelectDropdown
              label="Price"
              surface="card"
              shape="pill"
              options={PRICE_BANDS.map(b => ({ value: b.id, label: b.label }))}
              selected={new Set(prices)}
              onToggle={v => refine({ prices: toggle(prices, v as PriceBand) })}
            />
            <MultiSelectDropdown
              label="Publisher"
              surface="card"
              shape="pill"
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
                onClick={() => refine({ free: false, prices: [], makers: [], query: '' })}
                className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
                Clear
              </button>
            )}
          </div>
        )}

        {shelf.length === 0 ? (
          <EmptyAisle
            examName={examName ?? null}
            aisle={aisle}
            refined={refined}
            onReset={() => (refined ? refine({ free: false, prices: [], makers: [], query: '' }) : choose({ aisle: null }))}
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
              // Comparing is a study-materials question, so it lives in that
              // aisle's heading rather than in the filter row. It is the
              // heading's one action, so it is drawn as a button — filled,
              // labelled at every width, and a full touch target tall.
              const compare = group.aisle === 'study' && comparable.length > 0 ? (
                <button
                  type="button"
                  onClick={openCompare}
                  data-testid="store-compare"
                  aria-label="Compare study materials"
                  title="Compare study materials"
                  className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Columns3 className="h-4 w-4" aria-hidden />
                  Compare
                </button>
              ) : null
              const more = preview ? (
                <button
                  type="button"
                  onClick={() => seeAll(group.aisle)}
                  className="inline-flex items-center gap-0.5 whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  See all
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </button>
              ) : null
              return (
                <Aisle
                  key={group.aisle}
                  aisle={group.aisle}
                  count={group.items.length}
                  // One aisle chosen, its pill already names it: the heading
                  // would only say it again, unless it carries a control.
                  heading={!aisle || !!compare}
                  action={compare || more ? <span className="flex items-center gap-3">{compare}{more}</span> : null}
                  lead={group.aisle === 'study' ? proRow : undefined}
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
    </>
  )
}

/** The aisle pills, pinned under the search bar as the shelf scrolls past. */
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
      className="sticky top-14 z-20 -mx-4 flex gap-2 overflow-x-auto bg-background/95 px-4 py-2 backdrop-blur-sm [scrollbar-width:none] sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
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

function Aisle({ aisle, count, heading = true, action, lead, children }: { aisle: StoreAisle; count: number; heading?: boolean; action?: ReactNode; lead?: ReactNode; children: ReactNode }) {
  const Icon = AISLE_ICON[aisle]
  return (
    <section aria-labelledby={`aisle-${aisle}`} aria-label={heading ? undefined : AISLE_LABEL[aisle]} className="space-y-3" data-testid={`aisle-${aisle}`}>
      <div className={cn('flex items-center gap-2.5', !heading && 'sr-only')}>
        <LogoTile size="sm" className="bg-muted text-foreground">
          <Icon className="h-4 w-4" />
        </LogoTile>
        <h2 id={`aisle-${aisle}`} className="min-w-0 truncate text-lg font-semibold tracking-tight">
          {AISLE_LABEL[aisle]}
        </h2>
        <span className="text-sm tabular-nums text-muted-foreground">{count}</span>
        {action && <span className="ml-auto shrink-0">{action}</span>}
      </div>
      {lead}
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
        Nothing in {aisle ? AISLE_LABEL[aisle].toLowerCase() : 'the Shop'}
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
