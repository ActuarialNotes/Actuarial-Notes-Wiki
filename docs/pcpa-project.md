# The PCPA project simulator

PCPA — Property & Casualty Predictive Analytics — is two parts: a computer-based exam, and a
**project**. The project is the part no question bank can practise: the CAS opens a 16-day
window, hands the candidate a business problem, one or two data sets, scope parameters and
submission guidelines, and the candidate builds a GLM in R, Python or SAS and submits a
technical report of at most 1,250 words (appendices included), up to five tables or graphics,
their code, answers to questions about their analysis, and an attestation. It is human-scored
pass/fail against a published rubric, six to eight weeks later.

The simulator at `/project/pcpa` reproduces that whole loop in the browser, entered from the
**Project** button on the PCPA study guide's header (`components/wiki/ExamProjectButton.tsx`).

```
Portal ──► Brief ──► Workspace ──► Report ──► Submit ──► Results
(agreement)  (materials)  (R · Python · sheet)  (≤1,250 words)  (questions · attestation · clean run)  (assessment data · rubric · examiner's notes)
```

## Sources

Everything the CAS publishes about the project is **transcribed** into
`quiz/src/data/pcpaProjects.ts` with its source named, never paraphrased into new rules:

- **PCPA Content Outline v.8** (effective September 2026) — the four windows a year, what the
  portal hands out, the 1,250-word and five-appendix limits, the Performance Evaluation
  Criteria (`RUBRIC`), the domain weights for the project (30 / 30 / 40), the attestation and AI
  use policy, and the graders' security practices (questions at submission, running the code).
- **PCPA Post-Project Summary** (Winter 2026) — the common mistakes (`COMMON_MISTAKES`), which
  drive the report checks.
- **PCPA FAQ** — the 20-hour effort estimate, the two-week window.

Change any of those only against a newer edition of the document.

The **cases** are invented and say so: fictional insurers, fictional stakeholders, data drawn by
a generator. Each is written to the outline's framework — a memo stating the business problem,
notes from stakeholders to weigh for relevance (Task A-1: some are red herrings), scope
parameters, a data dictionary, point-of-submission questions and the examiner's
"what a passing report does".

| Case | Line | Target | What it exercises |
|---|---|---|---|
| `bop-frequency` | Small commercial BOP | claim count, exposure offset | joining a claims file to a policy file; NAICS codes too thin to fit (the post-project summary's own example); Poisson vs negative binomial; a variable decided after the term |
| `auto-severity` | Personal auto collision | gross loss per claim | decimal-shift errors vs real large losses; total losses capped at ACV; exact aliasing (model year = accident year − vehicle age); gamma vs inverse Gaussian; post-accident variables |
| `ho-water` | Homeowners non-weather water | pure premium | Tweedie and its power; heavy tails and capping; a non-linear age curve; collinear size measures; a specific business question (a shut-off device discount) |

An attempt is **assigned** a case (`drawCase` prefers one the candidate hasn't done), as the
CAS assigns "a specific project selected from a pool".

## The data — `lib/pcpaData.ts`

Every attempt draws its own sample from a seed, so a second attempt is new data. Each case is
generated from an explicit model — GLM-shaped effects plus the frictions real data has (a
latent risk multiplier that prior claims partly reveal, total losses settling at ACV, a Pareto
large-loss tail) — and then **made dirty on purpose**: duplicates, placeholder codes, invalid
exposures, impossible ages, blanks that are more likely for some risks than others, leaking
and spurious variables. Every planted problem is **counted** (`GeneratedCase.issues`), and
`pcpaData.test.ts` checks the counts against the tables, so the examiner's notes can tell a
candidate exactly what was there to find.

Because the truth is known, `generateAssessment` draws fresh rows from the same model — with
missing values, without errors — plus each row's simulated outcome and its **true expectation**.
After submission the candidate scores those rows with their model and gets a Gini and a lift
chart beside the true model's, which is the ceiling no model can pass on that sample. That is
the rubric's "performs reasonably well on an assessment data set", made measurable.

The generator was checked by fitting the planted structure back out with statsmodels: Poisson
dispersion near 1 for the BOP case (so the notes say the Poisson/NB choice is about evidence,
not a foregone conclusion), gamma beating inverse Gaussian for auto, holdout Ginis close to the
true model's.

## The workspace — no new runtimes

Nothing is interpreted by the app. Both languages are their official WebAssembly builds, loaded
from their own CDNs at a pinned version (`lib/project/runtimeVersions.ts`) the first time a
candidate runs code:

- **R** — [webR](https://docs.r-wasm.org/webr/) (`lib/project/rRuntime.ts`). Base `glm()` covers
  every family the project needs; `library(x)` for a missing package installs its Wasm build
  first. Code runs as `source(file, echo = TRUE)`, RStudio's *Source with Echo*, and plots are
  captured from webR's canvas device.
- **Python** — [Pyodide](https://pyodide.org) in a module worker (`lib/project/pythonWorker.ts`)
  with numpy, pandas, statsmodels, scipy, scikit-learn and matplotlib; an import Pyodide doesn't
  ship is fetched from PyPI with micropip. `plt.show()` and figures left open at the end of a run
  land in the Plots pane, as in a notebook.
- **Spreadsheet** — [Fortune-sheet](https://github.com/ruilisi/fortune-sheet) (MIT), an
  Excel-style grid with a formula engine (`components/project/SpreadsheetEditor.tsx`, its own
  lazy chunk). Workbooks are `.sheet` files in a compact format (`lib/project/sheetFile.ts`);
  a sheet exports to `output/` as CSV (appendix-ready) or downloads as `.xlsx` through the
  existing `lib/xlsx.ts` writer.
- **Editor** — CodeMirror 6 with RStudio's keys: Ctrl/⌘+Enter runs the line or selection and
  steps down, Ctrl/⌘+Shift+Enter runs the file.

Neither runtime can be interrupted without cross-origin isolation (the app has none, on
purpose), so **Stop** restarts the session: variables go, files stay.

### One project folder

`hooks/usePcpaWorkspace.ts` holds the attempt's files — persisted to IndexedDB
(`lib/project/fileStore.ts`) because a workspace is megabytes — and `hooks/useProjectRuntime.ts`
keeps each runtime's file system the same as it, mounted at `/project` in both so relative
paths agree:

- **before a run**, every file the runtime hasn't seen at its current version is written in;
- **after a run**, every file the runtime created or changed is read back — so
  `png("output/lift.png")` or `plt.savefig(...)` appears in the file tree, persists, and can be
  attached to the report. A second-granular clock can't tell two writes in one second apart, so
  anything touched since the run began is compared by content.

The data sets are the CAS's: **read-only**. A run that overwrites one is told so and the original
is restored before the next run.

The attempt's *record* — report, answers, ratings, timings — is small and lives in localStorage
(`hooks/usePcpaAttempts.ts`), like Cowork's stores. Nothing is synced to Supabase: an attempt is
practice on the device it was made on.

## Submission and grading

- **Words** (`lib/pcpaReport.ts`) are counted the way a word processor counts them, body plus
  every appendix caption plus every cell of an appendix table. Over 1,250, or more than five
  appendices, is an automatic fail on the real project, so the Submit button stays disabled.
- **Clean run** (`cleanRun`) — "graders may run the code submitted with the project to evaluate
  whether it produces the outputs included in the summary report". A fresh runtime with only the
  data and the selected scripts runs them in order and reports which appendices it rebuilt.
- **Questions at submission** are cross-checked against the report after submission: a number
  the candidate gave should be a number the report contains (`crossCheckAnswers`).
- **Results** (`components/project/ResultsView.tsx`): the assessment data, the cross-check, the
  report checks against the post-project summary's common mistakes, the rubric with the
  evidence beside each criterion for the candidate to rate themselves, and the examiner's notes
  (planted issues with counts, the true effects, a passing report's shape). The CAS publishes no
  pass mark; the simulator's rule of thumb — 70% weighted, no domain under half — is labelled
  as its own.

On submission the code is snapshotted to `submission/` (read-only) and the report locks. A
window that closes unsubmitted can't be submitted, as on the real project.

## Where things are

| | |
|---|---|
| Authored material & published rules | `quiz/src/data/pcpaProjects.ts` |
| Data generator | `quiz/src/lib/pcpaData.ts` |
| Attempts, windows, paths | `quiz/src/lib/pcpaAttempt.ts` |
| Words, form rules, report checks | `quiz/src/lib/pcpaReport.ts` |
| Gini, lift, cross-check, rubric score | `quiz/src/lib/pcpaAssessment.ts` |
| CSV in/out | `quiz/src/lib/csv.ts` |
| Runtimes, file store, sheet files | `quiz/src/lib/project/` |
| Stores | `quiz/src/hooks/usePcpaAttempts.ts`, `usePcpaWorkspace.ts`, `useProjectRuntime.ts` |
| UI | `quiz/src/components/project/`, `quiz/src/pages/Project/` |
| E2E | `quiz/e2e/pcpa-project.spec.ts` (stops short of running code — the runtimes come from CDNs) |

To add a case: its material to `PROJECT_CASES`, a generator and an assessment draw to
`pcpaData.ts` (`CaseId`, `generateCase`, `generateAssessment`), and its checks to `CASE_CHECKS`
in `pcpaReport.ts`. The tests hold the dictionary and the generated columns together.
