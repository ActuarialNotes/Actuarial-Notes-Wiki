import type { Components } from 'react-markdown'
import { CalloutBlockquote } from '@/components/MarkdownCallout'

// Obsidian callouts (`> [!example]- …`) on every markdown surface: react-markdown
// hands each blockquote to `CalloutBlockquote`, which draws the callout or the
// plain box. Spread into a surface's `components`.
export const calloutComponents: Components = {
  blockquote: CalloutBlockquote,
}
