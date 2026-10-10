---
id: "discda-an-012"
exam: "Exam DISC-DA"
topic: "Dataframe"
learning_objective: "3. Preparing Data for Analysis"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Dataframe
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:362aa024b58ec09402115ca37afd5b11551beb5a3a5957d82da116a377d88e08
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-012.md
---

A policy dataframe has 50,000 rows and 20 columns. An analyst filters it to the 12,000 policies written in 2024, selects 6 columns, adds 2 derived columns, then groups by state (5 states) and channel (3 channels) and summarizes 4 statistics. Every state and channel combination occurs in the data. What are the dimensions of the result?

- A) 8 rows and 6 columns
- B) 15 rows and 4 columns
- C) 15 rows and 6 columns
- D) 12,000 rows and 8 columns

## Explanation

Only the last step decides the shape of the result. A grouped summary returns one row per combination of the grouping variables, with the grouping columns plus one column per statistic:

$$
\begin{align*}
\text{Rows} &= 5 \times 3 \\
&= 15 \\
\text{Columns} &= 2 + 4 \\
&= 6
\end{align*}
$$

The answer is **C**.

**Why not the others**

- **A** — 8 rows adds the levels (5 states plus 3 channels) instead of counting their combinations.
- **B** — 4 columns forgets that the grouping columns, state and channel, are kept in the result.
- **D** — 12,000 rows and 8 columns is the shape before the grouped summary, after the filter, select and derived columns.
