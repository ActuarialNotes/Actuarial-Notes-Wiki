import { useEffect, useRef, useState } from 'react'
import { ImageGalleryModal } from '@/components/wiki/ImageGalleryModal'
import { collectImageScope, resolveImageTarget, toFocusImage, type FocusImage } from '@/lib/imageFocus'

/**
 * Mounted once at the app root. Makes *every* content image openable in the
 * full-screen viewer without touching the surfaces that render them:
 *
 *   • one delegated click listener opens the gallery on whichever image was
 *     tapped (see `lib/imageFocus.ts` for what counts as a hit, and
 *     `data-image-zoom="none"` to opt a subtree out)
 *   • the other images in the same `[data-image-scope]` become the gallery's
 *     Previous/Next set, so a question that ships two figures steps between
 *     them without closing
 *
 * This is what makes a diagram in a quiz question tappable: the question stem,
 * its parts and its explanation all render through `MarkdownText`, which marks
 * its images. Renders nothing until an image is tapped.
 */

/** A tap that travelled this far was a swipe or a text selection, not a tap. */
const DRAG_SLOP_PX = 10

interface ViewerState {
  images: FocusImage[]
  index: number
}

export default function ImageFocus() {
  const [state, setState] = useState<ViewerState | null>(null)
  const pressPoint = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      pressPoint.current = { x: e.clientX, y: e.clientY }
    }

    function onClick(e: MouseEvent) {
      if (e.defaultPrevented) return
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      // Flashcards swipe left/right and question stems are selectable text;
      // neither should end in an open gallery just because the finger came up
      // over a figure.
      const start = pressPoint.current
      if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > DRAG_SLOP_PX) return

      const target = resolveImageTarget(e.target)
      if (!target) return
      const scope = collectImageScope(target)

      // Capture phase + stop: the surface underneath must not also act on the
      // tap — a flashcard would flip, a locked question card would advance.
      e.preventDefault()
      e.stopPropagation()

      setState({
        images: scope.map(img => toFocusImage(img)),
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

  // The viewer covers the whole screen, so the page behind it must not scroll
  // out from under a pinch.
  useEffect(() => {
    if (!state) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [state])

  if (!state) return null
  return (
    <ImageGalleryModal
      images={state.images}
      initialIndex={state.index}
      placement="fullscreen"
      onClose={() => setState(null)}
    />
  )
}
