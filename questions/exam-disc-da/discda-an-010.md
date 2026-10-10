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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:000f240878db9ea27ecd27f53bdd22d13ac7de9523ae600de104f92805ee8865
  sources:
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.3 'Data transformation', §3.2 filter()/arrange() affect rows only; §3.3 mutate() adds columns without changing rows; §3.5.2 summarize() one row per group, sha256:7ecfc380d9ba22575657e2e0ea5b16d9a2c7a235f5cfd2a3ad860bf6bbf745de — https://r4ds.hadley.nz/data-transform.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
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
