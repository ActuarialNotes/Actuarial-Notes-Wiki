---
id: "discda-an-013"
exam: "Exam DISC-DA"
topic: "SQL"
learning_objective: "Preparing Data for Analysis"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/SQL
answer: "D"
points: 1
---

An analyst needs the territories whose accident year 2024 claims have total paid losses over \$1,000,000. The query already has `FROM claim`, `WHERE acc_year = 2024` and `GROUP BY terr`. Where must the condition `SUM(paid) > 1000000` go?

- A) In the `WHERE` clause, joined to the accident year condition with `AND`
- B) In the `ORDER BY` clause, so that the largest territories sort first
- C) In the `SELECT` list, given a name with a column alias
- D) In a `HAVING` clause, which is applied after the grouping

## Explanation

`WHERE` selects input rows **before** groups and aggregates are computed, so it cannot contain an aggregate. `HAVING` selects groups **after** the aggregates are computed, which is what a condition on a territory's total needs. The accident year condition stays in `WHERE`, so 2023 claims never enter the totals. The answer is **D**.

**Why not the others**

- **A** — an aggregate in `WHERE` is an error: when `WHERE` runs, no group or total exists yet.
- **B** — `ORDER BY` sorts the result but removes nothing, so every territory would still be returned.
- **C** — a select-list column computes and names the total but filters nothing, and its alias could not be used in `WHERE` either.
