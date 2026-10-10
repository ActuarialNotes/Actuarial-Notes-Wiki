---
id: "masi-an-042"
exam: "Exam MAS-I"
topic: "Mixture Distribution"
learning_objective: "Statistics"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Mixture+Distribution
  - Concepts/Pareto+Distribution
  - Concepts/Percentile
  - Concepts/Cumulative+Distribution+Function+(CDF)
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:472510ecc40c6f9f5ee2d617380366e1d3e94222209164e4ae85356b375a23bc
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008), MAS-I reading, Mixing Method, Fact 1.17 (a distribution function mixes linearly with the weights), PDF p.10, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.2.4.1 Pareto F(x) = 1 - (theta/(x+theta))^alpha and mean theta/(alpha-1), PDF p.10, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-042.md
---

For a group of policies:

- 75% of policies have no loss in a year.
- A policy with a loss has exactly one, and its size follows a Pareto distribution with $\alpha = 3$ and $\theta = 2{,}000$, so that $P(\text{size} > x) = \left(\frac{2{,}000}{x + 2{,}000}\right)^{3}$.
- The expected annual loss per policy is 250.

Calculate the 90th percentile of the annual loss for a randomly selected policy.

- A) Less than 650
- B) At least 650, but less than 1,000
- C) At least 1,000, but less than 2,000
- D) At least 2,000, but less than 2,500
- E) At least 2,500

## Explanation

The annual loss $L$ mixes a point mass at 0 (weight 0.75) with the Pareto (weight 0.25):

$$
F_L(x) = 0.75 + 0.25\left[1 - \left(\frac{2{,}000}{x + 2{,}000}\right)^{3}\right], \qquad x \ge 0
$$

The CDF jumps to 0.75 at zero, so the 90th percentile lies in the continuous part. Solve $F_L(x) = 0.9$:

$$
0.25\left[1 - \left(\frac{2{,}000}{x + 2{,}000}\right)^{3}\right] = 0.15
\quad\Longrightarrow\quad
\left(\frac{2{,}000}{x + 2{,}000}\right)^{3} = 0.4
$$

$$
x = 2{,}000\left(0.4^{-1/3} - 1\right) = 714.4
$$

This is in **B**. Equivalently: 10% of policies exceed the percentile, and they are all among the 25% with a loss, so the percentile is the point exceeded by 0.10/0.25 = 40% of losses. The expected annual loss of 250 plays no part — a percentile needs the CDF, not the mean.

**Why not the others**

- **A** — 577 is 0.25 times 2,309, mixing the *percentiles* with the class weights. CDFs mix linearly; their inverses do not.
- **C** — 1,915 swaps the weights, solving $F_{\text{Pareto}}(x) = (0.9 - 0.25)/0.75$ as if 75% of policies had a loss.
- **D** — 2,309 is the 90th percentile of the Pareto alone, ignoring the 75% of policies with no loss.
- **E** — 2,714 solves $x = 2{,}000 \times 0.4^{-1/3}$, dropping the $-1$: that inverts a single-parameter Pareto survival function, $(\theta/x)^{\alpha}$, not this one.
