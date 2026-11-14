# Cowork — Workflows and Data Sources

**Cowork** was the app's second product, a separate *mode* reached from a Study / Cowork
pill beside the wordmark. Since 2026-11-14 it is part of the one app: no pill, no second
sidebar. What it held lives in two places in the main navigation —

- **Workflows** (`/workflows`, `docs/workflows.md`) — a sidebar row with **Tools** and
  **Data Sources** under it: a workflow is built from calculations and published data.
- **Data Sources** (`/data-sources`, `pages/DataSources/`) — the published data a
  calculation reads from, as four sections: **Tables** (the Data Sources tools — life
  tables, price indexes, yield curves, insurer filings), the **Assumptions Bank**
  (`docs/assumptions-bank.md`), **Publishers** (what Cowork called Sources) and
  **Documents** (what it called Resources).

The code keeps the `cowork*` names (`lib/coworkSources.ts`, `data/coworkSources.ts`,
`components/cowork/`, `useCoworkLibrary`, the `cowork-sources` skill): no reader sees them, and
renaming them would only churn the tests and the stored library. The word *Cowork* is on no
screen.

**Who sees what.** Workflows, Publishers and Documents are in **Preview**, gated by
`COWORK_ENABLED` (and `TOOLS_ENABLED`) in `quiz/src/lib/featureFlags.ts` and open **only to
approved accounts** — `PREVIEW_APPROVED_EMAILS` in `quiz/src/lib/workflowsAccess.ts` (today,
`jordan@actuarialnotes.com`), read through `hooks/useWorkflowsAccess.ts`. Tables and the
Assumptions Bank are open to everyone. So:

| Reader | Sidebar | `/data-sources` | `/workflows` |
| --- | --- | --- | --- |
| approved | Workflows, with Tools and Data Sources under it | all four sections | the library |
| anyone else | Tools and Data Sources as rows of their own | Tables, Assumptions Bank; a publisher's or Publishers/Documents' address leads back to Tables | redirects to the dashboard |

The e2e suite's build sets `VITE_COWORK_PREVIEW=on` (playwright.config.ts) →
`COWORK_OPEN_TO_ALL`, so Workflows and the publishers are tested signed out. No deployed build
sets it. The approval list is a UI gate, not a security boundary — the catalogue is bundled
seed data and its stores are localStorage, so there is no server data behind it to guard.

---

## 1. Addresses

```
/data-sources               Tables
/data-sources/assumptions   the Assumptions Bank
/data-sources/publishers    Publishers                       (Preview)
/data-sources/documents     Documents                        (Preview)
/data-sources/<table>       one table — a Data Sources tool's page (ToolPage, pages/Tools.tsx)
/data-sources/<publisher>   one publisher's page             (Preview)
/workflows                  the Workflows library            (Preview)
/workflows/<id>             one workflow's board             (Preview)
```

The sections are `lib/dataSources.ts`; a section name, a table slug and a publisher id share
one segment, and `lib/dataSources.test.ts` holds them apart. A tool's page address is
`toolPath(spec)` (`lib/tools/registry.ts`), `/data-sources/<slug>` for area `data` and
`/tools/<slug>` otherwise; `runPath(slug, input, area)` is the same for a run, and is what the
MCP connector's `app_url` uses. Every old address redirects: `/cowork` → Publishers,
`/cowork/resources` → Documents, `/cowork/sources/<id>` → `/data-sources/<id>`,
`/cowork/workflows`, `/cowork/deliverables` and `/tools/workflow` → `/workflows`,
`/tools/<table>` → `/data-sources/<table>` with its `#input=` run kept, and `/tools/assumptions`
→ `/data-sources/assumptions` (`CoworkRedirect` in `App.tsx`, the top of `pages/Tools.tsx`).

The section chips at the top of the page are links that **replace** the history entry: four
views of one page, so Back leaves Data Sources rather than walking back through them.

---

## 2. The loop

```
  Publishers ──► Library ──► Workflow ──► Connect ──► Run ──► Run in Claude
 (who publishes)            (sources, data,  (what flows   (live, on the   (the brief, for
                             calculations,    into what)     tools engine)   the connector)
                             concepts)
```

Publishers and Documents are under Data Sources, and **Workflows** is its own row. Workflows
replaced the Deliverables place that used to stand second — a scoping wizard whose exports
carried structure and blank value cells — with the board that was the Tools tab's *Workflow
Builder*, because a workflow does what a deliverable only described: it runs.

### Publishers

A source is an **entity**, not a document. An actuary does not follow "documents", they
follow *publishers* — OSFI, FSRA, the CIA, a competitor's annual report, one trade paper —
and take whatever those publish. So the card is the publisher and its action is **Follow**.

**A publisher is a page**, at `/data-sources/:id`, the way an exam's study guide is a page:
the publisher's logo in the sticky header, their description and Follow control below it,
and their whole catalogue under that as cards, each with its own **Add**
(`pages/DataSources/SourcePage.tsx`). The Publishers section is publishers only — a catalogue
folded inside a card on a shelf could not be linked to or scrolled on its own.

The mark in the header and on the card is the publisher's **own** logo, hotlinked from
their site and authored on the entity (`SourceEntity.logo`), transcribed from their own
markup rather than guessed from their domain — and never drawn by us, because an
approximated logo is an invented brand. A publisher with no usable mark, and a mark that
fails to load, fall back to the monogram tile (`components/cowork/EntityLogo.tsx`).

**Documents are always cards, never rows.** One component draws them everywhere they are
listed — the Resources shelf and a source's page — and it is the study guide's
resource card
(`components/cowork/ResourceCard.tsx` beside `components/wiki/SourceMaterialGallery.tsx`):
the work's jacket when the vault has one (`lib/coworkCovers.ts`), otherwise its kind icon,
then the title and a row of metadata pills. Cowork is a second product, not a second design
system.

**A card is the target, and it carries facts rather than prose.** The whole publisher card
is a stretched link to their page; the whole document card is a stretched button that opens
the document — a card whose title alone was clickable left nine tenths of a live-looking
surface dead. The one control that does not navigate sits at the card's **right edge**
(Follow, Add), so the eye finds it in the same place on every row. What a card says is pills
— a publisher's region and the year it was established, a document's kind and date — not a
paragraph of grey text repeated down a grid; the account of what something is belongs on its
own page, which is one tap away (`docs/visual-noise-review.md`).

`SourceEntity.established` follows the same rule as the logo and the dates: **transcribed,
never constructed**, and it is the year *this body* came into being, not the year its
business began — Intact Financial Corporation dates from 2009 though the Halifax Insurance
Company it grew out of dates from 1809. No record worth citing, no pill.

### Two sections, Publishers and Documents

Publishers and what they publish are two different questions, each answered by a different
card, so they are **two sections** of Data Sources: **Publishers**
(`/data-sources/publishers`, `pages/DataSources/SourcesView.tsx`) and **Documents**
(`/data-sources/documents`, `pages/DataSources/ResourcesView.tsx`). The page's section chips
lead between them (they used to be two shelves of their own, each with a row to the other).

**Documents filters the way the Study Guides' Resources page does**: Exam, Publisher and Year, OR
within one and AND across them, each option counting what choosing it would leave, riding the
URL (`?publisher=…&year=…`). It is the same code — `lib/resourceFilters.ts` reads any
`ResourceFacetItem`, and `coworkFacetItem` (`lib/coworkSources.ts`) hands a document over in
that shape: the publisher is its entity, the year its `published` date's, the exams those the
vault's own page is a reading for (none for a document with no vault page — never a guess).
Exam is a dropdown rather than the study page's logo strip, and Vintage (an edition of one
exam's syllabus) isn't offered.

**My Library leads each shelf's filter row.** It is a filter, not a section: it narrows the shelf
to publishers the reader follows (Publishers) or documents they have taken (Documents). It used
to be a block stacked above the shelf, which made what a reader *had* a different place from
what they *could have*, pushed the filters below the fold, and showed the same card in both
its states on one screen. An empty array is a library with nothing in it and matches nothing;
`undefined` is the filter switched off — `lib/coworkSources.ts` turns on that distinction and
the tests pin it.

### Search

The bar is the wiki's floating search, built from the same parts
(`components/FloatingSearchBar.tsx` — sticky blurred bar, input line with the hamburger
folding away as you type, dimmed backdrop, scope pills, result rows; `SearchHighlight.tsx`
marks the matched run), so searching here feels like searching anywhere else in the app.

It behaves like the wiki's too: a query is **a question with answers**, not a filter that
quietly thins the page behind the bar. Typing opens a list and picking a row goes to the
thing — a table or the Assumptions Bank to its page (`places`, listed first, and for a reader
without the Preview the only answers), a publisher to their page, a document into `ConceptPopup`. Publishers and documents are listed apart and each matches **on its own account**
(`searchSources`): on the shelf a publisher that matched answers with its whole catalogue,
but in a list of results a document that only matched because its publisher did is a row
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
the document's kind and date, **Read the document** (the same `ConceptPopup` Sources opens it
in), and what it supplies (`SourceResource.assumptions`, each with its locator) — and putting
it on a board adds it to the library, as **Add** does on its card.

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
quiz/src/lib/dataSources.ts           Data Sources' sections and addresses
quiz/src/lib/coworkSources.ts         entity/resource types (a resource's table), search,
                                      filters, library reducers
quiz/src/lib/coworkContent.ts         wiki-bundle + virtual-file registration (side effects)
quiz/src/lib/workflow*.ts             Workflows: the model, grid, CSV/table mapping, brief
quiz/src/data/coworkSources.ts        the seed catalogue (entities + resources)
quiz/src/data/coworkDocs.ts           the sample documents' markdown bodies
quiz/src/hooks/useCoworkLibrary.ts    library persistence (ids only)
quiz/src/hooks/useWorkflows.ts        workflow persistence
quiz/src/lib/coworkCovers.ts          a resource card's vault cover, looked up (pure)
quiz/src/components/FloatingSearchBar.tsx  the shared search-bar chrome (with the wiki's)
quiz/src/components/SearchHighlight.tsx    the shared marked-match run
quiz/src/components/cowork/           Data Sources' UI (EntityCard, EntityLogo, ResourceCard,
                                      CoworkTopBar — the page's search bar, …)
quiz/src/components/workflow/         the board, the + menu, a step's and a line's panels
quiz/src/pages/DataSources/           index (sections, routing) + Publishers / Documents / a publisher's page
quiz/src/pages/WorkflowBuilder.tsx    Workflows: the library (/workflows) and a board (/workflows/:id)
quiz/e2e/data-sources.spec.ts         the sidebar, Data Sources' sections and the old links' redirects
quiz/e2e/workflow.spec.ts             Workflows, including a source's table linked into a tool
```

Every `lib/cowork*.ts` module is pure and has a `*.test.ts` beside it, in the repo's usual
style. The catalogue itself is tested too (`lib/coworkContent.test.ts`) — integrity checks
are the only thing standing between seed data and a row that quietly lies to a reader.
