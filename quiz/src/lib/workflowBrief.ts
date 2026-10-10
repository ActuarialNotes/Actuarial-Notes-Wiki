/**
 * **A workflow, for Claude** (docs/workflow-builder.md) — the brief *Copy for
 * Claude* puts on the clipboard, to paste into Claude or ChatGPT with the
 * Actuarial Notes connector added (docs/ai-connector.md).
 *
 * The app never calls a model and never holds a key: the reader's assistant
 * runs the workflow through the connector's own tools — `run_tool` and
 * `describe_tool` on the same engine as the cards, `get_concept` for the
 * notes. The brief carries the workflow as it stands — every step in run
 * order, what it is for, what leads into it and out of it, and for a tool the
 * input it runs on now and what that gave — and the connector's contract as
 * instructions: every figure from `run_tool`, judgments left at their defaults
 * named as the reader's call, nothing invented, warnings quoted.
 */

import {
  CSV_DATA,
  CUSTOM_DATA,
  KIND_LABEL,
  edgeKind,
  runOrder,
  stepName,
  stepTool,
  type StepRun,
  type Workflow,
  type WorkflowEdge,
  type WorkflowResolver,
} from './workflow'
import { csvText } from './workflowCsv'

const INPUT_LIMIT = 3000

const json = (v: unknown) => {
  const s = JSON.stringify(v)
  return s.length > INPUT_LIMIT ? `${s.slice(0, INPUT_LIMIT)}… [cut at ${INPUT_LIMIT} characters]` : s
}

/** How a connection is told to the assistant — plainer than the board, which draws it. */
function connectionText(wf: Workflow, runs: Map<string, StepRun>, e: WorkflowEdge, resolve?: WorkflowResolver): string {
  switch (edgeKind(wf, e, resolve)) {
    case 'handoff': {
      const fields = runs.get(e.to)?.piped.find(p => p.from === e.from)?.fields
      return fields?.length ? `linked: carries ${fields.join(', ')}` : 'linked'
    }
    case 'feeds':
      return 'its result is used by the next step'
    case 'informs':
      return 'the concept it rests on'
    case 'applies':
      return 'a worked instance of the concept'
  }
}

export const HOW_TO_RUN = [
  'Work through the steps in order, with the Actuarial Notes connector:',
  '- Every figure comes from `run_tool`. Never do the arithmetic yourself, not even a sum.',
  '- Run a step on its current input unless a connection says to pass an earlier result into it. A "linked" connection is already wired: the values it carried are in the input shown. For any other connection between two calculations, read what the earlier step returned and pass what the next tool needs into its input — call `describe_tool` first.',
  '- For a concept step, `get_concept` and use what the page says — a method\'s steps, a definition, a judgment — in the steps it informs.',
  '- A sub-workflow step is a workflow of its own: run its steps in the order listed under it. What links into it goes into its first steps; its last steps hand on to what follows.',
  '- For data I uploaded, the columns mapped into a tool are already in that tool\'s input; use the rest of the file only as the steps say.',
  '- A judgment left at its default is my call, not a selection: say which you ran at their defaults.',
  '- Invent no data. If a step needs figures the workflow does not hold, say exactly what is missing rather than assuming a value.',
  '- Quote every warning a tool returns.',
  '',
  'Finish with a short report: the answer to the goal, a line per step with its headline result, the judgments left at their defaults, the warnings, and what I should check before relying on it.',
].join('\n')

/** One tool step's current input, result, defaults and warnings — or why it can't run. */
function runLines(run: StepRun | undefined, indent = ''): string[] {
  const lines: string[] = []
  if (run?.result) {
    lines.push(`${indent}Current input: ${json(run.result.input)}`)
    lines.push(`${indent}Current result: ${run.result.summary}`)
    const defaults = run.result.judgments.filter(j => j.default)
    if (defaults.length) lines.push(`${indent}Judgments left at their default: ${defaults.map(j => j.label).join(', ')}`)
    if (run.result.warnings.length) lines.push(`${indent}Warnings: ${run.result.warnings.join(' ')}`)
  } else if (run?.error) {
    lines.push(`${indent}Its current input can't be read: ${run.error}`)
  }
  return lines
}

/** A sub-workflow's own steps, in their run order, each with what it runs on now. */
function innerLines(run: StepRun | undefined, depth: number): string[] {
  if (!run?.inner) return []
  const { workflow: inner, runs } = run.inner
  const indent = '  '.repeat(depth)
  const lines: string[] = []
  runOrder(inner).forEach((n, i) => {
    const spec = stepTool(n)
    lines.push(`${indent}${i + 1}. ${stepName(n)} — ${KIND_LABEL[n.kind]}${spec ? ` (\`${spec.id}\`)` : ''}`)
    if (n.note?.trim()) lines.push(`${indent}   Note: ${n.note.trim()}`)
    const r = runs.get(n.id)
    if (n.kind === 'workflow') lines.push(...innerLines(r, depth + 1))
    else lines.push(...runLines(r, `${indent}   `))
  })
  return lines
}

/** The workflow as a brief for an assistant with the Actuarial Notes connector. */
export function describeWorkflow(wf: Workflow, runs: Map<string, StepRun>, resolve?: WorkflowResolver): string {
  const order = runOrder(wf)
  const number = new Map(order.map((n, i) => [n.id, i + 1]))
  const label = (id: string) => {
    const n = wf.nodes.find(m => m.id === id)
    return n ? `step ${number.get(id)} (${stepName(n)})` : id
  }
  const lines: string[] = []
  lines.push(`# Workflow: ${wf.title}`)
  lines.push('')
  lines.push(wf.goal.trim() ? `Goal: ${wf.goal.trim()}` : 'Goal: none given — work out what the workflow computes and report that.')
  lines.push('')
  lines.push(HOW_TO_RUN)
  lines.push('')
  lines.push(`## Steps, in run order (${order.length})`)
  for (const node of order) {
    lines.push('')
    const spec = stepTool(node)
    lines.push(`### ${number.get(node.id)}. ${stepName(node)} — ${KIND_LABEL[node.kind]}${spec ? ` (\`${spec.id}\`)` : ''}`)
    if (spec) lines.push(`Answers: ${spec.answers}`)
    if (node.note?.trim()) lines.push(`Note: ${node.note.trim()}`)
    const into = wf.edges.filter(e => e.to === node.id)
    const outOf = wf.edges.filter(e => e.from === node.id)
    const told = (e: WorkflowEdge, other: string) => `${label(other)} — ${connectionText(wf, runs, e, resolve)}${e.note ? `: ${e.note}` : ''}`
    if (into.length) lines.push(`Comes after: ${into.map(e => told(e, e.from)).join('; ')}`)
    if (outOf.length) lines.push(`Leads to: ${outOf.map(e => told(e, e.to)).join('; ')}`)
    if (node.kind === 'concept') {
      lines.push('A concept page: read it with `get_concept` and apply it to the steps it informs.')
    } else if (node.kind === 'workflow') {
      const run = runs.get(node.id)
      if (!run?.inner) {
        lines.push(run?.error ?? 'A sub-workflow that is no longer in my library.')
      } else {
        if (run.inner.workflow.goal.trim()) lines.push(`Its goal: ${run.inner.workflow.goal.trim()}`)
        if (run.piped.length) lines.push(`Filled by its links: ${run.piped.map(p => `${p.fields.join(', ')} from ${label(p.from)}`).join('; ')}`)
        lines.push(`A sub-workflow of ${run.inner.workflow.nodes.length} steps, in run order:`)
        lines.push(...innerLines(run, 1))
      }
    } else if (node.ref === CSV_DATA) {
      if (node.csv) {
        lines.push(`My data, uploaded as ${node.csv.name} (${node.csv.rows.length} rows):`)
        lines.push('', '```csv', csvText(node.csv), '```')
        for (const e of outOf) {
          const to = wf.nodes.find(n => n.id === e.to)
          const spec = to && stepTool(to)
          if (!spec || !e.map) continue
          const said = Object.entries(e.map).map(([key, m]) => {
            const field = spec.fields.find(f => f.key === key)?.label ?? key
            if (m.kind === 'triangle') return `${field} ← the whole file, as a triangle`
            if (m.kind === 'cell') return `${field} ← ${node.csv!.columns[m.column] ?? '?'}, ${m.row < 0 ? 'last row' : `row ${m.row + 1}`}`
            return `${field} ← ${Object.entries(m.columns).map(([c, j]) => `${c}: ${node.csv!.columns[j] ?? '?'}`).join(', ')}`
          })
          if (said.length) lines.push(`Mapped into ${label(e.to)}: ${said.join('; ')}`)
        }
      } else lines.push('My uploaded data — the file was lost. Ask me for it.')
    } else if (node.ref === CUSTOM_DATA) {
      lines.push(node.data?.trim() ? `My data:\n\n${node.data.trim()}` : 'My own data — I described none. Say what this step needs and ask me for it.')
    } else {
      lines.push(...runLines(runs.get(node.id)))
    }
  }
  return lines.join('\n')
}
