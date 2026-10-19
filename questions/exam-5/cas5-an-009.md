---
id: "cas5-an-009"
exam: "Exam 5"
topic: "Parallelogram Method"
learning_objective: "Ratemaking"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Parallelogram+Method
  - Concepts/On-Leveling
  - Concepts/Earned+Premium
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:eaf4faca194de2b1fabae0b38d52eb8445ccd72ef687fb3d8010b89bc266d4c9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-5/cas5-an-009.md
---

An insurer writes annual homeowners policies uniformly throughout the year. A +8% rate change applies to all policies written on or after July 1, 2025, and there were no other rate changes in 2024 or 2025.

True or false: half of calendar year 2025 earned premium was earned at the new (+8%) rate level.

- A) True
- B) False

## Explanation

Calendar year 2025 earned premium comes from policies written from January 1, 2024 through December 31, 2025. In the parallelogram picture (time across, fraction of the term earned up), the new rate level applies to the region to the right of the diagonal starting at July 1, 2025. Within calendar year 2025 that region is a triangle with base and height 0.5:

$$
\begin{align*}
A_{\text{new}} &= \tfrac{1}{2}(1 - p)^2 \\
&= \tfrac{1}{2}(0.5)^2 \\
&= \mathbf{0.125}
\end{align*}
$$

Only **12.5%** of calendar year 2025 earned premium is at the new rate level; the other 87.5% was earned on policies written before July 1, 2025, at the old level. The statement is false, so the answer is **B**.

**Why not A**

- **A** treats calendar-year *earned* premium as if it were *written* (or policy-year) premium. Written premium is grouped by the date the policy is written, so half of 2025 written premium is at the new level. Earned premium lags: a policy written on July 1, 2025 earns only half its premium in 2025, and one written in December earns almost none of it, so the share earned at the new level is much smaller than the share of the year after the effective date.
