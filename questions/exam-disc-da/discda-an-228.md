---
id: "discda-an-228"
exam: "Exam DISC-DA"
topic: "Data Preparation"
learning_objective: "9. Preparing Data for Insurance Applications"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Data+Preparation
  - Concepts/SQL
  - Concepts/Table+Join
  - Concepts/Underwriting+Modeling+Dataset
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:6efcc7de3728640d350be29545c1157dcb691306cb5a17440fcc016e0958912a
  sources:
    - "MySQL 8.0 Reference Manual, JOIN clause, LEFT JOIN null-row rule, sha256:43e50552524b2b85e91f5895f6c27240d9ca60480de24a0dfba19cbf41e1d829 — https://dev.mysql.com/doc/refman/8.0/en/join.html; MySQL 8.0 Reference Manual, Date and Time Functions, DATEDIFF, sha256:4552b2043aa78606f357e5a88a8c14c813bfbc8d1a25e8c9ef9e6bf4e44a3965 — https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html; MySQL 8.0 Reference Manual, Comparison Functions, COALESCE, LEAST, sha256:8fb9c7c63dd7dbaddb65d4f3952da94e1d49435b425d5216a5c590cb99f9ce81 — https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §4.1 PDF p.46, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-228.md
---

An analyst needs one row per policy term with its claim count. The tables are `policy_term` (one row per term) and `claim` (one row per claim, with the term it belongs to). Which approach produces the right data set?

- A) Inner join `claim` to `policy_term`, then count rows for each term
- B) Count claims by term in `claim`, left join that onto `policy_term`, and set missing counts to 0
- C) Left join `policy_term` to `claim` and count rows for each term without changing nulls
- D) Count claims by term in `claim` and use that summary as the data set

## Explanation

The unit of observation is the policy term, so the table that defines the units, `policy_term`, must keep every row. Summarize the many side first (claims counted by term), then **left join** the summary onto the terms, and replace the missing counts of claim-free terms with 0 (for example with `COALESCE`). The answer is **B**.

**Why not the others**

- **A** — an inner join keeps only terms with at least one claim, so claim-free terms, most of the exposure, disappear and frequency is overstated.
- **C** — a left join with claims keeps every term, but counting *rows* gives a claim-free term a count of 1 (its one row with null claim fields) unless claim IDs are counted instead.
- **D** — a summary built from the claim table has no rows for claim-free terms at all.
