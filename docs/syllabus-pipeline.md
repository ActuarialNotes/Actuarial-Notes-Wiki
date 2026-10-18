# The Syllabus Pipeline — a syllabus PDF → an exam page

An exam page (`Exam *.md`) is the most load-bearing file in the vault: every link inside a
learning-objective callout becomes a syllabus concept, which enters mastery, the study plan
and the readiness score. This pipeline makes one from the examining body's own syllabus PDF
**without a model retyping it**, the rule `docs/pdf-question-pipeline.md` keeps for
questions: what the PDF prints is extracted mechanically, and the page is held to it word
for word. `docs/syllabus-pipeline-review.md` is the review that designed it.

```
syllabus PDF ─► syllabus_extract.py ─► .syllabus/<wiki id>/syllabus.json   (verbatim, hashed)
                                              │
                    syllabus_write.py ◄───────┘   links every noun phrase, renders the page
                                              │
                    syllabus_lint.py  ◄───────┘   CI: structure, links, fidelity to the JSON
```

It was first run over **every SOA exam past FM** (2026-10-05): the six ASA exams — FAM,
SRM, PA, ALTAM, ASTAM and the ATPA assessment — and the twenty-three exams of the FSA
pathway (CFE, CP, GH, GI, ILA, INV and RET). P and FM keep their hand-made pages. The SOA's
four e-learning modules — PAF, ASF, FAP and DMAC — followed on 2026-10-18, through the module
reader below. The other non-exam requirements publish no objectives document (the VEEs' topics
are in the SOA's VEE course-approval guidelines; the APC, the FAC and the CAS's Course on
Professionalism are described only on their course pages), so those pages, like Exams 6I and
6T, are hand-transcribed with no `syllabus:` block.

## Stage 1 — `scripts/syllabus_extract.py` (PyMuPDF, no model)

```bash
python3 scripts/syllabus_extract.py --all              # every syllabus in SOURCES
python3 scripts/syllabus_extract.py --wiki-id gh-101   # one; --pdf for a local copy
```

`SOURCES` maps each wiki id to the PDF the SOA's exam page links for the next sitting —
transcribed from soa.org, never constructed, and the same URL as the page's **Syllabus**
button (`quiz/src/data/examPdfLinks.ts`; `examCatalog.test.ts` holds the two together).
The PDF is cached as `.syllabus/<id>/source.pdf` (git-ignored); the JSON is the record.

The text is laid out from PyMuPDF's word boxes, every word at its column, so indentation and
a table's columns survive. The SOA writes every syllabus in one shape — `N. Topic: Title
(lo%-hi%)`, a *Learning Objectives* paragraph, then *The Candidate will be able to:* and
lettered outcomes, with `•`/`o`/roman-numeral sub-items — and its readings in two:

- **fellowship** syllabi list each topic's resources in a two-column table (the resource, and
  the outcomes it serves: `2a, 2c`, `Background`), a textbook's chapters as bullets beneath;
  codes that wrap, or sit centred on a tall cell, are rejoined to their row;
- **preliminary** syllabi list their readings once, at the end, each citation followed by
  its chapters (PA's two-edition table of ISLR is read column by column). The exam's tables,
  formula sheet, notation note and sample questions are not readings and are dropped. ATPA
  lists none: its one sentence, *All required resources are embedded in the e-Learning
  modules*, is its reading list.

Page furniture (page numbers, the copyright line, the running header) is removed first.
The JSON keeps the sha256 of the PDF it read.

### The e-learning modules (`MODULES`, `"shape": "module"`)

The SOA's e-learning modules — PAF, ASF, FAP and DMAC — publish no syllabus. Each module's
page links a *Module Introduction and Objectives* document instead, and a book list (a PDF,
or for DMAC a table on the FSA module book-list page). `MODULES` maps each wiki id to both,
and `--wiki-id paf-1` (or `--all`) reads them with `module_extract`:

- the **headings** are found by their type, not their words: the body size is the most
  common one, the title the largest, and a heading level is any other style used three times
  or more — so a sentence in the heading's words is never taken for one;
- a one-level document (PAF, ASF, DMAC) makes a **topic of each section**: its paragraph is the
  objective, its bullets the outcomes (numbered, no letters), its `o` sub-bullets their
  bullets. FAP has a level more: a topic per **module** of the course, its sections the bold
  groups the outcomes sit under, and its *Module Overview* description the objective;
- *Module Introduction* and *Module Objectives* become the page's lead and its *About the
  module* callout;
- a section's lead-in ("After you complete this section, you will be able to:") is dropped,
  as an exam syllabus's "The Candidate will be able to:" is;
- no weights: the catalogue marks the page `"weighted": false`;
- the book list's citations are the readings, each linked to `Title (Author - Year)`. A
  dated citation matches a `Resources/Books/` page only when the page is filed under the same
  year, since another year is another edition (Brown & Lennox's 2015 fourth edition is not the
  2022 fifth's page).

The JSON records both documents' URLs and sha256s; the page's H1 is the module's code.

## Stages 2–3 — `scripts/syllabus_write.py`

```bash
python3 scripts/syllabus_write.py --all          # (re)write every page from its JSON
python3 scripts/syllabus_write.py gh-101 --check # exit 1 if the page would change
python3 scripts/verify_check.py --sync           # then: the verification block
```

The page is rendered in the canonical shape `syllabus_lint.py` checks: a `syllabus:`
frontmatter block (source url, sittings, sha256, date — `verification:` stays last, and a
re-run keeps it); the exam-nav div; the PDF's own first paragraph (an ASA exam) or one line
naming the exam and its sittings (an FSA exam), its other paragraphs in an *About the exam*
callout; then a `> [!example]- Title {lo–hi%}` callout per topic — the objective paragraph,
the outcomes numbered (`a)` is 1, `b)` is 2; the reading codes keep the SOA's letters), their
sub-items, group lead-ins in bold, and for a fellowship exam the topic's resources under
`**Readings:**` with their outcome codes. `## Source Material` comes last, one entry per
reading with everything each topic assigns from it.

**Links wrap the syllabus's words and change nothing else.** Every noun phrase the chunker
finds (`syllabus_lib.noun_phrases` — the owner's rule, and the lint's) becomes a link: to the
concept page it names when one resolves (`vault_links.canonical_page`: namesakes, aliases,
the name, its singular), otherwise to the page that *should* exist, named the vault's way
(Title Case, singular). The one exception is a **single word with no page** — "structure",
"business", "traditional" — which stays plain text (`syllabus_lib.needs_note`): linked, those
were two links in five on the generated pages, to pages nobody would write, and they buried
the objective's real concepts. A phrase ends on its noun, so a trailing participle or
adjective ("information required", "the organization's strategic") is cut off it, and an
adverb ("actuarially") cuts a phrase; "defined benefit" / "defined contribution" are names,
not a verb. A line that would otherwise link nothing links its last noun phrase — or, with
none, its last generic noun ("Calculate and recommend assumptions") — so every objective
names a concept. A reading links its
`Resources/Books/` page when the page's whole title appears in the citation as a run of
words (stricter than `factCheckSources.ts`'s word-subset rule), and otherwise the page that
should exist: `Title (Author - Year)`, `ASOP n - Title`, or `CODE - Title` for an SOA study
note. The citation itself is the link's text. A reading matched to an existing page must
then be named in that page's `> [!info] On the syllabus` callout — `resource_lint.py` fails
until it is.

Unwritten pages are the point: they are the Pipeline B worklist. On an in-development exam
`syllabus_lint.py` reports them as `broken-link` / `broken-source` warnings.

Weights are transcribed as printed, decimals included (FAM's `12.5–17.5%`). GI 101's Topic 7
is weighted *inside* Topics 2, 3, 5 and 6; it keeps the SOA's parenthesis in its title and
carries `{0%}`, so readiness gives it no weight of its own.

## Stage 4 — fidelity, in `syllabus_lint.py`

A page carrying a `syllabus:` block is checked by `syllabus_write.fidelity_problems`: every
topic title and weight, objective, outcome and sub-item of the JSON must appear on the page,
in order, **with its links stripped, word for word**. A hand edit may re-point a link, add a
`*Key concepts:*` line, or add prose outside the callouts; it may not change what the SOA
says. `scripts/test_syllabus_pipeline.py` runs the same check over every generated page.

## The app side

A new SOA exam needed, besides its page and catalogue row (`scripts/exam_catalog.json`,
`status: development`, no bank):

- `lib/examStatus.ts` — its progress key in `IN_DEVELOPMENT_EXAMS`;
- `lib/wikiParser.ts` — `wikiExamIdToProgressKey` maps a fellowship id (`GH-201C`) to the
  tracks' key (`FSA-GH201`; the C/U and I/U variants share one, as Exam 6's do);
- `data/examPdfLinks.ts` — the syllabus button; `data/examSittingDetails.ts` — the info
  panel's publisher link and the facts the syllabus states (`GUIDE_ABOUT`);
- `lib/resourceExams.ts` — the ASA exams' place in the pill order;
- `lib/storeBooks.ts` — the Store carries none of them, so their readings stay off its shelf;
- `lib/knowledgeBase.ts` — `examKeyFromExamId` strips only a one-digit suffix (`P-1`), so
  `CFE-101` and `CFE-201` stay two exams to the AI connector.

## Re-running for a new sitting

Update the URL in `SOURCES` and in `examPdfLinks.ts`, delete the cached `source.pdf`, run
the extractor and the writer, then `verify_check.py --sync`. The diff is the syllabus's
change. Hand-made links and `*Key concepts:*` lines are overwritten by a re-render — re-apply
them, or fold the term into `scripts/concept_aliases.json` so the linker finds it itself.
