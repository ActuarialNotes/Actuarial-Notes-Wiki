---
id: "discda-an-017"
exam: "Exam DISC-DA"
topic: "Database Index"
learning_objective: "Preparing Data for Analysis"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Database+Index
  - Concepts/Table+Join
answer: "C"
points: 1
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
