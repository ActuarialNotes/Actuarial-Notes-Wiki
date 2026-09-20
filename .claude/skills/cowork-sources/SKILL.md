---
name: cowork-sources
description: Add a publisher or a document to the Cowork source catalogue (quiz/src/data/coworkSources.ts) — the entities a Cowork reader follows and the documents they take into a library. Use when asked to add, extend, populate or fix a Cowork source, publisher, entity or document ("add OSFI to Cowork", "add the CIA's educational notes as a Cowork source", "put the MCT guideline in the Cowork catalogue", "replace the Intact sample with the real annual report", "populate the Cowork corpus"), and whenever a new Resources/Books page should also be reachable from Cowork. Not for Study-mode wiki pages on their own — writing the Resources/Books page itself is actuarial-concept-definitions, and its chapter outline is textbook-toc.
---

# Cowork Source Catalogue

Cowork's **Sources** half is a catalogue of *publishers* and what they publish. A
reader follows an entity, takes documents into a library, and attaches those
documents to a deliverable — where each one contributes assumption rows that name
it as their basis.

Read `docs/cowork.md` once for the design. This file is the operating procedure.

The catalogue is authored seed data, not vault content:

```
quiz/src/data/coworkSources.ts   COWORK_ENTITIES (publishers) + COWORK_RESOURCES (documents)
quiz/src/data/coworkDocs.ts      COWORK_DOCS — the markdown body of each sample document
quiz/src/lib/coworkSources.ts    the types, the closed category/kind lists
quiz/src/lib/coworkContent.test.ts   the integrity checks every entry has to pass
```

---

## The rule that decides everything: nothing is invented

Cowork's whole value is that a deliverable can name what supports every row in it.
A catalogue entry carrying a plausible-but-unread date, link, logo or founding year
puts a citation into an export that nothing supports — the same failure as an
invented pass rate or an invented examiner's report link
(`docs/verification.md`, `docs/mock-exam-browser.md`).

**Provenance is transcribed, never constructed.** Every field below is either read
off the publisher or absent. A blank field is always a legitimate answer; a guessed
one never is.

---

## Step 1 — decide which of the two kinds of entry you are adding

This is the first decision and it is not negotiable, because the tests enforce it
both ways. There are exactly two:

| | **A real document** | **A sample** |
|---|---|---|
| Marked | `wikiRef: {…}` | `sample: true` + `docPath: docPath(entity, slug)` |
| Names | one particular published document | a *class* of document a publisher issues |
| `published` | its real date, or `null` | **must** be `null` |
| `url` | the publisher's own link, or absent | **must** be absent |
| Body lives in | the vault, as a `Resources/` page | `data/coworkDocs.ts` |

**There is no third option.** `coworkContent.test.ts` asserts that every `docPath`
entry is `sample: true` and that no `wikiRef` entry is a sample. So:

> **To add a real, citable document to Cowork, it has to be a vault page.**
> Author the `Resources/Books/*.md` page first (that is the
> `actuarial-concept-definitions` skill, with `textbook-toc` for its outline), then
> point a `wikiRef` at it here.

That is the intended path and it is what "replacing a sample with real documents"
means in `docs/cowork.md`. Do **not** work around it by inventing a `docPath`
document with a date on it.

### Addressing a vault page

`wikiRef` is resolved by `entryRefToRepoPath` (`lib/wikiRoutes.ts`), and `name` is
the **filename without `.md`**, not the authored `Title:`:

| `kind` | resolves to | in the wiki bundle? |
|---|---|---|
| `resource` | `Resources/Books/<name>.md` | **yes** — opens offline |
| `regulation` | `Resources/Regulation/<name>.md` | no — falls back to a GitHub fetch |
| `event` | `Resources/Events/<name>.md` | no |
| `concept` | `Concepts/<name>.md` | yes |

**Prefer `kind: 'resource'`.** `virtual:wiki-content` carries only
`Resources/Books/` out of the `Resources/` tree, so a `regulation` or `event` ref
opens over the network — which is the one gap `docs/cowork.md` §4 names, and it
fails for a reader behind a rate limit or offline. ASOPs, OSFI guidelines and
statements of principles all live in `Resources/Books/` for exactly this reason.

A ref that does not resolve to a real file fails the test suite, so a renamed vault
page breaks the build rather than quietly opening an empty panel. That is
deliberate — fix the ref, don't loosen the test.

---

## Step 2 — the entity

An entity is a publisher, and **an entity with no documents fails the tests**
("gives every entity at least one document to publish"). Add the publisher and at
least one of its documents in the same change.

```ts
{
  id: 'pacicc',                       // kebab-case, unique, stable — it is the URL
  name: 'Property and Casualty Insurance Compensation Corporation',
  short: 'PACICC',                    // 2–6 characters, or the monogram won't fit
  category: 'industry-data',          // closed list — see below
  jurisdiction: 'Canada',             // where its writ runs: "Ontario", "Global"
  about: 'One paragraph: who they are and why an actuary reads them.',
  site: 'https://www.pacicc.ca',
  /** transcribed: founded 1988 */
  established: '1988',
  logo: 'https://www.pacicc.ca/…/apple-touch-icon.png',
  practiceAreas: ['pc', 'erm'],
}
```

**`category`** is one of `regulator`, `standards`, `insurer`, `industry-data`,
`consulting`, `media` (`ENTITY_CATEGORIES`). It drives the shelf's filter pills and
the monogram's tint. Adding a seventh is a type change plus an entry in that array
plus a tone in `components/cowork/EntityLogo.tsx` — do it deliberately, not to
avoid choosing.

**`short`** must be 2–6 characters. `EntityLogo` steps the type down to 0.19 of the
tile's edge at six; past that a monogram stops fitting the square.

**`established`** is a bare `YYYY`, never a range or a full date, never in the
future, and it is the year *this body* came into being — not the year its business
began. Intact Financial Corporation dates from **2009** though the Halifax
Insurance Company it grew out of dates from 1809. Cite it in a comment above the
field, the way the existing entries do. **No record worth citing, no pill** — omit
the field.

**`logo`** is the publisher's own mark, hotlinked from their own site. Transcribe
it, never construct it:

```bash
python3 .claude/skills/cowork-sources/scripts/fetch_logo.py https://www.pacicc.ca
```

The script reads their `<link rel="icon">` / `apple-touch-icon`, ranks the
candidates, checks each one is https, is on the same hostname as `site`, and
actually loads as an image — the three things the test enforces — and prints the
field ready to paste.

Never guess `/favicon.ico`, never use a third-party icon service (Clearbit, Google
S2), and never draw one: **an approximated logo is an invented brand**, the same
mistake as an invented citation. If the script finds nothing usable, **omit
`logo`** — `EntityLogo` falls back to the monogram tile, which is a designed
outcome, not a degraded one. A logo that 404s later falls back the same way.

---

## Step 3 — the resource

```ts
{
  id: 'osfi-mct',                     // kebab-case, unique across the catalogue
  entityId: 'osfi',                   // must match an entity's id
  title: 'Minimum Capital Test (MCT) guideline',
  kind: 'guideline',
  published: '2024',                  // 'YYYY' | 'YYYY-MM-DD' | null
  summary: 'One line: what the document is and what it settles.',
  wikiRef: { kind: 'resource', name: 'OSFI MCT' },
  practiceAreas: ['pc', 'erm'],       // at least one — the test checks
  functions: ['capital', 'financial-reporting'],
  assumptions: [ /* step 4 */ ],
}
```

**`kind`** is one of `textbook`, `standard`, `regulation`, `guideline`, `bulletin`,
`filing`, `report`, `news`, `dataset` (`RESOURCE_KINDS`). It sets the card's icon
and the type filter, and it is a pill on the card — so pick the one a reader would
filter by, not the one closest to the title.

**`published`** is a bare year when only a year is published, a full ISO date when
a full date is, and `null` when the document is undated or you have not read a date
off it. It sorts newest-first with undated last, and a bare year sorts *behind* a
dated document in the same year — an undated-within-the-year document is the older
one. Never date a document from the year its neighbours carry.

**`practiceAreas`** and **`functions`** are the facet axes from `lib/coworkFacets.ts`:

- practice areas — `life`, `pc`, `pensions`, `erm`
- functions — `pricing`, `underwriting`, `reserving`, `capital`,
  `financial-reporting`, `advisory`

They are how a document surfaces against a deliverable being scoped, so list what
the document is genuinely used *for*, not everything it touches. An entity carries
`practiceAreas` only; functions belong to documents.

---

## Step 4 — assumptions: the mechanical half of "it populates itself"

Attaching a document to a deliverable adds its `assumptions` rows to the
assumptions register, each naming the document as its basis. This is where the
"nothing is invented" rule bites hardest:

```ts
assumptions: [
  { label: 'Supervisory target MCT ratio', value: '150%', locator: 'Guideline, s. 1.2' },
  { label: 'Internal capital target',                     locator: 'ORSA report, capital section' },
]
```

- **`value` is optional, and omitting it is the point.** A document supplies the
  *row* — what the analysis needs and where it is read from — far more often than
  it supplies a number. A blank value with a locator is the honest form of
  "populated": the analysis knows what it needs and does not invent it.
- **Only give a `value` you have read in the document.** `150%` is there because
  the MCT guideline prints it. A figure the reader must take from their own data
  never gets one.
- **`locator` says where in the document it is read from** — a section, a table, a
  page. It is what makes the export auditable.
- A **sample's** assumptions carry locators and essentially never values, because a
  sample names no particular document to have read a number from.

---

## Step 5 — only if it is a sample: write the body

A sample needs a body in `data/coworkDocs.ts`, keyed by exactly the `docPath()` its
resource names. It is registered as a **virtual vault file**
(`lib/coworkContent.ts`) and opens in `ConceptPopup` — the same reader the study
guide uses. There is no second viewer, so anything that seems to need one becomes a
page at a vault-shaped path instead.

Author it with `Resources/Books`-style front matter so it gets the same
`ResourceMetaCard`, and open with the callout:

```markdown
'Cowork/Sources/<entityId>/<slug>.md': `---
Title: "Auto rate filing bulletins"
Author: "Financial Services Regulatory Authority of Ontario"
Publisher: "FSRA"
Type: "Regulatory bulletin series"
Available from: "[fsrao.ca](https://www.fsrao.ca)"
---

> [!info] Sample entry
> Cowork does not carry FSRA's bulletin archive yet. This page describes the
> series so a deliverable can be scoped against it; cite the specific bulletin
> in force at your filing date.

<what this class of document contains>

## What a filing takes from it

- **The filing path.** …

## How it is used in a deliverable

…

Related: [[FSRA Filing Specifications for SABS Optionality (2025)]].
`,
```

The body says what that *class* of document contains, what an actuary takes out of
it, and where to get the real thing — the part that is true. It carries **no
figures, no dates and no link it cannot support**. `[[wiki links]]` resolve into
the vault, so link the vault pages that do exist.

The literal string `Sample entry` is required by the tests: it is what stops a
sample being cited as a document.

---

## Step 6 — run the gates

```bash
cd quiz
npm test -- coworkContent     # the catalogue's integrity checks
npm run build                 # tsc: a bad facet or kind is a type error
npm run lint
```

`coworkContent.test.ts` is the thing standing between seed data and a row that
quietly lies to a reader. It checks, among others, that:

- every resource's `entityId` names a listed entity, and every entity publishes
  something;
- ids are unique, and every resource opens something (`resourceEntryRef` non-null);
- every `docPath` has a body and every body is referenced — no orphans either way;
- every `docPath` entry is a sample and no `wikiRef` entry is;
- **no sample carries a date or a link**;
- every `wikiRef` resolves to a file that is actually in the vault;
- every logo is https and on the entity's own hostname;
- `established` is a bare, non-future year; `short` is 2–6 characters.

If one fails, fix the entry — these checks are the feature's contract, not
friction.

---

## Checklist

- [ ] Real document → it is a vault page with a `wikiRef`; sample → `sample: true`,
      `docPath`, no date, no link
- [ ] `kind: 'resource'` (`Resources/Books/`) wherever the page can live there, so
      it opens from the bundle rather than the network
- [ ] Entity has at least one document, a 2–6 char `short`, and a transcribed
      `established` or none
- [ ] `logo` came from `fetch_logo.py` against the publisher's own site, or is absent
- [ ] Every `published` date was read off the document
- [ ] Assumption rows have locators; values only where the document prints them
- [ ] Sample body written, keyed by its exact `docPath`, opening with the
      `Sample entry` callout
- [ ] `npm test -- coworkContent`, `npm run build`, `npm run lint` all clean
