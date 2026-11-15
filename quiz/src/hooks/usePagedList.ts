import { useCallback, useEffect, useMemo, useState } from 'react'
import { PAGE_SIZE, loadShownCount, nextPageSize, nextShownCount, saveShownCount } from '@/lib/paging'

/**
 * A long list a page at a time (lib/paging.ts). `key` names the list and its
 * filter choice: a new key starts again at one page, and the same key later in
 * the session opens as far as it was left.
 */
export function usePagedList<T>(items: readonly T[], key: string, size = PAGE_SIZE) {
  const total = items.length
  const [state, setState] = useState(() => ({ key, count: loadShownCount(key, total, size) }))
  // A change of list or filters is a different list: read its own count.
  const count = state.key === key ? Math.min(total, Math.max(state.count, Math.min(size, total))) : loadShownCount(key, total, size)
  useEffect(() => {
    if (state.key !== key) setState({ key, count: loadShownCount(key, total, size) })
  }, [key, state.key, total, size])

  const showMore = useCallback(() => {
    const next = nextShownCount(count, total, size)
    saveShownCount(key, next)
    setState({ key, count: next })
  }, [count, total, size, key])

  const shown = useMemo(() => items.slice(0, count), [items, count])
  return { shown, total, remaining: total - count, nextSize: nextPageSize(count, total, size), showMore }
}
