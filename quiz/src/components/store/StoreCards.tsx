// The Store's cards — one shape per aisle, so a shelf reads at a glance:
//
//   • a registration is a **ticket**: the exam's logo, the fee, and a stub
//     torn off along a perforation saying when the window is and how long is
//     left to register;
//   • a study material or a calculator is a **product card**: its picture on
//     the exam's wash, its name, who sells it, and its price;
//   • a textbook is its **cover**, from the vault's own resource page.
//
// The whole card is the target — it opens the product sheet, where everything
// the seller says about it is laid out — and nothing on a card is a second
// control. Facts are text, not pills (style guide §7.2a), except the exam
// tiles, which are the ladder's own colour chips.

import { CalendarDays, Hourglass, MessageSquareQuote } from 'lucide-react'
import { ExamLogo } from '@/components/ExamLogo'
import { CheckMark } from '@/components/CheckMark'
import { ArtStage, CalculatorArt, PlainBookArt, StudyArt } from '@/components/store/ProductArt'
import { SellerLogo } from '@/components/store/SellerLogo'
import { formatSittingDate } from '@/data/examSittings'
import { STORE_SELLERS } from '@/data/storeCatalog'
import {
  STUDY_KIND_LABEL,
  artAccentStyle,
  dayLabel,
  formatPrice,
  inDays,
  priceSummary,
  registrationStatus,
  storeExam,
  type ExamBody,
  type StoreItem,
} from '@/lib/store'
import { cn } from '@/lib/utils'

/** The number of days left at which a registration deadline turns amber — due soon (§4.1). */
export const DEADLINE_SOON_DAYS = 14

const CARD =
  'group relative w-full overflow-hidden rounded-xl bg-card text-left text-card-foreground shadow-[var(--shadow-card)] ' +
  'transition-[box-shadow,transform] duration-200 ease-out hover:shadow-lg motion-safe:hover:-translate-y-0.5 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

/** The exams a product is for, as a row of the ladder's own tiles. */
export function ExamChips({ exams, max = 4, size = 'xs', className }: { exams: readonly string[]; max?: number; size?: 'xs' | 'sm'; className?: string }) {
  if (exams.length === 0) return null
  const shown = exams.slice(0, max)
  const more = exams.length - shown.length
  return (
    <span className={cn('flex shrink-0 items-center gap-1', className)}>
      {shown.map(key => (
        <ExamLogo key={key} examKey={key} size={size} />
      ))}
      {more > 0 && <span className="text-[11px] font-medium text-muted-foreground">+{more}</span>}
      <span className="sr-only">For {exams.map(key => storeExam(key)?.name ?? key).join(', ')}</span>
    </span>
  )
}

/** The price a card prints: "$199", or "From $149" over several — or a fee paid in parts, part by part. */
export function CardPrice({ item, className }: { item: StoreItem; className?: string }) {
  // PCPA's exam and project are paid for separately, months apart: "$300 +
  // $700" says so where a $1,000 total would read as one payment.
  if (item.type === 'registration' && item.registration.fee.parts.length > 1) {
    return (
      <span className={cn('whitespace-nowrap text-sm font-bold tabular-nums tracking-tight', className)}>
        {item.registration.fee.parts.map(p => formatPrice({ amount: p.amount, currency: 'USD' })).join(' + ')}
      </span>
    )
  }
  const summary = priceSummary(item.prices)
  if (!summary) return null
  return (
    <span className={cn('flex items-baseline gap-1 whitespace-nowrap', className)}>
      {summary.from && <span className="text-[11px] font-medium text-muted-foreground">From</span>}
      <span className={cn('text-base font-bold tabular-nums tracking-tight', summary.price.amount === 0 && 'text-green-600 dark:text-green-400')}>
        {formatPrice(summary.price)}
      </span>
    </span>
  )
}

/** The bodies whose lists allow a calculator, each with its verdict mark. */
function Allowed({ bodies, plate }: { bodies: readonly ExamBody[]; plate?: boolean }) {
  return (
    <span className={cn('flex items-center gap-2 text-xs font-medium', plate && 'rounded-full bg-background/90 px-2 py-0.5 text-foreground shadow-sm')}>
      {(['SOA', 'CAS'] as const).filter(b => bodies.includes(b)).map(body => (
        <span key={body} className="inline-flex items-center gap-1">
          <CheckMark className="h-3.5 w-3.5" />
          {body}
        </span>
      ))}
    </span>
  )
}

/** "For Exam P, Exam FM" — what the exam tiles say, for a screen reader (the picture they sit on is hidden). */
function forExams(exams: readonly string[]): string {
  return exams.length ? `For ${exams.map(key => storeExam(key)?.name ?? key).join(', ')}` : ''
}

/**
 * What sits in the picture's top-left corner: the exams it is for, as the
 * ladder's tiles — or, for a calculator, which bodies' lists carry it.
 */
function CornerTags({ children }: { children: React.ReactNode }) {
  return <span className="absolute left-2 top-2 flex items-center gap-1">{children}</span>
}

/** A study material or a calculator. */
export function ProductCard({ item, onOpen, reviewCount = 0 }: { item: StoreItem; onOpen: () => void; reviewCount?: number }) {
  const seller = item.sellerId ? STORE_SELLERS[item.sellerId] : undefined
  const examKey = item.exams[0]

  let art: React.ReactNode = null
  let kind = ''
  if (item.type === 'study') {
    art = <StudyArt kind={item.study.kind} examKey={examKey} />
    kind = STUDY_KIND_LABEL[item.study.kind]
  } else if (item.type === 'calculator') {
    art = <CalculatorArt look={item.calculator.look} />
    kind = 'Calculator'
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      data-sound="open"
      data-testid={`store-item-${item.id}`}
      className={cn(CARD, 'flex flex-row sm:flex-col')}
    >
      <ArtStage
        examKey={item.type === 'calculator' ? undefined : examKey}
        neutral={item.type === 'calculator'}
        className="w-28 shrink-0 self-stretch sm:aspect-[16/10] sm:w-full"
        overlay={
          <>
            <CornerTags>
              {item.type === 'calculator' ? <Allowed bodies={item.calculator.approvedBy} plate /> : <ExamChips exams={item.exams} max={3} size="sm" />}
            </CornerTags>
            {isFree(item) && <FreeSticker label="Free" />}
          </>
        }
      >
        {art}
      </ArtStage>
      <span className="flex min-w-0 flex-1 flex-col gap-1 p-3 sm:p-4">
        <span className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span className="truncate">{kind}</span>
          {reviewCount > 0 && <ReviewCount count={reviewCount} />}
        </span>
        <span className="line-clamp-2 text-sm font-semibold leading-snug">{item.name}</span>
        <span className="sr-only">{item.type === 'calculator' ? `Allowed by ${item.calculator.approvedBy.join(' and ')}` : forExams(item.exams)}</span>
        <span className="mt-auto flex min-w-0 items-center justify-between gap-2 pt-1">
          {seller ? (
            <span className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
              <SellerLogo seller={seller} size="xs" />
              <span className="truncate">{seller.name}</span>
            </span>
          ) : <span />}
          {item.type === 'calculator' && item.calculator.discontinued ? (
            <span className="shrink-0 text-xs font-medium text-muted-foreground">Discontinued</span>
          ) : (
            <CardPrice item={item} className="shrink-0" />
          )}
        </span>
      </span>
    </button>
  )
}

/** A small speech-bubble count of a product's reviews, beside its kind. */
function ReviewCount({ count }: { count: number }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 normal-case tracking-normal" title={`${count} review${count === 1 ? '' : 's'}`}>
      <MessageSquareQuote className="h-3.5 w-3.5" aria-hidden />
      <span className="tabular-nums">{count}</span>
      <span className="sr-only">{count === 1 ? 'review' : 'reviews'}</span>
    </span>
  )
}

/** A textbook: its cover, from the vault. */
export function BookCard({ item, onOpen }: { item: Extract<StoreItem, { type: 'book' }>; onOpen: () => void }) {
  const { book } = item
  const facts = [book.edition && `${book.edition} ed.`, book.year].filter(Boolean).join(' · ')
  return (
    <button
      type="button"
      onClick={onOpen}
      data-sound="open"
      data-testid={`store-item-${item.id}`}
      className={cn(CARD, 'flex flex-row sm:flex-col')}
    >
      <ArtStage
        neutral
        className="w-28 shrink-0 self-stretch sm:aspect-[16/10] sm:w-full"
        overlay={
          <>
            <CornerTags>
              <ExamChips exams={item.exams} max={3} size="sm" />
            </CornerTags>
            {book.freeUrl && <FreeSticker label="Free online" />}
          </>
        }
      >
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt=""
            loading="lazy"
            className="h-[78%] max-h-36 w-auto rounded-[3px] object-contain shadow-md ring-1 ring-black/10"
          />
        ) : (
          <PlainBookArt examKey={item.exams[0]} />
        )}
      </ArtStage>
      <span className="flex min-w-0 flex-1 flex-col gap-1 p-3 sm:p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{book.type}</span>
        <span className="line-clamp-2 text-sm font-semibold leading-snug">{book.title}</span>
        <span className="sr-only">{forExams(item.exams)}</span>
        <span className="mt-auto flex min-w-0 items-center justify-between gap-2 pt-1 text-xs text-muted-foreground">
          <span className="line-clamp-1">{book.authors}</span>
          {facts && <span className="shrink-0 tabular-nums">{facts}</span>}
        </span>
      </span>
    </button>
  )
}

/** Every price it is offered at is nothing. */
function isFree(item: StoreItem): boolean {
  return item.prices.length > 0 && item.prices.every(p => p.amount === 0)
}

/**
 * A sticker slapped on something given away — a course its seller made free,
 * a textbook its publisher puts online — the one price a shelf can't beat.
 * Green, the meaning map's good news (style guide §4.1).
 */
function FreeSticker({ label }: { label: string }) {
  return (
    <span className="absolute right-2 top-2 rotate-6 rounded-full bg-green-600 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md">
      {label}
    </span>
  )
}

/**
 * Where an exam's registration stands, as one line: "Register by Dec 15 · in
 * 74 days" (amber in the last fortnight), "Registration closed Sep 29", or
 * that no next sitting is published.
 */
export function RegistrationLine({ examKey, today, className }: { examKey: string; today: string; className?: string }) {
  const status = registrationStatus(examKey, today)
  if (status.state === 'unscheduled') {
    return <span className={cn('text-xs text-muted-foreground', className)}>Next sitting not published yet</span>
  }
  if (status.state === 'opens') {
    // "Registration opens week of October 26" is how the SOA dates it: a week, not a day.
    return (
      <span className={cn('text-xs text-muted-foreground', className)}>
        Registration opens {status.opensWeekOf ? 'the week of ' : ''}
        {dayLabel(status.opens!, today)}
      </span>
    )
  }
  if (status.state === 'closed') {
    return (
      <span className={cn('text-xs text-muted-foreground', className)}>
        Registration closed{status.deadline ? ` ${dayLabel(status.deadline, today)}` : ''}
      </span>
    )
  }
  const soon = status.daysLeft !== undefined && status.daysLeft <= DEADLINE_SOON_DAYS
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs font-medium',
        soon ? 'text-amber-600 dark:text-amber-400' : 'text-foreground',
        className,
      )}
    >
      <Hourglass className="h-3.5 w-3.5 shrink-0" aria-hidden />
      Register by {dayLabel(status.deadline!, today)}
      {status.daysLeft !== undefined && <span className="font-normal text-muted-foreground">· {inDays(status.daysLeft)}</span>}
    </span>
  )
}

/**
 * A registration, as an admission ticket: the exam and its fee above the
 * perforation, the window and the deadline on the stub below it. A course
 * that includes its exam (a DISC) is sold the same way, by its own seller.
 */
export function RegistrationTicket({ item, today, onOpen }: { item: StoreItem; today: string; onOpen: () => void }) {
  const examKey = item.exams[0]!
  const exam = storeExam(examKey)
  const seller = item.sellerId ? STORE_SELLERS[item.sellerId] : undefined
  const status = item.type === 'registration' ? registrationStatus(examKey, today) : null
  const sitting = status?.sitting

  return (
    <button
      type="button"
      onClick={onOpen}
      data-sound="open"
      data-testid={`store-item-${item.id}`}
      style={artAccentStyle(examKey)}
      className={cn(CARD, 'flex flex-col')}
    >
      <span className="flex items-center gap-3 bg-[var(--exam-accent-soft)] px-4 py-3.5">
        <ExamLogo examKey={examKey} size="lg" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-base font-semibold leading-snug">{exam?.name ?? examKey}</span>
          <span className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
            {seller && <SellerLogo seller={seller} size="xs" />}
            <span className="truncate">{item.type === 'registration' ? `${seller?.short ?? ''} registration` : seller?.name}</span>
          </span>
        </span>
        <CardPrice item={item} className="self-start" />
      </span>

      {/* The perforation: a dashed tear line, notched at both ends. */}
      <span aria-hidden className="relative block h-0">
        <span className="absolute inset-x-4 top-0 border-t-2 border-dashed border-border" />
        <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-background" />
        <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-background" />
      </span>

      <span className="flex min-h-[3.25rem] flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3">
        {item.type === 'registration' ? (
          <>
            {sitting && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {formatSittingDate(sitting)}
              </span>
            )}
            <RegistrationLine examKey={examKey} today={today} />
          </>
        ) : item.type === 'study' ? (
          <>
            {item.study.windows?.[0] && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {item.study.windows[0]}
              </span>
            )}
            <span className="text-xs font-medium text-foreground">{STUDY_KIND_LABEL[item.study.kind]} with one exam attempt</span>
          </>
        ) : null}
      </span>
    </button>
  )
}
