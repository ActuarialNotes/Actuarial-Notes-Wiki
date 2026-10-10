---
id: "discda-an-013"
exam: "Exam DISC-DA"
topic: "SQL"
learning_objective: "3. Preparing Data for Analysis"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/SQL
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:ac6203c21162de4f2b2b5ab9ba95a64d42ccc351486a076311f5ca7378216fc2
  sources:
    - "PostgreSQL 17 Documentation, §2.7 WHERE before aggregates (no aggregates in WHERE), HAVING after, sha256:df158bcbc7924e1fbe49821aab78e37df53a7e14ac4cc8befdc480fee72b7e35 — https://www.postgresql.org/docs/17/tutorial-agg.html"
    - "PostgreSQL 17 Documentation, SELECT List: output column names not usable in WHERE/HAVING, sha256:16d6c1ac8132a80f1a157883d3fae1c07fca9196b44e76c4574027f13d830a7f — https://www.postgresql.org/docs/17/sql-select.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-013.md
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
