---
id: "fam-an-006"
exam: "Exam FAM"
topic: "Risk"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Risk
  - Concepts/Risk+Measure
  - Concepts/Pareto+Distribution
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-19
  last_checked_by: agent:validate-v1
  content_hash: sha256:88c0fa62e0aee6d99c9d7e9ae17c4023af085b01f6c4661bcde0bfc058460d23
  sources:
    - "SOA Tables for Exam FAM (October 2024), A.2.3.1 Pareto: F(x), VaR_p, TVaR_p = VaR_p + theta(1-p)^(-1/alpha)/(alpha-1), E[X^k], p.6, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
    - "SOA Exam FAM Syllabus, October 2026, Topic 6 (a), (c) p.5; Topic 7 (a), (b) p.6; Topic 2 (m) p.3, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fam-an-006.md
---

The annual loss $X$ on a portfolio follows a two-parameter Pareto distribution with $\alpha = 3$ and $\theta = 2{,}000$.

Calculate the tail value at risk of $X$ at the 95% security level, $\text{TVaR}_{0.95}(X)$.

- A) 2,714
- B) 3,429
- C) 4,429
- D) 5,238
- E) 6,143

## Explanation

First find the value at risk, the 95th percentile $\pi_{0.95}$, from $S(x) = \left(\frac{\theta}{x + \theta}\right)^{\alpha}$:

$$\begin{align*}
\left(\frac{2{,}000}{\pi_{0.95} + 2{,}000}\right)^{3} &= 0.05 \\
\text{VaR}_{0.95}(X) = \pi_{0.95} &= 2{,}000\left(0.05^{-1/3} - 1\right) \\
&= 3{,}428.8
\end{align*}$$

For a continuous loss, TVaR is the expected loss given that the loss exceeds the VaR, which is the VaR plus the mean excess loss there. For the Pareto, $e(d) = \frac{d + \theta}{\alpha - 1}$:

$$\begin{align*}
\text{TVaR}_{0.95}(X) &= \pi_{0.95} + e(\pi_{0.95}) \\
&= 3{,}428.8 + \frac{3{,}428.8 + 2{,}000}{3 - 1} \\
&= 3{,}428.8 + 2{,}714.4 \\
&= 6{,}143.3
\end{align*}$$

The answer is **E**. VaR says only that a loss above 3,429 has a 5% chance; TVaR says that, when one happens, it averages 6,143. VaR ignores how heavy the tail beyond the percentile is, and TVaR is built from it.

**Why not the others**

- **A** is the mean excess loss $e(\pi_{0.95}) = 2{,}714$ alone, the amount *by which* the tail losses exceed the VaR, not the tail losses themselves.
- **B** is $\text{VaR}_{0.95}$, the percentile, rather than the average of the losses beyond it.
- **C** adds the unconditional mean $E[X] = \theta/(\alpha - 1) = 1{,}000$ to the VaR, as if the excess over any point had the same mean (true for the exponential, not for the Pareto, whose mean excess grows with the point).
- **D** uses $\frac{d + \theta}{\alpha}$ for the mean excess, dividing by $\alpha$ instead of $\alpha - 1$.
