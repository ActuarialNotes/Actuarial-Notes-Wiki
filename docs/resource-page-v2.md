# Resource page v2: the Reference Card

Status: **phase 1 built 2026-11-11**; phases 2–4 proposed (roadmap §3.4, *C-RP2*). Decisions
D-RP1 to D-RP4 settled with their defaults. This is the build plan for the
resource-page redesign chosen from three mock-ups (the canvas *Resource page redesigns*, frames
3 and 3b). It changes how a resource page is **drawn**, and adds two things the page can
**say**. The standard in `docs/resource-pages.md` still holds: a resource page says only what its
document says, and names where it read it. Nothing here asks a page to say more than that.

## 1. What changes, and why

A phone review of `A First Course in Probability (Ross - 2019)` (2026-11-10) found:

1. **The syllabus assignment is a block of text.** "Chapter 5 (exclude 5.6.2, 5.6.3, 5.6.5, 5.7);
   Chapter 6: 6.1, 6.2, …" is the most useful thing on the page for a candidate, and they have
   to compare each exclusion with the outline below it themselves.
2. **The outline doesn't know about the syllabus.** 4.8.4 looks the same as 4.8.3.
3. **The outline is most of the page.** The Ross page is 165 lines, and nearly all of them are
   the table of contents. A reader looking for what the book is, and how to get it, scrolls past
   all of it.
4. **Headings with nothing under them.** 453 of the 808 resource pages have at least one `##`
   heading with no content (2,331 in all), such as *Preface*, *Index* and *Answers to Selected
   Problems*.
5. **The popup's title bar shows the file name**, cut off: "A First Course in Probability (…".

The Reference Card answers these in this order: what the document is, how to get it, why a
candidate reads it, what is new in this edition, where the vault uses it, and then the contents,
folded. The syllabus row opens the contents with that exam's assignment marked on it.

## 2. The page, top to bottom

| # | Block | Source | Today |
|---|---|---|---|
| 1 | **Header**: cover, `Type` kicker, `Title`, `Authors` | frontmatter | `ResourceMetaCard` (cover + pills) |
| 2 | **Actions**: *Get a copy*, or *Read PDF* when `Available from` is a PDF the proxy serves; the Fact Check pill | frontmatter, `verification:` | inside `ResourceMetaCard` / the article's badge |
| 3 | **Facts**: a grouped list with Edition and Year, Publisher, `Code`, ISBN, then one **Syllabus** row per exam | frontmatter, the syllabus callout | pills; `ResourceSyllabusCard` |
| 4 | **Lead**: the page's opening paragraph | body | the same |
| 5 | **New in this edition** (only when the page has the callout, §5) | `> [!info] New in this edition` | not present |
| 6 | **Where it's used**: exam pages, concept pages, questions, tools (a row only when its count is above 0) | build-time index (§4) | not present |
| 7 | **Contents**: folded when long, with an *All / Exam …* chip row when the page is on a syllabus | the document's divisions | the article body |
| 8 | **Related readings**, **Sources** | body | the same |

Both places a resource page is read draw it: the page route (`pages/wiki/WikiResource.tsx`) and
the concept popup (`components/wiki/ConceptPagePanel.tsx`, where the screenshots were taken).
They already share `ResourceMetaCard`, `ResourceSyllabusCard` and `preprocessResourceMarkdown`,
so the new blocks are one component they both mount, `ResourceReferenceCard`, with a `compact`
prop for the popup, the same way `ResourceSyllabusCard` already works.

The SEO static page (`lib/seoPrerender.ts`) and the AI connector's export keep the **whole**
outline. Folding is a choice made on screen; crawlers and assistants still read every heading.
The Listen view reads the article as it does now.

## 3. Phase 1: the layout (built 2026-11-11)

**Goal:** blocks 1–4, 7 and 8 drawn from what the page and its frontmatter already hold.

What was built, and where it departs from the first plan:

- **Contents are folded in the rendering, not cut out of the markdown.** `lib/resourceContents.ts`
  is a rehype plugin (`rehypeResourceContents`, run by `WikiArticle` on every resource page, after
  `rehypeOutlineItems`). It gathers the `##` divisions before `## Related readings` / `## Sources`
  into one `<section class="resource-contents">`. When the outline holds more than 12 rows
  (list items, paragraphs and empty headings; `CONTENTS_FOLD_AT`, decision D-RP1), each chapter
  becomes a native `<details>`, which opens on its own. Keeping one article, rather than
  splitting the page into several, keeps the heading anchors, the concept highlight, math focus
  and the article's link handling as they were. Both places that scroll to something inside the
  article now open a folded chapter first (`openAncestorDetails` in `ConceptPagePanel`, and
  `useConceptHighlight`).
- **Front and back matter is folded by name, not by shape.** A survey of the vault showed that
  "empty and unnumbered" also catches real divisions (*Executive Summary*, *Appendix D The
  Marriage of ERM and DFA*, *Exhibit 1 …*). Only headings named on a list (`isMatterHeading`:
  Preface, Foreword, Index, References, Bibliography, Acknowledgements, Glossary, Answers to
  Selected Problems, …) are folded into "Also included: …". They must also be empty, sit before
  the first numbered division or after the last one, and be on a page with numbered chapters
  (`isChapterHeading`: an appendix label alone doesn't count).
- **The count says chapters only when they are numbered**, and counts only those: the Ross page
  reads "10 chapters", with its two endpaper tables as rows beside them.
- **The fold falls where the rule puts it.** Of the 808 resource pages, 505 fold, 129 stay open,
  and 174 have no divisions at all. Most ASOPs fold: their sections hold more than 12
  paragraphs and items.
- `components/wiki/ResourceReferenceCard.tsx`: the header (cover, `Type`, `Title`, authors), the
  actions (`ResourceCopyAction`, now exported from `ResourceMetaCard.tsx`, and the Fact Check
  pill, D-RP3), and one grouped list of the facts (`resourceFacts` in `lib/resourceMeta.ts`) with
  a row per exam at its foot. `ResourceMetaCard` stays as the card the shelves and the Fact
  Check panel draw.
- `ResourceSyllabusCard` became `SyllabusAssignmentRow`, a row of that list. It still opens to
  the syllabus wording and the study guide, until phase 4 marks the contents.
- The popup's title bar shows the document's `Title`, not its file name.

**Tests:** `lib/resourceContents.test.ts` (the fold, the matter list and the count, and every
resource page in the vault keeping every heading and every word),
`components/wiki/ResourceReferenceCard.test.tsx`, and `e2e/wiki.spec.ts` (*resource page*: the
Ross page folds and a chapter opens; a short outline stays open).

## 4. Phase 2: "Where it's used"

**Goal:** block 6, a small build-time index, never read from the questions chunk at run time.

- `virtual:resource-backlinks` (new vite plugin beside `wikiContentPlugin`), built by
  `lib/resourceBacklinks.ts` (pure, relative imports, like `resourceExams.ts`):
  - **exams**: `buildResourceExamMap`, which already exists;
  - **concepts**: concept pages whose body links `[[<resource name>]]`;
  - **questions**: questions whose `verification.sources` cite the work. The match is
    `matchSourcePage` from `lib/factCheckSources.ts`, which is strict and one-directional, so
    nothing is attributed by a loose match. Only ids are stored. That module imports through
    `@/` aliases, which the vite config's Node graph can't resolve, so its matching half moves
    to a relative-import module first (the same move `resourceExams.ts` made);
  - **tools**: `lib/tools/fixtures/*.json` `source.resource`, and Assumptions Bank sets whose
    `Source:` is the page.
  Shape: `{ [resourceName]: { exams, concepts, questions: string[], tools } }`. It holds ids, not
  text, so it stays small. `npm run size` must stay green.
- Each row opens a sheet listing its items: exam and concept rows open the page, question rows
  use `QuestionSearchRow` with the attempts badge, and tool rows open the tool. A row with
  nothing behind it isn't drawn. A count of 0 is never printed.
- The AI connector's export (`lib/knowledgeBase.ts`) is left alone: assistants already read the
  links, so the index is for the screen only.

**Tests:** `resourceBacklinks.test.ts` over the vault: every id resolves, and a resource with a
known citation (Werner & Modlin ↔ its fixture and questions) is found.

## 5. Phase 3: "New in this edition"

**Goal:** block 5, written only where the document says what changed.

- A new optional callout, placed straight after the lead: `> [!info] New in this edition`, one
  bullet per change in the document's words, each bullet ending with its section number when the
  document gives one. The locator (for example, *Preface, p. x*) goes in `## Sources`, as every
  other claim's does.
- `extractEditionChanges` in `lib/resourceMeta.ts` lifts it out, the way
  `extractSyllabusAssignments` lifts the syllabus callout, and the card draws it as a list.
- `scripts/resource_lint.py`: allow the callout only in that place, require at least one bullet,
  and require a preface or contents source among `## Sources`. `--fix` leaves it alone.
- The `resource-pages` skill gains the rule: write it **only** from a preface, a publisher's
  "What's new" page or a revision note; never infer it by comparing tables of contents.
- **Candidates:** 11 pages already state what their edition adds in the lead (the Ross page among
  them). Moving that sentence into the callout edits the page, so its fact check goes `stale`
  (P4). Do them as one batch and re-verify them as one packet (`docs/verification-plan.md`),
  not one at a time.

## 6. Phase 4: the syllabus marked on the contents

**Goal:** frame 3b. The syllabus row (or the exam chip above Contents) shows the contents with
that exam's assignment marked.

- `lib/readingAssignment.ts` (new, pure): turns a reading line ("Chapters 1, 2 and 3; Chapter 4
  (exclude 4.8.4); Chapter 6: 6.1, 6.2, 6.3.3 …") into `{ chapter → 'all' | { include?, exclude? } }`,
  plus the clauses it couldn't read (*"discrete only"*). It never guesses: an unread clause
  leaves that chapter **unmarked**, and the wording is shown beside it.
- `markOutline` in `resourceMeta.ts` gains an `assignment` option: each `li.outline-item` whose
  label is excluded gets `data-assigned="out"` (struck through, in a muted colour that still
  passes 4.5:1), and each chapter heading gets its tag (*All*, *All but N*, *N in*, *N out*,
  *Partial*, *Not assigned*).
- `ResourceContents`: an **All / Exam …** chip row (one chip per exam on the syllabus), the
  coverage strip (one segment per chapter, filled by the share of its numbered items
  assigned), and *Syllabus wording* as a disclosure. The chosen exam rides the URL (`?exam=P`),
  so a link from an exam page's Source Material shelf can open the book already marked.
- **The coverage test** (`readingAssignment.test.ts`): every Source Material line on every exam
  page either parses completely **and** names only section numbers that exist in the resource's
  outline, or is listed in a committed allowlist of lines that stay unmarked. That allowlist can
  only shrink. A wrong number in an outline or in a transcribed syllabus fails this test, which
  makes it a second check on both.
- Exam pages: the shelf's card (`SourceMaterialGallery`) links to the resource with `?exam=`.

**Docs:** `docs/resource-pages.md` (the marks are derived, never authored on the resource page).

## 7. Order, size and what isn't in scope

| Phase | Ships | Rough size | Depends on |
|---|---|---|---|
| 1 Layout | header, facts, folded contents, title bar | M | — |
| 2 Where it's used | backlinks index + sheets | M | 1 |
| 3 New in this edition | callout, lint rule, 11 pages re-verified | S code + a fact-check batch | 1 |
| 4 Syllabus marks | parser, marks, chips, coverage test | M–L (the wording's long tail) | 1 |

Phases 2, 3 and 4 are independent of one another once 1 is in. 4 has the most reader value and
the most risk, so start it as soon as 1 lands.

**Not in scope:** reading progress, mastery or chapter quizzes (the *Study Companion* option,
not chosen). The shelves' resource cards (`ResourceMetaCard` stays). Cowork's source pages, which
open the same page in `ConceptPopup` and so inherit the change without their own work.

## 8. Decisions for the maintainer

| Id | Question | Default if not answered |
|---|---|---|
| D-RP1 | How long an outline is before Contents starts folded | More than 12 items. **Settled 2026-11-11: default.** |
| D-RP2 | For an official document with a PDF, is *Read PDF* the primary action and *Get a copy* hidden? | Yes: *Read PDF* primary; *Get a copy* only with an ISBN. **Settled: default.** |
| D-RP3 | Does the Fact Check pill sit in the actions row (as in the mock-up) or stay at the article's foot? | Actions row. **Settled: default.** |
| D-RP4 | Does an exam page's Source Material card link open the resource already marked (`?exam=`)? | Yes. **Settled: default.** |
