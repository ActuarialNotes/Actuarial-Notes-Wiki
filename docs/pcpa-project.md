# The PCPA project simulator

PCPA — Property & Casualty Predictive Analytics — is two parts: a computer-based exam, and a
**project**. The project is the part no question bank can practise: the CAS opens a 16-day
window, hands the candidate a business problem, one or two data sets, scope parameters and
submission guidelines, and the candidate builds a GLM in R, Python or SAS and submits a
technical report of at most 1,250 words (appendices included), up to five tables or graphics,
their code, answers to questions about their analysis, and an attestation. It is human-scored
pass/fail against a published rubric, six to eight weeks later.

The simulator reproduces that whole loop in the browser. It lives on the **Projects** tab
(`/project`), a tab of its own in the sidebar after Quiz — a project is its own kind of study,
a brief and a data set and a deadline rather than a bank of questions. The PCPA study guide's
**Project** button (`components/wiki/ExamProjectButton.tsx`) leads there too.

```
Projects tab ──► + ──► Start sheet ──► Brief ──► Workspace ──► Report ──► Submit ──► Results
(your attempts)  (pick a brief · mode · language · data)  (materials)  (R · Python · sheet)  (≤1,250 words)  (questions · attestation · clean run)  (assessment data · rubric · examiner's notes)
```

## The Projects tab and the start sheet

`pages/Project/ProjectsHome.tsx` is the candidate's own work: the attempts still open
(**Continue**), then the submitted ones, whose results are kept. The catalogue is not on the
page. A **+** in the title row (and, before there is any attempt, a dashed *Start a project*
card in its place) opens the start sheet, `components/project/NewProjectDialog.tsx` — one
dialog, two steps, so Back is a step and not a second scrim.

The first step lists every brief, grouped by the exam it is a project for. The groups come
from `data/projects.ts` (`PROJECT_PROGRAMMES`): an exam's key, its published rules as a row of
facts, where they come from, the next real window, and its briefs. PCPA is the only programme
yet; another exam's project is an entry there with its briefs authored the way
`data/pcpaProjects.ts` authors PCPA's. **Each group wears its exam's colour** —
`examAccentStyle(programme.examKey)` scopes the group, so the exam logo, the brief tiles
(`components/project/BriefTile.tsx`, the line-of-business icon on an `--exam-accent-vivid`
fill) and the hover wash are all that exam's hue. PCPA's hue sits halfway between Exam 5's and
Exam 6's (`BETWEEN_RUNGS` in `lib/examColors.ts`, `docs/style-guide.md` §2.3). The same tile
leads each attempt's row on the page.

**A brief is chosen, not assigned.** The real project hands each candidate one case from a
pool, but someone practising for it wants the case that exercises what they are weak at.
Choosing one moves the sheet to its second step, which asks only what changes the attempt:

- **How to work it** (`AttemptMode` in `lib/pcpaAttempt.ts`). A **rehearsal** is the real
  conditions: the 16-day window opens at once and closes at the end of its last day, and
  feedback waits for submission. **Practice** has no deadline, and the report is checked as it
  is written — the Report view's toolbar carries the count of `reviewReport` checks found and
  opens the list. The deadline follows from the mode and is never a question of its own.
  Attempts saved before modes existed carry `timing` instead; `savedMode` reads a timed one
  as a rehearsal and an untimed one as practice.
- **The language**, which writes the starter script. Both languages run in the workspace
  either way.
- **The data**, only for a brief attempted before: a new draw, or the same seed as the last
  attempt, to redo the analysis on the same sample and compare.

The candidate attestation is made once, at submission, as on the real project.

## An attempt's views

An attempt is one page, `pages/Project/ProjectAttempt.tsx`, with four views chosen by its
`view` search parameter: **Brief**, **Workspace**, **Report** and **Submit** — **Results** in
Submit's place once the attempt is submitted. Two surfaces list them: the switcher in the
attempt's top bar, and rows under **Projects** in the sidebar while the attempt is open (in
line under the flask on the collapsed rail). Both read `lib/attemptViews.ts` — which views an
attempt offers, which one a `?view=` opens, their names and icons — so they can't disagree.
Switching views replaces the history entry either way: the views are windows of one project,
not pages of it.

The sidebar is in the main bundle and the attempt isn't, so the sidebar doesn't read the
attempts store (that would bring the authored briefs into every page's first load). The page
publishes its views and the one showing to `hooks/useAttemptNav.ts` and clears them when it
closes; `lib/attemptViews.ts` imports nothing from `lib/pcpaAttempt.ts` but a type, and holds
`attemptRoute` for the same reason.

## The brief

`components/project/BriefView.tsx` is the project portal's materials — the memo, the
stakeholder notes, the scope, the data sets and their dictionaries, what to submit, the
attestation. A candidate comes back to it many times, each time for one part, so it is laid out
for finding rather than for reading straight through:

- **Every section starts folded**, as a card that names it and says in one line what is
  inside (whom the memo is from, how many notes, which files). The card's header is the
  button; the heading wraps it, so the section names stay headings.
- **An outline** beside the brief — a row of chips pinned above it below `lg` — lists the
  sections and marks the one being read (`aria-current="location"`), following the scroll.
  `lib/scrollSpy.ts` decides which that is (the last section whose top has passed a line near
  the top of the pane, or the last section once a scrolling pane reaches its end). Choosing a
  section opens it and brings it into view; *Expand all* / *Collapse all* sits under it.
- Which sections are open is remembered per attempt for the session, so going to the
  workspace and back leaves the brief as it was.

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

The real project assigns "a specific project selected from a pool"; here the candidate picks
the brief (see above).

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

## Where an attempt is kept

The attempt's *record* — report, answers, ratings, timings — is small and lives in localStorage
(`hooks/usePcpaAttempts.ts`); its files live in IndexedDB. Both are written first, always, so
the workspace never waits on the network.

**Signed in, an attempt is also kept with the account**, and opens on any device the
candidate signs in on. `lib/project/projectSync.ts` is the client half; the tables are
`user_project_attempts` (one row per attempt, the record as JSON) and `user_project_files`
(one row per file, text as text and anything else as base64), in
`supabase/migrations/20260927_project_sync.sql`.

- **Last writer wins, row by row.** Each attempt and each file carries an `updatedAt`, and the
  later copy is kept, whichever side it is on. A deletion is a row too — a tombstone — so a
  file or attempt deleted on one device goes from the next one, rather than being put back by
  its older copy. The merges are pure and tested (`planAttemptSync`, `planFileSync`).
- **Writes** are queued by the stores on every change and sent debounced and coalesced (a
  keystroke is a local write; a pause is a remote one), and when the tab is hidden or closed.
- **Reads**: `hooks/useProjectSync.ts`, mounted by the tab itself (`pages/Project/index.tsx`),
  folds the account's attempts in on arrival and whenever the tab comes back into view; the
  workspace takes in an attempt's files when it opens it. A link straight to an attempt made
  on another device waits for the account before deciding there is no such attempt.
- **The data sets never leave the browser**: they are a function of the seed, so a new device
  draws them again, and they are the CAS's. The starter script is seeded only into a workspace
  that has never held a file, here or in the account, and every seeded file is dated to the
  attempt's start so any real edit is newer than it.
- **Ownership.** An attempt records the account it belongs to (`owner`). Signed in, a reader
  sees their account's attempts and any started signed out in this browser — which signing in
  takes into the account, files and all. Signed out, they see only the latter: an account's
  attempts stay with the account rather than being left to whoever uses the browser next.
  `visibleTo` in `lib/pcpaAttempt.ts` is the rule.
- A file past 2,000,000 characters in its stored form stays in the browser that made it.

**Signed out**, attempts are this browser's alone, and the Projects page says so — not
permanent, gone with the site data, not on another device — with the way to sign in and keep
them.

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
rehearsal whose window closes unsubmitted can't be submitted, as on the real project.

## Where things are

| | |
|---|---|
| The Projects tab's catalogue | `quiz/src/data/projects.ts` |
| Authored material & published rules | `quiz/src/data/pcpaProjects.ts` |
| Data generator | `quiz/src/lib/pcpaData.ts` |
| Attempts, modes, windows, paths, who sees what | `quiz/src/lib/pcpaAttempt.ts` |
| An attempt's views (top-bar switcher, sidebar rows) | `quiz/src/lib/attemptViews.ts`, `quiz/src/hooks/useAttemptNav.ts` |
| Keeping attempts with the account | `quiz/src/lib/project/projectSync.ts`, `quiz/src/hooks/useProjectSync.ts`, `supabase/migrations/20260927_project_sync.sql` |
| The brief's outline | `quiz/src/lib/scrollSpy.ts` |
| Words, form rules, report checks | `quiz/src/lib/pcpaReport.ts` |
| Gini, lift, cross-check, rubric score | `quiz/src/lib/pcpaAssessment.ts` |
| CSV in/out | `quiz/src/lib/csv.ts` |
| Runtimes, file store, sheet files | `quiz/src/lib/project/` |
| Stores | `quiz/src/hooks/usePcpaAttempts.ts`, `usePcpaWorkspace.ts`, `useProjectRuntime.ts` |
| UI | `quiz/src/components/project/`, `quiz/src/pages/Project/` |
| E2E | `quiz/e2e/pcpa-project.spec.ts` (signed out; stops short of running code — the runtimes come from CDNs) |

To add a case: its material to `PROJECT_CASES`, a generator and an assessment draw to
`pcpaData.ts` (`CaseId`, `generateCase`, `generateAssessment`), and its checks to `CASE_CHECKS`
in `pcpaReport.ts`, and a tile icon to `components/project/BriefTile.tsx`. The tests hold the
dictionary and the generated columns together.
