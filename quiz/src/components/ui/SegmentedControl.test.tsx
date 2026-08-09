import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { SegmentedControl, type SegmentedOption } from './SegmentedControl'

const OPTIONS: SegmentedOption<string>[] = [
  { value: 'today', label: "Today's Plan" },
  { value: 'custom', label: 'By Topic' },
  { value: 'mock-exam', label: 'Mock Exam', disabled: true },
]

function render(value: string) {
  return renderToStaticMarkup(
    <SegmentedControl label="What to quiz on" value={value} onChange={() => {}} options={OPTIONS} />,
  )
}

describe('SegmentedControl', () => {
  it('announces itself as one group of choices', () => {
    const html = render('custom')
    expect(html).toContain('role="radiogroup"')
    expect(html).toContain('aria-label="What to quiz on"')
    expect(html.match(/role="radio"/g)).toHaveLength(3)
  })

  it('marks exactly one option checked', () => {
    const html = render('custom')
    expect(html.match(/aria-checked="true"/g)).toHaveLength(1)
    expect(html.match(/aria-checked="false"/g)).toHaveLength(2)
  })

  it('keeps only the selected option in the tab order', () => {
    // Roving tabindex: one stop for the whole group, arrows move within it.
    const html = render('today')
    expect(html.match(/tabindex="0"/gi)).toHaveLength(1)
    expect(html.match(/tabindex="-1"/gi)).toHaveLength(2)
  })

  it('disables an option that has nothing to select', () => {
    expect(render('custom')).toContain('disabled=""')
  })

  // The selected state is a raised neutral, not a primary fill — a segmented
  // control is a refinement, and the view's one solid button is the one that
  // commits (style guide §1.2). Two stacked primary fills was the specific
  // problem on the quiz builder.
  it('does not paint the selected option as a primary action', () => {
    const html = render('custom')
    expect(html).toContain('bg-background')
    expect(html).not.toContain('bg-primary')
  })

  it('gives every option a visible focus ring', () => {
    expect(render('custom').match(/focus-visible:ring-2/g)).toHaveLength(3)
  })
})
