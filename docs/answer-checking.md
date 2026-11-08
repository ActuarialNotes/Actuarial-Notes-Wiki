# Answer checking — a suggested grade for written parts

A written part of a CAS question is graded by the reader: Full credit, Partial or No credit,
against the sample answer and the examiner's report (`components/SelfGradeButtons.tsx`,
`components/GradePartsDialog.tsx`). This doc is the plan for helping them grade, and what is
built so far.

**The rule for all of it:** the app *suggests* a grade and says why; the reader gives it.
Nothing is chosen for them, nothing is written about their answer that isn't one of the
vault's own words or a sentence about two figures, and the app calls no model and holds no
key. The same rules as the Tutor's (`docs/tutor.md`) and the AI connector's (`docs/ai-connector.md`).

## The plan, in three layers

| Layer | What it checks | How | Status |
|---|---|---|---|
| **1. Numeric check** (L21) | A calculation part's final figure | Read numbers off two texts and compare them. No model | ✅ Built 2026-11-08 |
| **2. Checklist** (L14) | An essay part's points | The sample answer's own bullets and paragraphs as a checklist the reader ticks; the ticks suggest the grade (`docs/learning-review.md` §3.4). No model | ✅ Built 2026-11-08 |
| **3. On-device model** (optional) | Which checklist points the reader's text already covers | A small natural-language-inference model run in the browser (Transformers.js, tens of MB, lazy) pre-ticks layer 2's items. It ticks; it never writes | An idea. Only after layer 2, and only if it agrees with the readers' own ticks well enough to be worth the download |

Layer 3 is the only one with a model in it, and it only ever does layer 2's job faster. If it
is never built, layers 1 and 2 stand on their own.

Both built layers live in one chunk, `lib/answerChecks.ts`, which `hooks/useAnswerChecks.ts`
fetches the first time a written part is locked in: the quiz is on the first page's bundle, and
nothing reads the checks before an answer is confirmed. A part or question with no lettered
parts asks its question in the question's stem, so both checks are handed that stem when the
part's own is empty.

## Layer 1: the numeric check (`lib/numericCheck.ts`)

### What it compares

**The reader's final figure.** The last line of their response that has a number in it, read
after that line's last `=` or `≈` (`finalFigures`). Every number on that line is a candidate,
so `15000*1.1449*0.8191*1.2608 17735` and `17,735 using a 4.75-year trend` both find 17,735.

**The accepted figures**, from one of two places (`answerTargets`):

- **`answer`**: the part's own `### Answer` line, when it has one. 277 free-entry parts do;
  217 of them state the key in words ("Approximately \$17,735 (thousands)", "≈ 0.752",
  "**+6.92%**") that the exact-match check (`normalizeAnswerText`) can never match, so before
  this a reader who typed the right figure was always marked wrong and left to grade
  themselves. Each clause of the line gives the figures after its last `=`, `≈` or `:`
  (`keyFigures`), so an input on the way (the limit in "ILF(\$250,000) = 1.599") isn't taken
  for a result, and the alternatives the line names ("CAS prints +21.77% and +21.5%") are all
  accepted.
- **`sample`**: for an unkeyed written part that asks for a figure (`isCalculationPart`: a
  sentence of the stem says *calculate* or *compute*, or *estimate* or *determine* outside an
  *explain*/*describe* sentence), where each sample answer's working ends. Softer: a sample
  can end on an intermediate result, or list other accepted results above its last line.

Only a calculation part is read, so a number in an essay's sample answer is never taken for
its result. A key that is a table, or prose of more than 80 characters on a part that isn't a
calculation, is not read at all.

### Reading a number

`parseNumbers` reads markdown and LaTeX (`\$`, `15{,}000`, `15\,000`, `\%`, `\text{}`,
emphasis, the Unicode minus) and applies `%` (as a fraction) and scale words (`k`, thousand,
million, `bn`). It leaves out what names rather than counts: accident and calendar years (`AY
2012`), ages and periods (`36 months`, `12-24`), dates (`December 31`, `1/1/2020`), part,
policy and step numbers, list markers, `per $1,000`, the `000` of `($000)`, and a bare
four-digit year. A minus between two numbers is subtraction, not a sign.

### The verdict

The reader's figure is read against each accepted one in every sensible way: as written, as a
percentage written without its sign (6.92 for 6.92%), in thousands or millions, and with the
sign flipped. The nearest reading decides:

| Verdict | Relative error | Suggests | Says |
|---|---|---|---|
| `match` | ≤ 0.5% (`MATCH_TOLERANCE`) | Full credit | "Your final figure, 17,736, matches the answer, 17,735." (", in different units" when it took a scale) |
| `close` | ≤ 3% (`CLOSE_TOLERANCE`), or the right size with the wrong sign | Partial | "…is close to the answer, 6.92%. Check your rounding and your working against the sample answer." |
| `mismatch` against the `answer` | more | No credit | "…doesn't match the answer, 17,735. Examiners often give partial credit for correct steps, so compare your working with the sample answer." |
| `mismatch` against a `sample` | more | **nothing** | "…isn't where the sample answer ends (8,764.44). It may show other accepted results, so read it before you grade." |

A miss against a sample suggests no grade because the sample's last line is the weakest
evidence the check has. A miss against the key says No credit, but says in the same breath
that the examiners give credit for steps: the check reads only the final figure.

### Where it shows

The grade control, between its prompt and its buttons (`components/GradeSuggestion.tsx` as
`SelfGradeButtons`' `hint`), with the suggested button outlined, dashed, until the reader picks
one (`suggested`). On a keyed part, under its answer box (`FreeEntryInput` in
`QuestionCard.tsx`), whose red border is held back while the figures match; on a written part,
in place of the old keyword count, which says nothing useful about a number; and in the grading
popup Next opens (`GradePartsDialog`, its `responses` read by `partResponses` in
`lib/writtenAnswer.ts`).

### How it is held

- `numericCheck.test.ts`: the reader, the targets, the verdicts and the words, on figures from
  the bank.
- `numericCheckVault.test.ts`, over the whole bank: every figure the check reads as accepted must
  check as a match when typed back in (a part whose key, typed exactly, came out a miss would
  tell a right reader "No credit"), and coverage must not quietly fall: 196 of 277 keyed parts
  and 1,251 of 1,318 unkeyed calculation parts when written (2026-11-08).
- `e2e/quiz.spec.ts`, *suggested grade*: the suggestion on a keyed part and in the popup.

### Not yet

- A part asking for several figures (a triangle, three territories' relativities) is checked on
  its final line alone, which may hold one of them.
- The keyed part's "Correct answer:" line prints the key as plain text, so its markdown shows
  (`\$17,735`). Older than this work.

## Layer 2: the essay checklist (`lib/essayChecklist.ts`)

Students grade their own written answers too leniently, the weakest most of all, and grade
markedly more accurately against a checklist of the expected answer's points than against the
answer read whole (Rawson & Dunlosky 2007; `docs/learning-review.md` §3.4). So an essay part's
sample answer becomes its checklist, and the boxes sit on the examiners' own words.

### Cutting the points

`sampleChecklist` cuts one sample (each `Alternatively:` sample is its own, and so is each one
under a numbered heading — "Sample Answer 2", "Accepted Answer 2 — Closed / Reported Claim Counts",
its title kept as the sample's first line — `splitSampleAnswers`) where its text already breaks, and
changes nothing else:

- **A point** is a top-level bullet or numbered item (its marker dropped, its sub-bullets kept
  inside it) or a paragraph of prose.
- **Text around the points**: a heading (`#`, or a line set wholly in bold or italics), a lead-in
  ending in a colon ("Two likely consequences:"), a formula, table, image, callout or fence, and a
  paragraph that is a short label with no sentence in it ("ii. Reported Claims"). A bullet is never
  a label: "Stable case reserve adequacy" is a response.
- **The other accepted answers** ("Other acceptable factors include …", "Note that this list is not
  exhaustive, and other reasonable answers were accepted") get a box of their own that stands in
  for a point: an answer that made one of those instead has made a point, but it isn't one more
  point every answer needs.
- **A pool of responses.** A heading over candidates' responses — "Sample responses:", "Answers
  receiving full credit include:", "Sample Responses for \"Advantage\"", "Responses for Model 1" —
  makes the list under it a pool: each response earned the credit on its own, so one tick from the
  pool makes the point. The heading's own count wins ("Sample Answers (any two of which would earn
  full credit)", "needed three reasons for full credit"); a sample that is one uncounted pool takes
  the stem's ("List two …" needs two of its responses). Each heading is a pool of its own, so
  "Advantage" and "Disadvantage" need one each. A pool is the list under its heading: the next
  paragraph ends it.
- **A calculation set out in steps** (more than half its points are working: a figure after `=`,
  two numbers multiplied) makes no checklist; its points would be arithmetic.

### The examiner's report as the checklist

Where the report says what full credit needed, that list is the checklist instead of the sample's
(`reportRubric`): the examiners' own idea units, at the grain they marked, and the sample answer
reads as the worked example of meeting them. A list counts when the paragraph above it ends on a
lead-in to it — its last sentence, so commentary before it doesn't matter:

- **Every item needed**: "Candidates were expected to:", "In order to receive full credit a
  candidate needed to:", "To receive full credit, the candidate should have:", "To earn full
  credit candidates needed to clearly state three key pieces of information:". An item that is
  guidance on the list rather than a thing to do ("Responses could include …", "While responses
  could …", "Examples include …") stays as text.
- **Any so many**: "Any two of the following received full credit:", "Responses that received full
  credit for this subpart include:" — a pool, with the lead's count or the stem's. A report with one
  such list per category ("for the first of these categories …", "for the second …") has a pool for
  each.
- **Not a rubric**: a lead-in about what went wrong ("…typically made one of the following common
  errors:") and the *Common mistakes* lists, which are not points to tick.

A rubric needs two or more boxes. It is rare: 46 essay parts have one (2026-11-08), most reports
saying what candidates were expected to *know* in a sentence rather than listing it.

A part has a checklist (`partChecklist`) when it is unkeyed, not a calculation (those have the
numeric check), and its report has a rubric or some sample has two or more boxes — one box beside
a one-paragraph answer is the sample again.

### How many points are needed

Every point of the sample — a pool counting as its need — or of the rubric, unless the stem names
fewer (`askedFor`): "List **two** likely
consequences", "Briefly describe **the four** criteria", "Briefly describe **a** scenario", "describe
**one** advantage **and one** disadvantage", "assess it **using two** social criteria". Every count
the stem names is added up. "A"/"an" counts only straight after an asking verb, so "using a
Berquist-Sherman adjustment" names a method, not a count.

### The suggestion

`checklistSuggestion` reads the ticks against the rubric when there is one, else against the sample
the answer covers most of (an answer that followed sample 2 is marked against sample 2): every point
needed is Full credit, some is Partial. A pool is credited no more than it needs, so two ticks in
"Advantage" and none in "Disadvantage" is one point of two. Nothing is suggested before a box is ticked, and it never suggests No credit: an answer
that makes none of the points has nothing to tick, and the reader says so with the buttons. The
words are `checklistMessage`: "You ticked 1 of the 2 points in the sample answer.", "… of the 2
points the question asks for, from sample 2.", or "… of the 3 points the examiner's report asks
for."

### Where it shows

The sample answer card (`SampleAnswerCards` in `components/AnswerReference.tsx`, its `checklist`
prop) draws each sample through `components/SampleChecklist.tsx`: a box (`role="checkbox"`, the
app's `CheckMark` when ticked) beside each point, "Tick each point your answer makes." under the
heading. With a rubric, the boxes are in the Examiner's report card instead (`ExaminerReportCard`,
its `rubric` prop), its ticks kept under `RUBRIC` (`lib/checklistKeys.ts`, a module of its own so the
quiz card can name it without pulling the checklist into the first page's bundle), and the sample
answer reads plain. The suggestion and the outlined button are the grade control's, as layer 1's. The ticks
are `stores/checklistStore.ts`, by question and part, so the grading popup Next opens reads them
too; a part open for answering again starts with none, and nothing is saved. A part with a
checklist no longer shows the old keyword count (`estimateEssayScore`).

### How it is held

- `essayChecklist.test.ts`: the cut, the counts, the suggestion and the words.
- `essayChecklistVault.test.ts`, over the whole bank: **every word of every sample answer, and of
  every report whose rubric is the checklist, is still there, and none added**, read back off the
  blocks (list markers aside) — the cut is never a rewrite. And coverage: 1,503 of 2,190 essay parts
  have a checklist (2026-11-08), 136 of them with a pool and 46 with a rubric; most of the rest are
  one-paragraph samples.
- `e2e/quiz.spec.ts`, *essay checklist* (ticks, the suggestion moving with them, the stand-in box,
  the popup) and *examiner rubric* (the boxes in the report, none on the sample).

### Not yet

- A pool is found by its heading. Responses listed with no heading saying so are read as points
  all needed; a converter that marks them would make the pool certain.
- A report that says what candidates were expected to know in a sentence, not a list, has no
  rubric; its sentence isn't cut into points.
- One-paragraph samples (just under a third of essay parts) get no checklist.

## Both layers: not yet

- **No measure of agreement with readers' own grades.** The bank says what the accepted answers
  are, not what readers write. The grade a reader gives beside the one suggested is the measure,
  and nothing records it yet. That record is also what would decide whether layer 3 is worth
  building.
- The Tutor's practice card (`components/tutor/TutorPractice.tsx`) and the mistakes review draw
  their own grade controls and don't show either suggestion.
