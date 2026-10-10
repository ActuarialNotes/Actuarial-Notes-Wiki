---
id: "discda-an-011"
exam: "Exam DISC-DA"
topic: "Dataframe"
learning_objective: "3. Preparing Data for Analysis"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Dataframe
  - Concepts/Missing+Data
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3737d3b751a36e44bf61488c9c4811de2d449e06afe196884cc0bb80bcd49867
  sources:
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.3 'Data transformation', §3.5.2 mean() returns NA when inputs include NA unless na.rm = TRUE; n() counts rows, sha256:7ecfc380d9ba22575657e2e0ea5b16d9a2c7a235f5cfd2a3ad860bf6bbf745de — https://r4ds.hadley.nz/data-transform.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-011.md
---

A dataframe `pol` has columns `terr` and `prem`. Territory T2 has three rows, with premiums 900, `NA` and 1,500. An analyst runs

```r
pol |> group_by(terr) |> summarize(n = n(), avg = mean(prem))
```

What does the T2 row of the result show?

- A) `n` = 3 and `avg` = `NA`
- B) `n` = 2 and `avg` = 1,200
- C) `n` = 3 and `avg` = 800
- D) `n` = 3 and `avg` = 1,200

## Explanation

`n()` counts the rows in the group, missing premium or not, so `n` = 3. In R, `mean()` of values that include a missing value returns `NA` unless it is told to drop them with `na.rm = TRUE`, which this code does not do. The answer is **A**.

**Why not the others**

- **B** — this drops the `NA` row from the count as well as from the mean; `n()` counts rows, not values.
- **C** — 800 treats the missing premium as zero: $(900 + 0 + 1{,}500) / 3$. A missing value is unknown, not zero.
- **D** — 1,200 is what `mean(prem, na.rm = TRUE)` would give: $(900 + 1{,}500)/2$. Without `na.rm = TRUE` the result is `NA`.
