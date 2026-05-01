import { useState, isValidElement, Children, type ReactNode, type ReactElement, type ComponentType, Fragment } from 'react'
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
  FlaskConical,
} from 'lucide-react'
import type { Components } from 'react-markdown'

// Matches an Obsidian callout header at the start of a blockquote paragraph:
//   [!type]        non-foldable
//   [!type]-       foldable, collapsed by default
//   [!type]+       foldable, expanded by default
// followed by an optional title on the same line.
const HEADER_RE = /^\s*\[!(\w+)\]([-+]?)[ \t]*([^\n]*)/

type CalloutStyle = {
  icon: ComponentType<{ className?: string }>
  borderClass: string
  accentClass: string
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

const INDIGO: CalloutStyle = {
  icon: FlaskConical,
  borderClass: 'border-indigo-400/60',
  accentClass: 'text-indigo-500 dark:text-indigo-400',
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
  example: INDIGO,
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
            className="ml-1.5 inline-flex items-center rounded px-1.5 py-0.5 text-xs font-normal bg-muted text-muted-foreground align-middle"
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

const CONTENT_CLASSES = [
  'border-t border-border/40 px-4 pb-4 pt-3',
  'text-sm text-foreground leading-relaxed',
  '[&>p]:my-1.5',
  '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2',
  '[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2',
  '[&_li]:my-0.5',
  '[&_li::marker]:text-muted-foreground/60',
  '[&_strong]:font-semibold',
  '[&_a]:text-primary [&_a]:underline',
  '[&_table]:w-full [&_table]:border-collapse [&_table]:mt-2 [&_table]:text-sm',
  '[&_th]:py-2 [&_th]:px-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-medium [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-muted-foreground [&_th]:border-b [&_th]:border-border/60',
  '[&_td]:py-2 [&_td]:px-3 [&_td]:border-b [&_td]:border-border/30 [&_td]:align-top',
  '[&_tbody_tr:last-child_td]:border-0',
].join(' ')

function Callout({ type, fold, title, children }: CalloutProps) {
  const collapsible = fold !== ''
  const [open, setOpen] = useState(fold !== '-')
  const style = getStyle(type)
  const Icon = style.icon
  const displayTitle = title || titleCase(type)
  const hasBody = Children.count(children) > 0

  const headerContent = (
    <div className="flex items-center gap-3 w-full">
      <Icon className={`h-4 w-4 shrink-0 ${style.accentClass}`} />
      <span className="font-medium text-sm text-foreground flex-1 text-left">{renderTitle(displayTitle)}</span>
      {collapsible && hasBody && (
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
        />
      )}
    </div>
  )

  return (
    <div className={`not-prose my-4 border-l-[3px] ${style.borderClass} bg-muted/50 rounded-r-lg overflow-hidden`}>
      {collapsible && hasBody ? (
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="w-full px-4 py-3 text-left hover:bg-muted/60 transition-colors duration-150"
          aria-expanded={open}
        >
          {headerContent}
        </button>
      ) : (
        <div className="px-4 py-3">{headerContent}</div>
      )}
      {hasBody && open && (
        <div className={CONTENT_CLASSES}>
          {children}
        </div>
      )}
    </div>
  )
}

export const calloutComponents: Components = {
  blockquote(props) {
    const { children, ...rest } = props
    const match = matchCallout(children)
    if (!match) {
      return <blockquote {...rest}>{children}</blockquote>
    }
    return (
      <Callout type={match.type} fold={match.fold} title={match.title}>
        {match.body}
      </Callout>
    )
  },
}
