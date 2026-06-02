import { useState, useContext, isValidElement, Children, type ReactNode, type ReactElement, type ComponentType, Fragment } from 'react'
import { MathViewContext } from '@/contexts/MathViewContext'
import {
  ChevronDown,
  Info,
  Lightbulb,
  AlertTriangle,
  AlertOctagon,
  HelpCircle,
  CheckCircle2,
  BookOpen,
  Quote,
  Pencil,
} from 'lucide-react'
import type { Components } from 'react-markdown'

// Matches an Obsidian callout header at the start of a blockquote paragraph:
//   [!type]        non-foldable
//   [!type]-       foldable, collapsed by default
//   [!type]+       foldable, expanded by default
// followed by an optional title on the same line.
const HEADER_RE = /^\s*\[!(\w+)\]([-+]?)[ \t]*([^\n]*)/

type CalloutStyle = {
  icon: ComponentType<{ className?: string }> | null
  borderClass: string
  accentClass: string
  roundLeft?: boolean
  noBorder?: boolean
  bgClass?: string
  contentClass?: string
}

const DEFAULT_STYLE: CalloutStyle = {
  icon: Pencil,
  borderClass: 'border-border',
  accentClass: 'text-muted-foreground',
}

const SKY: CalloutStyle = {
  icon: Info,
  borderClass: 'border-sky-500/60',
  accentClass: 'text-sky-600 dark:text-sky-400',
}

const TEAL: CalloutStyle = {
  icon: Lightbulb,
  borderClass: 'border-teal-500/60',
  accentClass: 'text-teal-600 dark:text-teal-400',
}

const EXAMPLE_STYLE: CalloutStyle = {
  icon: null,
  borderClass: 'border-slate-300 dark:border-slate-500',
  accentClass: 'text-foreground',
  roundLeft: true,
  noBorder: true,
  bgClass: 'bg-card',
  contentClass: 'text-base text-muted-foreground',
}

const EMERALD: CalloutStyle = {
  icon: CheckCircle2,
  borderClass: 'border-emerald-500/60',
  accentClass: 'text-emerald-600 dark:text-emerald-400',
}

const AMBER: CalloutStyle = {
  icon: AlertTriangle,
  borderClass: 'border-amber-500/60',
  accentClass: 'text-amber-600 dark:text-amber-400',
}

const RED: CalloutStyle = {
  icon: AlertOctagon,
  borderClass: 'border-red-500/60',
  accentClass: 'text-red-600 dark:text-red-400',
}

const YELLOW: CalloutStyle = {
  icon: HelpCircle,
  borderClass: 'border-yellow-500/60',
  accentClass: 'text-yellow-600 dark:text-yellow-400',
}

const VIOLET: CalloutStyle = {
  icon: AlertOctagon,
  borderClass: 'border-violet-500/60',
  accentClass: 'text-violet-500 dark:text-violet-400',
}

const CYAN: CalloutStyle = {
  icon: BookOpen,
  borderClass: 'border-cyan-500/60',
  accentClass: 'text-cyan-600 dark:text-cyan-400',
}

const QUOTE_STYLE: CalloutStyle = {
  icon: Quote,
  borderClass: 'border-border',
  accentClass: 'text-muted-foreground',
}

const STYLE_MAP: Record<string, CalloutStyle> = {
  note: DEFAULT_STYLE,
  info: SKY,
  todo: SKY,
  tip: TEAL,
  hint: TEAL,
  important: VIOLET,
  example: EXAMPLE_STYLE,
  answer: EMERALD,
  success: EMERALD,
  check: EMERALD,
  done: EMERALD,
  warning: AMBER,
  caution: AMBER,
  attention: AMBER,
  danger: RED,
  error: RED,
  failure: RED,
  fail: RED,
  missing: RED,
  bug: RED,
  question: YELLOW,
  faq: YELLOW,
  help: YELLOW,
  quote: QUOTE_STYLE,
  cite: QUOTE_STYLE,
  abstract: CYAN,
  summary: CYAN,
  tldr: CYAN,
}

function getStyle(type: string): CalloutStyle {
  return STYLE_MAP[type] ?? DEFAULT_STYLE
}

function titleCase(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s
}

// Splits "General Probability {23–30%}" into text + pill badges for each {…}.
function renderTitle(raw: string): ReactNode {
  const parts = raw.split(/(\{[^}]+\})/)
  if (parts.length === 1) return raw
  return (
    <Fragment>
      {parts.map((part, i) =>
        part.startsWith('{') && part.endsWith('}') ? (
          <span
            key={i}
            className="ml-1.5 inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium bg-primary/10 text-primary align-middle"
          >
            {part.slice(1, -1)}
          </span>
        ) : (
          part || null
        ),
      )}
    </Fragment>
  )
}

// Extracts the average percentage from a title containing {5-15%} or {15%}.
function parseExamPercentage(title: string): number | null {
  const match = title.match(/\{([^}]+)\}/)
  if (!match) return null
  const content = match[1].trim()
  const rangeMatch = content.match(/(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)\s*%/)
  if (rangeMatch) return (parseFloat(rangeMatch[1]) + parseFloat(rangeMatch[2])) / 2
  const singleMatch = content.match(/(\d+(?:\.\d+)?)\s*%/)
  if (singleMatch) return parseFloat(singleMatch[1])
  return null
}

interface MatchResult {
  type: string
  fold: '' | '-' | '+'
  title: string
  body: ReactNode[]
}

function matchCallout(children: ReactNode): MatchResult | null {
  const childArray = Children.toArray(children)
  if (childArray.length === 0) return null

  // Exam-page callouts frequently have shape:
  //   > [!answer]- Title
  //   >
  //   > <div>…</div> or a table or list
  // which react-markdown renders with a leading whitespace text node and/or a
  // non-<p> first child (table, div, ul, …). We scan forward to find the
  // first node that contains the `[!type]` header — usually the opening text
  // of the first <p>, but can be a bare string child too.

  let headerIdx = -1
  let match: RegExpMatchArray | null = null
  let headerString: string | null = null
  let headerInsideP = false

  for (let i = 0; i < childArray.length; i++) {
    const child = childArray[i]

    if (typeof child === 'string') {
      if (child.trim() === '') continue
      const m = child.match(HEADER_RE)
      if (m) {
        headerIdx = i
        match = m
        headerString = child
        headerInsideP = false
        break
      }
      return null
    }

    if (isValidElement(child) && (child as ReactElement).type === 'p') {
      const pKids = Children.toArray(
        ((child as ReactElement).props as { children?: ReactNode }).children ?? [],
      )
      if (pKids.length === 0) continue
      const first = pKids[0]
      if (typeof first !== 'string') return null
      if (first.trim() === '' && pKids.length === 1) continue
      const m = first.match(HEADER_RE)
      if (!m) return null
      headerIdx = i
      match = m
      headerString = first
      headerInsideP = true
      break
    }

    // First substantive child isn't a string or <p> — not a callout we can parse.
    return null
  }

  if (!match || headerString === null) return null

  const type = match[1].toLowerCase()
  const fold = (match[2] === '-' || match[2] === '+' ? match[2] : '') as '' | '-' | '+'
  const titleTail = (match[3] ?? '').trim()

  const body: ReactNode[] = []

  if (headerInsideP) {
    const headerChild = childArray[headerIdx] as ReactElement
    const pKids = Children.toArray(
      ((headerChild as ReactElement).props as { children?: ReactNode }).children ?? [],
    )
    const newlineIdx = headerString.indexOf('\n')
    const remainingFirstText = newlineIdx >= 0 ? headerString.slice(newlineIdx + 1) : ''
    const remainingPKids = pKids.slice(1)

    if (remainingFirstText.length > 0 || remainingPKids.length > 0) {
      const newPKids: ReactNode[] = []
      if (remainingFirstText.length > 0) newPKids.push(remainingFirstText)
      for (const c of remainingPKids) newPKids.push(c)
      body.push(<p key="callout-p-head">{newPKids}</p>)
    }
  } else {
    const newlineIdx = headerString.indexOf('\n')
    const remaining = newlineIdx >= 0 ? headerString.slice(newlineIdx + 1) : ''
    if (remaining.length > 0) body.push(remaining)
  }

  for (let i = headerIdx + 1; i < childArray.length; i++) {
    body.push(childArray[i])
  }

  return { type, fold, title: titleTail, body }
}

interface CalloutProps {
  type: string
  fold: '' | '-' | '+'
  title: string
  children: ReactNode
}

const CONTENT_CLASSES_SHARED = [
  'border-t border-border/40 px-4 pb-4 pt-3',
  'leading-relaxed',
  '[&>p]:my-1.5',
  '[&>p:first-of-type]:text-muted-foreground [&>p:first-of-type]:italic [&>p:first-of-type]:mb-3',
  '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2',
  '[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2',
  '[&_li]:my-1',
  '[&>ul]:my-1.5 [&>ul]:pl-4 [&_ul]:list-disc',
  '[&>ol]:my-1.5 [&>ol]:pl-4 [&_ol]:list-decimal',
  '[&_li::marker]:text-muted-foreground/60',
  '[&_strong]:font-semibold',
  '[&_a]:text-primary [&_a]:underline',
  '[&_table]:w-full [&_table]:border-collapse [&_table]:mt-2 [&_table]:text-sm',
  '[&_th]:py-2 [&_th]:px-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-medium [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-muted-foreground [&_th]:border-b [&_th]:border-border/60',
  '[&_td]:py-2 [&_td]:px-3 [&_td]:border-b [&_td]:border-border/30 [&_td]:align-top',
  '[&_tbody_tr:last-child_td]:border-0',
].join(' ')

const CONTENT_CLASSES = `text-sm text-foreground ${CONTENT_CLASSES_SHARED}`

function Callout({ type, fold, title, children }: CalloutProps) {
  const collapsible = fold !== ''
  const [open, setOpen] = useState(fold !== '-')
  const style = getStyle(type)
  const Icon = style.icon
  const displayTitle = title || titleCase(type)
  const hasBody = Children.count(children) > 0

  const examPercentage = type === 'example' ? parseExamPercentage(title) : null
  const isBarGraph = examPercentage !== null

  const headerContent = (
    <div className="flex items-center gap-3 w-full">
      {Icon && <Icon className={`h-4 w-4 shrink-0 ${style.accentClass}`} />}
      <span className={`font-medium flex-1 text-left ${style.noBorder ? 'text-base' : 'text-sm'} ${Icon ? 'text-foreground' : style.accentClass}`}>{renderTitle(displayTitle)}</span>
      {collapsible && hasBody && (
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
        />
      )}
    </div>
  )

  const roundClass = style.roundLeft ? 'rounded-lg' : 'rounded-r-lg'
  const borderClasses = style.noBorder ? '' : `border-l-[3px] ${style.borderClass}`
  const bgClass = style.bgClass ?? 'bg-card'
  const contentClasses = style.contentClass
    ? `${style.contentClass} ${CONTENT_CLASSES_SHARED}`
    : CONTENT_CLASSES

  if (isBarGraph) {
    return (
      <div className="not-prose my-4 rounded-lg overflow-hidden bg-background border border-border">
        <div className="relative">
          {/* Grey bar fills to exam coverage % when collapsed, full width when expanded */}
          <div
            className="absolute inset-y-0 left-0 bg-card transition-all duration-300"
            style={{ width: open ? '100%' : `${examPercentage}%` }}
          />
          {collapsible && hasBody ? (
            <button
              type="button"
              data-callout-toggle
              onClick={() => setOpen(v => !v)}
              className="relative z-10 w-full px-4 py-3 text-left hover:bg-accent/30 transition-colors duration-150"
              aria-expanded={open}
            >
              {headerContent}
            </button>
          ) : (
            <div className="relative z-10 px-4 py-3">{headerContent}</div>
          )}
        </div>
        {hasBody && (
          <div data-callout-body hidden={!open} className={`bg-card ${contentClasses}`}>
            {children}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`not-prose my-4 ${borderClasses} ${bgClass} ${roundClass} overflow-hidden`}>
      {collapsible && hasBody ? (
        <button
          type="button"
          data-callout-toggle
          onClick={() => setOpen(v => !v)}
          className="w-full px-4 py-3 text-left hover:bg-accent/50 transition-colors duration-150"
          aria-expanded={open}
        >
          {headerContent}
        </button>
      ) : (
        <div className="px-4 py-3">{headerContent}</div>
      )}
      {hasBody && (
        <div data-callout-body hidden={!open} className={contentClasses}>
          {children}
        </div>
      )}
    </div>
  )
}

function hasDisplayMath(node: ReactNode): boolean {
  if (node === null || node === undefined) return false
  if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') return false
  if (Array.isArray(node)) return node.some(hasDisplayMath)
  if (isValidElement(node)) {
    const el = node as ReactElement
    const props = el.props as Record<string, unknown>
    if (typeof props.className === 'string' && props.className.includes('katex-display')) return true
    if (props.children != null) return hasDisplayMath(props.children as ReactNode)
  }
  return false
}

export const calloutComponents: Components = {
  blockquote(props) {
    const { children, ...rest } = props
    const match = matchCallout(children)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const mathCtx = useContext(MathViewContext)
    const isMathBlock = !match && hasDisplayMath(children)

    if (!match) {
      return (
        <blockquote
          {...rest}
          className={`not-prose my-4 bg-background rounded-lg px-6 py-4 text-center [&_p]:m-0${
            isMathBlock && mathCtx && !mathCtx.active
              ? ' cursor-pointer hover:ring-2 hover:ring-primary/40 transition-shadow'
              : ''
          }`}
          onClick={isMathBlock && mathCtx && !mathCtx.active ? mathCtx.enter : undefined}
        >
          {children}
        </blockquote>
      )
    }
    return (
      <Callout type={match.type} fold={match.fold} title={match.title}>
        {match.body}
      </Callout>
    )
  },
}
