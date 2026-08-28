import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { CollectLevelUpCardView } from './CollectLevelUpCard'

// The card sits in the same grid as the level-up cards, so it has to keep
// promising what it can actually deliver: a level-up on a locked check is a
// wait, and one already collected is in flight, not on offer.

const MINUTE = 60_000

function render(props: { remainingMs?: number; pending?: boolean } = {}): string {
  return renderToStaticMarkup(
    <CollectLevelUpCardView
      name="Report Year"
      remainingMs={props.remainingMs ?? 0}
      pending={props.pending}
      onClick={() => {}}
    />,
  )
}

describe('CollectLevelUpCardView', () => {
  it('offers the level-up the quiz nearly earned', () => {
    const html = render()
    expect(html).toContain('Report Year')
    expect(html).toContain('Collect')
    expect(html).toContain('Level 1')
    expect(html).not.toContain('disabled=')
  })

  it('counts the wait down instead, once the check has been missed', () => {
    const html = render({ remainingMs: 4 * MINUTE + 30_000 })
    expect(html).toContain('Collect in 5m')
    expect(html).toContain('reopens in 5 minutes')
    // Still clickable while locked — the modal is where the wait is explained.
    expect(html).not.toContain('disabled=')
  })

  it('shows the collection in flight and takes itself off the table', () => {
    const html = render({ pending: true })
    expect(html).toContain('Collecting')
    expect(html).toContain('disabled=')
  })

  it('lets a pending collection outrank a stale lockout', () => {
    const html = render({ pending: true, remainingMs: 4 * MINUTE })
    expect(html).toContain('Collecting')
    expect(html).not.toContain('Collect in')
  })
})
