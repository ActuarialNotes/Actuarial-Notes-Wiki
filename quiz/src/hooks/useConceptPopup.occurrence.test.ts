import { describe, it, expect, beforeEach } from 'vitest'
import { useConceptPopup, type OccurrenceRef } from './useConceptPopup'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

// The exam page navigates by concept *occurrence* (dimmed repeats included) so
// a repeat is highlighted when clicked and never skipped by prev/next — while
// the concept count (deduped `list.length`) stays fixed.

const concept = (name: string): WikiEntryRef => ({ kind: 'concept', name })

// Two concepts, each mentioned twice, in document order:
//   Interest Rate (0), Simple Interest (0), Interest Rate (1), Simple Interest (1)
const list = [concept('Interest Rate'), concept('Simple Interest')]
const occurrences: OccurrenceRef[] = [
  { name: 'Interest Rate', occurrence: 0 },
  { name: 'Simple Interest', occurrence: 0 },
  { name: 'Interest Rate', occurrence: 1 },
  { name: 'Simple Interest', occurrence: 1 },
]

describe('useConceptPopup occurrence navigation', () => {
  beforeEach(() => useConceptPopup.getState().close())

  it('opens on the clicked occurrence and keeps the deduped count', () => {
    // Click the repeat (2nd) mention of Interest Rate → occurrenceIndex 2.
    useConceptPopup.getState().openAt(list, 0, 'Exam FM-2 (SOA).md', null, null, {
      occurrences,
      occurrenceIndex: 2,
    })
    const s = useConceptPopup.getState()
    expect(s.list).toHaveLength(2) // count unchanged (deduped)
    expect(s.occurrenceIndex).toBe(2)
    expect(s.occurrences![s.occurrenceIndex]).toEqual({ name: 'Interest Rate', occurrence: 1 })
  })

  it('prev/next step through every occurrence without changing the count', () => {
    useConceptPopup.getState().openAt(list, 0, 'Exam FM-2 (SOA).md', null, null, {
      occurrences,
      occurrenceIndex: 0,
    })
    const seq: Array<{ occ: number; name: string; index: number; count: number }> = []
    const snap = () => {
      const s = useConceptPopup.getState()
      seq.push({ occ: s.occurrenceIndex, name: s.list[s.index].name, index: s.index, count: s.list.length })
    }
    snap()
    for (let i = 0; i < 3; i++) { useConceptPopup.getState().navigate(1); snap() }

    expect(seq.map(x => x.occ)).toEqual([0, 1, 2, 3])
    // Visits the Interest Rate repeat (occ 2) — it is not skipped.
    expect(seq.map(x => x.name)).toEqual([
      'Interest Rate', 'Simple Interest', 'Interest Rate', 'Simple Interest',
    ])
    // The concept index tracks the name (repeat of Interest Rate → back to 0)…
    expect(seq.map(x => x.index)).toEqual([0, 1, 0, 1])
    // …and the count never changes.
    expect(seq.every(x => x.count === 2)).toBe(true)
  })

  it('clamps at the ends of the occurrence list', () => {
    useConceptPopup.getState().openAt(list, 0, 'Exam FM-2 (SOA).md', null, null, {
      occurrences,
      occurrenceIndex: 0,
    })
    useConceptPopup.getState().navigate(-1)
    expect(useConceptPopup.getState().occurrenceIndex).toBe(0)
    useConceptPopup.setState({ occurrenceIndex: 3, index: 1 })
    useConceptPopup.getState().navigate(1)
    expect(useConceptPopup.getState().occurrenceIndex).toBe(3)
  })

  it('falls back to plain concept nav when no occurrences are supplied', () => {
    useConceptPopup.getState().openAt(list, 0, 'Exam FM-2 (SOA).md')
    expect(useConceptPopup.getState().occurrences).toBeNull()
    useConceptPopup.getState().navigate(1)
    expect(useConceptPopup.getState().index).toBe(1)
  })
})

describe('useConceptPopup jumpTo', () => {
  beforeEach(() => useConceptPopup.getState().close())

  const openAtFirst = () =>
    useConceptPopup.getState().openAt(list, 0, 'Exam FM-2 (SOA).md', null, null, {
      occurrences,
      occurrenceIndex: 0,
    })

  it('follows a link to a concept the page mentions, landing on its first mention', () => {
    openAtFirst()
    useConceptPopup.getState().jumpTo(concept('Simple Interest'))
    const s = useConceptPopup.getState()
    expect(s.index).toBe(1)
    expect(s.occurrenceIndex).toBe(1)
    expect(s.list).toHaveLength(2)
  })

  it('appends a concept the page never mentions to the mention list too', () => {
    openAtFirst()
    useConceptPopup.getState().navigate(1) // walk forward first
    useConceptPopup.getState().jumpTo(concept('Compound Interest'))
    const s = useConceptPopup.getState()
    // Both lists grow together, so the walk sits on the concept just opened…
    expect(s.list.map(r => r.name)).toEqual(['Interest Rate', 'Simple Interest', 'Compound Interest'])
    expect(s.index).toBe(2)
    expect(s.occurrences).toHaveLength(5)
    expect(s.occurrenceIndex).toBe(4)
    // …and Previous still works, stepping back onto the page's last mention
    // instead of being dead because the walk had snapped to occurrence 0.
    useConceptPopup.getState().navigate(-1)
    expect(useConceptPopup.getState().occurrenceIndex).toBe(3)
    expect(useConceptPopup.getState().list[useConceptPopup.getState().index].name).toBe('Simple Interest')
  })

  it('leaves the walk alone when the jumped-to concept has no mention on the page', () => {
    openAtFirst()
    useConceptPopup.getState().navigate(2) // occurrence 2
    // Appended once…
    useConceptPopup.getState().jumpTo(concept('Compound Interest'))
    // …then jumped to again from elsewhere: it is in `list` now, so the walk
    // follows its appended mention rather than resetting to the top.
    useConceptPopup.getState().navigate(-4)
    useConceptPopup.getState().jumpTo(concept('Compound Interest'))
    const s = useConceptPopup.getState()
    expect(s.list).toHaveLength(3)
    expect(s.index).toBe(2)
    expect(s.occurrenceIndex).toBe(4)
  })
})
