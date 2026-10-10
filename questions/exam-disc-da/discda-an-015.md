---
id: "discda-an-015"
exam: "Exam DISC-DA"
topic: "SQL"
learning_objective: "3. Preparing Data for Analysis"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/SQL
  - Concepts/Missing+Data
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:22a7d30980e245e0c2a73717194c6b0354574f25eb3db7ab596575e9c68110b5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-015.md
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
