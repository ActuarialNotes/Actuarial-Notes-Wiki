import { forwardRef, type ReactNode, type Ref } from 'react'
import { Search, X } from 'lucide-react'
import { MobileNavButton } from '@/components/MobileNavButton'
import { cn } from '@/lib/utils'

/**
 * The **floating search bar** — the bar a top-level place pins to the top of
 * the viewport, and the parts that make it that bar.
 *
 * This is the format, not a component that owns a search: what a query *means*
 * differs per place (the wiki searches concepts, Cowork searches publishers and
 * documents), but the chrome around it does not, and it had been re-typed per
 * place until the bars disagreed about their own input height. So the pieces
 * live here and the places supply the results:
 *
 *   `FloatingSearchBar`      the sticky, blurred, bordered container
 *   `FloatingSearchInput`    the input line — hamburger, glyph, field, clear
 *   `FloatingSearchStrip`    the second line, for a page that is *about* something
 *   `SearchScopePill`        one pill of the scope row above the results
 *   `SearchBackdrop`         the dim behind an open dropdown
 *
 * Two things they encode that a place should not re-decide. The bar is the
 * route's **only** row of top chrome below `lg`, so it carries the way into the
 * nav drawer on the input's own line (`lib/mobileNavHost.ts` is what tells
 * `App.tsx` not to reserve a header above it) — and typing folds that button
 * away, because the input wants the width more than the drawer does. And every
 * row is `h-[calc(3.5rem-1px)]`, the header's height less the bar's own border,
 * so one line of chrome measures the same whichever place a reader is in.
 */

/** How wide the bar's content runs — its page's own measure. */
export type FloatingSearchWidth = 'md' | 'lg'

const WIDTH_CLASS: Record<FloatingSearchWidth, string> = {
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
}

export interface FloatingSearchBarProps {
  /** The input line, the strip, the dropdown — everything on the page's measure. */
  children: ReactNode
  /**
   * Rendered full-bleed under the container, for a status banner that spans the
   * viewport rather than the text column.
   */
  banner?: ReactNode
  width?: FloatingSearchWidth
  className?: string
}

export const FloatingSearchBar = forwardRef(function FloatingSearchBar(
  { children, banner, width = 'md', className }: FloatingSearchBarProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      data-floating-search
      className={cn('sticky top-0 z-50 border-b bg-background/90 backdrop-blur-md', className)}
    >
      <div className={cn('mx-auto px-4 sm:px-6', WIDTH_CLASS[width])}>{children}</div>
      {banner}
    </div>
  )
})

export interface FloatingSearchInputProps {
  value: string
  onChange: (value: string) => void
  onFocus?: () => void
  onClear?: () => void
  placeholder: string
  /** What the field is called for a screen reader, which is rarely the placeholder. */
  ariaLabel: string
  inputRef?: Ref<HTMLInputElement>
  /** The search is in use, so the nav button gives up the line. */
  navCollapsed?: boolean
}

export function FloatingSearchInput({
  value,
  onChange,
  onFocus,
  onClear,
  placeholder,
  ariaLabel,
  inputRef,
  navCollapsed = false,
}: FloatingSearchInputProps) {
  return (
    <div className="flex h-[calc(3.5rem-1px)] items-center gap-2">
      <MobileNavButton collapsed={navCollapsed} className="-ml-1.5" />
      <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      <input
        ref={inputRef}
        // `type="text"`, not `search`: the field is cleared by the button on its
        // own line, and a UA-drawn clear glyph beside it is the same control twice.
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        aria-label={ariaLabel}
        autoComplete="off"
        spellCheck={false}
        // 16px below `sm` is what stops iOS zooming the page on focus.
        className="min-w-0 flex-1 border-0 bg-transparent text-[16px] text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-sm"
      />
      {value && (
        <button
          type="button"
          onClick={() => (onClear ? onClear() : onChange(''))}
          aria-label="Clear search"
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export interface FloatingSearchStripProps {
  /** The strip's subject — the page this bar sits on top of. */
  title: string
  /**
   * Stands in for the title text: the subject's own mark. The page below opens
   * with its name in display type, so the strip repeating it in bold 14px was
   * the same word twice in one eyeful. The name rides along for a screen reader.
   */
  icon?: ReactNode
  /** The way back out, at the head of the strip. */
  backLink?: ReactNode
  /** Controls that belong to the subject, at the tail. */
  children?: ReactNode
}

export function FloatingSearchStrip({ title, icon, backLink, children }: FloatingSearchStripProps) {
  return (
    <div className="flex h-[calc(3.5rem-1px)] items-center gap-2.5">
      {backLink}
      {icon ? (
        <span className="flex min-w-0 flex-1 items-center">
          {icon}
          <span className="sr-only">{title}</span>
        </span>
      ) : (
        <span className="min-w-0 flex-1 truncate text-sm font-semibold">{title}</span>
      )}
      {children}
    </div>
  )
}

export interface SearchScopePillProps {
  active: boolean
  disabled?: boolean
  onClick: () => void
  children: ReactNode
}

/** One pill of the row that says *where* the query is being asked. */
export function SearchScopePill({ active, disabled, onClick, children }: SearchScopePillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      data-sound="select"
      className={cn(
        'rounded-full px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40',
        active ? 'bg-primary text-primary-foreground' : 'bg-accent text-foreground hover:bg-accent/80',
      )}
    >
      {children}
    </button>
  )
}

/**
 * The dim behind an open dropdown.
 *
 * `z-[44]` rather than `z-40`: at a tie the concept popup stayed bright under a
 * dropdown that overlapped it.
 */
export function SearchBackdrop({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[44] bg-background/60 backdrop-blur-sm"
      onMouseDown={e => {
        e.preventDefault()
        onDismiss()
      }}
    />
  )
}
