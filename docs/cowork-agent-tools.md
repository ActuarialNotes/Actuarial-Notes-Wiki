# The Cowork Agent: which tools it needs

_Written 2026-10-30. A proposal (roadmap §3.4, **A7**), not a build spec._

A **Cowork agent** is Claude (or ChatGPT) doing what a Cowork reader does: following the
publishers they work from, reading the documents, building a workflow from those documents,
data, calculations and concepts, running it, and drafting the write-up for a person to review.
Nothing in this proposal changes the standing rule that **the app calls no model and holds no
key** (roadmap §6.2). The agent is the reader's own assistant, using the Actuarial Notes
connector plus whatever other connectors the reader has added.

This document lists the tools that exist today, sorts them into what the agent needs and what
it doesn't, and names the tools that are missing, in priority order.

---

## 1. What exists today

### 1.1 The Actuarial Notes connector (`quiz/api/_mcp/server.js`)

Ten MCP tools, four resource templates (`exam`, `concept`, `resource`, `question`) and four
prompts (`study_session`, `explain_concept`, `practice_quiz`, `study_plan`).

| MCP tool | What it does | Cowork agent |
|---|---|---|
| `search` | Full-text search over the vault export | **Needed.** The way in to concepts, resource pages and regulation pages |
| `fetch` | One page by id, with its fact-check verdict | **Needed.** Reads the document a source step cites |
| `get_concept` | A concept page: definition, formula, examples | **Needed.** Every `concept` step in a workflow brief calls it |
| `list_tools` | The calculator catalogue, searchable | **Needed** |
| `describe_tool` | One calculator's input schema, judgments, readings, hand-offs | **Needed.** Called before any input is changed |
| `run_tool` | Runs one calculator; returns results, judgments, warnings, trace, `app_url` | **Needed.** The only source of a figure |
| `list_exams`, `get_exam` | The exam catalogue and one syllabus | Optional. Useful only to map a method back to its syllabus reading |
| `get_practice_questions`, `check_answer` | The practice loop | Not needed. Study Mode's |
| Prompts `study_session`, `practice_quiz`, `study_plan` | Study coaching | Not needed |
| Prompt `explain_concept` | A grounded explanation | Optional |

So **six of the ten tools are the Cowork agent's core**. The other four belong to Study Mode.

### 1.2 The calculators behind `run_tool` (`quiz/src/lib/tools/`)

`list_tools` returns 37 calculators today. Each reproduces published work in CI (§17 of
`docs/actuarial-tools.md`), except the three Data Sources and Frequency × Severity Trend, which
have no published worked example to reproduce.

| Area | Tools | Enough for practitioner work? |
|---|---|---|
| Data Sources (3) | Life Table, Price Index, Yield Curve | Partly. No loss data, no Canadian curve, no regulator factors |
| Reserving (8) | Ratio Triangle, Age-to-Age Factors, Development to Ultimate, Chain Ladder, Expected Claims, Bornhuetter-Ferguson, Benktander, Cape Cod | Friedland Ch. 6–10 only. No tail factor, no frequency-severity, no Berquist-Sherman, no ULAE, no variability |
| Ratemaking (10) | Earned Premium, On-Level Factors, Trend Fit, Frequency × Severity Trend, Trend Factor, Two-Step Loss Trend, Expense Ratios, Permissible Loss Ratio, Loss Ratio Method, Pure Premium Method | The overall indication, end to end. No credibility weighting of the indication, no classification work, no ILFs |
| Loss distributions (3) | Distribution, Limited Expected Value, Expected Payment | Single loss only. No aggregate, no fitting, no tail measures |
| Credibility (3) | Full Credibility Standard, Partial Credibility, Bühlmann Credibility | Partial. No credibility weighting, no empirical Bayes |
| Financial maths (10) | Interest Converter, Annuity, Present Value, IRR, Loan Schedule, Bond Price, Bond Yield, Bond Amortization, Duration & Convexity, Redington Immunization | Enough for discounting and ALM checks. No spot/forward curve from bonds |

### 1.3 Cowork itself

Cowork's two places, **Sources** (`data/coworkSources.ts`: 22 publishers, 50 documents, 24 of
them samples) and **Workflows** (`lib/workflow*.ts`: the board, three templates, CSV data,
source tables, sub-workflows), reach an assistant through **one channel only**: *Run in
Claude* copies a workflow as a text brief (`lib/workflowBrief.ts`) for the reader to paste.

The connector exposes **nothing** of Cowork. The knowledge-base export
(`lib/knowledgeBase.ts`) doesn't carry the source catalogue, so `search` can't find a
publisher, a document's table shape or its assumptions with their locators. The reader's
library and workflows live in localStorage, which no server can read.

### 1.4 Other connectors a reader may have

Of what is available beside the Actuarial Notes connector:

| Connector / tool | Use in Cowork | Needed? |
|---|---|---|
| **Google Drive** (`search_files`, `read_file_content`, `download_file_content`, `create_file`, `update_file`) | Reading the reader's own claim listings, triangles and prior workpapers; saving the exhibits a run produces | **Needed.** Cowork holds no experience data by design, so the reader's data has to come from somewhere |
| **Claude Docs** (`create`, `update`, `batch`, comments) | The draft memo or method rationale, as a living doc a reviewer comments on | **Needed.** It is the human-in-the-loop surface the agent plan's §6.2 asks for |
| **Artifacts** | Exhibits and side-by-side comparisons (chain ladder vs BF vs Cape Cod) to look at | Useful |
| **WebFetch / WebSearch** | Checking whether a publisher has issued a newer edition of a document in the catalogue | Useful, as a pointer only. A figure is never taken from a web page by a model (the vault's rule: transcribed by a script, with its sha256) |
| **xlsx / pdf skills** | Writing a workpaper; reading a source PDF the catalogue links | Useful |
| **Scheduled tasks** (`create_trigger`, `send_later`) | Watching followed publishers for new documents on a schedule | Useful later (§2.6) |
| **GitHub** | Proposing a catalogue addition as a PR, with the `cowork-sources` skill | Maintainer only |
| **ElevenLabs**, Supabase, Google Analytics | — | Not needed |

---

## 2. What is missing, in priority order

Ranked by the roadmap's §0.3 rule: what makes an existing promise true first, then what
unblocks the most practitioner work.

### 2.1 Cowork in the connector: the source catalogue (P1)

The agent can't follow a source it can't see. Three read-only MCP tools, built from
`data/coworkSources.ts` through the export:

| New MCP tool | Input | Returns |
|---|---|---|
| `list_sources` | optional `category` (regulator, standards, insurer, industry-data, consulting, media), `region`, `practice_area`, `function`, `query` | Publishers: id, name, region, `established`, logo URL, document count, Cowork `app_url` |
| `get_source` | `source` | The publisher and its whole catalogue |
| `get_document` | `document` | Kind, date, link, `sample` flag, the vault page it is (`wikiRef`) and its verdict, `assumptions` with each one's locator and value (blank if the document doesn't state one), and `table` (columns, row labels, locator), with **blank figures** |

Contract, carried over from `docs/cowork.md` §3: a `sample: true` entry is returned labelled as
a sample, with no date and no link, and the tool description tells the model never to cite it as
a document. A table's figures come back blank unless they have been transcribed. This changes
the export's shape, so `KNOWLEDGE_BASE_VERSION` and `SUPPORTED_KB_VERSION` are bumped together
(`docs/ai-connector.md`), and the catalogue tests extend to the export. Cost: small. The data and
its integrity tests exist already.

### 2.2 Cowork in the connector: workflows (P1)

Today the brief tells the model to replay the board step by step with `run_tool`, which is
slow and drifts. The engine already evaluates a whole workflow (`evaluateWorkflow`), and the
connector already bundles the engine (`quiz/api/_tools/engine.js`).

| New MCP tool | Input | Returns |
|---|---|---|
| `list_workflow_templates` | optional `query` | The templates (`TEMPLATES`): id, title, goal, steps |
| `run_workflow` | A workflow as JSON (steps, edges, inputs, tables as filled) | Every step's run in run order (`StepRun`), the links each one used, every judgment left at its default and every warning, and an `app_url` that opens the workflow on the board |
| `check_workflow` | The same JSON | What `connectReason` / `edgeKind` refuse (a cycle, a duplicate, a link with nothing to carry), without running it |

`run_workflow` makes the brief one call and makes a run reproducible. The `app_url` is the way
back to the board for the human. *Run in Claude* would then copy the workflow's JSON alongside
the prose brief. Like the other tools: read-only, idempotent, no account.

### 2.3 A practitioner Agent Skill and prompts (P1)

`quiz/skills/actuarial-notes/SKILL.md` is a **study coach**. A Cowork agent needs a second skill,
`actuarial-cowork`, plus the three MCP prompts `docs/actuarial-tools.md` §7.1 already plans and
that aren't built yet:

- `reserve_analysis`: Ratio Triangle → Age-to-Age Factors → **the human selects** → Development
  to Ultimate → Chain Ladder, BF and Cape Cod side by side → **the human selects** → draft
  commentary citing the method pages.
- `rate_indication`: On-Level Factors → Trend Fit (**the human picks the trend**) → Trend Factor
  → Loss Ratio Method. With a source step for FSRA's loss trend benchmarks when the filing is
  Ontario auto.
- `check_my_work`: the reader's own figure against the tool's trace.

The skill's rules: every figure from `run_tool` / `run_workflow`; judgments surfaced, never
chosen silently; warnings quoted; jurisdiction kept explicit (a Canadian source isn't
generalized); a `Sample` never cited; the output is a **draft for review**, never an opinion
(ASOP 41 framing, agent plan §6).

### 2.4 Getting the reader's data in (P2)

Cowork holds no experience data, so the agent's first job on most tasks is turning the reader's
file into a tool's input. Three gaps:

1. **Triangle from Claim Listing** (`docs/actuarial-tools.md` §4.1, Phase 2): transactions →
   a paid, reported or count triangle, with the ASOP 23 data checks as warnings. Without it, a
   reserve review can't start from what a claims system exports.
2. **`map_table`**: `lib/workflowCsv.ts`'s `parseCsv` / `guessMapping` / `csvInput` as an MCP
   tool, so a CSV read from Drive is mapped onto a tool's table, triangle, date or number inputs
   the way the board maps it (cells moved, never computed on).
3. **Loss Development Data** (the CAS Loss Reserving Database, §4.11): real filed triangles to
   work on when the reader has none. Waits on decision D3 (its terms).

### 2.5 The calculators practitioners reach for next (P2)

From the Phase 2–3 catalogue, ranked by how often the work needs them and how much of
Cowork's current catalogue (Canadian P&C: OSFI, FSRA, the CIA, IFRS 17) they serve:

| Priority | Tools | Why |
|---|---|---|
| 1 | **Tail Factor**; **Credibility Weighting** | Every reserve review needs a tail; every indication blends with a complement. Both are on A2 already |
| 2 | **Frequency-Severity**; **Case Adequacy** and **Settlement Rate Adjustment** (Berquist-Sherman); **Case Outstanding Development**; **ULAE** (Classical, Kittel) | The rest of Friedland, so a reserve review isn't limited to four methods |
| 3 | **Mack Standard Error**; **ODP Bootstrap**; **VaR & TVaR** | Reserve variability: what an appointed actuary is asked for |
| 4 | **Risk Adjustment** (Cost of Capital, Confidence Level); a Canadian discount curve (the Bank of Canada's, waiting on D3) | IFRS 17, which Cowork's Canadian publishers are about |
| 5 | **MCT Ratio** with **Capital Factors** transcribed from OSFI's guideline | OSFI is a followed publisher, and the MCT is its central document |
| 6 | **ILFs**, **LER**, **Relativities** (pure premium, loss ratio), **Base Rate Offset**, **Extension of Exposures** | Classification and limits work after the overall indication |
| 7 | Reinsurance (quota share, surplus, per-risk and cat XL, burning cost, exposure rating); aggregate loss models; MLE fit and goodness of fit; spot & forward rates | Breadth |

Each keeps the tool rules: one question, published fixtures in CI before it leaves Preview,
nothing invented (a regulator factor is transcribed with its guideline's version and date or
absent).

### 2.6 Later

- **The reader's own library and workflows** (`get_library`, `list_my_workflows`). They live in
  localStorage today, so these wait on the connector's personal access (roadmap **A1**, OAuth)
  and on Cowork's storage moving to the account. Until then, the reader pastes.
- **Publisher watch**: a scheduled task that checks each followed publisher's page for a new
  edition and reports it, so the catalogue entry can be updated by PR (`cowork-sources` skill).
  It reports; it never edits the catalogue or a figure itself.
- **An ontology query tool** (agent plan Phase B1): SPARQL over the Actuarial Ontology's instance
  KB, for entity questions ("which perils does this form exclude?").
- **A workpaper export**: the run as an `.xlsx` with live formulas (Tools Phase 4), so a reviewer
  can recalculate it in Excel.

---

## 3. The toolset, in one list

**Have, and needed:** `search`, `fetch`, `get_concept`, `list_tools`, `describe_tool`, `run_tool`,
the 37 calculators, Google Drive, Claude Docs. **Have, and useful:** `get_exam`, Artifacts,
WebFetch/WebSearch, the xlsx and pdf skills, scheduled tasks.

**To build:**

| # | Tool | Section | Size |
|---|---|---|---|
| 1 | `list_sources`, `get_source`, `get_document` | §2.1 | Small: data and tests exist; export version bump |
| 2 | `list_workflow_templates`, `run_workflow`, `check_workflow` | §2.2 | Small to medium: the engine exists and is already bundled |
| 3 | `actuarial-cowork` skill; `reserve_analysis`, `rate_indication`, `check_my_work` prompts | §2.3 | Small: text |
| 4 | Triangle from Claim Listing; `map_table` | §2.4 | Medium |
| 5 | Tail Factor, Credibility Weighting, then the rest of Friedland | §2.5 | Medium per tool (fixtures) |
| 6 | Variability, IFRS 17 risk adjustment, MCT | §2.5 | Large |
| 7 | Library/workflow access, publisher watch, ontology query, live-formula workpaper | §2.6 | Waits on A1, D2, D3 |

Items 1–3 need no new decision: the connector stays read-only, public and keyless. Item 7's
personal access is decision D1/A1's, and an in-app agent stays parked on D2.
