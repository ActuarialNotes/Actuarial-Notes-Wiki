import katex from 'katex'

interface Props {
  children: string
  className?: string
}

export function LatexText({ children, className }: Props) {
  // Split on $$...$$ (display math) and $...$ (inline math), keeping delimiters.
  // Inline math must contain at least one letter or backslash so currency like
  // "$5" or "$1,000" isn't accidentally treated as math.
  const parts = children.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]*[A-Za-z\\][^$\n]*\$)/g)

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
          const math = part.slice(2, -2)
          return (
            <span
              key={i}
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(math, { displayMode: true, throwOnError: false }),
              }}
            />
          )
        }
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          const math = part.slice(1, -1)
          return (
            <span
              key={i}
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(math, { displayMode: false, throwOnError: false }),
              }}
            />
          )
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}
