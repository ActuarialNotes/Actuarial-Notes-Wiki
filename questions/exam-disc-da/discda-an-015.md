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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:22a7d30980e245e0c2a73717194c6b0354574f25eb3db7ab596575e9c68110b5
  sources:
    - "PostgreSQL 17 Documentation, §9.2 ordinary comparison with null yields null, sha256:7c49c06dfe1ddba8fa5e113dc4f0a3541e7e9534916aa0aaffb02f5da91030b2 — https://www.postgresql.org/docs/17/functions-comparison.html"
    - "PostgreSQL 17 Documentation, WHERE Clause: a row satisfies the condition if it returns true, sha256:16d6c1ac8132a80f1a157883d3fae1c07fca9196b44e76c4574027f13d830a7f — https://www.postgresql.org/docs/17/sql-select.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
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
