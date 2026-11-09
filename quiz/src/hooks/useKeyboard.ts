import { useEffect, useRef } from 'react'

/**
 * Whether a key press belongs to something the reader is typing into: a text
 * field, an editable region, or anything inside `[data-own-keys]` — a surface
 * that handles every key itself, like the question spreadsheet's grid, where
 * Enter moves down a row rather than confirming the answer.
 */
export function isTypingTarget(e: KeyboardEvent): boolean {
  const target = e.target as HTMLElement | null
  return !!(
    target && (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable ||
      (typeof target.closest === 'function' && target.closest('[data-own-keys]') !== null)
    )
  )
}

/**
 * Registers a keydown listener that dispatches to per-key handlers.
 * Skips events when the focused element is a text input.
 * Handlers are read via ref so they never need to be in the dep array.
 */
export function usePageKeyboard(
  handlers: Partial<Record<string, (e: KeyboardEvent) => void>>,
  enabled = true,
) {
  const handlersRef = useRef(handlers)
  useEffect(() => { handlersRef.current = handlers })

  useEffect(() => {
    if (!enabled) return
    function onKeyDown(e: KeyboardEvent) {
      if (isTypingTarget(e)) return
      const handler = handlersRef.current[e.key]
      if (handler) {
        e.preventDefault()
        handler(e)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [enabled])
}
