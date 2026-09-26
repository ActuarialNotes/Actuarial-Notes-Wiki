import { describe, expect, it } from 'vitest'
import {
  EXAM_PACE,
  formatClock,
  formatPace,
  paceForExam,
  storedWithTimed,
  timeAllowanceSeconds,
  timedFromStored,
  timerTone,
} from './quizTiming'

describe('timeAllowanceSeconds', () => {
  it('gives a multiple-choice question its share of the sitting', () => {
    // Exam P: 180 minutes over 30 questions — 6 minutes each.
    expect(timeAllowanceSeconds([{ exam: 'Probability', points: 1 }])).toBe(360)
    expect(timeAllowanceSeconds(Array(5).fill({ exam: 'Probability', points: 1 }))).toBe(1800)
  })

  it('ignores points on a paper budgeted per question', () => {
    expect(timeAllowanceSeconds([{ exam: 'Exam MAS-I', points: 2 }])).toBe(320)
  })

  it('budgets a written paper by the marks', () => {
    // Exam 5: 240 minutes over 55 points.
    const perPoint = (240 * 60) / 55
    expect(timeAllowanceSeconds([{ exam: 'Exam 5', points: 2.25 }])).toBe(Math.round(2.25 * perPoint))
    expect(timeAllowanceSeconds([
      { exam: 'Exam 5', points: 1 },
      { exam: 'Exam 5', points: 3 },
    ])).toBe(Math.round(4 * perPoint))
  })

  it('budgets a mixed set at each question’s own pace', () => {
    expect(timeAllowanceSeconds([
      { exam: 'Probability', points: 1 },
      { exam: 'Exam MAS-II', points: 2 },
    ])).toBe(360 + 320)
  })

  it('gives no budget rather than an invented one', () => {
    expect(timeAllowanceSeconds([])).toBeNull()
    expect(timeAllowanceSeconds([{ exam: 'Exam 9', points: 1 }])).toBeNull()
    expect(timeAllowanceSeconds([
      { exam: 'Probability', points: 1 },
      { exam: 'Exam 9', points: 1 },
    ])).toBeNull()
  })

  it('covers every exam with a question bank', () => {
    for (const exam of ['Probability', 'Financial Mathematics', 'Exam MAS-I', 'Exam MAS-II', 'Exam 5']) {
      expect(paceForExam(exam)).not.toBeNull()
    }
  })
})

describe('formatting', () => {
  it('prints clocks', () => {
    expect(formatClock(0)).toBe('0:00')
    expect(formatClock(65)).toBe('1:05')
    expect(formatClock(3729)).toBe('1:02:09')
    expect(formatClock(-83)).toBe('1:23')
  })

  it('prints paces', () => {
    expect(formatPace(EXAM_PACE['Probability'])).toBe('6:00 per question')
    expect(formatPace(EXAM_PACE['Financial Mathematics'])).toBe('4:17 per question')
    expect(formatPace(EXAM_PACE['Exam MAS-I'])).toBe('5:20 per question')
    expect(formatPace(EXAM_PACE['Exam 5'])).toBe('4:22 per point')
  })
})

describe('timerTone', () => {
  it('warns in the last tenth, never less than the last minute', () => {
    expect(timerTone(1000, 1800)).toBe('normal')
    expect(timerTone(180, 1800)).toBe('low')
    expect(timerTone(59, 360)).toBe('low')
    expect(timerTone(61, 360)).toBe('normal')
    expect(timerTone(0, 360)).toBe('over')
    expect(timerTone(-5, 360)).toBe('over')
  })
})

describe('the stored choice', () => {
  it('is untimed by default and kept per mode', () => {
    expect(timedFromStored(null, 'quiz')).toBe(false)
    const raw = storedWithTimed(null, 'mock-exam', true)
    expect(timedFromStored(raw, 'mock-exam')).toBe(true)
    expect(timedFromStored(raw, 'quiz')).toBe(false)
    expect(timedFromStored(storedWithTimed(raw, 'quiz', true), 'mock-exam')).toBe(true)
  })

  it('survives garbage', () => {
    expect(timedFromStored('{nope', 'quiz')).toBe(false)
    expect(timedFromStored('{"quiz":"yes"}', 'quiz')).toBe(false)
  })
})
