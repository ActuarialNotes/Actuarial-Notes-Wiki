import { describe, expect, it } from 'vitest'
import { closesIn, monthDay, registrationNudge } from './registrationNudge'
import { registrationStatus, type RegistrationStatus } from './store'

const sitting = { examId: 'FM', format: 'CBT' as const, startDate: '2026-12-03', endDate: '2026-12-13', registrationDeadline: '2026-11-04' }
const open = (daysLeft: number): RegistrationStatus => ({ state: 'open', sitting, deadline: '2026-11-04', deadlineNote: '10:00 AM U.S. Central', daysLeft })

describe('registrationNudge', () => {
  it('shows inside the window', () => {
    expect(registrationNudge('FM', open(4))).toEqual({
      examKey: 'FM',
      daysLeft: 4,
      deadline: '2026-11-04',
      deadlineNote: '10:00 AM U.S. Central',
      sittingStart: '2026-12-03',
      dismissKey: 'FM:2026-11-04',
    })
    expect(registrationNudge('FM', open(0))?.daysLeft).toBe(0)
  })
  it('stays quiet outside the window, or when registration is not open', () => {
    expect(registrationNudge('FM', open(15))).toBeNull()
    expect(registrationNudge('FM', { state: 'closed', sitting })).toBeNull()
    expect(registrationNudge('FM', { state: 'opens', sitting, opens: '2026-11-10' })).toBeNull()
    expect(registrationNudge('FM', { state: 'unscheduled' })).toBeNull()
  })
  it("finds FM's December 2026 deadline from the transcribed tables", () => {
    const nudge = registrationNudge('FM', registrationStatus('FM', '2026-10-31'))
    expect(nudge).toMatchObject({ daysLeft: 4, deadline: '2026-11-04', sittingStart: '2026-12-03' })
  })
})

describe('closesIn / monthDay', () => {
  it('says when', () => {
    expect(closesIn(0)).toBe('today')
    expect(closesIn(1)).toBe('tomorrow')
    expect(closesIn(4)).toBe('in 4 days')
    expect(monthDay('2026-12-03')).toBe('December 3')
  })
})
