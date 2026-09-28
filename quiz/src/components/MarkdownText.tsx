import type { Components } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { codeComponents, inlineCodeComponents } from '@/components/CodeBlock'
import { normalizeVaultMath } from '@/lib/vaultMath'
import { themedFigureSrc } from '@/lib/figureTheme'
import { useTheme } from '@/hooks/useTheme'

interface Props {
  children: string
  className?: string
  // When true, block elements (p, br) are rendered as inline spans — safe inside
  // flex containers like answer option buttons.
  inline?: boolean
}

// Lists, for markdown that doesn't render through `prose`. Tailwind's preflight
// strips list markers and indentation, so without these a bulleted sample
// answer or examiner's report reads as a run of unmarked lines — one mistake
// indistinguishable from the next.
export const MARKDOWN_LIST_CLASS =
  '[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_ul]:my-2 [&_ol]:my-2 ' +
  '[&_li]:my-1.5 [&_li]:pl-1 [&_li>p]:my-0 [&_li::marker]:text-muted-foreground ' +
  '[&_li_ul]:my-1 [&_li_ol]:my-1'

// Question text at body size — a part's stem, a worked solution, a sample
// answer, an examiner's report: paragraphs, lists, and the bordered tables the
// data-heavy answers (development triangles, …) need. The block's own first
// and last elements lose their outer margin so a heading above sits snug.
export const QUESTION_MD_CLASS =
  'text-sm text-foreground leading-relaxed ' +
  '[&_p]:my-2 [&>:first-child]:mt-0 [&>:last-child]:mb-0 ' +
  '[&_table]:text-xs [&_table]:border-collapse [&_th]:text-left [&_td]:pr-4 ' +
  '[&_th]:border [&_td]:border [&_th]:border-current/20 [&_td]:border-current/20 ' +
  '[&_th]:px-2 [&_td]:px-2 [&_th]:py-1 [&_td]:py-1 ' +
  MARKDOWN_LIST_CLASS

const scrollableTable: Components['table'] = ({ children, ...props }) => (
  <div className="overflow-x-auto w-full my-2">
    <table {...props}>{children}</table>
  </div>
)

// A figure in a question stem, a part or an explanation. `data-zoomable` is what
// makes it open in the full-screen viewer on tap — see `lib/imageFocus.ts`; the
// diagrams the exam banks ship with are printed small enough that reading one on
// a phone means opening it. A broken image hides itself rather than leaving a
// torn-picture icon mid-sentence.
//
// A generated concept figure is told which theme it is being shown in
// (`lib/figureTheme.ts`) — it cannot see the app's `.dark` class from inside an
// `<img>`, so the theme rides along in the URL.
const ZoomableImage: Components['img'] = ({ src, alt, title }) => {
  const { theme } = useTheme()
  return (
    <img
      src={themedFigureSrc(src, theme)}
      alt={alt ?? ''}
      title={title}
      data-zoomable=""
      className="max-w-full cursor-zoom-in"
      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
    />
  )
}

const inlineComponents: Components = {
  ...inlineCodeComponents,
  p: ({ children }) => <span>{children}</span>,
  br: () => <span> </span>,
  img: ZoomableImage,
}

const blockComponents: Components = {
  ...codeComponents,
  table: scrollableTable,
  img: ZoomableImage,
}

export function MarkdownText({ children, className, inline }: Props) {
  // Inline mode wraps in a span, not a div: its callers are phrasing-level
  // contexts (answer option buttons, spans in reveal/search rows) where a div
  // is invalid HTML. Flex sizing classes still apply — flex items are
  // blockified regardless of the element's default display.
  const Wrapper = inline ? 'span' : 'div'
  return (
    // data-math-scope: this block's equations step together in math focus mode
    // (see lib/mathFocus.ts).
    // data-image-scope: likewise its figures, in the image viewer
    // (see lib/imageFocus.ts).
    <Wrapper className={className} data-math-scope="" data-image-scope="">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={inline ? inlineComponents : blockComponents}
      >
        {normalizeVaultMath(children)}
      </ReactMarkdown>
    </Wrapper>
  )
}
