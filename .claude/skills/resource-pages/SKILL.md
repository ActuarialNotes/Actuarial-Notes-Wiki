---
name: resource-pages
description: Write or edit a Resources/Books source-material page — one real document (a textbook, study note, ASOP, OSFI guideline, paper) described only by what the document itself says, with the canonical frontmatter, a cover, an "On the syllabus" callout, the document's own divisions as headings and a Sources section. Use when the user asks to add, write, fix or restructure a resource page, a syllabus reading's page, or a Source Material entry's target page ("add a page for ASOP 43", "write the Friedland resource page", "the Werner & Modlin page is missing chapters"). Not for concept pages (actuarial-concept-definitions), for a book's table of contents on its own (textbook-toc), or for registering the page in Cowork (cowork-sources).
---

# Resource Pages (`Resources/Books/`)

The full standard, the review that produced it and the pipeline are
`docs/resource-pages.md` — read it before writing or editing a page. This skill
is the working summary.

A `Resources/Books/` page serves two products: it is a syllabus reading in
Study mode *and* the only way a real, citable document enters **Cowork's** source
catalogue. Registering it there is the `cowork-sources` skill.

## The page

Exam syllabi end with a **Source Material** callout linking one page per reading. A
resource page describes that one real document — and **says only what the document
says, naming where it read it**. The short form:

```markdown
---
Title: "Basic Ratemaking"
Authors: "Geoff Werner and Claudine Modlin"
Publisher: "Casualty Actuarial Society"
Year: "2016"
date: "2016"
Edition: "5th"
Type: "Textbook"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf)"
---
![[Basic Ratemaking (Werner - 2016) - Cover.svg]]

One paragraph on what the document is, in its own terms (its abstract, purpose, scope,
preface or the publisher's description); first sentence ≤ 160 characters.

> [!info] On the syllabus
> - [[Exam 5 (CAS)|Exam 5]] — Chapters 1 and 3–16 and the Appendices (the outline's words)

## 1 Introduction
- Bullets stating what the chapter says, each linking the [[Concept]] it teaches —
  or the chapter's numbered sections, verbatim

## Sources
- [Basic Ratemaking, 5th ed. (CAS, 2016)](https://…) — the document: contents, chapters 1–16
- [CAS Exam 5 Content Outline](https://…) — the citation and the assigned scope
```

The pipeline, in order:

1. **Pin the document** from the exam's content outline or syllabus
   (`quiz/src/data/examPdfLinks.ts`): citation, edition, scope.
2. **Extract it** — `python3 scripts/resource_extract.py --url <document>` (or `--page`
   for an existing page's `Available from`). It fetches the real document and writes its
   sha256, metadata, bookmark outline already in the vault shape, contents pages, page
   text, and images of scanned pages. For a book with no free copy, the `textbook-toc`
   skill's source ladder is this step.
3. **Write from the extraction** — division headings as the document titles them,
   bullets read from the division, every source under `## Sources`. Never from memory;
   commentary ("why it is on the syllabus", "the exam angles") belongs on concept pages.
4. **Cover** — `python3 scripts/generate_resource_covers.py` (see below).
5. **Lint** — `python3 scripts/resource_lint.py "Resources/Books/<page>.md"` (CI runs it on
   every page) and `validate_links.py`.
6. **Sync** — `python3 scripts/verify_check.py --sync "Resources/Books/<page>.md"`.

Details that matter:

- `Year`/`date` feed the Resources timeline; `Authors`, `Edition`, `Publisher`, `Type`,
  `Code` and `ISBN` populate the card. **Every value is double-quoted**, keys in the
  order above; `Type` comes from the vocabulary in `docs/resource-pages.md` §2.2.
  `Available from` is only for an official copy a reader can open; a book for sale
  carries its `ISBN` instead, and the card builds a *Get a copy* menu from it.
- **Every content file needs a `verification:` block** as the last key of its
  frontmatter (`docs/verification.md`) — but **do not write it by hand.** Author the
  page without one, then run from the repo root:

  ```bash
  python3 scripts/verify_check.py --sync "Resources/Books/<your page>.md"
  ```

  which backfills the whole block and owns its derived fields. Hand-writing it is
  a trap: `content_hash: null` is an *error* in the plain check, so a page copied
  from a template and committed un-synced fails
  `.github/workflows/verify-check.yml`, which gates every PR. Never hand-edit
  `content_hash`, `status`, `open_findings` or `open_critical` afterwards either —
  and note any edit to the page downgrades a `verified` status to `stale`, by
  design (principle P4).
- **Every page carries a cover**, and you do not have to find one. The metadata
  card (`ResourceMetaCard`) shows the **first image embed in the body** as the
  jacket and lifts it out so it is never rendered twice; a shelf of sources with no
  pictures is much harder to scan than one with them. Write the page, then run:

  ```bash
  python3 scripts/generate_resource_covers.py     # draws a jacket from the front matter
  ```

  It draws one for any page lacking a cover and **never touches a page whose first
  embed it does not own**, so a real publisher jacket dropped into
  `Media/Attachments/` under a name not ending in `- Cover.svg` wins permanently.
  A real jacket is the better picture — but a generated one is correct, and
  omitting the cover is not. See `docs/resource-covers.md`.
- The outline's job is to lead into the concept vault: link the concept a division
  teaches, and only concepts whose pages exist.

## Which `Resources/` directory

`Resources/Books/` is the only one `virtual:wiki-content` bundles, so a page there
opens from the bundle — offline, rate-limited, or not. **ASOPs, OSFI guidelines and
statements of principles all live in `Resources/Books/`** for that reason, despite
the folder's name.

The vault's other `Resources/` directories — `Regulation/`, `Events/`,
`Benchmarks/` — are dated pages that feed the Resources timeline/heatmap and use a
different frontmatter schema (`date`/`type`, `source_url`, `source_type`,
`pdf_url`; see `docs/research-corpus-plan.md`). They are **not** in the wiki
bundle, so a page there is fetched from GitHub at runtime. Put a *reading* in
`Books/`; put a dated *event or instrument* in the timeline directories.

## These pages are also Cowork's source catalogue

A `Resources/Books/` page is not only a syllabus reading. Cowork — the app's second
product (`docs/cowork.md`) — lists documents an actuary works *from*, and a vault
page is the **only** way a real, citable document gets into that catalogue: a
Cowork entry either points at a vault page with a `wikiRef`, or it is a dateless,
linkless `sample`. So a page written here is what turns a Cowork sample into a real
source. Adding the catalogue entry is the `cowork-sources` skill.

Two consequences for how you write the page:

- **The filename is the API a third time.** `wikiRef.name` in
  `quiz/src/data/coworkSources.ts` is the filename without `.md` — not the authored
  `Title:`. Renaming or deleting a page that Cowork references fails
  `quiz/src/lib/coworkContent.test.ts`, by design: the alternative is a Cowork row
  that quietly opens an empty panel. If you rename one, grep
  `quiz/src/data/coworkSources.ts` for the old name and update it in the same
  change.
- **The cover is doing double duty.** `lib/coworkCovers.ts` gives a Cowork resource
  card its jacket by looking the vault page up *by name*, so a page with no cover
  leads its card with a bare kind icon in both products. One more reason to run the
  cover generator rather than omit.


## Checklist

- [ ] Written from the extracted document (`scripts/resource_extract.py`), never from memory
- [ ] Frontmatter keys in order, every value double-quoted; `Type` from `docs/resource-pages.md` §2.2
- [ ] Cover first (`generate_resource_covers.py`), `> [!info] On the syllabus`, the document's divisions, `## Sources` last
- [ ] Every `[[link]]` in the outline goes to a concept page that exists
- [ ] `python3 scripts/resource_lint.py` and `validate_links.py` clean; `verify_check.py --sync` run
- [ ] A renamed page: `quiz/src/data/coworkSources.ts` grepped for the old name (Cowork `wikiRef`s are filenames)
