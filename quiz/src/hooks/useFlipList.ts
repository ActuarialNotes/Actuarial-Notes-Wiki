import { useLayoutEffect, useRef, type RefObject } from 'react'
import { motionAllowed } from '@/lib/viewTransition'
import { flipPlan, type Box } from '@/lib/flipList'

const MOVE_MS = 320
const ENTER_MS = 220
const EASE = 'cubic-bezier(0.25, 0.6, 0.3, 1)'
/** Past this many items the list is redrawn plainly: measuring them all costs more than it shows. */
const MAX_ITEMS = 120

/**
 * **A list that rearranges** (lib/flipList.ts). Give the list's element this
 * ref and mark each item `data-flip="<its key>"`. Whenever `signature` changes
 * (the filter, the sort), the items that stay slide to their new places and
 * the new ones fade in. Positions are measured in the page, so a scroll
 * between two changes moves nothing.
 */
export function useFlipList<T extends HTMLElement>(signature: unknown): RefObject<T> {
  const ref = useRef<T>(null)
  const before = useRef(new Map<string, Box>())
  const last = useRef(signature)

  useLayoutEffect(() => {
    const list = ref.current
    if (!list) return
    const items = Array.from(list.querySelectorAll<HTMLElement>('[data-flip]'))
    const after = new Map<string, Box>()
    const byKey = new Map<string, HTMLElement>()
    if (items.length <= MAX_ITEMS) {
      for (const item of items) {
        const box = item.getBoundingClientRect()
        const key = item.dataset.flip!
        after.set(key, { left: box.left + window.scrollX, top: box.top + window.scrollY })
        byKey.set(key, item)
      }
    }
    const changed = last.current !== signature
    last.current = signature
    const was = before.current
    before.current = after
    if (!changed || !motionAllowed()) return

    const plan = flipPlan(was, after, window.innerHeight * 1.2)
    for (const { key, dx, dy } of plan.moved) {
      byKey.get(key)?.animate?.(
        [{ translate: `${dx}px ${dy}px` }, { translate: '0 0' }],
        { duration: MOVE_MS, easing: EASE },
      )
    }
    for (const key of plan.entered) {
      byKey.get(key)?.animate?.(
        [{ opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1 }],
        { duration: ENTER_MS, easing: 'ease-out' },
      )
    }
  })

  return ref
}
