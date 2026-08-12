# The Mock Exam browser (past papers)

The **Mock Exam** source on the quiz builder (`quiz/src/pages/Landing.tsx`) is a browser of
the exam's **past sittings**, not a single generated draw. Scrolling the shelf shows every
paper the exam has released, how many questions each one holds, and — once the figures are
filled in — the sitting's **effective pass ratio**.

This replaced a row of pills (`Mix · Spring 2019 · Spring 2018 · …`) in the bottom action
bar. A pill can carry a label and nothing else: it couldn't say how long a paper was, how
hard it turned out to be, or that a sitting exists but hasn't been imported yet.

## The three pieces

| File | Role |
|---|---|
| `quiz/src/data/pastExams.ts` | The authored catalogue: which sittings exist, plus their published statistics |
| `quiz/src/lib/pastExams.ts` | Pure read side: merges the catalogue with the question bank into `PastExamRow[]` |
| `quiz/src/components/PastExamBrowser.tsx` | The shelf UI |

### Rows come from the catalogue *and* the bank

`buildPastExamRows(questions, exam)` unions two sources:

- **The catalogue** (`PAST_EXAM_SITTINGS`) — every sitting that really happened, including
  the ones with no questions in the bank. These render greyed out and unselectable, marked
  "Not added yet". This is the point of the browser: a candidate sees the exam's real
  history rather than "whatever has been converted so far", and knows a paper is coming.
- **The question bank** — any `(year, session)` pair present in `questions/<exam-id>/*.md`
  for the exam. A newly converted paper therefore appears in the browser the moment its
  questions land, whether or not anyone remembered to add it to the catalogue.

Rows sort **newest first**, with Fall ahead of Spring within a year. Session strings in
frontmatter are inconsistent (`Spring`, `spring`, `Sp`), so `normalizeSession` folds them —
without it one sitting splits into two rows.

The first entry in the shelf is always **Mix**: the generated, syllabus-distributed mock
exam (`MOCK_EXAM_QUESTIONS` in `Landing.tsx`), which is what Mock Exam meant before there
was a browser. Selecting it is `selectedSitting === null`, exactly as before.

### Scope of the catalogue

Only sittings whose papers the examining body released publicly. CAS stopped publishing
full past papers when the upper-level exams moved to CBT, so the shelf ends at Spring 2019
(Exam 5) and Fall 2019 (MAS-I). Exam P and Exam FM have **no** sittings — the SOA publishes
a rolling sample-question set rather than dated papers — so their browser is the Mix row
alone, with the sample-questions PDF linked underneath.

## Pass-rate statistics

`PastExamStats` carries three optional figures per sitting: `candidates`, `passRate`, and
`effectivePassRate`. The browser leads with the **effective** ratio — the raw pass ratio
with candidates who scored under half the pass mark removed, i.e. the pass rate among
people who made a serious attempt — because that's the number a candidate is actually
comparing themselves against. It falls back to the raw ratio when only that is known.

**These are real-world figures, so they are only ever transcribed, never estimated.**
Fill them from the CAS "Summary of Exam Statistics" or an aggregator such as
[Actuarial Lookup](https://www.actuarial-lookup.com/exams/5):

```ts
{ exam: 'Exam 5', year: 2019, session: 'Spring', candidates: 1234, passRate: 42.0, effectivePassRate: 46.2 },
```

Until a sitting has a figure, the browser shows no statistics column at all
(`hasPublishedStats`) — a shelf of em-dashes reads as a broken readout — and the header
links out to the exam's lookup page (`PASS_RATE_LOOKUP`) instead. Add one figure and the
column appears for the whole shelf.

## What the selection drives

Selecting a sitting sets `selectedSitting` in `Landing.tsx`, which already fed everything
downstream and still does:

- `currentPool` filters the bank to that sitting, so the deck card's count and the shuffle
  draw from that paper only;
- `handleStart` passes `year` / `session` to `/quiz`, and the sitting's full question count
  as `count` (a past paper is sat whole, not sampled);
- the footer line under the shelf names the sitting and links its examiner's report
  (`data/examPdfLinks.ts`).
