# OSFI P&C returns: a strategy for Tools, the connector and Cowork

_Written 2026-11-08. A proposal (roadmap §3.4, **A9**), not a build spec. Nothing here is built._

The maintainer downloaded the publicly available OSFI P&C filings from OSFI's Beyond 20/20 server
(`Resources/Data/Historical OSFI Data.md`): the **2025 Q3** data files for Canadian companies and
foreign branches, the Canadian **MCT** file, the company list and the blank **PC1** return. Beyond
20/20 was retired on 2026-06-10, so these files may be the only copy the project will ever get of
this release. This document covers what is in them, the rules any use of them has to keep, and one
plan for using them across the three product lines that can carry real data: **Actuarial Tools**
(`docs/actuarial-tools.md`), the **AI connector** (`docs/ai-connector.md`) and **Cowork**
(`docs/cowork.md`, `docs/workflows.md`), plus the Exam 6C tie-in that is already waiting for it.

The plan in one paragraph: **extract the files once, mechanically, into a dated and hashed
snapshot. Label every cell from OSFI's own blank returns. Serve it as one Data Sources tool,
*Insurer Return*, that the calculators chain from. Prove the calculators against the filed figures
(every company's filed MCT ratio and every IFRS 17 roll-forward identity becomes a test). Hand the
same tool to agents through `run_tool`. In Cowork, make each insurer's filing a document whose table
arrives already filled in, because a script read it off the filing.**

---

## 1. What the files are

### 1.1 The inventory

| File | What it is | Rows | sha256 (first 16) |
|---|---|---|---|
| `CanadianPC_2025_Q3.txt` | PC1 + PC2 data points, Canadian companies | 667,588 | `4d50307592a7de86` |
| `ForeignPC_2025_Q3.txt` | PC1 + PC2 data points, foreign branches | 687,578 | `e56640b3a372cde5` |
| `CanadianPC_MCT_2025_Q3.txt` | PC4 (MCT) data points, Canadian companies | 14,338 | `65b831e5026e2d90` |
| `2025_PC_Companies.csv` | Company code → name (141 entities) | 141 | `80b9b8a08721b27a` |
| `PC1-PC_2025.xlsx` | The blank PC1 return: page, line and column labels | 16 sheets | `2a83f64b176e7d1e` |

The raw files total about 37 MB. They stay **out of the repo** (see §2.4). The full hashes go into
the extract's manifest.

### 1.2 The format

Each data file starts with a period line (`Q3/25`, after a UTF-8 BOM). Every line after it is
`company ⇥ return ⇥ address ⇥ value`, with CRLF line endings and values in **$ thousands**, as filed.
The address is OSFI's *data point address*, **page + line + column**:

```
A480  PC1  20108901   22149037.0000   → page 20.10 (Assets), line 89 (TOTAL ASSETS), column 01 (current period, total)
A480  PC4  100014001       192.3900   → page 10.00, line 140, column 01 → the filed MCT ratio, %
```

The page is always four digits. The line is two or three digits (PC1 uses `01`–`89` on 20.10 and
`030`–`799` elsewhere), so an address is 8 or 9 digits, and splitting it needs the page's line
width. That comes from the blank return, not from a guess.

### 1.3 What each return holds

- **PC1, the Core Return** (`Resources/Books/OSFI Core Return.md`): the IFRS 17 consolidated
  statements. 20.10 assets, 20.11 liabilities and equity, 20.12–20.18 the insurance and
  reinsurance liability roll-forwards (by measurement component, and by remaining coverage and
  incurred claims), 20.22 profit or loss, 20.41, 20.42 OCI, 20.45 reserves and the head office
  account (foreign), 20.54 changes in equity. **Labelled**: the uploaded workbook is this return's
  blank form.
- **PC2, the Quarterly Return** (`Resources/Books/OSFI Quarterly Return.md`): the supplementary
  exhibits. 40.08 investments, 50.32 and 50.40 intra-group, 60.25 insurance service result, 60.80
  onerous contracts, 70.50 and 70.60 registered and unregistered reinsurance, 80.15–80.35
  commissions, expenses and other income, the 92.xx non-consolidated statements, and the
  **provincial and territorial exhibits**: 67.40–67.70 and 94.10–94.40 (insurance revenue, service
  expenses, net reinsurance expense and service result) and 93.30 (premiums written). These are
  about 50 lines by 15 columns per company, which fits classes of insurance against provinces and
  territories. **Not labelled yet**: the vault page names the pages, but the line and column
  labels need OSFI's blank PC2 form.
- **PC4, the MCT return** (`Resources/Books/OSFI MCT.md`): capital available, minimum capital
  required by risk (pages 10.00–70.00) and the ratio. **Not labelled yet** either: it needs the
  blank PC4 form. Foreign branches file the BAAT, not the MCT, and no BAAT file was uploaded.

### 1.4 What a first pass found (2025 Q3)

These are checks, not results to publish. They're the reason §2 has the rules it has.

- **66 Canadian companies and 69 foreign branches** filed PC1. The company list also names
  entities with no PC1 rows: the mortgage insurers (CMHC `A087`, Canada Guaranty `A018`, Sagen
  `A387`), which file elsewhere. The extract has to say "not in this return", not show zeros.
- **OSFI ships a `TOTAL` pseudo-company.** For foreign branches its total assets reconcile with
  the sum of the branches ($62.9 bn). **For Canadian companies they don't**: the companies sum to
  $140.1 bn against `TOTAL`'s $129.8 bn. The gap is probably consolidation (a subsidiary counted
  inside its parent and again on its own), but that has to be confirmed. `TOTAL` also sums the
  MCT ratio column (44,115 %). So `TOTAL` is never used for a ratio, and never used for a
  total until the gap is explained.
- **The MCT ratio is filed**, so a tool can be checked against it. Across the 66 companies the
  median is about 311 %, the lowest is 192 %, and a handful of very small companies file ratios in
  the thousands. A median is a judgment about which companies count; a ratio of 23,403 % is what
  was filed, not an error.
- **89 % of the cells are zero** (236k of 1.35M are non-zero). Only the non-zero cells need
  storing, so a company's whole filing is tens of kilobytes.
- **One period only, and it is interim.** Per OSFI, Q1–Q3 are a subset of the annual (Q4) return.
  Anything that needs a year-end schedule or a history (claims development, a trend in a ratio)
  isn't possible from this snapshot alone (§8, D-OSFI-4).
- **IFRS 17 basis.** The returns changed shape on 2023-01-01. 2025 Q3 lines up with every IFRS 17
  page in the vault. A history reaching back past 2023 would need a documented mapping, never a
  silent join.

---

## 2. The rules any use of it has to keep

They're the vault's existing rules, applied to filed data. None of them is new.

1. **Extracted mechanically, never retyped** (`actuarial-tools.md` §4.11). One script reads the
   files. No model and no person types a figure. Each figure keeps its company code, return,
   address and period.
2. **Labelled only from OSFI's own forms.** A cell's name comes from the blank return
   (`PC1-PC_2025.xlsx`, and the PC2/PC4 forms once in hand), never inferred from the numbers. A
   cell whose label isn't in a form stays addressable by its address and has **no name** rather
   than a plausible one.
3. **As filed, and said so.** Every surface that shows a figure says *"as filed with OSFI, 2025 Q3,
   $000"* and names the company and the address. The project corrects nothing. A figure that looks
   wrong is reported, not fixed.
4. **Derived ≠ filed.** A ratio the project computes (a combined ratio, a market share, a peer
   median) is a **tool's output**, with its formula's source cited (IBC's IFRS 17 metrics paper
   for the KPIs, the MCT guideline for capital), its inputs' addresses listed, and its judgments
   explicit (which companies are peers, gross or net, consolidated or not). It is never presented
   as an OSFI figure and never written back into the dataset.
5. **A dated snapshot.** The data is the 2025 Q3 release read from the files with these hashes. A
   run that uses it reproduces exactly (R4). A later period is a new snapshot beside it, never an
   overwrite.
6. **Licence first** (D-OSFI-1). Nothing of the data ships in the bundle or the export until the
   terms that applied to the Beyond 20/20 download are on the dataset's page. Until then the
   extract runs locally and in tests over a fixture of the maintainer's own copy.
7. **No league tables.** Ranking named insurers ("weakest capital in Canada") is a judgment about
   real companies on interim, as-filed data. Tools compare a company with a peer set **the reader
   picks**. Nothing ranks the market on its own (D-OSFI-3).

---

## 3. The pipeline

### 3.1 `scripts/osfi_extract.py`

It has the same shape as `dataset_extract.py`: standard library only, raw files in a cache
outside the repo (`--cache`, like `verify_sources.py`).

1. **Read** each data file (BOM, CRLF, period line), checking every row's shape and failing on
   anything else.
2. **Read the forms.** For each sheet of a blank return, record the page, each line's code and
   label (with its indent level, which carries the hierarchy, *Insurance Contract Liabilities ›
   Excluding Segregated Funds*) and each column's code and header path (*Current Period › Total*,
   *Liabilities for remaining coverage › Loss Component*). Then the line width per page, which
   is what splits an address.
3. **Join** values to labels. Report every address with no label (`unlabelled.json`, expected to
   be all of PC2 and PC4 until their forms arrive) and every labelled cell nobody filed.
4. **Check** the identities the forms state. Each total equals the sum of its components, every
   roll-forward runs opening + changes + cash flows = ending, and 20.10's total assets equals
   20.11's total liabilities and equity. Then reconcile `TOTAL` against the company sums. Each
   failure is a *finding about the filing*, written to `checks.json`, never a correction.
5. **Write** the snapshot:
   - `osfi/pc-2025q3/manifest.json`: the period, every source file's name, sha256, size and the
     date read, the licence text (D-OSFI-1), the row counts and the check summary.
   - `osfi/pc-2025q3/dictionary.json`: the forms, page → lines → columns, with labels.
   - `osfi/pc-2025q3/companies.json`: code, name as OSFI lists it, kind (Canadian company /
     foreign branch), the returns it filed.
   - `osfi/pc-2025q3/<code>.json`: one company, non-zero cells only, `{ address: value }`.
   - `osfi/pc-2025q3/industry/<page>.json`: one page for every company, for the peer and market
     tools, so they don't load 135 files.

Tests go in `scripts/test_osfi_extract.py` and run over a small committed fixture: a few companies'
rows cut from the real files, with the real hashes recorded.

### 3.2 Where the snapshot lives

At tens of kilobytes per company and a few MB in all, it's over the limit for tables the engine
carries in its bundle (`actuarial-tools.md` §4.11: about 100 KB in all). It's the case that section
already names: **fetched static files**, `ai/datasets/osfi/pc-2025q3/…`, emitted into the build the
way `ai/knowledge-base.json` is. The Tools page fetches a company's file when it's picked. The MCP
function reads the same files from its own deployment (as it reads the knowledge base), so the app
and the agent can't disagree. If the licence forbids redistribution, the fallback is the
reader's own copy: the tool accepts the OSFI files dropped in, parsed in the browser by the same
code, and nothing leaves the device.

### 3.3 A page in the vault

`Resources/Data/OSFI/Property and Casualty.md` already exists as a stub. It becomes the dataset's
resource page (`docs/resource-pages.md`): what the release is, the period, the files and their
hashes, the licence, the retirement notice, and links to the three return pages. It's what every
card's title opens (R5), and its Fact Check verdict travels with every figure.

---

## 4. Actuarial Tools

### 4.1 One Data Source: **Insurer Return**

> *What did this insurer file?* Company, period, page (and optionally lines and columns) → the
> page as filed, labelled, with each cell's address. It sends on: a value, a column, or the page as
> a table.

It sits in the **Data Sources** area beside Life Table, Price Index and Yield Curve, and it computes
nothing. Its company picker searches OSFI's names (`aka` for the common short names: *Intact*,
*Aviva*, *Wawanesa*). The figure (R11) draws the page's own structure, for instance the assets
stack or the LRC/LIC roll-forward as a waterfall, from filed numbers only. Every value it hands on
carries `source: { dataset: 'osfi-pc', edition: '2025Q3', company, address }`, the provenance
shape §4.11 already defines.

### 4.2 The calculators it feeds

They're in order of what they unlock. Each does one thing (R-one-question), and the bigger jobs
are chains.

| Tool | Answers | In → out | Proven against | Exam |
|---|---|---|---|---|
| **MCT Ratio** (planned, §4.8) | What's the MCT ratio? | Capital available, each risk's required amount, the guideline's factors → the ratio | **Every company's filed ratio** (PC4 line 140), 66 R6 cases from one file, once the PC4 form labels the inputs | 6C |
| **IFRS 17 Roll-Forward** (new) | How did the insurance liability move? | Opening LRC/LIC, revenue, service expenses, finance expense, cash flows → closing, with the loss component split out | Every company's 20.14 (and 20.18 for reinsurance held) against its own filed closing balance | 6C |
| **Insurance Service Ratios** (new) | What are the IFRS 17 KPIs? | Insurance revenue, service expenses, net reinsurance expense, gross or net (a judgment) → the claims, expense and combined ratios as IBC defines them | IBC's worked examples, if the paper prints any; otherwise held to its definitions and labelled *untested* until a published example exists (R6) | 6C |
| **Market Share** (new) | What share of this market does each insurer write? | Page 93.30 or 67.40 for the reader's chosen companies, a class and a province → shares and the HHI | Shares sum to 1 over the full filer set. The PC2 form must label the lines first | 6C, Cowork |
| **Peer Position** (new) | Where does this insurer sit among its peers? | One figure (any filed cell or tool output), a peer set the reader picks → percentile, median, quartiles | Pure arithmetic, property-tested | Cowork |
| **Capital Factors** (planned, §4.11) | What factor does the guideline set? | Unchanged. Gets its real use as MCT Ratio's input | The guideline | 6C |

**What "proven against filings" means.** R6 says no tool leaves Preview until it reproduces a
published worked example in CI. A filed return isn't a worked example, but it's better in one
respect: a company's own filed ratio, recomputed from the same company's filed components, either
matches or it doesn't, and there are 66 of them. The fixtures go in
`lib/tools/fixtures/osfi-mct.json` with each company's inputs and its filed ratio, read by the
extract. Where a company doesn't reconcile (a component the public file leaves out, rounding), the
fixture records that and the card says so. It's never tuned away.

### 4.3 Workflows templates

The board (`docs/workflows.md`) gets a few templates, each a chain through `ToolSpec.next`:

- **Capital check**: Insurer Return (PC4) → Capital Factors → MCT Ratio, and the filed ratio beside
  the recomputed one.
- **IFRS 17 results walk**: Insurer Return (20.14) → IFRS 17 Roll-Forward → Insurance Service
  Ratios.
- **Peer review**: Insurer Return × the reader's peers → Insurance Service Ratios → Peer Position.
- **Provincial market**: Insurer Return (93.30) → Market Share, for one class in one province.

---

## 5. The AI connector

Nothing new is needed to start: the Data Source and the calculators are tools, so `list_tools`,
`describe_tool` and `run_tool` reach them the day they ship, under the contract the connector
already keeps (every figure from a tool, provenance and warnings quoted, an `app_url` to the same
run). Agents will ask questions like these:

- *"What was Aviva Insurance Company of Canada's insurance service result in 2025 Q3, and how is it
  built?"* → Insurer Return (60.25).
- *"Recompute Intact's MCT ratio from its filed components."* → the Capital check chain.
- *"Compare Wawanesa's combined ratio with these five insurers."* → the Peer review chain, with the
  peer set the user named, never one the agent picked silently.

Three additions are worth making, in this order:

1. **`find_insurer`**: a name → OSFI code lookup over `companies.json`, so an agent never guesses a
   code. It could equally be a `run_tool` data tool. Keep the tool count small.
2. **The dictionary as a resource template**, `osfi://pc/2025Q3/<page>`, the labelled form. The
   agent can then say what a line means in OSFI's words before quoting its value.
3. **A practitioner prompt**, *Read an insurer's return*. It's the third of the prompts
   `actuarial-tools.md` §7.1 plans and `docs/cowork-agent-tools.md` (A7) asks for, and it walks
   statement → roll-forward → KPIs → capital with the "as filed, interim, $000" caveat said once,
   up front.

The usage log (`quiz/api/_mcp/usage.js`) may record the company code (public, not personal) once
it's added to the argument allowlist. It doesn't record a peer set's other inputs.

---

## 6. Cowork

Cowork already follows **OSFI** as an entity (`quiz/src/data/coworkSources.ts`) and lists insurers
as publishers. The filings make both real:

- **Each insurer's filing is a document** under that insurer's entity: *"OSFI Core and Quarterly
  Return, 2025 Q3 (as filed)"*, typed `Data`, dated, linked to the dataset page. Its
  `SourceResource.table` is the pages a workflow wants (20.22, 60.25, 93.30, the MCT summary).
- **Under OSFI**, one document for the release itself: the industry pages, with every filer's
  value.
- **The table arrives filled in.** Cowork's rule is *nothing is invented*. A source table's figures
  stay blank until they're read off the publisher, because today a person reads them. Here a
  script read them, with the file's hash recorded, which is exactly what the rule exists to
  guarantee. `docs/cowork.md` and `coworkContent.test.ts` get one clause: a table may carry figures
  **only** when they come from a hashed extract (`table.source = { dataset, edition, address }`
  per cell). A hand-typed figure stays forbidden.
- **No second reader.** The filing opens in `ConceptPopup` as a virtual vault page at a vault-shaped
  path (`Resources/Data/OSFI/2025Q3/<code>.md`), generated at build time from the extract, the way
  Cowork's sample documents are registered now.
- **Coverage.** About 135 filers would become documents, many under entities Cowork doesn't have
  yet. Entities are authored seed data, so they get added for the insurers a reader is likely to
  follow (the largest groups and the ones the vault already cites), and every other filer is
  reachable through the OSFI release document. That's a catalogue choice (D-OSFI-5).

---

## 7. Study Mode: Exam 6C

The Exam 6C page assigns pages of the 2023 Core and Quarterly Returns (objectives C1–C4) and the
MCT guideline. Candidates study a blank form. The filings give them a filled one:

- **Concept pages.** The IFRS 17 pages (insurance service result, LRC, LIC, loss component, MCT
  ratio) can link to the Insurer Return tool with a real company preselected, *"see it filed"*.
  A link only, no figure copied onto the page, so no page's fact check goes stale.
- **Questions.** The question-writer skill can write 6C questions built on a real filing, with
  the company, period and addresses cited in the explanation, and the figures read through the
  tool. They're `-an-` questions like every vault original. A question on one quarter's real
  numbers dates fast, so each one names its period in the stem.
- **PCPA.** Not a fit. The PCPA simulator's data is drawn from a known model on purpose.

---

## 8. Decisions for the maintainer (roadmap §6)

| # | Decision | Default until decided |
|---|---|---|
| D-OSFI-1 | **Licence.** What terms applied to the Beyond 20/20 download, and do they allow redistribution in the app and the connector export? | Nothing ships. The extract and tests run on the maintainer's copy, and the reader's-own-copy mode (§3.2) is the only public use |
| D-OSFI-2 | **Hosting.** Fetched static files in the build (`ai/datasets/osfi/…`) or the public Supabase Storage bucket pattern the Listen recordings use | Static files in the build |
| D-OSFI-3 | **Naming and comparing real insurers.** May a tool's output name a company beside its peers? | Yes, but only for a peer set the reader picks. No market-wide ranking anywhere |
| D-OSFI-4 | **History.** Is 2025 Q3 all there is, or are earlier periods (2020 Q1–2025 Q2, and the annual Q4 returns) on hand from before the server was retired? | Build for one snapshot, keyed by period so more slot in |
| D-OSFI-5 | **Cowork coverage.** Which filers become Cowork entities | The ten largest groups by filed total assets, plus any the vault already cites |
| D-OSFI-6 | **Filled tables in Cowork.** Accept the §6 rule change (figures allowed from a hashed extract only)? | Yes. It is the rule's intent |

## 9. What's needed to start

From the maintainer:

1. The **blank PC2 and PC4 returns** (`.xls`), and the **record layout file** from the same
   package (Beyond 20/20's package included one of each). Without the forms, PC2 and PC4 stay
   unlabelled, and so do MCT Ratio's inputs and Market Share's classes.
2. The **BAAT** file for foreign branches, if it was downloaded.
3. **Any other periods** (D-OSFI-4).
4. The **terms of use** as the site showed them, a screenshot or saved page (D-OSFI-1).

Then, in order (each step a PR, each green before the next):

| Phase | Work | Size |
|---|---|---|
| 0 | D-OSFI-1 settled. `osfi_extract.py` + tests over a committed fixture. Dataset resource page | M |
| 1 | **Insurer Return** Data Source over PC1 (labelled today). The IFRS 17 Roll-Forward tool, proven against every filer's 20.14 | M |
| 2 | PC4 labelled → **MCT Ratio** with 66 filed-ratio fixtures. Capital Factors | M |
| 3 | Connector: `find_insurer`, the dictionary resource, the practitioner prompt. Cowork filing documents and the rule change | M |
| 4 | PC2 labelled → **Market Share**, Insurance Service Ratios, Peer Position. Workflows templates. Exam 6C links and questions | L |
