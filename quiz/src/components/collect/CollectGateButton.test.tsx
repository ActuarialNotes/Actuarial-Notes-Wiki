import { describe, it, expect, beforeEach } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { CollectGateButtonView } from './CollectGateButton'
import { useCollectLockouts } from '@/hooks/useCollectLockouts'

// The gate button is the only surface outside the collect modal that has to
// admit a check is shut — a plain "Collect" pill on a locked concept promises a
// collection the reader can't make for another 29 minutes.

const MINUTE = 60_000

function render(remainingMs: number): string {
  return renderToStaticMarkup(
    <CollectGateButtonView name="Report Year" remainingMs={remainingMs} onClick={() => {}} />,
  )
}

describe('CollectGateButtonView', () => {
  it('invites a collection when the check is open', () => {
    const html = render(0)
    expect(html).toContain('Collect')
    expect(html).not.toContain('locked')
  })

  it('counts the wait down instead, once the check has been missed', () => {
    const html = render(29 * MINUTE + 30_000)
    expect(html).toContain('30m')
    expect(html).toContain('reopens in 30 minutes')
    expect(html).not.toContain('>Collect<')
  })

  it('abbreviates a day-long wait without losing the full reading', () => {
    const html = render(24 * 60 * MINUTE)
    expect(html).toContain('1d')
    expect(html).toContain('reopens in 1 day')
  })
})

describe('useCollectLockouts', () => {
  beforeEach(() => useCollectLockouts.setState({ lockouts: {} }))

  it('escalates 30 minutes → a day, matching concepts case-insensitively', () => {
    const first = useCollectLockouts.getState().recordMiss('Report Year')
    expect(first.misses).toBe(1)
    const second = useCollectLockouts.getState().recordMiss('report year')
    expect(second.misses).toBe(2)
    expect(second.lockedUntil - first.lockedUntil).toBeGreaterThan(23 * 60 * MINUTE)
  })

  it('forgets a concept that has been collected', () => {
    useCollectLockouts.getState().recordMiss('Report Year')
    useCollectLockouts.getState().clear('Report Year')
    expect(useCollectLockouts.getState().lockouts).toEqual({})
  })
})
