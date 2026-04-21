import { useState, isValidElement, Children, type ReactNode, type ReactElement, type ComponentType } from 'react'
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
  containerClass: string
  titleClass: string
  iconClass: string
}

const DEFAULT_STYLE: CalloutStyle = {
  icon: Pencil,
  containerClass: 'border-muted-foreground/30 bg-muted/30',
  titleClass: 'text-foreground',
  iconClass: 'text-muted-foreground',
}

const SKY: CalloutStyle = {
  icon: Info,
  containerClass: 'border-sky-400/40 bg-sky-50 dark:bg-sky-950/40',
  titleClass: 'text-sky-900 dark:text-sky-200',
  iconClass: 'text-sky-600 dark:text-sky-400',
}

const TEAL: CalloutStyle = {
  icon: Lightbulb,
  containerClass: 'border-teal-400/40 bg-teal-50 dark:bg-teal-950/40',
  titleClass: 'text-teal-900 dark:text-teal-200',
  iconClass: 'text-teal-600 dark:text-teal-400',
}

const INDIGO: CalloutStyle = {
  icon: FlaskConical,
  containerClass: 'border-indigo-400/40 bg-indigo-50 dark:bg-indigo-950/40',
  titleClass: 'text-indigo-900 dark:text-indigo-200',
  iconClass: 'text-indigo-600 dark:text-indigo-400',
}

const EMERALD: CalloutStyle = {
  icon: CheckCircle2,
  containerClass: 'border-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/40',
  titleClass: 'text-emerald-900 dark:text-emerald-200',
  iconClass: 'text-emerald-600 dark:text-emerald-400',
}

const AMBER: CalloutStyle = {
  icon: AlertTriangle,
  containerClass: 'border-amber-400/40 bg-amber-50 dark:bg-amber-950/40',
  titleClass: 'text-amber-900 dark:text-amber-200',
  iconClass: 'text-amber-600 dark:text-amber-400',
}

const RED: CalloutStyle = {
  icon: AlertOctagon,
  containerClass: 'border-red-400/40 bg-red-50 dark:bg-red-950/40',
  titleClass: 'text-red-900 dark:text-red-200',
  iconClass: 'text-red-600 dark:text-red-400',
}

const YELLOW: CalloutStyle = {
  icon: HelpCircle,
  containerClass: 'border-yellow-400/40 bg-yellow-50 dark:bg-yellow-950/40',
  titleClass: 'text-yellow-900 dark:text-yellow-200',
  iconClass: 'text-yellow-600 dark:text-yellow-400',
}

const VIOLET: CalloutStyle = {
  icon: AlertOctagon,
  containerClass: 'border-violet-400/40 bg-violet-50 dark:bg-violet-950/40',
  titleClass: 'text-violet-900 dark:text-violet-200',
  iconClass: 'text-violet-600 dark:text-violet-400',
}

const CYAN: CalloutStyle = {
  icon: BookOpen,
  containerClass: 'border-cyan-400/40 bg-cyan-50 dark:bg-cyan-950/40',
  titleClass: 'text-cyan-900 dark:text-cyan-200',
  iconClass: 'text-cyan-600 dark:text-cyan-400',
}

const QUOTE_STYLE: CalloutStyle = {
  icon: Quote,
  containerClass: 'border-muted-foreground/30 bg-muted/30',
  titleClass: 'text-foreground',
  iconClass: 'text-muted-foreground',
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

function Callout({ type, fold, title, children }: CalloutProps) {
  const collapsible = fold !== ''
  const [open, setOpen] = useState(fold !== '-')
  const style = getStyle(type)
  const Icon = style.icon
  const displayTitle = title || titleCase(type)

  const header = (
    <div className={`flex items-center gap-2 ${style.titleClass}`}>
      {collapsible ? (
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${open ? '' : '-rotate-90'} ${style.iconClass}`}
        />
      ) : (
        <Icon className={`h-4 w-4 shrink-0 ${style.iconClass}`} />
      )}
      <span className="font-semibold text-sm">{displayTitle}</span>
    </div>
  )

  const hasBody = Children.count(children) > 0

  return (
    <div className={`not-prose rounded-md border px-3 py-2 my-3 ${style.containerClass}`}>
      {collapsible && hasBody ? (
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="w-full text-left"
          aria-expanded={open}
        >
          {header}
        </button>
      ) : (
        header
      )}
      {hasBody && open && (
        <div className="mt-2 text-sm text-foreground space-y-2 [&>p]:my-1 [&>ul]:my-1 [&>ol]:my-1">
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
