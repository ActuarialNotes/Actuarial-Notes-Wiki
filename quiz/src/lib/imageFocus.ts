/**
 * Image focus — the rules behind "tap a picture to open the viewer".
 *
 * One delegated listener (`components/ImageFocus.tsx`) turns every content
 * image into a way into the full-screen viewer (`ImageGalleryModal`), so a
 * diagram opens the same way in a quiz question, in an explanation and in the
 * collect modal without any of those surfaces wiring it up. This module holds
 * the decisions that listener makes: which images are content, which ones
 * travel together as one prev/next set, and what the viewer is handed for each.
 *
 * Unlike an equation, an image carries no marker of its own — an avatar, a
 * store cosmetic and an exam diagram are all `<img>`. So this is opt **in**:
 * a surface that renders *content* images marks them `data-zoomable`
 * (`components/MarkdownText.tsx` does it for every rendered markdown image),
 * and nothing else in the app responds to a tap.
 */

/** An image the viewer will open. Marked by whoever renders the content. */
export const ZOOMABLE_IMAGE_SELECTOR = 'img[data-zoomable]'

/**
 * Marks a container whose images step together as one prev/next set. The
 * *outermost* scope around the tapped image wins, matching math focus — a
 * surface that stacks several markdown blocks can mark the wrapper to run the
 * whole stack together.
 */
export const IMAGE_SCOPE_SELECTOR = '[data-image-scope]'

/**
 * Real controls own their clicks: a picture inside an answer option is that
 * option's label, and a thumbnail inside a button is that button's face.
 */
const CONTROL_SELECTOR = 'a, button, summary, input, textarea, select, label'

/** Per-subtree escape hatch. */
const OPT_OUT_SELECTOR = '[data-image-zoom="none"]'

/** What the gallery is handed for one image. */
export interface FocusImage {
  src: string
  alt: string
  caption: string
}

/** The parts of an `<img>` this module reads. */
export interface ImageAttrs {
  src?: string | null
  alt?: string | null
  title?: string | null
}

/** True when there is actually a picture behind this image element. */
export function isZoomableSrc(src: string | null | undefined): boolean {
  return typeof src === 'string' && src.trim() !== ''
}

/**
 * One gallery entry. The caption comes from `title` — markdown's
 * `![alt](src "caption")` — and not from `alt`, which in the question bank is a
 * long screen-reader description of the figure rather than a line to print
 * under it.
 */
export function toFocusImage(attrs: ImageAttrs): FocusImage {
  return {
    src: (attrs.src ?? '').trim(),
    alt: (attrs.alt ?? '').trim(),
    caption: (attrs.title ?? '').trim(),
  }
}

/** Gallery entries for `images`, dropping any that have nothing to show. */
export function toFocusImages(images: ImageAttrs[]): FocusImage[] {
  return images.filter(img => isZoomableSrc(img.src)).map(toFocusImage)
}

/** True when `el` is an image this listener is allowed to open. */
function isOpenable(el: HTMLImageElement): boolean {
  if (el.closest(OPT_OUT_SELECTOR)) return false
  if (el.closest(CONTROL_SELECTOR)) return false
  if (el.closest('[hidden]')) return false
  // A picture that failed to load is hidden in place by its own onError
  // handler; it should not be in the strip, and it is not a target.
  if (el.style.display === 'none') return false
  return isZoomableSrc(el.getAttribute('src'))
}

/**
 * The image a click landed on, or null when the click wasn't a request to open
 * one.
 */
export function resolveImageTarget(node: EventTarget | null): HTMLImageElement | null {
  if (!(node instanceof Element)) return null
  const img = node.closest<HTMLImageElement>(ZOOMABLE_IMAGE_SELECTOR)
  if (!img) return null
  return isOpenable(img) ? img : null
}

/** The openable images inside `root`, in reading order. */
function imagesWithin(root: Element): HTMLImageElement[] {
  return Array.from(root.querySelectorAll<HTMLImageElement>(ZOOMABLE_IMAGE_SELECTOR)).filter(isOpenable)
}

/** Every image that steps together with `target`, in document order. */
export function collectImageScope(target: HTMLImageElement): HTMLImageElement[] {
  let scope: Element | null = null
  for (let node: Element | null = target; node; node = node.parentElement) {
    if (node.matches(IMAGE_SCOPE_SELECTOR)) scope = node
  }
  const found = scope ? imagesWithin(scope) : []
  return found.includes(target) ? found : [target]
}
