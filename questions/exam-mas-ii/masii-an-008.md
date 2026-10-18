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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:753cd7300809870c62f11e03e5b4301929f9f75ee621e933da39d30cd4881bfc
  sources: []
  open_findings: 0
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
