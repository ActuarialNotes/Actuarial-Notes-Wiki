# Content Plan

_Measured **2026-10-18** against `main` @ `ac1b277` with the commands in §7 (MAS-II re-measured after its first round, FAM, ASTAM and ALTAM after their banks (19 Oct), the SOA prelims after Phase 3's linker work, SRM after its bank); the question banks (§2.1) re-measured **2026-10-23** @ `d0a75a8` · Re-measure at every
roadmap review_

> **Current focus (from 23 Oct 2026): every question file verified.** **Phase Q** (§4) goes
> ahead of everything left in Phases 2–4. 817 served questions are not yet verified, and 494 of
> them were transcribed by a model from page images. The other work waits behind it: concept and
> reading packets, and new banks. The exception is work a question packet carries with it. §2.1
> has the count, and Phase Q has the waves.

This is the **one plan for the vault's content**: the exam pages, concept pages, resource pages
and question banks, the fact check that stands behind them, and the generated figures and
simulators drawn on them. It says what "ready" means, where every exam stands, every open piece
of content work, and the order it is done in, as **phases**.

It replaces the content subplans that used to sit beside the roadmap:

| Was | Now |
|---|---|
| `docs/cas-publication-plan.md` — the seven gates, the CAS order of work, its decisions and its campaign records | **Folded in and removed.** The gates are §1, the order is §4, the decisions are §6, and the DISC and Exam 7 campaign records are Appendix A. |
| `docs/verification-plan.md` — the waves, their status, and the maintainer's decisions | The waves are §3.2 and §4, the decisions are §6. **The method stays there**: one document per load, the source inventory, the Wave 0 packet tooling, the packet procedure and the sizing. |
| `CONCEPT_GAPS_PLAN.md` — the missing concept pages (phases A–D) | Its open items are §3.3. **It stays** as the generated gap worklist (`find_concept_gaps.py --update-plan` writes its lower half) and the record of phases A–D. |
| `docs/syllabus-pipeline-review.md` — work packages 1–9 | The open packages are §3.4. The review stays as the record of how the pipeline was designed. |
| `docs/resource-pages.md` §5, `docs/concept-figures.md`, `docs/distribution-simulators.md` | Their leftovers are §3.6–§3.7. The docs stay as the standard and the how-to. |

How it sits under the roadmap: `docs/roadmap.md` ranks the work **across lanes** and keeps the
item IDs (C1…C18, V1…V10, D1…D21); this plan orders the **content lane** and groups those items
into phases. A PR that moves a content item updates its line here *and* its line in the
roadmap. Where the two disagree about status, the code wins and both get fixed (roadmap §0.5).

> **In flight elsewhere.** Another session is adding the SOA and CAS exams the vault doesn't
> have yet (new `Exam *.md` pages, `scripts/exam_catalog.json`, `examStatus.ts`, the tracks).
> This plan doesn't duplicate that work: each new page enters §2 at `development` and joins
> Phase 3 or 4 by its body and stage (§3.0).

---

## 1. What "ready" means: seven gates

An exam is promoted when `python3 scripts/publication_readiness.py --check <exam>` passes. The
script is the single definition, for both bodies, so the plan is measured rather than argued.

| Gate | Passes when |
|---|---|
| **G1 page** | The exam page is `verified` against the examining body's outline. |
| **G2 written** | Every link in a learning objective lands on a page, and no syllabus concept page is a stub. |
| **G3 specific** | No concept page is linked *under another name* from more than two objective lines of one exam page. |
| **G4 checked** | Every syllabus concept page is `verified`. |
| **G5 sources** | Every Source Material reading has a `Resources/` page, and it is `verified`. |
| **G6 questions** | Every syllabus concept has at least one question the quiz serves, in the exam's own bank. |
| **G7 bank** | Every question the quiz serves from that bank is `verified`. |

The rules underneath are `docs/verification.md`'s: nothing reaches `verified` without a citable
external source read in that run (P1), and any edit drops a file back to `stale` (P4). Questions
with an open critical finding are kept out of the quiz, so G6 and G7 count only questions that
are actually served.

**G3 exists because of the DISCs.** `[[Commercial General Liability|CGL Coverage B]]` looks
specific, but it sends the reader to an overview that gives Coverage B one bullet. The gate counts
links whose text doesn't name the page they point to; "Premium Auditing Process" → *Premium
Audit* is fine. G3 can't catch a link to the **wrong** page under a plausible name (DISC-IA's
"Types of Annuities" went to *Life Annuity*), or to the **wrong country's** page (a Canadian
page standing in on a U.S. syllabus), so every campaign starts with a person or an agent reading
each link (§1.2, rule 5).

### 1.1 Status steps, and holding them

- **development → beta**: once G2, G3 and G6 pass — the material exists, every section has its
  own page, and every concept can be quizzed.
- **beta → ready**: once all seven pass. Promotion is a one-line change in
  `quiz/src/lib/examStatus.ts`, mirrored in `scripts/exam_catalog.json` (`examCatalog.test.ts`
  holds them together); an exam leaving development joins the DEFAULT track
  (`data/tracks.test.ts`). It is the maintainer's call (roadmap §0.1), in the same PR as the run
  that got the exam there, citing the script's output.
- **Holding ready** (new in Phase 1): `python3 scripts/publication_readiness.py --hold` runs in
  `content-validation.yml`. A `ready` exam that fails a **structural** gate (G2, G3, G6 — a fact
  about the pages, links and bank) fails the PR. A ready exam owed a **fact check** (G1, G4, G5,
  G7 — an edit makes a page stale by design, and `verify-check.yml` repairs the record) and a
  beta exam below the beta bar print as warnings: the first is a re-check the exam is owed, the
  second its worklist.

### 1.2 Rules every campaign keeps

Adopted during the DISC, MAS-I and Exam 7 campaigns (Appendix A), and binding on every later one:

1. **A file with an open major finding is `in_review`, never `verified`.** A critical finding
   makes it `disputed`, and the quiz withholds the question.
2. **The clean-up round may author, within limits.** A checker may delete a claim, restate it to
   what a source it read says, reword a question its own finding proposed changing, retag, or
   drop or retarget a link — each recorded as a finding plus a resolution, then verified again.
   Anything new goes to a separate writer, and a different checker verifies it.
3. **Don't make an exam depend on another exam's commercial reading.** Where a section leans on a
   shared page whose other half rests on a book no one can read free, give the section its own
   page.
4. **Never cite an unauthorized copy.** Cite such a book by edition and pages; prefer an open
   text covering the same ground.
5. **Read every link before checking anything.** Wrong targets and the wrong country (Canadian
   pages on U.S. syllabi, and back) waste the check that follows.
6. **Editing a page another exam has verified costs that exam a re-check.** Count it in the
   campaign; do the delta check in the same run where the source is already loaded.
7. **Batch by source document, not by folder** (`docs/verification-plan.md` §2): one paper and
   every question sat on it, wherever filed (`originally_exam`), or one reading with its concepts
   *and* its resource page. Mechanical first; the model reads only the residue.
8. **Nothing a PDF prints is retyped by a model** (`docs/pdf-question-pipeline.md`), and nothing
   is invented — figures, chapters, codes and links are transcribed with their source.

---

## 2. Where each exam stands (2026-10-18)

From `python3 scripts/publication_readiness.py --body all`, before this plan's Phase 1 changes;
MAS-II's row is re-measured after its first campaign round (Appendix A.5), SRM's, FAM's, ASTAM's and ALTAM's after their banks
(Phase 3, step 4).

**Ready (7):**

| Exam | Gates | What fails |
|---|---:|---|
| MAS-I, DISC-DA, DISC-RM, DISC-IA, Exam 7 | 7 / 7 | — |
| **Exam P** | **5 / 7** | G4: *Insurer* is `in_review` (its Exam 9 and form-of-insurer bullets are unsourced). G6: six syllabus concepts have no question tagged — *Random Variable*, *Discrete* / *Continuous Random Variable*, *Insurer*, *Policyholder*, *Claim*. |
| **Exam FM** | **6 / 7** | G3: *Term of Annuity* stands in, as "finite term", for three objective lines. |

Two ready exams failing their own gates is an unbacked promise — roadmap §0.3, rule 1 — and it is
why Phase 1 comes first.

**Beta (10):**

| Exam | Page | Concepts | Catch-alls | Unverified concepts | No question | Sources unverified | Bank verified | Gates |
|---|---|---:|---:|---:|---:|---:|---|---:|
| Exam 8 | verified | 39 | 0 | 1 | 0 | 1 / 12 | 143 / 143 | 5 / 7 |
| PCPA | verified | 29 | 0 | 9 | 29 | 12 / 13 | no bank | 4 / 7 |
| Exam 9 | verified | 60 | 0 | 48 | 10 | 9 / 9 | 98 / 121 | 3 / 7 |
| Exam 6C | stale | 151 | 0 | 141 | 22 | 67 / 67 | 0 / 321 | 2 / 7 |
| MAS-II | in review | 98 | 0 | 2 | 0 | 0 / 6 | 167 / 168 | 4 / 7 |
| Exam 5 | in review | 136 | 2 | 60 | 7 | 4 / 6 | 0 / 349 | 1 / 7 |
| SRM | verified | 41 | 0 | 7 | 0 | 1 / 2 | 5 / 77 | 4 / 7 |
| FAM | verified | 80 | 0 | 37 | 0 | 3 / 3 | 6 / 274 | 4 / 7 |
| ASTAM | verified | 56 | 0 | 22 | 0 | 4 / 4 | 2 / 62 | 4 / 7 |
| ALTAM | verified | 61 | 0 | 50 | 0 | 2 / 2 | 0 / 94 | 4 / 7 |

Five of the first six were below the development → beta bar they now have to meet (G3 or G6) — they
were beta before the gates existed; Phase 2 has since lifted every one with a bank over it. SRM,
promoted 18 Oct, and FAM, ASTAM and ALTAM, 19 Oct, entered over the bar (G2, G3, G6). `--hold` warns on them rather than failing.

**Development (26):** Exam 6U (3 / 7; 45 readings unverified, no bank) and the 25 SOA exams
past FM but SRM, FAM, ASTAM and ALTAM — two ASA prelims (PA, ATPA; 4 / 7, after Phase 3's linker
work, §3.1a) and the 23 FSA modules — each at 2–3 / 7. Every SOA page is `verified` against its syllabus PDF; none of them has a bank. Their G2
failures are mostly the syllabus linker's cut-short and noise links (`[[Chain-Ladder]]`,
`[[Whole Life]]`, `[[Distribution]]`), not missing concepts (§3.3–§3.4).

**Across the vault:** 5,533 content files, about 55% verified; 3 stale (two retired DISC-RM
questions and Exam 6C's page, held behind D8); **2 open critical findings**, both Exam 6C (*MCT*,
*Capital Required*).

### 2.1 The question banks (2026-10-23)

From the *Question banks* table that `generate_validation_status.py` writes into
`Validation Status.md`. A **served** question is one the quiz can draw. An **off-syllabus** one
(`off_syllabus: true`) is kept for the record and out of draws.

| Bank | Served verified / served | Off-syllabus verified / off | What is left |
|---|---:|---:|---|
| exam-6c | 22 / 343 | 0 / 73 | 13 papers, none checked (Q2) |
| exam-fam | 6 / 274 | — | Both SOA sample sets, model-transcribed (Q1) |
| exam-altam | 0 / 94 | — | Sample set and seven sittings, model-transcribed (Q1) |
| exam-srm | 5 / 77 | — | The SOA sample set, 21 prompts model-transcribed (Q1) |
| exam-astam | 2 / 62 | — | Sample set and seven sittings, model-transcribed (Q1) |
| exam-9 | 131 / 131 | 0 / 149 | The off-syllabus questions on its own seven papers (Q4) |
| exam-8 | 143 / 143 | 0 / 7 | Off-syllabus (Q4); 16 owed their report paragraph (Q3) |
| exam-5 | 356 / 357 | — | Fall 2017 Q19 `in_review` (Q3) |
| exam-mas-ii | 140 / 141 | 30 / 30 | Fall 2019 Q35 `in_review` (Q3) |
| exam-fm | 460 / 460 | 1 / 2 | fm-231 `in_review`; four V10 retags (Q3) |
| exam-disc-rm | 144 / 144 | 0 / 2 | Two retired questions, stale behind V9 (Q3) |
| exam-7 | 126 / 126 | 18 / 18 | 33 owed their report paragraph (Q3) |
| exam-p | 719 / 719 | 9 / 9 | Cited against superseded sample PDFs (Q3) |
| exam-mas-i, the three DISCs | 572 / 572 | — | — |
| **All banks** | **2,826 / 3,643** | **58 / 290** | **817 served, 232 off-syllabus** |

---

## 3. The workstreams

Every open piece of content work, by kind. §4 puts them in order.

### 3.0 Exam coverage — new exam pages (another session)

Adding the SOA and CAS exams the vault lacks. A new page is generated through the syllabus
pipeline (`docs/syllabus-pipeline.md`) and enters at `development`. **Nothing here duplicates
it**; once its pages land they are measured in §2 and picked up by Phase 3 (ASA-level) or Phase 4
(fellowship-level and no-bank exams).

### 3.1 Publication campaigns, exam by exam

Each step is a campaign: links read first (§1.2 rule 5), one sweep run and one resolve run,
batched by source. The order is the CAS plan's, refreshed:

| # | Exam | Gates | What it takes | Why here |
|---|---|---:|---|---|
| — | MAS-I, DISCs, Exam 7 | 7 / 7 | Done (10, 11 and 16 Oct 2026; Appendix A) | |
| 1 | **Exam P, FM** (C8) | 5, 6 / 7 | Phase 1 | Already `ready`; the gates must hold |
| 2 | **Exam 8** (C1) | 6 / 7 | Only G5: the ISO CGL rating plan, in the CAS study kit only (D20). *Risk* verified 18 Oct (run `rsk1`): its uncertainty half now quotes the SOA and SRA glossaries, the unsourced claims cut | Shares papers with 9; 34 of 9's questions already cleared |
| 3 | **Exam 9** (C2) | 4 / 7 | First round done 18 Oct (Appendix A.4): G7 128 / 131, G5 7 / 9, G4 24 / 60. Left: three questions in review on a maintainer's call (2013 Q15, 2014 Q16, `cas9-an-009`), and 36 concepts and 2 readings resting on texts no session could read (D22) | Most of its bank arrived verified through 7 and 8 |
| 4 | **Exam 5** (C3) | 4 / 7 | G3 and G6 ✅ (catch-alls re-linked; `cas5-an-001`–`007`, verified; *Claim Reserve*, newly linked, tagged on `cas5-2016s-q16`). D8 (the re-issued Fall 2026 v02 outline; the page is stale after the re-linking); verify 60 concepts, 4 readings, 349 questions on 14 papers (Spring 2018's booklet found 18 Oct: CAS publishes it as a workbook, `april_may_sp18-5.xls`, one sheet per question, sha256 8ccb0dd8…, linked as "Exam 5" on the Past Exams & Pass Marks page; the PDF link is the examiner's report alone). Its reports were **paraphrased** when the bank was written, not transcribed — each paper's packet restores the report as printed, opening paragraph included (C13) | Largest bank; *Basic Ratemaking* and *Friedland* packets also serve the DISCs and FAM |
| 5 | **MAS-II** (C4) | 4 / 7 | First round done 18 Oct (Appendix A.5): G5 ✅ (6 / 6, Salis's study note added to the page), G7 167 / 168, G4 96 / 98. Left: the page's F-001, its 36 tasks against the outline's 21 (D23); Fall 2019 Q35's explanation (a writer); *Backward Shift Operator* and *Correlogram*, which quote Cowpertwait's own wording (commercial, unread) | Scanned papers; four of its five readings commercial |
| 6 | **Exam 6C** (C5) | 3 / 7 | G7's 321 questions are **Phase Q, wave Q2**. G6 ✅ (`cas6c-an-001`–`022`, all verified; `005` and `018` carry minor scope findings — IBC's consumer code and the IFRS 17 transition approaches are in no 6C reading). D8 (F-001, domain C renumbering); verify 137 concepts, 67 readings, 321 questions (83 got their report paragraph back, C13) | Most concepts and readings, all free Canadian documents |
| 7 | **PCPA** (C6) | 4 / 7 | A vault-written bank (29 concepts, most shared with MAS-I/II: tags plus a few new questions, D5); verify 9 concepts and 12 readings (several commercial) | No paper exists; the Projects simulator is the real practice |
| 8 | **ASA prelims** (C9) | 4 / 7 | §3.1a: G2 and G3 pass on all six. SRM's bank done and SRM beta (18 Oct); FAM's two sample sets done and FAM beta (19 Oct); ASTAM's and ALTAM's sample sets and seven papers each done and both beta (19 Oct); next PA and ATPA (projects: a bank for the concepts, D5), and the SRM, FAM, ASTAM and ALTAM fact-check campaigns | The next exams to become studiable, sat by far more candidates |
| 9 | **Exam 6U** (C7) | 3 / 7 | Read every link for country first; a vault-written bank for 66 concepts; verify 56 concepts and 45 readings (all pages exist, none verified); its objective codes don't match its numbering | Furthest CAS exam from ready |
| 10 | **FSA modules** (C10) | 2–3 / 7 | Pages and concepts exist, no banks; most readings have no free copy | Fellowship-level; fewest candidates per module |

### 3.1a The SOA ASA prelims (C9)

The campaign table for Phase 3, as §3.1 is for CAS. Gates measured 18 Oct 2026 after the linker
work below; what the SOA publishes was found on soa.org's own pages (its *Past Exams and
Solutions* page and each exam's current syllabus PDF, which links the sample sets), never
assembled from a filename pattern. The *Past Exams and Solutions* page says FAM and SRM papers
"will not be released".

| Exam | Gates | Concepts (unverified) | What the SOA publishes to convert | Readings |
|---|---:|---:|---|---|
| **SRM** — beta | 4 / 7 (G1–G3, G6) | 41 (7) | One sample set: 76 MC questions with solutions in one PDF (`globalassets/assets/Files/Edu/2018/exam-srm-sample-questions.pdf`, last revised Oct 2026, Q76; sha256 `6453fceb…`). **Converted** 18 Oct: 72 live questions (`srm-001`–`076`) + 5 vault-written (`srm-an-001`–`005`, verified) | ISLR free (verified); Frees 2010 commercial |
| **ASTAM** — beta | 4 / 7 (G1–G3, G6) | 56 (22) | Sample set: 25 written-answer questions (questions version Feb 23, 2026, sha256 `0294cf4e…`; solutions Jan 19, 2025, `c4206394…`; Q22, Q24 in Excel); seven past sittings, Spring 2023–Apr 2026, 6 questions each with model solutions (examiners' comments on most), from 2024 on Q1 the Excel question. **Converted** 19 Oct: 23 sample (`astam-<n>`) + 37 past-paper (`astam-<year><s\|f>-q<n>`) + 2 vault-written (`astam-an-001`–`002`, verified) | Klugman 2019 and Brown & Lennox 2022 commercial; ASTAM-21-26 and -22-23 free SOA study notes |
| **FAM** — beta | 4 / 7 (G1–G3, G6) | 80 (37) | FAM-S sample set: 103 live MC questions (Topics 1–6; questions Jun 15, solutions Jul 17, 2026; sha256 `ef535e21…` / `7b3f61d8…`); FAM-L sample set: 165 live MC questions (Topics 7–10, Aug 18, 2026; `4aaf3469…` / `9e7f7b03…`), many from MLC papers 2012–2017. **Converted** 19 Oct: 268 (`fams-<n>`, `faml-<chapter>-<n>`) + 6 vault-written (`fam-an-001`–`006`, verified) | Klugman, Brown & Lennox, Dickson et al. (AMLCR) — all commercial |
| **ALTAM** — beta | 4 / 7 (G1–G3, G6) | 61 (50) | Sample set: 61 written-answer questions, January 2026 version (sha256 `49872aa3…`; solutions `3e52f41d…`; Q57–60 Excel), most of them old MLC and LTAM written-answer questions; seven past sittings, Spring 2023–Apr 2026, 6 questions each, from 2024 on Q1 the Excel question. **Converted** 19 Oct: 57 sample (`altam-<n>`) + 37 past-paper (`altam-<year><s\|f>-q<n>`); none vault-written — the SOA's questions reach every concept | AMLCR commercial; ALTAM-21-23 free SOA study note |
| **PA** | 4 / 7 | 23 (5) | Seven project sittings, Apr 2023–Apr 2026 (9–12 tasks, statement + model solution + data); Oct 2022's two R-format sittings partly transfer | ISLR free; Frees, Lander commercial; Healy commercial (the author posts a free edition at socviz.co) |
| **ATPA** | 4 / 7 | 30 (15) | One sample assessment and model solution (2022, a 42 MB zip); no past assessments | The SOA's ATPA e-learning modules (candidates only) |

Order, by candidates and by how much the SOA hands over ready-made: **SRM** (one MC set,
a free main reading already verified) → **FAM** (two large MC sets, the most-sat prelim) →
**ASTAM** and **ALTAM** (written-answer sets and papers, the CAS converter's shape) → **PA**
and **ATPA** (projects: practice is the project, a bank only for the concepts — D5).

Before the first conversion (step 4) a bank has to exist for the exam: a prefix in the converter
(`SOA_PREFIX` / `SOA_BANK` in `scripts/pdf_extract.py`), a `bank` in `scripts/exam_catalog.json`,
a label in `EXAM_LABEL_TO_ID` (`lib/examIds.ts`, which `bankLabelFor` reads), a row in the quiz
builder's `QUIZ_EXAMS`, the body in `EXAM_BODIES`, and the paper's length and pace
(`PRACTICE_EXAM_QUESTIONS`, `EXAM_PACE`, and Actuaria's raid mirror in `quiz/api/_raid/rules.js`).
SRM has all of them (18 Oct). Promoting an exam to beta also makes its objectives Concept Craft
boards, whose connections want written labels (`data/craftRelations.json`), and puts it on the
DEFAULT track.

**How SRM's set converted** (the recipe for FAM's two sets): the SOA's PDF is one file, questions
then solutions, and the extractor finds the solutions only when the two halves are passed
separately (`--questions` pp.1–57, `--solutions` pp.58–76). 72 questions are live (17, 28, 47 and
65 are printed `DELETED`); Q7 prints no key, and its solution names D. The booklet sets its
equations as embedded objects, so 21 prompts were transcribed from the page (18 the extractor
flagged, 3 more found by scanning the options for equation debris: Q42, Q67, Q75), ten questions'
figures were cropped from the PDF with full alt text (17 images; Q48's five options are plots),
and 20 solutions were rewritten where the PDF lost their structure. Q70's printed solution gives
Model I's AIC as 1,836.42 where the arithmetic gives 1,838.42 (the key is unaffected). The
skill's five-question pilot of topic choices was not run as a conversation: the topics and
objectives are the PR's to review.

**How FAM's sets converted** (19 Oct): four PDFs, booklet and solutions for each set, all linked from the October 2026 syllabus. The extractor learned three layouts (`fam-s` / `fam-l` in `SOA_PREFIX`): FAM-S heads five solutions `Question: #28` and prints withdrawn questions `Deleted.` (5, 62, 65–67, 79, 80); FAM-L numbers by AMLCR chapter (`7.41`), read off the solutions' `Question 7.41` headings and found in the booklet in that order (one, 6.44, written `Question# 6.44`), and ends a past-paper question with `[Question 8 on the Fall 2014 exam]`, which rode on option E. The SOA sets equations as embedded objects, so the text layer scrambled nearly every formula: ten agents transcribed every prompt from the page images and rewrote every solution from the SOA's own, same method and figures, keeping the SOA's printed slips as printed (none changes a key; the three a transcriber had corrected were restored with a note). Five solution diagrams and FAM-S Q17's density graph were cropped from the PDFs.

**How ASTAM's sets converted** (19 Oct): the CAS converter's shape, not the SOA extractor's — six written-answer questions a paper, each part a `## Part` with the SOA's model solution as its `### Explanation` and the examiners' comments, verbatim, as its `### Examiner Report`, filed under the part each names. The SOA sets equations as embedded objects, so seven agents transcribed every question from 130-dpi page images (the PDFs' text layer for prose and numbers only), and four more re-read every file against the images. The Excel-workbook question (sample Q22 and Q24, Q1 of every sitting from Spring 2024) is left out: its data and its answer live in the workbook. Four plots the questions turn on are the PDFs' own images, extracted unchanged (`Media/Attachments/astam-*.png`). Three papers run to (f) or (g), which the parser had folded into (e) — fixed for twelve CAS questions too. The linter's `--fix` split of `a = b = c` rows made three false equalities (sample Q11, Q17, Spring 2026 Q6) that the checkers undid; check its output on any `align*` row holding two statements. No sample or past question projects losses with a trend, so *Loss Trend* and *Trend* got two vault-written questions. The SOA's printed slips — about seventy, none changing a final answer (Fall 2024 Q6(b)(i)'s printed reserve, 7,617, looked like one, but the slip is its μ₆ = 0.85(18,000) = 16,200, which is 15,300; with 15,300 the printed line gives 7,617 — run `b1bc`, 23 Oct) — are kept as printed and listed in Appendix A.6.

**How ALTAM's sets converted** (19 Oct): ASTAM's recipe, in a third of the time per question, since the spec carried ASTAM's lessons — read every automatic `align*` split; leave a `*(Figure: …)*` placeholder rather than values read off a picture; keep the SOA's typos. Eight agents transcribed, four re-read every file against the page images (two transcription errors in 94: a dropped overbar, setup text filed in the wrong part) and cropped the 35 diagrams the questions turn on — state models, a sketched reserve, account-value sketches, the model answers that are drawings — from the PDFs' own vector drawings (`Media/Attachments/altam-*.png`). Nine Excel-workbook questions left out (sample Q57–60, Q1 of every sitting from Spring 2024). ALTAM's one catch-all (G3: *Life Insurance* as "long-term life" on three profit-testing lines) was the rename test's, not the page's: in "long-term life and health insurance" the two halves share the head noun, which `renamed()` now reads (a short parallel noun phrase only, so INV-101's "enhance yield … and manage liquidity in fixed income portfolios" still counts). Two links the linker had written to pages that don't exist ("individual/joint life mortality", "Guaranteed minimum accumulation/maturity benefit" — a warning in development, an error in beta) now land on *Joint Life* and *Guaranteed Minimum Maturity Benefit* through two aliases, the page re-checked against its PDF as a delta (run `bfe1`, verified high). About 120 printed slips are kept as printed and listed in Appendix A.7; the ones that touch a result are sample Q50 (the prompt's "Q is 1630", the solution's 1,506.34) and Q61 ("77 to the nearest 1", the solution's 83.85), sample Q32(d)'s and Q33(d)'s gains by source, which don't add to their totals, and sample Q36 and Q42, whose printed totals (8) aren't their parts' (10, 5).

### 3.2 Fact check (VERIFY)

The method is `docs/verification-plan.md` (one document per load, the packet tooling, the packet
procedure, the sizing); the rules are `docs/verification.md`; a sweep is run by hand
(`docs/validation-agent.md`, D19). The waves, with their status:

| Wave | What | Status |
|---|---|---|
| 0 | The packet tooling (`verify_sources`, `verify_paper`, `verify_route`, `verify_record batch`, `verify_targets --by-source`) | ✅ built |
| 1 | The backlog: disputed pages, open findings, stale files | ✅ run `2db6` (9 Oct). Left: the two 6C criticals it found (V6 → Phase 1) |
| 2 | Syllabus pages | 🟡 all 31 SOA pages and 8 CAS pages verified. Left: Exam 5 and MAS-II `in_review`, 6U `in_review` (its open findings), 6C stale behind D8 |
| 3a | FM Q351–Q462 | ✅ V4 (17 Oct). 10 topic-tag findings → V10, Phase 1 |
| 3b–4b | The exam campaigns — 7 ✅, 8 🟡, then 9, 5, MAS-II, 6C | rides §3.1 |
| 5 | The rest: 6U, PCPA, FSA and SOA development exams, orphan concepts, timeline pages | rides Phases 3–4 |
| **Q** | **Every question file**, by source document (Phase Q, §4): the SOA prelims' converted banks, 6C's papers, the residue, the off-syllabus questions | 🟡 **current focus**, Q1 running 23 Oct |

Open fact-check items outside the campaigns:

- **V6** — the two open criticals on 6C (*MCT*, *Capital Required*: ×1.5 where OSFI's MCT
  guideline ÷1.5), and the majors that share the source (*Solvency*, *Supervisory Target Capital
  Ratio*: LICAT's name for the MCT denominator). → Phase 1.
- **V10** — FM's topic tags not in `scripts/ontology_map.py`. → Phase 1.
- ~~**V7**~~ ✅ 18 Oct: the 2026-10-11 Exam 7 and DISC-RM run summaries, reconstructed from the logs.
- **V8** — the 363 concept-gap pages written in phases A–D are AI-drafted and `unverified`; they
  need human review (CONCEPT_GAPS D5). → rides each exam's campaign; Phase 4 for the rest.
- **Exam P's sample PDFs were re-issued again** (found 18 Oct): the SOA's sample questions and
  solutions now hash `24980e6d…` / `e10d2649…`, not the `e47245…` / `efade8…` several Exam P
  concept pages cite. No gate fails (a page stays verified against the copy it read), but the next
  Exam P sweep re-cites the new files as a delta, as Wave 1 did after the last re-issue.
- **V10's leftovers** — fm-370, fm-379, fm-391 and fm-421: a topic paired with another syllabus
  section, or not a syllabus term ("Premium"). Each needs a retag and a delta re-check.
- **V9** (proposed) — VERIFY can't move or retire a file, so E10's four stranded question files
  and any mis-named page stay where they are. A rule change; the maintainer's.
- **Off-syllabus questions** (232 not verified: 229 CAS, DISC-RM's two, fm-231) ride their
  paper's packet. D6 is settled as *yes* (§6), and they are Phase Q's waves Q2 and Q4.
- **Orphan concepts** (46 at the 9 Oct count): link, merge or delete before spending a check (D9).

### 3.3 Concept pages

Phases A–D of `CONCEPT_GAPS_PLAN.md` are done: 363 pages written, every concept target on the
study guides resolves but one. Left (C11):

- ***Total Risk*** (GH-101), the one concept still missing.
- **11 link fixes** — a guide links a variant of a page that exists (`Decision Making`,
  `Financial Statement`, `Maximum Likelihood Estimator` …). Each wants an alias keyed the way
  `syllabus_write.py` looks phrases up, then a re-render.
- ~~**26 cut-short links** and **91 noise links**~~ — mostly fixed in the linker (§3.4, 18 Oct):
  the SOA pages' G2 gaps went from 522 to 363, and `find_concept_gaps.py` now counts 217 missing
  concepts (was 225). What is left is mostly the e-learning modules' prose (FAP, DMAC, PAF, ASF),
  whose objectives are sentences rather than syllabus terms.
- **9 ambiguous targets** (D15; default: link the proposed page) and **30 one-word targets**.
- **21 stubs** (`Capital` is the most-linked, 6 guide links; eight have no body at all).
- Follow-ups noticed in phase D: *Workers Compensation Insurance* is Canadian, but the `wc` alias
  sends GI-302 (U.S.) there; *Risk Transfer* has nothing on pension risk transfer;
  *Decision-Making* is a stub more guides now lean on; overlaps worth a look (*Social Inflation*
  / *Nuclear Verdicts*, *Long-Tail Liability* / *Long Tail Lines*, *Non-Financial Risk* / IFRS
  17's risk adjustment, *Cognitive Bias* / *Behavioral Finance*).
- Canadian pages leading U.S. questions (Exam 7's leftovers): *Rating Agency*, *Concentration
  Risk*, *Risk Transfer*.

### 3.4 The syllabus pipeline

From `docs/syllabus-pipeline-review.md` §5 (packages 1–3 and 9 are done) and V3's findings:

- ~~**C17 — teach the writer the link names #1629 chose.**~~ ✅ 18 Oct: `syllabus_write.py` reads
  the page it is about to overwrite and keeps its Source Material links (the citation → page
  table is the page itself; `Chosen`), any plain-text line there, and every `*Key concepts:*`
  line. `--all --check` is clean on all 33 generated pages, held by a test.
- ~~**The linker's noise and cut-short links**~~ ✅ 18 Oct: a phrase the chunker cut short grows
  to the page it names (`Linker.extend`: up to two words before and three after, never into the
  next phrase or across a verb); sub-items and preambles no longer link a lone word for the sake
  of it; the chunker learned the verbs and generic nouns it was linking; `canonical_page` finds a
  page spelled with hyphens. Ten prelim objectives whose words name no concept carry a chosen
  `*Key concepts:*` line instead of a noise link. 30 SOA pages re-rendered; the 27 verified ones
  re-checked as a delta (runs `a769`, `4220`). Left: the modules' prose (§3.3).
- **C12 — packages 4–6 and 8**: `syllabus:` provenance blocks for the 14 hand-made pages (P, FM,
  the CAS exams; regenerate a page with hand-authored content only once the overlay exists);
  `page_lint.py` for concept pages, in CI on changed files. Owner decisions D1–D4 of that review
  were applied implicitly and never written up (D18).

### 3.5 Questions and the conversion pipeline

- ~~**C13 — the converter drops each CAS examiner's report's opening paragraph**~~ ✅ 18 Oct: the
  writer fixed, 83 questions restored, 49 verified Exam 7 and 8 questions left for their packets
  (Phase 2's progress table). `report_gaps.py list` re-measures it.
- **Vault-written banks** — G6 gaps in every beta exam (§3.1), whole banks for PCPA and 6U, and
  later the SOA development exams, all through the `question-writer` skill, each question checked
  by a different agent from its writer.
- **SOA published material** — where the SOA publishes sample questions or past written-answer
  papers for an ASA prelim (Phase 3 lists which, from the SOA's own pages), convert them with `soa-exam-converter` (Phase 3), never retyped.
- **`standardize_questions.py` is unsafe to run** (found 18 Oct): it applies `ontology_map.py` to
  every bank by topic string, and ten CAS questions — fifteen with V10's additions (Exam 9's *Yield
  Curve*, *Convexity*, *Real Rate of Interest*) — share a string with a P / FM key. Scope it to the
  P and FM banks before anyone runs it.
- **Exam 7 leftovers (D10)**: questions on readings no longer on the syllabus (Patrik, Brehm /
  Goldfarb, England & Verrall), and 2012 q20 filed under Exam 9. Default: keep them as they are.
- **The converter's printed slips**: open minor findings on the Exam 8 papers are mostly CAS's own
  printed errors the vault repeats untagged; each wants an "(as printed)" note in its paper's
  packet.
- **`verify_paper.py` doesn't know the SOA prelims' layouts** (found 23 Oct). Its `--soa` mode
  covers a two-PDF multiple-choice set, which is P's and FM's. It doesn't cover:
  - SRM's one-file set (questions then solutions);
  - FAM's two prefixes and FAM-L's chapter numbering;
  - ASTAM's and ALTAM's written-answer sets and sittings.

  Their stems were transcribed from images in any case, because the text layer scrambles the
  formulas, so a token diff would flag nearly every question. Q1's packets work from
  `verify_sources.py` directly: cached text, `render` for the page images, `cite`. Teach
  `verify_paper.py` those layouts only if a later re-check needs them.

### 3.6 Resource pages

`docs/resource-pages.md` is the standard; `resource_lint.py` holds every page to it in CI.

- **C18** — two slips V3 found: the Atkinson & Dallas page carries only the Ch. 9 code
  (ILA101-103-25) though ILA-101 also assigns Ch. 11 (ILA101-104-25); the COPLFR page's file name
  says 2024 but its `Year` is 2025. → Phase 1.
- **Atkinson & Dallas** (ILA-101): its lead names only the Ch. 9 reading (F-002), and its chapter
  list rests on one library catalogue that wouldn't load; `in_review` until a catalogue confirms it.
- **C16** — three study-kit texts with no contents available (Agricultural Programs, KPMG
  Regulatory Oversight, McDonald) and Baer / Rendall's, which couldn't be fetched.
- **D21** — Goldburd et al.: Exam 8 assigns the 2025 revision; the page describes 2020.
- **Missing reading pages for new exams** — write them through the resource pipeline before their
  concepts' packets run (`verification-plan.md` §3: a concept agent looking for its own document is
  the most expensive way to find it).
- **Cowork's corpus grows only through these pages** (roadmap A3): a real document enters Cowork
  as a `Resources/Books/` page first.

### 3.7 Figures and simulators

- **C14** — concept figures for 6U, 7, 8, 9, PCPA and the DISCs (`docs/concept-figures.md`;
  builders exist for P, FM, MAS-I, MAS-II, 5 and 6C). Generated — edit the builder, never the SVG.
- **C15** — more distribution simulators (`docs/distribution-simulators.md`): Pareto (both
  forms), Generalized Pareto, Weibull, Uniform, t, χ², F, GEV.
- **MCT figure** — `figures_exam_6c.py` draws the ×1.5 error V6 corrects. → Phase 1, with V6.

### 3.8 Not in this plan

- **The Research corpus** (`docs/research-corpus-plan.md`, the dated `Resources/` timeline pages)
  — parked with the Research tab (R1). Its pages are verified last (Wave 5).
- **Comprehension checks** (357 files, rendered nowhere; `docs/comprehension-check-backlog.md`) —
  parked (R2, D11).
- **Concept Craft's relation labels** (X2) — app data, not vault pages; reviewed in the
  Experiences lane.

---

## 4. The phases

A phase ends when its exit test passes, measured by script, not judged. The ranking rule is the
roadmap's (§0.3): an unbacked promise first, then what unblocks the most, then learner impact
divided by cost — weighted by how many candidates sit the exam.

### Phase 1 — Ready means ready

**Why first:** two `ready` exams fail their own gates, and two critical findings stand on pages a
reader can open. Each is a promise to the reader with nothing behind it.

**Exit test:** `publication_readiness.py --check` passes on **every** `ready` exam; `--hold`
runs in CI; `grep -rl 'open_critical: [1-9]'` over the vault finds nothing; no stale file but the
ones held behind a maintainer's decision.

| Item | Roadmap | Status |
|---|---|---|
| The `--hold` guard: a ready exam can't silently lose a structural gate | new | ✅ `publication_readiness.py --hold`, in `content-validation.yml`, tested |
| Exam FM: *Term of Annuity*'s three "finite term" links removed (the words unchanged), the page re-verified against the SOA syllabus | C8 | ✅ FM 7 / 7 (run `7679`; the syllabus PDF unchanged). The noun-phrase linker now treats *finite* as a qualifier (`syllabus_lib.BREAK_WORDS`), or its test would demand the link back |
| Exam P G6: vault-written questions for the six untested concepts, each checked by a different agent from its writer | C8 | ✅ `p-an-001`–`009` (runs `7432` and `488d`). The first `p-an-009` tested a jointly continuous pair, which the Nov 2026 syllabus excludes (multivariate is discrete-only); it was rewritten as a percentile of one continuous variable |
| Exam P G4: *Insurer*'s two unsourced bullets sourced or restated, the page verified | C8 | ✅ verified, medium (run `66d2`): Exam 9's capital-cost bullet restated to Zhang and Feldblum (*Variance*) and Mildenhall & Major's free excerpt; the forms of insurer to Florida's statutes and Lloyd's. Re-check against Cummins (2000) when an Exam 9 sweep reaches it |
| 6C's two criticals (*MCT*, *Capital Required*) and the majors on the same source; the MCT figure's builder | V6 | ✅ no open critical in the vault (run `1567`): *MCT*, *Capital Required*, *Supervisory Target Capital Ratio* verified; the same ×1.5 fixed on five more pages; `figures_exam_6c.py` fixed and four figures redrawn. The 18 majors it recorded on pages naming the MCT denominator "Base Solvency Buffer" (LICAT's term): all resolved (run `dd77`), and *Probable Maximum Loss* — verified, carrying an open major — re-verified. The 20 other pages it touched are `in_review`: their MCT content is checked, the rest not yet. Two findings are left for a writer: *Registered Reinsurance* F-002 (major: its example credits a collateralised unregistered cession as registered) and *Statement of Changes in Equity* F-002 (minor). *Unregistered Reinsurance*'s example now reaches the opposite conclusion — the collateralised treaty is cheaper — and wants a human read |
| FM's topic tags into `ontology_map.py`; fm-358's printed wording | V10 | 🟡 13 topics added to `ontology_map.py`, 8 findings resolved, fm-358's wording closed as SOA's own (run `7679`). Left: fm-370, 379, 391 and 421 need a retag (their topic sits under another section, or isn't a syllabus term), which makes each stale until re-checked |
| Two resource-page slips (Atkinson & Dallas's codes, COPLFR's year) | C18 | ✅ Atkinson & Dallas drops the wrong `Code` (both codes stay in its syllabus callout; the page is `in_review`, its chapter list unconfirmed). COPLFR's `Year` is right — the file name is the slip, which waits on V9 |

**Result (18 Oct 2026): exit test met.** All seven `ready` exams pass `--check` (P and FM 7 / 7);
`--hold` reports 0 errors; no open critical finding anywhere (disputed files: 0); the vault is
**54.8% verified (3,035 of 5,542)**, with no file moved down a status and 33 moved up. Three files
are stale, all held behind decisions (DISC-RM's two retired questions, 6C's page behind D8). What
Phase 1 left for later is in §3.2 (V10's four retags, Exam P's re-issued samples), §3.5
(`standardize_questions.py`) and §3.6 (Atkinson & Dallas).

### Phase Q — Every question verified (current focus, from 23 Oct 2026)

**Why now.** A served question is the content a candidate acts on most directly. A wrong figure
in a stem is learned, trusted and carried into the exam, which is the failure VERIFY exists for.
Four things make the question banks the next priority:

- **The riskiest files.** Of the 817 served questions not yet verified (§2.1), 494 are the SOA
  prelims' banks. The SOA sets its equations as embedded objects, so the text layer scrambles
  them. Agents therefore **transcribed every prompt and rewrote every solution from page
  images**. Rule 8 (§1.2) couldn't hold mechanically for these files, and a re-read by a second
  agent at conversion left no record. Only a recorded check against the page stands behind them.
- **The cheapest sources.** All 23 SOA documents are free and rank 1. They were fetched into the
  cache on 23 Oct, and every sha256 matched the one the conversion recorded. Exam 6C's 13 papers
  are CAS's own reports, the same shape as Exam 5's 14, which ran at about 300k tokens a paper.
- **The gate it unblocks.** G7 is the only gate left with no outside dependency for SRM, FAM,
  ASTAM and ALTAM: their G4 and G5 rest mostly on commercial texts (D7). 6C also needs G7.
- **The whole record.** D6 is settled as *yes* with this focus, so "every question file" includes
  the 232 off-syllabus questions. Each rides its paper's packet.

**The rule while it runs:** no bank grows by unverified files. A vault-written question ships
with a different agent's verifying pass, as every vault-written question so far has. A new conversion (PA, ATPA)
gets its own packets in the same campaign, before the next conversion starts. Concept and
reading packets wait, except the delta re-checks a question packet forces.

**The waves.** Every wave is batched by source document (`docs/verification-plan.md` §2 and
§5), with one agent per packet and the brief in each wave's record:

| Wave | Packets | Questions | Status |
|---|---|---:|---|
| **Q1** | The SOA prelims' converted banks, 16 packets: SRM ×2 (Q1–38, Q39–76); FAM-S ×2 (Q1–55, Q56–110); FAM-L ×5 (by AMLCR chapter: 1–3, 4–5, 6 in two halves, 7); ASTAM ×3 (sample set; 2023–24 sittings; 2025–26 sittings); ALTAM ×4 (sample Q1–28; Q29–61; 2023–24 sittings; 2025–26 sittings) | 494 | 🟡 Round 1 (SRM, FAM-S, ASTAM: 7 packets, 241 questions) started 23 Oct. Round 2 (FAM-L, ALTAM: 9 packets, 253 questions) follows, its brief corrected by round 1 |
| **Q2** | Exam 6C's 13 papers, Fall 2013–Fall 2019, one agent each, with the 73 off-syllabus questions sat on them. Scanned booklets: OCR'd by `verify_paper.py build`, and the `check` / `diverges` pages read as images | 321 + 73 | ⬜ After Q1. 83 of its questions had their report paragraph restored (C13); each packet checks the restoration against the printed report |
| **Q3** | The residue: Exam 5 Fall 2017 Q19 (part b credits case strengthening where CAS's report names a slower settlement rate); MAS-II Fall 2019 Q35 (its explanation wants a writer); fm-231; FM's four V10 retags (fm-370, 379, 391, 421, re-checked as a delta after retagging); DISC-RM's two stale retired questions (V9); the 49 verified Exam 7 and 8 questions owed their report paragraph (`report_gaps.py list`), in delta packets on their papers; the Exam 8 "(as printed)" notes; and Exam P's re-issued sample PDFs (`24980e6d…` / `e10d2649…`). For those, diff the new PDFs against the copies the 719 cite, then re-cite as a delta where a question is unchanged and re-check where it moved | ≈ 70, plus Exam P's delta | ⬜ Can run beside Q2. Two items wait on a maintainer: Fall 2017 Q19's key and V9 |
| **Q4** | The off-syllabus questions on papers no earlier wave loads: Exam 9's 149 on its seven Spring 2013–2019 papers, and Exam 8's 7 on their Fall papers | 156 | ⬜ Last. Their explanations get the same check; their keys are CAS's sample answers |

**Exit test.** Measured by `generate_validation_status.py`'s *Question banks* table:

- "Served not verified" is 0 in every bank, apart from files listed here as held by an open
  finding only a maintainer or a writer can close.
- Every off-syllabus question is verified or `in_review` with its reason logged.
- `grep -rl 'open_critical: [1-9]' questions` finds nothing.
- `verify_check.py` reports 0 errors.

**Sizing.** About 15k tokens per SOA multiple-choice question, read from page images, and about
30k per written-answer question (`docs/verification-plan.md` §6). That puts Q1 at roughly
10M tokens. Q2 is about 13 × 300k, as Exam 5's papers ran. Q3 and Q4 together are well under
Q2.

**Progress:**

| Wave | Runs | Result |
|---|---|---|
| Q1, round 1 | — | Running |

### Phase 2 — Fix the converter, then finish the beta exams

**Why next:** the beta exams are where candidates already study, and most of their remaining work
is verification the packet tooling makes cheap. The converter comes first because its gap is in
every CAS bank about to be checked.

1. ~~**C13**, the converter's dropped opening paragraph~~ ✅ (below).
2. **Exam 8** (C1): the last two gates wait on outside sources (*Risk*'s ERM section, the ISO CGL
   plan, D20). Promote when they pass.
3. **Exam 9** (C2) → **Exam 5** (C3) → **MAS-II** (C4) → **Exam 6C** (C5) →
   **PCPA** (C6, a vault-written bank). §3.1 has what each takes.
4. Bring every beta exam up to the beta bar it already sits above — G3 and G6 — at the start of
   its campaign, so `--hold` has no beta warnings left at the end of the phase.
5. Housekeeping: V7's missing run summaries; the "(as printed)" notes on Exam 8's papers.

**Exit test:** every beta exam passes `--check`, or is blocked only by a decision in §6.

**Decisions settled (18 Oct 2026):** D8, D22, D23, D24 and Exam 9's three held questions are
decided (§6), so nothing in this phase now waits on the maintainer except D20, whose default
stands — Exam 8 stays beta until the ISO manual is read. The work they unblock, in order:

1. **Page edits** — Exam 5 (D8: A18, the v02 wording, `*Key concepts:*` lines, chapter scopes),
   Exam 6C (D8: domain C re-transcribed, F-002's scope, the objective filter dropped) and MAS-II
   (D23: the outline's 21 tasks), each re-verified against its outline so G1 can pass.
2. **MAS-II's bank** — the ~35 McElreath questions marked `off_syllabus` (D24).
3. **Exam 9** — the three held questions resolved as decided, then the 36 concepts' open-text
   packets (D22).
4. Then the campaigns as §3.1 orders them: Exam 5's papers (done), 6C's (now Phase Q, wave Q2),
   PCPA's bank (behind Phase Q, under its rule that no bank grows by unverified files).

**Applied (18 Oct 2026, runs `d3cd`, `1a77`, `f608`, `201b`, `7ded`, `326e`):**

| Item | Status |
|---|---|
| Exam 5's page (D8) | ✅ **verified, high** (run `1a77`): A18 added, every task and preamble in the v02 outline's words, the vault's additions on `*Key concepts:*` lines (concept set unchanged), Werner's and Friedland's chapter scopes. G1 passes. Two minor findings open for a maintainer: *Close Year* (A3) and *Self-Insured Retention* (A14) are in neither reading's text, so they may not belong on those lines |
| Exam 6C's page (D8) | 🟡 `in_review` (run `f608`): domain C in the Fall 2026 outline's order and words, every task and preamble verbatim, F-002's scope, the objective filter off (`%%objective-filter: off%%` in the callout, read by `extractSourceMaterial`). Still open: F-008 (three retired readings, the 67-source count), F-009 (the readings' page and section limits), F-010 (domain C's title, which 233 questions carry), and two new minors (F-011, F-012: six key concepts not found in a readable reading) |
| MAS-II's page (D23) | ✅ **verified, medium** (run `201b`): the outline's 21 tasks, the vault's concepts on `*Key concepts:*` lines. G1 passes. One minor open: *Exact Credibility* is Tse §8.4, outside the assigned 8.1–8.2 |
| MAS-II's McElreath questions (D24) | ✅ 29 `off_syllabus`, re-passed (run `326e`); 5 left served (above). The flags left *Credibility* and *Variable Selection* with no served question, so `masii-an-024` and `-025` were written and checked by another agent (verified, medium; run `7ded`). G6 holds |
| Exam 9's held questions | ✅ 2013 Q15 and 2014 Q16 carry their notes and are verified (medium). *Prepayment Risk* is cut back to the outline's words and verified (medium, run `326e`). `cas9-an-009` is the only served question on *Prepayment Risk* (2016 Q12 and 2019 Q9 are `off_syllabus`), so replacing it would leave the concept untested (G6): **kept** (maintainer, 18 Oct), with a note that its PSA/CPR/SMM conventions are outside both C5 readings, and checked against open texts |
| Exam 9's concepts on open texts (D22) | ✅ four packets (`f1ee` capital and pricing, `7c12` ERM, `4d03` catastrophe and securitization, `034f` credit and reinsurance): **34 of 35 verified (medium)**, unsourced claims cut or restated, every example recomputed. Fixed: *Risk-Adjusted Pricing*'s target-RAROC premium left the year-end capital spread undiscounted (major, Goldfarb p.40); *Economic Value*'s EVA is M − kQ; *Insurance Market Imperfections* gains competition; *Operational Risk* is Solvency II Art. 107's separate requirement. `--check 9`: **5 / 7**. Left: *Enterprise Risk Management* (`in_review` — Brehm's four phases are stated in no open source), and G5's two readings, CJS (assigned as the JEP text, read as the HBS working paper) and Cummins 2008. Minor, for writers: *Business Risk* lacks Brehm's strategic-risk material, *Catastrophe Modelling* covers little of A4–A5, no page covers catastrophe risk swaps (2013 Q13). New rank-1 source found: CAS's *Exam 9 Practice Items 2026* (retired Spring 2026 items) |
| Exam 5's papers (C3) | ✅ 14 paper packets, one agent each (runs `995a`, `9e66`, `2497`, `f7e5`, `7f8b`, `5229`, `f705`, `9730`, `81b5`, `c0f8`, `809a`, `9bdf`, `cb36`, `3310`), then `4234` for the converted paper: **349 of 350 past-paper questions verified** (Fall 2017 Q19 `in_review` — its part b credits case strengthening where CAS's report names a slower settlement rate), G7 356 / 357 with the vault's own. Every examiner's report restored as printed, copied mechanically (134 had been paraphrased, 104 missing their opening paragraph), dropped sample answers restored where the text layer allows. Exam 5 was the regression suite and it held: **critical transcription errors** on Spring 2013 (Q8, Q11, Q20 tables; Q4, Q13, Q17 keys, two with invented "CAS published" notes), Fall 2013 (nine: Q4, Q5, Q15's exhibits, Q22's key) and Spring 2019 (nine: Q22's six triangles fabricated, Q24's figures back-solved to the key, Q5, Q7, Q12, Q13, Q15, Q17); the 2014–2018 papers' stems were clean, their explanations not (Fall 2016 Q13's Territory 3 at 0.0% not −10%; garbled triangles; answers missing). **The bank's "Spring 2018" was not Spring 2018**: 23 Fall 2018 questions (eleven with altered exhibits) and one on no paper; Spring 2019 held two Fall 2019 copies. All 26 withdrawn (maintainer, 18 Oct; `verify_record.py withdraw`, the logs kept) and the real paper converted from CAS's workbook `april_may_sp18-5.xls` and report as `cas5-2018s-q1`–`q26` (verified, medium: CAS published no Spring 2018 sample answers, so its explanations are model-written and were recomputed by a second agent), with Spring 2019's real Q1 (`cas5-2019s-q1`). Spring 2013 Q25 keyed to the report's 813.75 (maintainer). `--check 5`: G1, G2, G3, G6 pass; G4 (61 concepts), G5 (Friedland) and G7 (Fall 2017 Q19) left — the reading packets are next |
| Concept Craft | 225 relation labels written for the connections the re-linked lines created (`craftRelations.json`, 5,823 labels), unreviewed like the rest |

**Progress (18 Oct 2026):**

| Item | Roadmap | Status |
|---|---|---|
| The converter's dropped report paragraph | C13 | ✅ The drop was `question_write.py`'s, not `pdf_extract.py`'s: the extractor kept the paragraph, but the writer wrote it only when no part had commentary of its own. It now opens the first part's `### Examiner Report` (`with_overall_report`, tested). `scripts/report_gaps.py` re-read 47 of the 50 written-answer CAS papers (Exam 5 2013 Spring and Fall and 6C 2014 Fall don't segment) and restored the paragraph verbatim on **83** unverified Exam 6C and 9 questions. Left for their papers' delta packets: **49 verified** questions (Exam 7: 33 across 2012, 2014, 2015, 2017–2019; Exam 8: 16 across 2014–2019) — `report_gaps.py list` names them. Exam 5's bank paraphrased its reports, so its packets restore them as printed |
| Exam 8's G4: *Risk* | C1 | ✅ verified (run `rsk1`). Exam 8 is 6 / 7, held only by D20 |
| G3 and G6 on every beta exam with a bank | — | ✅ Exam 5's two catch-alls and MAS-II's one broken up: each phrase re-linked so no page stands in, renamed, for more than two lines (*Claim Reserve* for "reserve analysis", *Empirical Bayes Credibility* for "structural parameters") — unlinking them would fail `test_syllabus_lib`'s every-noun-phrase-linked rule. 62 vault-written questions for the 67 untested concepts — Exam 5 7, Exam 9 10, MAS-II 23, Exam 6C 22 — each checked by a different agent from its writer. `--hold` warns only on PCPA, which has no bank (C6). Of the 62: **60 verified**, 2 `in_review` (`cas9-an-009`, `masii-an-023`). The checkers also opened findings on concept pages: *Contractual Service Margin*'s formula had its sign backwards (critical, fixed the same day to CIA note 222092 §4.6, the page back to `unverified`), and *Fault Determination Rules* (O. Reg. 668, not 664) and *Other Comprehensive Income Option* (PAA's locked-in date) were restated; *Lift* and *Predictive Accuracy* use the marketing definition of lift, not the readings', and want their reading packets |
| Housekeeping: V7 | V7 | ✅ the two run summaries reconstructed from the per-file logs |
| Exam 9's first round: 23 questions on its own papers, 9 readings, 46 concepts | C2 | 🟡 Four paper packets (`0ccf`, `9371`, `e85d`, `6aa0`) and five reading packets (`0103`, `9c55`, `770a`, `6bfb`, `8a71`). **21 of 23 questions verified**; the report paragraph restored on 11, sample answers on 5. **Seven readings verified** (Clark, Bernegger, Panning high; Brehm, Mildenhall & Major, Grossi & Kunreuther, Cummins 2000 medium, against outline, contents and catalogue). **Ten concepts verified** (Clark's reinsurance pages); the 36 others wait on D22. Errors fixed: Bernegger's MBBEFD special cases swapped (major); CJS's ratings had lost their notches; operational risk called a Solvency II module. Open for the resolve run: *Economic Value*'s EVA = M − ιQ is identically zero; *Prepayment Risk* is in no C5 reading |
| MAS-II's first round: 126 questions on three papers, 67 concepts, 3 readings, the page | C4 | 🟡 Ten packets (`295e`, `f8d6`, `9dbf` papers; `5d97`, `e-nn`, `f7a6`, `2f99`, `09a7`, `765d` readings; `4700` the page and its four open-finding questions; `724f` the Salis page). **125 of 126 paper questions verified**, every vault key equal to CAS's; **65 of 67 concepts verified**; Cowpertwait, West and the new Salis page verified. Errors fixed: *Limited Fluctuation Credibility*'s aggregate CV² (critical); *Full Credibility Standard* counted observations, not expected claims; *Lift* and *Predictive Accuracy*'s marketing lift; Gini = 2·AUROC − 1 without the normalization; *K-Means*' steps out of order; *Double Lift Chart*'s example backwards; a lost table header (2018 Q40). Left: see A.5 |

### Phase 3 — The SOA ASA prelims

**Why:** FAM, SRM, PA, ALTAM, ASTAM and ATPA are the next exams sat by the most candidates, and
they are all `development` with verified pages and no banks.

1. **C9 — write the ASA-prelim section of this plan** (a short campaign table, as §3.1 is for
   CAS): for each exam, what the SOA publishes to convert (sample questions, past written-answer
   papers — checked on the SOA's own pages, never assumed), which readings are free and which
   commercial (D7), and its gate baseline.
2. **The linker first** (§3.4): C17's citation table, then unlink the noise and extend the
   cut-short links, and re-render. That alone moves most of their G2 and G3.
3. Write what's still missing (*Total Risk*, the stubs a prelim links), with the
   `actuarial-concept-definitions` skill.
4. Banks: convert what the SOA publishes (`soa-exam-converter`), then write the residue with
   `question-writer`. development → beta when G2, G3 and G6 pass.
5. Then their fact-check campaigns, as Phase 2's.

New exam pages from §3.0 at ASA level join here.

**Exit test:** the six prelims are `beta` (four are, 19 Oct: SRM, FAM, ASTAM, ALTAM).

**Progress (18 Oct 2026):**

| Step | Roadmap | Status |
|---|---|---|
| 1. The ASA-prelim campaign table | C9 | ✅ §3.1a: what the SOA publishes for each, found on soa.org's own pages; the readings, free and commercial; the gate baseline and the order (SRM → FAM → ASTAM, ALTAM → PA, ATPA) |
| 2. The linker | C17 | ✅ §3.4. G2 passes on all six prelims (FAM was 13 gaps, SRM 15, PA 10, ALTAM 4, ASTAM 15, ATPA 23); G3 on all but ALTAM. FAM's and ATPA's catch-alls were broken up by pointing four aliases at the specific page that exists (*Mortality*, *Survival Model*, *Data Preparation*, *Data Validation*); G3 now reads "DB plan" as naming *Defined Benefit Plan* and "lives" as *Life*. Every page re-checked against its syllabus PDF (unchanged) |
| 3. What's still missing | C11 | ✅ ALTAM's one catch-all (*Life Insurance* as "long-term life" in "long-term life and health insurance") cleared 19 Oct by teaching the rename test a shared head noun (*How ALTAM's sets converted*, §3.1a); no page changed. *Total Risk* (GH-101) is not a prelim's |
| 4. Banks | — | 🟡 **SRM ✅ beta** (18 Oct): the bank wired through (catalogue, label, quiz builder, pace, DEFAULT track, Concept Craft labels for its three boards), the SOA's 72 live sample questions converted (§3.1a has the recipe and what the PDF needed), and five vault-written questions for the concepts the set doesn't reach (*Model Validation*, *Train-Test Split*, *K-Nearest Neighbors*, *Autocorrelation Function*, *ARCH Model*) — each checked by a different agent from its writer and verified (run `7805`; the two on Frees medium, D7). `--check srm-1`: G1, G2, G3, G6 pass. The topic choices await the maintainer's review in the PR, in place of the skill's pilot. **FAM ✅ beta** (19 Oct), the same way: the bank wired through (catalogue, label `Exam FAM`, quiz builder, 34 questions in 3½ hours, DEFAULT track, 236 Concept Craft labels for its eight boards); both sample sets converted, 268 live questions (FAM-S 103, FAM-L 165) — see *How FAM's sets converted* below; 46 concept tags read off the questions for 24 syllabus concepts the topics didn't name; and six vault-written questions for the five concepts no SOA question tests plus TVaR (*Cash Flow*, *Delta Hedging*, *Insurable Interest*, *Defined Benefit Plan*, *Defined Contribution Plan*, *Risk*), checked by a different agent and verified (run `7017`; five medium on open texts, `fam-an-006` high on the SOA's FAM tables; one major fixed — `fam-an-003` had a second defensible answer). `--check fam-1`: G1, G2, G3, G6 pass. Topic choices await the maintainer's review in the PR. **ASTAM ✅ beta** (19 Oct): the bank wired through (catalogue, label `Exam ASTAM`, quiz builder, paced by the point — three hours for 60 — a six-question practice exam, the seven sittings on the past-paper shelf with their model-solution PDFs, DEFAULT track, 150 Concept Craft labels: 96 for its six boards, 54 for connections on other exams' boards that had none, MAS-II's credibility board among them); 60 SOA questions transcribed (*How ASTAM's sets converted*, §3.1a); seven syllabus concepts tagged on the questions that work with them (*Moment*, *Severity*, *Severity Distribution*, *Probability Distributions*, *Continuous Random Variable*, *Probability*, *Bayesian*); two vault-written questions on trend, checked by a different agent and verified (run `f53e`, medium on Werner & Modlin ch. 6, Brown & Lennox being commercial). `--check astam-1`: G1, G2, G3, G6 pass. **ALTAM ✅ beta** (19 Oct), the same way: the bank wired through (catalogue, label `Exam ALTAM`, quiz builder, paced by the point, a six-question practice exam, the seven sittings on the past-paper shelf with their model-solution PDFs, DEFAULT track, 272 Concept Craft labels for its seven boards); 94 SOA questions transcribed and re-checked (*How ALTAM's sets converted*, §3.1a); *Payoff*, *Annuity Contract* and *Valuation* tagged on the questions that work with them, so no vault-written question was needed. `--check altam-1`: G1, G2, G3, G6 pass. Next: PA and ATPA |
| 4a. SRM's fact-check campaign | — | ⬜ G7 → **Phase Q, wave Q1** (the 72 converted questions, two packets on the SOA's PDF); G4: 7 concepts; G5: Frees 2010 (commercial, D7; Frees posts an online version of the text) |
| 4b. FAM's fact-check campaign | — | ⬜ G7 → **Phase Q, wave Q1** (268 converted questions against the SOA's four PDFs, seven packets), the ~45 printed slips the transcribers noted each wanting an "(as printed)" note (listed in the PR); G4: 37 concepts; G5: all three readings commercial (D7). The concept pages the transcribers found missing — the (a,b,0)/(a,b,1) class, Burr, Gompertz–Makeham, select-and-ultimate tables, expectation of life, variable annuity, coherent risk measure — are tagged under broader pages for now; FAM's VaR/TVaR line links *Risk*, a definitions page, where *Risk Measure* holds the material |
| 4c. ASTAM's fact-check campaign | — | ⬜ G7 → **Phase Q, wave Q1** (60 converted questions against the SOA's eight question/solution pairs, three packets), Appendix A.6's slips each wanting an "(as printed)" note; G4: 22 concepts; G5: Klugman and Brown & Lennox commercial (D7), the two SOA study notes free |
| 4d. ALTAM's fact-check campaign | — | ⬜ G7 → **Phase Q, wave Q1** (94 converted questions against the SOA's eight question/solution pairs, four packets), Appendix A.7's slips each wanting an "(as printed)" note (the sample set's MLC/LTAM originals are a second source for its questions); G4: 50 concepts; G5: AMLCR commercial (D7), ALTAM-21-23 free |
| 5. Fact-check campaigns | — | ⬜ G7 is Phase Q's. G4 and G5 come after it; five of the six prelims' main readings are commercial (D7). PA's and ATPA's banks wait behind Phase Q, then ship with their own packets |

### Phase 4 — The rest

Exam 6U (C7: links read for country first, then a vault-written bank), the 23 FSA modules (C10),
V8's review of the 363 AI-drafted concept-gap pages that no campaign has reached, the orphan
concepts (D9), and the remaining concept-gap leftovers (§3.3). New fellowship-level exam pages
from §3.0 join here.

### Alongside every phase

Not ranked against the campaigns; pulled when a session has room or a campaign touches them:
C14 (figures), C15 (simulators), C16 and D21 (resource pages), C12 (provenance blocks,
`page_lint.py`).

---

## 5. Definition of done for content

The roadmap's §0.4, as it applies to a vault change:

- `python3 scripts/verify_check.py --sync` then `verify_check.py` (0 errors); every finding,
  resolution and pass written through `verify_record.py`, with a `_runs` summary.
- `validate_content.py`, `syllabus_lint.py`, `resource_lint.py` and
  `publication_readiness.py --hold` clean; `generate_validation_status.py` and
  `generate_coverage_report.py` regenerated if the counts moved.
- A promotion cites `--check`'s output, and its line here and in the roadmap changes in the same
  PR.
- Nothing written by a model ships as `verified` on its writer's say-so: a different agent checks
  it against a cited source, and the README's rule holds — no page is published 100% AI-written
  without human review.

---

## 6. Content decisions (the maintainer's)

The register is the roadmap's §6.1; these are the content ones, with their defaults. Sessions
build with the default until the decision is made.

| Roadmap | Was | Decision | Default meanwhile |
|---|---|---|---|
| D5 | CAS plan D1 | Does a bank written entirely by the vault count as ready? (the DISCs, PCPA, 6U) | Yes, recorded |
| D6 | CAS plan D2, verification plan §7.3 | Verify the off-syllabus questions with their papers? | ✅ settled 23 Oct 2026: **yes**, with the focus on validating every question file. They ride their paper's packet: 6C's 73 in Q2; Exam 9's 149 and Exam 8's 7 in Q4; fm-231 and DISC-RM's two in Q3. Reversible: if reversed, Q4 drops out of Phase Q and the off-syllabus columns leave its exit test |
| D7 | CAS plan D3, verification plan §7.6 | Is a medium confidence ceiling enough for a commercial-only source? | Yes |
| D8 | CAS plan D4, verification plan §7.2 | 6C's F-001 (domain C renumbering), and Exam 5's v02 outline | ✅ settled 18 Oct 2026: **transcribe CAS's words; the vault's additions go on `*Key concepts:*` lines.** 6C: domain C's five tasks as the Fall 2026 outline prints them, in its order; F-002's added scope (litigation environment, funding mechanisms) linked to the nearest existing pages; the shelf's Learning objective filter dropped for 6C until CAS's reading codes match its tasks (6U's precedent). Exam 5: A18 added, every task and the domain B preamble restored to the v02 outline's words, the vault-added clauses' links moved to `*Key concepts:*` lines (the concept set unchanged), and the Werner and Friedland chapter scopes added to Source Material |
| D9 | verification plan §7.4 | The orphan concepts: link, merge or delete | Leave them unverified |
| D10 | CAS plan §4.1 | Exam 7's questions on dropped readings; 2012 q20 filed under Exam 9 | Keep as they are |
| D15 | CONCEPT_GAPS §13 | The 9 ambiguous targets and the 21 stubs | Link the proposed pages |
| D17 | CAS plan D5 | The DISC link design: one page per lettered section | The current design |
| D18 | syllabus-pipeline-review §4 | The review's owner decisions D1–D4, applied but never written up | As applied |
| D20 | — | A reading with no public copy (the ISO CGL plan) | ✅ settled 18 Oct 2026: **the default stands.** P1 is not loosened: the page stays `in_review`, Exam 8 stays beta, until someone reads the study-kit manual |
| D21 | — | Goldburd et al. 2020 vs the 2025 revision Exam 8 assigns | The page as it is |
| D23 | — | MAS-II's page has 36 tasks where the 2026 outline has 21 (F-001): restore the outline's (about ten in-reading concepts tagged on paper questions would leave the syllabus) or keep the vault's | ✅ settled 18 Oct 2026: **the outline's 21 tasks, verbatim**; the vault's finer concepts (*Posterior Distribution*, *AIC* …) stay on the syllabus on `*Key concepts:*` lines — D8's rule |
| D24 | — | MAS-II's 2019 papers' ~35 Bayesian/MCMC questions (McElreath, no longer assigned): `off_syllabus` or served | ✅ settled 18 Oct 2026: **`off_syllabus: true`** — kept, found by sitting and search, out of quiz draws, as Exam 9's and 6C's outlived questions are. Applied to 29; five of the 34 the packets listed are answerable from a current reading (2019S Q24 from West; 2019F Q22, 25, 32, 37 from MAS-I, which MAS-II assumes) and stay served |
| D22 | — | Exam 9's unread readings (Brehm, Mildenhall & Major, Grossi & Kunreuther; both Cummins articles; CJS's JEP text): a copy, or a reachable author-posted one | ✅ settled 18 Oct 2026: **verify on open texts at D7's medium ceiling** — each concept against a citable open source that states the same thing (MAS-II's method: Loss Data Analytics, fpp3, NIST), with the assigned reading's contents and catalogue record as the scope check. Only what no open source covers stays `in_review`. The two readings' own pages stay as verified at medium |
| — | verification plan §7.5 | Write missing reading pages before their concepts' packets | ✅ settled: write them first (6U's and Exam 8's were) |
| — | Exam 9 campaign (A.4) | Its three held questions | ✅ settled 18 Oct 2026: **2013 Q15** gets a note naming the two assumptions its key rests on (no investment income on capital; losses at year end), then a re-pass; **2014 Q16b** keeps CAS's ranking (the CDO² tranche safest) with a note that CAS accepted any ranking with a valid explanation, then a re-pass; ***Prepayment Risk*** is cut back to the outline's words; `cas9-an-009` was to be replaced by a C5 question on Panning or CJS, but that would leave *Prepayment Risk* with no served question (G6), so the maintainer kept it, noted as outside the readings |
| — | CAS plan D6 | Frameworks only The Institutes' course states | ✅ settled 11 Oct 2026: rewritten to open sources (Appendix A.2.6) |

---

## 7. Measuring

Read-only, from the repo root:

```bash
python3 scripts/publication_readiness.py --body all     # §2's tables
python3 scripts/publication_readiness.py --exam <id>     # one exam's failing items
python3 scripts/publication_readiness.py --hold          # the Phase 1 guard (CI)
python3 scripts/verify_check.py                          # 0 errors expected
python3 scripts/verify_targets.py --by-source            # the fact-check queue, as packets
python3 scripts/generate_validation_status.py            # §2.1: its *Question banks* table is Phase Q's measure
python3 scripts/report_gaps.py list                      # Q3: verified questions still owed their report paragraph
python3 scripts/find_concept_gaps.py                     # §3.3's counts
python3 scripts/syllabus_write.py --all --check          # C17: which pages a re-render would change
grep -rl 'open_critical: [1-9]' Concepts questions Resources Exam*.md
```

---

## Appendix A — Campaign records

Moved here from `docs/cas-publication-plan.md` when it was folded into this plan, unchanged but
for their headings; a section number inside them (§1, §3.6, "section 4") is the old plan's. They are the record of how the rules in §1.2 were learned.

### A.1 The baseline, 10 Oct 2026

This is the baseline from before this plan's first changes, on 10 Oct 2026:

| Exam | Status | Page | Concepts | Missing / stub | Catch-alls | Concepts not verified | Concepts with no question | Sources not verified | Bank verified | Gates |
|---|---|---|---:|---:|---:|---:|---:|---:|---|---:|
| MAS-I | beta | verified | 176 | 0 | 2 | 0 | 0 | 0 / 8 | 164 / 281 | 5 / 7 |
| MAS-II | beta | in review | 105 | 0 | 4 | 70 | 28 | 3 / 5 | 20 / 146 | 1 / 7 |
| DISC-DA | development | verified | 35 | 1 | 4 | 28 | 35 | 1 / 1 | no bank | 2 / 7 |
| DISC-RM | development | verified | 57 | 1 | 3 | 53 | 57 | 1 / 1 | no bank | 2 / 7 |
| DISC-IA | development | verified | 68 | 0 | 6 | 58 | 68 | 1 / 1 | no bank | 3 / 7 |
| 5 | beta | in review | 136 | 0 | 6 | 68 | 7 | 5 / 6 | 0 / 349 | 1 / 7 |
| PCPA | beta | verified | 29 | 0 | 1 | 13 | 29 | 13 / 13 | no bank | 3 / 7 |
| 6C | beta | in review | 151 | 0 | 0 | 149 | 22 | 67 / 67 | 0 / 321 | 2 / 7 |
| 6U | development | in review | 66 | 0 | 0 | 65 | 66 | 46 / 46 (44 missing) | no bank | 3 / 7 |
| 7 | beta | verified | 26 | 0 | 0 | 17 | 7 | 15 / 15 | 1 / 118 | 3 / 7 |
| 8 | beta | verified | 38 | 0 | 1 | 26 | 6 | 12 / 12 (10 missing) | 0 / 132 | 2 / 7 |
| 9 | beta | verified | 60 | 0 | 0 | 53 | 10 | 9 / 9 | 0 / 121 | 3 / 7 |

Across the twelve exams, the work comes to:

- **495** distinct concept pages to fact check;
- **168** readings to write or fact check, **54** of them with no page at all;
- **1,283** served questions to fact check;
- **335** exam–concept pairs with no question.

**No CAS exam is ready, and none is close except MAS-I.** It needs its 117 vault-written
questions checked and two catch-all links fixed.

The question work is concentrated:

- The DISCs, 6U and PCPA have no bank at all.
- The beta exams' gaps are a few concepts each, mostly ones their past papers never asked about.

The fact-check work is spread across every exam. Even the MAS-I and P campaigns took a sweep run
and a resolve run each.

### A.2 The DISCs: specific links, specific pages, their own banks

The DISCs got the most attention because the problem there is the links themselves, not only
missing material. Each DISC syllabus is a list of lettered section titles from The Institutes, and
nothing more. The exam page transcribes them word for word, and that transcription is `verified`.
The links are the vault's own addition, and many of them sent a whole group of sections to one
broad page:

| Broad page | Sections it stood for |
|---|---|
| *Commercial General Liability* | 14 DISC-IA sections: Coverage A's insuring agreement, both halves of its exclusions, Coverages B and C, supplementary payments, who is an insured, limits, conditions, modifying the form, other GL forms |
| *Homeowners Policy* | 7 HO-3 sections: property coverages, Section I perils and exclusions, property conditions, liability coverages, liability exclusions, conditions, endorsements |
| *Building and Personal Property Coverage Form* | 5 BPP sections |
| *Personal Auto Policy* | 6 PAP sections |
| *Accounting Standards*, *Insurance Premium* | 4 and 3 accounting sections |
| *Data Visualization*, *Predictive Analytics*, *Tidy Data*, *Statistical Learning* | 5, 4, 3 and 3 DISC-DA sections |
| *Claims Handling*, *Business Strategy*, *Risk Mitigation* | 5, 4 and 3 DISC-RM sections |

There were wrong targets too:

- "Managing Dataframes" went to *Tidy Data*.
- "Types of Annuities" went to *Life Annuity*.
- "Uninsured Motorists Coverage" went to the Canadian *Uninsured Automobile Coverage*.
- "Applying Property Insurance Limits and Deductibles" went to *Coverage Modifications*, the Exam P
  loss-model page.
- "Querying Data" went to *SQL*, a page that didn't exist.
- "COPE Elements" went to *COPE*, also a page that didn't exist.

#### A.2.1 Re-linking (done, 10 Oct 2026)

All three pages were re-linked so that **each lettered section points to a page about that
section**. Only the link targets changed; every section title is still the syllabus word for word,
and the edit script refused any change to the words. The result is **67 specific pages**. Some
examples:

- *CGL Coverage A Insuring Agreement*, *CGL Coverage A Exclusions*, *CGL Coverage B*, *CGL Coverage
  C*, *CGL Supplementary Payments*, *CGL Who Is an Insured*, *CGL Limits of Insurance*, *CGL
  Conditions*, *CGL Endorsements*, *Specialty General Liability Forms*.
- Six HO-3 pages and *Homeowners Endorsements*.
- Eight BPP and causes-of-loss pages, and *Commercial Property Conditions*.
- *PAP Liability Coverage*, *Uninsured Motorists Coverage*, *PAP Duties and General Provisions*,
  *PAP Endorsements*.
- The accounting pages: *Qualitative Characteristics of Accounting Information*, *Accounting
  Frameworks*, *Accounting Rule Hierarchy*, *Premium Accounting*.
- The underwriting and claims process pages: *Underwriting Process*, *Underwriting Guidelines*,
  *Claims Handling Process*, *Unfair Claims Settlement Practices*.
- The data pages: *Dataframe*, *SQL*, *Types of Plots*, *Chart Selection*, *Model Training and
  Evaluation*, *Claims Modeling Dataset*, and so on.

The overview pages stay, and they link down to the specific ones.

After the re-link, G3 passes on all three DISCs. G2 then listed the new pages as missing, which made
it the writing worklist.

#### A.2.2 Writing the pages (done, 10 Oct 2026)

Every new page is written to the `actuarial-concept-definitions` standard. Every fact must come
from a **free primary source** that a fact checker can fetch later. The course text belongs to The
Institutes and isn't available, so the sources are the documents the course itself teaches from:

- ISO's specimen policy forms (CG 00 01, HO 00 03, PP 00 01, CP 00 10, CP 10 10/20/30, IL 00 17,
  CP 00 90);
- the NAIC's model acts (Unfair Claims Settlement Practices, Producer Licensing, Unfair Trade
  Practices, the 2023 AI bulletin) and its Statutory Accounting Principles;
- FASB Concepts Statement 8;
- Cornell LII for tort law;
- *R for Data Science* and *ISLR* for DISC-DA.

Writers paraphrase the forms and never copy them; ISO holds the copyright. Each writer keeps a
source note per page, which the fact checker starts from.

**What writing found: the wrong country.** The writers turned up a second class of wrong link,
which G3 can't see: pages written for **Canada** standing in for a U.S. course.

- *Insurance Regulation*, *Rate Regulation*, *Market Conduct Regulation*, *Tort Litigation*,
  *Workers Compensation Insurance*, *Uninsured Automobile Coverage*, *Unfair Discrimination*,
  *Compulsory Auto Insurance*, *No-Fault Insurance* and *Residual Market* are all written for
  Canada. That is right for Exam 6C and wrong for the DISCs.
- The DISC sections that leaned on them now link new U.S. pages: *Reasons for Insurance
  Regulation*, *State Rating Laws*, *State Market Conduct Regulation*, *Workers Compensation
  Underwriting*, *Uninsured Motorists Coverage* and *Personal Auto Insurance Laws*.
- Each new page links its Canadian counterpart in one line, and the Canadian pages are untouched.
- Questions about U.S. rules no longer tag the Canadian pages.

**Lesson for 6U.** Exam 6U is the U.S. variant of Exam 6. Its links need the same review for
country before any of its pages are fact checked.

In all, **74 specific pages** were written for the DISCs: the 67 from the first re-link, three
U.S. regulation pages, and four more where a section still pointed at an overview (*General
Liability Classification*, *Personal Auto Underwriting*, *Workers Compensation Underwriting* and
*Personal Auto Insurance Laws*). About 70 existing pages gained the DISC material their sections
needed: U.S. statutory accounting in the premium and reserve pages, PAP Part D in full, the
property coinsurance clause, and others. Adding that material made **15 pages that had already
been verified for other exams stale**, among them *Data Types*, *Earned Premium*, *Unearned
Premium* and *Whole Life Insurance*. Each now needs a delta check, a cost to remember when one
exam's campaign edits a page another exam shares.

#### A.2.3 Banks (done, 10 Oct 2026: 70 / 131 / 221 questions)

Each DISC gets a bank of the vault's own questions:

- `questions/exam-disc-da/` (`discda-an-`)
- `questions/exam-disc-rm/` (`discrm-an-`)
- `questions/exam-disc-ia/` (`discia-an-`)

The app wiring is in place: `scripts/exam_catalog.json`'s `bank`, `EXAM_LABEL_TO_ID`,
`EXAM_BODIES` and the quiz builder's `EXAMS`.

The DISC exam is 75 application-based multiple-choice questions in 100 minutes. So the questions
are mostly four-option multiple choice on a short insurance scenario, written with the
`question-writer` skill. The target is at least one question per concept in each DISC that links
it, and at least two for every new specific page. No published DISC questions exist to convert:
The Institutes sells its course guide and publishes no samples.

#### A.2.4 Fact check, then promote (beta 10 Oct 2026; DISC-DA and DISC-IA ready the same day, DISC-RM 11 Oct)

G2, G3 and G6 pass on all three DISCs, so they moved from development to beta and joined the
DEFAULT track. The fact check runs as twelve packets, one per writer's area plus one for the
study guides and the course pages (runs `2026-10-10T21:00Z/dv01`–`dv12`).

A DISC page, reading or question can't be checked against the course, because the course isn't
available. It is checked against the primary documents above. Those are what the course teaches,
and they are a stronger source than a textbook's summary of them.

- **DISC-IA**'s forms, model acts, accounting standards and tort law are all primary and free. So
  DISC-IA can reach `verified` at **high** confidence.
- **DISC-RM** leans more on industry practice: COSO, the CAS ERM overview, the NAIC and III. Some
  of its pages may only reach **medium**.
- **DISC-DA** is checked against open textbooks.

**The three course textbook pages** (`Resources/Books/… (The Institutes - 2023)`) transcribe only
the free syllabus PDFs and the CAS DISC page. Every claim on them was checked against those, so
they were verified at **high**. The medium ceiling of D3 is for a page that says something about a
commercial text's *contents*.

#### A.2.5 What the fact check settled (10 Oct 2026)

**Results.** Thirteen fact-check packets and their clean-up rounds checked about 700 files.
Every vault-written question was recomputed blind before its key was read. The DISCs stood like
this at the end of 10 Oct 2026:

| Exam | Status | Gates | What is left |
|---|---|---:|---|
| **DISC-DA** | **ready** | 7/7 | nothing |
| **DISC-IA** | **ready** | 7/7 | nothing |
| **DISC-RM** | beta → **ready** 11 Oct 2026 | 5/7 → 7/7 | D6, settled 11 Oct (§3.6) |

On DISC-RM, everything else passes: the study guide, the course page, 62 of 65 concept pages, and
141 of 146 questions. The three pages left are *Insurer Goals and Constraints*, *Insurance
Marketing* and *Insurtech*, and the five questions left are 035, 041, 047, 233 and 471. All of
them wait on D6.

**MAS-I** was promoted to **ready** the same day. All 117 of its vault-written questions were
fact checked in runs `masa` and `masb`. So were the shared pages that DISC additions had made
stale.

**Rules adopted while running it.** These apply to every later campaign.

1. **A file with an open major finding is `in_review`, never `verified`.** A critical finding makes
   it `disputed`, and the quiz withholds the question.
2. **The clean-up round may author, within limits.** A checker may delete a claim, restate it to
   what a source it read says, reword a question its own finding proposed changing, retag, or
   drop or retarget a link. Each change is recorded as a finding plus a resolution, and the file is
   then verified again. Anything new goes to a separate writer, and a different checker verifies
   it. Examples are *Levels of Strategy* and the four DISC-RM pages.
3. **Don't make a DISC depend on another exam's commercial reading.** Five DISC-RM sections linked
   pages shared with Exam 9, whose Exam 9 half rests on Brehm et al.: 1.3, 1.4, 4.4, 5.1 and 15.3.
   The same went for the underwriting lines, whose *Underwriting* page carries life and health
   material no free source covers. Section 8.1 now links *Underwriting Authority*, and the six
   lines on underwriting a coverage now link *Underwriting Process*.
   Those pages can't be verified until someone reads that book. Each of those sections now links its
   own DISC page, and the shared pages are left for the Exam 9 campaign.
4. **Never cite an unauthorized copy.** A checker found a full commercial textbook on a university
   URL. The vault cites such a book bibliographically, by edition and pages, and never links the
   copy. Prefer an open textbook covering the same ground. For DISC-RM that is Baranoff, Brockett
   & Kahane, *Risk Management for Enterprises and Individuals* (Saylor, CC BY-NC-SA).
5. **Watch for the wrong country.** The fact check found more Canadian (Exam 6C) pages linked from
   U.S. DISC pages, beyond the ones writing caught: *Punitive Damages*, *Vicarious Liability*,
   *Joint and Several Liability*, *Collateral Benefits*, *Limitation Period*, *Guaranty Funds*,
   *Solvency Regulation* and *Notes to Financial Statements*. U.S. pages drop or retarget those
   links. The Canadian pages are untouched.
6. **Editing a page that another exam has verified costs that exam a re-check.** DISC additions made
   15 such pages stale, among them MAS-I's *Data Types* and Exam 5's premium pages. Each needed a
   delta check before MAS-I could be promoted.

**What no free source states.** A few DISC-RM claims are frameworks that only The Institutes' course
teaches:
- insurer goals and constraints;
- the list of marketing activities;
- the four risk control goals;
- essential, desirable and available coverage.

They are the content of *Insurer Goals and Constraints* and *Insurance Marketing*, and of questions
035, 041, 047, 233 and 471. The essential/desirable/available split rested only on lecture notes,
so it was removed from *Insurance as a Risk Management Technique*. That leaves questions 035 and
471 testing material no page now teaches. All of these stay `in_review` until someone checks them
against the course text, or they are rewritten to what open sources say, or the questions are
retired. That choice is decision D6. *Insurtech* is in the same position, because no open text is
current enough.

#### A.2.6 D6 settled the open-source way (11 Oct 2026)

The maintainer chose to rewrite rather than buy the course text. Writers rewrote each page to what
free sources state, and a different agent fact checked the result (runs `2026-10-11T02:10Z/dv14a`
and `dv14b`):

- *Insurer Goals and Constraints* drops the four goals and the internal/external split. It now says
  what Baranoff et al. (Saylor), Werner & Modlin (Ch. 1, 8 and 13) and IRMI's glossary say: profit
  and solvency as the aims, and capacity (the Kenney ratio, reinsurance), regulatory and
  operational constraints, marketing considerations and the underwriting cycle as the limits.
  Verified at medium.
- *Insurance Marketing* drops the list of marketing activities. It now covers distribution, producer
  licensing, compensation disclosure and the limits on advertising, from Baranoff §11.1 and the NAIC
  Producer Licensing and Unfair Trade Practices model acts. Verified at high.
- *Insurtech* rests on dated primary sources: the NAIC topic page, the NAIC AI model bulletin (2023)
  and its adoption map (as of 1 Apr 2026), the IAIS FinTech report (2017) and AI application paper
  (2025), the FIO's 2025 report and NCOIL's sandbox model act. Verified at high. **It will date**:
  the adoption count needs refreshing when the NAIC map moves.
- Questions 041 (the Kenney ratio), 047 (the model act's compensation disclosure) and 233 (what an
  underwriter's loss control inspection is for) were rewritten to test what the pages now teach.
- Questions 035 and 471 tested the essential/desirable/available split, which no page teaches. A
  question can't be deleted (its log must keep a target), so they are **retired** as
  `off_syllabus: true`: kept for the record, out of quiz draws, with a log comment saying why.

`publication_readiness.py --check disc-rm` then passed all seven gates, and DISC-RM was promoted to
**ready**. The cost of this route: those sections no longer teach the course's own framing, so a
candidate should expect The Institutes' lists on the exam itself.

### A.3 The Exam 7 campaign (11–16 Oct 2026)

`publication_readiness.py --check 7` passed all seven gates on 16 Oct 2026, and Exam 7 was promoted to
**ready**. How it got there, run `2026-10-11T02:10Z`:

- **Links first.** Two objective links were retargeted (A9's "mean" no longer links the Exam P
  *Expected Value*; A4's "layers of coverage" goes to *Layer Development Factor*, not the pricing page
  *Layer of Insurance*), and the study guide was re-verified (`e7sg`).
- **Eight paper packets** (`e7p12`–`e7p19`), each covering the Exam 7 questions filed under Exam 9 too:
  199 questions, all verified. Every question was recomputed from its blind stem first. The packets
  corrected arithmetic slips copied from CAS's printed sample answers (each noting what CAS printed),
  restored examiner's report paragraphs the converter drops, and retargeted wrong links (IFRS 17 *Net
  Income*, Exam 5 *Loss Ratio Method*, the Canadian *Rating Agency*).
- **G6.** Eight vault-written questions (`cas7-an-001`–`008`) for the six concepts with none, and an Exam
  7 section on *Predictive Distribution*, each checked by a different agent from the writer.
- **Four reading packets** (`e7ra`–`e7rd`) verified the 15 readings and the 15 concept pages. Pages that
  claimed more than their readings say were cut back to them: *Reinsurance Reserving* (Cape Cod, in no
  Exam 7 reading), *Premium Reserve* (Teng & Perkins' retro premium asset only), *Ceded Loss Reserve*.
  Two real errors were caught: *Range of Indications* summed yearly minima for Shapland's modeled range,
  and *Reasonableness Testing* took BF IBNR off the BF ultimate. Pages shared with other exams had their
  other half checked too (*Predictive Distribution* for MAS-II, against Mahler & Dean, medium; *Risk
  Margin* for Exam 6C, against OSFI's MCT guideline and the CIA's IFRS 17 note).

**Left for a maintainer** (minor findings; the questions stay verified and served):

- **Questions on readings no longer on the syllabus.** Patrik's reinsurance chapter (Stanard-Bühlmann,
  credibility IBNR, reinsurance reserving problems): 2012 q10, 2013 q10, 2015 q13, 2016 q16–q17, 2017
  q16, 2018 q14, q16, 2019 q13 (2017 q14–q15 lean on it unflagged). Brehm's ERM and Goldfarb: 2018 q1
  parts a–c, 2019 q1 parts e and g. England & Verrall: 2012 q9. Keep, split, or mark `off_syllabus`.
- **2012 q20** is current Exam 7 material filed under Exam 9; moving the file would orphan its log.
- **The converter drops each CAS examiner's report's opening paragraph** (before "Part a"). The Exam 7
  packets restored it by hand where they found it; `pdf_extract.py` should be fixed, and other CAS banks
  likely have the same gap.
- **Canadian pages on U.S. questions**: *Rating Agency*, *Concentration Risk* and *Risk Transfer* (linked
  from the Exam 7 preamble) lead with Canada.

### A.4 The Exam 9 campaign, first round (18 Oct 2026)

Run on the packet tooling, one agent per packet; `--check 9` still fails G4, G5 and G7 (4 / 7).

- **Paper packets.** The 23 on-syllabus unverified questions on the seven Spring 2013–2019 papers
  (`0ccf`: 2013–2014; `9371`: 2015–2016; `e85d`: 2017–2019; `6aa0`: 2014 Q16), each recomputed from
  its blind stem first. 21 verified; every stem number matched the booklet. Restored: the examiner's
  report paragraph on the question as a whole on 11 questions (C13 had left these, unverified, for
  their packets), and dropped or run-together sample answers on 5. CAS's own slips marked "(as
  printed)" (2015 Q15's 1.575M, 2017 Q20's "mangers"). The off-syllabus 149 were left, by D6.
- **Reading packets.** Clark and Bernegger (`0103`), Panning and Coval, Jurek & Stafford (`9c55`),
  Grossi & Kunreuther and Cummins 2008 (`770a`), Mildenhall & Major and Cummins 2000 (`6bfb`),
  Brehm et al. (`8a71`). Only Clark, Bernegger and Panning could be read whole. CJS was read as the
  authors' HBS working paper 09-060 (the AEA's PDF returns 403); only Mildenhall & Major's Chapter 1
  and index are free; Brehm and Grossi are study-kit or sold; both Cummins articles are paywalled,
  and their author-posted copies (SSRN 1057401; a 2012 archived Wharton paper) were blocked to the
  sessions. So the readings' own pages were verified at medium against the outline, the printed
  contents and catalogue records, and the concept pages resting on unread chapters were left
  `in_review`, every worked example recomputed. That is D22.
- **What it caught.** Bernegger's page paired the MBBEFD special cases with the wrong
  Maxwell-Boltzmann / Bose-Einstein / Fermi-Dirac cases (major, fixed to p.103). CJS's page had lost
  the notches on its ratings (BBB−, BB+). Two pages called operational risk a Solvency II module (it
  is Art. 107's separate requirement; *Risk Taxonomies* fixed, *Operational Risk* open). *Economic
  Value* writes EVA as M − ιQ, which is zero under the vault's own ι = M/Q (open). *Insurance Market
  Imperfections* omits competition, one of task C1's three examples (open).

**Left for a maintainer:**

- **2013 Q15** — the RAROC/EVA key rests on two assumptions the stem doesn't state (no investment
  income on capital; losses at year end); the vault's *Risk-Adjusted Performance* page takes the other
  reading. Cummins 2000 would settle it (D22).
- **2014 Q16** part b — the checker ranked the CDO² tranche riskiest, from CJS p.11; CAS ranks it
  safest (the junior tranche absorbs first losses) and accepted "any ranking with a valid
  explanation". Accept the key's reading and re-pass, or add a note.
- **`cas9-an-009` and *Prepayment Risk*** — the outline names prepayment under C5, but neither C5
  reading mentions it (Panning: no "prepay", "mortgage" or "callable"; CJS only as mortgage default).
  Cut the page back to the outline's words and write a C5 question on what Panning or CJS teach, or
  name a source.
- **Minor, open:** 2015 Q18 tags *Line of Business* (a ratemaking page) where *Business Unit* fits;
  2019 Q10's CAS sample 3 prices the tranche on 1,000, not the stem's 500; 2013 Q13 tests catastrophe
  risk swaps, which no concept page covers (Cummins 2008 does); *Business Risk* lacks Brehm's
  strategic-risk material, examined five times on Exam 7 — a writer's job; *Catastrophe Modelling*'s
  one source is dead (404) and it covers little of A4–A5; ten unsourced claims on the Clark pages
  (*Reinstatements*' pricing formula is in no source); *Treaty* and *Facultative Reinsurance* want a
  reading that defines them.
- **A slip of this round:** two agents shared a scratch file for their run id, so `8a71`'s entries on
  the eleven Brehm logs carry `0103`'s run id; each log has an `8a71` comment saying which are its own.

### A.5 The MAS-II campaign, first round (18 Oct 2026)

Ten agents, one per packet, then a writer and a different checker for the reading the page had
missed. `--check MAS-II` fails G1, G4 and G7 (4 / 7).

- **Paper packets.** `verify_paper.py build` couldn't segment the three scanned multiple-choice
  booklets (`pdf_extract` found no questions), so each agent worked from the OCR'd cache pages
  and the key page directly — a gap in the tooling for scanned MC papers. The two supplemental
  case studies (Fall 2018, Fall 2019) are separate PDFs on CAS's Examiners' Reports page;
  Spring 2019's is in the booklet. **125 of 126 verified** (67 high, 58 medium: the conceptual
  items, checked against the key and an open text, since West and Tse are commercial). Every
  vault answer equals CAS's; multi-letter keys (2018 Q34 C & E, 2019F Q34 A, B, C and Q38 D, E)
  are noted on the file, which keys one. A blind-check weakness, recorded in the run summaries:
  in two packets the key page came back with the booklet text, so part of each paper was
  recomputed after the key had been seen.
- **Reading packets.** ISLR (the CAS-hosted 2nd edition; the authors' host reset the
  connection) in two packets, Goldburd Ch. 7 with Salis, credibility, time series, mixed models.
  Only ISLR, Goldburd and Salis are free; Tse, Cowpertwait and West were checked at medium (D7)
  against open texts — Loss Data Analytics, fpp3 and NIST's e-Handbook, the lme4 paper, SAS's
  PROC MIXED guide and West's own shrinkage notes — and their resource pages against the
  publishers' contents. **65 of 67 concepts verified** (14 high, 51 medium).
- **The page.** Its F-002 resolved: cross-validation, the bootstrap, regularization and
  exponential smoothing were the vault's own additions, in no outline task and outside the
  assigned chapters, and were deleted (`masii-an-023`, on exponential smoothing, is now
  `off_syllabus`). The outline lists a sixth reading the page lacked — Salis, *Measures of
  Predictive Accuracy* (CAS study note, Nov 2025) — now written, verified (high) and on the page;
  `syllabusVintages.ts` names it instead of patching it in. G5 6 / 6.

**Left for a maintainer:**

- **D23** — the page's F-001 (major): 36 tasks to the outline's 21. Restoring the outline's would
  drop concepts such as *Posterior Distribution* (25 questions) and *AIC* (16).
- **D24** — about 35 questions on the 2019 papers test McElreath's Bayesian/MCMC reading, no
  longer assigned (Spring 2019's run lists 15; Fall 2019's about 20, still tagged "Introduction to
  Credibility").
- **2019F Q35** (`in_review`): an exponential prior with mean 7 pulls the posterior mode down,
  not toward 7; the stem's mode of 2.1 can't come from its own model. A writer.
- **Two pages wanting Cowpertwait itself**: *Backward Shift Operator* (§4.5.1, §6.3.1) and
  *Correlogram*'s −1/n ± 2/√n bounds (§2.3.1).
- **Minor, open** (writers): 2019S Q5 — the key needs the square-root rule on *expected* claims,
  where Loss Data Analytics uses observed; 2019S Q35 and 2019F Q34, Q39's explanations; *Conjugate
  Prior* lacks Tse's beta–geometric pair; *Empirical Bayes Credibility*'s "negative VHM set to 0";
  *Predictive Accuracy* lacks the loss ratio chart; *Exact Credibility* and semiparametric
  estimation sit outside the outline's Tse sections; ten ISLR-page claims the book doesn't make
  (ESL would source most); `masii-an-008` (the bootstrap, MAS-I) and `-015` (elastic net, Exam 8)
  may belong in other banks.

### A.6 ASTAM's bank: the SOA's printed slips (19 Oct 2026)

What the transcribers and checkers found printed in the SOA's ASTAM PDFs and kept as printed (P1:
the vault transcribes, it doesn't correct the publisher). Each wants an "(as printed)" note, or a
finding, when ASTAM's paper packets run (Phase 3, step 4c). Under each heading a bare Q is that
group's paper; "S"/"F" is its Spring or Fall paper.
The checkers' finds, last, name their paper in full.

**Sample 9-16**

- Q9(a) assumption 2 prints Var[X_ij|θ_j]·m_ij (θ_i meant)
- Q9(c)(ii) weights "proportional to Var" (inverse meant)
- Q12(c) se 0.0638 in solution vs 0.0639 in table; −0.06886 matches 0.0639
- Q12(a) asks four steps, solution lists five
- Q14(a) mixture written as weighted sum βY1+(1−β)Y2

**Sample 17-25 (22, 24 Excel skipped)**

- Q17(d) Y = max(X,1000) (min meant; E[Y]=621.25 right); (e) "80% confidence" missing "interval"
- Q18(a) SBC −424.5 − 5.99 = 30.49 (−430.49 meant); (b) "If H1 is true" (H0 meant), "ZM Poison"; (e) "Geometric based on SBC" (ZM Geometric best)
- Q19 stem "a sample of size with" (n missing)
- Q20(d)(i) s2² second line drops ½; (d)(ii) m1 = β3 printed 0.9929 vs table 0.9928; (e) "raw Bs estimator"
- Q21(g) solution names "Adam"
- Q23(a) proof ends "= ν + a = μ + a" (Poisson only); (e) 0.1745 vs μ̂ 0.1746
- Q25(b) information as inverse of −∂l/∂α (second derivative meant); (d) variance (1/n)(100α̂/(α̂−1))² — (α̂−1) should be squared

**Spring 2026 (Q1 Excel skipped)**

- Q3(e)(ii) E[X∧x] = 2000[1−e^{−x/1000}] (1000 meant; figures use 1000)
- Q6(c) d = X(464) (484 meant)
- Q6(d)(ii) Method 3 (0.99)^0.678765 (0.01 meant)
- Q3(c)(ii) 1,704,200 rounded (1,704,240); Q5(d)(iv) 579.78 vs 579.79

**Sample 1-8**

- Q2(d)(ii) prompt "developed in Question 16" (part (d)(i) meant); solution labels sub-parts (d),(e); E(S)=E(N)E(S) (E(X) meant); "Class C" for Reckless
- Q2(b) 2019 "= 1.172368" without P; Q2(c) solution only "See the proof on Page 127 and 128 of Brown and Lennox"
- Q3(b)/(c) f̂1..f̂5 vs β̂0 = 1/(f̂0…f̂4) indexing
- Q4 solutions print an "(e)" duplicating (d) — omitted
- Q5(c) ES_α(X) vs α(n); Q6(c) α̂ = 3.3836 without working
- Q7(c) 2722.8 printed, 2722.38 implied; 6,899.98 (b) vs 6899.94 (d); Q7(e) SD[S] 12,784.7 (12,784.79)

**2025 Spring/Fall (Q1 Excel skipped both)**

- S Q3(b) solution steps (i)–(iv) vs question (i)–(iii); Q3(c)(iii) off-balance 0.9771 (0.97734), carried into (d)
- S Q4(c) Method 3 "dx" after z = x − d; S Q5(a) 1568/1650 valued 1.1176 (=1568/1403); S Q6(b) "= =" written once
- F Q3(b) GEV ξ=−1 "for y > 1" (y < 1); F Q4(c)(ii) g2 = f1g1 + f2g0 missing j/s weights; F Q4(d) E[X**]
- F Q5(c) solution labels (iv)/(v) shifted; F Q6(c)(i) "moments of L" (W); F Q6(c)(ii) μ*+(σ*)² missing /2; F Q6 comment 8 mentions an instruction not in the question

**2023 Spring/Fall (no Excel question)**

- S Q2(b)(i) ZM Poisson likelihood (1−e^{−λ})^{54} (−54 meant); S Q3(c) X̄2 0.35455 vs 0.35454
- S Q5(c) denominator printed 12,292.0 (12,075.25; answer 217.84 uses the right one); S Q5(d)(i) 4.36% (4.38%)
- S Q6(b) 245.8 − 225 = 20.77 (unrounded); S Q6(d) solution steps (i)–(iv) vs question (i)–(iii)
- F Q2 solution letters off by one from (c)(i); F Q2(e) denominator expansion wrong, conclusion unaffected
- F Q3 unclosed parenthesis; F Q1(c)(i) "θ* = 1080" → "θ* is 1080" (lint)

**2024 Spring/Fall (Q1 Excel skipped both)**

- S Q2(a) SD of average "1/N times" (1/√N); S Q2(b) (25000+30000)/20×1/0.85 (fixed expenses 3,000; 1647.06 = 28,000/20/0.85); S Q2(c) Region C labelled A/B
- S Q4(e)(i) h(θ) = h(θ̂) no hat; S Q6(b)(ii) λ for scale γ; S Q6(c) "c_n x + d" missing subscript
- F Q3(e)(i) "oayment"; F Q5(d)(ii) 2500/2499 placement (0.22307 applies it to whole); F Q3(b) LER asked but solution stops at E[X∧d] = 494.79
- F Q6(b)(i): C̃6,7 printed 16,799 / reserve 7,617 ("show 7,600"); printed formula gives 17,247 / 8,065; 0.497849 should be 0.497859. *Corrected 23 Oct (run `b1bc`): the slip is μ₆ = 0.85(18,000) printed as 16,200 (it is 15,300); with 15,300 the printed line gives 16,799 and 7,617, so the reserve is right.*

**Found by the checkers**

- 2023f Q5 comments "Execl"; 2023f Q2(c) comment "maximum excess loss formula" (mean); 2023f Q2(c)(i) θ+d+y missing X subscript; 2023f Q1(b) comment "Full credit or no credit" (partial?); 2023f Q1(d) "aggregate payments to the insurer"
- 2024f Q5(c)(ii) unbalanced brackets in solution
- Sample Q10(b) MGF integral repeats e^{−λx} after combining
- 2025s Q4(e) '28% of small losses eliminated' (F(1000)=0.378); 2025s Q3(b)(i) 'deducible'; 2026s Q6 comments 'question..', 'umber'

### A.7 ALTAM's bank: the SOA's printed slips (19 Oct 2026)

As A.6, for ALTAM: what the transcribers and checkers found printed in the SOA's ALTAM PDFs and
kept as printed, each wanting an "(as printed)" note or a finding when ALTAM's paper packets run
(Phase 3, step 4d). Under each heading a bare Q is that group's paper; "S"/"F" is its Spring or
Fall paper. The sample set's questions are mostly old MLC and LTAM papers', so a slip there may
also be in the original.

**Spring 2026 (Q1 Excel skipped)**

- Q3 solution labels (b),(c),(d) as (a),(b),(c); Q3(a)(ii) 0.21131 used as 0.21132; Woolhouse line ä^01_x = ā^01_x feeding ä^10_70; Q3 10+V^(0) 28,094.75 vs 28,094.74; comment "paid.."
- Q5(d)(i) A^1_{71:10} computed 0.13980, written 0.13890 in the sum (result follows 0.13980); (iii) 139,800.5
- Q6(a) p(0) = 37,544.2 − 121,242.8 = 16,301.4 (21,242.8 meant); comment "part (i)" for (a); 10p70 0.83064 vs 0.830645; Q6(c) "lognnormal" ×2; Q6(d)(ii)/(e) subscripts ä_{80_j}, ä_{80_i}

**2024 Spring/Fall (Q1 Excel skipped both)**

- S Q3(b)(ii) uses −1945.13 (part (i) −1945.3) → 162,783; "OR" line −0.25(−1950) prints 161,810 (≈162,784); S Q3(b)(i) SOA's own note: exam printed b2 = 7.85e−5 for 7.58e−5 (both answers kept)
- S Q2(d) 7171.0 (7170.0 from shown figures); S Q4(c)(iii) "+" for "±"
- F Q2(a)(i) formula with ages 40–44, l40, 100,000 (question: 60–64, l60 = 10,000; 0.0901 right)
- F Q5(c)(i) starts from 109,500 (prompt AV41 = 109,467)
- F Q6(a)(i) d1 = 0.47434 then Φ(−0.47432)
- F Q6(b)(i)?? none; typos: "benifits" (F Q3 (vii)), "Black-Sholes", "with stating why" (F Q6 comments), "Excel tables.." (S Q3), "(overlaps with item (2)?)" (S Q5 solution), "did the best on part of the question" (F Q6)

**2025 Spring/Fall (Q1 Excel skipped both)**

- S Q3(d)(i) alternative line ä_{70:80} for ä_{80:90} (4.5071 used); S Q4(c) P 1846.77 vs 1846.76; S Q6 p(0) 12,605.5 (≈12,605.8), p(6) 3190.27 (≈3189.9)
- F Q3(d) tV(1) = 50,000 ā_x, tV(2) = 50,000 ā_y (ā_{x+t}, ā_{y+t} meant)
- F Q4(c) σ²A + σ²B printed 4.3e−7 (4.73e−7); CI uses 1.95 not 1.96
- F Q5(c)(i) "19.405.97"; F Q5(c)(ii) numeric line drops +300 (47,800 includes it)
- typos: F Q6(c)(iii) "offered by then plan"; S Q6(c) comment "most common mistake was recognizing"; S Q4(d) "Specially most struggled"; F Q3 "expectations..Many"

**Sample 15-28**

- Q15(e) stray "1000" and integral repeated; Q16(a)(iii) "90.75283)" for "(0.75283)", A^12_70 without bar; Q16(b)(ii) uses 97,500 (10V(1) = 95,700; the printed −2652.8 follows 95,700, so only the bracket's 97,500 is the slip — corrected 23 Oct, run `e686`); Q16(d)(ii) "State 2" (1 meant)
- Q18(b)(ii) missing ∫_0^t; typos "dies early than", "policy calues", "ti the", "polict values"; Q20(b) "transition.."
- Q22(b) 20E50 for 20E50:50; Q22(c) "Common mistakes included :"; Q24 "the question answered", "using a separate 0.25 instead and using .15"
- Q25(f) denominator ā^s_{x:y|δ**} (single-life ā_50 at 4.25% meant; 17.9917 single-life); Q26(b) "approach.."; Q27(c) "provit vector"; Q27(d) "NPV of A ... larger than 14%" (IRR meant), "year 1,which"

**Sample 1-14**

- Q4(b) diagram 0↔2 double arrow, text gives μ10 and no μ02; Q4(c) 0.5p^03_64 = 1 − 0.00264 (1 − 0.5p^03 meant)
- Q5(a)(ii) exponent missing minus; Q5(a)(i) ā^01_x vs ā^01_0
- Q6(d)(i),(ii) (1−e^{5(0.25)})/0.25 missing minus signs
- Q8(c) −3(0.2)(…) for 3(0.02)
- Q10(d) 0.4543 vs (e) 0.4542; Q10(f) asks two reasons, solution gives three
- Q11(d)(iii) no answer printed in the SOA solutions
- Q12(d)(i) solution 698,670 (689,670: transposed digits); Q12(c) ā without 00 superscript
- Q14(b) labels shifted (EPV 1391.60 unlabelled, premium 488.93 labelled (i))

**Sample 29-42**

- Q29(c) "(0.01)((0.75)" doubled parenthesis (typeset clean)
- Q31(b)(ii) "age 74since"; (b)(iii) odd "until age 76 if annuitant died before 73"; (e) third sub-part labelled (i)
- Q32(c) (100,000+1000)(0.029028), 10(1000)(0.229028) — results need A60 = 0.29028 and 10(2000); Q32(d) gains sum −17,131.09 vs total −17,169.87; stray "87,553.78 – 15,046.22" line
- Q33(d)(ii) "− 1000 p*60 11V" (+ used); expense bracket adds q*(250,000+E) where subtracted; gains sum 157,663.85 vs total 157,917.62
- Q34(f) "IRR>0 for discount rates less than IRR" (NPV>0 meant); Q35(b) "177,313,20"
- Q36 printed total 8 vs parts 10; (c) "same as in (a)" (b meant), comment "then new reserve"; (d) "78,973 (annuity plus premium)"
- Q37 "January1, 1990"; Q40(c)(ii) B61 (B56 meant), "During"/"during"; Q41(d) "the IRR that earned"
- Q42 printed total 8, only (a) 2 and (b) 3 printed

**2023 Spring/Fall (no Excel question)**

- S Q3(a)(i) numerator 72636 − 0.002v(150,000) missing (1.06); S Q3(a)(ii) COI max 0.0022(0.97)AV10 v (corridor 0.91)
- S Q5(a) 322,128 (≈322,137); S Q5(c) 322,128(1+i)^20 = 1,066,341 (≈1,066,310)
- F Q1(e) mortality gain −19,864.11 (≈−19,865.86 from printed q; printed adds to total)
- F Q2(d) (0.33174), (0.04512) for 0.33714, 0.04152 (transposed in print); F Q2 solution letters (comments "most candidate")
- F Q3 "the outgo relevant to the insurer's funds only the difference"; F Q5(e) "96.626.45"; F Q6(b) comma decimals "1,1", "8337,28 + 1787,07"

**Sample 43-56, 61 (57-60 Excel skipped)**

- Q44(b) 1,556,111 vs (a) 1,556,115; "conrribution"
- Q45(b)(ii) alt adds 872.20 vs 872.14; r63/l63 with d63 figure; lowercase s63
- Q46(a)(ii) 13.0807 for 13.0870; (c) "12,35.46", 0.185974
- Q47 "65.."; Q48(b)(ii) NC derivation labelled "AL ="; prompt "projected unit cost (PUC)"
- Q49(a) unbalanced brackets, v_{i_q}/i^q, "total DV"; Pr2 667.68 vs 667.00; NPV uses 411.40 vs table 411.04
- Q50 prompt "Q is 1630 to the nearest 10", solution Q = 1506.34; "not adjustment"; "CF_1"; "91,9416"; "Person S"
- Q51(c) headings P1, P2 for years 2, 3; Q52 "Graders Comments"; Q53(c) AV1 15,468.6 vs 15,486.6 used
- Q55 "is is", "F_t. plus 30"; Q56 ξ 0.74730 vs 0.747230
- Q61 prompt (b)(ii) "77 to the nearest 1", solution 83.85; (c)(ii) max(10,000e^{0.06}, F_2) with 19,400; "Standard Ultimate Mortality Model"; unbalanced parenthesis/quote

**Found by the checkers**

- 2025f Q5 comment 2 2p^00_80 (2p^02_80 meant)
- Q29 diagram has no 0→2 arrow, solution uses p^02 for the death benefit
- 2023s Q1(a) column vector for 2p^22 (0.05, 0.10, 0.70, 0) yet result 0.490 right

**Settled by the Phase Q checks (23 Oct 2026, runs `756d`, `fa02`, `e686`)**

- **Not slips, left unmarked:**
  - 2023s Q1(a): the vector is column 2 of P.
  - 2023f Q1(e): −19,864.11 is exact with the unrounded q₇₅:₇₅.
  - 2024s Q2(d): 7171.0 is intermediate rounding of 7,171.4.
  - 2025s Q6: p(0) and p(6) are the exact Black-Scholes values.
  - 2026s Q5: 139,800.5 is 10⁶ × 0.1398005.
  - 2026s Q6: 10p70 differs only by rounding.
- **New slips, marked (as printed):**
  - 2024s Q3: the "answer using the number given in the exam" line substitutes 0.00229 for μ¹⁰, but b₂ moves μ¹². The printed −1878.0 follows the correct substitution.
  - 2026s Q3: the stem's μ¹²₆₀ = 0.02325, where the exam's workbook (μ¹² = 1.4 μ⁰²) gives 0.020325. It feeds no result.
- **Two slips that touch what a student computes:**
  - 2024s Q3's stem b₂ = 7.85e-5 (the SOA's note says 7.58e-5 was meant). Trusting the stem gives 161,467, not the stated 162,300. The stem carries the marker and the explanation carries the SOA's note. A stem-level editorial note would be new prose, so it is the maintainer's call.
  - Sample Q16(b)(ii): see the correction in *Sample 15-28* above.

## Appendix B — Fact-check wave records

Moved here from `docs/verification-plan.md` §5, which now keeps only the method.

### B.1 Wave 1: the backlog (bands 0 and 1). About 80 files. **Done** (run `2026-10-09T19:04Z/2db6`)

> **Outcome** (`.verify/_runs/2026-10-09T19-04Z-2db6.md`): 79 files, 72 now verified (21
> high, 50 medium, 1 low). All 64 backlog findings outside Exam 6C's page were closed,
> including the four criticals; 84 more were found and 78 of them fixed in the run.
>
> Left behind:
> - **In review**, each for a source that couldn't be read: Close Year, Profit and
>   Contingency Provision, Insurer and fm-231.
> - **Untouched:** Exam 6C's syllabus page, which waits on its F-001.
> - **New open findings on four 6C pages:** *MCT* and *Capital Required* multiply by 1.5
>   where OSFI's guideline divides (critical); *Solvency* and *Supervisory Target Capital
>   Ratio* use LICAT's name for the denominator (major).
>
> Two source drifts surfaced:
> - SOA re-issued the Exam P sample PDFs under the same URLs. No key differs on the 565
>   questions matched; 109 still need a look.
> - CAS revised the Fall 2026 Exam 5 outline in place (v02), and `Exam 5 (CAS).md` is out
>   of step with it.
>
> Fold both into the Exam P re-check and the Exam 5 campaign.

- **4 disputed concept pages** with open criticals: *Complement of Credibility*,
  *Expense Ratio*, *Exposure Base* and *In-Force*. **Each needs a human decision**
  (`docs/verification.md`: disputed means a person settles it). Put the four, each with its
  evidence, to the maintainer in one list.
- **56 other open findings on 41 files**, nearly all Exam 5 concepts against *Basic
  Ratemaking*. Run them as one packet with that book loaded once. This is also the first
  slice of the Werner packet in Wave 4.
- **Exam 6C's syllabus page**: 8 open findings. F-001, the domain C renumbering, is a
  maintainer's call already written up in run `9495`.
- **30 stale files**: 13 P and 2 FM questions (mostly after a retag), 12 Books pages, 2 concepts, and
  Exam P's page. Re-verify these **as a delta**. Diff the file between the commit its last
  pass recorded and HEAD, then check only the change against the source the pass already
  cited. A retag needs the ontology checked, not the question recomputed. This needs git
  history: run `git fetch --unshallow` (or a deep enough `--deepen`) first, because the
  session clone is shallow.
