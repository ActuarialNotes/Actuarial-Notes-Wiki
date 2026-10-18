---
id: "masii-an-008"
exam: "Exam MAS-II"
topic: "Bootstrap"
learning_objective: "Statistical Learning"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Bootstrap
  - Concepts/Sampling+Distribution
  - Concepts/Standard+Deviation
answer: "D"
points: 2
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:753cd7300809870c62f11e03e5b4301929f9f75ee621e933da39d30cd4881bfc
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted PDF, §5.2 eq.(5.8), PDF p.220: SE_B = sqrt(1/(B-1) sum (alpha*r - mean)^2), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS, Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06 2026_1_13), p.4 James et al. chapters; p.5 MAS-I review list, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-008.md
---

An actuary needs the sampling variability of the median of a sample of 250 claim severities. No distribution is assumed. She draws $B = 5$ bootstrap samples (in practice $B$ would be far larger), each of 250 claims drawn with replacement from the original sample, and computes the median of each:

$$1{,}020 \quad 980 \quad 1{,}050 \quad 1{,}000 \quad 950$$

Calculate the bootstrap estimate of the standard error of the sample median.

- A) 2.41
- B) 17.03
- C) 34.06
- D) 38.08
- E) 1,450.00

## Explanation

The bootstrap stands in for drawing new samples from the population: the spread of the statistic across the resamples estimates its sampling distribution. The standard error is the **standard deviation** of the $B$ bootstrap estimates, with divisor $B - 1$:

$$
\mathrm{SE}_B = \sqrt{\frac{1}{B-1}\sum_{r=1}^{B}\left(\hat\alpha^{*r} - \bar{\hat\alpha}^{*}\right)^2}
$$

The mean of the five medians is 1,000, and the squared deviations are 400, 400, 2,500, 0 and 2,500, summing to 5,800:

$$
\mathrm{SE}_B = \sqrt{\frac{5{,}800}{4}} = \sqrt{1{,}450} = \mathbf{38.08}
$$

The answer is **D**.

**Why not the others**

- **A** — divides 38.08 by $\sqrt{250}$, as if it were the standard deviation of one claim. The bootstrap estimates are already medians of 250 claims; their spread *is* the standard error.
- **B** — divides by $\sqrt{B}$, treating the standard error as the error of the *average* of the bootstrap medians. Taking more resamples sharpens the estimate of the standard error; it does not shrink the standard error itself.
- **C** — divides by $B = 5$ instead of $B - 1 = 4$.
- **E** — the variance, 1,450, without taking the square root.
