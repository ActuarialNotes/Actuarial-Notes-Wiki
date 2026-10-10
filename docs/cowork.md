# Cowork

**Cowork** is the second product under the Actuarial Notes roof. Where Study Mode is for
someone preparing to *become* an actuary, Cowork is for someone doing the work: following
the entities that publish what they work from, and building the workflows that turn what
those entities publish into the work.

It is in **Preview**, gated by `COWORK_ENABLED` in `quiz/src/lib/featureFlags.ts`, and
while it is in Preview it is open **only to approved accounts** — `PREVIEW_APPROVED_EMAILS`
in `quiz/src/lib/appMode.ts` (today, `jordan@actuarialnotes.com`). To everyone else it does
not exist: no mode pill, and `/cowork` redirects to the dashboard. Once it leaves Preview it
is Pro-only.

The one exception is the e2e suite's build: `VITE_COWORK_PREVIEW=on` (playwright.config.ts)
sets `COWORK_OPEN_TO_ALL`, which passes `previewOpen` to every mode check, so Sources and
Workflows are tested from a signed-out browser — Actuaria's preview override, for Cowork. No
deployed build sets it.

---

## 1. Modes

The two products are **places**, not tabs of each other: different navigation, different
content, different readers. `quiz/src/lib/appMode.ts` is the one definition of what a mode
is — its label, its home, the routes it owns, what it takes to enter it, and whether it is
in preview. Three surfaces read it and none of them re-decides any of it:

- `components/ModeSwitcher.tsx` — the pill beside the wordmark. **Green** in Study,
  **violet** in Cowork. The green is a deliberate exception to the style guide's semantic
  palette (§2.2: green is *correct*): here it is a place marker, and nothing on the header
  row can be answered right or wrong. The pill portals to the body and is placed by
  `lib/menuPlacement.ts`, like every other menu in the app. It is drawn only when the
  viewer can see more than one mode (`showsModeSwitcher`) — a Preview mode is visible to
  approved accounts alone, so for everyone else there is no pill at all.
- `components/Sidebar.tsx` — which nav rows exist. In Cowork the rows are Cowork's two
  places, and they are the **only** switch between them: the page carries no tab row, the
  same as every route in Study mode. (The Sources row stays lit on a source's own page —
  `forceActive`.) The footer (theme, sound, account) belongs to neither mode and stays put.
- `App.tsx` — `RequireMode` guards the `/cowork` tree. A mode whose pill is hidden but
  whose URL lets anyone in is the one bug here a reader would find by typing an address, so
  the route enforces `canEnterMode`, not just the pill. It waits for
  `useSubscription().loading` to settle first — bouncing a real subscriber away for one
  frame is a bug they would see on every visit.

A locked mode's destination is `modeDestination`: the dashboard for a Preview mode the
viewer isn't approved for (it doesn't exist for them), otherwise `/auth` when signed out and
`/upgrade` when signed in without Pro. The pill and the URL give the same answer because
they call the same function. The approval list is a UI gate, not a security boundary —
Cowork's catalogue is bundled seed data and its stores are localStorage, so there is no
server data behind it to guard.

Adding a third mode is one entry in `APP_MODES` plus its routes.

---

## 2. The loop

```
  Sources ──► Library ──► Workflow ──► Connect ──► Run ──► Run in Claude
 (who publishes)         (sources, data,  (what flows   (live, on the   (the brief, for
                          calculations,    into what)     tools engine)   the connector)
                          concepts)
```

Two places, chosen in the sidebar: **Sources** (`/cowork`, a source's page at
`/cowork/sources/:id`) and **Workflows** (`/cowork/workflows`). Workflows replaced the
Deliverables place that used to stand second — a scoping wizard whose exports carried
structure and blank value cells — with the board that was the Tools tab's *Workflow Builder*,
because a workflow does what a deliverable only described: it runs.

### Sources

A source is an **entity**, not a document. An actuary does not follow "documents", they
follow *publishers* — OSFI, FSRA, the CIA, a competitor's annual report, one trade paper —
and take whatever those publish. So the card is the publisher and its action is **Follow**.

**A source is a page**, at `/cowork/sources/:id`, the way an exam's study guide is a page:
the publisher's logo in the sticky header, their description and Follow control below it,
and their whole catalogue under that as cards, each with its own **Add**
(`pages/Cowork/SourcePage.tsx`). The shelf at `/cowork` is publishers only — a catalogue
folded inside a card on a shelf could not be linked to or scrolled on its own.

The mark in the header and on the card is the publisher's **own** logo, hotlinked from
their site and authored on the entity (`SourceEntity.logo`), transcribed from their own
markup rather than guessed from their domain — and never drawn by us, because an
approximated logo is an invented brand. A publisher with no usable mark, and a mark that
fails to load, fall back to the monogram tile (`components/cowork/EntityLogo.tsx`).

**Documents are always cards, never rows.** One component draws them everywhere they are
listed — the shelf's Documents view and a source's page — and it is the study guide's
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

### Two filters, and the library is one of them

The shelf's **primary** filter is *Sources or Documents*, because those are two different
questions and each is answered by a different card. Everything else — the query, the
category pills, the library — means the same thing in both views.

**My Library leads the secondary row.** It is a filter, not a section: it narrows the shelf
to publishers the reader follows (Sources) or documents they have taken (Documents). It used
to be a block stacked above the shelf, which made what a reader *had* a different place from
what they *could have*, pushed the filters below the fold, and showed the same card in both
its states on one screen. An empty array is a library with nothing in it and matches nothing;
`undefined` is the filter switched off — `lib/coworkSources.ts` turns on that distinction and
the tests pin it.

### Search

The bar is the wiki's floating search, built from the same parts
(`components/FloatingSearchBar.tsx` — sticky blurred bar, input line with the hamburger
folding away as you type, dimmed backdrop, scope pills, result rows; `SearchHighlight.tsx`
marks the matched run). Cowork is a second product, not a second design system, and searching
should not feel like a different app one mode over.

It behaves like the wiki's too: a query is **a question with answers**, not a filter that
quietly thins the page behind the bar. Typing opens a list and picking a row goes to the
thing — a publisher to their page, a document into `ConceptPopup`. Publishers and documents are listed apart and each matches **on its own account**
(`searchSources`): on the shelf a publisher that matched answers with its whole catalogue,
but in a list of results a document that only matched because its publisher did is a row
nobody asked for, under the row that opens the page it is already on. Scope is **This
Source** (on a source's page) or **Everywhere**, mirroring the wiki's *This Page* /
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

- A resource with a **`wikiRef`** *is* a vault page. Its title, content and fact-check record
  are the wiki's. There are ~20 of them and `lib/coworkContent.test.ts` asserts every one
  resolves to a file that is actually in the vault — a renamed page would otherwise leave a
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

**Replacing a sample with real documents is the shape of the next phase.**

Which publisher comes next, and why, is kept in `docs/cowork-source-inventory.md` — the
prioritised backlog behind this catalogue, including the vault pages that are already
citable and only need a `wikiRef`.

---

## 4. There is no second reader

Requirement 1 was "the core interactivity is the same as in Study Mode. Resources open in
the popup viewer." The way that is kept is by not building a second viewer at all.

A Cowork resource opens in `ConceptPopup` — the same split pane the study guide reads a
concept in, with the same page stack, the same action menu, the same fact-check record and
the same Previous/Next walk. Cowork's own sample documents are registered as **virtual vault
files** at vault-shaped paths (`lib/coworkContent.ts` → `registerVirtualWikiFiles` in
`lib/github.ts`), so `ConceptPagePanel` fetches one, `WikiArticle` renders it, and its
`[[wiki links]]` resolve into the vault. They are authored with `Resources/Books`-style front
matter so they get the same `ResourceMetaCard` a vault resource page leads with.

Anything that would need a bespoke viewer should become a page at a vault-shaped path
instead.

`lib/coworkContent.ts` also installs the **wiki bundle** lookup. `WikiLayout` does this for
the wiki routes, but Cowork never mounts `WikiLayout` — without it a source card opened onto
"Couldn't load …" for anyone behind a rate limit, an outage or no connection, which is the
same failure `virtual:exam-pages` exists to prevent. Both callers hand over the same bundle,
so the two registrations are idempotent.

One known gap: `virtual:wiki-content` carries `Concepts/`, `Resources/Books/`, the exam pages
and `Guides/` — **not** `Resources/Regulation/` or `Resources/Benchmarks/`. A Cowork resource pointing there still falls
back to a GitHub fetch, exactly as the Research tab's timeline cards already do.

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
an argument. That is not ceremony: the sidebar imports the store to badge the Sources row,
so a `data/cowork*` import inside it would drag the whole catalogue out of Cowork's lazy
chunk and into the main bundle, for every reader in Study mode. For the same reason the
Workflows row carries no count: the workflow store reads the tools engine.

---

## 6. Where things are

```
quiz/src/lib/appMode.ts               modes: labels, routes, Pro gating, preview
quiz/src/lib/coworkSources.ts         entity/resource types (a resource's table), search,
                                      filters, library reducers
quiz/src/lib/coworkContent.ts         wiki-bundle + virtual-file registration (side effects)
quiz/src/lib/workflow*.ts             Workflows: the model, grid, CSV/table mapping, brief
quiz/src/data/coworkSources.ts        the seed catalogue (entities + resources)
quiz/src/data/coworkDocs.ts           the sample documents' markdown bodies
quiz/src/hooks/useCoworkLibrary.ts    library persistence (ids only)
quiz/src/hooks/useWorkflows.ts        workflow persistence
quiz/src/components/ModeSwitcher.tsx  the mode pill
quiz/src/lib/coworkCovers.ts          a resource card's vault cover, looked up (pure)
quiz/src/components/FloatingSearchBar.tsx  the shared search-bar chrome (with the wiki's)
quiz/src/components/SearchHighlight.tsx    the shared marked-match run
quiz/src/components/cowork/           Sources' UI (EntityCard, EntityLogo, ResourceCard,
                                      CoworkTopBar, …)
quiz/src/components/workflow/         the board, the + menu, a step's and a line's panels
quiz/src/pages/Cowork/                index (routing) + Sources shelf / a Source's page
quiz/src/pages/WorkflowBuilder.tsx    Workflows, at /cowork/workflows
quiz/e2e/cowork.spec.ts               the mode, its two places and the old links' redirects
quiz/e2e/workflow.spec.ts             Workflows, including a source's table linked into a tool
```

Every `lib/cowork*.ts` module is pure and has a `*.test.ts` beside it, in the repo's usual
style. The catalogue itself is tested too (`lib/coworkContent.test.ts`) — integrity checks
are the only thing standing between seed data and a row that quietly lies to a reader.
