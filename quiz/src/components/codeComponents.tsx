import type { Components } from 'react-markdown'
import { CodeBlock } from '@/components/CodeBlock'

// The react-markdown components for code on every markdown surface — the
// fenced block is `CodeBlock`, which says why it is drawn the way it is.

// Inline code — a chip in running text.
const CODE_CLASS =
  'not-prose rounded border border-border bg-muted px-1 py-0.5 font-mono text-[0.9em]'

/** Block-level surfaces: a fenced block becomes a scrollable panel. */
export const codeComponents: Components = {
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  code: ({ children }) => <code className={CODE_CLASS}>{children}</code>,
}

/**
 * Inline surfaces (answer options, search rows) render markdown inside a
 * `<span>`, where a `<pre>` would be invalid nesting. A fence there is a
 * mistake in the content rather than console output, so it degrades to
 * monospace text that wraps with the rest of the line.
 */
export const inlineCodeComponents: Components = {
  pre: ({ children }) => (
    <span className="font-mono text-[0.9em] whitespace-pre-wrap">{children}</span>
  ),
  code: ({ children }) => <code className={CODE_CLASS}>{children}</code>,
}
