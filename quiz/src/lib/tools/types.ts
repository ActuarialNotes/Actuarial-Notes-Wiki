/**
 * The shape every Actuarial Tool takes (docs/actuarial-tools.md §5).
 *
 * A tool answers one question with one method (R9). Its spec is plain data
 * plus one pure `compute`: the card (`components/tools/ToolCard.tsx`), the
 * MCP connector (`run_tool`) and the JSON schema an agent reads are all drawn
 * from it, so the three can't disagree about what a tool takes or gives.
 *
 * Imports in `lib/tools/` are relative only — the engine is bundled for the
 * serverless functions (`npm run tools:bundle`), outside the app's `@/` alias.
 */

export type PracticeArea = 'data' | 'reserving' | 'ratemaking' | 'distributions' | 'credibility' | 'finance'

/** How a number is read and shown. A `percent` is stored as a decimal (0.05) and shown as 5%. */
export type NumberUnit = 'percent' | 'money' | 'factor' | 'count' | 'years' | 'plain'

interface FieldBase {
  key: string
  label: string
  /** The symbol the notation uses for it (i, n, V…). */
  symbol?: string
  /** A field that is a matter of judgment (R3): left at its default, the result says so. */
  judgment?: boolean
  /** What it is, for an agent reading the schema. */
  description: string
  /** Drawn only while another field holds one of these values (a CV only matters for severity). */
  showWhen?: { field: string; in: string[] }
}

export interface NumberField extends FieldBase {
  kind: 'number'
  unit: NumberUnit
  min: number
  max: number
  /** The slider's step, in stored units. */
  step: number
  /** The slider's ends, where `min` and `max` are only the validation bounds (an amount can be any size). */
  sliderMin?: number
  sliderMax?: number
  /** What the card prints for 0, where 0 means something other than nothing ("All" years). */
  zeroLabel?: string
  default: number
  integer?: boolean
}

/** A date, held as 'YYYY-MM-DD' (an effective date, a valuation date). */
export interface DateField extends FieldBase {
  kind: 'date'
  default: string
}

export interface ChoiceField extends FieldBase {
  kind: 'choice'
  options: { value: string; label: string }[]
  default: string
}

export interface TableColumn {
  key: string
  label: string
  kind: 'text' | 'number'
  unit?: NumberUnit
  /** A column that may be left blank (a text one reads as '', a number one as null). */
  optional?: boolean
}

/** Rows of named columns: origins with their figures, cash flows with their times. */
export interface TableField extends FieldBase {
  kind: 'table'
  columns: TableColumn[]
  minRows: number
  maxRows: number
  default: TableRow[]
}

/** A development triangle: origins down, ages across, blanks below the diagonal. */
export interface TriangleField extends FieldBase {
  kind: 'triangle'
  default: Triangle
}

export type ToolField = NumberField | ChoiceField | DateField | TableField | TriangleField

export type TableRow = Record<string, string | number | null>

export interface Triangle {
  origins: string[]
  ages: number[]
  /** values[origin][age]; null where the origin hasn't reached the age. */
  values: (number | null)[][]
}

export type FieldValue = number | string | TableRow[] | Triangle
export type ToolInput = Record<string, FieldValue>

/** A headline result, led by its symbol, as the simulator's μ and σ are. */
export interface Tile {
  symbol: string
  label: string
  value: number
  unit: NumberUnit
}

/** A table the card draws and the export writes. Computed columns are flagged so the card shades them. */
export interface ResultTable {
  columns: (TableColumn & { computed?: boolean })[]
  rows: TableRow[]
  /** A last row set apart (a total, the averages). */
  footer?: TableRow
}

export interface TraceStep {
  label: string
  /** The formula with values in place, as plain text. */
  formula: string
  result: number
  unit: NumberUnit
}

export interface Judgment {
  field: string
  label: string
  value: FieldValue
  default: boolean
}

export interface ToolOutput {
  tiles: Tile[]
  table?: ResultTable
  trace: TraceStep[]
  warnings: string[]
  /** The typed values, for an agent and for the next tool in a chain. */
  values: Record<string, unknown>
  /** One line saying what came out, for agents; built from the tiles when absent. */
  summary?: string
}

/** Where a result can go next (§6.5): the next tool, already filled in. */
export interface ToolHandoff {
  tool: string
  label: string
  build: (input: ToolInput, output: ToolOutput) => Partial<ToolInput>
}

export interface ToolSpec {
  /** Public API (R8): `area.name`, never renamed. */
  id: string
  version: string
  name: string
  area: PracticeArea
  /** The one question it answers (R9). */
  answers: string
  /**
   * The short names a reader or an agent types for it ("BF", "LDF", "CDF"):
   * matched by the Tools search and `list_tools`, never shown on the card.
   */
  aka?: string[]
  fields: ToolField[]
  /** The formula with live values, under the title. */
  notation: (input: ToolInput) => string
  compute: (input: ToolInput) => ToolOutput
  /** `table` draws the result table as the view; `none` leaves the tiles alone. */
  view: 'table' | 'none'
  /**
   * For a table tool: the input field the result table extends. The card
   * draws that field's columns as editable and the computed ones beside them,
   * so the grid is the input and the output at once (§6.3).
   */
  grid?: string
  method: {
    /** Vault concept page names (Concepts/<name>.md). */
    concepts: string[]
    readings: { resource: string; locator: string }[]
  }
  next?: ToolHandoff[]
  /**
   * The values a batch run lays side by side, one row per run (`runBatch`):
   * keys of the output's `values` (a `text` one a date or a label). Absent,
   * the comparison takes the tiles.
   */
  compare?: { key: string; label: string; unit: NumberUnit | 'text' }[]
}

/** The result of one run, as every surface receives it (§5). */
export interface ToolResult {
  tool: string
  version: string
  engine: string
  inputHash: string
  input: ToolInput
  summary: string
  tiles: Tile[]
  table?: ResultTable
  values: Record<string, unknown>
  judgments: Judgment[]
  warnings: string[]
  trace: TraceStep[]
  method: ToolSpec['method']
}

/** A bad input: named, explained, and correctable (§5, "errors are instructions"). */
export class ToolInputError extends Error {
  constructor(public field: string, message: string) {
    super(message)
    this.name = 'ToolInputError'
  }
}
