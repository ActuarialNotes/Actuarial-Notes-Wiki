import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useCollect } from './useCollect'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

// The collect modal's skip button is the flashcard study loop's way out of a
// comprehension check the reader can't answer yet: it has to close the modal
// *and* hand control back to the opener so the session moves on to the next
// card. Only openers that pass a handler get the button at all.

const ref: WikiEntryRef = { kind: 'concept', name: 'Report Year' }

describe('useCollect skip', () => {
  beforeEach(() => useCollect.getState().close())

  it('has no skip handler unless the opener supplies one', () => {
    useCollect.getState().open(ref)
    expect(useCollect.getState().onSkip).toBeNull()
  })

  it('runs the opener handler and closes the modal', () => {
    const onSkip = vi.fn(() => {
      // The opener moves the deck on, so by the time it runs the modal must
      // already be gone — otherwise it would be advancing behind an open check.
      expect(useCollect.getState().ref).toBeNull()
    })
    useCollect.getState().open(ref, { onSkip })
    expect(useCollect.getState().onSkip).toBe(onSkip)

    useCollect.getState().skip()
    expect(onSkip).toHaveBeenCalledTimes(1)
    expect(useCollect.getState().ref).toBeNull()
    expect(useCollect.getState().onSkip).toBeNull()
  })

  it('does not run the handler when the modal is merely closed', () => {
    const onSkip = vi.fn()
    useCollect.getState().open(ref, { onSkip })
    useCollect.getState().close()
    expect(onSkip).not.toHaveBeenCalled()
    expect(useCollect.getState().onSkip).toBeNull()
  })

  it('drops a previous opener handler when reopened without one', () => {
    const onSkip = vi.fn()
    useCollect.getState().open(ref, { onSkip })
    useCollect.getState().open({ kind: 'concept', name: 'Accident Year' })
    expect(useCollect.getState().onSkip).toBeNull()
  })
})
