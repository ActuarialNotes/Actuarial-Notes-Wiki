import { useState, isValidElement, Children, type ReactNode, type ReactElement, type ComponentType, type ComponentProps, Fragment } from 'react'
import {
  ChevronDown,
  Info,
  Lightbulb,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  BookOpen,
  Quote,
  Pencil,
  Sparkles,
} from 'lucide-react'
import type { ExtraProps } from 'react-markdown'
import { ExamWeightLabel } from '@/components/ExamWeightLabel'
import { parseExamWeight, splitWeightTag } from '@/lib/examWeight'

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
  noBorder?: boolean
  bgClass?: string
  contentClass?: string
  /** Replaces the default `my-4` between callouts. */
  marginClass?: string
  /** Padding for the header row (and the toggle button that wraps it). */
  headerClass?: string
  /** Replaces the grey hover wash on a foldable header. */
  hoverClass?: string
  /**
   * The body runs straight on from the header: no hairline between them, and
   * no italic lead paragraph (that treatment is for a learning objective's
   * one-line summary, not an answer).
   */
  plainBody?: boolean
  /**
   * A tinted note card in the shape of a question's examiner's report
   * (`ExaminerReportCard`): no side rule, the icon and a small bold title in
   * the accent, the body at reading size. Never folded — a card is read in
   * place, not opened.
   */
  card?: boolean
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

// A concept page's closing "How it appears on the exam" (tip) and "Exam traps"
// (warning) folds: rounded cards at reading size, the icon carrying the colour
// instead of a side rule — the same shape as the worked examples above them.
const TEAL: CalloutStyle = {
  icon: Lightbulb,
  borderClass: 'border-teal-500/60',
  accentClass: 'text-teal-600 dark:text-teal-400',
  noBorder: true,
  contentClass: 'text-base text-foreground',
}

const EXAMPLE_STYLE: CalloutStyle = {
  icon: null,
  borderClass: 'border-slate-300 dark:border-slate-500',
  accentClass: 'text-foreground',
  noBorder: true,
  bgClass: 'bg-card',
  contentClass: 'text-base text-muted-foreground',
}

// A concept page's worked example — one marked `{Example}` in its title. A green
// card with an "Example" pill, folded so the reader meets the question first:
// green sits beside the violet idea card and the amber trap card without
// meaning *correct* there, because it is a card of its own shape, never a verdict
// on an answer.
const WORKED_EXAMPLE_STYLE: CalloutStyle = {
  icon: null,
  borderClass: '',
  accentClass: 'text-emerald-950 dark:text-emerald-50',
  noBorder: true,
  bgClass: 'bg-emerald-50 dark:bg-emerald-950/40',
  hoverClass: 'hover:bg-emerald-100/70 dark:hover:bg-emerald-900/40',
  contentClass: 'text-base text-foreground',
  plainBody: true,
}

/** The `{Example}` tag that marks a worked example, rather than a learning objective. */
const EXAMPLE_TAG_RE = /\s*\{Example\}\s*$/

const EMERALD: CalloutStyle = {
  icon: CheckCircle2,
  borderClass: 'border-emerald-500/60',
  accentClass: 'text-emerald-600 dark:text-emerald-400',
  noBorder: true,
}

const AMBER: CalloutStyle = {
  icon: AlertTriangle,
  borderClass: 'border-amber-500/60',
  accentClass: 'text-amber-600 dark:text-amber-400',
  noBorder: true,
  contentClass: 'text-base text-foreground',
}

const RED: CalloutStyle = {
  icon: AlertOctagon,
  borderClass: 'border-red-500/60',
  accentClass: 'text-red-600 dark:text-red-400',
}

// A question on a guide page ("Do I need a degree?"). These stack into an FAQ,
// so each is a soft grey card rather than an aside hung off a coloured rule:
// no side border, no icon repeated down the page, and the answer set at the
// same size as the prose around it.
const QUESTION_STYLE: CalloutStyle = {
  icon: null,
  borderClass: '',
  accentClass: 'text-foreground',
  noBorder: true,
  marginClass: 'my-3',
  bgClass: 'bg-muted/60 dark:bg-white/[0.06]',
  hoverClass: 'hover:bg-muted dark:hover:bg-white/[0.09]',
  headerClass: 'px-5 py-4',
  contentClass: 'text-base text-foreground',
  plainBody: true,
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

// A concept page's "The idea" — why the formula has the shape it has, in
// words. Violet, which the meaning map (style guide §4.1) keeps for it, so the
// explanation never reads as a verdict or as the blue examiner's report.
const IDEA_STYLE: CalloutStyle = {
  icon: Sparkles,
  borderClass: '',
  accentClass: 'text-violet-900 dark:text-violet-100',
  bgClass: 'bg-violet-50 dark:bg-violet-950/50',
  card: true,
}

// A trap set beside the idea it distorts, rather than folded into the page's
// closing "Exam traps" list. Amber: the caution hue.
const TRAP_STYLE: CalloutStyle = {
  icon: AlertTriangle,
  borderClass: '',
  accentClass: 'text-amber-900 dark:text-amber-100',
  bgClass: 'bg-amber-50 dark:bg-amber-950/50',
  card: true,
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
  question: QUESTION_STYLE,
  faq: QUESTION_STYLE,
  help: QUESTION_STYLE,
  quote: QUOTE_STYLE,
  cite: QUOTE_STYLE,
  abstract: CYAN,
  summary: CYAN,
  tldr: CYAN,
  idea: IDEA_STYLE,
  trap: TRAP_STYLE,
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

// Is this child the blockquote's first paragraph?
//
// react-markdown hands us the intrinsic `<p>` element normally, but when the
// consumer overrides `components.p` (WikiArticle does, to unwrap distribution
// simulators) the element's type is that component instead. react-markdown
// renders custom components with `passNode`, so the original tag is still
// available on the `node` prop — check both spellings.
function isParagraph(child: ReactElement): boolean {
  if (child.type === 'p') return true
  const node = (child.props as { node?: { tagName?: string } }).node
  return node?.tagName === 'p'
}

interface MatchResult {
  type: string
  fold: '' | '-' | '+'
  title: string
  /**
   * The rest of the title line after its first run of text: inline math, emphasis
   * or code that the markdown parser split off as elements of their own, and the
   * text after them. Without it a title is cut at its first `$…$`, and the rest of
   * the line drops into the body.
   */
  titleRest: ReactNode[]
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

    if (isValidElement(child) && isParagraph(child as ReactElement)) {
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
  const titleRest: ReactNode[] = []

  if (headerInsideP) {
    const headerChild = childArray[headerIdx] as ReactElement
    const pKids = Children.toArray(
      ((headerChild as ReactElement).props as { children?: ReactNode }).children ?? [],
    )
    const newlineIdx = headerString.indexOf('\n')
    let remainingFirstText = newlineIdx >= 0 ? headerString.slice(newlineIdx + 1) : ''
    let remainingPKids = pKids.slice(1)

    // The title line runs on past the header's own text node when it holds
    // inline math or emphasis: take everything up to the line's end.
    if (newlineIdx < 0) {
      let i = 0
      for (; i < remainingPKids.length; i++) {
        const kid = remainingPKids[i]
        if (typeof kid === 'string' && kid.includes('\n')) {
          const cut = kid.indexOf('\n')
          if (cut > 0) titleRest.push(kid.slice(0, cut))
          remainingFirstText = kid.slice(cut + 1)
          i++
          break
        }
        titleRest.push(kid)
      }
      remainingPKids = remainingPKids.slice(i)
    }

    if (remainingFirstText.length > 0 || remainingPKids.length > 0) {
      const newPKids: ReactNode[] = []
      if (remainingFirstText.length > 0) newPKids.push(remainingFirstText)
      for (const c of remainingPKids) newPKids.push(c)
      // A formula on the line under the header is broken onto its own line
      // (lib/displayMath.ts); with the header lifted out, that break would open
      // the body on an empty line.
      while (newPKids.length > 0 && isValidElement(newPKids[0]) && (newPKids[0] as ReactElement).type === 'br') {
        newPKids.shift()
      }
      if (newPKids.length > 0) body.push(<p key="callout-p-head">{newPKids}</p>)
    }
  } else {
    const newlineIdx = headerString.indexOf('\n')
    const remaining = newlineIdx >= 0 ? headerString.slice(newlineIdx + 1) : ''
    if (remaining.length > 0) body.push(remaining)
  }

  for (let i = headerIdx + 1; i < childArray.length; i++) {
    body.push(childArray[i])
  }

  // A title that ends in a run of text after its math keeps that text's end free
  // of whitespace, as the header's own text is.
  const last = titleRest[titleRest.length - 1]
  if (typeof last === 'string') titleRest[titleRest.length - 1] = last.trimEnd()

  return { type, fold, title: titleRest.length > 0 ? (match[3] ?? '').trimStart() : titleTail, titleRest, body }
}

/** Does the title end in the `{Example}` tag, and the title without it. */
function splitExampleTag(title: string, titleRest: ReactNode[]): { title: string; titleRest: ReactNode[]; isExample: boolean } {
  const last = titleRest[titleRest.length - 1]
  if (typeof last === 'string' && EXAMPLE_TAG_RE.test(last)) {
    return { title, titleRest: [...titleRest.slice(0, -1), last.replace(EXAMPLE_TAG_RE, '')], isExample: true }
  }
  if (titleRest.length === 0 && EXAMPLE_TAG_RE.test(title)) {
    return { title: title.replace(EXAMPLE_TAG_RE, ''), titleRest, isExample: true }
  }
  return { title, titleRest, isExample: false }
}

/** The title line: its text (with `{…}` pills) and whatever inline nodes followed it. */
function renderTitleLine(title: string, titleRest: ReactNode[]): ReactNode {
  if (titleRest.length === 0) return renderTitle(title)
  return (
    <Fragment>
      {renderTitle(title)}
      {titleRest.map((node, i) => (
        <Fragment key={i}>{typeof node === 'string' ? renderTitle(node) : node}</Fragment>
      ))}
    </Fragment>
  )
}

interface CalloutProps {
  type: string
  fold: '' | '-' | '+'
  title: string
  titleRest?: ReactNode[]
  children: ReactNode
}

// Every callout box, folding or not, has the same corners and spans the column,
// so a page's boxes read as one set.
const CALLOUT_ROUND = 'rounded-xl'
// A folding box's title is underlined, so it reads as something to tap — the
// article's own link underline (the text's colour, the default thickness), so it
// looks like the concept links around it. A worked example is not: its pill
// already says what it is.
const TOGGLE_TITLE = 'underline'

// The hairline under the header and the body's padding below it.
const BODY_FRAME = 'border-t border-border/40 px-4 pb-4 pt-3'
// A learning objective's first line is its summary, set apart in muted italics.
const LEAD_PARAGRAPH = '[&>p:first-of-type]:text-muted-foreground [&>p:first-of-type]:italic [&>p:first-of-type]:mb-3'

const CONTENT_CLASSES_SHARED = [
  'leading-relaxed',
  '[&>p]:my-1.5',
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

const CONTENT_CLASSES = `text-sm text-foreground ${BODY_FRAME} ${LEAD_PARAGRAPH} ${CONTENT_CLASSES_SHARED}`

// A note card's body: the article's reading size, flush with the card's padding.
const CARD_BODY_CLASSES = `text-base text-foreground [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 ${CONTENT_CLASSES_SHARED}`

function NoteCard({ style, title, titleRest = [], children }: { style: CalloutStyle; title: string; titleRest?: ReactNode[]; children: ReactNode }) {
  const Icon = style.icon
  return (
    <section aria-label={titleRest.length > 0 ? undefined : title} className={`not-prose my-4 space-y-2 ${CALLOUT_ROUND} p-4 ${style.bgClass ?? 'bg-muted'}`}>
      <p className={`flex items-center gap-1.5 text-sm font-semibold ${style.accentClass}`}>
        {Icon && <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />}
        <span>{renderTitleLine(title, titleRest)}</span>
      </p>
      {Children.count(children) > 0 && <div className={CARD_BODY_CLASSES}>{children}</div>}
    </section>
  )
}

function Callout({ type, fold, title, titleRest = [], children }: CalloutProps) {
  const style = getStyle(type)
  if (style.card) {
    return (
      <NoteCard style={style} title={title || titleCase(type)} titleRest={titleRest}>
        {children}
      </NoteCard>
    )
  }
  if (type === 'example') {
    const tagged = splitExampleTag(title, titleRest)
    if (tagged.isExample) {
      return (
        <FoldingCallout type={type} fold={fold} title={tagged.title} titleRest={tagged.titleRest} style={WORKED_EXAMPLE_STYLE} pill="Example">
          {children}
        </FoldingCallout>
      )
    }
  }
  return <FoldingCallout type={type} fold={fold} title={title} titleRest={titleRest} style={style}>{children}</FoldingCallout>
}

function FoldingCallout({ type, fold, title, titleRest = [], style, pill, children }: CalloutProps & { style: CalloutStyle; pill?: string }) {
  const collapsible = fold !== ''
  const [open, setOpen] = useState(fold !== '-')
  // Once the reader has toggled it, the body streams in on every open, like
  // text being written (`.callout-stream` in index.css). A body open on first
  // render doesn't animate — nobody asked for it.
  const [toggled, setToggled] = useState(false)
  const toggle = () => { setToggled(true); setOpen(v => !v) }
  const streamClass = toggled ? ' callout-stream' : ''
  const Icon = style.icon
  const hasBody = Children.count(children) > 0

  // A learning objective's `{23-30%}` share of the exam is lifted out of the
  // title and rendered as its own right-aligned label, the same one the quiz
  // builder uses (`ExamWeightLabel`) — so the figures line up in a column
  // instead of trailing titles of ragged length. Any other `{…}` tag stays in
  // the title and keeps the inline pill.
  const { title: baseTitle, weight: examWeight } =
    type === 'example' && titleRest.length === 0 && !pill ? splitWeightTag(title) : { title, weight: null }
  // A title that opens with math has no text of its own; it is not titleless.
  const displayTitle = baseTitle || (titleRest.length > 0 ? '' : titleCase(type))
  const examPercentage = parseExamWeight(examWeight)
  const isBarGraph = examPercentage !== null

  const headerContent = (
    <div className="flex items-center gap-3 w-full">
      {Icon && <Icon className={`h-4 w-4 shrink-0 ${style.accentClass}`} />}
      <span className={`font-medium flex-1 text-left ${style.noBorder ? 'text-base' : 'text-sm'} ${Icon ? 'text-foreground' : style.accentClass}${collapsible && hasBody && !pill ? ` ${TOGGLE_TITLE}` : ''}`}>
        {pill && (
          <span className="mr-2 inline-flex items-center rounded-full bg-emerald-600/15 px-2 py-0.5 align-middle text-xs font-semibold text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200">
            {pill}
          </span>
        )}
        {renderTitleLine(displayTitle, titleRest)}
      </span>
      {examWeight && <ExamWeightLabel weight={examWeight} bar={false} />}
      {collapsible && hasBody && (
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
        />
      )}
    </div>
  )

  const borderClasses = style.noBorder ? '' : `border-l-[3px] ${style.borderClass}`
  const bgClass = style.bgClass ?? 'bg-card'
  const marginClass = style.marginClass ?? 'my-4'
  const headerClass = style.headerClass ?? 'px-4 py-3'
  const hoverClass = style.hoverClass ?? 'hover:bg-accent/50'
  const contentClasses = style.plainBody
    ? `${style.contentClass ?? 'text-sm text-foreground'} px-5 pb-5 pt-0 ${CONTENT_CLASSES_SHARED}`
    : style.contentClass
      ? `${style.contentClass} ${BODY_FRAME} ${LEAD_PARAGRAPH} ${CONTENT_CLASSES_SHARED}`
      : CONTENT_CLASSES

  if (isBarGraph) {
    return (
      <div className={`not-prose my-4 ${CALLOUT_ROUND} overflow-hidden bg-background`}>
        <div className="relative bg-card">
          {/* The objective is a card like the page's other rows, and its share of
              the exam is a line along its bottom edge in the exam's own colour
              (the logo's `--exam-accent-vivid`, scoped by `WikiExam`): drawn to
              the percentage while collapsed, run the full width when open.
              Plain foreground grey wherever no exam is in scope. */}
          <div
            aria-hidden
            className={`absolute left-0 bottom-0 transition-all duration-300 bg-[color:var(--exam-accent-vivid,hsl(var(--muted-foreground)))] h-[3px]`}
            style={{ width: open ? '100%' : `${examPercentage}%` }}
          />
          {collapsible && hasBody ? (
            <button
              type="button"
              data-callout-toggle
              onClick={toggle}
              className={`relative z-10 w-full px-5 py-3 text-left hover:bg-accent/30 transition-colors duration-150`}
              aria-expanded={open}
            >
              {headerContent}
            </button>
          ) : (
            <div className="relative z-10 px-5 py-3">{headerContent}</div>
          )}
        </div>
        {hasBody && (
          <div data-callout-body hidden={!open} className={`${contentClasses}${streamClass}`}>
            {children}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`not-prose ${marginClass} ${borderClasses} ${bgClass} ${CALLOUT_ROUND} overflow-hidden`}>
      {collapsible && hasBody ? (
        <button
          type="button"
          data-callout-toggle
          onClick={toggle}
          className={`w-full ${headerClass} text-left ${hoverClass} transition-colors duration-150`}
          aria-expanded={open}
        >
          {headerContent}
        </button>
      ) : (
        <div className={headerClass}>{headerContent}</div>
      )}
      {hasBody && (
        <div data-callout-body hidden={!open} className={`${contentClasses}${streamClass}`}>
          {children}
        </div>
      )}
    </div>
  )
}

function classList(value: unknown): string[] {
  if (typeof value === 'string') return value.split(/\s+/)
  if (Array.isArray(value)) return value.flatMap(entry => (typeof entry === 'string' ? entry.split(/\s+/) : []))
  return []
}

/**
 * Does this blockquote hold a rendered formula?
 *
 * Matches the KaTeX root rather than `.katex-display`: the vault writes boxed
 * formulas as `> $$…$$` on one line, which remark parses as inline math, so the
 * display wrapper is never emitted. Both spellings end up as `.katex`.
 */
function hasRenderedMath(node: ReactNode): boolean {
  if (node === null || node === undefined) return false
  if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') return false
  if (Array.isArray(node)) return node.some(hasRenderedMath)
  if (isValidElement(node)) {
    const el = node as ReactElement
    const props = el.props as Record<string, unknown>
    if (classList(props.className).includes('katex')) return true
    if (props.children != null) return hasRenderedMath(props.children as ReactNode)
  }
  return false
}

/**
 * The markdown `blockquote`: an Obsidian callout when its first line is a
 * `[!type]` header, otherwise a plain box — a math focus target when it holds a
 * formula. Handed to react-markdown by `components/calloutComponents.ts`.
 */
export function CalloutBlockquote(props: ComponentProps<'blockquote'> & ExtraProps) {
  const { children, ...rest } = props
  const match = matchCallout(children)
  const isMathBlock = !match && hasRenderedMath(children)

  if (!match) {
    return (
      <blockquote
        {...rest}
        // `data-math-block` makes the whole box — padding included — the tap
        // target for math focus mode; the press itself is silent because the
        // overlay it opens plays the panel cue. See components/MathFocus.tsx.
        data-math-block={isMathBlock ? '' : undefined}
        data-sound={isMathBlock ? 'none' : undefined}
        className={`not-prose my-4 bg-background ${CALLOUT_ROUND} px-6 py-4 text-center [&_p]:m-0${
          isMathBlock ? ' cursor-zoom-in hover:ring-2 hover:ring-primary/40 transition-shadow' : ''
        }`}
      >
        {children}
      </blockquote>
    )
  }
  return (
    <Callout type={match.type} fold={match.fold} title={match.title} titleRest={match.titleRest}>
      {match.body}
    </Callout>
  )
}
