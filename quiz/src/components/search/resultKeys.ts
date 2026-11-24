// The keys every search answers to, one handler on the element that holds the
// field and its results: Down and Up walk the results (each marked
// `data-result`) and back to the field, Enter in the field opens the first
// result (or, over a list of questions to pick from, puts the keyboard away),
// and a letter typed while a result has focus goes on in the field.

import type { KeyboardEvent } from 'react'

export function handleResultKeys(
  e: KeyboardEvent<HTMLElement>,
  input: HTMLInputElement | null,
  options: { enterOpens?: boolean; onEnter?: () => void } = {},
): void {
  if (!input || e.altKey || e.metaKey || e.ctrlKey) return
  const target = e.target as HTMLElement
  const inField = target === input
  const onResult = target.hasAttribute?.('data-result')
  // A key pressed in a filter's menu or a dialog opened from a row is not ours.
  if (!inField && !onResult) return

  const results = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[data-result]'))
  const at = onResult ? results.indexOf(target) : -1

  if (e.key === 'ArrowDown') {
    const next = results[at + 1]
    if (next) { e.preventDefault(); next.focus() }
    return
  }
  if (e.key === 'ArrowUp') {
    if (!onResult) return
    e.preventDefault()
    if (at <= 0) input.focus()
    else results[at - 1]!.focus()
    return
  }
  if (e.key === 'Enter' && inField) {
    options.onEnter?.()
    if (options.enterOpens && results[0]) { e.preventDefault(); results[0].click() }
    else input.blur()
    return
  }
  // Typing goes on in the field.
  if (onResult && e.key.length === 1 && e.key !== ' ') input.focus()
}
