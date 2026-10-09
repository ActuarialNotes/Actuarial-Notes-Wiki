import { defaultInput } from './input'
import { AREAS } from './registry'
import type { NumberUnit, TableColumn, ToolField, ToolSpec } from './types'

const UNIT_HINT: Record<NumberUnit, string> = {
  percent: ' A decimal: 0.05 for 5%.',
  money: '',
  factor: '',
  count: '',
  years: ' In years.',
  plain: '',
}

function columnSchema(c: TableColumn): Record<string, unknown> {
  if (c.kind === 'text') return { type: 'string', description: c.label }
  return { type: c.optional ? ['number', 'null'] : 'number', description: `${c.label}.${UNIT_HINT[c.unit ?? 'plain']}` }
}

/** One field as JSON Schema, for an agent's tool call. */
export function fieldSchema(f: ToolField): Record<string, unknown> {
  const judgment = f.judgment ? ' A judgment: if omitted, the default is used and the result says so.' : ''
  switch (f.kind) {
    case 'number':
      return {
        type: f.integer ? 'integer' : 'number',
        minimum: f.min,
        maximum: f.max,
        default: f.default,
        description: `${f.description}${UNIT_HINT[f.unit]}${judgment}`,
      }
    case 'choice':
      return { type: 'string', enum: f.options.map(o => o.value), default: f.default, description: `${f.description}${judgment}` }
    case 'table':
      return {
        type: 'array',
        minItems: f.minRows,
        maxItems: f.maxRows,
        description: f.description,
        items: {
          type: 'object',
          properties: Object.fromEntries(f.columns.map(c => [c.key, columnSchema(c)])),
          required: f.columns.filter(c => !c.optional).map(c => c.key),
        },
      }
    case 'triangle':
      return {
        type: 'object',
        description: f.description,
        properties: {
          origins: { type: 'array', items: { type: 'string' }, description: 'Origin labels, oldest first.' },
          ages: { type: 'array', items: { type: 'number' }, description: 'Evaluation ages in months.' },
          values: { type: 'array', items: { type: 'array', items: { type: ['number', 'null'] } }, description: 'Cumulative values, one row per origin; null below the diagonal.' },
        },
        required: ['values'],
      }
  }
}

/** A tool's input as one JSON Schema object. */
export function inputSchema(spec: ToolSpec): Record<string, unknown> {
  return {
    type: 'object',
    properties: Object.fromEntries(spec.fields.map(f => [f.key, fieldSchema(f)])),
    additionalProperties: false,
  }
}

/** What `list_tools` says about a tool. */
export function toolSummary(spec: ToolSpec) {
  return {
    id: spec.id,
    name: spec.name,
    area: AREAS.find(a => a.id === spec.area)?.label ?? spec.area,
    answers: spec.answers,
    version: spec.version,
  }
}

/** What `describe_tool` says: everything needed to call it well. */
export function describeTool(spec: ToolSpec) {
  return {
    ...toolSummary(spec),
    notation: spec.notation(defaultInput(spec)),
    input_schema: inputSchema(spec),
    judgments: spec.fields.filter(f => f.judgment).map(f => ({ field: f.key, label: f.label, default: f.kind === 'table' || f.kind === 'triangle' ? null : f.default })),
    method: spec.method,
    next: (spec.next ?? []).map(n => n.tool),
  }
}
