import { describe, it, expect } from 'vitest'
import {
  answerStep,
  chosenOption,
  deliverableStatus,
  deriveAssumptions,
  deriveKeyDetails,
  derivePeriods,
  facetsFromAnswers,
  nextStep,
  periodLabels,
  stepApplies,
  suggestedTitle,
  visibleSteps,
  wizardProgress,
  type WizardStep,
} from './coworkDeliverables'
import type { SourceResource } from './coworkSources'

const STEPS: WizardStep[] = [
  {
    id: 'practice',
    question: 'Whose business?',
    options: [
      { id: 'pc', label: 'P&C', facets: { practiceArea: 'pc' }, details: [{ label: 'Practice area', value: 'P&C' }] },
      { id: 'life', label: 'Life', facets: { practiceArea: 'life' } },
    ],
  },
  {
    id: 'question',
    question: 'What for?',
    options: [
      {
        id: 'indication',
        label: 'Rate indication',
        facets: { function: 'pricing', timeOrientation: 'prospective' },
        assumptions: [{ label: 'Indication method', locator: 'Ch. 8' }],
        exports: ['experience-summary', 'assumptions'],
      },
      {
        id: 'reserves',
        label: 'Unpaid claims',
        facets: { function: 'reserving', timeOrientation: 'retrospective' },
        assumptions: [{ label: 'Tail factor', value: '1.020' }],
        exports: ['development-triangle'],
      },
    ],
  },
  {
    id: 'line',
    question: 'Which line?',
    when: { practice: ['pc'] },
    options: [
      { id: 'auto', label: 'Personal auto', assumptions: [{ label: 'Line of business', value: 'Personal auto' }] },
      { id: 'property', label: 'Personal property' },
    ],
  },
  {
    id: 'period',
    question: 'How much experience?',
    options: [
      { id: 'ay5', label: 'Five accident years', periods: { count: 5, label: 'Accident year', basis: 'year' } },
      { id: 'q8', label: 'Eight quarters', periods: { count: 8, label: 'Valuation quarter', basis: 'quarter' } },
    ],
  },
]

const SOURCE: SourceResource = {
  id: 'mct',
  entityId: 'osfi',
  title: 'MCT guideline',
  kind: 'guideline',
  published: '2024',
  summary: 'Capital test.',
  practiceAreas: ['pc'],
  functions: ['capital'],
  assumptions: [
    { label: 'Supervisory target MCT ratio', value: '150%', locator: 's. 1.2' },
    { label: 'Internal capital target', locator: 'ORSA' },
  ],
}

describe('stepApplies', () => {
  it('always applies to a step with no prerequisite', () => {
    expect(stepApplies(STEPS[0], {})).toBe(true)
  })

  it('does not apply while its prerequisite is unanswered', () => {
    expect(stepApplies(STEPS[2], {})).toBe(false)
  })

  it('applies once the prerequisite is answered the right way', () => {
    expect(stepApplies(STEPS[2], { practice: 'pc' })).toBe(true)
    expect(stepApplies(STEPS[2], { practice: 'life' })).toBe(false)
  })
})

describe('nextStep', () => {
  it('asks the first question first', () => {
    expect(nextStep(STEPS, {})?.id).toBe('practice')
  })

  it('walks the flow in order, skipping a branch that does not apply', () => {
    expect(nextStep(STEPS, { practice: 'life' })?.id).toBe('question')
    expect(nextStep(STEPS, { practice: 'life', question: 'indication' })?.id).toBe('period')
  })

  it('asks a branch question once its branch opens', () => {
    expect(nextStep(STEPS, { practice: 'pc', question: 'indication' })?.id).toBe('line')
  })

  it('is null once every applicable question is answered', () => {
    const answers = { practice: 'life', question: 'indication', period: 'ay5' }
    expect(nextStep(STEPS, answers)).toBeNull()
  })
})

describe('visibleSteps', () => {
  it('leaves out a branch whose prerequisite excludes it', () => {
    expect(visibleSteps(STEPS, { practice: 'life' }).map(s => s.id)).toEqual(['practice', 'question', 'period'])
  })
})

describe('wizardProgress', () => {
  it('counts a branch that could still open, so it never reads 1 of 1 too early', () => {
    const p = wizardProgress(STEPS, {})
    expect(p.answered).toBe(0)
    expect(p.total).toBe(4)
    expect(p.complete).toBe(false)
  })

  it('drops a branch from the total once it is excluded', () => {
    expect(wizardProgress(STEPS, { practice: 'life' }).total).toBe(3)
  })

  it('reports complete when the flow is done', () => {
    const p = wizardProgress(STEPS, { practice: 'life', question: 'reserves', period: 'ay5' })
    expect(p).toEqual({ answered: 3, total: 3, complete: true })
  })
})

describe('answerStep', () => {
  it('records the answer', () => {
    expect(answerStep(STEPS, {}, 'practice', 'pc')).toEqual({ practice: 'pc' })
  })

  it('drops an answer the change orphans', () => {
    const before = { practice: 'pc', question: 'indication', line: 'auto' }
    const after = answerStep(STEPS, before, 'practice', 'life')
    expect(after).toEqual({ practice: 'life', question: 'indication' })
  })

  it('keeps an answer the change still allows', () => {
    const before = { practice: 'pc', question: 'indication', line: 'auto' }
    const after = answerStep(STEPS, before, 'question', 'reserves')
    expect(after.line).toBe('auto')
  })

  it('does not mutate the answers handed to it', () => {
    const before = { practice: 'pc', line: 'auto' }
    answerStep(STEPS, before, 'practice', 'life')
    expect(before).toEqual({ practice: 'pc', line: 'auto' })
  })
})

describe('facetsFromAnswers', () => {
  it('collects the facets the answers fixed', () => {
    const facets = facetsFromAnswers(STEPS, { practice: 'pc', question: 'indication' })
    expect(facets).toEqual({ practiceArea: 'pc', function: 'pricing', timeOrientation: 'prospective' })
  })

  it('ignores a facet from a step that no longer applies', () => {
    // `line` carries no facets, but the guard matters for the general case:
    // only visible steps contribute.
    const facets = facetsFromAnswers(STEPS, { practice: 'life', question: 'reserves' })
    expect(facets.practiceArea).toBe('life')
  })
})

describe('deriveAssumptions', () => {
  it('names the question an answer-derived row came from', () => {
    const rows = deriveAssumptions(STEPS, { practice: 'pc', question: 'reserves' }, [])
    expect(rows).toHaveLength(1)
    expect(rows[0].label).toBe('Tail factor')
    expect(rows[0].value).toBe('1.020')
    expect(rows[0].origin).toBe('answer')
    expect(rows[0].basis).toContain('What for?')
  })

  it('names the document a source-derived row came from', () => {
    const rows = deriveAssumptions(STEPS, {}, [SOURCE])
    expect(rows.map(r => r.label)).toEqual(['Supervisory target MCT ratio', 'Internal capital target'])
    expect(rows[0].basis).toBe('MCT guideline')
    expect(rows[0].resourceId).toBe('mct')
  })

  it('keeps a row whose value is blank, with its locator', () => {
    const rows = deriveAssumptions(STEPS, {}, [SOURCE])
    expect(rows[1].value).toBeUndefined()
    expect(rows[1].locator).toBe('ORSA')
  })

  it('puts the scoping rows before the source rows', () => {
    const rows = deriveAssumptions(STEPS, { practice: 'pc', question: 'reserves' }, [SOURCE])
    expect(rows.map(r => r.origin)).toEqual(['answer', 'source', 'source'])
  })

  it('drops the rows of an answer the flow no longer asks for', () => {
    const rows = deriveAssumptions(STEPS, { practice: 'life', line: 'auto' }, [])
    expect(rows).toHaveLength(0)
  })
})

describe('deriveKeyDetails', () => {
  it('leads with the deliverable type', () => {
    const details = deriveKeyDetails('analysis', STEPS, {}, [])
    expect(details[0]).toMatchObject({ label: 'Deliverable type', value: 'Analysis' })
  })

  it('says when nothing is attached, rather than showing an empty row', () => {
    const details = deriveKeyDetails('analysis', STEPS, {}, [])
    expect(details.at(-1)).toMatchObject({ label: 'Supporting sources', value: '0 documents' })
    expect(details.at(-1)?.basis).toBe('None attached yet')
  })

  it('counts one document in the singular', () => {
    const details = deriveKeyDetails('report', STEPS, {}, [SOURCE])
    expect(details.at(-1)?.value).toBe('1 document')
  })
})

describe('derivePeriods / periodLabels', () => {
  it('is null until a grain is chosen', () => {
    expect(derivePeriods(STEPS, {})).toBeNull()
  })

  it('reads the grain off the answer', () => {
    expect(derivePeriods(STEPS, { period: 'ay5' })).toEqual({ count: 5, label: 'Accident year', basis: 'year' })
  })

  it('labels years ending with the most recent complete one', () => {
    const spec = { count: 3, label: 'Accident year', basis: 'year' as const }
    expect(periodLabels(spec, new Date('2026-09-20T00:00:00Z'))).toEqual(['2023', '2024', '2025'])
  })

  it('labels quarters ending with the most recent complete one', () => {
    const spec = { count: 3, label: 'Valuation quarter', basis: 'quarter' as const }
    // September 2026 is in Q3, so the last complete quarter is 2026Q2.
    expect(periodLabels(spec, new Date('2026-09-20T00:00:00Z'))).toEqual(['2025Q4', '2026Q1', '2026Q2'])
  })

  it('rolls a quarter back across a year boundary', () => {
    const spec = { count: 2, label: 'Valuation quarter', basis: 'quarter' as const }
    expect(periodLabels(spec, new Date('2026-02-10T00:00:00Z'))).toEqual(['2025Q3', '2025Q4'])
  })
})

describe('deliverableStatus', () => {
  it('is a draft while any question is unanswered', () => {
    expect(deliverableStatus(STEPS, { practice: 'pc' }, [])).toBe('draft')
  })

  it('is scoped once every question is answered but nothing is attached', () => {
    expect(deliverableStatus(STEPS, { practice: 'life', question: 'reserves', period: 'ay5' }, [])).toBe('scoped')
  })

  it('is populated once a source is attached', () => {
    expect(deliverableStatus(STEPS, { practice: 'life', question: 'reserves', period: 'ay5' }, ['mct'])).toBe('populated')
  })

  it('falls back to draft when a source is attached to an unscoped deliverable', () => {
    expect(deliverableStatus(STEPS, {}, ['mct'])).toBe('draft')
  })
})

describe('chosenOption', () => {
  it('returns the option that was picked', () => {
    expect(chosenOption(STEPS[0], { practice: 'pc' })?.label).toBe('P&C')
  })

  it('is null for an unanswered step', () => {
    expect(chosenOption(STEPS[0], {})).toBeNull()
  })
})

describe('suggestedTitle', () => {
  it('names the deliverable from its facets', () => {
    expect(suggestedTitle('analysis', { practiceArea: 'pc', function: 'reserving' })).toBe('P&C Reserving analysis')
  })

  it('uses whichever facets are answered', () => {
    expect(suggestedTitle('analysis', { practiceArea: 'pensions' })).toBe('Pensions analysis')
  })

  it('falls back to the bare type before anything is answered', () => {
    expect(suggestedTitle('report', {})).toBe('Untitled report')
  })
})
