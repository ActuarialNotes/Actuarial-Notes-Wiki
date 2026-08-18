import type { Components } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

interface Props {
  children: string
  className?: string
  // When true, block elements (p, br) are rendered as inline spans — safe inside
  // flex containers like answer option buttons.
  inline?: boolean
}

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
const zoomableImage: Components['img'] = ({ src, alt, title }) => (
  <img
    src={src}
    alt={alt ?? ''}
    title={title}
    data-zoomable=""
    className="max-w-full cursor-zoom-in"
    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
  />
)

const inlineComponents: Components = {
  p: ({ children }) => <span>{children}</span>,
  br: () => <span> </span>,
  img: zoomableImage,
}

const blockComponents: Components = {
  table: scrollableTable,
  img: zoomableImage,
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
        {children}
      </ReactMarkdown>
    </Wrapper>
  )
}
