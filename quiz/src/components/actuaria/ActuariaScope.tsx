// The **Actuaria scope** — the one element every `/actuaria/*` route renders
// inside (docs/actuaria-online.md §4.1, style guide §2.6).
//
// `actuaria dark` pulls the dark token block whatever the app's theme is — the
// in-world screens are space, so they are always dark — and defines the signal.
// It is scoped to the route rather than toggling the document's class, so the
// sidebar, and any dialog portalled to the body, keep the reader's own theme.
// `color-scheme: dark` makes the browser draw native controls (scrollbars, a
// date input) to match.
//
// It is also what brings in Oxanium, the display face: loaded from Google
// Fonts the first time a reader enters Actuaria, so Study Mode never pays for
// it (the stylesheet is a `<link>` added from this chunk, not an import in the
// app's own CSS).

import { useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const FONT_LINK_ID = 'actuaria-font'
const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Oxanium:wght@600;700&display=swap'

function useActuariaFont() {
  useEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(FONT_LINK_ID)) return
    const link = document.createElement('link')
    link.id = FONT_LINK_ID
    link.rel = 'stylesheet'
    link.href = FONT_HREF
    document.head.appendChild(link)
  }, [])
}

export function ActuariaScope({
  grid = true,
  className,
  children,
}: {
  /** The dot-grid floor — on for an in-world screen's canvas (§4.2). */
  grid?: boolean
  className?: string
  children: ReactNode
}) {
  useActuariaFont()
  return (
    <div
      data-testid="actuaria-scope"
      className={cn('actuaria dark min-h-screen bg-background text-foreground', grid && 'actuaria-grid', className)}
      style={{ colorScheme: 'dark' }}
    >
      {children}
    </div>
  )
}
