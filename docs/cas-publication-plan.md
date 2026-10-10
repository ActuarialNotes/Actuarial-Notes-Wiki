# Publishing the CAS exams

How every CAS exam leaves **Beta** or **In Development** and becomes **ready**, the state Exam P
and FM are in. This doc covers what *ready* means, how far each exam is from it, and the order of
work. It sits on top of three existing plans and changes none of their rules:

- `docs/verification-plan.md` says how to fact check by source packet;
- `CONCEPT_GAPS_PLAN.md` covers which missing concept pages to write;
- `.claude/skills/question-writer/` covers how the vault writes its own questions.

> **Snapshot: 10 Oct 2026.** Measure it again with `python3 scripts/publication_readiness.py`.
> Use `--exam <id>` for one exam's failing items and `--check <id>` before promoting an exam.

## 1. What "ready" means: seven gates

An exam is promoted when `python3 scripts/publication_readiness.py --check <exam>` passes. That
script is the single definition, so this plan is measured rather than argued about:

| Gate | Passes when |
|---|---|
| **G1 page** | The exam page is `verified` against the examining body's outline. |
| **G2 written** | Every link in a learning objective lands on a page, and no syllabus concept page is a stub. |
| **G3 specific** | No concept page is linked *under another name* from more than two objective lines of one exam page. |
| **G4 checked** | Every syllabus concept page is `verified`. |
| **G5 sources** | Every Source Material reading has a `Resources/` page, and it is `verified`. |
| **G6 questions** | Every syllabus concept has at least one question the quiz serves, in the exam's own bank. |
| **G7 bank** | Every question the quiz serves from that bank is `verified`. |

The rules underneath come from `docs/verification.md`. Nothing reaches `verified` without a
citable external source read in that run (P1), and any edit drops a file back to `stale` (P4).
Questions with an open critical finding are already kept out of the quiz, so G6 and G7 count only
questions that are actually served.

**G3 is new, and it exists because of the DISCs.** A link like
`[[Commercial General Liability|CGL Coverage B]]` looks specific, but it sends the reader to an
overview page that gives Coverage B one bullet. The gate counts links whose text doesn't name the
page they point to. "Premium Auditing Process" → *Premium Audit* is fine: the objective is naming
its subject. "CGL Who is an Insured" → *Commercial General Liability* is a section sent to a page
that isn't about it.

G3 can't catch a link that points at the **wrong** page under a plausible name. DISC-IA's "Types
of Annuities" went to *Life Annuity*, the actuarial-mathematics page. Its "Uninsured Motorists
Coverage" went to *Uninsured Automobile Coverage*, which is the Canadian coverage. Its "Property
Insurance Limits and Deductibles" went to the Exam P loss-model pages. That needs a person or an
agent reading each link. Section 4 makes that review part of every exam's campaign.

### Status steps

- **development → beta**: once G2, G3 and G6 pass. The material exists, every section has its own
  page, and every concept can be quizzed.
- **beta → ready**: once all seven gates pass.

Promotion is a one-line change in `quiz/src/lib/examStatus.ts`, mirrored in
`scripts/exam_catalog.json` (`examCatalog.test.ts` holds the two together). An exam moved out of
development must also be added to the DEFAULT track (`data/tracks.test.ts`).

## 2. Where each exam stands

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

## 3. The DISCs: specific links, specific pages, their own banks

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

### 3.1 Re-linking (done, 10 Oct 2026)

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

### 3.2 Writing the pages (done, 10 Oct 2026)

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

### 3.3 Banks (done, 10 Oct 2026: 70 / 131 / 221 questions)

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

### 3.4 Fact check, then promote (DISCs promoted to beta 10 Oct 2026; fact check running)

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

### 3.5 What the fact check settled (10 Oct 2026)

**Results.** Eleven fact-check packets and their clean-up rounds checked about 650 files. Every
vault-written question was recomputed blind before its key was read. Below is how each DISC stood
at the end of the day; the most recent results are pending (V4, V5, V8, W2).

| Exam | Status | Remaining |
|---|---|---|
| **DISC-DA** | **ready** (7/7) | none |
| **DISC-IA** | beta (6/7) | *Strict Liability* (dram-shop framing, being fixed) |
| **DISC-RM** | beta | see below |

**DISC-RM** still has these open:
- four new DISC-specific pages being written and checked;
- *Period of Restoration* and question 217;
- *Types of Reinsurance*'s IFRS 17 bullet;
- the Institutes-only frameworks, below.

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
035, 041, 047 and 233. They stay `in_review` until someone checks them against the course text, or
they are rewritten to what open sources say. That choice is decision D6. *Insurtech* is in the same
position, because no open text is current enough.

## 4. Order of work

Each step is a campaign: one sweep run and one resolve run, batched by source as in
`docs/verification-plan.md` §5. In every campaign, the exam's links are reviewed for wrong targets
first (§1), because a fact check of the wrong page wastes the check.

| # | Exam | What it takes | Why here |
|---|---|---|---|
| 1 | **MAS-I** → ready ✔ (10 Oct 2026) | Fix 2 catch-alls (*Probability Distributions*, *System Reliability*); verify the 117 `masi-an-*` questions against the concept pages and readings already verified | Cheapest promotion. Its concepts, readings and published questions are already checked. |
| 2 | **DISC-DA, RM, IA** → beta ✔, then ready (DISC-DA ✔ 10 Oct 2026) | §3: write the 67 pages and the three banks (development → beta), then fact check pages, banks and the three textbook pages | The user's priority, and the only exams where links had to be redesigned. No past papers, so no paper packets: everything is reading packets on free primary documents. |
| 3 | **Exam 7** → ready | Write questions for 7 concepts; verify 17 concepts, 15 readings, 118 questions (8 papers, keyed by paper, which clears 64 of Exam 9's questions too) | Smallest concept set of the papers exams. |
| 4 | **Exam 8** → ready | Write the **10 missing reading pages**, then drop `"source_pages": "partial"`; questions for 6 concepts; fix 1 catch-all (*Rating Class*); verify 26 concepts, 12 readings, 132 questions | Shares papers with 9. |
| 5 | **Exam 9** → ready | Questions for 10 concepts; verify 53 concepts, 9 readings, the remaining questions on its own 7 papers | Most of its bank arrives verified through 3 and 4. |
| 6 | **Exam 5** → ready | Fix 6 catch-alls (*Loss Reserving* stands in for 9 reserving objectives); questions for 7 concepts; the page is in review against the re-issued Fall 2026 outline (v02); verify 68 concepts, 6 readings, 349 questions on 14 papers (find Spring 2018's booklet first) | Largest single bank; *Basic Ratemaking* and *Friedland* packets also serve the DISCs and FAM. |
| 7 | **MAS-II** → ready | Fix 4 catch-alls; questions for 28 concepts; verify 70 concepts, 3 readings (2 commercial, so medium), 126 questions on 3 fully scanned papers (OCR first) | Scanned papers make each question dear. |
| 8 | **Exam 6C** → ready | Settle the page's open F-001 (domain C renumbering, a maintainer decision); questions for 22 concepts; verify 149 concepts, 67 readings, 321 questions | The most concepts and readings, but all free Canadian documents. |
| 9 | **PCPA** → ready | A bank of the vault's own questions (29 concepts, most also in MAS-I/II, so tags plus a few new questions); fix 1 catch-all (*Tidy Data*); verify 13 concepts and 13 readings (several commercial) | No paper exists. The Projects simulator is the real practice, and the bank covers the knowledge it assumes. |
| 10 | **Exam 6U** → beta, then ready | Write the **44 missing reading pages** through the resource pipeline; a bank of the vault's own questions for 66 concepts; verify everything | Furthest from ready. Its readings have no pages, so nothing can be routed until they do. |

As each exam passes `--check`, promote it in the same PR as the run that got it there, and cite the
script's output in the PR.

## 5. Decisions only a maintainer can make

- **D1, vault-written banks.** The DISCs, PCPA and 6U have no published questions, so their banks
  are the vault's own. P and FM were made ready on the SOA's questions. Does an exam whose whole bank
  is ours, written to the `question-writer` standard and fact checked, count as ready? This plan
  assumes yes.
- **D2, off-syllabus questions.** These are 247 past-paper questions kept for the record and out of
  quiz draws. G7 doesn't count them. Should they be verified with their paper anyway
  (`docs/verification-plan.md` §7.3)?
- **D3, commercial-only sources.** These are the three DISC course textbooks, MAS-II's Cowpertwait
  and West, and several PCPA readings. Is a medium ceiling, against the publisher's table of
  contents, enough for G5?
- **D4, Exam 6C F-001** and **the Exam 5 v02 outline** (both already open in
  `docs/verification-plan.md`).
- **D5, the DISC link design** (§3.1). One page per lettered section is a judgment: the syllabus
  gives only titles, and the course text isn't available to confirm what each section covers. Any
  section that turns out to be broader or narrower than its page can be re-linked without touching
  the verified words.
- **D6, frameworks only the course states** (§3.5). Either check the DISC-RM frameworks above
  against The Institutes' course text, or rewrite those pages and questions to open sources, which
  would drop the course's own framing.
