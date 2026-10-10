---
id: "discrm-an-021"
exam: "Exam DISC-RM"
topic: "Risk Measure"
learning_objective: "1. Introduction to Risk Management"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Risk+Measure
  - Concepts/Coefficient+of+Variation
  - Concepts/Standard+Deviation
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:dfbd8422674878c5d0d690425235c29d435d5c389338d3d9dc9761c3134d7d93
  sources:
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s06-02 coefficient of variation, sha256:2cd18f66c1d1d9bc8162fb93bce73ddf75b766f3363ac06e3ec20e165d473773 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s06-02-measures-of-risk-putting-it-to.html"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-021.md
---

A risk manager compares annual property losses at two plants. Plant X's losses have a mean of \$200,000 and a standard deviation of \$50,000. Plant Y's losses have a mean of \$800,000 and a standard deviation of \$120,000. Which plant's losses are relatively more variable, and why?

- A) Plant X, because its coefficient of variation is 0.25, against 0.15 for Plant Y
- B) Plant Y, because its standard deviation is more than twice Plant X's
- C) Plant Y, because its coefficient of variation is 6.67, against 4.00 for Plant X
- D) Plant Y, because its variance is about six times Plant X's variance

## Explanation

When two distributions have different means, the **coefficient of variation**, $\sigma / \mu$, compares their risk relative to their size:

$$
\begin{align*}
\text{CV}_X &= \frac{50{,}000}{200{,}000} \\
&= 0.25 \\
\text{CV}_Y &= \frac{120{,}000}{800{,}000} \\
&= 0.15
\end{align*}
$$

Plant X's losses vary more relative to their average. The answer is **A**.

**Why not the others**

- **B** — Plant Y's larger standard deviation mostly reflects its larger losses; comparing standard deviations across different means overstates the risk of the bigger exposure.
- **C** — 6.67 and 4.00 are the means divided by the standard deviations, the inverse of the coefficient of variation, which reverses the ranking.
- **D** — Variance has the same problem as the standard deviation, in squared units: Plant Y's variance is $(120{,}000 / 50{,}000)^2 = 5.76$ times Plant X's, which reflects size, not relative variability.
