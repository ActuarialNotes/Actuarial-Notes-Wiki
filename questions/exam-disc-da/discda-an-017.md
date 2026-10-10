---
id: "discda-an-017"
exam: "Exam DISC-DA"
topic: "Database Index"
learning_objective: "3. Preparing Data for Analysis"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Database+Index
  - Concepts/Table+Join
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:234dd36d60c765a25ee009d17e2559859bacc991558b83a34ad5594020c4e9b7
  sources:
    - "PostgreSQL 17 Documentation, §11.1 maintenance overhead; planner chooses index vs sequential scan, sha256:b219b13fcf65d35c8e57807d74748dc57041a7275dc7e531c82d226df937208e — https://www.postgresql.org/docs/17/indexes-intro.html"
    - "PostgreSQL 17 Documentation, §11.12 selectivity, sha256:7953c0e55f8e7fe508d28151fb30629509f288a181d642b1255370563a3f4b8e — https://www.postgresql.org/docs/17/indexes-examine.html"
    - "PostgreSQL 17 Documentation, §5.5.4 at most one primary key, unique and not null, sha256:f3797f1e000c84ee57bcb411cbffa458be90b2adb69889d243abfa090b0b8224 — https://www.postgresql.org/docs/17/ddl-constraints.html"
    - "MySQL 8.4 Reference Manual §17.6.2.1 Clustered and Secondary Indexes, clustered index stores row data, typically the primary key; all other indexes are secondary indexes, sha256:542622d6a2ee72ee2b714af2d13dac62107187c3460678191300976e6935d3e1 — https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-017.md
---

A claim table of 3,000,000 rows is loaded nightly and queried all day. Most queries join it to the policy table on `policy_id`; some filter on `claim_status`, which takes three values (open, closed, reopened). The table already has its primary key on `claim_id`. Which additional index is most likely to repay its cost?

- A) An index on `claim_status`, since many queries filter on it
- B) An index on every column, so that any query can use one
- C) A secondary index on `policy_id`, the column most joins use
- D) A second primary index, built on `policy_id`

## Explanation

An index pays off on columns used in join conditions and filters that pick out few rows. `policy_id` is the join key for most queries and has many distinct values, so an index on it lets the database find each policy's claims without scanning 3,000,000 rows. Since one policy can have several claims, the index is a **secondary** one, which allows repeated values. The answer is **C**.

**Why not the others**

- **A** — with only three values, each status returns a large share of the table, so reading those rows is most of the work with or without an index.
- **B** — every index takes storage and must be updated on every insert, so indexing every column slows the nightly load for many indexes that queries rarely use.
- **D** — a table has one primary key, and a primary index requires unique values, which `policy_id` does not have in a claim table.
