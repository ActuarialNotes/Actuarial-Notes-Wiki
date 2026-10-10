---
id: "discda-an-019"
exam: "Exam DISC-DA"
topic: "User-Defined Function"
learning_objective: "Preparing Data for Analysis"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/User-Defined+Function
  - Concepts/SQL
  - Concepts/Missing+Data
answer: "C"
points: 1
---

An analyst defines a SQL function `age_band(age)` that returns '16-24' for ages 16 to 24, '25-64' for 25 to 64 and '65+' for 65 and over, using a `CASE` expression with no `ELSE`. A driver table holds ages 15, 17, 30, 64, 70 and one NULL. The analyst runs

```sql
SELECT age_band(age) AS band, COUNT(*)
FROM driver
GROUP BY age_band(age);
```

How many drivers are in the group whose band is NULL?

- A) 0
- B) 1
- C) 2
- D) 3

## Explanation

A `CASE` with no `ELSE` returns null for any value none of its branches covers. Age 15 is below the first band, and a null age satisfies no comparison, so both return null and fall in the same group. The other ages land in bands: 17 in '16-24', 30 and 64 in '25-64', and 70 in '65+'. The null group holds **2** drivers. The answer is **C**.

**Why not the others**

- **A** — 0 assumes every value is assigned a band, but the function has no branch for ages under 16 or for a missing age.
- **B** — 1 counts only the null age and misses that 15 also falls outside every branch.
- **D** — 3 also counts age 64, but the '25-64' band runs from 25 to 64 inclusive, so 64 is assigned a band.
