# Content Plan

_Measured **2026-10-18** against `main` @ `ac1b277` with the commands in §7 (MAS-II re-measured after its first round, the SOA prelims after Phase 3's linker work) · Re-measure at every
roadmap review_

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
MAS-II's row is re-measured after its first campaign round (Appendix A.5).

**Ready (7):**

| Exam | Gates | What fails |
|---|---:|---|
| MAS-I, DISC-DA, DISC-RM, DISC-IA, Exam 7 | 7 / 7 | — |
| **Exam P** | **5 / 7** | G4: *Insurer* is `in_review` (its Exam 9 and form-of-insurer bullets are unsourced). G6: six syllabus concepts have no question tagged — *Random Variable*, *Discrete* / *Continuous Random Variable*, *Insurer*, *Policyholder*, *Claim*. |
| **Exam FM** | **6 / 7** | G3: *Term of Annuity* stands in, as "finite term", for three objective lines. |

Two ready exams failing their own gates is an unbacked promise — roadmap §0.3, rule 1 — and it is
why Phase 1 comes first.

**Beta (6):**

| Exam | Page | Concepts | Catch-alls | Unverified concepts | No question | Sources unverified | Bank verified | Gates |
|---|---|---:|---:|---:|---:|---:|---|---:|
| Exam 8 | verified | 39 | 0 | 1 | 0 | 1 / 12 | 143 / 143 | 5 / 7 |
| PCPA | verified | 29 | 0 | 9 | 29 | 12 / 13 | no bank | 4 / 7 |
| Exam 9 | verified | 60 | 0 | 48 | 10 | 9 / 9 | 98 / 121 | 3 / 7 |
| Exam 6C | stale | 151 | 0 | 141 | 22 | 67 / 67 | 0 / 321 | 2 / 7 |
| MAS-II | in review | 98 | 0 | 2 | 0 | 0 / 6 | 167 / 168 | 4 / 7 |
| Exam 5 | in review | 136 | 2 | 60 | 7 | 4 / 6 | 0 / 349 | 1 / 7 |

Five of the six are below the development → beta bar they now have to meet (G3 or G6). They were
beta before the gates existed; `--hold` warns on them rather than failing.

**Development (30):** Exam 6U (3 / 7; 45 readings unverified, no bank) and the 29 SOA exams
past FM — the six ASA prelims (FAM, SRM, PA, ALTAM, ASTAM, ATPA; 4 / 7, ALTAM 3, after Phase 3's linker
work, §3.1a) and the 23 FSA modules — each at 2–3 / 7. Every SOA page is `verified` against its syllabus PDF; none has a bank. Their G2
failures are mostly the syllabus linker's cut-short and noise links (`[[Chain-Ladder]]`,
`[[Whole Life]]`, `[[Distribution]]`), not missing concepts (§3.3–§3.4).

**Across the vault:** 5,533 content files, about 55% verified; 3 stale (two retired DISC-RM
questions and Exam 6C's page, held behind D8); **2 open critical findings**, both Exam 6C (*MCT*,
*Capital Required*).

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
| 4 | **Exam 5** (C3) | 3 / 7 | G3 and G6 ✅ (catch-alls re-linked; `cas5-an-001`–`007`, verified; *Claim Reserve*, newly linked, tagged on `cas5-2016s-q16`). D8 (the re-issued Fall 2026 v02 outline; the page is stale after the re-linking); verify 60 concepts, 4 readings, 349 questions on 14 papers (find Spring 2018's booklet first). Its reports were **paraphrased** when the bank was written, not transcribed — each paper's packet restores the report as printed, opening paragraph included (C13) | Largest bank; *Basic Ratemaking* and *Friedland* packets also serve the DISCs and FAM |
| 5 | **MAS-II** (C4) | 4 / 7 | First round done 18 Oct (Appendix A.5): G5 ✅ (6 / 6, Salis's study note added to the page), G7 167 / 168, G4 96 / 98. Left: the page's F-001, its 36 tasks against the outline's 21 (D23); Fall 2019 Q35's explanation (a writer); *Backward Shift Operator* and *Correlogram*, which quote Cowpertwait's own wording (commercial, unread) | Scanned papers; four of its five readings commercial |
| 6 | **Exam 6C** (C5) | 3 / 7 | G6 ✅ (`cas6c-an-001`–`022`, all verified; `005` and `018` carry minor scope findings — IBC's consumer code and the IFRS 17 transition approaches are in no 6C reading). D8 (F-001, domain C renumbering); verify 137 concepts, 67 readings, 321 questions (83 got their report paragraph back, C13) | Most concepts and readings, all free Canadian documents |
| 7 | **PCPA** (C6) | 4 / 7 | A vault-written bank (29 concepts, most shared with MAS-I/II: tags plus a few new questions, D5); verify 9 concepts and 12 readings (several commercial) | No paper exists; the Projects simulator is the real practice |
| 8 | **ASA prelims** (C9) | 4 / 7 (ALTAM 3) | §3.1a: G2 passes on all six, G3 on all but ALTAM; next the banks | The next exams to become studiable, sat by far more candidates |
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
| **SRM** | 4 / 7 | 41 (7) | One sample set: 76 MC questions with solutions in one PDF (`Files/Edu/2018/exam-srm-sample-questions.pdf`, last revised Oct 2026, Q76) | ISLR free (verified); Frees 2010 commercial |
| **ASTAM** | 4 / 7 | 56 (23) | Sample set: 25 written-answer questions, Feb 2026 (Q22, Q24 in Excel); seven past sittings, Spring 2023–Apr 2026, 6 questions each with solutions | Klugman 2019 and Brown & Lennox 2022 commercial; ASTAM-21-26 and -22-23 free SOA study notes |
| **FAM** | 4 / 7 | 80 (38) | FAM-S sample set: 103 MC questions (Topics 1–6, Jun/Jul 2026); FAM-L sample set: about 158 MC questions (Topics 7–10, Aug 2026), many from MLC papers 2012–2017 | Klugman, Brown & Lennox, Dickson et al. (AMLCR) — all commercial |
| **ALTAM** | 3 / 7 | 61 (50) | Sample set: 61 written-answer questions, Jan 2026 (Q57–60 Excel); seven past sittings, Spring 2023–Apr 2026, 6 questions each | AMLCR commercial; ALTAM-21-23 free SOA study note |
| **PA** | 4 / 7 | 23 (5) | Seven project sittings, Apr 2023–Apr 2026 (9–12 tasks, statement + model solution + data); Oct 2022's two R-format sittings partly transfer | ISLR free; Frees, Lander commercial; Healy commercial (the author posts a free edition at socviz.co) |
| **ATPA** | 4 / 7 | 30 (15) | One sample assessment and model solution (2022, a 42 MB zip); no past assessments | The SOA's ATPA e-learning modules (candidates only) |

Order, by candidates and by how much the SOA hands over ready-made: **SRM** (one MC set,
a free main reading already verified) → **FAM** (two large MC sets, the most-sat prelim) →
**ASTAM** and **ALTAM** (written-answer sets and papers, the CAS converter's shape) → **PA**
and **ATPA** (projects: practice is the project, a bank only for the concepts — D5).

Before the first conversion (step 4) a bank has to exist for the exam: the converter knows only
`p`, `fm`, `mas-i` and `mas-ii` (`SOA_PREFIX` / `SOA_BANK` in `scripts/pdf_extract.py`), no
prelim has a `bank` in `scripts/exam_catalog.json`, and the quiz builder's `QUIZ_EXAMS` and
`bankLabelFor` don't list one. The skill pilots five questions' topic choices with the
maintainer before the rest of a set is written.

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
- **Off-syllabus questions** (249 CAS) ride their paper's packet if D6 says verify them.
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

### Phase 2 — Fix the converter, then finish the beta exams

**Why next:** the beta exams are where candidates already study, and most of their remaining work
is verification the packet tooling makes cheap. The converter comes first because its gap is in
every CAS bank about to be checked.

1. ~~**C13**, the converter's dropped opening paragraph~~ ✅ (below).
2. **Exam 8** (C1): the last two gates wait on outside sources (*Risk*'s ERM section, the ISO CGL
   plan, D20). Promote when they pass.
3. **Exam 9** (C2) → **Exam 5** (C3, after D8) → **MAS-II** (C4) → **Exam 6C** (C5, after D8) →
   **PCPA** (C6, a vault-written bank). §3.1 has what each takes.
4. Bring every beta exam up to the beta bar it already sits above — G3 and G6 — at the start of
   its campaign, so `--hold` has no beta warnings left at the end of the phase.
5. Housekeeping: V7's missing run summaries; the "(as printed)" notes on Exam 8's papers.

**Exit test:** every beta exam passes `--check`, or is blocked only by a decision in §6.

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

**Exit test:** the six prelims are `beta`.

**Progress (18 Oct 2026):**

| Step | Roadmap | Status |
|---|---|---|
| 1. The ASA-prelim campaign table | C9 | ✅ §3.1a: what the SOA publishes for each, found on soa.org's own pages; the readings, free and commercial; the gate baseline and the order (SRM → FAM → ASTAM, ALTAM → PA, ATPA) |
| 2. The linker | C17 | ✅ §3.4. G2 passes on all six prelims (FAM was 13 gaps, SRM 15, PA 10, ALTAM 4, ASTAM 15, ATPA 23); G3 on all but ALTAM. FAM's and ATPA's catch-alls were broken up by pointing four aliases at the specific page that exists (*Mortality*, *Survival Model*, *Data Preparation*, *Data Validation*); G3 now reads "DB plan" as naming *Defined Benefit Plan* and "lives" as *Life*. Every page re-checked against its syllabus PDF (unchanged) |
| 3. What's still missing | C11 | ALTAM's one catch-all: *Life Insurance* stands in for "long-term life [and health insurance]" on three profit-testing lines — a coordination the chunker can't read; wants a specific page or a re-link by hand. *Total Risk* (GH-101) is not a prelim's |
| 4. Banks | — | ⬜ Next: give SRM a bank (catalogue, converter prefix, quiz builder), pilot five of its 76 sample questions' topics with the maintainer, then the rest; FAM's two sets after |
| 5. Fact-check campaigns | — | ⬜ After the banks. Five of the six prelims' main readings are commercial (D7) |

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
| D6 | CAS plan D2, verification plan §7.3 | Verify the 249 off-syllabus questions with their papers? | No |
| D7 | CAS plan D3, verification plan §7.6 | Is a medium confidence ceiling enough for a commercial-only source? | Yes |
| D8 | CAS plan D4, verification plan §7.2 | 6C's F-001 (domain C renumbering), and Exam 5's v02 outline | — (needs a call) |
| D9 | verification plan §7.4 | The orphan concepts: link, merge or delete | Leave them unverified |
| D10 | CAS plan §4.1 | Exam 7's questions on dropped readings; 2012 q20 filed under Exam 9 | Keep as they are |
| D15 | CONCEPT_GAPS §13 | The 9 ambiguous targets and the 21 stubs | Link the proposed pages |
| D17 | CAS plan D5 | The DISC link design: one page per lettered section | The current design |
| D18 | syllabus-pipeline-review §4 | The review's owner decisions D1–D4, applied but never written up | As applied |
| D20 | — | A reading with no public copy (the ISO CGL plan) | `in_review`; Exam 8's G5 stays red |
| D21 | — | Goldburd et al. 2020 vs the 2025 revision Exam 8 assigns | The page as it is |
| D23 | — | MAS-II's page has 36 tasks where the 2026 outline has 21 (F-001): restore the outline's (about ten in-reading concepts tagged on paper questions would leave the syllabus) or keep the vault's | The page as it is, `in_review`; G1 stays red |
| D24 | — | MAS-II's 2019 papers' ~35 Bayesian/MCMC questions (McElreath, no longer assigned): `off_syllabus` or served | Served, as they are |
| D22 | — | Exam 9's unread readings (Brehm, Mildenhall & Major, Grossi & Kunreuther; both Cummins articles; CJS's JEP text): a copy, or a reachable author-posted one | The 36 concepts and 2 readings stay `in_review`; G4 and G5 stay red |
| — | verification plan §7.5 | Write missing reading pages before their concepts' packets | ✅ settled: write them first (6U's and Exam 8's were) |
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
