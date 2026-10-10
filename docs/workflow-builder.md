# Workflow Builder

`/tools/workflow`, opened from the row at the top of the Tools catalogue. A reader lays out
an actuarial workflow — **data**, **calculations** and **concepts** as steps on a grid,
joined by **directed connections** — watches it run live on the Actuarial Tools engine,
and can **deploy it with Claude** on their own Anthropic API key.

It is Concept Craft's board (docs/concept-craft.md) with the physics taken out. Concept
Craft is a map to be discovered, so its cards float on a force simulation; a workflow is a
procedure to be read, so every step is **locked in a cell** and stays where it was put.

| Piece | Where |
| --- | --- |
| The model: steps, connections, edits, run order, live evaluation, templates | `quiz/src/lib/workflow.ts` |
| The grid: cells, placement, the line between two cards | `quiz/src/lib/workflowGrid.ts` |
| Deploying with AI: the brief, the tools, the loop | `quiz/src/lib/workflowAgent.ts` |
| The reader's workflows and API key (localStorage) | `quiz/src/hooks/useWorkflows.ts` |
| The page | `quiz/src/pages/WorkflowBuilder.tsx` |
| The board | `quiz/src/components/workflow/WorkflowBoard.tsx` |
| The **+** menu | `quiz/src/components/workflow/WorkflowAddMenu.tsx` |
| A step's and a connection's panel | `quiz/src/components/workflow/WorkflowPanels.tsx` |
| The deploy panel | `quiz/src/components/workflow/WorkflowDeployPanel.tsx` |
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

- **sends values** — tool to tool along a hand-off the engine already defines
  (`ToolSpec.next`, the card's *Send to…*). The values flow: `evaluateWorkflow` runs every
  tool step live and lays the hand-off's fields over the next step's input, so a chain reads
  the way one card does. The step's panel says which fields came from where, and that a
  change there gives way to the connection.
- **feeds** — any other step to a tool. Descriptive: no tool wires these two, so the reader
  says what passes along it (the connection's note), and an AI deploying the workflow carries
  the values across.
- **informs** — a concept to a step; **applies** — a step to a concept.

## The board

Drag a card to move it: it snaps to the cell it is dropped on, if that cell is free (a dashed
cell shows where it would land, red if taken). Drag from a card's port onto another card to
connect them, or tap the port and then the card. Tap a card for its panel, a connection's
label for its own. Drag the empty board to pan; pinch or wheel to zoom — the same camera as
Concept Craft's. The board is always dark, like Concept Craft's.

The **+** opens a menu of pages: *what kind of step?* → Data (the Data Sources and *Your own
data*), Calculation (a practice area → its tools), Concept (an exam → its sections' concepts,
read off the exam pages as Concept Craft's starter packs are, or search every concept page).
A step added while another is selected goes **after** it — in the column to its right,
connected from it — so a chain is built by adding step after step. With nothing selected it
starts a new column at the board's right edge.

A tool step's panel holds the tool's own `ToolCard` (embedded: no sources, no *Send to…*),
so its inputs are set exactly as on `/tools/<slug>`.

## Deploying with AI

The **Deploy** button opens a panel with the workflow's goal, the reader's API key, and the
deployment's log.

- **The key** is kept in this browser's localStorage (`actuarial_anthropic_api_key`) and sent
  only to `api.anthropic.com`, from the browser, through the official SDK
  (`dangerouslyAllowBrowser`). The SDK is a lazy chunk, fetched on the first deployment.
  Nothing about the key reaches our servers or analytics. *Forget* removes it.
- **The brief** (`describeWorkflow`) is the workflow in run order: each step's kind, the
  question it answers, the reader's note, what leads into it and out of it (with each
  connection's kind and note), and — for a tool — the input it currently runs on, its result,
  the judgments left at their defaults and its warnings. The reader's own data is included
  verbatim.
- **The tools** (`agentTools`) run here, on the same engine as the cards, and only over
  what is on the workflow: `run_tool` and `describe_tool` (enumerated to the workflow's tool
  ids) and `read_concept` (to its concept pages).
- **The loop** (`deployWorkflow`) is a manual tool-use loop on `claude-opus-5-5`, effort
  `medium`, with the server-side refusal fallback (`fallbacks: "default"`). Every tool result
  of a turn goes back in one message; it stops at the end of the model's turn, on a refusal,
  when the reader presses Stop, or after `MAX_TURNS`. Each tool call is logged with its
  one-line summary and lights the step it is about on the board.

The system prompt holds the connector's contract (docs/ai-connector.md): every figure comes
from `run_tool`, judgments left at their defaults are named as the reader's call, nothing is
invented when a step lacks data, warnings are quoted, and the report ends saying it is study
material.

**No key?** *Copy for Claude* puts the same brief on the clipboard, addressed to the
Actuarial Notes connector's own tools (`run_tool`, `describe_tool`, `get_concept`), to paste
into Claude or ChatGPT with the connector added (Settings → AI assistants).

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
