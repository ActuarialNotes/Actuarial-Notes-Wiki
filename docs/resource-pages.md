# Resource pages — the standard, and the pipeline that grounds them

A **resource page** (`Resources/Books/*.md`) describes one real document: a textbook, a
study note, an actuarial standard, a regulator's guideline, a return. It is read in more
places than any other page type — the wiki's resource route, the concept popup, the Source
Material shelf on an exam page, the Fact Check panel's *Checked against* shelf, Cowork's
catalogue, the AI connector, search, and a static SEO page — and every one of those
surfaces trusts it to say what the document says. So the one rule this whole document
serves:

> **A resource page says only what its document says, and names where it read it.**

Everything below is that rule made concrete: a fixed shape (§2), a pipeline that reads
the real document before a page is written (§3), and a lint that holds every page to the
shape (`scripts/resource_lint.py`, in CI). §1 is the review that led here.

Cowork's *sample* documents (`quiz/src/data/coworkDocs.ts`) borrow the same frontmatter
so they get the same card, but they are virtual pages that name no particular document
(`docs/cowork.md`) and are not held to this standard. The dated pages under
`Resources/{Regulation,Events,Benchmarks,Data}/` are a different
thing — timeline entries for the flag-gated Research tab, with their own schema
(`docs/research-corpus-plan.md`). The app never opens them as resource pages
(`WikiResource` reads `Resources/Books/` only), and nothing here applies to them.

---

## 1. Review: how resource pages were made (2026-09-27)

### The pipeline as it stood

There was no pipeline — there were skills. A page was written by a model following
`actuarial-concept-definitions` ("Source-material pages"), with the chapter outline built
by `textbook-toc`, a cover drawn by `generate_resource_covers.py`, and a `verification:`
block backfilled by `verify_check.py --sync`. Nothing read the document mechanically,
nothing checked the page's shape, and nothing recorded which copy of the document a page
was written from.

### Findings

Measured on the 109 pages in `Resources/Books/` before this change; the lint in §4, run
against them unchanged, reported **1,169 errors**.

**G1 — Only the chapter titles had a grounding rule.** `textbook-toc` is strict and good:
*"Do not write a chapter title you have not read in a fetched source."* But it covers
the outline and nothing else. Everything around the outline — the framing paragraph,
the scope, and the commentary — had no rule at all, and that is where most of the text
was. **64 pages carried 107 commentary sections** that are not divisions of the
document: *Why it is on the syllabus* (19), *The exam angles*, *The mechanics to hold on
to*, *Points worth noticing*, *The argument*, *Reading note*… They read as authoritative
and are indistinguishable from the document's own content.

The clearest case was `Davidson.md`, whose PDF is a scan with no text layer. Its page
said so — *"The outline above states the subject the citation names; a candidate should
read the CAS PDF for the argument itself"* — above four bullets of argument the page had
never read. The scan is perfectly readable as page images; nobody had looked.

**G2 — No provenance.** 108 of 109 pages were `status: unverified` with `sources: []`.
14 pages had no links section at all; the other 95 had a `## Links` list that named the
document but never what had been taken from it, so a reader (or VERIFY) could not tell
a transcribed outline from a remembered one.

**G3 — Metadata drift.** One card reads these fields, and they were written ten ways:

| Field | What was found |
| --- | --- |
| author | `Author` on 78 pages, `Authors` on 30, neither on 1; formats from `Geoff Werner, Claudine Modlin` to `Hogg, R.V., McKean, J.W., and Craig, A.T.` |
| `Type` | missing on 28 pages; **30 different values** on the other 81 (`Research Paper`, `Research Report`, `Report`, `Government Report`, `Paper`, `Article`, `E-Forum Paper`, `Working Party Paper`, `Discussion Paper`…) |
| `Year` / `date` | missing on 5 pages, so they fell off the timeline and printed no year |
| `Edition` | `Study Note (Oct 2014, rev. Sep 2015)` and similar in the edition chip on 3 pages |
| where to get it | `Available from` on 82, `Find at your local library at` on 7, a non-link (`"CAS Study Kit (not published online)"`) on 7; **9** pointed at a paywall, a shop, a catalogue record or a support site, which suppresses the card's ISBN-built *Get a copy* menu |
| quoting / order | 141 unquoted values; key order differed on 103 pages |

**G4 — Shape drift.** Syllabus scope was stated four ways (a `[!warning]` callout, a
sentence in the lead, a section, or not at all) on 105 pages that exam pages list.
63 pages put prose paragraphs under a chapter heading; 17 used tables (the table-pipe
link bug's home); 25 wrapped their outline in a `## Contents` section and 84 did not;
18 had no lead paragraph, or one too short for the SEO description to use.

**G5 — Contradictory instructions.** `textbook-toc` said to put the framing sentence
*before* the cover embed, because the Resources timeline once summarised a page by its
first line; the timeline stopped summarising books (`vite.config.ts`, `summary: isBook ?
undefined`), and `resourceMeta.ts` takes the *first* image embed as the cover, so every
page does the opposite. The skill's template used `Author` for one author and `Authors`
for several; the concept skill said *"the outline's job is linking, not summarizing"*
while the one verified page (Werner & Modlin) is a summarising outline.

### What was already right

The filenames are the link targets and are left alone: textbooks are
`Title (Surname - Year)`, and the Exam 6C readings are named by the **citation
abbreviation the CAS content outline gives each reading** (`CIA Bias`, `OSFI MCT`,
`Davidson`) — which is why those names look terse. Renaming either would break exam
pages, Cowork `wikiRef`s, public URLs and `.verify/` log paths. The cover generator
(`docs/resource-covers.md`) and `textbook-toc`'s source ladder were both sound and are
kept as stages of the pipeline below.

---

## 2. The standard

### 2.1 Frontmatter

Keys in this order, **every value double-quoted**, then the `verification:` block last
(owned by `verify_check.py --sync` — never hand-written):

| Key | Required | Value | Where it comes from |
| --- | --- | --- | --- |
| `Title` | yes | the full title as printed, subtitle after `: ` — the document's *name*: a number it carries (`Actuarial Standard of Practice No. 12`, `Guideline A-4`) goes in `Code` instead | the document's title page (or the publisher's record of it) |
| `Authors` | yes | names in title-page order, given name first, `, ` between and ` and ` before the last; a body's full name when no person is credited | the title page |
| `Publisher` | yes | the publishing or issuing body, full name | the title page / imprint |
| `Year` | yes* | four digits — the year of the edition or version the syllabus prescribes | the title page, copyright page or effective date |
| `date` | yes* | the same four digits as `Year` (it places the page on the timeline) | — |
| `Edition` | no | an ordinal, `5th` — only when the document states an edition | the title page |
| `Type` | yes | one of the vocabulary in §2.2 | what the document is |
| `Code` | no | the document's own identifier: `ASOP No. 43`, `Guideline A-4`, `PC3`, `O. Reg. 664` | the document |
| `ISBN` | no | the ISBN-13 of that edition, check digit valid | the copyright page or the publisher |
| `Available from` | no | `"[host](url)"` — the most stable official URL where the document **itself** can be read: a publisher's PDF, a free open edition, the standards body's page, the CAS or SOA copy. A PDF is read in the app, so its host must be on the PDF proxy's allowlist (`EXAM_PDF_HOSTS`; `examPdf.test.ts` fails otherwise — see `docs/mock-exam-browser.md`) | the publisher |
| `description` | no | an SEO description, only when the lead can't serve as one | — |

\* A page the vault wrote itself (`Publisher: "Actuarial Notes"`, the distribution
reference sheet) is exempt from `Year`/`date`.

Two consequences worth stating:

- **A book you buy has no `Available from`.** It carries its `ISBN`, and the card
  builds the *Get a copy* menu (WorldCat, then shops) from it (`copySources` in
  `quiz/src/lib/resourceMeta.ts`), each row led by that place's own logo, served
  from `quiz/public/copy-sources/` rather than hotlinked. The Amazon row also carries
  Amazon's price when the deployment has Creators API credentials
  (`quiz/api/amazon-price.js`), which is one more reason the `ISBN` must be the
  exact edition's: the price is shown only for an item that carries it. A shop, a paywalled page or a catalogue record in
  `Available from` would suppress that menu and send the reader somewhere worse.
  `Find at your local library at` is retired for the same reason.
- **Revision history is not an edition.** A study note's `rev. Sep 2015` goes in the
  lead or the Sources note, not in the `Edition` chip.

### 2.2 `Type` — what kind of document it is

One value per *kind*, not per publisher's name for it — the lead can say "a CIA research
paper"; the `Type` says `Paper`. It is the kicker on the card and the small caps on the
cover.

| Type | For |
| --- | --- |
| `Textbook` | a published book |
| `Casebook` | a book of cases with commentary |
| `Study Note` | a CAS or SOA study note |
| `Monograph` | the CAS monograph series |
| `Course` | an online course, read through its published syllabus |
| `Paper` | a journal article, E-Forum paper, research paper, working-party or discussion paper |
| `Report` | a government, committee, consultant or research report |
| `Educational Note` | a CIA educational note |
| `Standard of Practice` | an ASB ASOP; the CIA's Standards of Practice |
| `Statement of Principles` | the CAS statements of principles |
| `Guideline` | a regulator's guideline or guidance |
| `Regulatory Return` | a return's forms (usually a workbook) |
| `Instructions` | filing instructions, a return's instructions, filing guidelines, technical notes |
| `Legislation` | a statute or regulation |
| `Case Law` | court decisions, compiled |
| `Code of Conduct` | an industry code |
| `Guide` | a guide to a plan or program, written for policyholders or insurers |
| `Glossary` | a glossary or legend of terms |
| `Reference Sheet` | the vault's own reference pages |

The list lives in `TYPES` in `scripts/resource_lint.py`; add a kind there (and here)
rather than writing a new value on one page.

### 2.3 The body

```markdown
![[OSFI MCT - Cover.svg]]

<Lead: one paragraph, 60–700 characters. What the document is and what it covers, in
the document's own terms — from its title page, abstract, purpose or scope section,
preface, or the publisher's description.>

> [!info] On the syllabus
> - [[Exam 6C (CAS)|Exam 6C]] — objectives C2–C4; not sections 1.2.2, 2.1.1.1, … (the
>   assignment as the content outline states it)

## 1 Overview and General Requirements
- 1.1 Overview
- 1.2 General requirements
    - <a point that section makes, with [[Concept]] links — optional>

## 2 Definition of Capital Available
- <what the division says, one point per bullet — when the document gives it no
  sub-divisions>

## Related readings
- [[OSFI Target Capital]] — Guideline A-4, which §1.2 refers to for the internal target

## Sources
- [Minimum Capital Test Guideline (OSFI, 2024)](https://www.osfi-bsif.gc.ca/…) — the
  document: title, effective date, section headings and the points under them
- [CAS Exam 6C Content Outline, Fall 2026](https://www.casact.org/…) — the citation and
  the assigned scope
```

In order:

1. **The cover** — the first line, always. `ResourceMetaCard` takes the first image embed
   as the jacket and lifts it out of the body (`docs/resource-covers.md`).
2. **The lead** — one paragraph about the *document*. Its first sentence is 160
   characters or fewer and says what the document is about: that sentence becomes the
   page's search description (`resourceSeo` in `quiz/src/lib/seo.ts`). It does not need to
   name an exam — the description appends "A syllabus reading for …" itself, and the
   callout below says the rest. No `# Title` — the card above the page carries it.
3. **`> [!info] On the syllabus`** — present exactly when an exam page's Source Material
   callout lists this page, with one bullet per such exam, opening with the exam's link
   and saying, after ` — `, what that exam assigns: the objectives (from the exam page)
   and the chapters, sections, pages or exclusions (from the content outline or syllabus,
   in its words). The lint compares the bullets with the exam pages both ways.
4. **The document's divisions** — its chapters, sections, parts, schedules or form pages,
   as `##` headings, **titled and numbered as the document titles and numbers them**:
   `## 4 Insurance Risk`, `## Appendix A …`, `## 10.60 Summary of Selected Financial Data
   for Five Years`. Drop the words *Chapter*/*Section* before a number, and a period after it
   (`## 1 Title`, not `## 1. Title`); keep *Part* and *Appendix*, which are part of the label. A `###` level is for a book whose parts hold
   chapters. A document that groups its content without titling the groups (a one-page
   legend in colour bands, say) gets one heading per group naming what the group holds,
   and its `## Sources` entry says the groups are untitled in the original. Under each heading, a **list**, never prose or a table:
   - its **sub-divisions**, verbatim and numbered as printed (`- 1.3 Permutations`,
     nested four spaces per level) — the preferred content, and all a textbook page
     needs; and/or
   - **what it says**, one point per bullet, each a statement that division makes. Link
     the concept it teaches (`[[Loss Development|loss development]]`) — the outline's job
     is to lead into the concept pages. A formula the division itself defines may appear
     as `> $$…$$`.
   A division with nothing to add is just its heading.
5. **`## Related readings`** (optional) — other resource pages only, one line each on a
   relation the document or the content outline states: it cites it, supersedes it,
   implements it, or is assigned with it for the same objective.
6. **`## Sources`** — last. Every source the page was written from, each a markdown link
   followed by ` — ` and what was taken from it. The document itself comes first (its
   `Available from` link must be here); then the content outline or syllabus that gave
   the scope; then anything else (a publisher's contents page for a book with no free
   copy, a library record, errata).

### 2.4 What may appear, and where it comes from

| Element | Source | Never |
| --- | --- | --- |
| frontmatter facts | the title page, imprint, copyright page; the publisher's record | a year or edition inferred from a filename |
| lead | the document's own abstract, purpose, scope or preface; the publisher's description | background from memory; why a student should care |
| syllabus bullets | the exam page (objectives) and the content outline / syllabus (scope) | scope from memory, or from another sitting's outline |
| division headings | the document's table of contents, bookmarks or headings | a heading reconstructed from recall (see `textbook-toc`, "The one rule") |
| division bullets | the text of that division | exam strategy, commentary, a point from a different document |
| related readings | a citation in the document, or the content outline | "see also" by topic |

When the document cannot be read — no free copy, a scan the extractor can't see — the
page says less, not more: a textbook page is its sourced table of contents and nothing
else, and a division with no readable text is a bare heading. When not even its contents
can be found (a study-kit text with no copy online and no catalogue contents note), the
page has **no divisions**, and says so where a reader will see it — right after the
syllabus callout:

```markdown
> [!note] Contents unavailable
> No copy of this paper is published; the CAS supplies it in the Exam 6C study kit.
> This page records its citation and assignment from the content outline.
```

The lint accepts a page without divisions only with this callout, and refuses the callout
on a page that has them. A **scan is not
unreadable**: `resource_extract.py` renders every page with no text layer as an image,
and a model reads the images.

Study commentary — why a reading matters, how the exam uses it, what to memorise — is
not wrong, but it is not the document. It belongs on the concept pages the outline links
to, where it can be written as teaching and checked as such.

### 2.5 Filenames

Unchanged by the standard (§1, *What was already right*). A new page is named
`Title (Surname - Year).md` for a book or paper with an author, or by the CAS content
outline's abbreviation for a reading the outline abbreviates. Watch the dash: existing
pages use both `-` and `–`, and the link must match character for character.

---

## 3. The pipeline

```
content outline ─► pin the document ─► resource_extract.py ─► write ─► covers ─► resource_lint.py ─► verify_check --sync
  (citation,         (edition, URL)       (sha256, outline,     (model,   (generate_     (+ validate_links)   (hash; VERIFY
   scope)                                  headings, text,       from the   resource_                           later cites the
                                           page images)          extract)   covers.py)                          same document)
```

1. **Pin the document.** The exam's content outline or syllabus
   (`quiz/src/data/examPdfLinks.ts`) gives the full citation, the edition or version,
   and the scope. That — not the vault's filename, not memory — says which document
   the page is about.
2. **Extract** (`scripts/resource_extract.py`, no model). Fetch the document and read
   everything that is read rather than judged:

   ```bash
   python3 scripts/resource_extract.py --page "Resources/Books/OSFI MCT.md"   # its Available from
   python3 scripts/resource_extract.py --url https://…/document.pdf --render 1-3
   ```

   It writes the bytes and their sha256, the PDF's metadata and **bookmark outline —
   already in the vault's `##` / `-` shape** (`outline.md`) — the pages that look like a
   table of contents, every page's text, and PNGs of any page without a text layer; for
   an HTML page, its citation meta tags, headings and linked PDFs; for a workbook, its
   sheet names. `summary.md` is the file to open first.
   For a textbook with no free copy, `textbook-toc`'s source ladder (publisher → sample
   pages → library catalogue) is this step.
3. **Write.** A model writes the page from the extraction and nothing else — the
   division headings copied from `outline.md` or the contents pages, the bullets from
   the division's own text — and fills `## Sources` with what it used. Where the
   document and the old page disagree, the document wins; where the old page says
   something the document doesn't, it goes.
4. **Cover.** `python3 scripts/generate_resource_covers.py` draws one for a new page;
   `--force` redraws after a change to `Title`, `Authors`, `Type`, `Edition`, `Code`
   or `Publisher`. A real jacket is never touched.
5. **Lint.** `python3 scripts/resource_lint.py` (below) and
   `python3 .claude/skills/actuarial-concept-definitions/validate_links.py`.
6. **Sync.** `python3 scripts/verify_check.py --sync` — the hash moves, and a
   previously verified page drops to `stale`, by design.
7. **Verify** (later, separately). The VALIDATE agent (`docs/validation-agent.md`)
   checks the page against the document named first under `## Sources` and records it,
   with the sha256 the extraction printed, via `verify_record.py`. Writing a page and
   verifying it are different passes.

Step 2 is the one that was missing, and it is what makes step 3 honest: a model that
writes from `outline.md` and `text/p012.txt` is transcribing; a model that writes from
the citation is remembering.

---

## 4. The lint (`scripts/resource_lint.py`)

Stdlib only, run in CI by `.github/workflows/content-validation.yml` on every change
under `Resources/`, and held to zero errors on the whole shelf by
`scripts/test_resource_pages.py`. It checks:

| Code | Rule |
| --- | --- |
| `key-*`, `type`, `year`, `edition`, `isbn`, `available-from` | §2.1 and §2.2: canonical keys, order and quoting; the vocabulary; `date` = `Year`; an ordinal edition; the ISBN's check digit; `"[host](url)"` with the label naming the link's host |
| `cover`, `lead`, `shape`, `h1`, `unavailable` | §2.3's order: cover (a file that exists), lead (60–700 characters), the callout, then headings; a page with no divisions only behind `> [!note] Contents unavailable` |
| `syllabus` | the callout names exactly the exams whose Source Material lists the page, each bullet opening with the exam's link and saying what it assigns |
| `prose`, `table` | lists under a division, never paragraphs or tables |
| `editorial` | no commentary heading of the phrasings §1 found (*Why it is on the syllabus*, *The exam angles*, *Links*, *Contents*…) — a document's own *What do the terms mean?* passes |
| `related`, `sources` | related readings are resource pages; `## Sources` is last, every entry a link with a ` — ` note, the `Available from` link among them |
| `link` | every `[[link]]` lands exactly (`scripts/vault_links.py`) |

`--fix` does only the mechanical part — key order, quoting, `Author` → `Authors`,
`date` from `Year` — and never picks a `Type` or writes a value.

What the lint cannot check is whether a heading is the document's own or a bullet says
what the division says. That is the job of step 2 (a page written from an extraction)
and step 7 (a page checked against the document by someone other than its writer).

---

## 5. Applying it (2026-09-27)

Every page in `Resources/Books/` was rewritten to this standard from its document — 107
by fifteen parallel agents working to one brief, `CIA Bias` by hand as the worked example
(the distribution reference sheet is the vault's own page and kept its body). The lint
went from **1,169 errors to 0**; `scripts/test_resource_pages.py` now holds it there.

**What the documents said that the pages didn't.** Reading the real documents found
errors on almost every page — not formatting, facts:

- **Invented outlines.** The Leemis and Asimow tables of contents were largely
  reconstructed (sections those books do not have; the SOA's own exclusions only line up
  with the real contents). Friedland has 17 chapters in 4 parts, not 21 in 5. The CIA
  Standards of Practice page had most of its assigned sections under the wrong titles.
  The Ontario Regulation 664 and Insurance Companies Act pages mapped nearly every
  section number to the wrong provision.
- **Contradicted content.** *CIA Bias* defined bias as estimator bias, which the document
  says it does not mean. The MCT's diversification credit is between credit-plus-market
  and insurance risk, not insurance and market. IFRS 17.53(b) tests each contract's
  coverage period, not the group's. The old *Davidson* body described a paper no one had
  read; it is now written from the twelve scanned pages.
- **Wrong metadata.** *CAS Financial Reporting* credited the wrong authors, *KPMG PACICC*
  the wrong authors and publisher, the CIA Standards had author and publisher swapped,
  *ASOP 43* linked the 2007 text rather than the 2011 update the outline cites, and
  *ASOP 12* claimed a 2023 revision that is still an exposure draft.
- **Syllabus scope.** Many pages stated a scope the content outline doesn't (ISLR's
  MAS-I and MAS-II chapters, Cowpertwait's MAS-II chapters, Goldburd listed for one of
  the three exams that assign it).

**What could not be read.** Three study-kit texts have no copy online and no catalogue
contents note (Agricultural Programs, KPMG Regulatory Oversight, McDonald), and Baer and
Rendall's contents could not be fetched; each carries `Contents unavailable`. Pages whose
documents were only partly reachable say so under `## Sources` (Tse beyond §2.2; West et
al. at chapter level; the 2023 climate guideline, which OSFI replaced with a 2025 text;
the 2024 Memorandum to the Appointed Actuary, now served as a 2026 page; two SCC decisions
behind a CAPTCHA).

**Found outside the resource pages, and left for their owners:**

- Findings recorded with `verify_record.py` against two concept pages the documents
  contradict: `Concepts/Base Solvency Buffer.md` (MCT §1.1.1 *divides* capital required
  by 1.5) and `Concepts/Insurance Companies Act.md` (the actuary provisions cited to the
  wrong sections).
- Exam pages whose Source Material disagrees with the current outline: Exam P's chapter
  assignments, Exam 5's objective codes for Werner & Modlin and Friedland, Exam FM's
  scope for Brown & Kopp, and Exam 6C still listing *CIA Reinsurance Treatment*, which
  the Fall 2026 outline dropped. Exam 6U links three readings by names no page has
  (`Rating Agencies (Feldblum - 2011)` and two others) that may be the 6C pages' documents
  in another edition.
- The FM and MAS-I exam pages each had a Source Material bullet written `-[[` with no
  space — no list item in Markdown, and invisible to the vault's tools. Fixed.

