// The comparison — one exam's study materials, read **question by question**:
// each thing the sellers state (the price, the kind, how many options, what's
// included, every fact any of them prints — "Format", "Access", "By" — the
// exam windows, the reviews, the date the page was read) is a section, and
// under it every product answers in its own line, keyed by its number. Nothing
// scrolls sideways, so it reads the same on a phone as on a desk.
//
// The price section draws every range on one scale (`lib/storeKit.ts`), so a
// $69–$99 bank and a $222–$794 course are told apart at a glance, and marks the
// lowest. A line a seller doesn't fill is a dash, never a guess — the Store's
// rule, transcribed never constructed (docs/store.md).
//
// Opened from the kit, it holds one step's kinds (`kinds`, titled by the
// step); from the shelf, every study material of the exam, narrowed by the
// kind pills. Product names open the full sheet; it ends in each seller's link.
// Same shell as the product sheet (`useStoreDialog`).

import { useId, useMemo, useState, type ReactNode } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { CheckMark } from '@/components/CheckMark'
import { ExamLogo } from '@/components/ExamLogo'
import { SellerLogo } from '@/components/store/SellerLogo'
import { useStoreDialog } from '@/components/store/useStoreDialog'
import { STORE_SELLERS } from '@/data/storeCatalog'
import { REVIEW_SOURCES, STORE_REVIEWS } from '@/data/storeReviews'
import { trackStoreOutbound } from '@/lib/analytics'
import { examAccentStyle } from '@/lib/examColors'
import {
  STUDY_KIND_LABEL,
  STUDY_KIND_ORDER,
  comparisonFactLabels,
  comparisonFor,
  formatPrice,
  lowestPrice,
  reviewTally,
  reviewsFor,
  shortDate,
  storeDisclaimer,
  type StoreExam,
  type StoreItem,
  type StudyItem,
  type StudyKind,
} from '@/lib/store'
import { priceBar, priceScale, priceSpan } from '@/lib/storeKit'
import { cn } from '@/lib/utils'

/** How many of a product's "what's included" lines a section shows before "+N more". */
const INCLUDES_SHOWN = 4

export function CompareSheet({
  items,
  exams,
  examKey,
  kinds: only = null,
  title = null,
  onExam,
  onOpen,
  onClose,
}: {
  items: readonly StoreItem[]
  /** The exams with something to compare, in ladder order. */
  exams: readonly StoreExam[]
  examKey: string
  /** Only these kinds — a kit step's (`comparableKinds`). Null for every study material. */
  kinds?: readonly StudyKind[] | null
  /** The kit step it was opened from, as the heading. */
  title?: string | null
  onExam: (key: string) => void
  /** Open a product's full sheet (the comparison closes behind it). */
  onOpen: (item: StoreItem) => void
  onClose: () => void
}) {
  const titleId = useId()
  const { panelRef, closeRef } = useStoreDialog(onClose)
  const [kind, setKind] = useState<StudyKind | null>(null)

  const all = useMemo(
    () => comparisonFor(items, examKey).filter(i => !only || only.includes(i.study.kind)),
    [items, examKey, only],
  )
  const kinds = STUDY_KIND_ORDER.filter(k => all.some(i => i.study.kind === k))
  const shown = kind && kinds.includes(kind) ? all.filter(i => i.study.kind === kind) : all
  const labels = comparisonFactLabels(shown.map(i => i.study))
  const cheapest = Math.min(...shown.map(i => lowestPrice(i) ?? Infinity))
  const scale = priceScale(shown)
  const examName = exams.find(e => e.key === examKey)?.name ?? examKey
  const key = (item: StudyItem) => shown.indexOf(item) + 1

  /** A section: one question, every product's answer under it. */
  const section = (label: string, answer: (item: StudyItem) => ReactNode) => (
    <Section key={label} label={label}>
      {shown.map(item => (
        <Line key={item.id} n={key(item)}>{answer(item)}</Line>
      ))}
    </Section>
  )

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
          style={examAccentStyle(examKey)}
          className="relative z-10 flex h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-background text-foreground shadow-2xl sm:h-auto sm:max-h-[90vh] sm:max-w-2xl sm:rounded-2xl"
        >
          <header className="shrink-0 space-y-2.5 border-b border-border px-5 pb-3 pt-4 sm:space-y-3">
            <div className="flex items-start gap-3">
              <h2 id={titleId} className="min-w-0 flex-1 text-xl font-bold leading-tight tracking-tight">
                {title ?? 'Compare study materials'}
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
              <div className="-mx-5 flex gap-1.5 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
                {[null, ...kinds].map(k => (
                  <button
                    key={k ?? 'all'}
                    type="button"
                    aria-pressed={kind === k}
                    onClick={() => setKind(k)}
                    data-sound="select"
                    className={cn(
                      'shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                      kind === k ? 'bg-pick text-pick-foreground' : 'bg-accent hover:bg-accent/80',
                    )}
                  >
                    {k ? STUDY_KIND_LABEL[k] : 'All kinds'}
                  </button>
                ))}
              </div>
            )}
          </header>

          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5" data-testid="store-compare-body">
            {shown.length === 0 ? (
              <p className="px-1 text-sm text-muted-foreground">Nothing to compare for {examName} yet.</p>
            ) : (
              <>
                <ol className="overflow-hidden rounded-2xl bg-card" aria-label="Products">
                  {shown.map((item, i) => {
                    const seller = STORE_SELLERS[item.study.offer.sellerId]
                    return (
                      <li key={item.id} className={cn('flex items-center gap-3 px-4 py-3', i > 0 && 'border-t border-border')}>
                        <Key n={i + 1} />
                        <button
                          type="button"
                          onClick={() => onOpen(item)}
                          className="min-w-0 flex-1 text-left text-sm font-semibold leading-snug underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {item.name}
                        </button>
                        {seller && (
                          <span className="flex max-w-[40%] shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                            <SellerLogo seller={seller} size="xs" />
                            <span className="truncate">{seller.name}</span>
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ol>

                <Section label="Price" note={scale ? `On one scale, $0 to ${formatPrice({ amount: scale, currency: 'USD' })}` : undefined}>
                  {shown.map(item => (
                    <Line key={item.id} n={key(item)}>
                      <PriceAnswer item={item} scale={scale} cheapest={shown.length > 1 && lowestPrice(item) === cheapest} />
                    </Line>
                  ))}
                </Section>
                {kinds.length > 1 && !kind && section('Kind', i => STUDY_KIND_LABEL[i.study.kind])}
                {section('Options', i => {
                  const options = i.study.offer.options ?? []
                  return options.length > 1 ? `${options.length} to choose from` : options.length === 1 ? options[0]!.name : null
                })}
                {section('What’s included', i => <Included lines={i.study.includes ?? []} />)}
                {labels.map(label =>
                  section(label === 'By' ? 'Author' : label, i => i.study.facts?.filter(f => f.label === label).map(f => f.value).join('; ') || null),
                )}
                {section('Exam windows', i => (i.study.windows?.length ? i.study.windows.join('; ') : null))}
                {section('Reviews', i => <ReviewsAnswer item={i} />)}
                {section('Price checked', i => shortDate(i.study.offer.checked))}

                <Section label="Where to buy">
                  {shown.map(item => (
                    <Line key={item.id} n={key(item)}>
                      <a
                        href={item.study.offer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-sound="open"
                        onClick={() => trackStoreOutbound({ product: item.id, seller: item.study.offer.sellerId, aisle: item.aisle })}
                        className="inline-flex items-center gap-1 font-semibold underline-offset-2 hover:underline"
                      >
                        {STORE_SELLERS[item.study.offer.sellerId]?.name ?? 'The seller'}’s page
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      </a>
                    </Line>
                  ))}
                </Section>
              </>
            )}

            <div className="space-y-1.5 px-1 pb-2 text-[11px] leading-relaxed text-muted-foreground" data-testid="store-disclaimer">
              {storeDisclaimer(null, null).map(p => <p key={p}>{p}</p>)}
            </div>
          </div>
        </div>
      </div>
    </OverlayPortal>
  )
}

/** A product's number, the key every section's lines are read by. */
function Key({ n }: { n: number }) {
  return (
    <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold tabular-nums">
      {n}
    </span>
  )
}

function Section({ label, note, children }: { label: string; note?: string; children: ReactNode }) {
  return (
    <section aria-label={label}>
      <h3 className="flex items-baseline justify-between gap-2 px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        {note && <span className="font-medium normal-case tracking-normal">{note}</span>}
      </h3>
      <ul className="overflow-hidden rounded-2xl bg-card">{children}</ul>
    </section>
  )
}

function Line({ n, children }: { n: number; children: ReactNode }) {
  const empty = children === null || children === undefined || children === ''
  return (
    <li className="flex items-start gap-3 border-t border-border px-4 py-3 text-sm leading-snug first:border-t-0">
      <span className="sr-only">Product {n}: </span>
      <Key n={n} />
      <span className="min-w-0 flex-1 pt-0.5">
        {empty ? <span className="text-muted-foreground" aria-label="Not stated">—</span> : children}
      </span>
    </li>
  )
}

function PriceAnswer({ item, scale, cheapest }: { item: StudyItem; scale: number | null; cheapest: boolean }) {
  const span = priceSpan(item)
  if (!span) return <span className="text-muted-foreground">—</span>
  const currency = span.currency as 'USD' | 'CAD'
  const bar = scale ? priceBar(span, scale) : null
  return (
    <span className="flex flex-col gap-1.5">
      <span className="flex items-center gap-3">
        {scale && (
          <span className="relative h-1.5 flex-1 rounded-full bg-muted" aria-hidden>
            {bar && (
              <span
                className="absolute top-0 h-1.5 min-w-[6px] rounded-full bg-[var(--exam-accent-vivid)]"
                style={{ left: `${bar.left}%`, width: `${bar.width}%` }}
              />
            )}
          </span>
        )}
        <span className={cn('shrink-0 font-semibold tabular-nums', span.low === 0 && 'text-green-600 dark:text-green-400', scale && 'w-28 text-right')}>
          {formatPrice({ amount: span.low, currency })}
          {span.high > span.low && <span className="font-normal text-muted-foreground">–{formatPrice({ amount: span.high, currency })}</span>}
        </span>
      </span>
      {(cheapest || item.study.offer.price?.note) && (
        <span className="flex flex-wrap items-center gap-2">
          {cheapest && (
            <span className="rounded-full bg-[var(--exam-accent-vivid)] px-2 py-0.5 text-[11px] font-semibold text-white">Lowest price</span>
          )}
          {item.study.offer.price?.note && <span className="text-xs text-muted-foreground">{item.study.offer.price.note}</span>}
        </span>
      )}
    </span>
  )
}

function Included({ lines }: { lines: readonly string[] }) {
  if (lines.length === 0) return null
  const more = lines.length - INCLUDES_SHOWN
  return (
    <ul className="space-y-1">
      {lines.slice(0, INCLUDES_SHOWN).map(line => (
        <li key={line} className="flex gap-1.5 text-sm leading-snug">
          <CheckMark className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{line}</span>
        </li>
      ))}
      {more > 0 && <li className="pl-5 text-xs text-muted-foreground">+{more} more</li>}
    </ul>
  )
}

function ReviewsAnswer({ item }: { item: StudyItem }) {
  const reviews = reviewsFor(item.id, STORE_REVIEWS)
  if (reviews.length === 0) return null
  return (
    <span className="flex flex-col gap-0.5">
      {reviewTally(reviews).map(t => (
        <span key={t.source}>
          {t.count} from {t.source === 'publisher' ? STORE_SELLERS[item.study.offer.sellerId]?.name ?? 'the seller' : REVIEW_SOURCES[t.source].name}
        </span>
      ))}
    </span>
  )
}
