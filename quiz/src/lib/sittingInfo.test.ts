import { describe, expect, it } from 'vitest'
import { aboutRows, sourceRows } from './sittingInfo'

describe('aboutRows', () => {
  it('puts the fee first and sends a long value under its label', () => {
    const rows = aboutRows([
      { label: 'Length', value: '3 hours' },
      { label: 'Delivery', value: 'Prometric test centre; paper and pencil at select international centres' },
      { label: 'Fee', value: '$275' },
    ])
    expect(rows.map(r => [r.label, r.inline])).toEqual([['Fee', true], ['Length', true], ['Delivery', false]])
  })
})

describe('sourceRows', () => {
  const src = (label: string) => ({ label, url: `https://x/${label}` })
  it("splits the publisher off the title", () => {
    expect(sourceRows([src('SOA — Exam schedule'), src('Plain page')], false).shown.map(r => [r.publisher, r.title]))
      .toEqual([['SOA', 'Exam schedule'], [null, 'Plain page']])
  })
  it('folds all but two, never just one', () => {
    expect(sourceRows([src('a'), src('b'), src('c')], false).hidden).toBe(0)
    const four = sourceRows([src('a'), src('b'), src('c'), src('d')], false)
    expect([four.shown.length, four.hidden]).toEqual([2, 2])
    expect(sourceRows([src('a'), src('b'), src('c'), src('d')], true).shown).toHaveLength(4)
  })
})
