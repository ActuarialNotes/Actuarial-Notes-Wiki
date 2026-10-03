// The product sheet — everything the Store knows about one product, opened
// from its card.
//
// A card carries a name, a seller and a price; this is where the rest goes:
// what the seller says is included, the formats and packages it is sold in,
// the exam windows, the calculators' approvals and features, a textbook's
// assigned chapters, and — on every product — where the facts were read and
// when. The sheet ends on the one action the Store has: going to the seller.
// Nothing is bought here, and the sheet says so beside the button.
//
// A bottom sheet on a phone, a centred dialog from `sm`. It portals to the
// body, traps focus while it is open and gives it back to the card that
// opened it; Escape, the backdrop and the close button all dismiss it.

import { useEffect, useId, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, ExternalLink, Star, X } from 'lucide-react'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { buttonVariants } from '@/components/ui/button'
import { CheckMark } from '@/components/CheckMark'
import { ExamLogo } from '@/components/ExamLogo'
import { SittingTimeline } from '@/components/SittingTimeline'
import { ArtStage, CalculatorArt, PlainBookArt, StudyArt } from '@/components/store/ProductArt'
import { SellerLogo } from '@/components/store/SellerLogo'
import { useStoreDialog } from '@/components/store/useStoreDialog'
import { CALCULATOR_POLICIES, STORE_SELLERS } from '@/data/storeCatalog'
import { sittingDetailsFor } from '@/data/examSittingDetails'
import { dollars } from '@/data/examFees'
import { sittingTimeline } from '@/lib/sittingTimeline'
import {
  AMAZON_ASSOCIATE_DISCLOSURE,
  AMAZON_CONTENT_DISCLAIMER,
  AMAZON_PRICE_DISCLAIMER,
  fetchAmazonPrice,
  priceStamp,
  type AmazonPrice,
} from '@/lib/amazonPrice'
import { copySources, isbnDigits } from '@/lib/resourceMeta'
import { wikiRoute } from '@/lib/wikiRoutes'
import { trackStoreOutbound } from '@/lib/analytics'
import { PUBLISHER_RATINGS, REVIEW_SOURCES, REVIEWS_CHECKED, STORE_REVIEWS } from '@/data/storeReviews'
import {
  STUDY_KIND_LABEL,
  formatPrice,
  priceSummary,
  readingExamKey,
  registrationStatus,
  reviewTally,
  reviewsFor,
  shortDate,
  storeDisclaimer,
  type StoreReview,
  storeExam,
  type StoreItem,
  type StoreOffer,
  type StoreOption,
  type StorePrice,
  type StoreSeller,
} from '@/lib/store'
import { cn } from '@/lib/utils'

export function ProductSheet({ item, today, onClose }: { item: StoreItem; today: string; onClose: () => void }) {
  const titleId = useId()

  const { panelRef, closeRef } = useStoreDialog(onClose)

  // A textbook's Amazon price, asked each time the sheet opens and never kept:
  // Amazon's licence forbids a client from caching its prices
  // (lib/amazonPrice.ts). With no Associates credentials on the deployment
  // the answer is no price, and none is shown.
  const [amazon, setAmazon] = useState<AmazonPrice | null>(null)
  const amazonIsbn = item.type === 'book' && !item.book.freeUrl ? item.book.isbn : null
  useEffect(() => {
    if (!amazonIsbn) return
    let live = true
    fetchAmazonPrice(amazonIsbn).then(price => {
      if (live) setAmazon(price)
    })
    return () => {
      live = false
    }
  }, [amazonIsbn])

  const body = useMemo(() => sheetBody(item, today, amazon), [item, today, amazon])

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
          data-testid="store-sheet"
          className="relative z-10 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-card text-card-foreground shadow-2xl sm:max-h-[88vh] sm:max-w-xl sm:rounded-2xl"
        >
          <ArtStage
            examKey={body.artExam}
            neutral={body.neutralArt}
            className="h-36 shrink-0 sm:h-44"
          >
            {body.art}
          </ArtStage>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-5 pb-6 pt-5">
            <header className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{body.kind}</p>
              <h2 id={titleId} className="text-xl font-semibold leading-tight tracking-tight">{item.name}</h2>
              {body.byline}
            </header>
            {body.content}
            <ProductReviews item={item} />
            <Disclaimer item={item} />
          </div>

          {body.footer && (
            <div className="shrink-0 space-y-2 border-t border-border bg-card px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
              {body.footer}
            </div>
          )}
        </div>
      </div>
    </OverlayPortal>
  )
}

interface SheetBody {
  kind: string
  art: ReactNode
  artExam?: string
  neutralArt?: boolean
  byline?: ReactNode
  content: ReactNode
  footer?: ReactNode
}

function sheetBody(item: StoreItem, today: string, amazon: AmazonPrice | null): SheetBody {
  switch (item.type) {
    case 'registration':
      return registrationBody(item, today)
    case 'study':
      return studyBody(item)
    case 'calculator':
      return calculatorBody(item)
    case 'book':
      return {
        kind: item.book.type,
        art: <BookCover item={item} />,
        neutralArt: true,
        content: <BookContent item={item} amazon={amazon} />,
        footer: <BookFooter item={item} amazon={amazon} />,
      }
  }
}

// ── Shared parts ──────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-2.5">
      <h3 className="text-sm font-semibold">{title}</h3>
      {children}
    </section>
  )
}

function Facts({ facts }: { facts: readonly { label: string; value: string }[] }) {
  if (facts.length === 0) return null
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
      {facts.map(f => (
        <div key={f.label} className="contents">
          <dt className="text-muted-foreground">{f.label}</dt>
          <dd className="min-w-0">{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Included({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-1.5 text-sm">
      {items.map(text => (
        <li key={text} className="flex items-start gap-2.5">
          <CheckMark className="mt-0.5 h-4 w-4" />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  )
}

function Quote({ text, seller }: { text: string; seller?: StoreSeller }) {
  return (
    <figure className="rounded-lg bg-muted/50 px-4 py-3">
      <blockquote className="text-sm italic leading-relaxed">“{text}”</blockquote>
      {seller && <figcaption className="mt-1.5 text-xs text-muted-foreground">— {seller.name}</figcaption>}
    </figure>
  )
}

function Byline({ seller, label }: { seller?: StoreSeller; label?: string }) {
  if (!seller) return null
  return (
    <p className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
      <SellerLogo seller={seller} size="sm" />
      <span className="truncate">{label ?? seller.name}</span>
      <a
        href={seller.site}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto inline-flex shrink-0 items-center gap-1 text-xs hover:text-foreground"
      >
        {hostOf(seller.site)}
        <ExternalLink className="h-3 w-3" aria-hidden />
      </a>
    </p>
  )
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

/** The headline price, with its qualifier. */
function BigPrice({ price, from }: { price: StorePrice; from?: boolean }) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      {from && <span className="text-sm font-medium text-muted-foreground">From</span>}
      <span className={cn('text-3xl font-bold tracking-tight tabular-nums', price.amount === 0 && 'text-green-600 dark:text-green-400')}>
        {formatPrice(price)}
      </span>
      {price.amount > 0 && <span className="text-sm text-muted-foreground">{price.currency}</span>}
      {price.note && <span className="text-sm text-muted-foreground">· {price.note}</span>}
    </p>
  )
}

/**
 * A seller's options — formats, access lengths, packages — each with its
 * price, in the groups the page itself splits them into.
 */
function Options({ offer }: { offer: StoreOffer }) {
  if (!offer.options?.length) return null
  const groups: { name?: string; options: StoreOption[] }[] = []
  for (const option of offer.options) {
    const last = groups[groups.length - 1]
    if (last && last.name === option.group) last.options.push(option)
    else groups.push({ name: option.group, options: [option] })
  }
  return (
    <div className="space-y-3">
      {groups.map((group, i) => (
        <div key={group.name ?? i} className="space-y-1.5">
          {group.name && <p className="text-xs font-medium text-muted-foreground">{group.name}</p>}
          {isLadder(group.options) ? (
            // A price ladder — the same thing for 7 days, 15, 30 … 365 — reads
            // as a grid of short tiles rather than a column of long rows.
            <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {group.options.map(option => (
                <li key={option.name} className="flex items-baseline justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2 text-sm">
                  <span className="truncate text-muted-foreground">{option.name}</span>
                  {option.price && <span className="shrink-0 font-semibold tabular-nums">{formatPrice(option.price)}</span>}
                </li>
              ))}
            </ul>
          ) : (
          <ul className="divide-y divide-border overflow-hidden rounded-lg bg-muted/40">
            {group.options.map(option => (
              <li key={option.name} className="flex items-start justify-between gap-3 px-3.5 py-2">
                <span className="min-w-0">
                  <span className="block text-sm">{option.name}</span>
                  {option.description && <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{option.description}</span>}
                </span>
                {option.price && (
                  <span className="shrink-0 text-sm font-semibold tabular-nums">
                    {formatPrice(option.price)}
                    {option.price.note && <span className="block text-right text-[11px] font-normal text-muted-foreground">{option.price.note}</span>}
                  </span>
                )}
              </li>
            ))}
          </ul>
          )}
        </div>
      ))}
    </div>
  )
}

/** A run of many short, priced, undescribed choices — access lengths. */
function isLadder(options: readonly StoreOption[]): boolean {
  return options.length > 5 && options.every(o => o.price && !o.description && o.name.length <= 22)
}

/** The one action: off to the seller. */
function BuyButton({ href, item, sellerId, children }: { href: string; item: StoreItem; sellerId?: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-sound="open"
      onClick={() => trackStoreOutbound({ product: item.id, seller: sellerId ?? hostOf(href), aisle: item.aisle })}
      className={buttonVariants({ size: 'lg', className: 'w-full gap-2 text-base' })}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden />
    </a>
  )
}

/** Where the facts were read and when — and that nothing is sold here. */
function Provenance({ children }: { children: ReactNode }) {
  return <p className="text-center text-xs leading-relaxed text-muted-foreground">{children}</p>
}

function ExamRows({ exams }: { exams: readonly string[] }) {
  return (
    <span className="flex flex-wrap items-center gap-2">
      {exams.map(key => (
        <span key={key} className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 py-0.5 pl-0.5 pr-2.5 text-xs font-medium">
          <ExamLogo examKey={key} size="xs" />
          {storeExam(key)?.name ?? key}
        </span>
      ))}
    </span>
  )
}

// ── Study materials ───────────────────────────────────────────────────────────

function studyBody(item: Extract<StoreItem, { type: 'study' }>): SheetBody {
  const { study } = item
  const seller = STORE_SELLERS[study.offer.sellerId]
  const summary = priceSummary(item.prices)
  const sellerName = seller?.name ?? hostOf(study.offer.url)
  return {
    kind: STUDY_KIND_LABEL[study.kind],
    art: <StudyArt kind={study.kind} examKey={item.exams[0]} />,
    artExam: item.exams[0],
    byline: <Byline seller={seller} />,
    content: (
      <>
        {summary && <BigPrice price={summary.price} from={summary.from} />}
        {study.includes?.length ? (
          <Section title="What’s included">
            <Included items={study.includes} />
          </Section>
        ) : null}
        {study.offer.options?.length ? (
          <Section title="Options">
            <Options offer={study.offer} />
          </Section>
        ) : null}
        {item.exams.length > 0 && (
          <Section title="For">
            <ExamRows exams={item.exams} />
          </Section>
        )}
        {study.windows?.length ? (
          <Section title="Exam windows">
            <ul className="space-y-1 text-sm">
              {study.windows.map(w => <li key={w}>{w}</li>)}
            </ul>
          </Section>
        ) : null}
        {study.facts?.length ? (
          <Section title="Details">
            <Facts facts={study.facts} />
          </Section>
        ) : null}
        {study.quote && <Quote text={study.quote} seller={seller} />}
      </>
    ),
    footer: (
      <>
        <BuyButton href={study.offer.url} item={item} sellerId={study.offer.sellerId}>Buy at {sellerName}</BuyButton>
        <Provenance>
          {summary ? 'Price as listed' : 'Listed'} on{' '}
          <a href={study.offer.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
            {hostOf(study.offer.url)}
          </a>{' '}
          on {shortDate(study.offer.checked)}. Nothing is sold on Actuarial Notes — you buy from {sellerName}.
        </Provenance>
      </>
    ),
  }
}

// ── Registration ──────────────────────────────────────────────────────────────

function registrationBody(item: Extract<StoreItem, { type: 'registration' }>, today: string): SheetBody {
  const { registration } = item
  const seller = STORE_SELLERS[registration.body.toLowerCase()]
  const status = registrationStatus(registration.examKey, today)
  const details = status.sitting ? sittingDetailsFor(registration.examKey, status.sitting) : null
  const steps = status.sitting ? sittingTimeline(status.sitting, details?.milestones ?? [], today) : []
  const { fee } = registration
  const parts = fee.parts

  return {
    kind: 'Exam registration',
    art: <ExamLogo examKey={registration.examKey} size="lg" className="scale-150" />,
    artExam: registration.examKey,
    byline: <Byline seller={seller} label={`Registration with the ${registration.body}`} />,
    content: (
      <>
        {parts.length === 1 ? (
          <div className="space-y-1">
            <BigPrice price={{ amount: parts[0]!.amount, currency: 'USD' }} />
            {parts[0]!.student !== undefined && (
              <p className="text-sm text-muted-foreground">{dollars(parts[0]!.student!)} for full-time students</p>
            )}
          </div>
        ) : (
          <Section title="Fees">
            <ul className="divide-y divide-border overflow-hidden rounded-lg bg-muted/40">
              {parts.map(p => (
                <li key={p.part} className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm">
                  <span className="font-medium capitalize">{p.part}</span>
                  <span className="text-right tabular-nums">
                    <span className="font-semibold">{dollars(p.amount)}</span>
                    {p.student !== undefined && <span className="block text-[11px] text-muted-foreground">{dollars(p.student)} full-time students</span>}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section title={status.state === 'unscheduled' ? 'Next sitting' : `The ${status.state === 'open' ? 'sitting to register for' : 'next sitting'}`}>
          {status.sitting ? (
            <>
              {status.state === 'closed' && (
                <p className="text-sm text-muted-foreground">
                  Registration for this sitting has closed, and the {registration.body} hasn’t published the one after it yet.
                </p>
              )}
              <SittingTimeline steps={steps} today={today} />
            </>
          ) : (
            <p className="text-sm text-muted-foreground">The {registration.body} hasn’t published the next sitting yet.</p>
          )}
        </Section>

        <Section title="How registration works">
          <ul className="space-y-1.5 text-sm">
            {registration.register.notes.map(note => (
              <li key={note} className="rounded-lg bg-muted/40 px-3.5 py-2.5 leading-relaxed">
                “{note}”
                <span className="mt-0.5 block text-xs text-muted-foreground">— {registration.register.label.replace(/ — .*/, '')}</span>
              </li>
            ))}
          </ul>
        </Section>

        {registration.facts.length > 0 && (
          <Section title="How it’s sat">
            <Facts facts={registration.facts} />
          </Section>
        )}

        {fee.includes?.length ? (
          <Section title="The fee includes">
            <Included items={fee.includes} />
          </Section>
        ) : null}

        {fee.terms?.length ? (
          <Section title="Fine print">
            <ul className="space-y-1.5 text-xs leading-relaxed text-muted-foreground">
              {fee.terms.map(t => <li key={t}>{t}</li>)}
            </ul>
          </Section>
        ) : null}
      </>
    ),
    footer: (
      <>
        <BuyButton href={registration.register.url} item={item} sellerId={registration.body.toLowerCase()}>Register with the {registration.body}</BuyButton>
        <Provenance>
          Fee as listed on{' '}
          <a href={fee.source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
            {hostOf(fee.source.url)}
          </a>{' '}
          on {shortDate(fee.checked)}.{' '}
          <a href={registration.examPage.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
            The exam’s page
          </a>
          .
        </Provenance>
      </>
    ),
  }
}

// ── Calculators ───────────────────────────────────────────────────────────────

function calculatorBody(item: Extract<StoreItem, { type: 'calculator' }>): SheetBody {
  const { calculator } = item
  const maker = STORE_SELLERS[calculator.makerId]
  const policies = CALCULATOR_POLICIES.filter(p => calculator.approvedBy.includes(p.body))
  const offers = [...calculator.offers].sort((a, b) => (lowest(a) ?? Infinity) - (lowest(b) ?? Infinity))
  const best = offers[0]

  return {
    kind: 'Calculator',
    art: <CalculatorArt look={calculator.look} />,
    neutralArt: true,
    byline: <Byline seller={maker} />,
    content: (
      <>
        <Section title="Allowed in the exam room">
          <ul className="space-y-1.5 text-sm">
            {(['SOA', 'CAS'] as const).map(body => {
              const policy = policies.find(p => p.body === body)
              const allowed = calculator.approvedBy.includes(body)
              return (
                <li key={body} className="flex items-center gap-2.5">
                  {allowed ? <CheckMark className="h-4 w-4" /> : <span className="h-4 w-4 shrink-0 rounded-full border-2 border-muted-foreground/40" aria-hidden />}
                  <span className={cn(!allowed && 'text-muted-foreground')}>
                    {allowed ? `On the ${body}’s list` : `Not on the ${body}’s list`}
                  </span>
                  {policy && (
                    <a href={policy.url} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                      Policy
                      <ExternalLink className="h-3 w-3" aria-hidden />
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </Section>

        {offers.length > 0 && (
          <Section title="Where to buy">
            <ul className="divide-y divide-border overflow-hidden rounded-lg bg-muted/40">
              {offers.map(offer => {
                const seller = STORE_SELLERS[offer.sellerId]
                const price = lowest(offer)
                return (
                  <li key={offer.url}>
                    <a
                      href={offer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3.5 py-2.5 text-sm transition-colors hover:bg-accent/60"
                    >
                      {seller && <SellerLogo seller={seller} size="sm" />}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{seller?.name ?? hostOf(offer.url)}</span>
                        <span className="block text-[11px] text-muted-foreground">Checked {shortDate(offer.checked)}{offer.note ? ` · ${offer.note}` : ''}</span>
                      </span>
                      {price !== undefined && <span className="font-semibold tabular-nums">{formatPrice({ amount: price, currency: offer.price?.currency ?? 'USD' })}</span>}
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                    </a>
                  </li>
                )
              })}
            </ul>
          </Section>
        )}

        {calculator.discontinued && (
          <p className="rounded-lg bg-muted/50 px-4 py-3 text-sm">
            Texas Instruments no longer makes the {calculator.model}, and no seller we checked lists it new. It is still on
            both bodies’ lists, so one you already own is allowed in.
          </p>
        )}

        {calculator.variants?.length ? (
          <Section title="Its twin on the lists">
            <ul className="space-y-2">
              {calculator.variants.map(v => (
                <li key={v.model} className="rounded-lg bg-muted/40 px-3.5 py-2.5 text-sm">
                  <span className="flex items-center gap-2">
                    <CheckMark className="h-4 w-4" />
                    <span className="font-medium">{v.model}</span>
                    <span className="ml-auto flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
                      {v.makerUrl && (
                        <a href={v.makerUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
                          TI <ExternalLink className="h-3 w-3" aria-hidden />
                        </a>
                      )}
                      {v.amazonSearch && (
                        <a href={v.amazonSearch} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
                          Amazon <ExternalLink className="h-3 w-3" aria-hidden />
                        </a>
                      )}
                    </span>
                  </span>
                  <span className="mt-1 block pl-6 text-xs leading-relaxed text-muted-foreground">{v.note}</span>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {calculator.features?.length ? (
          <Section title="What it does">
            <ul className="grid gap-x-4 gap-y-1.5 text-sm sm:grid-cols-2">
              {calculator.features.map(f => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {calculator.facts?.length ? (
          <Section title="Details">
            <Facts facts={calculator.facts} />
          </Section>
        ) : null}

        {calculator.quote && <Quote text={calculator.quote} seller={maker} />}

        {policies.some(p => p.rules.length > 0) && (
          <Section title="Exam-room rules">
            <ul className="space-y-1.5 text-xs leading-relaxed text-muted-foreground">
              {policies.flatMap(p => p.rules.map(rule => <li key={`${p.body}-${rule}`}><span className="font-semibold text-foreground">{p.body}:</span> {rule}</li>))}
            </ul>
          </Section>
        )}
      </>
    ),
    footer: (
      <>
        {best ? (
          <BuyButton href={best.url} item={item} sellerId={best.sellerId}>Buy at {STORE_SELLERS[best.sellerId]?.name ?? hostOf(best.url)}</BuyButton>
        ) : calculator.amazonSearch ? (
          <BuyButton href={calculator.amazonSearch} item={item} sellerId="amazon">Find it on Amazon</BuyButton>
        ) : null}
        <Provenance>
          {best && calculator.amazonSearch && (
            <>
              <a href={calculator.amazonSearch} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
                Search Amazon
              </a>{' '}
              ·{' '}
            </>
          )}
          Prices as each seller listed them on the date shown. Nothing is sold on Actuarial Notes.
        </Provenance>
      </>
    ),
  }
}

function lowest(offer: StoreOffer): number | undefined {
  const amounts = [offer.price?.amount, ...(offer.options ?? []).map(o => o.price?.amount)].filter((n): n is number => n !== undefined)
  return amounts.length ? Math.min(...amounts) : undefined
}

// ── Textbooks ─────────────────────────────────────────────────────────────────

function BookCover({ item }: { item: Extract<StoreItem, { type: 'book' }> }) {
  return item.book.coverImage ? (
    <img src={item.book.coverImage} alt="" className="h-[82%] w-auto rounded-[3px] object-contain shadow-lg ring-1 ring-black/10" />
  ) : (
    <PlainBookArt examKey={item.exams[0]} />
  )
}

function BookContent({ item, amazon }: { item: Extract<StoreItem, { type: 'book' }>; amazon: AmazonPrice | null }) {
  const { book } = item

  const facts = [
    book.authors && { label: book.authors.includes(' and ') || book.authors.includes(',') ? 'Authors' : 'Author', value: book.authors },
    book.edition && { label: 'Edition', value: book.edition },
    book.publisher && { label: 'Publisher', value: book.publisher },
    book.year && { label: 'Year', value: String(book.year) },
    { label: 'ISBN', value: book.isbn },
  ].filter((f): f is { label: string; value: string } => !!f)

  // A library and a shop — never the shadow library the resource page's menu
  // also lists: the Store sends readers to places that sell or lend the book.
  const places = copySources(book.isbn).filter(s => s.id !== 'libgen')

  return (
    <>
      {amazon && (
        <div className="space-y-1">
          <BigPrice price={{ amount: amazon.amount, currency: amazon.currency === 'CAD' ? 'CAD' : 'USD' }} />
          <p className="text-xs text-muted-foreground">at Amazon, as of {priceStamp(amazon.asOf)}</p>
        </div>
      )}

      <Section title="On the syllabus">
        <ul className="space-y-2.5">
          {book.readings.map(r => {
            const key = readingExamKey(r.exam)
            return (
              <li key={r.exam} className="flex items-start gap-2.5">
                {key && <ExamLogo examKey={key} size="sm" />}
                <span className="min-w-0 text-sm">
                  <span className="block font-medium">{r.exam}</span>
                  {r.detail && <span className="block text-xs leading-relaxed text-muted-foreground">{r.detail}</span>}
                </span>
              </li>
            )
          })}
        </ul>
      </Section>

      {book.freeUrl && (
        <Section title="Free from the publisher">
          <p className="text-sm">
            The publisher offers this book free online at{' '}
            <a href={book.freeUrl} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">
              {hostOf(book.freeUrl)}
            </a>
            .
          </p>
        </Section>
      )}

      <Section title="Details">
        <Facts facts={facts} />
      </Section>

      {places.length > 0 && isbnDigits(book.isbn) && (
        <Section title="Where to get it">
          <ul className="divide-y divide-border overflow-hidden rounded-lg bg-muted/40">
            {places.map(place => {
              const seller = STORE_SELLERS[place.id]
              const priced = place.id === 'amazon' ? amazon : null
              return (
                <li key={place.id}>
                  <a
                    href={priced?.url ?? place.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3.5 py-2.5 text-sm transition-colors hover:bg-accent/60"
                  >
                    {seller && <SellerLogo seller={seller} size="sm" />}
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">{place.id === 'worldcat' ? 'Borrow from a library' : `Buy at ${place.label}`}</span>
                      <span className="block text-[11px] text-muted-foreground">{place.id === 'worldcat' ? 'WorldCat, by ISBN' : 'A search on the ISBN'}</span>
                    </span>
                    {priced && <span className="font-semibold tabular-nums">{priced.display}</span>}
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                  </a>
                </li>
              )
            })}
          </ul>
          {amazon && (
            <div className="space-y-1 text-[11px] leading-4 text-muted-foreground">
              <p>{AMAZON_PRICE_DISCLAIMER}</p>
              <p>{AMAZON_ASSOCIATE_DISCLOSURE}</p>
              <p className="text-[10px] leading-[14px]">{AMAZON_CONTENT_DISCLAIMER}</p>
            </div>
          )}
        </Section>
      )}

      <Link
        to={wikiRoute({ kind: 'resource', name: book.name })}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-2 hover:underline"
      >
        <BookOpen className="h-4 w-4 text-muted-foreground" aria-hidden />
        Read about it in the study guide
      </Link>
    </>
  )
}

function BookFooter({ item, amazon }: { item: Extract<StoreItem, { type: 'book' }>; amazon: AmazonPrice | null }) {
  const { book } = item
  // Amazon's own vended link when it priced the book — it credits a sale only
  // to the link it handed out — else the plain ISBN search.
  const amazonUrl = amazon?.url ?? copySources(book.isbn).find(s => s.id === 'amazon')?.url
  return (
    <>
      {book.freeUrl ? (
        <BuyButton href={book.freeUrl} item={item}>Read it free online</BuyButton>
      ) : amazonUrl ? (
        <BuyButton href={amazonUrl} item={item} sellerId="amazon">{amazon ? `Buy at Amazon · ${amazon.display}` : 'Find it on Amazon'}</BuyButton>
      ) : null}
      <Provenance>
        The book’s details and reading list come from its page in the study guide. Nothing is sold on Actuarial Notes.
      </Provenance>
    </>
  )
}

// ── Reviews ───────────────────────────────────────────────────────────────────

/** How many quotes the sheet shows before "Show all". */
const REVIEWS_SHOWN = 4

/**
 * What candidates and the seller say about it, each quote as written and
 * linked to where it was posted (`data/storeReviews.ts`): a tally by source,
 * the seller's own aggregate rating when its page prints one, then the
 * quotes, newest first.
 */
function ProductReviews({ item }: { item: StoreItem }) {
  const [all, setAll] = useState(false)
  const reviews = reviewsFor(item.id, STORE_REVIEWS)
  const rating = PUBLISHER_RATINGS.find(r => r.productId === item.id)
  if (reviews.length === 0 && !rating) return null
  const seller = item.sellerId ? STORE_SELLERS[item.sellerId] : undefined
  const sourceName = (r: StoreReview['source']) => (r === 'publisher' ? seller?.name ?? 'The seller' : REVIEW_SOURCES[r].name)
  const shown = all ? reviews : reviews.slice(0, REVIEWS_SHOWN)

  return (
    <Section title="Reviews">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground" data-testid="store-review-tally">
        {rating && (
          <a href={rating.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-foreground hover:underline">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
            {rating.value} / {rating.outOf}
            {rating.count !== null && <span className="font-normal text-muted-foreground">· {rating.count.toLocaleString()} ratings on {seller?.short ?? 'the seller'}’s page</span>}
          </a>
        )}
        {reviewTally(reviews).map(t => (
          <span key={t.source} className="inline-flex items-center gap-1.5">
            <ReviewSourceMark source={t.source} seller={seller} />
            {t.count} from {sourceName(t.source)}
          </span>
        ))}
      </div>
      <ul className="space-y-3">
        {shown.map(review => (
          <li key={review.url + review.quote} className="rounded-lg bg-muted/50 px-3.5 py-3">
            <blockquote className="text-sm leading-relaxed">“{review.quote}”</blockquote>
            <p className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground">
              <ReviewSourceMark source={review.source} seller={seller} />
              <span className="font-medium text-foreground">
                {review.author ? (review.source === 'reddit' ? `u/${review.author}` : review.author) : sourceName(review.source)}
              </span>
              {review.rating != null && review.ratingOutOf != null && (
                <span className="inline-flex items-center gap-0.5">
                  · <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden />
                  {review.rating}/{review.ratingOutOf}
                </span>
              )}
              {review.date && <span>· {shortDate(review.date)}</span>}
              <a href={review.url} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-0.5 font-medium text-foreground hover:underline">
                {review.source === 'publisher' ? 'Seller’s page' : `On ${REVIEW_SOURCES[review.source].name.split(' ·')[0]}`}
                <ArrowUpRight className="h-3 w-3" aria-hidden />
              </a>
            </p>
          </li>
        ))}
      </ul>
      {reviews.length > REVIEWS_SHOWN && (
        <button type="button" onClick={() => setAll(v => !v)} className="text-sm font-medium text-muted-foreground hover:text-foreground">
          {all ? 'Show fewer' : `Show all ${reviews.length} reviews`}
        </button>
      )}
      <p className="text-xs text-muted-foreground">
        Quoted as written and linked to where each was posted; gathered {shortDate(REVIEWS_CHECKED)}. A review is its author’s opinion, not ours.
      </p>
    </Section>
  )
}

function ReviewSourceMark({ source, seller }: { source: StoreReview['source']; seller?: StoreSeller }) {
  if (source === 'publisher') return seller ? <SellerLogo seller={seller} size="xs" /> : null
  const s = REVIEW_SOURCES[source]
  return <SellerLogo seller={{ name: s.name, short: s.short, logo: s.logo }} size="xs" />
}

// ── The disclaimer ────────────────────────────────────────────────────────────

/** The legal notice under every listing (`storeDisclaimer`), naming its seller and the date its page was read. */
function Disclaimer({ item }: { item: StoreItem }) {
  const seller = item.sellerId ? STORE_SELLERS[item.sellerId]?.name ?? null : item.type === 'book' ? item.book.publisher ?? null : null
  const checked =
    item.type === 'study' ? item.study.offer.checked
      : item.type === 'calculator' ? item.calculator.checked
        : item.type === 'registration' ? item.registration.fee.checked
          : null
  return (
    <section className="space-y-1.5 border-t border-border pt-4 text-[11px] leading-relaxed text-muted-foreground" data-testid="store-disclaimer">
      <h3 className="font-semibold uppercase tracking-wider">Disclaimer</h3>
      {storeDisclaimer(seller, checked).map(p => <p key={p}>{p}</p>)}
    </section>
  )
}
