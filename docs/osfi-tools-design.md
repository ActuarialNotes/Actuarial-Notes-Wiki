# Insurer Return and MCT Ratio: three designs

_Written 2026-11-09. A design proposal under roadmap **A11** (`docs/osfi-pc-data.md`, phase 1).
**Design C's step 1 was built the same day (D-OT1 = C); §8 is what was built and where it
departs from the text above.** It picks up where §4.1–4.2 of that plan stop, and holds both tools to the
latest tool specs: the ground rules R1–R11 and Data Source rules (`docs/actuarial-tools.md` §3,
§4.11), the tool template (§19) and template v2 (`docs/tool-template-v2.md`)._

Three ways to build the pair are set out below, each complete on its own. §5 compares them and
recommends one. The maintainer's decisions are in §6.

---

## 1. What the new data shows

Measured on 2026-11-09, from `scripts/osfi_extract.py`'s Q2 2026 PC4 extract and a live
`datastore_search` call:

- **PC4's summary page (page 10.00) is the MCT, line by line**, with OSFI's own labels: capital
  available (line 10, or net assets available, line 25, for a branch), each risk's margin at
  target (insurance 50, market 80, credit 100, operational 105), the diversification credit
  (110), the total at target (115), the minimum (120 = 115 / 1.5, and 130), the excess (135) and
  the ratio (140). Pages 20.00 (capital available), 60.20–60.30 (credit risk) and 70.00
  (operational risk) are the working behind it.
- **Every line reproduces from the guideline's formulas**, not just the ratio. For all 128 Q2
  2026 filers, within $1k: the diversification credit from lines 50, 80 and 100 with $R$ = 50%
  (guideline §8.1), the total at target, the minimum at 1/1.5, the ratio, and the operational
  risk margin as the lesser of page 70.00's uncapped total and its cap (§7.1). The plan already
  counted 1,909 reproduced ratios over Q1 2023 – Q2 2026; these intermediate lines add five
  more checks per filing.
- **70 of the 128 are branches**, tested on the BAAT (line 25 over line 130). A tool that ignores
  them would refuse more than half the filers.
- **Sizes**: page 10.00 for one quarter is 54 KB of JSON, 13 KB gzipped; all of PC4 is 168 KB,
  42 KB gzipped. Fourteen quarters of page 10.00 come to about 190 KB gzipped; of all PC4, about
  600 KB. PC1 and PC2 are an order of magnitude larger (§3.1 of the plan).
- **A cited worked example exists for the card's default** (R2): CAS Exam 6C, Spring 2017,
  question 24 (`cas6c-2017s-q24`, on the syllabus). Capital available 53,000, insurance risk
  21,000, credit risk 2,500, and the market risk the solution finds, 24,470. The question's own
  operational risk formula gives 11,350, and the ratio comes to **150.00%**, the threshold the
  question is built around. It is a forward check for `questionChecks.ts`, and the only MCT
  example the vault has that isn't a real company.

## 2. What every design keeps

These come from the specs, not from a choice between designs:

- **Insurer Return computes nothing** (§4.11). It is a dated snapshot read mechanically, its
  values labelled only by OSFI (rule 2 of the plan), with the Open Government Licence's
  attribution in the ⋯ menu and every connector result (rule 6). A value it sends on carries
  `source: { dataset: 'osfi-pc', period, institution, address, origin: 'api' }` and arrives as a
  judgment, never `default: true`. The aggregate rows are never offered (§1.5 of the plan).
- **MCT Ratio is a calculator, not a data tool.** Its id is `capital.mct_ratio`, in a new practice
  area, **Risk and capital** (§4.8; `PracticeArea` gains `'capital'`). Its factors are not invented: $R$ = 50%, the 1.5 divisor and the 150%
  supervisory target come from the Assumptions Bank set `OSFI MCT Capital Ratios (2024)`, which
  already holds 100%, 150%, 99% and 1.5. **The bank needs $R$ = 50%, the 30% operational risk
  cap and the §7.1 factors added**, each transcribed with `assumption_lint.py --against` from the
  guideline's own text. Until a figure is in the bank the tool says it is missing; it does not
  carry it as a constant.
- **Its colour is Exam 6** (the bank set's document is on Exam 6's Source Material, §19), its
  title opens `Concepts/MCT.md` (R5), and its readings are the OSFI MCT resource page with
  chapters 1, 7 and 8.
- **Proven against filings, not tuned to them** (R6, plan §4.2). The fixture
  `lib/tools/fixtures/osfi-mct.json` is generated from the extract by a script, never edited by
  hand, and `checks.test.ts` runs every filer of every quarter. The card's fine print says
  "Reproduces every MCT and BAAT ratio filed with OSFI, Q1 2023 – Q2 2026, and CAS Exam 6C
  Spring 2017 Q24." A filer that ever fails stays in the fixture as a recorded finding.
- **Template v2's vocabulary**: the split figure with a fixed swatch per quantity
  (`insurance-risk`, `market-risk`, `credit-risk`, `operational-risk`, and the diversification
  credit as the hatched step, since it subtracts); a from chip on every input; *Takes from* and
  *Gives to* read off `spec.next`; and a published figure that matches the answer as a
  comparison line under the bar. For MCT Ratio that line is the bank's **"OSFI supervisory
  target 150%"**, open to level 2 with the guideline's §1.2.1 as its source and no *Use* button.
- **No league tables** (plan rule 7). Neither tool lists or sorts insurers by a figure.

---

## 3. The three designs

### Design A — The summary page

One page, one tool each, everything bundled. The smallest thing that ships the pair.

**Insurer Return** answers *"What did this insurer file on its MCT summary?"* and reads only PC4
page 10.00.

| | |
|---|---|
| Inputs (2) | Insurer (a long choice that opens a sheet of OSFI's names, both languages, `aka` for the short names), Quarter (a choice of the quarters in the snapshot) |
| Answer card | The filed ratio, big, with "MCT" or "BAAT" beside it; the excess over minimum and the minimum as the other two tiles |
| Figure | Page 10.00 as a stacked bar from filed numbers only: the four margins in their swatches, the diversification credit hatched and taken off, the minimum as a tick, capital available as the bar beside it |
| Grid | The page as filed, rows numbered by OSFI's line numbers (10, 25, 30 … 140), each row labelled with OSFI's English label and the French under its fold |
| Produces | `CapitalSummary` (one kind, R9): the lines by number, with provenance |
| Gives to | MCT Ratio, carrying lines 10/25, 50, 80, 100 and 105 as five Linked inputs |

**MCT Ratio** answers *"What's the MCT ratio?"*

| | |
|---|---|
| Inputs (6, the R9 limit) | Test (MCT or BAAT, a segmented control, a judgment ◆), Capital available (or net assets available), Insurance risk, Market risk, Credit risk, Operational risk, all at target |
| Computes | Diversification credit (§8.1), total at target, minimum required, the ratio, the excess |
| Tiles | The ratio, the minimum required, the excess |
| Notation | `MCT = CA / ((I + M + C + OR − DC) / 1.5)` |
| Figure | The same stacked bar as Insurer Return's, drawn from the run, with the bank's 100% and 150% as ticks |
| Default | Exam 6C Spring 2017 Q24's figures, cited (§1) |
| Takes from | Insurer Return |

The operational risk margin is an **input**, taken as filed (line 105). That keeps the tool at six
inputs and leaves §7.1's ten-term formula for a later tool.

**Data.** Page 10.00 for every IFRS 17 quarter, about 190 KB gzipped, rides in the engine like the
other Data Sources (`lib/tools/data/datasets/osfi-pc-mct.json`, written by a new
`osfi_extract.py export` from the snapshot). That's over §4.11's "about 100 KB in all", so the
default is to ship the last eight quarters (about 105 KB) and leave the older ones to Design B's
hosting when it comes. Compute stays synchronous; the connector's committed engine carries the
same file.

**Agent surface.** Nothing new: `run_tool data.insurer_return {insurer, quarter}` then
`capital.mct_ratio`. `find_insurer` (plan §5) is still wanted, since an agent can't pick an id
from a 128-option choice reliably.

**Cost.** Small. Two specs, one export step, one fixture script, one bank addition. Both tools can
go straight onto the template.

**What it gives up.** Insurer Return is not general: no balance sheet, no PC2 premiums, no other
PC4 page. The next tool that needs filed data (Market Share, Insurance Service Ratios) forces a
second design anyway, and the tool's name promises more than it reads.

### Design B — Every page, and the MCT as a chain

A general reader over every page of PC1, PC2 and PC4, and the MCT split into the tools the
guideline's own sections are.

**Insurer Return** answers *"What did this insurer file on this page?"*

| | |
|---|---|
| Inputs (4) | Insurer, Quarter, Return (PC1, PC2, PC4), Page (a choice of the pages that insurer filed that quarter, by OSFI's page number and title) |
| Answer card | The page's total line where it has one (total assets, total capital available, the ratio); otherwise the page's title and how many cells were filed |
| Figure | The page's own structure: a stack for a page of lines that sum to a total, a waterfall for a roll-forward (archive periods only), nothing more than the grid for anything else (R11 draws only what's there) |
| Grid | The page as filed, numbered by OSFI's lines and column codes, exhibit-style (§19) |
| Produces | `ReturnPage` |
| Gives to | Whatever reads that page: the PC4 pages feed the three tools below; PC2 93.30 feeds Market Share later |

**Three calculators**, each answering one question from its own inputs (R9's test), each proven
against its own filed line:

| Tool | Answers | Inputs | Proven against |
|---|---|---|---|
| **Operational Risk Margin** | What's the operational risk margin? | $CR_0$, then the premiums as a small table (direct, assumed, ceded, growth over 20%, and the intra-group pair) | Page 70.00 lines 50, 55 and 60 for every filer; Exam 6C Spring 2017 Q24 part a's operational risk |
| **Diversification Credit** | How much credit does the MCT give for diversification? | Insurance risk $I$, market and credit risk $A$ (or $M$ and $C$ separately), $R$ from the bank | Line 110 for every filer |
| **MCT Ratio** | What's the MCT ratio? | Test, capital available, the four margins and the credit (six scalars) | Lines 115–140 for every filer, and the exam question |

A **Workflows template**, *Capital check* (plan §4.4): Insurer Return (page 70.00) → Operational
Risk Margin; Insurer Return (page 10.00) → Diversification Credit; both → MCT Ratio, with the filed
ratio beside the recomputed one.

**Data.** Too big for the engine. Each insurer-quarter becomes one static file,
`ai/datasets/osfi/pc/<period>/<Id>.json` (plan §3.3), emitted into the build. By the Q2 2026 row
counts an insurer files about 1,600 cells a quarter across the three returns, so an estimated
40 KB a file, about 1.3 KB of it PC4. The engine stays synchronous through the Assumptions
Bank's pattern: the app **installs** a filing before the run (`installFiling(period, id, data)`,
fetched when the insurer is picked), and the MCP function installs it from its own deployment.
Nothing installed, and the run is an input error that says which filing to load. It's one new
contract in the engine, and every future filed-data tool uses it.

**Agent surface.** `run_tool` reaches every page. `find_insurer` and the dictionary resource
(`osfi://pc/<period>/<page>`) become necessary rather than nice, because an agent has to name a
page to read one.

**Cost.** Large. A loader contract in the engine and both front doors, a build step for about 130
files a quarter (one per insurer), four specs, and a workflow template. Operational Risk Margin's table of premiums
needs care to stay inside the template's shape.

**What it gives up.** A 6C candidate who wants the MCT ratio has to run a chain, or open the
template. The chain is truer to R9, but the guideline defines the ratio with the credit inside it,
so splitting it is a choice about teaching, not a requirement. And it delays MCT Ratio behind the
loader.

### Design C — Filed cells as a source

Treat a filed cell the way the Assumptions Bank treats a published figure: as a **source an input
can take**, with its own from chip. Insurer Return becomes the browser for those cells, and MCT
Ratio fills itself from a filing in one step.

**The mechanism.** A number field may take `{ "filed": "osfi-pc:2026Q2:27906:P100005001" }` in
place of a number, as it takes `{ "assumption": "<set>#<row>" }` today (`lib/tools/bank.ts`).
`normalizeInput` reads the value in, and the run records where it came from: the judgment's
`source`, a working step quoting OSFI's label, and the reference in the input hash, so a refiling
changes the hash rather than the result silently. Template v2 gains a fifth kind of from chip:

- **Level 1**: `▤ OSFI · Intact, Q2 2026 · line 50`
- **Level 2**, in place: OSFI's label in English and French, the address, "as filed, $000", the
  licence's attribution, and buttons **Open in Insurer Return** and **Unlink** (Unlink keeps the
  value and makes it Yours, as for a linked tool).

A filed cell is **not** a published figure in the bank's sense (it is a company's figure, not a
document's rule), so it never appears in the edit sheet's *Published* section. It has its own
section, *Filed*, shown only on a field that names the addresses it takes (`filed: ['PC4:10.00:50']`
on the spec, the way `bank:` names kinds).

**Insurer Return** answers *"What did this insurer file on this line?"*

| | |
|---|---|
| Inputs (3) | Insurer, Quarter, Line (a sheet of the lines that insurer filed, grouped by return and page, OSFI's labels) |
| Answer card | The value, as filed, $000 |
| Figure | The line across every quarter in the snapshot, the IFRS 17 periods only, so no break to draw yet |
| Grid | The page around the line, as Design B's, read-only |
| Produces | `FiledValue` |
| Gives to | Any tool whose field names that address |

**MCT Ratio** is Design A's six-input tool. On top of the template it gets one action under the
answer card: **Fill from a filing** (insurer and quarter), which sets the test from the numerator line
the filer files (25 for a branch) and fills the five amounts with `filed` references. The answer card then shows two
comparison lines under the bar: the bank's 150% target, and **"Filed 191.75% · Intact, Q2 2026"**,
which agrees to the cent or says how far off and why (the filed precision, from the extract's
rounding band). That one line is the whole R6 story, made visible on a real company: the reader
sees the guideline's arithmetic arrive at the regulator's number.

**Data.** As Design A to start (the PC4 slice installed, not bundled, so the connector's committed
engine doesn't go stale with every quarter), with the door open to Design B's per-filing files when
PC1 and PC2 lines are wanted.

**Agent surface.** The `filed` reference is the agent's natural move: *"recompute Intact's MCT
ratio for the last four quarters"* is four `run_tool` calls with references, no Insurer Return
call needed, and every input in the result names its address. `find_insurer` returns ids and the
reference prefix. The usage log's allowlist takes the institution id (plan §5).

**Cost.** Medium. A new source kind through `normalizeInput`, the hash, `ValueSource`,
`SourceTag.tsx`, the edit sheet and the connector's schema; two specs; the install step. It lands
in the same files template v2's steps 3–4 already open (the from chip, in-place disclosure), so it
is cheapest built alongside them.

**What it gives up.** Insurer Return is thinner as a tool (one line at a time), and a reader who
wants a whole page reads the grid rather than a result. A new source kind is one more thing every
surface that shows provenance has to handle.

---

## 4. The pages, side by side

What a phone shows for MCT Ratio filled from Intact, Q2 2026 (values from the filing):

| | A | B | C |
|---|---|---|---|
| Breadcrumb | Tools › Risk and capital › MCT Ratio | Tools › Workflows › Capital check › MCT Ratio | Tools › Risk and capital › MCT Ratio |
| Takes from | Insurer Return | Diversification Credit + 2 more | Insurer Return |
| Big figure | 191.75% | 191.75% | 191.75% |
| Under the bar | OSFI target 150% | OSFI target 150% | OSFI target 150% · **Filed 191.75%, Intact Q2 2026** |
| Input chips | ↳ Insurer Return ×5 | ↳ Insurer Return, ↳ Diversification Credit, ↳ Operational Risk Margin | ▤ OSFI · Intact, Q2 2026 · line 10, 50, 80, 100, 105 |
| Working | DC = 482,345.87 from $R$ = 50% (▤ OSFI MCT 2024 §8.1) | DC arrives Linked | DC = 482,345.87, and each line's OSFI label |

## 5. Comparison and recommendation

| | A — Summary page | B — Every page, chained | C — Filed cells as a source |
|---|---|---|---|
| Ships MCT Ratio | First | Last (behind the loader) | Second |
| Insurer Return reach | PC4 page 10.00 | Every page of PC1, PC2, PC4 | Every line, one at a time |
| R9 fit | Good; operational risk as an input | Strictest | Good; as A |
| Engine change | None | A loader contract | A source kind |
| Fits template v2 | Yes | Yes, plus a workflow | Uses it most: from chip, level 2, comparison line |
| Proofs in CI | Lines 115–140 | Lines 60, 110, 115–140 | Lines 115–140, plus the comparison line on every filed run |
| Agents | Two calls | A chain and a page name | One call with references |
| Next filed-data tool | Needs B or C first | Ready | Ready for lines; whole pages need B's files |

**Recommendation: C, built in two steps.** Step 1 is Design A's scope with C's mechanism: the PC4
slice installed, `filed` references, the from chip and the filed comparison line, MCT Ratio with
operational risk as an input. Step 2, when the first PC1 or PC2 tool is started, moves the data to
Design B's per-filing files behind the same reference, and adds Operational Risk Margin and
Diversification Credit as their own tools only if the 6C pages want them taught apart.

The reasons: the filed comparison line is the clearest form the plan's best idea takes (every
company's own ratio as a test the reader can watch pass); the reference is how agents and Cowork
tables will want to cite filed figures anyway (plan §6's "a table may carry figures only from a
hashed extract" is exactly a `filed` reference); and it rides on template v2 work that is already
next, rather than adding a parallel track.

## 6. Decisions for the maintainer

| # | Decision | Default until decided |
|---|---|---|
| D-OT1 | **Which design.** | C, in two steps (§5) |
| D-OT2 | **How much history in step 1.** All 14 IFRS 17 quarters (about 190 KB gzipped of page 10.00) or the last eight (about 105 KB) | Last eight; the rest with step 2's files |
| D-OT3 | **BAAT in the same tool.** One tool with a Test choice, or a separate *BAAT Ratio* | One tool: the formula is the same past the numerator, and 70 of 128 filers are branches |
| D-OT4 | **Guideline factors as inputs or as bank reads.** $R$ and 1.5 shown as input rows (the edit sheet's Published section), or read from the bank by id and shown only in the working | Bank reads, shown in the working with their from chip, so the six-input limit holds and nobody changes $R$ by accident |
| D-OT5 | **The card's default.** Exam 6C Spring 2017 Q24 (a 2016 MCT, the same formulas) or a real filing | The exam question: R2 keeps "Load an example" for cited worked examples, and a filing is the reader's pick |

## 7. Next steps, whichever design

1. Transcribe $R$ = 50%, the 30% cap and the §7.1 operational risk factors into the MCT bank set
   with `assumption_lint.py --against` (and `verify_check.py --sync`).
2. Add `osfi_extract.py export`: the snapshot's PC4 page 10.00 (and, for C, the address list each
   line can fill) to the engine's data file, with the manifest's hash.
3. A fixture script that writes `osfi-mct.json` from the extract (every filer, every quarter,
   lines 50–140), and the Exam 6C question check.
4. Write the specs onto the template (every tool page draws `ToolTemplate`), run `npm run tools:bundle`, extend
   `e2e/tools.spec.ts` with Insurer Return → MCT Ratio arriving Linked (or Filed).

Every reader-facing string here is a draft for the `app-copy` pass.

---

## 8. As built (2026-11-09)

Design C, step 1, with all fourteen IFRS 17 quarters (Q1 2023 – Q2 2026; D-OT2 answered "as many
as is reasonable in one go"). Q3 2026 is left out because insurers are still filing it.

**The data.** `scripts/osfi_extract.py export-summary --to 2026Q2` reads PC4 page 10.00 for every
quarter (from the page cache or the API) into `quiz/src/lib/tools/data/filings/osfi-pc4-summary.json`:
26 lines with OSFI's English and French labels (identical in all fourteen quarters; a relabelled
line stops the export), 149 insurers, each quarter's values with its slice hash and the hash of
the whole PC4 return. That return hash equals the committed manifest's (`test_osfi_extract.py`
holds them equal), so the file is tied to the audit trail. 407 KB.

**Installed, not carried.** The file is too big for the engine (`api/_tools/engine.js` is 112 KB
gzipped; the file is 145 KB), so `lib/tools/filings.ts` holds it installed, as `bank.ts` holds the
Assumptions Bank. The app fetches it as a hashed asset the first time a card needs it
(`lib/toolFilings.ts`, through `useToolCard`); the connector fetches `/ai/osfi-pc4-summary.json`
from its own deployment before a calculator runs (`api/_mcp/load.js`, emitted by the
`ai-connector-assets` plugin). Every unit test runs with it installed (`src/test/installFilings.ts`).

**Filed references.** A number field names the addresses it takes (`filed` on `NumberField`), and
takes `{ "filed": "osfi-pc:2026Q2:27906:P100005001" }`. `normalizeInput` reads it in; `runTool`
puts the filing on the judgment (`Judgment.filed`, with the licence's attribution), adds a working
step in OSFI's words, and puts the reference and its quarter's hash into the input hash. A spec's
`filedAnswer` names the line its answer recomputes: when every filed input comes from one filing,
the run reads that filing's figure into `values.filed_answer`, says in the working whether the two
agree within the filed precision, and warns when they don't. Inputs from two filings are warned
about. The template draws a filed value's source tag (`OSFI · Intact Insurance Company, Q2 2026 ·
line 50`) and the filed line under the answer (`Filed 191.75% · Intact Insurance Company, Q2
2026`, ticked when it agrees).

**The tools.** `data.insurer_return` (Insurer, Quarter, Line; the page as filed; the line's
fourteen-quarter history as its figure; hands the five lines on to MCT Ratio, a branch on its
net assets and the BAAT) and `capital.mct_ratio` (in a new practice area, *Risk and capital*:
Test, then capital available and the four margins; the diversification credit, the minimum and
the ratio). Both are on the tool template. The insurer list's sheet has a search box (any choice
with more than twelve options).

**Tested against.** Every one of the 1,909 MCT and BAAT ratios filed Q1 2023 – Q2 2026 recomputes
from its five filed inputs within the filed precision (`filings.test.ts`), including a branch that
filed negative net assets (−414.05%), which is why capital available takes a negative number. The
card's default is CAS Exam 6C Spring 2017 Q24 (150.00%), its figures quoted from the question by
the test. Both are listed in the card's *Tested against* (`FILED_CHECKS` in `lib/tools/checks.ts`).

**Departures from the text above.**

- **The guideline's figures ride in the engine** (`MCT_CORRELATION`, `MCT_DIVISOR`), not as bank
  reads (D-OT4's default). The connector doesn't install the Assumptions Bank yet (its Phase 2),
  so a bank read would leave `run_tool` without them. The bank set holds the same figures (the
  correlation row was added, transcribed with `assumption_lint.py --against` from the guideline's
  §8.1 and the set re-read on 2026-11-09, since the page's bytes had changed), and the test holds
  them equal.
- **Insurer Return reads one line at a time** with the page around it as its table, as design C
  said; it has no PC1 or PC2 lines yet (step 2).
- **No Operational Risk Margin or Diversification Credit tool**: MCT Ratio takes the operational
  margin as filed and computes the credit itself (step 2, if the 6C pages want them apart).
- **The dataset page** `Resources/Data/OSFI/Property and Casualty.md` was rewritten as the
  portal dataset's page, in the shape of the other Data Sources' pages.

**Next.** The weekly refresh job (`osfi-pc-data.md` §3.2) re-running `export-summary`; PC1 and PC2
lines (step 2, with per-filing files); `find_insurer` for agents.

