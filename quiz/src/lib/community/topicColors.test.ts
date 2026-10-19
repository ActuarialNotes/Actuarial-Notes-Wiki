import { describe, expect, it } from 'vitest'
import { examHue } from '../examColors'
import { COMMUNITY_TOPICS } from './topics'
import { leadTopic, nameHue, topicAccentStyle, topicHue } from './topicColors'

describe('topic hues', () => {
  it('gives an exam topic its exam’s own hue', () => {
    expect(topicHue('exam-fm')).toBe(examHue('FM'))
    expect(topicHue('exam-5')).toBe(examHue('CAS-5'))
  })

  it('gives every topic a hue and the four properties', () => {
    for (const t of COMMUNITY_TOPICS) {
      const hue = topicHue(t.id)
      expect(hue).toBeGreaterThanOrEqual(0)
      expect(hue).toBeLessThanOrEqual(360)
      expect(Object.keys(topicAccentStyle(t.id))).toEqual(['--topic-accent', '--topic-muted', '--topic-soft', '--topic-vivid', '--topic-light'])
    }
  })

  it('keeps a name’s hue steady', () => {
    expect(nameHue('someone')).toBe(nameHue('someone'))
    expect(nameHue('someone')).not.toBe(nameHue('someone-else'))
  })

  it('leads with the most specific topic', () => {
    expect(leadTopic(['exams', 'exam-fm', 'events'])).toBe('exam-fm')
    expect(leadTopic(['events', 'pc'])).toBe('pc')
    expect(leadTopic(['careers', 'life-health', 'events'])).toBe('life-health')
    expect(leadTopic(['events'])).toBe('events')
    expect(leadTopic([])).toBeNull()
  })
})
