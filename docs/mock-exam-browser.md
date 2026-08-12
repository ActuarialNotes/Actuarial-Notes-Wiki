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

**These are real-world figures, so they are only ever transcribed, never estimated.** They
arrive one of two ways — live from the publisher, or authored into the catalogue as a
floor.

Until a sitting has a figure from either source, the browser shows no statistics column at
all (`hasPublishedStats`) — a shelf of em-dashes reads as a broken readout — and the header
links out to the exam's lookup page (`PASS_RATE_LOOKUP`) instead. One figure lights the
column for the whole shelf.

### Live figures (`api/pass-rates.js`)

The examining bodies serve no CORS headers, so the browser cannot fetch these tables
itself — the request is blocked before it starts. The fetch therefore happens server-side:

```
PastExamBrowser ← Landing ← applyPassRates(rows, records)
                              ↑
              hooks/useExamPassRates → GET /api/pass-rates?exam=Exam%205
                                              ↓  (Vercel function)
                                        fetch(source) → extractPassRateRecords()
```

| Piece | Where |
|---|---|
| Fetch + cache headers + failure handling | `api/pass-rates.js` |
| Table parsing (pure, no network) | `api/lib/passRates.js` |
| Client cache, sanitising, overlay | `quiz/src/lib/passRates.ts` |
| The hook the builder calls | `quiz/src/hooks/useExamPassRates.ts` |

**Configuring a source.** Nothing is fetched until an operator sets `PASS_RATE_SOURCES` on
the Vercel project — a JSON object of exam → source, so the endpoint can be re-aimed at a
moved page without a redeploy:

```json
{ "Exam 5": { "url": "https://…/exam-statistics", "format": "html" } }
```

`format` is `html` (default), `csv`, `tsv` or `json`. Confirm the source permits automated
fetching before pointing at it; the fetcher identifies itself honestly in its User-Agent
and requests the page once per CDN cache window (six hours fresh, a week of
stale-while-revalidate), not once per user.

**Parsing is by column heading, not by selector.** `extractPassRateRecords` reads every
table on the page, matches headings (`DATE`/`SITTING`, `EXAMS TAKEN`, `PASS RATIO`,
`EFFECTIVE PASS RATIO`, …) and keeps the table that yields the most rows. Headings survive
redesigns that CSS selectors don't, and — importantly — a layout it doesn't recognise
returns **zero** records, so the app falls back rather than displaying garbage. Sitting
labels are normalized from both the seasonal (`Spring 2019`) and monthly (`Mar-2026`)
conventions; when a table gives counts but no percentage, the rate is derived from them.

**Failure is quiet on the client, loud on the server.** A source that's down, unconfigured,
or newly redesigned returns 502/empty from the endpoint; `useExamPassRates` swallows it and
leaves the authored figures in place. Nothing in the UI reports a fetch error — the figures
are a nicety beside the papers themselves. Responses (including "no source configured") are
cached in `localStorage` for a week, since ratios are republished twice a year.

**Authored figures** in `PAST_EXAM_SITTINGS` are the floor beneath all that — used when no
live record matches, and per-field, so a live source that publishes only the effective
ratio doesn't erase an authored raw one:

```ts
{ exam: 'Exam 5', year: 2019, session: 'Spring', candidates: 1234, passRate: 42.0, effectivePassRate: 46.2 },
```

**The effective ratio is a CAS measure.** The SOA publishes a raw pass rate only, so
`StatCell` labels each row by the figure it actually holds — an SOA row reads `PASS RATE`,
never `EFF. PASS`. Monthly SOA records match no row on the shelf (a testing window isn't a
paper anyone can sit) and `applyPassRates` drops them.

## What the selection drives

Selecting a sitting sets `selectedSitting` in `Landing.tsx`, which already fed everything
downstream and still does:

- `currentPool` filters the bank to that sitting, so the deck card's count and the shuffle
  draw from that paper only;
- `handleStart` passes `year` / `session` to `/quiz`, and the sitting's full question count
  as `count` (a past paper is sat whole, not sampled);
- the footer line under the shelf names the sitting and links its examiner's report
  (`data/examPdfLinks.ts`).
