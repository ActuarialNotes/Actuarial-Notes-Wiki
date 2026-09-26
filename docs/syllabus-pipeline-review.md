# Exam Syllabus Conversion Pipeline — Review and Recommendations

*Review date: 2026-09-25. Written as a hand-off brief for the agent that implements it.
Every number below was measured on the vault at that date; re-run the commands in
§6 before starting, because they will have drifted.*

## 0. Scope

Two pipelines, as the owner describes them:

- **Pipeline A — syllabus conversion.** A published exam syllabus / content-outline PDF
  becomes an `Exam *.md` page whose learning objectives link every **concept** with
  `[[…]]`, and whose Source Material callout links every **reading**.
- **Pipeline B — page creation.** Every concept and resource that Pipeline A links
  becomes its own `.md` page (`Concepts/*.md`, `Resources/Books/*.md`), each with its
  own skill and test conditions.

The model for "good" already exists in this repo: the PDF → question-bank pipeline
(`docs/pdf-question-pipeline.md`) — deterministic extraction, a model asked only for
judgments, a linter, and the rule *nothing a PDF prints is ever retyped by a model*.
The core recommendation of this review is to give syllabi the same treatment.

## 1. Current state — the short version

**Pipeline A does not exist as a pipeline.** There is no script, skill, or doc that takes
a syllabus PDF as input. The ten exam pages were hand- or model-authored one at a time,
and it shows: they follow ten slightly different conventions, mix transcription with
editorial elaboration, and carry no record of which PDF (or which sitting) they were
transcribed from.

**Pipeline B exists but is skill-driven and fragmented.** It is a set of good, separately
written skills — `actuarial-concept-definitions` (concept + resource pages, syllabus
audit), `textbook-toc` (sourced chapter outlines), `flashcard-comprehension-check`,
`exam-material-review` (whole-exam gap audit), `generate_resource_covers.py`,
`verify_check.py --sync` — with no manifest connecting "what the syllabus links" to "what
still needs writing". Each run re-discovers the gap list.

**What does exist and works:**

| Piece | Where | Role |
|---|---|---|
| Canonical syllabus *parser* | `quiz/src/lib/wikiParser.ts` `parseExamSyllabus` | `[!example]` callout = objective (`{weight}` split off); every link inside = concept; `[!answer]` = sources |
| Objective index / chapter marks | `quiz/src/lib/syllabusChapters.ts` | `isSyllabusConcept` (dated names are sources, not concepts) |
| Source Material lift-out | `quiz/src/lib/sourceMaterial.ts` | renders the `[!answer]` callout as cards |
| Syllabus PDF URL table | `quiz/src/data/examPdfLinks.ts` (syllabus section, ~L171) | transcribed URLs for P, FM, 5, 6C, 7, MAS-I, MAS-II |
| Link validator | `.claude/skills/actuarial-concept-definitions/validate_links.py` | missing `.md`, broken `[[links]]`, broken question `wiki_link` |
| Whole-exam audit | `.claude/skills/exam-material-review/audit_exam.py` | stubs, zero-question concepts, missing comprehension checks |
| Question-bank CI gate | `scripts/validate_content.py` (`content-validation.yml`) | questions only — **not exam pages** |
| VERIFY | `scripts/verify_*.py`, `docs/verification.md` | every exam page is `status: unverified`, `sources: []` |
| PDF extraction engine | `scripts/pdf_extract.py` (PyMuPDF) | built for question booklets; its text/table layer is reusable |

## 2. Findings

### 2.1 Accuracy

**A1 — Objective text is not verbatim, and nothing can tell.** The pages interleave the
examining body's wording with editorial additions, and the parser cannot distinguish
them: every link in an `[!example]` callout becomes a syllabus concept, feeds mastery,
the study plan, readiness, and obliges a comprehension check.
- `Exam 5 (CAS).md` objective B opens with an inserted sentence: *"See [[Loss Reserving]]
  for the overall framework."*
- `Exam 6C (CAS).md` A.1 is a ~150-word paragraph enumerating ~35 linked topics (the
  Minor Injury Guideline, Fault Determination Rules, …) — far beyond the CAS content
  outline's one-line objective.
- `Exam 7 (CAS).md` puts the section preamble *inside* objective callout 1 (the
  "Candidates are expected to apply …" sentence belongs to the whole exam).

Consequence: a reader cannot tell what the CAS/SOA actually examines from what the vault
thinks is useful, and VERIFY cannot mark an exam page `verified` because there is no
mechanical way to compare it to its source (P1 in `docs/verification.md`).

**A2 — No provenance or version.** No exam page records its source PDF, the sitting it
applies to, or a hash. Syllabi change every sitting (SOA publishes per sitting; CAS per
administration). Exam 7's outline link is a 2023 PDF; 6U, 8 and 9 have **no** syllabus
link in `examPdfLinks.ts` at all. There is no way to answer "is this page current?".

**A3 — Upper-exam link graphs are mostly dead.** Broken links in scope (`validate_links.py
--exam …`):

| Exam | Objective links broken / unique | Source Material broken / total | Validator groups |
|---|---|---|---|
| 6U | 39 / 52 | 46 / 46 | 85 |
| 7 | 13 / 17 | 15 / 15 | 28 |
| 8 | 11 / 16 | 11 / 11 | 22 |
| 9 | 32 / 34 | 9 / 9 | 41 |
| P, FM, 5, 6C, MAS-I, MAS-II | 0 | 0 | — |

These are `status: development` exams, so this is expected *content debt* — but it is
debt with no worklist (see E2).

**A4 — 73 links are broken by the table-pipe bug**, vault-wide (targets ending `\`, e.g.
`Stress Testing\`, `Territorial Rating\`, `Unfair Discrimination\`). The exam-material
skill documents the trap; nothing enforces it. Mostly in `Resources/Books/` outlines —
i.e. Pipeline B output.

**A5 — Question `learning_objective` strings do not match objective titles on CAS
exams.** P and FM match exactly (`scripts/ontology_map.py` pins them). CAS does not:
Exam 5 questions say `"Ratemaking"` / `"Reserving"`, the callouts are `A. Ratemaking` /
`B. Estimating Claim Liabilities (Reserving)`; MAS-I `"Probability Models"` vs
`A. Probability Models (Stochastic Processes and Survival Models)`; MAS-II
`"Time Series"` vs `D. Time Series with Constant Variance`. `filterQuestions`
(`parser.ts` ~L532) compares these case-insensitively but exactly. Nothing wires a
syllabus-driven objective filter today, so it is latent — but it will bite the first
surface that does, and any rename of a callout silently orphans questions.

**A6 — Namesake and alias resolution is manual.** The namesake table
(`Deductible` vs `Deductible Rating`, …) lives only in prose in the concept skill. A
wrong-but-resolving link passes every validator.

### 2.2 Consistency

Measured across the ten `Exam *.md` pages:

| Convention | Variants found |
|---|---|
| Objectives heading | `## Learning Objectives` (9) vs `### Learning Objectives` (6C) |
| Weight tag | en-dash `{45–55%}` (5, 6U, MAS-I, MAS-II), hyphen `{23-30%}` (P, FM, 6C, 8, 9), **none** (7); FM has a double space before the tag |
| Callout title | lettered `A. Ratemaking` (CAS) vs bare `General Probability` (SOA) |
| Repeated `### Title` inside the callout | yes (5, 6C, 7, MAS-*) / no (P, FM) |
| Objective numbering | continuous across sections (5, 7) vs restarting per section (P, FM, 6C) |
| Per-section readings | bullet list (5), `·`-joined line (6C), absent (P, FM, 7). Uses short names ("Werner & Modlin", "Friedland") that are **not** linked and don't map mechanically to the Source Material entries |
| Source Material callout title | `{6 Sources}` count pill (5 only) |
| Objectives with no link at all | 0 (P, 6C, MAS-*) … 6 (9), 5 (FM, 7) |
| Link density | Exam 5: 117 unique concepts / 37 objectives; Exam 7: 17 / 17 |
| `exam-nav` div | `data-color` / `data-tracks` on some pages only; the opening tag is **never closed** (`data-current="…"` then `</div>` with no `>`) on every page — check how `WikiArticle` / `parseExamMetadata` consume it before changing |

**C-tooling — three link checkers, three resolution rules.** `validate_links.py`
(lower-cased basename), `audit_exam.py` (its own graph), and the app's
`conceptMatch.ts` / `slugForLink`. They can disagree about whether a link resolves. The
vault-wide validator exits non-zero with 392 problem groups, so it is **not in CI** and
exam pages have no gate at all.

**C-docs — contradictory instructions.** `actuarial-concept-definitions/SKILL.md` says
"Concept pages have **no YAML frontmatter**"; `CLAUDE.md` and the same skill's checklist
require a `verification:` block on every content file. `audit_exam.py`'s docstring lists
four exams; its map has more.

### 2.3 Efficiency

**E1 — Syllabus conversion is the expensive path.** With no extractor, converting a
syllabus means a model reading the PDF (rendered or pasted) and retyping every objective
— exactly the cost `pdf_extract.py` was built to eliminate for questions, and the source
of A1's drift.

**E2 — No gap manifest between A and B.** The downstream worklist (missing concept pages,
missing resource pages, missing comprehension checks, stubs) is recomputed ad hoc by
whoever runs `audit_exam.py` / `validate_links.py` and read by eye. Current Pipeline B
debt, syllabus concepts only:

| Exam | Linked concepts | Pages exist | Missing comprehension checks |
|---|---|---|---|
| 6C | 135 | 135 | **135** |
| MAS-II | 89 | 88 | 49 |
| 6U | 52 | 13 | 12 (of those with pages) |
| 7 / 8 / 9 | 17 / 16 / 34 | 4 / 5 / 2 | — |
| P, FM, 5, MAS-I | 67–117 | all but ≤1 | ≤1 |

**E3 — Re-conversion is destructive.** Because transcription and editorial additions
live in the same lines, a new sitting's syllabus can only be applied by hand-merging —
there is no idempotent regenerate.

**E4 — Reading→resource matching is by eye.** Each reading must be matched to a
`Resources/Books/` filename (`Title (Author - Year)`) by hand; `lib/factCheckSources.ts`
already implements a strict word-subset matcher for exactly this problem on the app side.

## 3. Recommended design

Mirror `docs/pdf-question-pipeline.md`: four stages, only one of which spends model
tokens, with a JSON intermediate that is the single source of truth.

```
syllabus PDF ─► syllabus_extract.py ─► syllabus.json  (verbatim, hashed, no model)
                                          │
                        syllabus_link.py ◄┘  deterministic term→page resolution
                                          │   └─► review queue (the only model step)
                        links.json ◄──────┘
                                          │
      syllabus_write.py (json + links + overlay) ─► Exam *.md   (idempotent)
                                          │
      syllabus_lint.py ◄──────────────────┘  CI gate + fidelity diff
                                          │
      syllabus_gaps.py ─► gaps.json ─► Pipeline B skills (concept / toc / check)
```

### Stage 1 — `scripts/syllabus_extract.py` (no model)
- Input: a syllabus/content-outline PDF (URL from `examPdfLinks.ts` or a local file).
  Reuse `pdf_extract.py`'s PyMuPDF text layer (lazy import, same as today).
- Output `syllabus.json`: `{exam_id, body, sitting, source_url, source_sha256,
  sections:[{letter, title, weight_raw, weight:{lo,hi}, preamble, objectives:[{num,
  text, subitems[]}], readings:[str]}], readings:[{citation, assignment}]}`.
  All strings verbatim from the PDF (normalised whitespace, `mdmath.py` for stray
  unicode only).
- Two parsers behind one interface — SOA syllabus layout and CAS content-outline layout
  — each with fixture tests on the current PDFs (commit small extracted-text fixtures,
  not PDFs).

### Stage 2 — `scripts/syllabus_link.py` (deterministic first)
- **Owner rule (2026-09-25): every noun phrase in an objective links to a note**
  — an existing page, or the name of the page that should exist (which is then a
  gap on the Stage 5 worklist). `syllabus_lib.noun_phrases` is the stdlib chunker
  that finds them; `syllabus_lint.py` warns on any left unlinked (`unlinked-noun`)
  and the linker proposes the same chunks. Applied to Exams 6C, 6U, 7, 8 and 9
  (2026-09-26). Abstract nouns that name no concept ("role", "purpose",
  "effectiveness") are exempt — `syllabus_lib.GENERIC_NOUNS`, short and explicit.
  **Not yet applied to P, FM, 5, MAS-I, MAS-II** — measured first, below.

  | Exam | Concepts now | Links it would add | of which already concepts | Existing pages newly in the syllabus | New notes | New checks needed | Concepts after | A learner's coverage × |
  |---|---|---|---|---|---|---|---|---|
  | P | 65 | 23 | 11 | 1 | 10 | 10 | 76 | 0.86 |
  | FM | 83 | 13 | 6 | 2 | 3 | 5 | 88 | 0.94 |
  | MAS-I | 95 | 24 | 10 | 2 | 11 | 11 | 108 | 0.88 |
  | MAS-II | 83 | 46 | 15 | 4 | 25 | 26 | 112 | 0.74 |
  | 5 | 117 | 45 | 17 | 1 | 18 | 19 | 136 | 0.86 |

  Hand-curated from the chunker's raw output (which proposes 41–96 phrases per
  exam, most of them words like "along" or "tasks below"). Coverage is 60% of
  the readiness score and new concepts start at New, so a fully covered learner
  would lose roughly 60 × (1 − factor) points until the new notes are mastered:
  ~8 on P, ~4 on FM, ~7 on MAS-I, ~16 on MAS-II, ~8 on Exam 5.
- For each objective, propose `[[…]]` spans by matching n-grams of the **verbatim text**
  against existing `Concepts/*.md` names + a new committed alias file
  (`scripts/concept_aliases.py` or `.json`: variant → canonical page, plus a per-exam
  namesake table replacing the prose one in the skill). Longest match wins.
- Readings resolved to `Resources/Books/` by porting the strict word-subset rule from
  `quiz/src/lib/factCheckSources.ts` (every word of the page title appears in the
  citation).
- Everything unresolved goes to `review.jsonl`: *"is this phrase a concept? which page?
  new page name?"* — the only model step, answered as small JSON decisions, never as
  rewritten prose. Decisions are persisted to `links.json` so the next sitting reuses
  them.

### Stage 3 — `scripts/syllabus_write.py` (idempotent)
- Renders the page in **one canonical shape** (fix the table in §2.2 to a single column):
  `## Learning Objectives`; callout `> [!example]- A. Title {lo–hi%}` (en-dash, the
  format the majority already uses, single space); no repeated `### Title`; section
  preamble as the first callout line; objectives numbered as the source numbers them;
  `**Readings:**` as linked short refs to the Source Material entries; `## Source
  Material` last; a well-formed `exam-nav` div.
- **Links wrap existing words only.** The page text with links stripped must equal the
  extracted text.
- **Editorial additions live apart from transcription** — see decision D1 below. The
  writer merges a hand-authored overlay file (intro paragraph, prerequisite list, extra
  concept links, notes) so re-running on a new sitting never clobbers authored work.
- Frontmatter gains a `syllabus:` block *above* `verification:` (which must stay last):
  `source_url`, `sitting`, `source_sha256`, `extracted_at`. The sha makes the exam page
  verifiable: `verify_record.py` can cite the PDF, and a fidelity-pass is a mechanical
  check rather than a reasoning one (satisfies P1).

### Stage 4 — `scripts/syllabus_lint.py` (CI gate)
Add to `content-validation.yml`, scoped to `Exam *.md`. Errors:
1. Structure: canonical heading/callout/weight regexes; weights sum to a range
   containing 100%; every section has ≥1 objective.
2. Fidelity: link-stripped objective text == `syllabus.json` text (when a `syllabus:`
   block is present).
3. Every objective has ≥1 link (warning for `development` exams, error otherwise —
   read the status from a tiny Python mirror of `lib/examStatus.ts`, or a JSON file both
   read).
4. No dated `(Author - YYYY)` links inside objectives; no links inside table rows; no
   target ending in `\`.
5. Every `[!answer]` Source Material link resolves (warn-only for `development` exams).
6. Every question `learning_objective` in the matching bank equals a callout title
   (normalised: leading `A. ` stripped) — fixes A5 at the root.
Also a vitest contract test that runs `parseExamSyllabus` over every bundled exam page
and asserts: every topic has a parsed weight, ≥1 concept, and resources ≥1 — so the lint
and the app parser cannot drift.

### Stage 5 — `scripts/syllabus_gaps.py` → the Pipeline B worklist
Emits `gaps.json` per exam (and a markdown summary): missing concept pages (with the
objective text that introduced each — the page's brief), missing resource pages (with
the citation + assignment — the `textbook-toc` input), missing comprehension checks,
stub pages, question-less concepts; each item ranked by objective weight × inbound
question links (the priority `exam-material-review` already argues for). Pipeline B
skills take an item from the manifest rather than rediscovering it, and a batch run is
"work the top N".

### Pipeline B test conditions (make them executable)
Each page type's checklist already exists in prose; turn the mechanical half into one
`scripts/page_lint.py` with a mode per type, run in CI on changed files:
- **Concept:** body starts `**Term**`; a `> $$` block before any bullet; 1–3
  `[!example]-` callouts each with nested `[!answer]-`; no `\qquad` joins; `$$` fences on
  own lines; all links resolve; no links in tables.
- **Resource:** required frontmatter keys (`Title`, `Authors|Author`, `Year`, `Type`,
  `Available from` or library line); first body embed is a cover; outline bullets link
  concepts; TOC provenance note present (from `textbook-toc`).
- **Comprehension check:** already parsed by `comprehensionCheckParser.ts` + corpus
  tests — just add "every syllabus concept of a `ready`/`beta` exam has one" as a
  warning in `syllabus_lint.py`.

## 4. Decisions the owner must make before implementation

- **D1 — Where do editorial concept links go?** Today they are mixed into objective text
  and count as examinable. Options: (a) a separate line per callout,
  `> **Key concepts:** [[…]] · [[…]]`, still inside `[!example]` so they stay syllabus
  concepts (recommended — keeps 6C's rich graph, makes the verbatim part checkable);
  (b) a non-`[!example]` callout, which the parser ignores (drops them from mastery);
  (c) accept non-verbatim text and skip the fidelity check.
- **D2 — Objective numbering.** Keep the source's numbering (recommended) vs. force
  continuous.
- **D3 — Title form.** Keep CAS letter prefixes (`A. Ratemaking`) and normalise in the
  question matcher (recommended), or strip them and rename callouts.
- **D4 — Should `validate_links.py` go to CI?** Recommended: yes, but scoped to
  `ready`/`beta` exams and their linked pages, with the vault-wide run as a report.

## 5. Work packages (ordered; each a small PR)

| # | Package | Addresses | Acceptance |
|---|---|---|---|
| 1 | Fix the quick consistency defects by hand: 6C heading level, FM double space, `exam-nav` closing `>`, 73 `\`-terminated links (convert those tables to bullet lists), skill-doc frontmatter contradiction, `audit_exam.py` docstring | C, A4 | `validate_links.py` groups drop by ≥73; build + tests green; `verify_check.py --sync` run |
| 2 | `syllabus_lint.py` (structure + links + question-LO match, **no** fidelity yet) + CI job; fix whatever it fails on for ready/beta exams, including normalising weight tags to en-dash and aligning CAS question `learning_objective` values (via `standardize_questions.py` / `ontology_map.py`, extended to CAS) | C, A5 | lint green on all ten pages; CI job added |
| 3 | Shared resolver: one Python module (alias file + namesake table + case/hyphen rules matching `conceptMatch.ts`), used by `validate_links.py`, `audit_exam.py` and the lint; a vitest that loads the same alias JSON so app and scripts agree | A6, C-tooling | a fixture of known variants resolves identically in Python and TS |
| 4 | `syllabus_extract.py` + fixtures for P, FM, 5, MAS-I (both layouts) | E1, A2 | `syllabus.json` for each; objective count and weights match the current pages |
| 5 | `syllabus_link.py` + `syllabus_write.py` + overlay; regenerate P and 5 with **no** content diff other than canonical-format changes; add `syllabus:` frontmatter; enable fidelity check for regenerated pages | A1, E3 | re-running is a no-op; fidelity check passes |
| 6 | Apply to the rest (FM, 6C, MAS-*, then 6U/7/8/9 once their PDFs are located and added to `examPdfLinks.ts`); resolve D1 for 6C | A1, A2 | every exam page has `syllabus:` provenance |
| 7 | `syllabus_gaps.py` + `docs/syllabus-pipeline.md` (the design doc, replacing this review); point `exam-material-review` and `actuarial-concept-definitions` skills at the manifest; add a `syllabus-converter` skill that drives stages 1–5 | E2 | `gaps.json` for all exams; skills reference it |
| 8 | `page_lint.py` for Pipeline B page types, CI on changed files | B test conditions | lint green on changed files in CI |
| 9 | VERIFY integration: `verify_record.py` accepts the syllabus PDF (url + sha) as the citable source for an exam page whose fidelity check passes | A1, A2 | an exam page can reach `verified` |

Package 1 and 2 are cheap and independent; do them first. Packages 4–6 are the actual
pipeline. Don't regenerate a page that has hand-authored content (6C especially) until
the overlay (package 5) exists.

## 6. Commands to reproduce the measurements

```bash
python3 .claude/skills/actuarial-concept-definitions/validate_links.py            # 392 groups vault-wide
python3 .claude/skills/actuarial-concept-definitions/validate_links.py --exam "Exam 7 (CAS)"
python3 .claude/skills/actuarial-concept-definitions/validate_links.py | grep -c '\\\s*<-'   # 73 pipe-bug links
python3 .claude/skills/exam-material-review/audit_exam.py --exam exam-mas-ii
grep -h '^> \[!example\]' Exam*.md                                                # callout/weight formats
grep -h '^learning_objective:' questions/exam-5/*.md | sort | uniq -c             # vs callout titles
grep -h 'status:' Exam*.md | sort | uniq -c                                       # all unverified
```

## 7. Constraints the implementer must respect

- `verification:` stays the **last** frontmatter key; run `python3 scripts/verify_check.py
  --sync` after every content edit, never hand-edit its derived fields.
- Syllabus URLs in `examPdfLinks.ts` are **transcribed, never constructed** from a filename
  pattern (see the comment block there and `docs/mock-exam-browser.md`).
- Adding a link inside an `[!example]` callout makes it a syllabus concept: it enters
  mastery, the study plan and readiness, and obliges a comprehension check.
- `pdf_extract.py` is the only non-stdlib script (PyMuPDF, imported lazily); keep new
  scripts stdlib-only except the extractor, and keep them importable without PyMuPDF.
- No wiki content ships 100% AI-written without human review (`CLAUDE.md`). The pipeline's
  job is to make the human review small: a fidelity diff and a short review queue.
