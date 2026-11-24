---
id: "atpa-an-013"
exam: "Exam ATPA"
topic: "Relational Database"
learning_objective: "Working with Data"
difficulty: medium
type: multi-part
bloom: apply
wiki_link:
  - Concepts/Relational+Database
  - Concepts/Data+Preparation
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8f54d984c6c468ddc73859cdfa9c0a73b1a0df785e756e13b8a874421226a2d1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-013.md
---

A policy table has 500 policies, each with 1.0 car-year of exposure, and `policy_id` as its primary key. A claim table has one row per claim, with `policy_id` as a foreign key:

| Claims on the policy | Number of policies |
| ---: | ---: |
| 1 | 60 |
| 2 | 15 |
| 3 | 5 |

The claim table also holds 4 claims whose `policy_id` is not in the policy table. An analyst left joins the claim table onto the policy table, with the policy table on the left.

## Part a (1 point)
Calculate the number of rows in the result. Give your answer as a whole number.

### Answer
525

### Explanation
A left join keeps every row of the left table, once per matching row on the right, and once with null claim fields where there is no match:

$$
\sum_k n_R(k)\max\{n_S(k), 1\} = 420(1) + 60(1) + 15(2) + 5(3) = 420 + 60 + 30 + 15 = \mathbf{525}
$$

The 420 policies with no claim keep one row each. The 4 orphan claims have no policy on the left, so they do not appear. They are investigated separately, since their losses would otherwise vanish.

**Common wrong entries**

- **500** assumes a left join never adds rows. A policy with several claims appears once per claim.
- **105** is the inner join, which drops the 420 claim-free policies.
- **529** keeps the orphan claims as well, which a left join from the policies does not.

## Part b (1 point)
The analyst sums `exposure` over the rows of the result. By how many car-years does that sum overstate the book's true exposure? Give your answer as a whole number.

### Answer
25

### Explanation
Summing over the 525 rows counts each policy's 1.0 car-year once per row, giving 525 car-years against the true 500:

$$
525 - 500 = \mathbf{25}
$$

The extra 25 come from repeating the exposure of the policies with two or three claims ($n = 15 \times 1 + 5 \times 2 = 25$). The fix is to aggregate the claims to one row per policy before joining, so the result has 500 rows.

**Common wrong entries**

- **0** misses that a one-to-many join repeats the "one" side's fields.
- **29** counts the orphan claims as extra rows, but they never enter a left join from the policies.
