---
name: textbook-toc
description: Fetch a real, sourced table of contents for a textbook, study note, standard, paper, or article — chapter and section titles taken verbatim from the publisher, the document itself, or a library catalogue, never reconstructed from memory. Use whenever the user asks for the table of contents, chapter list, section headings, or outline of a named work ("what's in Werner & Modlin?", "pull the TOC for Broverman 8th ed", "get the chapters of ASOP 43", "outline this paper"), and whenever a new `Resources/Books/*.md` page needs its chapter map built. Also use before editing an existing Resources page's outline, so the edit is checked against the real book rather than a guess.
---

# Sourced Table of Contents

Build a table of contents for a work — textbook, CAS/SOA study note, ASOP, journal
article, preprint — where **every chapter and section title comes from a source you
actually fetched**, and the sources are named in the output.

The output is usually one of two things:

1. a TOC delivered in the conversation, with its provenance, or
2. a `Resources/Books/<Work>.md` page in this vault, whose body *is* the TOC
   (see "Writing the vault page").

## The one rule

**Do not write a chapter title you have not read in a fetched source.** Not one.

This is the whole skill, and it is harder than it sounds, because a plausible TOC is
easy to generate and nearly impossible to spot as wrong. You have seen these books.
You can produce "Chapter 4: Random Variables — 4.1 Random Variables, 4.2 Discrete
Random Variables…" for Ross without fetching anything, and it will be about 80%
right. That 20% is the problem: invented section numbers, chapters that belong to a
different edition, a subsection that exists in the 9th but not the 10th. A reader
studying from the page cannot tell the difference, and neither can a reviewer. A
half-length TOC that is *true* is worth more than a complete one that is *probably*
true, because the true one can be built on.

So the honest outcomes, in order of preference:

- Full TOC, sourced. Ideal.
- Chapter-level only, sourced, with a note that section detail could not be found.
- "I could not find a citable TOC for this edition; here is what I did find and
  where you could look." — a legitimate result, not a failure to paper over.

If you catch yourself completing a partial list from familiarity, stop and mark the
gap instead.

## Step 1 — Pin the exact edition before searching

Editions renumber chapters, merge them, and add sections. A TOC is only correct
relative to one. Nail down as much as you can before searching:

- **Title, author, edition, year, ISBN.** ISBN is decisive — prefer it in queries.
- **Check the vault first.** `Resources/Books/` may already have the work (with
  frontmatter giving edition/ISBN/publisher), and the exam syllabus pages
  (`Exam *.md`, "Source Material" callout) name the *prescribed* edition, which is
  the one that matters here. `grep -ril "<author>" Resources/Books/` and
  `grep -n "<title>" "Exam *.md"`.
- If the user names no edition and the vault names one, use the vault's and say so.
  If neither pins it, take the current edition, state that assumption plainly in the
  output, and move on — don't block on it.

For a **paper or article**, the analogue is the DOI (or arXiv ID). Preprint and
published versions have different section structures; say which one you used.

## Step 2 — Work down the source ladder

Stop as soon as you have a complete, edition-matched TOC. Ordered by how directly
each source reflects the actual book:

**Tier 1 — the document itself.** If the user attached the PDF, or a copy is on disk,
the search is over — read its contents pages and you're done. Otherwise, look for the
free official copy: CAS and SOA study notes (`casact.org`, `soa.org`), ASOPs
(`actuarialstandardsboard.org`), NAIC/OSFI/IAA papers, arXiv, PubMed Central,
government reports. A document's own contents pages outrank everything below them.
Read the PDF's first ~15 pages (use the `pdf` skill), or for a section-headed paper,
harvest the headings from the full text. The vault's resource pages often already
carry the PDF URL in frontmatter.

**Tier 2 — the publisher.** Pearson, Wiley, Springer, Cambridge, CRC, AMS, World
Scientific, ACTEX, Elsevier. The product page usually has a "Table of Contents" tab,
complete and edition-correct. Better still, most publishers post a free **sample-pages
PDF**, which opens with the book's real typeset front matter — that's a Tier 1 source
wearing a Tier 2 hat, so look for it before settling for the product page.

**Tier 3 — library catalogues.** The Library of Congress, Open Library, WorldCat and
university catalogues expose the MARC 505 "Contents" note — a flat
`Title -- Title -- Title` string, usually chapter-level only, but a genuine record
keyed to an ISBN. LoC also hosts plain-HTML **CIP contents pages** at
`catdir.loc.gov/catdir/toc/…` that are often full-depth; they're worth trying early.

**Tier 4 — Google Books / Internet Archive.** The Google Books "about" page
sometimes shows "Contents" with page numbers; Internet Archive item pages carry a
contents note, and borrowable scans expose the real TOC pages.

**Tier 5 — retailers.** Amazon, AbeBooks, RedShelf, Perlego, VitalSource. These
often carry a full TOC, but the edition is frequently mismatched and the text is
sometimes marketing-edited. Usable as a last resort or to corroborate a higher tier
— label it as such when it is the only source you had.

**Never sources:** your own recollection, a course syllabus's paraphrase, a
"chapter summary" blog, Scribd/Course Hero reposts, or an AI-generated overview. All
of these read like TOCs and drift from the book in exactly the ways that matter.

`references/sources.md` has concrete query patterns and per-host URL shapes for each
tier — read it when a search isn't landing.

## Step 3 — Cross-check before you trust it

Cheap checks that catch the common failure of grabbing the wrong edition:

- **Chapter count** agreeing across two independent sources is the strongest single
  signal. When two sources disagree on the count, you are almost certainly looking
  at two editions — resolve by ISBN, not by picking the fuller one.
- **Numbering continuity.** A jump (…7, 9, 10…) means the source dropped something;
  go back for it rather than silently renumbering.
- **Syllabus fit.** If the exam syllabus excludes "5.6.2, 7.8", those section
  numbers had better exist in your TOC. They're a free correctness probe.
- **Anachronism.** A "Machine Learning" chapter in a 2008 text, or a missing one in
  a 2024 text, is a mismatch worth a second look.

## Step 4 — Transcribe faithfully

The value here is fidelity, so copy rather than improve:

- Keep the source's **wording and numbering verbatim**, including its numbering
  scheme (`4.6.1`). Where a source gives no numbers — catalogue notes usually don't —
  leave them off rather than asserting a numbering the source doesn't support.
- Don't retitle a chapter to be more descriptive, don't merge or split sections,
  don't reorder, and don't add a section you think ought to be there.
- Fix only transcription noise: OCR damage, dot leaders and page numbers
  (`Introduction .... 12` → `Introduction`), smart quotes, doubled spaces, and
  ALL-CAPS headings from a catalogue record (title-case those).
- Front and back matter (Preface, Appendices, Answers to Selected Problems, Index)
  is worth keeping when the source lists it — existing vault pages do.
- If a source's transcription is ambiguous — a 505 note that ran two chapters
  together, say — leave it as the source has it rather than guessing the split.

`scripts/format_toc.py` turns a raw dump (pasted PDF contents pages, or a flat
`--`-separated catalogue note) into the vault's heading/bullet shape, stripping page
numbers and nesting by number depth. It saves the fiddly pass and won't invent
entries:

```bash
python3 .claude/skills/textbook-toc/scripts/format_toc.py raw_toc.txt
python3 .claude/skills/textbook-toc/scripts/format_toc.py --flat "1. Combinatorial Analysis -- 2. Axioms of Probability"
```

Read its output before using it — a weird source layout can confuse the nesting, and
you are still the one accountable for the result.

## Step 5 — Deliver with provenance

Always name what you fetched. In conversation, end with the sources as markdown
links, plus the edition matched and any gaps:

```
Sources: [Pearson product page](https://…) (full TOC, 10th ed.),
[Open Library](https://…) (chapter titles, corroborates 10 chapters).
Section-level detail for Ch. 10 was not available from either — chapter title only.
```

In a vault page, provenance lives in the `Available from:` /
`Find at your local library at:` frontmatter and the `## Links` section.

## Writing the vault page

When the result should become a `Resources/Books/` page (a new syllabus reading, or
filling in an existing stub), match the shape the app expects:

```markdown
---
Title: A First Course in Probability
Author: Sheldon Ross              # or  Authors: "First Last, Second Last"
Year: "2019"
date: "2019"
Edition: 10th
Publisher: Pearson
ISBN: 978-0134753119
Find at your local library at: "[worldcat.org](https://…)"
---
One-line framing sentence: what this is and which exam/objectives it serves, with a
[[wiki-link]] or two.

## 1 Combinatorial Analysis
  - 1.1 Introduction
  - 1.2 The Basic Principle of Counting

## 2 Axioms of Probability
  - 2.1 Introduction

## Links
- [Title (Publisher)](https://…)
```

Things that are easy to get wrong and quietly break something:

- **Everything goes in `Resources/Books/`** — ASOPs, statements of principles and
  study notes included. It's the only directory the wiki collector reads for
  documents.
- **`date:` is what puts the work on the Resources timeline.** No resolvable `date`
  (or `Year`, or a `(YYYY)` in the filename) and the page is silently dropped from
  the timeline. Set both `Year` and `date` to the same quoted year string.
- **Lead with the framing sentence, before any image embed.** The timeline card's
  summary is the page's first non-heading line — put an `![[cover.png]]` first and
  the card's summary becomes the raw embed text. (`Resources/Books/A First Course in
  Probability (Ross - 2019).md` has this bug; don't copy it.)
- **Only embed an image that already exists** in `Media/Attachments/`. Most works
  have no cover in the vault; omit rather than invent a filename.
- Free PDF → `Available from:`; a book you'd borrow → `Find at your local library
  at:`. Both take a markdown link, quoted.
- Add `Type:` (`Study Note`, `Actuarial Standard of Practice`, `Statement of
  Principles`) and `Code:` (`ASOP No. 12`, `P-21-05`) for non-book documents.

### Filename and inbound link

The filename is the link target, so it has to match the syllabus link
character-for-character. Observed convention:
`Title (LastName - Year).md`, or for multiple authors
`Title (Vaaler, L.J.F., Harper, S.K., and Daniel, J.W. – 2019).md`.

- `.md` is mandatory — the vite collectors filter on `.endsWith('.md')`, so an
  extensionless file vanishes from the build entirely.
- Spaces, never underscores.
- **Watch the dash.** Existing pages use both a hyphen (`Ross - 2019`) and an en
  dash (`Daniel, J.W. – 2019`). They are different characters and a mismatched link
  dead-ends invisibly. Copy the dash from whichever form the syllabus already links,
  or pick one and make the syllabus match.

Then wire it into the exam page's `> [!answer]- Source Material` callout
(`[[Page Name]]` plus the assigned chapters), and validate:

```bash
python3 .claude/skills/actuarial-concept-definitions/validate_links.py
```

### Wiki-linking the TOC (optional second pass)

Vault pages link TOC entries to concept pages — `- 1.3 [[Permutation|Permutations]]`.
Do this *after* the TOC is transcribed and only where a page already exists in
`Concepts/`; a link to a missing page is a dead end the validator will flag. Link the
term, keep the source's title text as the display text, and leave entries with no
matching concept as plain text.

Note that `Basic Ratemaking (Werner - 2016).md` and the ASOP pages use a different
body style — summarizing bullets under each chapter rather than the literal
subsection list. That's an editorial outline, a different job from this skill. When
one is wanted, the sourced TOC is still the scaffold: get the real chapter titles
first, then write bullets under them.

## When the network is restricted

Some environments (including Claude Code on the web with a restricted network
policy) allow `WebSearch` but block `WebFetch` to arbitrary hosts — fetches come
back `403 Forbidden`. Search snippets alone rarely contain a full TOC.

When that happens: use what the snippets genuinely show, check whether the work is
already in the vault or available as a local PDF, and then say clearly that the
network blocked the publisher/catalogue pages, listing the URLs the user can open
themselves. Do not let a blocked fetch become the moment you fall back on memory —
that is exactly the failure this skill exists to prevent.

## Checklist

- [ ] Edition pinned (ISBN/edition/year stated), and it's the edition the syllabus prescribes
- [ ] Every chapter/section title came from a fetched source, none from recall
- [ ] Two sources agree on the chapter count, or the single source is named as such
- [ ] Numbering is continuous and verbatim; no invented or renamed entries
- [ ] Gaps marked explicitly rather than filled in
- [ ] Sources listed with URLs in the output (or in frontmatter + `## Links`)
- [ ] Vault page: in `Resources/Books/`, `.md` extension, filename dash matches inbound links
- [ ] Vault page: `Year` + `date` set (else it drops off the timeline); framing sentence before any image
- [ ] Vault page: `[[links]]` only to concepts that exist; `validate_links.py` clean
