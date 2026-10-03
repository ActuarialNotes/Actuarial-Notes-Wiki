// The comparison table — one exam's study materials side by side, so a reader
// choosing between a manual, a video course and a practice bank can read
// across rather than open twelve sheets.
//
// A column per product (cheapest first within each kind, `comparisonFor`), a
// row per thing the sellers state: the kind, the price, how many options it is
// sold in, what's included, every fact any of them prints ("Format",
// "Access", "By", "Edition"), the reviews and the date the page was read. A
// cell a seller doesn't fill is left blank — the Store's rule, transcribed
// never constructed (docs/store.md) — and the table says so in a dash rather
// than guessing.
//
// The product names open the full sheet; each column ends in its seller's
// link. Same shell as the product sheet (`useStoreDialog`).

import { useId, useMemo, useState, type ReactNode } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { CheckMark } from '@/components/CheckMark'
import { ExamLogo } from '@/components/ExamLogo'
import { ArtStage, StudyArt } from '@/components/store/ProductArt'
import { SellerLogo } from '@/components/store/SellerLogo'
import { useStoreDialog } from '@/components/store/useStoreDialog'
import { STORE_SELLERS } from '@/data/storeCatalog'
import { REVIEW_SOURCES, STORE_REVIEWS } from '@/data/storeReviews'
import { trackStoreOutbound } from '@/lib/analytics'
import {
  STUDY_KIND_LABEL,
  STUDY_KIND_ORDER,
  comparisonFactLabels,
  comparisonFor,
  formatPrice,
  lowestPrice,
  priceSummary,
  reviewTally,
  reviewsFor,
  shortDate,
  storeDisclaimer,
  type StoreExam,
  type StoreItem,
  type StudyItem,
  type StudyKind,
} from '@/lib/store'
import { cn } from '@/lib/utils'

/** How many of a product's "what's included" lines a cell shows before "+N more". */
const INCLUDES_SHOWN = 5

export function CompareSheet({
  items,
  exams,
  examKey,
  onExam,
  onOpen,
  onClose,
}: {
  items: readonly StoreItem[]
  /** The exams with something to compare, in ladder order. */
  exams: readonly StoreExam[]
  examKey: string
  onExam: (key: string) => void
  /** Open a product's full sheet (the comparison closes behind it). */
  onOpen: (item: StoreItem) => void
  onClose: () => void
}) {
  const titleId = useId()
  const { panelRef, closeRef } = useStoreDialog(onClose)
  const [kind, setKind] = useState<StudyKind | null>(null)

  const all = useMemo(() => comparisonFor(items, examKey), [items, examKey])
  const kinds = STUDY_KIND_ORDER.filter(k => all.some(i => i.study.kind === k))
  const shown = kind && kinds.includes(kind) ? all.filter(i => i.study.kind === kind) : all
  const labels = comparisonFactLabels(shown.map(i => i.study))
  const cheapest = Math.min(...shown.map(i => lowestPrice(i) ?? Infinity))
  const examName = exams.find(e => e.key === examKey)?.name ?? examKey

  return (
    <OverlayPortal>
      <div
        className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4 paper-scrim"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
        <div
          ref={panelRef}
          data-testid="store-compare-sheet"
          className="relative z-10 flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-card text-card-foreground shadow-2xl sm:max-h-[90vh] sm:max-w-6xl sm:rounded-2xl"
        >
          <header className="shrink-0 space-y-3 border-b border-border px-5 pb-3 pt-4">
            <div className="flex items-start gap-3">
              <h2 id={titleId} className="min-w-0 flex-1 text-lg font-semibold leading-tight tracking-tight">
                Compare study materials
                <span className="block text-sm font-normal text-muted-foreground">
                  {examName} · {shown.length} of {all.length}
                </span>
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div role="radiogroup" aria-label="Exam" className="-mx-5 flex gap-1 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {exams.map(exam => (
                <button
                  key={exam.key}
                  type="button"
                  role="radio"
                  aria-checked={exam.key === examKey}
                  aria-label={exam.name}
                  title={exam.name}
                  onClick={() => {
                    setKind(null)
                    onExam(exam.key)
                  }}
                  className={cn(
                    'shrink-0 rounded-lg p-1 transition-[background-color,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    exam.key === examKey ? 'bg-accent' : 'opacity-55 hover:opacity-100',
                  )}
                >
                  <ExamLogo examKey={exam.key} size="sm" />
                </button>
              ))}
            </div>
            {kinds.length > 1 && (
              <div className="flex flex-wrap gap-1.5">
                {[null, ...kinds].map(k => (
                  <button
                    key={k ?? 'all'}
                    type="button"
                    aria-pressed={kind === k}
                    onClick={() => setKind(k)}
                    data-sound="select"
                    className={cn(
                      'rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
                      kind === k ? 'bg-primary text-primary-foreground' : 'bg-accent hover:bg-accent/80',
                    )}
                  >
                    {k ? STUDY_KIND_LABEL[k] : 'All kinds'}
                  </button>
                ))}
              </div>
            )}
          </header>

          <div className="min-h-0 flex-1 overflow-auto overscroll-contain">
            <table className="w-max min-w-full border-separate border-spacing-0 text-left text-sm">
              <thead>
                <tr>
                  <th scope="col" className={cn(ROW_HEAD, 'z-30 align-bottom')}>
                    <span className="sr-only">Product</span>
                  </th>
                  {shown.map(item => (
                    <th key={item.id} scope="col" className="sticky top-0 z-20 w-52 min-w-[13rem] border-b border-border bg-card p-3 align-top font-normal">
                      <ProductHead item={item} onOpen={() => onOpen(item)} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <Row label="Kind">{shown.map(i => <Cell key={i.id}>{STUDY_KIND_LABEL[i.study.kind]}</Cell>)}</Row>
                <Row label="Price">
                  {shown.map(i => (
                    <Cell key={i.id}>
                      <PriceCell item={i} cheapest={shown.length > 1 && lowestPrice(i) === cheapest} />
                    </Cell>
                  ))}
                </Row>
                <Row label="Options">
                  {shown.map(i => {
                    const options = i.study.offer.options ?? []
                    return <Cell key={i.id}>{options.length > 1 ? `${options.length} to choose from` : options.length === 1 ? options[0]!.name : null}</Cell>
                  })}
                </Row>
                <Row label="What’s included">
                  {shown.map(i => (
                    <Cell key={i.id}>
                      <Included lines={i.study.includes ?? []} />
                    </Cell>
                  ))}
                </Row>
                {labels.map(label => (
                  <Row key={label} label={label === 'By' ? 'Author' : label}>
                    {shown.map(i => (
                      <Cell key={i.id}>{i.study.facts?.filter(f => f.label === label).map(f => f.value).join('; ') || null}</Cell>
                    ))}
                  </Row>
                ))}
                <Row label="Exam windows">
                  {shown.map(i => <Cell key={i.id}>{i.study.windows?.length ? i.study.windows.join('; ') : null}</Cell>)}
                </Row>
                <Row label="Reviews">
                  {shown.map(i => (
                    <Cell key={i.id}>
                      <ReviewsCell item={i} />
                    </Cell>
                  ))}
                </Row>
                <Row label="Price checked">
                  {shown.map(i => <Cell key={i.id}>{shortDate(i.study.offer.checked)}</Cell>)}
                </Row>
                <Row label="">
                  {shown.map(i => (
                    <Cell key={i.id}>
                      <a
                        href={i.study.offer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-sound="open"
                        onClick={() => trackStoreOutbound({ product: i.id, seller: i.study.offer.sellerId, aisle: i.aisle })}
                        className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        {STORE_SELLERS[i.study.offer.sellerId]?.short ?? 'Seller'}’s page
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    </Cell>
                  ))}
                </Row>
              </tbody>
            </table>

            <div className="space-y-1.5 px-5 py-4 text-[11px] leading-relaxed text-muted-foreground" data-testid="store-disclaimer">
              {storeDisclaimer(null, null).map(p => <p key={p}>{p}</p>)}
            </div>
          </div>
        </div>
      </div>
    </OverlayPortal>
  )
}

const ROW_HEAD =
  'sticky left-0 top-0 w-28 min-w-[7rem] border-b border-r border-border bg-card px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground sm:w-36 sm:min-w-[9rem]'

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <tr>
      <th scope="row" className={cn(ROW_HEAD, 'z-10 align-top')}>
        {label}
      </th>
      {children}
    </tr>
  )
}

function Cell({ children }: { children: ReactNode }) {
  const empty = children === null || children === undefined || children === ''
  return (
    <td className="border-b border-border px-3 py-2.5 align-top text-sm leading-snug">
      {empty ? <span className="text-muted-foreground" aria-label="Not stated">—</span> : children}
    </td>
  )
}

function ProductHead({ item, onOpen }: { item: StudyItem; onOpen: () => void }) {
  const seller = STORE_SELLERS[item.study.offer.sellerId]
  return (
    <span className="flex flex-col gap-2">
      <ArtStage examKey={item.exams[0]} className="h-20 rounded-lg">
        <StudyArt kind={item.study.kind} examKey={item.exams[0]} />
      </ArtStage>
      <button
        type="button"
        onClick={onOpen}
        className="line-clamp-3 text-left text-sm font-semibold leading-snug underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {item.name}
      </button>
      {seller && (
        <span className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          <SellerLogo seller={seller} size="xs" />
          <span className="truncate">{seller.name}</span>
        </span>
      )}
    </span>
  )
}

function PriceCell({ item, cheapest }: { item: StudyItem; cheapest: boolean }) {
  const summary = priceSummary(item.prices)
  if (!summary) return <span className="text-muted-foreground">—</span>
  const high = Math.max(...item.prices.filter(p => p.currency === summary.price.currency).map(p => p.amount))
  return (
    <span className="flex flex-col items-start gap-1">
      <span className={cn('font-semibold tabular-nums', summary.price.amount === 0 && 'text-green-600 dark:text-green-400')}>
        {formatPrice(summary.price)}
        {summary.from && high > summary.price.amount && (
          <span className="font-normal text-muted-foreground"> – {formatPrice({ amount: high, currency: summary.price.currency })}</span>
        )}
      </span>
      {cheapest && (
        <span className="rounded-full bg-green-600/10 px-2 py-0.5 text-[11px] font-semibold text-green-700 dark:text-green-400">Lowest price</span>
      )}
      {item.study.offer.price?.note && <span className="text-xs text-muted-foreground">{item.study.offer.price.note}</span>}
    </span>
  )
}

function Included({ lines }: { lines: readonly string[] }) {
  if (lines.length === 0) return <span className="text-muted-foreground">—</span>
  const more = lines.length - INCLUDES_SHOWN
  return (
    <ul className="space-y-1">
      {lines.slice(0, INCLUDES_SHOWN).map(line => (
        <li key={line} className="flex gap-1.5 text-xs leading-snug">
          <CheckMark className="mt-px h-3.5 w-3.5 shrink-0" />
          <span>{line}</span>
        </li>
      ))}
      {more > 0 && <li className="pl-5 text-xs text-muted-foreground">+{more} more</li>}
    </ul>
  )
}

function ReviewsCell({ item }: { item: StudyItem }) {
  const reviews = reviewsFor(item.id, STORE_REVIEWS)
  if (reviews.length === 0) return <span className="text-muted-foreground">—</span>
  return (
    <span className="flex flex-col gap-1 text-xs">
      {reviewTally(reviews).map(t => (
        <span key={t.source}>
          {t.count} from {t.source === 'publisher' ? STORE_SELLERS[item.study.offer.sellerId]?.name ?? 'the seller' : REVIEW_SOURCES[t.source].name}
        </span>
      ))}
    </span>
  )
}
