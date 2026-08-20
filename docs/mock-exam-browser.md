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

**Except questions the syllabus moved.** A question re-tagged onto this exam from another
one carries `originally_exam` in its frontmatter and keeps the `year`/`session` of the paper
it was really sat on — so its date names a sitting of the *other* exam.
`isFromAnotherExamsPaper` (in `lib/parser.ts`) skips those, in the row builder and in the
`filterQuestions` sitting filter alike. Without it the bank half of the union invents papers:
the CAS moved Time Series, Statistical Learning and PCA from MAS-I to MAS-II, and the 23
re-tagged MAS-I 2018 questions would otherwise raise an **MAS-II Spring 2018** row — a
sitting half a year before MAS-II first existed — and pad the real **MAS-II Fall 2018** paper
with 11 questions nobody sat on it. The questions themselves are untouched and still reachable
by topic; they simply never claim to be a paper.

Rows sort **newest first**, with Fall ahead of Spring within a year. Session strings in
frontmatter are inconsistent (`Spring`, `spring`, `Sp`), so `normalizeSession` folds them —
without it one sitting splits into two rows.

The first entry in the shelf is always **Mix**: the generated, syllabus-distributed mock
exam (`MOCK_EXAM_QUESTIONS` in `Landing.tsx`), which is what Mock Exam meant before there
was a browser. Selecting it is `selectedSitting === null`, exactly as before.

### Scope of the catalogue

Only sittings whose papers the examining body released publicly. CAS stopped publishing past
papers, answer keys and examiners' reports when the exams moved to CBT, so the shelf ends at
**Fall 2019** for Exam 5, MAS-I and MAS-II alike. It starts where each exam does: Exam 5 at
Spring 2011, MAS-I at Spring 2018, and MAS-II at **Fall 2018** — MAS-II was introduced half a
sitting behind MAS-I, so it has three released papers, not four. Exam P and Exam FM have
**no** sittings — the SOA publishes a rolling sample-question set rather than dated papers —
so their browser is the Mix row alone, with the sample-questions PDF linked underneath.

A sitting is transcribed from the examining body's list, never inferred from what the bank
happens to hold — the same rule the pass ratios below follow, and for the same reason: a row
is a claim that a paper exists and can be sat.

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
- the header row above the shelf offers that sitting's examiner's report as a PDF download
  (`data/examPdfLinks.ts`), beside the pass-rate lookup link.

### The header row

Two out-links sit above the shelf, both sized as real controls rather than fine print —
on a phone they are sandwiched between the tab strip and the sitting rows, so a `text-xs`
link is a miss waiting to happen:

| Link | What it is | Shown when |
|---|---|---|
| Examiner's report | The selected sitting's paper, opened in the in-app PDF viewer (icon + `PDF` tag) | `getSittingPdfLink` has that sitting — or, for an exam with no dated papers at all, `getExamPdfLink` has the exam-level sample-question PDF |
| Pass rates | The exam's lookup page (`PASS_RATE_LOOKUP`) | The exam has a lookup entry |

Either can be absent; the row itself disappears only when both are. The report link tracks
the *selection*, so it appears, changes and vanishes as you move down the shelf — a sitting
whose report isn't in `SITTING_PDF_LINKS` shows no button rather than a dead one.

## Reading the paper (`PdfViewerPanel`)

Tapping the report opens it **in the app**, in the concept popup's shell: the same slide-up
bottom panel, the same drag handle and shared preferred height (`useSplitHeight`), the same
focus-mode expand, the same Previous / position / Next footer — with pages where the popup
has concepts. Reading what the examiners said about question 7 shouldn't cost you the quiz
you were building.

| Piece | Role |
|---|---|
| `quiz/src/components/PdfViewerPanel.tsx` | The panel: header (title, download, expand, close), canvas, paging + zoom footer |
| `quiz/src/hooks/usePdfDocument.ts` | Loads one document; imports pdf.js on demand and destroys the loading task on close |
| `quiz/src/lib/pdfjsSetup.ts` | The pdf.js instance, its worker and the Standard 14 font URL — reached only through a dynamic import |
| `quiz/src/lib/pdfViewer.ts` | Fit-to-width, the canvas pixel budget, the zoom ladder, page clamping (pure) |
| `quiz/src/lib/examPdf.ts` | Which sources are viewable, and the endpoint URLs |
| `api/exam-pdf.js` | Serves the publisher's PDF from our own origin |

**Why the app draws the pages itself.** The obvious implementation — `<iframe src={pdf}>` —
depends on the browser having a PDF viewer, and Chrome on Android has none (nor do the
headless browsers this repo's e2e suite runs: they report `navigator.pdfViewerEnabled ===
false`). An embedded PDF is a blank rectangle there, and no event fires to say so. pdf.js
renders identically everywhere, and makes the panel's controls ours rather than a plugin's.

Two consequences worth remembering:

- It is the **legacy** pdfjs-dist build. The modern one calls
  `Map.prototype.getOrInsertComputed`, which only the newest browsers ship — everything else
  throws on the first render.
- The **Standard 14 fonts** ship with it. A PDF that names Helvetica/Times without embedding
  it — routine for anything produced from Word, which is most of what CAS publishes —
  renders blank text without them. `pdfStandardFontsPlugin` in `vite.config.ts` copies them
  out of `node_modules` to `/pdf-standard-fonts/`.

**Why the bytes come through `api/exam-pdf.js`.** The publishers send no CORS headers, so the
page cannot read the file itself (the same reason `api/pass-rates.js` exists), and
`<a download>` is ignored cross-origin, so "Download" would navigate away instead of saving.
The endpoint re-serves the file from our origin with `Content-Disposition` chosen by the
caller (`?download=1` for a save), and caches it hard at the edge — a past paper never
changes. Because it takes a URL from the client it is **allowlisted to the examining bodies'
hosts** and to `.pdf` paths over https, re-checked after redirects, and it refuses a response
that isn't really a PDF (publishers answer 200 with an HTML "not found" page often enough
that this would otherwise render as an empty panel). Set `EXAM_PDF_HOSTS` to re-aim the
allowlist without a redeploy.

Every failure path ends in the same place: the panel says so in a sentence and offers the
publisher's own copy, which is the only action any of them leaves.

### The link table (`data/examPdfLinks.ts`)

A URL in that table is **transcribed from the publisher, never constructed**. The CAS
filenames look regular and are not — Spring 2019 is `admissions_studytools_exam5_sp19-5.pdf`,
Spring 2015 is `sp15-5_0.pdf`, Spring 2018 is `sp18-5_examiners_report.pdf`, and Spring 2012
still sits under `/old/` — so extrapolating the pattern is precisely how the table filled up
with 404s. A sitting whose PDF hasn't been located is **absent**, and the button simply
doesn't render.

The gaps are researched, not forgotten: CAS began publishing Examiner's Reports with the
**May 2012** sitting (2011 has none), stopped when testing moved to CBT in **Fall 2020**, and
MAS-II was first sat in **Fall 2018**. Fall 2012 Exam 5 has not been located. What's
published also differs by exam — Exams 5–9 are written papers with an Examiner's Report,
while the MAS exams are multiple choice and come with a final answer key — so the button's
label follows the document (`Examiner's Report` vs `Exam & Answer Key`), not the button.
