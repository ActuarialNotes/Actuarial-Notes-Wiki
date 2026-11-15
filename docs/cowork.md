# Cowork — Workflows and Data Sources

**Cowork** was the app's second product, a separate *mode* reached from a Study / Cowork
pill beside the wordmark. Since 2026-11-14 it is part of the one app: no pill, no second
sidebar. What it held lives in two places in the main navigation —

- **Workflows** (`/workflows`, `docs/workflows.md`) — a sidebar row with **Tools** and
  **Data Sources** under it: a workflow is built from calculations and published data.
- **Data Sources** (`/data-sources`, `pages/DataSources/`) — what a model can take from a
  published document, as **one catalogue** (since 2026-11-15; §2, *The catalogue*): every
  **value** (a figure in the Assumptions Bank, `docs/assumptions-bank.md`), **table** (a
  document the app reads as data — life tables, price indexes, yield curves, insurer filings,
  `SourceResource.tool` or `.table`) and **document** (everything else a publisher issued) is a
  row of the same shape, filed under what a model needs it for. Before that it was three
  sections — Assumptions, Sources, Documents — each a page of its own shape.

The code keeps the `cowork*` names (`lib/coworkSources.ts`, `data/coworkSources.ts`,
`components/cowork/`, `useCoworkLibrary`, the `cowork-sources` skill): no reader sees them, and
renaming them would only churn the tests and the stored library. The word *Cowork* is on no
screen.

**Who sees what.** Workflows is in **Preview**, gated by `COWORK_ENABLED` (and
`TOOLS_ENABLED`) in `quiz/src/lib/featureFlags.ts` and open **only to approved accounts** —
`PREVIEW_APPROVED_EMAILS` in `quiz/src/lib/workflowsAccess.ts`, read through
`hooks/useWorkflowsAccess.ts`. Data Sources — the catalogue and every publisher's page — is
open to everyone (since 2026-11-14; the publishers and documents were Preview before). So:

| Reader | Sidebar | `/data-sources` | `/workflows` |
| --- | --- | --- | --- |
| approved | Workflows, with Tools and Data Sources under it | the catalogue | the library |
| anyone else | Tools and Data Sources as rows of their own | the catalogue | redirects to the dashboard |

The e2e suite's build sets `VITE_COWORK_PREVIEW=on` (playwright.config.ts) →
`COWORK_OPEN_TO_ALL`, so Workflows is tested signed out. No deployed build
sets it. The approval list is a UI gate, not a security boundary — the catalogue is bundled
seed data and its stores are localStorage, so there is no server data behind it to guard.

---

## 1. Addresses

```
/data-sources               the catalogue (?need= ?type= ?region= ?ready=1 ?library=1 ?set= ?item=)
/data-sources/<publisher>   the catalogue, narrowed to one publisher
/data-sources/<table>       one table — a Data Sources tool's page (ToolPage, pages/Tools.tsx)
/workflows                  the Workflows library            (Preview)
/workflows/<id>             one workflow's board             (Preview)
```

The addresses are `lib/dataSources.ts`; a table slug, a publisher id and a section the page
used to have share one segment, and `lib/dataSources.test.ts` holds them apart. A tool's page
address is `toolPath(spec)` (`lib/tools/registry.ts`), `/data-sources/<slug>` for area `data` and
`/tools/<slug>` otherwise; `runPath(slug, input, area)` is the same for a run, and is what the
MCP connector's `app_url` uses. Every old address redirects, its query kept
(`legacySectionPath`): `/data-sources/assumptions`, `/sources` and `/publishers` → `/data-sources`,
`/data-sources/documents` → `?type=document`, `/data-sources/tables` → `?type=table`,
`/cowork` → `/data-sources`, `/cowork/resources` → `?type=document`,
`/cowork/sources/<id>` → `/data-sources/<id>`,
`/cowork/workflows`, `/cowork/deliverables` and `/tools/workflow` → `/workflows`,
`/tools/<table>` → `/data-sources/<table>` with its `#input=` run kept, and `/tools/assumptions`
→ `/data-sources` (`CoworkRedirect` in `App.tsx`, the top of `pages/Tools.tsx`).

A filter rewrites the query in place; choosing a publisher is a move to its own address, which
Back undoes. On the desk (`lib/viewTransition.ts`) a publisher and a table are sheets over the
catalogue.

**Every list says what a document gives.** A document carries **Data** and **Assumptions**
tags (`resourceOffers`, `components/cowork/OfferTags.tsx`): Data opens its table
(`resourceTablePath`, the tool's page pointed at this publisher's file through the run
fragment), Assumptions opens the Assumptions section narrowed to the figures read from it
(`assumptionSetPath`, `?set=`). A source's row carries the same tags for what any of its
documents gives (`entityOffers`), as plain tags.

---

## 2. The loop

```
  Publishers ──► Library ──► Workflow ──► Connect ──► Run ──► Run in Claude
 (who publishes)            (sources, data,  (what flows   (live, on the   (the brief, for
                             calculations,    into what)     tools engine)   the connector)
                             concepts)
```

Publishers and documents are in the Data Sources catalogue, and **Workflows** is its own row.
Workflows replaced the Deliverables place that used to stand second — a scoping wizard whose
exports carried structure and blank value cells — with the board that was the Tools tab's
*Workflow Builder*, because a workflow does what a deliverable only described: it runs.

### The catalogue

The page answers one question: *what can I put in a model, and where does it come from?* It was
three sections until 2026-11-15, organised by how the data is stored (figures, publishers,
documents), each a page of a different width with its own filters and its own way of opening
things. It is now one list in one frame (`pages/DataSources/index.tsx`), and everything on it is
derived by `lib/dataCatalogue.ts` (pure, tested) from the Assumptions Bank and the source
catalogue:

- **Three types, one row.** A **value** is a figure from the bank; a run of them that is one
  figure per year (GISA's ULAE factor for each accident year) is one row (`groupSetRows`). A
  **table** is a document a Data Sources tool reads (`SourceResource.tool`) or whose own table
  a workflow takes (`.table`). A **document** is every other entry. Each row: its type, its
  name over publisher · region · year, and its value on the right.
- **Filed under what the model needs.** Seven needs lead the page (`DATA_NEEDS`: trend and
  inflation, loss development, expenses and profit, mortality, interest rates, capital, company
  results). A value's need is its kind's (`NEED_BY_KIND`), a table's is its tool's
  (`NEEDS_BY_TABLE_TOOL`, `NEEDS_BY_TABLE_DOCUMENT`), and a document's is that of the values it
  gives; a document that gives none is under *Other documents*, folded to its first few with a
  row to all of them. The tests fail a kind or a table with no need.
- **The frame never changes.** The needs, the Type switch (All · Values · Tables · Documents),
  Region, Publisher, **Ready to use** (only an entered value or a table a tool reads) and My
  Library stay where they are; a filter only changes the rows, each option counting what
  choosing it would leave. Everything rides the address.
- **A row opens beside the list** (`components/datasources/CatalogueDetail.tsx`; a sheet over
  it below `lg`, `?item=`): the value and what it means in the document's words, **Use in
  <tool>** for every field that takes it (`figureUses`), a table's **Open in <tool>**, a
  document's **Read the document** and the values it gives, Add to My Library, then where it
  comes from — publisher, document, the place it is printed, when it came into force and was
  read — and its Fact Check.
- **Nothing is invented, and a blank says so.** A value not yet read off its document, and a
  table whose figures are blank, read *Not entered*, sort after what is ready, and open on
  where in the document they are.

**A publisher is the catalogue narrowed** to it, at `/data-sources/:id`: the publisher's logo
in the sticky header, then their name, description, **Follow** and site above the same needs,
filters and list. The mark is the publisher's **own** logo, hotlinked from their site and
authored on the entity (`SourceEntity.logo`), transcribed from their own markup rather than
guessed from their domain — and never drawn by us, because an approximated logo is an invented
brand. A publisher with no usable mark, and a mark that fails to load, fall back to the monogram
tile (`components/cowork/EntityLogo.tsx`). `SourceEntity.established` follows the same rule.

**My Library is a filter**, shown once the reader follows a publisher or has added a document:
it keeps what they added and everything from a publisher they follow. An empty library matches
nothing; `undefined` is the filter switched off.

### Search

The bar is the wiki's floating search, built from the same parts
(`components/FloatingSearchBar.tsx` — sticky blurred bar, input line with the hamburger
folding away as you type, dimmed backdrop, scope pills, result rows; `SearchHighlight.tsx`
marks the matched run), so searching here feels like searching anywhere else in the app.

It behaves like the wiki's too: a query is **a question with answers**, not a filter that
quietly thins the page behind the bar. Typing opens a list and picking a row goes to the
thing — a table to its page and a value to the catalogue with that value open (`places`, listed first), a publisher to their page, a document into `ConceptPopup`. Publishers and documents are listed apart and each matches **on its own account**
(`searchSources`): in a list of results a document that only matched because its publisher did is a row
nobody asked for, under the row that opens the page it is already on. On a publisher's page
the scope is **This publisher** or **Everywhere**, mirroring the wiki's *This Page* /
*Everywhere*. Nothing goes in the URL, because there is no filtered state of a page to carry.

Adding a document implies following its publisher (you cannot work from a document whose
source you do not list), and dropping a publisher drops the documents taken from it — a
library holding a document whose publisher it no longer lists could name the document but
not who issued it. Dropping a document leaves the publisher followed: the two are separate
claims. All of this is pure and tested in `lib/coworkSources.ts`.

### Workflows

`docs/workflows.md` is the full account; what matters here is how the two places meet. The
board's **+** opens with **Source**: the reader's library first, then every publisher's
catalogue, then a search. A document goes on the board as a **source step** — the publisher,
the document's kind and date, **Read the document** (the same `ConceptPopup` Data Sources opens it
in), and what it supplies (`SourceResource.assumptions`, each with its locator) — and putting
it on a board adds it to the library, as **Add to My Library** does in the catalogue.

A document that **publishes a table** carries its shape (`SourceResource.table`), and on the
board that table is data: a connection maps its columns, or one of its cells, onto a
calculation's inputs exactly as an uploaded CSV's are. FSRA's private passenger automobile
**loss trend benchmarks** are the first — the past trend and range of future trends by
coverage that an Ontario rate filing is reviewed against — so a Collision trend read off
FSRA's page links straight into **Trend Factor**.

---

## 3. The rule that matters: nothing is invented

Cowork holds no experience data. Two consequences run through the whole feature and neither
is negotiable:

**A source's table goes onto a board with its figures blank** unless they have been read off
the publisher. A table that arrived pre-filled from anywhere else would be filled with numbers
nobody read, and a workflow built on it would carry a figure with no basis. What the catalogue
*can* carry honestly is structure — the publisher's columns, its row labels, where in the
document the table is — and the reader fills the figures in from the document on the step.
A blank cell carries nothing down a link, so the calculation it feeds keeps its own input
rather than running on a value nobody read. `lib/coworkContent.test.ts` holds every table to
a real, linked document (never a sample).

**An assumption with no value stays visibly blank, with its locator.** `value` is optional on
`ResourceAssumption` precisely so a document can supply the *row* — and where in itself the
number is read from — without supplying a number it does not state.

This is the vault's own rule (`docs/verification.md`, `docs/mock-exam-browser.md`) applied to
a second product: provenance is **transcribed, never constructed**.

### Seed data and the `Sample` chip

Cowork ships with a seed catalogue while the corpus is built out
(`data/coworkSources.ts`). Two kinds of resource live in it and the difference is
load-bearing:

- A resource with a **`wikiRef`** *is* a vault page — a resource page in whichever
  `Resources/` folder its type puts it (`docs/resource-pages.md` §0). Its title, content and
  fact-check record are the wiki's. About fifty are authored, with the assumptions and tables
  a workflow reads; the rest — every practice document in the vault, some 380 — are
  **derived** at build time (`virtual:cowork-vault`, `lib/coworkVault.ts`): title, year,
  link and the lead's first sentence read off the page, filed under the entity
  `PUBLISHER_ENTITY` maps its `Publisher:` to. Textbooks, study notes, courses and syllabi
  stay out; a page whose publisher has no entity stays out until one is authored.
  `lib/coworkContent.test.ts` asserts every `wikiRef` resolves to a file that is actually in the vault — a renamed page would otherwise leave a
  Cowork row quietly opening an empty panel.
- A resource with **`sample: true`** illustrates the shape of the catalogue for a publisher
  whose corpus Cowork does not carry yet. It carries **no date and no link**, because it
  names no particular document; inventing a plausible one would put a citation in a
  workflow that nothing supports. Its body says what that class of document contains and
  what an actuary takes out of it, which is the part that is true, and opens with a
  "Sample entry" callout. The row wears a `Sample` chip, on a workflow's source step too,
  and the brief for Claude tells the assistant not to cite it as a document.

Tests enforce the contract both ways: every `docPath` has a body, every body is referenced,
every sample is dateless and linkless, and no wiki-backed page is marked a sample.

All but one sample has been replaced with a real document (2026-10-30). The one left,
**MSA Researcher**, is a subscription database with no public document to read; it stays a
sample. A real document enters Cowork by being written as a resource page.

Which publisher comes next, and why, is kept in `docs/cowork-source-inventory.md` — the
prioritised backlog behind this catalogue.

---

## 4. There is no second reader

Requirement 1 was "the core interactivity is the same as in Study Mode. Resources open in
the popup viewer." The way that is kept is by not building a second viewer at all.

A Cowork resource opens in `ConceptPopup` — the same split pane the study guide reads a
concept in, with the same page stack, the same action menu, the same fact-check record and
the same Previous/Next walk. Cowork's own sample documents are registered as **virtual vault
files** at vault-shaped paths (`lib/coworkContent.ts` → `registerVirtualWikiFiles` in
`lib/github.ts`), so `ConceptPagePanel` fetches one, `WikiArticle` renders it, and its
`[[wiki links]]` resolve into the vault. They are authored with resource-page front
matter so they get the same `ResourceMetaCard` a vault resource page leads with.

Anything that would need a bespoke viewer should become a page at a vault-shaped path
instead.

`lib/coworkContent.ts` also installs the **wiki bundle** lookup. `WikiLayout` does this for
the wiki routes, but Cowork never mounts `WikiLayout` — without it a source card opened onto
"Couldn't load …" for anyone behind a rate limit, an outage or no connection, which is the
same failure `virtual:exam-pages` exists to prevent. Both callers hand over the same bundle,
so the two registrations are idempotent.

`virtual:wiki-content` carries every folder under `Resources/`, so a Cowork resource opens
from the bundle wherever its page sits; `installWikiBundle` (`lib/wikiBundle.ts`) also
registers where each resource page outside `Books/` lives, which is how a `[[Name]]` link or
`/wiki/resource/<name>` finds it.

### The walk kind

`useConceptPopup`'s `openAt` takes `walk: 'syllabus' | 'corpus'`. Cowork passes `corpus`,
which drops the footer's syllabus-filter picker — for the same reason a guide walk drops it:
over a corpus of documents every filter it offers would be either a no-op or a lie about what
is being read.

---

## 5. Persistence

The library is **localStorage only**, deliberately, while Cowork is in Preview: the
catalogue is seed data that will be replaced, and a server table keyed to today's resource
ids would be a migration to write before the feature has been used. Workflows are
localStorage too (`docs/workflows.md`, *Storage*); a source step stores its resource id, its
title as last seen and the table as the reader filled it in.

The library holds **ids and nothing else**, and the calls that need the catalogue take it as
an argument, so nothing outside the Data Sources and Workflows chunks needs the catalogue. For
the same reason the Workflows row carries no count: the workflow store reads the tools engine,
and the sidebar is in the first-paint bundle.

---

## 6. Where things are

```
quiz/src/lib/workflowsAccess.ts       who sees Workflows and the publishers (Preview approval)
quiz/src/lib/dataSources.ts           Data Sources' addresses
quiz/src/lib/dataCatalogue.ts         the catalogue: items, needs, filters, groups (pure)
quiz/src/lib/coworkSources.ts         entity/resource types (a resource's table), search,
                                      filters, library reducers
quiz/src/lib/coworkContent.ts         wiki-bundle + virtual-file registration (side effects)
quiz/src/lib/workflow*.ts             Workflows: the model, grid, CSV/table mapping, brief
quiz/src/data/coworkSources.ts        the seed catalogue (entities + resources)
quiz/src/data/coworkDocs.ts           the sample documents' markdown bodies
quiz/src/hooks/useCoworkLibrary.ts    library persistence (ids only)
quiz/src/hooks/useWorkflows.ts        workflow persistence
quiz/src/components/FloatingSearchBar.tsx  the shared search-bar chrome (with the wiki's)
quiz/src/components/SearchHighlight.tsx    the shared marked-match run
quiz/src/components/cowork/           EntityLogo, LibraryPill, CoworkTopBar (the page's search bar)
quiz/src/components/datasources/      an open item's detail (CatalogueDetail)
quiz/src/components/workflow/         the board, the + menu, a step's and a line's panels
quiz/src/pages/DataSources/           the catalogue, a publisher's head, routing
quiz/src/pages/WorkflowBuilder.tsx    Workflows: the library (/workflows) and a board (/workflows/:id)
quiz/e2e/data-sources.spec.ts         the sidebar, the catalogue and the old links' redirects
quiz/e2e/workflow.spec.ts             Workflows, including a source's table linked into a tool
```

Every `lib/cowork*.ts` module is pure and has a `*.test.ts` beside it, in the repo's usual
style. The catalogue itself is tested too (`lib/coworkContent.test.ts`) — integrity checks
are the only thing standing between seed data and a row that quietly lies to a reader.
