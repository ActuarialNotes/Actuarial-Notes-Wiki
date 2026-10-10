---
id: "discda-an-011"
exam: "Exam DISC-DA"
topic: "Dataframe"
learning_objective: "Preparing Data for Analysis"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Dataframe
  - Concepts/Missing+Data
answer: "A"
points: 1
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
