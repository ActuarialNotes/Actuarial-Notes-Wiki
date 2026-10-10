---
id: "discda-an-014"
exam: "Exam DISC-DA"
topic: "SQL"
learning_objective: "3. Preparing Data for Analysis"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/SQL
  - Concepts/Missing+Data
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5d52e9e334f46248bc06d15477671c5e5d676ff0bbc79ec0e28748ecf3192022
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-014.md
---

A claim table has four rows for territory T2, with `paid` values of 3,000, NULL, 5,000 and 7,000. What does the following query return?

```sql
SELECT AVG(paid) FROM claim WHERE terr = 'T2';
```

- A) 3,750
- B) 5,000
- C) 7,000
- D) 15,000

## Explanation

`AVG` computes the mean of the **non-null** input values, so the null row is ignored rather than counted as zero:

$$
\begin{align*}
\text{AVG(paid)} &= \frac{3{,}000 + 5{,}000 + 7{,}000}{3} \\
&= 5{,}000
\end{align*}
$$

The answer is **B**.

**Why not the others**

- **A** — 3,750 divides the total by all four rows, treating the null as zero. That is `SUM(paid) / COUNT(*)`, not `AVG(paid)`.
- **C** — 7,000 is `MAX(paid)`, a different aggregate.
- **D** — 15,000 is `SUM(paid)`, the total before dividing.
