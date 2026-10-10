---
id: "discda-an-015"
exam: "Exam DISC-DA"
topic: "SQL"
learning_objective: "Preparing Data for Analysis"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/SQL
  - Concepts/Missing+Data
answer: "A"
points: 1
---

A policy table has 10 rows: 6 with `state = 'NY'`, 3 with `state = 'NJ'` and 1 whose state is NULL. How many rows does this query count?

```sql
SELECT COUNT(*) FROM policy WHERE state <> 'NY';
```

- A) 3
- B) 4
- C) 6
- D) 10

## Explanation

A comparison with a null gives null ("unknown"), not true, and `WHERE` keeps only the rows for which its condition is true. The 3 NJ rows satisfy `state <> 'NY'`; the null row does not, even though its state is not known to be NY. The query counts **3**. To include the unknown state, the condition would need `OR state IS NULL`. The answer is **A**.

**Why not the others**

- **B** — 4 counts the null row as "not NY". Null comparisons are never true, so `WHERE` drops it.
- **C** — 6 is the number of NY rows, the rows the condition excludes.
- **D** — 10 is every row, as if there were no `WHERE` clause.
