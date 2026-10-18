---
id: "cas5-an-007"
exam: "Exam 5"
topic: "Tort Reform"
learning_objective: "Estimating Claim Liabilities (Reserving)"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Tort+Reform
  - Concepts/External+Information+in+Reserving
  - Concepts/Expected+Loss+Method
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1e186924dddb7dbf7bd3617ee81b24cd9da4c180deee81b93647a3f5a94ec067
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-5/cas5-an-007.md
---

An actuary is selecting an expected claim ratio for accident year 2026 for a private passenger automobile bodily injury book. A tort reform took effect January 1, 2022, and an independent analysis estimates that it reduces the cost of claims occurring on or after that date by 20%.

The claim ratios below have already been trended and adjusted to the current rate level, but not adjusted for the reform:

| Accident year | 2020 | 2021 | 2022 | 2023 | 2024 |
|---|---|---|---|---|---|
| Trended, on-level claim ratio | 85% | 90% | 68% | 70% | 72% |

The actuary selects the straight average of the five claim ratios after restating each to the tort environment of accident year 2026.

Calculate the selected expected claim ratio.

- A) Less than 65%
- B) At least 65%, but less than 75%
- C) At least 75%, but less than 80%
- D) At least 80%, but less than 87%
- E) At least 87%

## Explanation

Friedland's expected claims examples (Chapter 8) make a tort reform adjustment alongside trend and rate level: historical claims are restated as if they had occurred in the **new** legal environment. Accident year 2026 falls under the reform, so the pre-reform years (2020 and 2021) are multiplied by the reform factor $f = 1 - 0.20 = 0.80$, and the post-reform years need no adjustment:

$$
\begin{align*}
2020: \; 85\% \times 0.80 &= 68\% \\
2021: \; 90\% \times 0.80 &= 72\% \\
\text{Selected} &= \frac{68\% + 72\% + 68\% + 70\% + 72\%}{5} \\
&= \mathbf{70\%}
\end{align*}
$$

The answer is **B**.

**Why not the others**

- **A** — applying the 0.80 factor to all five years (61.6%) cuts the post-reform years a second time: their claims already occurred under the reform.
- **C** — leaving out the reform adjustment (77%) mixes two legal environments, overstating the claims AY 2026 will produce.
- **D** — dividing the pre-reform ratios by 0.80 (85.75%) moves them the wrong way, as if the reform had raised costs.
- **E** — restating the post-reform years to the *old* environment, dividing them by 0.80 (87.5%), points the adjustment at the wrong environment: AY 2026 will be settled under the reform.
