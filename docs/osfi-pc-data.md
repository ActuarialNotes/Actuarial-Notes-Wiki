# OSFI's insurer filings: a strategy for Tools, the connector and Cowork

_Written 2026-11-08, revised the same day once the open-data API was found. A proposal (roadmap
§3.4, **A11**), not a build spec. Phase 0 started 2026-11-09 (§3.1)._

OSFI publishes what federally regulated insurers file, as filed. Until 2026-06-10 that was the
**Beyond 20/20** server (`Resources/Data/Historical OSFI Data.md`). It's now the **Open Government
Portal**, as CSV files *and* a queryable API, under the Open Government Licence – Canada. The
maintainer also holds a full Beyond 20/20 archive, **2000 to 2025 Q3, P&C and Life**, downloaded
before the server went.

This document covers what each source holds, what the portal is missing that the archive has, the
rules any use of the data has to keep, and one plan for using it across the three product lines
that can carry real data: **Actuarial Tools** (`docs/actuarial-tools.md`), the **AI connector**
(`docs/ai-connector.md`) and **Cowork** (`docs/cowork.md`, `docs/workflows.md`), plus the Exam 6C
tie-in that is already waiting for it.

The plan in one paragraph: **ingest each quarter from the portal's API into a dated, hashed
snapshot. Keep the Beyond 20/20 archive as the second source: it holds the IFRS 17 roll-forwards
the portal doesn't publish, and it's the frozen record to check the portal against. Serve the
snapshot as one Data Sources tool, *Insurer Return*, that the calculators chain from. Prove the
calculators against the filings themselves (every filed MCT ratio becomes a test). Hand the same
tools to agents through `run_tool`. In Cowork, make each insurer's filing a document whose table
arrives filled in from the extract. A scheduled job polls the API for a new quarter and opens the
PR that adds it.**

---

## 1. The sources

### 1.1 The Open Government Portal (primary)

OSFI publishes one dataset per kind of institution. The two that matter here:

- **[Property and casualty companies](https://open.canada.ca/data/en/dataset/4c6c515f-7c44-4bb6-ab56-c5f79f75f705)**,
  updated quarterly, last changed 2026-10-21. It has 22 resources:

  | Return | What it is | Periods on the API |
  |---|---|---|
  | PC1 | Core Financial Statement Return (IFRS 17) | Q1 2023 – Q3 2026 |
  | PC2 | Supervisory Quarterly Return | Q1 2023 – Q3 2026 |
  | PC3 | Supervisory Annual Return | Q4 2023 – Q4 2025 |
  | PC4 | MCT, and the BAAT for foreign branches | Q1 2023 – Q3 2026 |
  | MI, MI3, MI4, MI5 | The mortgage insurers' returns (CMHC, Sagen, Canada Guaranty) | current |
  | 1Q | P&C Quarterly, the IFRS 4 return (inactive Q1 2024) | 2014 – 2023 |
  | 1, 3 | PC-1 Canadian annual and interim (inactive Q3 2014) | 1996 – 2013/14 |
  | 2, 4 | PC-2 Foreign annual and interim (inactive Q3 2014) | 1996 – 2013/14 |
  | MI1 | Mortgage insurance quarterly (inactive Q4 2022) | to 2022 |

  It also has a **Data Dictionary** (`.xlsx`), a **user manual**, a **list of subsidiaries**, a
  Power BI / Excel API guide, and a **mapping of the legacy FINDAT reports** to these datasets.
- **[Life insurance companies](https://open.canada.ca/data/en/dataset/1358284b-26e7-4c69-abd8-398d3da2c270)**:
  LF1, LF2, LF3, LICAT quarterly (LCQ) and annual (LCA), and the inactive Life 10/10A/10Q/20 and
  Returns 54, 55, 86 (TAAM) and 87 (MCCSR). It's the same shape as P&C. Life is §7.

Both are under the **[Open Government Licence – Canada](https://open.canada.ca/en/open-government-licence-canada)**.
That licence allows copying, redistribution and adaptation, commercial or not, with the attribution
statement it specifies, and with no suggestion that OSFI endorses the use.

### 1.2 The API

The portal's CKAN datastore, one endpoint:

```
GET https://open.canada.ca/data/en/api/3/action/datastore_search
    ?resource_id=<return's resource id>
    &filters={"Fiscal Quarter":"Q3 - 2025","Id":"27906"}
    &fields=Data Point Address/Adresse de point de donnee,Measure Value/Valeur de mesure
    &limit=1000&offset=0
```

What was found by using it (2026-11-08):

- **Filters are exact-match** and take a list (`"Id":["27906","27839"]`). Field ids are the CSV
  headers **with the accents stripped** (`Fiscal Year/Annee fiscale`,
  `Data Point Address/Adresse de point de donnee`). A field id written with its accents is rejected.
- **Full-text search (`q`) is refused** on any resource over 100,000 rows, which is every return
  that matters. `datastore_search_sql` isn't enabled. So every query is a filter.
- **A response is capped at 1,000 records** whatever `limit` asks for. `total` gives the real count
  and `_links.next` the next page.
- **A single query is slow** (up to about 6 seconds), but pages fetched four at a time go much
  faster: a whole quarter of PC1 and PC4 (25 pages) in about 15 seconds, and a quarter of PC2
  (about 179,000 rows, 179 pages) in about 6 minutes. `sort` and `distinct` work, but a `distinct`
  over the large returns came back incomplete, so don't rely on it.
- **Per-quarter row counts** (`osfi_extract.py periods`) show every IFRS 17 quarter from Q1 2023
  in PC1, PC2 and PC4, and the year-ends in PC3. The newest quarter fills in as insurers file:
  Q3 2026 had 1,125 PC1 rows on 2026-11-09 against about 16,000 for a whole quarter.
- **Labels are full paths**, e.g. *"PC1: ASSETS:TOTAL ASSETS, Current Period, Total"*, so the
  column (current or prior period) is in the label as well as the address.
- **Every value is text**, including the measure. The extract parses it and fails on anything that
  isn't a number.
- **Only non-zero cells are published.** Your Beyond 20/20 file carries explicit zeros, and the
  portal omits them.

Each row carries the period, OSFI's numeric institution **`Id`** (Intact Insurance Company is
`27906`), its name in English and French, its industry group, the return, the **data point
address** (`P` + page + line + column, e.g. `P100014001`), **the address's label in English and
French**, the date the institution became inactive (`9999-12-31` if it's still active) and the
value, in $000. The labels come with the data, so the blank forms aren't needed to name a cell.

### 1.3 The Beyond 20/20 archive (secondary)

It's the maintainer's own download: **2000 to 2025 Q3, P&C and Life**, the data files, company
lists and blank returns. The format is one row per cell: `company ⇥ return ⇥ address ⇥ value`,
with a `Q3/25` period line, a UTF-8 BOM and CRLF line endings. Companies use OSFI's letter codes
(`A480`, Intact), addresses have no `P` prefix (`100014001`), and zeros are explicit.

### 1.4 How they compare: one quarter checked cell by cell

Intact Insurance Company, Q3 2025, every non-zero cell in the archive compared with the API:

| Return | Archive, non-zero cells | On the API | Values that differ | Missing from the API |
|---|---|---|---|---|
| PC1 | 587 | 216 | 0 | **371: every cell of pages 20.14, 20.16 and 20.18** |
| PC2 | 4,991 | 4,991 | 0 | none |
| PC4 | 91 | 91 | 0 | none |

The filed MCT ratio matches too (192.39 in both). So:

- **The portal is the archive, reformatted**, for everything it publishes. Where both have a cell,
  the values are identical.
- **The IFRS 17 liability roll-forwards (PC1 pages 20.12–20.18) aren't on the portal.** Intact's
  20.12 is empty in both sources: it measures under the PAA, so it has no contracts for the
  measurement-component roll-forward. The other three pages are in the archive only. This is the
  data an IFRS 17 roll-forward tool would be proven on. **From Q4 2025 there's no public source for
  it at all**, unless it turns up in a resource not yet checked (PC3 is the one to look at, §8
  D-OSFI-7).
- One quarter of one company isn't a proof. Phase 0 runs the same diff over **every company and
  every period the two sources share** (2000 – 2025 Q3), and writes down each kind of gap.

### 1.5 Other things a first pass found

These are checks, not results to publish. They're the reason §2 has the rules it has.

- **The industry totals.** Both sources carry total rows ("Total Canadian Property & Casualty",
  `Id 1000012`; `TOTAL` in the archive), and both are naive column sums. They sum the MCT ratio
  column (44,114.83 % for Canadian P&C in Q3 2025, the same in both sources). For Canadian companies
  the archive's total assets don't reconcile: the companies sum to $140.1 bn against `TOTAL`'s
  $129.8 bn. The foreign branches do reconcile ($62.9 bn). The portal's description says industry
  totals "require adding specific sub-totals", and the user manual is where that's explained. Until
  it's read, **no total row is used, for anything.**
- **The mortgage insurers** file the MI returns, not PC1. They are P&C companies in the list but
  absent from PC1–PC4, so a tool says "not in this return" rather than showing zeros.
- **Two accounting eras.** IFRS 17 from fiscal 2023, IFRS 4 before, in different returns (PC1–PC4
  against 1Q and the old annual and interim returns). The portal's own description says they "are
  not directly comparable". A series that crosses 2023 is two series, joined only through a mapping
  someone has written down and cited. It's never a silent join.
- **Identifiers.** The archive uses letter codes, the portal numeric `Id`s. Matching them by name
  works for one quarter (names agree in 2025 Q3) but names change over 26 years, so the join is
  built per period and every ambiguity is listed. The FINDAT mapping document is the first place
  to look for an official crosswalk.
- **Restatements.** An insurer can refile, and the portal shows the current figure. The archive is
  a frozen record of what the portal's predecessor showed on the day it was downloaded. A
  difference between them for an old period is a restatement to record, not an error to fix.

---

## 2. The rules any use of it has to keep

They're the vault's existing rules, applied to filed data. None of them is new.

1. **Extracted mechanically, never retyped** (`actuarial-tools.md` §4.11). One script reads the API
   (or the archive). No model and no person types a figure. Each figure keeps its source, period,
   institution `Id`, return and address.
2. **Labelled only by OSFI.** A cell's name is the label the portal ships with it (both languages),
   or, for an archive-only cell, the label on OSFI's blank return for that period. A cell with no
   label from OSFI keeps its address and **no name**.
3. **As filed, and said so.** Every surface that shows a figure says which source and period it's
   from (*"OSFI, as filed, Q3 2025, $000"*) and names the institution and the address. The project
   corrects nothing. A figure that looks wrong is reported, not fixed.
4. **Derived ≠ filed.** A ratio the project computes (a combined ratio, a market share, a peer
   median) is a **tool's output**, with its formula's source cited (IBC's IFRS 17 metrics paper for
   the KPIs, the MCT guideline for capital), its inputs' addresses listed, and its judgments
   explicit (which companies are peers, gross or net). It's never presented as an OSFI figure.
5. **A dated snapshot, never a live query at run time.** A tool run must reproduce (R4), and the
   portal changes when an insurer refiles. So tools read a snapshot: one period's extract, with the
   hash of what the API returned and the date it was read. The API is how the snapshot is **made
   and refreshed**, not something a tool calls when it runs. That also keeps a six-second query
   out of every card and every agent call.
6. **Attribution.** The licence's statement, *"Contains information licensed under the Open
   Government Licence – Canada"*, goes on the dataset's page, in every card's ⋯ menu, and in every
   connector result that carries a figure. Nothing says or implies OSFI endorses the app.
7. **No league tables.** Ranking named insurers ("weakest capital in Canada") is a judgment about
   real companies on as-filed, often interim, data. Tools compare a company with a peer set **the
   reader picks**. Nothing ranks the market on its own (D-OSFI-3).

---

## 3. The pipeline

### 3.1 `scripts/osfi_extract.py` — built (2026-11-09)

It has the shape of `dataset_extract.py`: standard library only, with tests in
`scripts/test_osfi_extract.py` over real rows saved from the API
(`scripts/fixtures/osfi_pc_sample.json`).

- **`periods [--dataset pc|life]`** lists each return's row count per quarter.
- **`extract --period 2026Q2 [--returns PC1,PC4] [--dataset life]`** pages the API for one period
  (filtered on `Fiscal Quarter`, `_id` order, 1,000 rows a page, four pages at a time, retried with
  backoff), caches each page outside the repo (`~/.cache/actuarial-notes/osfi`; `--offline` reads
  only the cache, `--refresh` re-reads everything), checks every row belongs to the period and
  return asked for and that the pages add up to the API's `total`, and writes `.osfi/<dataset>/<period>/`:
  - `manifest.json`: the dataset and its page, each return's resource id, name and
    `last_modified`, its row and page counts, the time read, and the **content hash** (sha256 over
    the rows in canonical order, so paging and `_id` don't change it). Also the licence and its
    attribution line, and the check tallies.
  - `institutions.json`: OSFI `Id`, English and French names and industry group, inactive date,
    which returns it filed, and `aggregate: true` on OSFI's total rows.
  - `<return>.labels.json` (address → English and French label) and `<return>.values.json`
    (institution → address → value, non-zero cells only), one key per line so a refiling is a
    one-line diff.
  - `checks.json`: the findings.
- **Checks**, each a finding about the filing and never a correction:
  - **MCT/BAAT ratio** (PC4 line 140 = line 10, or 25 for a branch, as a % of line 130), allowing
    only what each input's filed precision permits (a company filing 7,063 over 228.50 can't be
    held to the cent).
  - **Balance**: total assets (20.10 line 89) = total liabilities and equity (20.11 line 799, or
    line 999 for a branch, which files both).
  - **Asset lines**: 20.10's lines sum to its total.
  - Duplicate cells and conflicting labels.

What the first run found, every quarter Q1 2023 – Q2 2026:

- **Every filed MCT and BAAT ratio reproduces** from the filer's own lines: 1,909 ratios over 14
  quarters, 1,735 to the cent and 174 within what their inputs' filed precision allows. That's what
  makes them R6 fixtures for MCT Ratio (§4.2). Two things the check had to learn, both from
  OSFI's own label (*"Line 10 or line 25 as a % of line 130"*): a branch files line 10 and line 25
  and is tested on 25. And the API pads every value to two decimals ("5020.00"), so a whole number
  may have been filed whole: N.V. Hagelunie files its ratio to a whole percent.
- **Every company's asset lines sum to its total assets.**
- **A few filers don't balance**, as filed: 15 findings over the 14 quarters, 0 to 3 a quarter.
  Most are under $10k. N.V. Hagelunie is $104k out in Q4 2023, Q1 2024 and Q2 2024. In Q2 2026 they're
  AXIS Reinsurance Company ($1,057,912k of assets against $1,057,909k) and Ecclesiastical
  Insurance Office ($409,893.99k against $409,898.48k).
- **Q4 2024 mixes two versions of the PC1 form.** 128 addresses carry two labels in that quarter:
  most rows say *"Prior Period"*, a few say *"Prior Period Restated"*. Each is one finding, listing
  both labels with their row counts, and the dictionary keeps the label most rows carry. One of
  them shows a translation slip in OSFI's own labels: the French for *"Revenue from PAA
  Contracts"* (P202201001) names the general measurement model (MGE).
- **The industry total rows still sum the ratio column**, as the archive's did, so they stay
  marked `aggregate` and out of every check.

Not built yet: the CSV `backfill` for the IFRS 4 history, the `archive` reader and its parity diff
(waiting on the upload), and the identities of the roll-forward pages (archive only).

**What's committed.** The script, its tests, and each period's `manifest.json`, `institutions.json`
and `checks.json`, which are small and are the audit trail: a re-run must reproduce each return's
content hash. The labels and values (about 0.6 MB a quarter for PC1 and PC4, 4.6 MB more for PC2)
are git-ignored until D-OSFI-2 settles where the data lives, and are rebuilt by re-running the
extract. Twenty-six quarters of PC2 in git history would be about 120 MB.

### 3.2 Keeping it current

`.github/workflows/osfi-data.yml` runs weekly, the way `podcast-segments.yml` runs nightly:

1. It reads `package_show` for the dataset and compares each resource's `last_modified` with the
   manifest's.
2. If a resource moved, it fetches the newest period, plus the one before it, since that's where
   refilings land.
3. If anything changed, it **opens a PR** with the new snapshot and a summary: new period, cells
   changed by restatement, check failures. It never pushes to `main`. A changed old figure
   becomes a new edition of that period, and the old one stays addressable (R4).

### 3.3 Where the snapshot lives

One period of P&C is a few MB (most cells are zero, and zeros aren't stored). That's over the
limit for tables the engine carries in its bundle (`actuarial-tools.md` §4.11: about 100 KB in
all), so it's the case that section names: **fetched static files**, `ai/datasets/osfi/pc/…`,
emitted into the build. The Tools page fetches a company's file when it's picked. The MCP function
reads the same files from its own deployment, so the app and the agent can't disagree.

Twenty-six years of history is too much for every build: about 100 periods, and the IFRS 4 returns
are larger. The current IFRS 17 periods ship in the build. The history goes to a public Supabase
Storage bucket, the way the Listen recordings do, with the same layout, and is fetched on demand
(D-OSFI-2).

### 3.4 Pages in the vault

- `Resources/Data/Historical OSFI Data.md` currently reads as if Beyond 20/20 is where the data
  lives. It becomes the page about the **archive**: what it was, when it was retired, what the
  maintainer's copy covers, and what only it holds. It points to the portal for everything current.
- `Resources/Data/OSFI/Property and Casualty.md` becomes the dataset's resource page
  (`docs/resource-pages.md`): the portal dataset, its returns and periods, the licence and its
  attribution statement, and links to the return pages. It's what every card's title opens (R5).
- `Resources/Data/OSFI/Life.md` is the same page for the Life dataset.

Editing the first two stales their fact checks (P4). They're re-checked against the portal's
dataset page.

---

## 4. Actuarial Tools

### 4.1 One Data Source: **Insurer Return**

Three designs for this tool and MCT Ratio, held to the tool template and template v2, are in
`docs/osfi-tools-design.md` (2026-11-09).

> *What did this insurer file?* Institution, period, page (and optionally lines and columns) → the
> page as filed, labelled, each cell with its address and source. It sends on: a value, a column,
> or the page as a table.

It sits in the **Data Sources** area beside Life Table, Price Index and Yield Curve, and it computes
nothing. Its institution picker searches OSFI's names in both languages (`aka` for the short
names: *Intact*, *Aviva*, *Wawanesa*). The figure (R11) draws the page's own structure, for
instance the assets stack or the LRC/LIC roll-forward as a waterfall, from filed numbers only.
Every value it hands on carries
`source: { dataset: 'osfi-pc', period, institution, address, origin: 'api' | 'archive' }`.

A **series** mode (one cell across periods) is what history makes possible: twelve quarters of an
IFRS 17 cell, or 24 years of an IFRS 4 one, with the 2023 break drawn as a break, never joined.

### 4.2 The calculators it feeds

They're in order of what they unlock. Each does one thing, and the bigger jobs are chains.

| Tool | Answers | In → out | Proven against | Exam |
|---|---|---|---|---|
| **MCT Ratio** (planned, §4.8) | What's the MCT ratio? | Capital available, each risk's required amount, the guideline's factors → the ratio | **Every company's filed ratio** in PC4, about 130 companies a quarter over 12 quarters, all labelled already | 6C |
| **IFRS 17 Roll-Forward** (new) | How did the insurance liability move? | Opening LRC/LIC, revenue, service expenses, finance expense, cash flows → closing, with the loss component split out | Each company's 20.14 and 20.18 against its own filed closing balance. **Archive only**, Q1 2023 – Q3 2025 (§1.4) | 6C |
| **Insurance Service Ratios** (new) | What are the IFRS 17 KPIs? | Insurance revenue, service expenses, net reinsurance expense, gross or net (a judgment) → claims, expense and combined ratios as IBC defines them | IBC's worked examples if the paper prints any; otherwise held to its definitions and labelled *untested* (R6) | 6C |
| **Market Share** (new) | What share of this market does each insurer write? | PC2 93.30 (premiums written) or 67.40 (insurance revenue) for a class and a province, over the companies the reader picks → shares and the HHI | Shares sum to 1 over the full filer set | 6C, Cowork |
| **Peer Position** (new) | Where does this insurer sit among its peers? | One figure (a filed cell or a tool output) and a peer set the reader picks → percentile, median, quartiles | Pure arithmetic, property-tested | Cowork |
| **Capital Factors** (planned, §4.11) | What factor does the guideline set? | Unchanged; gets its real use as MCT Ratio's input | The guideline | 6C |

**What "proven against filings" means.** R6 says no tool leaves Preview until it reproduces a
published worked example in CI. A filing is better in one respect: a company's own filed ratio,
recomputed from that company's own filed components, either matches or it doesn't. PC4 gives over
a thousand such cases. The fixtures go in `lib/tools/fixtures/osfi-mct.json`. Where a company
doesn't reconcile (a component the public return leaves out, rounding), the fixture records that
and the card says so. It's never tuned away.

### 4.3 What the history adds (2000 – 2022, IFRS 4)

The 1Q and old annual returns are a different shape. They become their own Data Source,
*Insurer Return (IFRS 4)*, not a mode of the IFRS 17 one. What they give that the current returns
can't:

- **Long series** for the Exam 5 and 6C ideas that need a cycle to show: the underwriting cycle in
  the loss ratio and the combined ratio, market shares drifting over two decades, capital through
  2008 and 2020. That's **Price Index**'s shape (*how has this moved?*) applied to filed figures.
- **Claims development.** If the old annual returns carry the development exhibits the P&C-1 used
  to (to be confirmed against the Data Dictionary, D-OSFI-7), they're a Canadian counterpart to the
  CAS Loss Reserving Database planned as *Loss Development Data* (§4.11): real triangles, by
  company and line, to practise the reserving chain on. Real filed data, so never the card's
  "Load an example".

### 4.4 Workflows templates

The board (`docs/workflows.md`) gets a few templates, each a chain through `ToolSpec.next`:

- **Capital check**: Insurer Return (PC4) → Capital Factors → MCT Ratio, with the filed ratio beside
  the recomputed one.
- **IFRS 17 results walk**: Insurer Return (20.14) → IFRS 17 Roll-Forward → Insurance Service
  Ratios. Archive periods only.
- **Peer review**: Insurer Return × the reader's peers → Insurance Service Ratios → Peer Position.
- **Provincial market**: Insurer Return (93.30) → Market Share, one class in one province.

---

## 5. The AI connector

Nothing new is needed to start. The Data Source and the calculators are tools, so `list_tools`,
`describe_tool` and `run_tool` reach them the day they ship, under the contract the connector
already keeps: every figure from a tool, provenance and warnings quoted, an `app_url` to the same
run. Agents will ask questions like these:

- *"What was Aviva Insurance Company of Canada's insurance service result in Q2 2026, and how is it
  built?"* → Insurer Return (PC2 60.25).
- *"Recompute Intact's MCT ratio from its filed components for the last four quarters."* → the
  Capital check chain, across periods.
- *"Compare Wawanesa's combined ratio with these five insurers."* → the Peer review chain, with the
  peer set the user named, never one the agent picked silently.

The connector reads the snapshot, **not the portal API**, for rule 5's reasons. An agent that wants
a period the snapshot hasn't reached yet can be told so, with the portal's dataset link, rather than
being handed an unchecked live figure. Three additions are worth making, in this order:

1. **`find_insurer`**: name (English or French, current or former) → OSFI `Id`, industry group,
   active or inactive, and the periods on file, so an agent never guesses an id.
2. **The dictionary as a resource template**, `osfi://pc/<period>/<page>`, the labelled page. The
   agent can then say what a line means in OSFI's words before quoting its value.
3. **A practitioner prompt**, *Read an insurer's return*. It's the third of the prompts
   `actuarial-tools.md` §7.1 plans and `docs/cowork-agent-tools.md` (A7) asks for, and it walks
   statement → roll-forward → KPIs → capital, with the "as filed, $000, source and period" line said
   once, up front.

The usage log (`quiz/api/_mcp/usage.js`) may record the institution `Id` (public, not personal)
once it's added to the argument allowlist.

---

## 6. Cowork

Cowork already follows **OSFI** as an entity (`quiz/src/data/coworkSources.ts`) and lists insurers
as publishers. The filings make both real:

- **Each insurer's filing is a document** under that insurer's entity: *"OSFI returns, Q2 2026 (as
  filed)"*, typed `Data`, dated, linked to the dataset page. Its `SourceResource.table` is the pages
  a workflow wants (20.22, 60.25, 93.30, the MCT summary). A new quarter is a new document, put
  there by the weekly job's PR.
- **Under OSFI**, one document per period for the release itself: the industry pages, with every
  filer's value.
- **The table arrives filled in.** Cowork's rule is *nothing is invented*. A source table's figures
  stay blank until they're read off the publisher, because today a person reads them. Here a script
  read them, with the API response's hash recorded, which is exactly what the rule exists to
  guarantee. `docs/cowork.md` and `coworkContent.test.ts` get one clause: a table may carry figures
  **only** when every one comes from a hashed extract (`source = { dataset, period, address }`). A
  hand-typed figure stays forbidden.
- **No second reader.** The filing opens in `ConceptPopup` as a virtual vault page at a vault-shaped
  path (`Resources/Data/OSFI/<period>/<Id>.md`), generated at build time from the snapshot, the way
  Cowork's sample documents are registered now.
- **Coverage.** About 135 P&C filers per quarter would become documents, many under entities Cowork
  doesn't have yet. Entities are authored seed data, so they get added for the insurers a reader is
  likely to follow, and every other filer is reachable through OSFI's release document (D-OSFI-5).

---

## 7. Life insurers

The Life dataset has the same shape on the same API (LF1 core statements, LF2 quarterly, LF3
annual, LICAT quarterly and annual; the IFRS 4 returns and the old MCCSR and TAAM tests behind
them), and the archive covers Life from 2000 too. Everything in §§2–6 carries over: one extract
with a `--dataset life` switch, *Insurer Return* with a Life mode, a **LICAT Ratio** tool proven
against the filed ratios the way MCT Ratio is, and Life filers in Cowork.

The Life exams are `development` (`lib/examStatus.ts`), and the Life tools wait for the vault
(`actuarial-tools.md` §4.9). So Life is **phase 5**: the extract and the data source early, because
they're nearly free once P&C works; the tools when the exams are ready.

---

## 8. Decisions for the maintainer (roadmap §6)

| # | Decision | Default until decided |
|---|---|---|
| D-OSFI-1 | ~~Licence~~ | **Settled** by the portal: Open Government Licence – Canada, with its attribution statement (§2 rule 6). The archive's figures are the same filings, published by the same office. Whether the archive itself was under the same terms is worth a line on its page |
| D-OSFI-2 | **Hosting.** Current IFRS 17 periods in the build; history in a public Supabase Storage bucket | As stated |
| D-OSFI-3 | **Naming and comparing real insurers.** May a tool's output name a company beside its peers? | Yes, but only for a peer set the reader picks. No market-wide ranking anywhere |
| D-OSFI-4 | **How far back the product goes.** The IFRS 17 periods only, or the IFRS 4 history too (§4.3)? | IFRS 17 first. History is phase 4, starting with the long series and the development exhibits |
| D-OSFI-5 | **Cowork coverage.** Which filers become Cowork entities | The ten largest groups by filed total assets, plus any the vault already cites |
| D-OSFI-6 | **Filled tables in Cowork.** Accept the §6 rule change (figures allowed from a hashed extract only)? | Yes. It is the rule's intent |
| D-OSFI-7 | **The roll-forwards.** Ask OSFI (`information@osfi-bsif.gc.ca`) whether PC1 20.12–20.18 are withheld from the portal on purpose and whether they'll be published, and check PC3 and the Data Dictionary for them and for the old development exhibits | Build the Roll-Forward tool on the archive's periods, and say on the card that later periods aren't published |

## 9. Phases

Each step is a PR, and each is green before the next.

| Phase | Work | Size |
|---|---|---|
| 0 | ✅ `osfi_extract.py`'s API pager, checks and tests (2026-11-09). Still to do: the CSV backfill, the archive reader, the institution crosswalk, and the **full parity diff** (archive against portal, every shared cell, 2000 – 2025 Q3). Read the user manual and Data Dictionary (totals, D-OSFI-7). Rewrite the two OSFI data pages and add the Life one | M |
| 1 | **Insurer Return** over PC1–PC4 for the IFRS 17 periods. **MCT Ratio** with every filed ratio as a fixture. Capital Factors. The weekly refresh job | M |
| 2 | **IFRS 17 Roll-Forward** on the archive's 20.14/20.18. Insurance Service Ratios. Market Share. Peer Position. Workflows templates | M |
| 3 | Connector: `find_insurer`, the dictionary resource, the practitioner prompt. Cowork filing documents and the rule change. Exam 6C links and questions (§10) | M |
| 4 | History: *Insurer Return (IFRS 4)*, series mode, the bucket, and Loss Development Data from the old annual returns if the exhibits are there | L |
| 5 | Life: the extract and data source, then LICAT Ratio when the Life exams are ready | M |

What's needed from the maintainer to start phase 0: the archive's files (all periods, P&C and
Life), in one directory the script can read, kept **outside the repo**. It's large, and it's
input, not content. A cloud session can take them as an upload. The snapshots the script writes
are what gets committed or published.

---

## 10. Study Mode: Exam 6C

The Exam 6C page assigns pages of the 2023 Core and Quarterly Returns (objectives C1–C4) and the
MCT guideline. Candidates study a blank form. The filings give them a filled one:

- **Concept pages.** The IFRS 17 pages (insurance service result, LRC, LIC, loss component, MCT
  ratio) can link to the Insurer Return tool with a real company preselected, *"see it filed"*.
  A link only, no figure copied onto the page, so no page's fact check goes stale.
- **Questions.** The question-writer skill can write 6C questions built on a real filing, with the
  institution, period and addresses cited in the explanation, and the figures read through the
  tool. They're `-an-` questions like every vault original. A question on one quarter's real numbers
  dates fast, so each names its period in the stem.
- **PCPA.** Not a fit. The PCPA simulator's data is drawn from a known model on purpose.
