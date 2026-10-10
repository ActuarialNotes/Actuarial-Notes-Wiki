# Workflow Builder

`/tools/workflow`, opened from the row at the top of the Tools catalogue. A reader lays out
an actuarial workflow — **data**, **calculations** and **concepts** as steps on a grid,
joined by **directed connections** — watches it run live on the Actuarial Tools engine,
and **runs it in Claude** by copying it as a brief for the Actuarial Notes connector.

It is Concept Craft's board (docs/concept-craft.md) with the physics taken out. Concept
Craft is a map to be discovered, so its cards float on a force simulation; a workflow is a
procedure to be read, so every step **stays where it was put** — snapped to a fine grid,
anywhere on an unbounded board.

| Piece | Where |
| --- | --- |
| The model: steps, connections, edits, run order, live evaluation, templates | `quiz/src/lib/workflow.ts` |
| The grid: snapping, the gutter between cards, placement, the line between two cards | `quiz/src/lib/workflowGrid.ts` |
| The brief *Copy for Claude* writes | `quiz/src/lib/workflowBrief.ts` |
| The reader's workflows (localStorage) | `quiz/src/hooks/useWorkflows.ts` |
| The page | `quiz/src/pages/WorkflowBuilder.tsx` |
| The board | `quiz/src/components/workflow/WorkflowBoard.tsx` |
| The **+** menu | `quiz/src/components/workflow/WorkflowAddMenu.tsx` |
| A step's and a connection's panel | `quiz/src/components/workflow/WorkflowPanels.tsx` |
| The *Run in Claude* panel | `quiz/src/components/workflow/WorkflowClaudePanel.tsx` |
| A linked field, on the primary colour | `ToolCard`'s and `EditableTable`'s / `TriangleGrid`'s `linked` |
| Shared with Concept Craft | `components/craft/CraftControls.tsx` (the map buttons), `lib/craftLayout.ts` (the camera), the `.craft-floor`, `.craft-drawer-in` / `.craft-sheet-in` classes, the concept popup |

All three `lib/` modules are pure and tested (`workflow*.test.ts`); the flows are
`e2e/workflow.spec.ts`.

## Steps

| Kind | What it is | `ref` |
| --- | --- | --- |
| **Data** | A Data Sources tool (life table, price index, yield curve) — or the reader's **own data**, named and described or pasted in | the tool id, or `custom` |
| **Calculation** | Any other Actuarial Tool | the tool id (`reserving.chain_ladder`) |
| **Concept** | A vault concept page: the method, definition or judgment a step rests on | the page name |

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
