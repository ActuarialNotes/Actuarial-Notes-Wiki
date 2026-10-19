import { describe, expect, it } from 'vitest'
import { COMMUNITY_TOPICS, ROOT_TOPICS, childTopics, cleanFollows, inAnyTopic, inTopic, topicsFor, toggleFollow } from './topics'

describe('topicsFor', () => {
  it('tags an exam post with its exam and with Exams', () => {
    expect(topicsFor('Passed Exam P on my second try')).toEqual(expect.arrayContaining(['exams', 'exam-p']))
    expect(topicsFor('FM in February — which manual?')).toEqual(expect.arrayContaining(['exams', 'exam-fm']))
  })

  it('keeps MAS-I and MAS-II apart', () => {
    expect(topicsFor('MAS-I tips')).toContain('exam-mas-i')
    expect(topicsFor('MAS-I tips')).not.toContain('exam-mas-ii')
    expect(topicsFor('MAS-II tips')).toContain('exam-mas-ii')
    expect(topicsFor('MAS-II tips')).not.toContain('exam-mas-i')
  })

  it('does not read a lone P or a word containing an acronym as a topic', () => {
    expect(topicsFor('P.S. thanks everyone')).not.toContain('exam-p')
    expect(topicsFor('I said that maybe')).not.toContain('ai-tech')
    expect(topicsFor('Casablanca was great')).not.toContain('pc')
  })

  it('reads reforms, careers, AI and climate', () => {
    expect(topicsFor('How will IFRS 17 change reserving?')).toEqual(expect.arrayContaining(['reforms', 'pc']))
    expect(topicsFor('Entry level interview tips')).toContain('careers')
    expect(topicsFor('Is AI going to replace actuaries?')).toContain('ai-tech')
    expect(topicsFor('Wildfire models after this season')).toContain('climate')
  })

  it('returns topics in catalogue order, each once', () => {
    const tags = topicsFor('Exam P and exam FM and exams and a conference')
    const order = COMMUNITY_TOPICS.map(t => t.id)
    expect(tags).toEqual([...tags].sort((a, b) => order.indexOf(a) - order.indexOf(b)))
    expect(new Set(tags).size).toBe(tags.length)
  })

  it('is empty for nothing', () => {
    expect(topicsFor('')).toEqual([])
  })
})

describe('the catalogue', () => {
  it('has unique ids and parents that exist and are roots', () => {
    const ids = COMMUNITY_TOPICS.map(t => t.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const t of COMMUNITY_TOPICS) {
      if (t.parent) expect(ROOT_TOPICS.map(r => r.id)).toContain(t.parent)
    }
  })

  it('lists the exams under Exams', () => {
    expect(childTopics('exams').map(t => t.id)).toContain('exam-fm')
    expect(childTopics('careers')).toEqual([])
  })

  it('has a pattern on every topic', () => {
    for (const t of COMMUNITY_TOPICS) expect(t.patterns.length).toBeGreaterThan(0)
  })
})

describe('membership and follows', () => {
  it('counts a child-tagged item under its parent', () => {
    expect(inTopic(['exam-fm'], 'exams')).toBe(true)
    expect(inTopic(['exams'], 'exam-fm')).toBe(false)
    expect(inAnyTopic(['careers'], ['exams', 'careers'])).toBe(true)
    expect(inAnyTopic(['careers'], [])).toBe(false)
  })

  it('cleans a stored follow set', () => {
    expect(cleanFollows(['careers', 'nope', 'exams', 'careers', 3])).toEqual(['exams', 'careers'])
    expect(cleanFollows('exams')).toEqual([])
  })

  it('toggles a follow', () => {
    expect(toggleFollow([], 'reforms')).toEqual(['reforms'])
    expect(toggleFollow(['reforms', 'exams'], 'reforms')).toEqual(['exams'])
  })
})
