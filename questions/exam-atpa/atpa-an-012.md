---
id: "atpa-an-012"
exam: "Exam ATPA"
topic: "Tidy Data"
learning_objective: "Working with Data"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Tidy+Data
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4900b7a256913e3e604049718e09ccb82646390506860e7d7f012cb00a860d32
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-012.md
---

A territory summary has one row per territory and the columns `territory`, `exposure_2023`, `exposure_2024`, `claims_2023` and `claims_2024`. An analyst wants to fit a claim frequency model with territory and year as predictors and exposure as an offset. Which layout should the summary be reshaped into?

- A) Keep it as it is, since each territory is one observation and each column holds a number.
- B) Columns `territory`, `year`, `measure` and `value`, one row per territory, year and measure.
- C) Columns `territory`, `year`, `exposure` and `claims`, one row per territory and year.
- D) Columns `territory`, `exposure` and `claims`, summing the two years into one row per territory.
- E) One column per territory and one row per combination of year and measure.

## Explanation

A data set is tidy when each variable is a column, each observation is a row and each value is a cell. Here the observation the model predicts for is a territory-year, and the variables are territory, year, exposure and claims. Year is stored in the column headers, so the table is pivoted longer into one row per territory-year with a column for each of the four variables. The model can then use `year` as a predictor and `exposure` as an offset. The answer is **C**.

**Why not the others**

- **A** leaves year in the column headers, so year is not a variable the model can use, and exposure and claims are each spread over two columns.
- **B** pivots too far. Exposure and claims are different variables, and putting both in one `value` column breaks the rule that each variable is a column.
- **D** throws away year, which the model needs as a predictor.
- **E** makes territories the columns, which turns the observations into variables.
