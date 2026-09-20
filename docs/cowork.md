# Cowork

**Cowork** is the second product under the Actuarial Notes roof. Where Study Mode is for
someone preparing to *become* an actuary, Cowork is for someone doing the work: following
the entities that publish what they work from, and turning what those entities publish into
the analyses, reports and documentation they produce.

It is **Pro-only** and in **Preview**, gated by `COWORK_ENABLED` in
`quiz/src/lib/featureFlags.ts`.

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
  `lib/menuPlacement.ts`, like every other menu in the app.
- `components/Sidebar.tsx` — which nav rows exist. In Cowork the rows are Cowork's two
  places, and they are the **only** switch between them: the page carries no tab row, the
  same as every route in Study mode. (The Sources row stays lit on a source's own page —
  `forceActive`.) The footer (theme, sound, account) belongs to neither mode and stays put.
- `App.tsx` — `RequirePro` guards the `/cowork` tree. A mode whose pill says "Pro" but
  whose URL lets anyone in is the one bug here a reader would find by typing an address, so
  the route enforces `canEnterMode`, not just the pill. It waits for
  `useSubscription().loading` to settle first — bouncing a real subscriber to `/upgrade` for
  one frame is a bug they would see on every visit.

A locked mode's destination is `modeDestination`: `/auth` when signed out, `/upgrade` when
signed in without Pro. The pill and the URL give the same answer because they call the same
function.

Adding a third mode is one entry in `APP_MODES` plus its routes.

---

## 2. The loop

```
  Sources ──► Library ──► Deliverable ──► Scoping ──► Attach ──► Populate ──► Export
 (who publishes)        (analysis /     (multiple    (from      (assumptions   (.xlsx
                         report /        choice,      library)   + key          /.csv)
                         documentation)  step by                 details)
                                         step)
```

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
listed — the shelf's Documents view, a source's page, a deliverable's attached and
attachable sources — and it is the study guide's resource card
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
thing — a publisher to their page, a document into `ConceptPopup`, a deliverable to its
detail. Publishers and documents are listed apart and each matches **on its own account**
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

### Deliverables

One button starts one, bottom right, and it is the only way in
(`components/cowork/NewDeliverableFab.tsx`): pressing it opens the three types **in line**
above it, nearest first, and picking one creates the deliverable and opens it straight into
its scoping flow. The type is all that control asks — everything else is the scoping's to
ask, one question at a time, on the page it opens.

Three fundamental types, and the difference is what the deliverable is **for**:

| Type | What it is for | Output |
|---|---|---|
| **Analysis** | Work that reaches a number | An estimate and the exhibits behind it |
| **Report** | Work that tells someone the result | A narrative with the finding and what follows |
| **Documentation** | Work that records how it was done | A record another actuary could repeat |

Each is described by five **facets** (`lib/coworkFacets.ts`): practice area, function,
audience, driver and time orientation. They are the axes the browser filters on, and each is
optional — an unanswered facet reads as *unanswered*, never as a default nobody chose.

### Scoping

A short sequence of multiple-choice questions, authored as data in
`data/coworkDeliverables.ts` and sequenced by `lib/coworkDeliverables.ts`. One question at a
time is the point, not a layout preference: each answer changes what the next question can
sensibly ask, so a form showing every field at once would be showing fields that do not
apply and cannot yet know it.

Each option does three things at once, and that is the whole mechanism behind "it populates
itself":

- `facets` — pins down an axis.
- `assumptions` / `details` — adds rows, each carrying the question it came from as its
  basis.
- `exports` — opens up the exhibits that make sense for the resulting deliverable.

`when` makes a step conditional on earlier answers. Changing an earlier answer drops the
answers it unlocked (`answerStep`, which re-runs until it settles, so a chain of dependent
steps is pruned and not just the first), so the flow can be walked backwards without leaving
a deliverable carrying an assumption its scoping no longer asks for.

Status is **derived, never stored** — `draft` → `scoped` → `populated` — so a deliverable can
never claim a state its own contents contradict.

---

## 3. The rule that matters: nothing is invented

Cowork holds no experience data. Two consequences run through the whole feature and neither
is negotiable:

**Exports go out with their value cells empty.** An exhibit that arrived pre-filled would be
filled with numbers nobody measured, and a deliverable built on it would carry a figure with
no basis. What an export *can* carry honestly is structure: the right columns, the right
periods (calendar arithmetic off the as-of date — a fact, not an estimate), and every
assumption and source with the thing that supports it named. That is a working paper, ready
for data. `lib/coworkExport.ts` and its tests pin this.

**An assumption with no value stays visibly blank, with its locator.** `value` is optional on
`ResourceAssumption` and `AssumptionSeed` precisely so a document can supply the *row* — and
where in itself the number is read from — without supplying a number it does not state.

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
  deliverable that nothing supports. Its body says what that class of document contains and
  what an actuary takes out of it, which is the part that is true, and opens with a
  "Sample entry" callout. The row wears a `Sample` chip, and a sample carried into an export
  is flagged as one on the Sources sheet.

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
and `Guides/` — **not** `Resources/Regulation/`. A Cowork resource pointing there still falls
back to a GitHub fetch, exactly as the Research tab's timeline cards already do.

### The walk kind

`useConceptPopup`'s `openAt` takes `walk: 'syllabus' | 'corpus'`. Cowork passes `corpus`,
which drops the footer's syllabus-filter picker — for the same reason a guide walk drops it:
over a corpus of documents every filter it offers would be either a no-op or a lie about what
is being read.

---

## 5. The xlsx writer

`lib/xlsx.ts` is a minimal, dependency-free `.xlsx` writer: a ZIP of XML parts with a CRC-32
per entry, **stored** (uncompressed) so no deflate implementation is needed, and inline
strings so there is no shared-string table. It does no formulas and no styling beyond a bold
header row.

It exists rather than a dependency because the export is the last step of the loop and the
only thing that leaves the app — worth a few hundred bytes of arithmetic instead of ~700 KB
of SheetJS for a feature that writes cells and nothing else. `buildXlsx` is pure (`Sheet[]`
in, bytes out) and takes its timestamp as an argument, so the same workbook built twice is
byte-identical and the container is testable without a DOM.

---

## 6. Persistence

Both stores are **localStorage only**, deliberately, while Cowork is in Preview: the
catalogue and the scoping flows are seed data that will be replaced, and a server table keyed
to today's resource ids (or a stored answer keyed to today's questions) would be a migration
to write before the feature has been used.

Both hold **ids and nothing else**, and the calls that need the catalogue or the flow take it
as an argument. That is not ceremony: the sidebar imports both stores to badge the Cowork nav
rows, so a `data/cowork*` import inside them would drag the whole catalogue out of Cowork's
lazy chunk and into the main bundle, for every reader in Study mode. With the stores kept
clean, Cowork is an ~88 KB lazy chunk that a Study-mode reader never downloads.

---

## 7. Where things are

```
quiz/src/lib/appMode.ts               modes: labels, routes, Pro gating, preview
quiz/src/lib/coworkFacets.ts          the five facet axes, as data
quiz/src/lib/coworkSources.ts         entity/resource types, search, filters, library reducers
quiz/src/lib/coworkDeliverables.ts    the wizard engine + derivation (pure)
quiz/src/lib/coworkExport.ts          deliverable → workbook sheets
quiz/src/lib/coworkContent.ts         wiki-bundle + virtual-file registration (side effects)
quiz/src/lib/xlsx.ts                  the .xlsx / .csv writer
quiz/src/data/coworkSources.ts        the seed catalogue (entities + resources)
quiz/src/data/coworkDocs.ts           the sample documents' markdown bodies
quiz/src/data/coworkDeliverables.ts   the scoping flows, export specs, outlines
quiz/src/hooks/useCoworkLibrary.ts    library persistence (ids only)
quiz/src/hooks/useCoworkDeliverables.ts  deliverable persistence (ids + answers only)
quiz/src/components/ModeSwitcher.tsx  the mode pill
quiz/src/lib/coworkCovers.ts          a resource card's vault cover, looked up (pure)
quiz/src/components/FloatingSearchBar.tsx  the shared search-bar chrome (with the wiki's)
quiz/src/components/SearchHighlight.tsx    the shared marked-match run
quiz/src/components/cowork/           the mode's own UI (EntityCard, EntityLogo,
                                      ResourceCard, NewDeliverableFab, CoworkTopBar, …)
quiz/src/pages/Cowork/                index (routing) + Sources shelf / a Source's page /
                                      Deliverables / a deliverable's detail
quiz/e2e/cowork.spec.ts               the Pro lock, from a signed-out browser
```

Every `lib/cowork*.ts` module is pure and has a `*.test.ts` beside it, in the repo's usual
style. The catalogue itself is tested too (`lib/coworkContent.test.ts`) — integrity checks
are the only thing standing between seed data and a row that quietly lies to a reader.
