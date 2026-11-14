import { describe, expect, it } from 'vitest'
import { TEMPLATES, fromTemplate, newWorkflow, type Workflow } from './workflow'
import { duplicateWorkflow, editedLabel, libraryWorkflows, subWorkflowChoices, workflowThumbnail } from './workflowLibrary'

const T0 = Date.UTC(2026, 10, 14, 12)

function wf(id: string, updatedAt: number, title = id): Workflow {
  return { ...fromTemplate(TEMPLATES[0], id, updatedAt), title }
}

describe('libraryWorkflows', () => {
  it('lists every workflow with a step, newest edit first, saved or not', () => {
    const list = [wf('a', 1), { ...wf('b', 3), saved: true }, newWorkflow('empty', 5), wf('c', 2)]
    expect(libraryWorkflows(list).map(w => w.id)).toEqual(['b', 'c', 'a'])
  })

  it('narrows to the workflows whose title or goal holds every word', () => {
    const list = [wf('a', 1, 'Reserve review'), wf('b', 2, 'Rate indication')]
    expect(libraryWorkflows(list, 'reserve').map(w => w.id)).toEqual(['a'])
    expect(libraryWorkflows(list, 'RATE ind').map(w => w.id)).toEqual(['b'])
    expect(libraryWorkflows(list, 'nothing')).toEqual([])
  })

  it('offers every other workflow as a sub-workflow', () => {
    const list = [wf('a', 1), wf('b', 2), newWorkflow('empty', 3)]
    expect(subWorkflowChoices(list, 'a').map(w => w.id)).toEqual(['b'])
  })
})

describe('duplicateWorkflow', () => {
  it('copies the board under a new id and title, leaving the original alone', () => {
    const original = { ...wf('a', 1, 'Reserve review'), saved: true }
    const copy = duplicateWorkflow(original, 'b', 9)
    expect(copy.id).toBe('b')
    expect(copy.title).toBe('Reserve review (copy)')
    expect(copy.updatedAt).toBe(9)
    expect(copy.saved).toBeUndefined()
    expect(copy.nodes).toEqual(original.nodes)
    expect(copy.edges).toEqual(original.edges)
    copy.nodes[0].col += 100
    expect(original.nodes[0].col).not.toBe(copy.nodes[0].col)
  })
})

describe('workflowThumbnail', () => {
  it('draws nothing for an empty workflow', () => {
    expect(workflowThumbnail(newWorkflow('e', 0))).toEqual({ width: 240, height: 135, cards: [], lines: [] })
  })

  it('fits every step inside the box, one card per step and one line per connection', () => {
    for (const t of TEMPLATES) {
      const w = fromTemplate(t, t.id, 0)
      const thumb = workflowThumbnail(w, 240, 135, 12)
      expect(thumb.cards).toHaveLength(w.nodes.length)
      expect(thumb.lines).toHaveLength(w.edges.length)
      for (const c of thumb.cards) {
        expect(c.x).toBeGreaterThanOrEqual(11.9)
        expect(c.y).toBeGreaterThanOrEqual(11.9)
        expect(c.x + c.w).toBeLessThanOrEqual(228.1)
        expect(c.y + c.h).toBeLessThanOrEqual(123.1)
      }
    }
  })

  it('never scales a small board up, and centres it', () => {
    const one = { ...newWorkflow('one', 0), nodes: [{ id: 'n1', kind: 'concept' as const, ref: 'Pure Premium', col: 0, row: 0 }] }
    const [card] = workflowThumbnail(one, 400, 300, 0).cards
    expect(card).toMatchObject({ w: 192, h: 96, x: 104, y: 102 })
  })
})

describe('editedLabel', () => {
  it('says how long ago, then the date', () => {
    expect(editedLabel(T0, T0 + 10_000)).toBe('Edited just now')
    expect(editedLabel(T0, T0 + 60_000)).toBe('Edited 1 minute ago')
    expect(editedLabel(T0, T0 + 5 * 60_000)).toBe('Edited 5 minutes ago')
    expect(editedLabel(T0, T0 + 3 * 3_600_000)).toBe('Edited 3 hours ago')
    expect(editedLabel(T0, T0 + 2 * 86_400_000)).toBe('Edited 2 days ago')
    expect(editedLabel(T0, T0 + 30 * 86_400_000)).toBe('Edited Nov 14')
    expect(editedLabel(Date.UTC(2025, 2, 3, 12), T0)).toBe('Edited Mar 3, 2025')
  })
})
