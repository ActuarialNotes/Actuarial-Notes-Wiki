---
id: "discda-an-010"
exam: "Exam DISC-DA"
topic: "Dataframe"
learning_objective: "3. Preparing Data for Analysis"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Dataframe
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:000f240878db9ea27ecd27f53bdd22d13ac7de9523ae600de104f92805ee8865
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-010.md
---

An analyst works with a dataframe of 25,000 claims in R. Which dplyr step changes the number of columns but never the number of rows?

- A) `filter()`, keeping the claims above a threshold
- B) `mutate()`, adding a severity band derived from the paid amount
- C) `arrange()`, sorting the claims by paid amount
- D) `summarize()` after `group_by()`, totalling paid by state

## Explanation

`mutate()` adds new columns calculated from existing ones and leaves every row in place, so the result still has 25,000 rows and one more column. The answer is **B**.

**Why not the others**

- **A** — `filter()` changes which rows are present and leaves the columns alone, the opposite of what is asked.
- **C** — `arrange()` changes only the order of the rows: neither their number nor the columns change.
- **D** — a grouped `summarize()` changes both, returning one row per state with the grouping column and the summaries.
