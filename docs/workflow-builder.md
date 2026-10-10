# Workflow Builder

`/tools/workflow`, opened from the row at the top of the Tools catalogue. A reader lays out
an actuarial workflow — **data** (published tables, or a **CSV** of their own),
**calculations**, **concepts** and whole **sub-workflows** as steps on a grid, joined by
**directed connections** — watches it run live on the Actuarial Tools engine, keeps the ones
worth keeping in a **library**, and **runs it in Claude** by copying it as a brief for the
Actuarial Notes connector.

It is Concept Craft's board (docs/concept-craft.md) with the physics taken out. Concept
Craft is a map to be discovered, so its cards float on a force simulation; a workflow is a
procedure to be read, so every step **stays where it was put** — snapped to a fine grid,
anywhere on an unbounded board.

| Piece | Where |
| --- | --- |
| The model: steps, connections, edits, run order, live evaluation, templates | `quiz/src/lib/workflow.ts` |
| The grid: snapping, the gutter between cards, placement, the line between two cards | `quiz/src/lib/workflowGrid.ts` |
| An uploaded CSV: reading it, and mapping its columns onto a tool's inputs | `quiz/src/lib/workflowCsv.ts` |
| The brief *Copy for Claude* writes | `quiz/src/lib/workflowBrief.ts` |
| The reader's workflows and library (localStorage), and the sub-workflow resolver | `quiz/src/hooks/useWorkflows.ts` |
| The page | `quiz/src/pages/WorkflowBuilder.tsx` |
| The board | `quiz/src/components/workflow/WorkflowBoard.tsx` |
| The **+** menu | `quiz/src/components/workflow/WorkflowAddMenu.tsx` |
| A step's and a connection's panel | `quiz/src/components/workflow/WorkflowPanels.tsx` |
| The *Run in Claude* panel | `quiz/src/components/workflow/WorkflowClaudePanel.tsx` |
| A linked field, on the primary colour | `ToolCard`'s and `EditableTable`'s / `TriangleGrid`'s `linked` |
| Shared with Concept Craft | `components/craft/CraftControls.tsx` (the map buttons), `lib/craftLayout.ts` (the camera), the `.craft-floor`, `.craft-drawer-in` / `.craft-sheet-in` classes, the concept popup |

All four `lib/` modules are pure and tested (`workflow*.test.ts`); the flows are
`e2e/workflow.spec.ts`.

## Steps

| Kind | What it is | `ref` |
| --- | --- | --- |
| **Data** | A Data Sources tool (life table, price index, yield curve), a **CSV** the reader uploaded, or their **own data** named and described or pasted in | the tool id, `csv`, or `custom` |
| **Calculation** | Any other Actuarial Tool | the tool id (`reserving.chain_ladder`) |
| **Concept** | A vault concept page: the method, definition or judgment a step rests on | the page name |
| **Workflow** | A whole workflow as one step — one from the reader's library, or a template | the workflow's id, or `template:<id>` |

A tool may be on the board more than once (Bornhuetter-Ferguson on two priors); a concept
only once. A tool step stores only its **own** input — the fields the reader moved off their
defaults (`stepOwnInput`) — so a judgment never touched still reads as *left at its default*
in the result, exactly as on the tool's own card.

## Connections

A connection runs one way, out of a card's right edge (its **port**) into the next card's
left edge. A workflow never loops (`connectReason` refuses a step to itself, a duplicate and
a cycle), so it always has a run order (`runOrder`: every step after the steps that lead into
it, otherwise column by column, top to bottom).

What a connection *does* is read off its two ends (`edgeKind`):

- **a link** (`handoff`) — tool to tool along a hand-off the engine already defines
  (`ToolSpec.next`, the card's *Send to…*). The values flow: `evaluateWorkflow` runs every
  tool step live and lays the hand-off's fields over the next step's input, so a chain reads
  the way one card does.
- **feeds** — any other step to a tool. Descriptive: no tool wires these two, so the reader
  says what passes along it (the connection's note), and Claude carries the values across.
- **informs** — a concept to a step; **applies** — a step to a concept.

Only a concept's connection carries a word on the board (`edgeLabel`): values moving from
one step to the next are the line itself, solid and heavier for a link. Every line is its own
way into the connection's panel — a wide, unseen stroke under it takes the tap.

### Colour is a link

A linked value wears the **primary colour** everywhere it shows. With a step's panel open,
each field a link fills is drawn on it in the step's own card (`ToolCard`'s `linked` — the
value of a number, date or choice, every cell of a table or triangle), and on the board the
upstream card shows the figure that field came from on it too (`carriedTile` finds which of
its headline figures the hand-off carried; a table hand-off marks the card's figure without
claiming one). Above the card, one line on a tint of the same colour says it:
"**Annual trend** linked to **Trend Fit**" — the field name brings the field into view on the
card, the step's name opens that step's panel. A linked value is shown to four places (it
arrives at full precision), and a change made to it gives way to the link.

## The board

Drag a card anywhere: it snaps to the nearest point of a 24 px lattice (the floor's dots), on
an unbounded board — negative positions included. Two cards never overlap and always keep a
gutter for a line between them (`overlaps`): a card dropped on another lands in the nearest
place it fits (`nearestFit`), and a dashed outline shows where while it is dragged, so a move
is never refused. Drag from a card's port onto another card to connect them, or tap the port
and then the card. Tap a card for its panel, a line for its own. Drag the empty board to pan;
pinch or wheel to zoom — the same camera as Concept Craft's. The board is always dark, like
Concept Craft's.

New steps are laid a `STEP` apart (a card and a gutter), so a chain built by adding step after
step comes out evenly spaced; templates are written in `STEP`s. A workflow saved on the first,
coarse grid (one card per cell) has no `grid: 2` and is spread onto the fine one as it is read.

The **+** opens a menu of pages: *what kind of step?* → Data (the Data Sources and *Your own
data*), Calculation (a practice area → its tools), Concept (an exam → its sections' concepts,
read off the exam pages as Concept Craft's starter packs are, or search every concept page).
A step added while another is selected goes **after** it — a `STEP` to its right, connected
from it — so a chain is built by adding step after step; a second step after the same one is a
branch, laid under the first. With nothing selected it goes beside the board's right edge.

A tool step's panel holds the tool's own `ToolCard` (embedded: no sources, no *Send to…*),
so its inputs are set exactly as on `/tools/<slug>`.

## Running it in Claude

The header's **Run in Claude** opens a panel with the workflow's goal, **Copy for Claude**, and
the two steps: add the Actuarial Notes connector to Claude or ChatGPT once (its address, with a
copy button, and a link to Settings → AI assistants), then paste the workflow into a new chat.
The panel shows what Claude is given.

**The app calls no model and holds no key.** An earlier version deployed the workflow from the
browser on the reader's own Anthropic API key; it was taken out — a secret key typed into a
web page and kept in its storage is a key any script on the page can read. The reader's own
assistant runs the workflow instead, through the connector's tools on the same engine as the
cards (docs/ai-connector.md).

**The brief** (`describeWorkflow` in `lib/workflowBrief.ts`) is the goal, then how to run it
(`HOW_TO_RUN`: the connector's contract as instructions — every figure from `run_tool`, never
the arithmetic; `describe_tool` before changing a tool's input; `get_concept` for each concept
step; judgments left at their defaults named as the reader's call; nothing invented when a step
lacks data; warnings quoted; a short report to finish), then every step in run order: its kind,
the question it answers, the reader's note, what leads into it and out of it — a link with the
fields it carries, a *feeds* connection with its note — and for a tool the input it currently
runs on, its result, the judgments left at their defaults and its warnings. The reader's own
data is included verbatim.

## The library

**Save** (the bookmark in the header) puts the open workflow in the reader's **library**
(`Workflow.saved`); tapping it again takes it out. The library is what the **starting
screen** — the board of an empty workflow — lists above the templates, each opening the
workflow it names (an empty, unsaved draft is let go as it does), and what the + menu's
*Workflow* page offers as sub-workflows. The title's menu lists the library and the drafts
(workflows not saved, with steps on them) apart.

## Sub-workflows

A workflow from the library, or a template, goes on another workflow's board as **one step**
(kind `workflow`), so a workflow can be built and read at whichever level of detail suits: a
rate indication as one card in a pricing review, or opened up into its six steps.

- **What links into it** goes into its **first calculations** — the ones nothing inside it
  leads into (`sourceSteps`, `entrySteps`) — along the engine's hand-offs, as overrides on
  those inner steps' inputs; **what it hands on** is its **last calculations'** results
  (`sinkSteps`, `exitSpecs`; a sub-workflow inside a sub-workflow hands on through its own).
  So `edgeKind` reads a line into or out of one as a link when any of those hand-offs exists.
  A link only ever enters at a first step: a hand-off into a step inside, already fed from
  within, would have two sources for one value.
- `evaluateWorkflow(wf, resolve)` runs the sub-workflow whole on its own steps' inputs
  (`StepRun.inner`), and its card shows its last calculation's headline figure (`StepRun.exits`),
  or how many of its steps need input (`innerErrors`). Its panel lists its steps in run order
  with their figures, and what links into it ("Trend Fit: points linked to cpi.csv").
- **Open this workflow** goes into it, on the same board; the header shows the workflow it was
  opened from, and tapping that goes back up. A **template** opens as a copy of the reader's
  own, saved to their library, and the step is pointed at the copy — so what is changed inside
  is what the step runs. A sub-workflow is resolved by id each time (`resolverFor`, over the
  library and the templates), so editing a library workflow changes every board it is on, and
  its card reads under its current title (`withResolvedLabels`).
- **Never inside itself**: `canNest` refuses a workflow on its own board, or on the board of
  any workflow it holds at any depth; the + menu greys such a workflow out. A sub-workflow
  deleted from the library says so on its card. Evaluation stops nesting at six levels.

## Your data, as a CSV

The + menu's *Data* page takes a **CSV upload** (`parseCsv`: the header row, quoted cells,
comma, semicolon or tab, up to 2,000 rows, 60 columns and 300 KB — a larger file says so
rather than being cut). The step keeps the file as text, cell for cell, and its panel shows
its columns, what each holds (`columnKind`: dates and periods, values, or text) and its first
rows, with **Replace the file**.

Connected to a calculation, the CSV is **linked** once its columns are mapped onto the tool's
inputs, on the connection's panel (`CsvMapping`, one entry per field):

- a **table** input (Trend Fit's points, On-Level Factors' rate changes, a cash-flow list…)
  takes one CSV column per table column — the dates or periods into its text column, the
  values into its number columns — and every row of the file becomes a row of the table;
- a **triangle** input takes the whole file, origins down the first column and ages across the
  header, when the file has that shape (`triangleShaped`);
- a **date** or **number** input takes one cell: a column, and its last, first or n-th row.

Connecting a CSV starts from a guess (`guessMapping`, in `link`): a table's columns by name
first, then by kind; a triangle by shape; never a single cell, since which row is a judgment.
The mapped values travel as the file's own text and the engine reads them as it reads anything
typed, so a cell it can't read is named by the tool's own error. Nothing is computed from the
file — a mapping only moves cells. On the step's card the filled fields wear the primary
colour, and the note says "**Points** linked to **cpi.csv**". The brief for Claude carries the
file whole (up to 200 rows) and what each connection maps.

## Templates

`TEMPLATES` lays out three workflows a syllabus reading walks through — a reserve review
(chain ladder and Bornhuetter-Ferguson), a rate indication (the loss ratio method) and bond
pricing and risk. `workflow.test.ts` holds every template's tool ids to the engine and its
concepts to `Concepts/`, and runs each one cleanly.

## Storage

localStorage only (`actuarial_workflows_v1`), every workflow and which is open, read back
field by field (`parseWorkflow` drops a step it can't place and any connection that would
loop). The title opens a menu to rename the workflow, open another, start a new one (empty or
from a template) or delete it.
