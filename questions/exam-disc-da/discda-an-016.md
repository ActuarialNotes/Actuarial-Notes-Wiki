---
id: "discda-an-016"
exam: "Exam DISC-DA"
topic: "Table Join"
learning_objective: "Preparing Data for Analysis"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Table+Join
  - Concepts/SQL
answer: "B"
points: 1
---

A policy table has 1,000 rows, each with a unique `policy_id`. A claim table has 150 rows: 145 claims on 120 distinct policies that are in the policy table, and 5 orphan claims whose `policy_id` is not in the policy table. How many rows does this query return?

```sql
SELECT *
FROM policy p
LEFT JOIN claim c ON p.policy_id = c.policy_id;
```

- A) 1,000
- B) 1,025
- C) 1,030
- D) 1,150

## Explanation

A left join keeps every row of the left table (policy). A policy with claims appears once per matching claim, and a policy with none appears once with nulls in the claim columns. Orphan claims have no policy to attach to, so the left join drops them.

$$
\begin{align*}
\text{Matched rows} &= 145 \\
\text{Policies with no claim} &= 1{,}000 - 120 \\
&= 880 \\
\text{Rows returned} &= 145 + 880 \\
&= 1{,}025
\end{align*}
$$

The answer is **B**.

**Why not the others**

- **A** — 1,000 assumes a left join returns exactly as many rows as the left table. That holds only when each left row matches at most once; here some policies have several claims.
- **C** — 1,030 also keeps the 5 orphan claims, which is a full outer join.
- **D** — 1,150 adds all 150 claim rows to the 1,000 policies, double counting the 120 policies that matched and including the orphans.
