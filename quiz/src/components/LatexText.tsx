import katex from 'katex'

interface Props {
  children: string
  className?: string
}

export function LatexText({ children, className }: Props) {
  // Split on $$...$$ (display math) and $...$ (inline math), keeping delimiters.
  // `\$` is a dollar *sign*, not a delimiter — ratemaking stems are full of
  // `$\$400$` — so a span runs past it rather than closing there.
  const parts = children.split(/(\$\$[\s\S]*?\$\$|\$(?:\\\$|[^$\n])*?\$)/g)

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
          // Inline math must hold a letter or a backslash, so plain currency
          // like "$5" or "$1,000" isn't typeset as an equation.
          if (!/[A-Za-z\\]/.test(math)) return <span key={i}>{part}</span>
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
