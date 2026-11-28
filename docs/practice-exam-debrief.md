# The Practice Exam debrief: the estimated score (method, proposed)

Status: **proposed 2026-11-28, not built.** Roadmap: "Pro for MAS-I onwards", item (1). This
doc is the first step the roadmap names: read what the CAS publishes about scoring, then write
down the method before any code. Everything below is either a quote from a CAS document (with
its address) or a rule this doc proposes, and the two are kept apart.

## 1. What the CAS publishes

All read from casact.org on 2026-11-28.

**The 0 to 10 scale.** *Syllabus of Basic Education* (2026 edition, file
`https://www.casact.org/sites/default/files/2025-01/2025_SOBE.pdf`, "After the Exam"; the 2020
Syllabus says the same):

> After the pass mark is finalized, each candidate is assigned a score. Scores of 0 to 5 are
> assigned to candidates who do not pass. On this scale, each interval is 10 percent of the pass
> mark. For example, a grade of 5 equates to a candidate's score of at least 90 percent, but less
> than 100 percent, of the pass mark. A grade of 0 means that the candidate's score is less than
> 50 percent of the pass mark. Candidates at or above the passing mark will receive a score of 6
> to 10. Historical passing numeric scores will not be provided.

So a failing grade is a function of one number, raw score ÷ pass mark: 5 is [90%, 100%), 4 is
[80%, 90%), down to 1 at [50%, 60%) and 0 below 50%. **Nothing published says what separates a
6 from a 10.**

**How the pass mark is set.** Same document: "Preset pass marks — for example, a candidate will
pass if he or she answers x percent of the questions correctly — are counter to this
philosophy." A panel estimates what a minimally qualified candidate would score (a modified
Angoff study for multiple choice; a pass mark panel for constructed response), and the mark is
then "compared with and balanced against the actual performance statistics on the exam". The
pass mark is content-based, so it moves with the paper's difficulty.

**Pass marks were published until 2019.** The Past Exams & Pass Marks page
(`https://www.casact.org/exams-admissions/exam-results/past-exams-pass-marks`): "Pass marks,
answer keys, and Examiner's Reports ceased publication with the beginning of computer based
testing in the fall of 2020." The 2026 Syllabus: "The CAS no longer releases the pass scores for
Exams MAS-I, MAS-II, and 5 through 9." The page links one PDF per exam
(`.../2021-02/admissions_passmarks_exam5.pdf` and its siblings) listing each sitting's available
points, pass mark and 75th and 95th percentiles. Each Examiner's Report prints the same figures
(Fall 2019 Exam 5: "Available Points: 53.5 / Passing Score: 37.0 / … Raw Pass Ratio: 28.6% /
Effective Pass Ratio: 31.8%").

The pass mark as a share of available points, over the sittings those PDFs list from 2014:

| Exam | Sittings | Lowest | Median | Highest |
|---|---|---|---|---|
| MAS-I | 4 (S2018–F2019) | 56.1% | 58.1% | 58.9% |
| MAS-II | 3 (F2018–F2019) | 51.2% | 55.1% | 56.2% |
| 5 | 12 | 66.4% | 70.2% | 75.7% |
| 6C | 12 | 65.5% | 69.7% | 74.6% |
| 6U | 12 | 67.1% | 69.5% | 71.8% |
| 7 | 6 | 71.6% | 74.0% | 75.7% |
| 8 | 6 | 62.2% | 69.1% | 70.5% |
| 9 | 6 | 69.4% | 71.5% | 73.3% |

(Working figures from the research pass; the build transcribes the PDFs by script, below.)

**The MAS marks were net of a guessing penalty.** The 2020 Syllabus: "one-quarter of the point
value for each question will be deducted for each incorrect answer". The Fall 2019 MAS-I booklet:
"45 multiple choice questions each worth 2 points". So 58% on that scale is not 58% of questions
right. The 2026 Syllabus no longer has the paragraph, and no current CAS page states the rule for
computer-based exams either way.

**Pass ratios are still published** (`Exam_Statistics_from_2011-Present_Summer_2026.pdf`), with an
"ineffective" count: candidates "Below 50% of Pass Mark", i.e. a grade of 0.

## 2. What this means for an estimate

1. The CAS's own scale gives the conversion: **score ÷ pass mark → grade**, exact for 0 to 5,
   "6 or above" for a pass. That part needs no invention.
2. What we don't know is the pass mark for *our* paper. A drawn Practice Exam is not a CAS paper,
   and the vault's own questions were never through a pass mark panel. The honest input is the
   **range** of published pass marks, which is why the estimate is a range of grades.
3. A past paper sat whole is the one case with a real pass mark: that sitting's own.

## 3. The proposed method

**A. A past paper sat whole** (`sittingOf` in `lib/paperResults.ts` finds it). Compare the
reader's points with **that sitting's printed pass mark**. If the bank holds fewer questions than
the paper (a dropped or unconverted question), scale the pass mark by the available points the
bank holds over the paper's. Output: one grade, "Estimated grade 5 (93% of the Fall 2019 pass
mark)". Where the PDF prints percentiles, add one line: "Above the 75th percentile that sitting."

**B. A drawn Practice Exam** (anything else). Take the exam's published pass-mark shares since
2014 (table above). Convert the reader's share of points into a grade at the lowest, median and
highest share. Output: the median grade, with the spread: "Estimated grade 4 (3 to 5 across
2014–2019's pass marks)". If the whole range passes, "a pass on every published pass mark".

**C. Scoring the reader's paper the way the pass mark was scored.**
- *Exams 5–9:* points earned as `quizPoints` counts them now (keyed parts at their credit,
  self-graded written parts full / half / none, a blank worth nothing). Written parts the reader
  hasn't graded stop the estimate: the debrief asks for the grades first, rather than counting
  them as zero.
- *MAS-I and MAS-II:* the published marks are net of the quarter-point deduction, so the paper is
  scored under the same rule before comparing: +1 a right answer, −¼ a wrong one, 0 a blank, as a
  share of the questions. Comparing an unpenalised score with a penalised pass mark would flatter
  the reader by several points. The debrief says why in one line. (The bank's free-entry
  questions count as right or wrong with no deduction, since the rule was for multiple choice.)

**D. Labels.** It is always called an **estimate**, and the debrief says in one line what it
rests on: "Based on the CAS's 0 to 10 scale and its published pass marks for 2014 to 2019. The
CAS no longer publishes pass marks, and these aren't CAS questions." It never shows a grade from
6 to 10, only "pass".

**E. No estimate where nothing supports one.** The DISCs (The Institutes publish no pass mark),
PCPA (no pass mark), and the SOA exams (the SOA's scale and sources are a separate read). Those
Practice Exams still get the rest of the debrief.

## 4. The rest of the debrief (existing code)

- **Where the time went:** each section's minutes against its share of the paper, and the
  questions that took longest against the allowance (`timeSpent` per response, the pace in
  `lib/quizTiming.ts`, `pacing` in `lib/performanceAnalytics.ts`).
- **What to fix:** sections by marks lost on this paper (`sectionLeaks`, run on this sitting's
  answers alone), each with a **Practice** that starts a quiz on the section's misses and concepts.

## 5. Data and checks

- `quiz/src/data/casPassMarks.ts`: every sitting's available points, pass mark and percentiles,
  each with its PDF's address and the date read. Transcribed by a script that reads the CAS's PDFs
  (`scripts/cas_pass_marks.py`, stdlib + PyMuPDF like `pdf_extract.py`), never typed by hand.
- `lib/practiceExamEstimate.ts`, pure: `casGrade(ratio)`, `masScore(answers)`, the two estimates.
  Tests pin the band edges to the quote (0.90 → 5, 0.8999 → 4, 0.4999 → 0, 1.0 → pass) and the
  table to the PDFs.

## 6. Decisions for the maintainer

1. **The range in B:** lowest/median/highest share (proposed), or the median alone.
2. **MAS scoring in C:** score under the old quarter-point rule to match the marks (proposed), or
   show the unpenalised share against the marks with a warning.
3. **Who sees it:** the debrief is Pro (the roadmap's direction). Proposed: a free reader sees
   the results screen as now, with one Pro row "See your estimated grade".
4. **SOA exams:** out of this build (proposed), or a separate read of the SOA's scoring.
5. **A vault fix found on the way:** `Guides/Exam MAS-I (CAS)/Scoring.md` and its MAS-II sibling
   say "There is **no penalty for a wrong answer**". No CAS page found states that for today's
   exams, and before 2020 there was one. Proposed: cut the sentence, or replace it with what the
   CAS does say.
