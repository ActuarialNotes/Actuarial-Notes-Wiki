import { describe, it, expect } from 'vitest'
import { dayCellAt, scheduleStripRange } from './heatmapGrid'

// A phone-sized strip: 17 week columns across ~334px, 7 rows of 14px.
const BOX = { width: 334, height: 110, columns: 17, rows: 7, gap: 2 }

describe('dayCellAt', () => {
  it('resolves a point in the middle of a cell', () => {
    const pitchX = (BOX.width + BOX.gap) / BOX.columns
    const pitchY = (BOX.height + BOX.gap) / BOX.rows
    expect(dayCellAt(BOX, pitchX * 3 + 4, pitchY * 5 + 4)).toEqual({ col: 3, row: 5 })
  })

  it('resolves the first and last cells at the box corners', () => {
    expect(dayCellAt(BOX, 0, 0)).toEqual({ col: 0, row: 0 })
    expect(dayCellAt(BOX, BOX.width, BOX.height)).toEqual({ col: 16, row: 6 })
  })

  it('gives a gutter tap to the cell it follows', () => {
    // The 2px gutter after the first row sits at y = 14..16.
    expect(dayCellAt(BOX, 10, 15)).toEqual({ col: 0, row: 0 })
    // …and the pixel after it belongs to the second row.
    expect(dayCellAt(BOX, 10, 17)).toEqual({ col: 0, row: 1 })
  })

  it('covers every pixel of the grid', () => {
    for (let y = 0; y <= BOX.height; y++) {
      for (let x = 0; x <= BOX.width; x++) {
        const hit = dayCellAt(BOX, x, y)
        expect(hit).not.toBeNull()
        expect(hit!.col).toBeGreaterThanOrEqual(0)
        expect(hit!.col).toBeLessThan(BOX.columns)
        expect(hit!.row).toBeGreaterThanOrEqual(0)
        expect(hit!.row).toBeLessThan(BOX.rows)
      }
    }
  })

  it('rejects points outside the grid', () => {
    expect(dayCellAt(BOX, -1, 10)).toBeNull()
    expect(dayCellAt(BOX, 10, -1)).toBeNull()
    expect(dayCellAt(BOX, BOX.width + 1, 10)).toBeNull()
    expect(dayCellAt(BOX, 10, BOX.height + 1)).toBeNull()
  })

  it('rejects a degenerate box', () => {
    expect(dayCellAt({ ...BOX, width: 0 }, 0, 0)).toBeNull()
    expect(dayCellAt({ ...BOX, columns: 0 }, 0, 0)).toBeNull()
  })
})

describe('scheduleStripRange', () => {
  const today = '2026-09-27'

  it('runs a week before the first session to a week past the exam window', () => {
    expect(scheduleStripRange({
      today,
      firstSession: '2026-09-21',
      examDate: '2026-10-27',
      examWindow: { start: '2026-10-19', end: '2026-10-27' },
    })).toEqual({ start: '2026-09-14', end: '2026-11-03' })
  })

  it('closes a week past the window even when exam day sits early in it', () => {
    expect(scheduleStripRange({
      today,
      firstSession: '2026-09-21',
      examDate: '2026-10-29',
      examWindow: { start: '2026-10-28', end: '2026-11-05' },
    }).end).toBe('2026-11-12')
  })

  it('closes a week past exam day when the date is in no known window', () => {
    expect(scheduleStripRange({
      today, firstSession: '2026-09-21', examDate: '2026-10-27', examWindow: null,
    }).end).toBe('2026-11-03')
  })

  it('opens a week before today for an exam not yet quizzed on', () => {
    expect(scheduleStripRange({
      today, firstSession: null, examDate: '2026-10-27',
    }).start).toBe('2026-09-20')
  })

  it('runs four weeks ahead with no exam date', () => {
    expect(scheduleStripRange({ today, firstSession: '2026-09-21', examDate: null }))
      .toEqual({ start: '2026-09-14', end: '2026-10-25' })
  })

  it('never ends before today or the target-ready day', () => {
    // An exam that has gone by: the reader is still on their own timeline.
    expect(scheduleStripRange({
      today, firstSession: '2026-06-01', examDate: '2026-08-01',
    }).end).toBe(today)
    expect(scheduleStripRange({
      today, firstSession: '2026-09-21', examDate: '2026-10-01', targetReadyDate: '2026-10-20',
    }).end).toBe('2026-10-20')
  })

  it('crosses month and year ends', () => {
    expect(scheduleStripRange({
      today: '2026-12-20', firstSession: '2026-12-03', examDate: '2026-12-28',
    })).toEqual({ start: '2026-11-26', end: '2027-01-04' })
  })
})
