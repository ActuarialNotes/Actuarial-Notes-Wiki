# Assumptions Bank: plan

*Proposed 2026-11-08 (roadmap A9). Decisions settled the same day (§6). **Phases 0 and 1 built 2026-11-08** (§5.1, §5.2); Phases 2–4 are not.*

An **assumption** is one figure or one fact that a published document states, such as OSFI's 150%
supervisory target MCT ratio, GISA's accident-year-2025 ULAE factor of 1.1189, the AIRB's 6.0%
profit provision or the mortality improvement scale a CIA study names. The **Assumptions Bank**
holds them as data. Each one keeps its document, edition, effective date, locator, unit and
fact-check verdict, so a calculation, a workflow or an AI assistant can take it in and say where
it came from.

Half of this exists already, split four ways: the Tools' Data Sources, Cowork's `assumptions`
rows, Cowork's source tables, and the vault's `Resources/Benchmarks|Data` pages. Each half lacks
what another has. The proposal is to make the bank **one vault-backed layer under the Tools
engine**, which Study Mode, Cowork, Workflows and the MCP connector all read. Cowork stops being
where assumptions are authored and becomes one of the places that use them.

---

## 1. What exists today: a review of the tools and the connector

### 1.1 The MCP connector (`quiz/api/_mcp/`)

It has ten tools: `search`, `fetch`, `list_exams`, `get_exam`, `get_concept`,
`get_practice_questions`, `check_answer`, `list_tools`, `describe_tool` and `run_tool`. It also
has four resource templates (exam, concept, resource, question), four prompts (`study_session`,
`explain_concept`, `practice_quiz`, `study_plan`) and the uploadable Agent Skill. It is
read-only, public and keyless, and every result carries its Fact Check verdict.

For assumptions this matters in three ways:

- **`run_tool` is the only place a figure comes from**, and the skill tells the assistant to
  "never quote such a figure from memory". But the only published figures `run_tool` can supply
  are the three Data Sources' tables. Ask Claude for "FSRA's future BI trend" or "the MCT
  target" and the best it can do is `search` the resource page and read prose, if the prose
  states the number at all. For FSRA's trend benchmarks it does not (see §1.3).
- **Nothing of Cowork is exposed.** A7 (`docs/cowork-agent-tools.md`) already proposes
  `get_document` returning a document's `assumptions` and `table`. This plan is the data A7
  would serve, and it should land first so A7 doesn't expose the Cowork seed file as an API.
- **Provenance has a home already.** A tool's judgment carries `source: { dataset, edition,
  slice }` (`actuarial-tools.md` §4.11, R3). An assumption from the bank fits the same slot.

### 1.2 The Tools engine (`quiz/src/lib/tools/`)

There are 37 specs across seven practice areas. Three of them are **Data Sources** (Life Table,
Price Index, Yield Curve), and they get the hard part right:

- `scripts/dataset_extract.py` reads the publisher's own file, recording its sha256, read date
  and licence.
- The output is a dated snapshot in `lib/tools/data/datasets/*.json`, never fetched live, and
  part of the run's input hash (R4).
- Each dataset has a `Resources/Data/*.md` page whose verdict travels with every value.
- A value is chosen, never defaulted.

They are narrow, though. Each is a **time series or a lookup table** with a tool written for its
shape, and each is bundled into the engine. A single stated figure, like a capital ratio or a
profit provision, has no home there.

The seam where a figure enters a tool exists too: `lib/toolColumns.ts`'s `SCALAR_SOURCES` /
`COLUMN_SOURCES`, keyed `toolId:field`, which drive a field's **From** menu (§6.6 of the tools
plan). Today every entry there is another *tool*. A bank entry would be a new kind of entry.

### 1.3 Cowork (`quiz/src/data/coworkSources.ts`)

Cowork's documents carry `assumptions?: ResourceAssumption[]` (`label`, optional `value`,
`locator`). There are about 90 rows on 48 documents, about 40 of them with a value, and some
documents carry a `table` (FSRA's loss trend benchmarks). The workflow panel lists them on a
source step. Cowork got the rules right: a blank value with a locator is the honest form of "the
document supplies this row", and a table's figures stay blank until someone reads them.

As an assumptions bank, though, it falls short in six ways:

| Gap | Why it matters |
|---|---|
| **Values are free text** (`'6.0% of premium'`, `'+0.24% to +0.35% … (take-up 55%–100%)'`) | No tool can take one. There is no unit, number or range. |
| **Authored in TypeScript seed data**, not the vault | No `verification:` block and no `.verify/` log. Editing a figure stales nothing (P4 doesn't reach it), and no Fact Check verdict travels with it. |
| **No edition or effective date per figure** | The document's `published` is the only date, and an assumption is used *as of* a date. |
| **Mixed figures and facts** (`'150%'` next to `'MCT (OSFI guideline)'`) | A tool needs the first. A brief or an assistant needs both, typed apart. |
| **Behind Cowork's gate** (one approved account) | Study Mode and the connector never see them. |
| **Tables ship blank** (FSRA) | This is correct under the rule, but nothing yet exists to fill them by reading the document. |

### 1.4 The vault's own pages

`Resources/Benchmarks/` and `Resources/Data/` hold resource pages for the documents themselves
(FSRA's benchmarks, GISA's exhibit, OSFI's returns). They carry the fact-check machinery and the
sources, but their figures, where they have any, are prose or markdown tables that nothing
parses.

### 1.5 The pattern

| | Mechanical, hashed source | Fact-checked | Typed figure | Usable by a tool | Over MCP | Open to all |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Tools Data Sources | ✓ | ✓ (page) | ✓ | ✓ | ✓ | ✓ |
| Cowork `assumptions` | — | — | — | — | — | — |
| Cowork `table` | — | — | ✓ shape, blank figures | via a workflow | — | — |
| Resource pages | — | ✓ | — | — | as prose | ✓ |

The bank is the first row's discipline applied to the second row's content.

---

## 2. What an entry is

An **assumption set** is the unit: one table, or one group of figures under one heading of one
document. Its **rows** are the individual assumptions.

Each row is either:

- a **figure**: a number, range or vector with a unit (`%`, `factor`, `CAD`, `years`, `rate`),
  machine-usable; or
- a **fact**: a stated basis or category (the capital test in force, the mortality table named,
  the filing route), used by a brief, an assistant or a page, never by arithmetic.

Every row carries:

- **its locator**: section, table and page, as Cowork already records it;
- **the set's edition and effective dates** (`effective`, and `superseded_by` once a newer
  edition exists);
- **a kind**: the vocabulary that matches it to a tool field (§4.2).

A row with no value is allowed and stays visibly blank, as in Cowork today. That shows the
document supplies the row even though the figure hasn't been read off it yet.

---

## 3. Ground rules

These are inherited from the rules already in force, not new ones.

1. **Nothing is invented.** A figure is *extracted* by a script from the publisher's bytes (with
   their sha256) or *transcribed* by hand with its locator. It is never estimated, interpolated,
   "typical" or recalled. A model may *locate* a figure (which page, which table) but never retype
   it. That is the PDF pipeline's rule (`docs/pdf-question-pipeline.md`).
2. **The fact check travels.** An assumption set is a vault content file with its own
   `verification:` block. Its verdict rides with every figure into a tool's trace, a workflow
   step and an MCP result. It reaches `verified` only against the cited document (P1), and any
   edit stales it (P4).
3. **An edition, never live.** A run reproduces, so the set's id and edition are part of the
   input hash. A new edition is a new file (or a new edition block) added by PR, and the old one
   stays addressable.
4. **Chosen, never a default.** A bank figure enters a tool only when the reader or the agent
   picks it. It arrives as a judgment carrying its provenance, never `default: true`.
5. **Licence named.** A figure is a fact, but a whole table can be someone's work. The bank
   carries what a document states at the grain a citation would quote it: a row, not a
   republished study. A subscription study (industry trend reviews sold by subscription, MSA)
   gets a set of **blank rows with locators** and nothing more. D-AB3 confirms the line.
6. **No second reader.** A set renders as a vault page in `ConceptPopup` through `WikiArticle`,
   the way Cowork's documents do.
7. **Study material, not advice.** A regulator's benchmark is what the regulator said, as of
   its date. The page and every MCP result say so, as the connector already does.

---

## 4. Design

### 4.1 Where it lives: `Assumptions/` in the vault

There is one markdown file per set, `Assumptions/<Set name>.md`. It has resource-style
frontmatter, a lead sentence and a markdown table of rows, ending in `## Sources`:

```markdown
---
Title: "MCT capital ratios and target level"
Source: "[[OSFI MCT]]"
Publisher: "Office of the Superintendent of Financial Institutions"
Edition: "Guideline A, 2024"
Effective: "2024-01-01"
Jurisdiction: "CA"
Practice: "pc"
Extraction: "transcribed"
Document: "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
Source sha256: "30514b4d22846ffb8a0fb2ec2ccac87a360332dce43657bc321accbac55ddf59"
Read: "2026-11-08"
verification:
  status: unverified
  …
---

The capital ratios OSFI's Minimum Capital Test guideline sets for a federally regulated property and casualty insurer, and the confidence level its capital requirements are set at. Each insurer's own internal target is set by the insurer, under Guideline A-4, so the guideline gives it no figure.

| Assumption | Kind | Value | Unit | Locator |
|---|---|---|---|---|
| Capital test | fact | Minimum Capital Test | | Title |
| Minimum MCT ratio | capital-ratio | 100 | % | 1.2.1 MCT supervisory capital ratio for federally regulated insurers |
| Supervisory target MCT ratio | capital-ratio | 150 | % | 1.2.1 MCT supervisory capital ratio for federally regulated insurers |
| Internal target capital ratio | capital-ratio | | % | 1.2.1, set by each insurer per Guideline A-4 |
| Target confidence level (CTE, one-year horizon) | confidence-level | 99 | % | 1.1.1 Minimum and target capital requirements under the MCT |
| Divisor from target-level to minimum capital required | capital-factor | 1.5 | factor | 1.1.1 Minimum and target capital requirements under the MCT |

## Sources
- …
```

*(The real file, `Assumptions/OSFI MCT Capital Ratios (2024).md`, with its fact-check block and
Sources abridged.)*

**Explaining each figure (tool template v2, `docs/tool-template-v2.md` §4).** A tool explains a
published figure in place: where it applies, on what basis and what it is. The table may carry
three more columns after `Locator`, and every set written since carries them (D-TT1, settled as
columns):

| Column | Holds | Example |
|---|---|---|
| `Basis` | What kind of figure it is: `cap`, `selected`, `benchmark`, `observed`, `minimum` or `target` (`bases` in `scripts/assumption_vocab.json`) | `cap` |
| `Meaning` | One sentence saying what the figure is, in the document's words where it has them | "The maximum profit provision permitted for use by insurers…" |
| `Fits` | Only for a figure that matches a tool's **answer** rather than an input: `<tool id>#<tile>` | `ratemaking.expense_ratios#total` |

A blank `Meaning` falls back to the set's lead paragraph; a blank `Basis` says nothing. Three
optional frontmatter keys go with them: `Short name` after `Publisher` (the tool's chip, "AIRB"),
`Line` after `Jurisdiction` (the line of business, "Private passenger vehicles") and `Page offset`
after `Read` (the PDF's page number less the page number the document prints, so a locator's
"p. 7" opens the PDF reader at the right page — the AIRB report's p. 7 is its ninth page). These
words are transcribed like the figures: `--against` checks the figures, and a reviewer checks the
words against the locator.

This keeps assumptions separate from the resource page itself because P4 binds a verdict to a
file's bytes. Corrected figures belong on a page of their own, so fixing one figure doesn't
stale the resource page, and re-describing the resource page doesn't stale the figures. The
alternative was an `## Assumptions` section on the resource page. It is simpler, but the two
verdicts would become one. D-AB1 settled it as the folder.

**Big tables stay Data Sources.** Life tables, CPI and yield curves remain
`lib/tools/data/datasets/*.json` with their own tools. The bank *lists* them (a set whose
frontmatter names `Dataset: "nchs-us-life-tables"`), so one search finds every published figure
the app knows, but it doesn't migrate them.

### 4.2 Kinds: what matches a figure to a tool

`Kind` is a closed vocabulary in `lib/assumptionKinds.ts`, held to the vault by a test:

| Kind | Unit | Takes it |
|---|---|---|
| `trend` | % per year | Trend Factor, Two-Step Trend (past, future), Combined Trend |
| `loss-ratio` | % | Expected Claims (ELR), Permissible Loss Ratio |
| `expense-ratio`, `fixed-expense`, `variable-expense` | % | Loss Ratio Method, Pure Premium Method, Permissible Loss Ratio |
| `profit-provision` | % | Permissible Loss Ratio, Indicated Rate |
| `development-factor`, `ulae-factor`, `tail-factor` | factor | Development to Ultimate (column), the Phase 2 Tail Factor |
| `reform-factor` | factor | Loss Ratio Method (an adjustment), via a workflow step |
| `discount-rate` | % | Present Value, Annuity, Duration & Convexity |
| `capital-ratio`, `capital-factor` | %, factor | MCT Ratio (§4.8 of the tools plan) once built |
| `mortality-ratio`, `improvement-scale` | %, fact | the life tools (§4.9) once built |
| `cat-load` | CAD, % | none yet. Briefs and assistants |
| `fact` | — | never a tool. Briefs, pages and the connector |

`lib/toolColumns.ts` gains `BANK_SOURCES: Record<'toolId:field', AssumptionKind[]>`, and a
field's **From** menu lists the bank's rows of those kinds. They are filtered to the field's
unit, the reader's jurisdiction when set, and an effective date on or before the run's date.

### 4.3 The engine: one tool and one resolver

- **`data.assumption`, "Assumption"**: a Data Source tool that answers *what does this document
  state for this?* Its input is a set and row. Its output is the value, unit, edition, locator
  and verdict, plus `values.value` for the next tool. Because it is an ordinary tool it gets the
  card, the trace, R4's hash, `run_tool`, Send to… and a workflow step for free.
- **A resolver, not a bundle.** The bank changes with every vault edit, and the engine is a
  committed bundle (`quiz/api/_tools/engine.js`, held fresh by `bundle.test.ts`). The bank is
  therefore *injected* (`runTool(spec, input, { assumptions })`), as `evaluateWorkflow(wf,
  resolve)` already takes its sub-workflows. In the app the build's `virtual:assumption-bank`
  supplies it, and in the connector the knowledge-base export does.
- **Provenance in the judgment:** `source: { assumption: '<set id>#<row>', edition, locator,
  verdict }`. The card prints the verdict pill beside the field, and the trace and an MCP
  result print it in words. An unverified figure carries a warning, never a refusal (D-AB4).

### 4.4 The pipeline

| Script | Does | Like |
|---|---|---|
| `scripts/assumption_extract.py` | Reads a table off a document's own bytes (a PDF's text layer, an HTML table, an `.xlsx` sheet) into a set's rows, with the sha256. No model. | `tool_fixtures.py`, `dataset_extract.py` |
| `scripts/assumption_lint.py` (CI, `content-validation.yml`) | The shape: frontmatter keys and order, a `Source` that resolves to a resource page, kinds in the vocabulary, values that parse in their unit, an `Effective` date, `Extraction: extracted` only with a sha256, and no row repeated across live editions | `resource_lint.py` |
| `verify_*` (unchanged) | A set is a content file, so VERIFY packets it with its source document (`verification-plan.md`: by source, not folder) | — |

Collectors: `vite.config.ts` gets `virtual:assumption-bank` (parsed rows, small) and
`readKnowledgeBaseSources` in `lib/knowledgeBase.ts` gets `Assumptions/`. The wiki bundle
indexes the pages so they open in the popup.

### 4.5 The surfaces

**Study Mode and Tools** (open to everyone, since `TOOLS_ENABLED` is on):

- **An Assumptions shelf on `/tools`**, beside Data Sources in the practice-area list (or
  `/tools/assumptions`; D-AB2). It has the Tools search bar and the Resources page's filter row
  (`resourceFilters.ts`'s rule: OR within a filter, AND across): Publisher, Kind, Jurisdiction,
  Effective year, Fact check. A row card shows the label, value, unit, edition and verdict, and
  tapping it opens the set in `ConceptPopup`.
- **Field menus on the tool cards.** Under **From**, a *From the bank* group lists the matching
  rows (§4.2). Picking one fills the field as a judgment with its source.
- **The resource page** gains an *Assumptions* card listing its sets, so a reader of the OSFI MCT
  page sees what it supplies.
- **A concept page** may cite one later (`%%assumption <id>%%`, rendered as the row), out of
  scope for now.

**Cowork and Workflows:**

- `SourceResource.assumptions` and `.table` become **derived** from the bank by
  `Source: [[resource]]`, the same way `lib/coworkVault.ts` already derives documents from
  resource pages. The authored rows in `coworkSources.ts` are migrated to `Assumptions/` files
  and deleted from the seed. `coworkContent.test.ts`'s guarantees (every table on a real, linked
  document; blanks stay blank) move to the bank's test.
- A workflow's source step brings the set's rows as data (`stepTable`), now **with** whatever
  figures have been read, each mapped onto a tool input as a CSV column is.
- *Run in Claude*'s brief (`lib/workflowBrief.ts`) names each figure's set, edition and verdict.

### 4.6 The connector

| Tool | Arguments | Returns |
|---|---|---|
| `search_assumptions` | `query`, optional `kind`, `publisher`, `jurisdiction`, `as_of` | Matching rows: label, value, unit, set, edition, effective, locator, verdict, `app_url` |
| `get_assumption` | `id` (a set, or `set#row`) | The whole set, its source document's page, its fact check and editions |

There are two more changes:

- **`run_tool` accepts a reference.** Any judgment field may be `{ "assumption": "<set>#<row>" }`.
  The server resolves it, checks the kind against the field, and stamps provenance in the
  envelope. The assistant never has to copy a number between calls, so it can't mistype one.
- **The skill** gains one line: *a published figure comes from `search_assumptions` or a Data
  Source, never from memory or a web page; if the bank has the row blank, say so and give the
  locator.*

The contract (`docs/ai-connector.md`) still holds: read-only, keyless, verdict on every result.
Two things have to happen with this change. `KNOWLEDGE_BASE_VERSION` and `SUPPORTED_KB_VERSION`
move together, and the two new tools' arguments go on the usage-log allowlist (`usage.js`).

A7's `get_document` then returns its `assumptions` and `table` from here.

---

## 5. Phases

**Phase 0: the bank exists (one PR). Built; see §5.1.**
- `Assumptions/` with the frontmatter standard, `assumption_lint.py` and its tests, and
  `lib/assumptionBank.ts` (parse, index, lookup by kind and date) with tests.
- `virtual:assumption-bank`, plus the collectors in the wiki bundle and `knowledgeBase.ts`.
- **Four sets, each re-read off its document** (not copied from the seed): OSFI MCT target and
  minimum, GISA AUTO1005-ON ULAE factors, AIRB 2026 expense and profit benchmarks, and the AMF
  MCT targets. If FSRA's page can be read, FSRA's 2025 trend benchmarks become the fifth, and the
  first table to stop being blank.
- Cowork reads those four from the bank, and their seed rows are deleted.

### 5.1 Phase 0, as built (2026-11-08)

- **`Assumptions/`**, three sets, each re-read off its publisher's copy on 2026-11-08 with the
  bytes' sha256 recorded:
  - `OSFI MCT Capital Ratios (2024)`: the 100% minimum and 150% supervisory target (s. 1.2.1),
    CTE 99% and the 1.5 divisor (s. 1.1.1), and the insurer's own internal target as a blank row.
  - `GISA Ontario PPA ULAE Factors (2025)`: the ULAE factors for accident years 2021–2025
    (p. 12). The seed held only 2025's.
  - `AIRB Expense and Profit Benchmarks (2026)`: acquisition 20.0%, general and operating 7.8%,
    total 27.8%, ULAE 1.094 and the 6.0% profit provision (p. 7), with the trend and development
    benchmarks as blank rows.
- **The vocabulary** is `scripts/assumption_vocab.json`, the kinds and the units each may be
  written in.
- **The gate** is `scripts/assumption_lint.py`, in CI under `content-validation.yml`. It has one
  mode that isn't a shape check: `--against <file>` hashes the file that was read against
  `Source sha256` and checks that every figure, and every fact's words, is printed in its text.
  All three sets pass it. It is how a model can transcribe a set without retyping a figure from
  memory. If a figure is missing from the text, the set fails, and a figure that only a page image
  carries goes to VERIFY instead. Tests: `scripts/test_assumption_lint.py`.
- **Fact Check:** `Assumptions` is one of VERIFY's content roots (`verify_lib.CONTENT_DIRS`),
  so each set carries a `verification:` block and a `.verify/` log.
- **The app:**
  - `lib/assumptionBank.ts` has the parser (`parseAssumptionSet`, which fails the build on a
    figure it would misread), `formatAssumptionValue`, `inForce`, `figuresOfKind` (the lookup
    Phase 1's field menus will call), `assumptionById` and `setsForResource`.
  - `virtual:assumption-bank` bundles the parsed sets. Only Cowork's chunk imports it so far.
  - Tests: `lib/assumptionBank.test.ts`, which also holds the vocabulary equal to the lint's.
- **Cowork derives:** `withBankAssumptions` (`lib/coworkSources.ts`) gives a document the rows of
  its current sets, each with its `bankId`. The seed rows of the three documents are deleted, and
  a test fails any authored entry that keeps rows for a document the bank holds.

What Phase 0 left for later, and why:

- **The AMF capital guideline and FSRA's trend benchmarks** weren't re-read. Both sites answer
  automated requests with a Cloudflare challenge, and the Internet Archive is unreachable from
  the build container. The AMF rows stay in the Cowork seed until the PDF is supplied as a file.
  FSRA's table stays blank until then.
- **The knowledge-base export** moves to Phase 2. The connector bumps the export version in the
  same change as the tools that read it (`docs/ai-connector.md`), and data no tool reads only
  makes a 10 MB file bigger.
- **A set's page in the concept popup** moves to Phase 1, with the shelf that links to it.
  (Phase 1 drew a set as a card on the shelf and on its resource page instead; see §5.2.)

### 5.2 Phase 1, as built (2026-11-08)

- **The engine takes the bank as installed data** (`lib/tools/bank.ts`), never as bundled
  data. `installAssumptionBank(figures)` is called by the app at load (`lib/toolBank.ts`,
  imported by `ToolCard`, so every card has it) and will be called by the connector from its
  export in Phase 2. A figure with an open critical finding is never installed.
- **A field names the kinds it takes.** `NumberField.bank` (`['profit-provision']`) is set on
  the expense, profit, trend, ELR and discount-rate fields of Permissible Loss Ratio, Loss Ratio
  Method, Pure Premium Method, Trend Factor, Two-Step Trend, Expected Claims, Present Value,
  Annuity, Duration & Convexity and Redington Immunization. One fact drives the card's menu
  (`figuresFor`), the shelf's links (`figureUses`) and the schema an agent reads
  (`describeTool`: `x-assumption-kinds`, plus a sentence on the field).
- **A run takes a figure by reference.** A bank field's input may be
  `{ "assumption": "<set>#<row>" }`. `normalizeInput` reads it in, after checking the kind, the
  unit and the field's bounds. The run then records it in four places: the judgment's `source`
  (document, edition, locator, verdict), a first step in the working, the input hash (as
  `id@edition`), and a warning while the figure is unverified (D-AB4, written by
  `uncheckedWarning`). A share link, a stored draft and a workflow step all carry the reference,
  not the number. Typing over the field replaces it with the reader's own number, and the source
  goes with it.
- **On the card:** the field's **From…** menu lists *From the Assumptions Bank* (each figure,
  its value, its publisher and edition) beside the tools that compute the field. A figure in use
  shows one line under its field: publisher, edition, locator, *Not fact checked* or *Fact
  checked*, and **Read the source**, which opens the resource page in the concept popup. The
  card leaves the run's unchecked-figure warning out of its own warning list, since the line
  under the field says it.
- **The shelf** is `/tools/assumptions` (`components/assumptions/AssumptionsShelf.tsx`), a row
  under Data Sources in the catalogue (D-AB2). It shows every current set, newest first,
  filtered by kind (`?kind=`). Each set is an `AssumptionSetCard`: its Fact Check badge, its
  rows with their locators, **Read the source** and the publisher's copy. Each figure has a
  *Use in a tool* toggle, whose links open a tool with the figure already in it. *(Template v2,
  2026-11-09, replaced this shape: no exam logo on the banner, "N figures still to enter" in place
  of "N of M figures read", a kind filter that shows only that kind's rows with the rest of the
  document folded into one line and a blank row never first (`shelfRows` in `lib/toolBank.ts`),
  and each figure naming the tools that take it, "to **Permissible Loss Ratio**", where the count
  was — see `docs/tool-template-v2.md` §3.8.)*
- **The resource page** (and its page in the popup) shows the sets read from it under the
  citation block (`ResourceAssumptionsCard`).
- **Tests:** `lib/tools/bank.test.ts` (the engine), `lib/toolBank.test.ts` (the vault's bank
  installed, `figureUses`), and three flows in `e2e/tools.spec.ts`: the shelf into Permissible
  Loss Ratio with its source in the working, the **From…** menu, and the resource page's card.

Moved to Phase 2: **the `data.assumption` tool.** The engine holds every registered tool to
running on its default input and drawing a figure, and the connector's bundled engine runs
with no bank installed. A tool whose only data is the vault can't meet that until the
connector installs the bank too, so it lands with the connector.

### 5.3 The rest

**Phase 2: over MCP.** The connector installs the bank from its export, which makes
`run_tool`'s references work there, and adds `data.assumption`.
- `search_assumptions`, `get_assumption` and `run_tool` references, plus the export bump, the
  skill line and `mcp*.test.ts`.
- A7's `get_document` reads from the bank.

**Phase 3: the rest of Cowork's rows, and extraction.**
- Migrate the remaining ~85 Cowork rows and delete `ResourceAssumption` from the seed.
- `assumption_extract.py` for the tabular sources (GISA exhibits, AIRB tables, OSFI returns).
- A scheduled job, like the podcast's nightly, that notices a new edition and **opens a PR**,
  never pushes.

**Phase 4: breadth.**
- By practice area: CIA educational notes' prescribed figures, the SOA's mortality improvement
  scales (facts, plus a Data Source if the terms allow), OSFI's capital factors (the planned
  Capital Factors tool becomes a view of the bank), and the other provincial auto regulators'
  benchmarks.
- Each set goes through VERIFY by source packet.

---

## 6. Decisions (settled by the maintainer, 2026-11-08)

| ID | Question | Decision |
|---|---|---|
| D-AB1 | A folder of its own, or a section on each resource page? | **`Assumptions/`**, one structured markdown file per set (§4.1) |
| D-AB2 | Where the shelf lives | **Under Tools**, beside Data Sources |
| D-AB3 | Which documents may have figures transcribed, and which only blank rows with locators? | **Case by case.** A set's optional `Licence` key records the terms when they bear on it. The first three (OSFI, GISA's free high-level exhibit, the AIRB) are public regulators' and a statistical agency's free publications |
| D-AB4 | May an unverified figure be offered to a tool? | **Yes, with a warning** (and its verdict pill). A critical finding withholds it |
| D-AB5 | Open to everyone, or Pro? | **Open to everyone.** The bank makes public data easier to reach. It isn't a reason to gate it. Cowork's own gate (A4, D13) is unchanged |

---

## 7. Risks

- **A stale edition used as current.** Mitigation: an effective date on every set,
  `superseded_by`, `as_of` filtering in every lookup, and the edition printed beside every
  figure.
- **A misread figure.** Mitigation: extraction by script wherever the document allows, VERIFY
  against the source packet, and the verdict on every surface. A reader's *Report* on a set feeds
  `content_reports` like any page.
- **Scope creep into a second Research tab.** The bank holds *stated figures and facts with
  locators*. It is not a news corpus or a document store, and the flag-gated Research timeline
  stays where it is.
- **Cowork and Study Mode drifting.** Mitigation: one source of truth, derived into Cowork, never
  authored there again. A test fails on any `assumptions:` left in `coworkSources.ts` once
  Phase 3 lands.
