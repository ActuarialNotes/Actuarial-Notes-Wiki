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

const inlineComponents: Components = {
  p: ({ children }) => <span>{children}</span>,
  br: () => <span> </span>,
}

const blockComponents: Components = {
  table: scrollableTable,
}

export function MarkdownText({ children, className, inline }: Props) {
  // Inline mode wraps in a span, not a div: its callers are phrasing-level
  // contexts (answer option buttons, spans in reveal/search rows) where a div
  // is invalid HTML. Flex sizing classes still apply — flex items are
  // blockified regardless of the element's default display.
  const Wrapper = inline ? 'span' : 'div'
  return (
    <Wrapper className={className}>
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
