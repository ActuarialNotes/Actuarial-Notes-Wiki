import { useEffect, useRef, useState } from 'react'
import { MathFocusOverlay } from '@/components/MathFocusOverlay'
import { collectMathScope, resolveMathTarget } from '@/lib/mathFocus'

/**
 * Mounted once at the app root. Makes *every* rendered equation magnifiable
 * without touching the surfaces that render them:
 *
 *   • one delegated click listener opens focus mode for whichever display
 *     equation was tapped (see `lib/mathFocus.ts` for what counts as a hit, and
 *     `data-math-magnify="none"` to opt a subtree out)
 *   • the equations around it in the same `[data-math-scope]` become the
 *     overlay's Previous/Next set
 *
 * Renders nothing until an equation is tapped.
 */

/** A tap that travelled this far was a swipe or a text selection, not a tap. */
const DRAG_SLOP_PX = 10

interface FocusState {
  equations: HTMLElement[]
  index: number
}

export default function MathFocus() {
  const [state, setState] = useState<FocusState | null>(null)
  const pressPoint = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      pressPoint.current = { x: e.clientX, y: e.clientY }
    }

    function onClick(e: MouseEvent) {
      if (e.defaultPrevented) return
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      // Flashcards swipe left/right and the wiki is selectable text; neither
      // should end in a magnified equation just because the finger came up
      // over one.
      const start = pressPoint.current
      if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > DRAG_SLOP_PX) return

      const target = resolveMathTarget(e.target, e.clientY)
      if (!target) return
      const scope = collectMathScope(target)

      // Capture phase + stop: the surface underneath must not also act on the
      // tap — a flashcard would flip, the concept popup would swap its body.
      e.preventDefault()
      e.stopPropagation()

      // Detach copies up front. The live nodes belong to a React tree that can
      // re-render or unmount while the overlay is open (a card flipping back,
      // the popup loading the next concept), and the overlay must survive that.
      setState({
        equations: scope.map(el => el.cloneNode(true) as HTMLElement),
        index: Math.max(0, scope.indexOf(target)),
      })
    }

    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('click', onClick, true)
    }
  }, [])

  if (!state) return null
  return (
    <MathFocusOverlay
      equations={state.equations}
      initialIndex={state.index}
      onClose={() => setState(null)}
    />
  )
}
