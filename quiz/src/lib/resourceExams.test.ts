import { describe, it, expect } from 'vitest'
import { buildResourceExamMap, examsForResource, examPillLabel, compareExamLabels } from './resourceExams'

const examP = `# Exam P-1

## Source Material
> [!answer]- Source Material
>
> - [[A First Course in Probability (Ross - 2019)]]
>      - Chapters 1-8
> - [[Probability (Leemis - 2018)]]
>      - Chapters 1-8
`

const examMas1 = `# Exam MAS-I

## Source Material
> [!answer]- Source Material {2 Sources}
>
> - [[An Introduction to Statistical Learning (James et al. - 2021)]]
>      - Chapters 1-4
> - [[Probability (Leemis - 2018)]]
>      - Chapter 9
`

const examMas2 = `## Source Material

>[!answer]- Source Material {1 Source}
>
> - [[An Introduction to Statistical Learning (James et al. - 2021)]]
>      - Chapters 5-8
`

describe('examPillLabel', () => {
  it('drops the examining body suffix, keeping the name the exam grid uses', () => {
    expect(examPillLabel('Exam P-1 (SOA)')).toBe('Exam P-1')
    expect(examPillLabel('Exam MAS-II (CAS)')).toBe('Exam MAS-II')
    expect(examPillLabel('Exam 6C (CAS)')).toBe('Exam 6C')
  })
})

describe('compareExamLabels', () => {
  it('orders preliminary exams before the CAS upper exams', () => {
    const labels = ['Exam 7', 'Exam MAS-I', 'Exam FM-2', 'Exam 5', 'Exam P-1']
    expect([...labels].sort(compareExamLabels)).toEqual([
      'Exam P-1', 'Exam FM-2', 'Exam MAS-I', 'Exam 5', 'Exam 7',
    ])
  })

  it('sorts an unknown exam last rather than dropping it', () => {
    expect(['Exam Q', 'Exam 9'].sort(compareExamLabels)).toEqual(['Exam 9', 'Exam Q'])
  })
})

describe('buildResourceExamMap', () => {
  const map = buildResourceExamMap([
    { name: 'Exam P-1 (SOA)', markdown: examP },
    { name: 'Exam MAS-I (CAS)', markdown: examMas1 },
    { name: 'Exam MAS-II (CAS)', markdown: examMas2 },
  ])

  it('tags a source with the exam whose syllabus lists it', () => {
    expect(examsForResource(map, 'A First Course in Probability (Ross - 2019)')).toEqual(['Exam P-1'])
  })

  it('collects every exam a shared source appears on, in syllabus order', () => {
    expect(examsForResource(map, 'Probability (Leemis - 2018)')).toEqual(['Exam P-1', 'Exam MAS-I'])
    expect(examsForResource(map, 'An Introduction to Statistical Learning (James et al. - 2021)'))
      .toEqual(['Exam MAS-I', 'Exam MAS-II'])
  })

  it('matches the resource page name case-insensitively', () => {
    expect(examsForResource(map, 'probability (leemis - 2018)')).toEqual(['Exam P-1', 'Exam MAS-I'])
  })

  it('returns nothing for a resource no syllabus lists', () => {
    expect(examsForResource(map, 'Probability Distributions Reference')).toEqual([])
    expect(examsForResource(undefined, 'Anything')).toEqual([])
  })

  it('ignores an exam page with no Source Material callout', () => {
    expect(buildResourceExamMap([{ name: 'Exam 9 (CAS)', markdown: '# Exam 9\n\nNo sources yet.\n' }]))
      .toEqual({})
  })

  it('reads a source listed by its full path', () => {
    const pathMap = buildResourceExamMap([{
      name: 'Exam 5 (CAS)',
      markdown: '> [!answer]- Source Material\n>\n> - [[Resources/Books/Basic Ratemaking (Werner - 2016)]]\n>      - A1\n',
    }])
    expect(examsForResource(pathMap, 'Basic Ratemaking (Werner - 2016)')).toEqual(['Exam 5'])
  })
})
