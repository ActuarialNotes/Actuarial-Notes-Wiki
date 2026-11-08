# Open in Spreadsheet

A question from an exam sat with a spreadsheet can be worked in one, beside the question, under
the exam day's rules or not, as the reader chooses. The cell they select drops into their answer
with **Insert**.

The CAS sits Exams MAS-I, MAS-II and 5–9 in Pearson VUE's test driver, whose spreadsheet is part
of the exam: "candidates can expect to see this spreadsheet on all CAS exams at Pearson VUE test
centers", and for Exams 5–9 some answers are typed into it and "the entire spreadsheet, including
all formulas used, will be sent to the graders" (CAS, *Candidate Know Before You Go*). Practising
in that environment is part of preparing for the exam.

## What the reader sees

- **The Spreadsheet button** in the question bar, beside Flag and Info. It shows only for a question
  whose exam has a spreadsheet profile (below). It is solid while the sheet is open, and the sheet
  stays open from question to question until it is closed.
- **Docked, by default.** On a wide screen the sheet takes the right of the window and the question
  moves out from under it (`html[data-question-sheet='docked'] .question-sheet-host` in
  `index.css`). The left edge drags to resize. On a narrow screen it is a sheet up from the bottom,
  its top edge the handle. Sizes are remembered in localStorage.
- **Pop out.** On a wide screen the header's pop-out button lifts the sheet into a window of its own,
  over the question, moved by its title bar and sized by its corner, kept on screen
  (`clampWindowRect`). The window's place is remembered. Its dock button puts it back. A phone only
  docks.
- **The question's tables, already in.** Every markdown table in the stem and the parts is laid down
  column A under its caption (the bold line the bank writes above it), a blank row between tables,
  numbers as numbers in the format they were printed in: `\$1,709,000` is 1709000 shown as
  `$1,709,000` (`questionWorkbook` in `lib/questionSheet.ts`). The cells are read off the question
  mechanically, so nothing is retyped. A question with no table opens a blank sheet. **Reset** puts
  the question's tables back after a confirm, as the test driver's Reset does. **Download** saves
  the sheet as `.xlsx`.
- **One worksheet.** The test driver's spreadsheet "is not a workbook… a single worksheet per
  instance" (Pearson VUE), so there are no sheet tabs.
- **Insert.** Under a written part's response box, and under a short-answer box, an **Insert H3 ·
  88** button appears while the sheet is open on that question and a cell holding something is
  selected. It puts the cell's displayed value in at the caret (`insertAtCaret`), spaced off a word
  before it. The spreadsheet is never embedded in the answer; this button is the only link between
  them.
- **The working is kept** with the quiz session (`quizStore.sheets`, keyed by question), so leaving
  `/quiz` to look something up and coming back keeps it. Quitting the quiz discards it with the rest
  of the session. It is not graded and not saved to the account.

## Exam-day rules: Off, Warn, Enforce

The pill in the sheet's header picks how closely the sheet keeps to the exam's spreadsheet:

| Rules | What happens |
|---|---|
| **Off** | The full spreadsheet. Nothing is checked. |
| **Warn** | Everything works. A formula calling a function that isn't on the exam's list is pointed out in the footer ("G2 uses FORECAST.LINEAR, which Pearson VUE doesn't have"), with **Show** stepping through such cells. |
| **Enforce** | Such a formula is refused before it is entered, with a note saying which function. Function keys F1–F10 do nothing ("function keys such as F2, F4, etc. do not operate in the Pearson VUE environment"). |

The choice is remembered per mode, like when the answers show (`lib/revealMode.ts`), and the
defaults split the same way (`DEFAULT_SHEET_RULES` in `lib/sheetRules.ts`): **Warn** for a quiz,
which is practice, and **Enforce** for a practice exam, which is the rehearsal.

What Enforce doesn't do: it doesn't reproduce the test driver's own quirks. CAS warns that "common
differences include unexpected results from using the MIN function with empty cells, incorrect
anchored references, and array sums with incorrect rows or columns", and that "typing in a formula
incorrectly will result in a blank cell". The grid is Fortune-sheet, so a function on Pearson VUE's
list that Fortune-sheet doesn't implement shows `#NAME?` here and works there. The rules decide what
is *allowed*; they don't emulate how it is *computed*.

## The profiles: which exams, and what their rules rest on

`quiz/src/data/examSpreadsheets.ts` lists each test driver's spreadsheet, the exams sat with it (by
progress key) and the facts its rules rest on, each with its source page and the date it was read.
An exam not listed gets no button. The design is general on purpose: to add an exam sat with a
spreadsheet (an SOA exam, say), add its key to the profile matching its test driver, or add a
profile with its own function list and sources. Nothing in the pane is specific to the CAS.

The function list is the vendor's own file: Pearson VUE's *Athena Spreadsheet Function Comparison*
workbook, linked from its CAS page, whose column "Pearson VUE test driver spreadsheet (2023)" lists
523 functions. `scripts/spreadsheet_functions.py` reads that column mechanically into
`quiz/src/data/pearsonVueFunctions.json`, with the file's URL, sha256 and the date it was read, plus
the Excel functions the column leaves out (24 of them, among them `FORECAST.LINEAR`, `LET` and
`CELL`; `XLOOKUP`, `LINEST` and `LAMBDA` are on the list). **Never hand-edit the JSON.** For a new
edition, re-run the script, and the diff is the PR. The JSON is imported only by the lazy pane, so
the quiz page doesn't carry it.

Sources, read 2026-11-08:

- CAS, *Candidate Know Before You Go*: https://www.casact.org/exams-admissions/exams/candidate-know-you-go
- Pearson VUE, CAS page and its downloads: https://www.pearsonvue.com/us/en/cas.html
- Pearson VUE, *New Spreadsheet Functionality for CAS Exams* (PDF, from the CAS page)
- CAS, *New Item Types FAQ* (March 2024): https://www.casact.org/sites/default/files/2024-03/CAS_Exam_New_Item_Types_FAQ_03_2024.pdf

## Where the code is

| Piece | File |
|---|---|
| Tables → sheet, formula checks, cell address and value, caret insert, pane geometry (pure, tested) | `quiz/src/lib/questionSheet.ts` |
| The rules, their defaults and storage, which keys Enforce swallows (pure, tested) | `quiz/src/lib/sheetRules.ts` |
| Profiles and their sources | `quiz/src/data/examSpreadsheets.ts` |
| The function list (generated) | `quiz/src/data/pearsonVueFunctions.json`, `scripts/spreadsheet_functions.py` |
| The pane: docked / popped, header, grid, footer (lazy chunk) | `quiz/src/components/quiz/QuestionSheet.tsx` |
| The question bar's toggle | `quiz/src/components/quiz/SpreadsheetButton.tsx` |
| Insert | `quiz/src/components/quiz/InsertCellButton.tsx`, wired in `QuestionCard.tsx` |
| Working per question, open/closed | `quizStore.sheets`, `quizStore.sheetOpen` |
| Where the pane is, the selected cell | `quiz/src/stores/questionSheetStore.ts` |
| Flows | `quiz/e2e/question-sheet.spec.ts` |

Two details hold the feature together:

- **The grid owns its keys.** The pane carries `data-own-keys`, which `isTypingTarget`
  (`hooks/useKeyboard.ts`) treats as a typing target, so Enter moves down a row instead of
  confirming the answer, and a digit or `f` doesn't pick an option or flag the question.
- **Fortune-sheet measures itself on a window resize only**, so the pane's `ResizeObserver` sends
  one when it is dragged, docked or popped out.

## Not yet

- The setting isn't in the quiz setup sheet or the launch URL. It lives in the pane's pill, per
  mode.
- Column widths aren't saved: they are re-fitted to the content each time the sheet opens. Values,
  formulas and formatting are kept.
- The Review screen doesn't show the working beside the sample answer.
- Pearson VUE's one scratch sheet for the whole exam (beside each question's response sheet) isn't
  modelled. Each question has its own sheet.
