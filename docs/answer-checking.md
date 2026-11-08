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
| **1. Numeric check** | A calculation part's final figure | Read numbers off two texts and compare them. No model | ✅ Built (this doc) |
| **2. Checklist** (roadmap L14) | An essay part's points | The sample answer's own lines and bullets as a checklist the reader ticks; the ticks suggest the grade (`docs/learning-review.md` §3.4). No model | Proposed |
| **3. On-device model** (optional) | Which checklist points the reader's text already covers | A small natural-language-inference model run in the browser (Transformers.js, tens of MB, lazy) pre-ticks layer 2's items. It ticks; it never writes | An idea. Only after layer 2, and only if it agrees with the readers' own ticks well enough to be worth the download |

Layer 3 is the only one with a model in it, and it only ever does layer 2's job faster. If it
is never built, layers 1 and 2 stand on their own.

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
  tell a right reader "No credit"), and coverage must not quietly fall: 192 of 277 keyed parts
  and 1,109 of 1,174 unkeyed calculation parts when written (2026-11-08).
- `e2e/quiz.spec.ts`, *suggested grade*: the suggestion on a keyed part and in the popup.

### Not yet

- **No measure of agreement with readers' own grades.** The bank says what the accepted figures
  are, not what readers write. Once suggestions are live, the grade a reader gives beside the
  one suggested is the measure; nothing records it yet.
- A part asking for several figures (a triangle, three territories' relativities) is checked on
  its final line alone, which may hold one of them.
- The keyed part's "Correct answer:" line prints the key as plain text, so its markdown shows
  (`\$17,735`). Older than this work.
- The Tutor's practice card (`components/tutor/TutorPractice.tsx`) and the mistakes review draw
  their own grade controls and don't show the suggestion.
