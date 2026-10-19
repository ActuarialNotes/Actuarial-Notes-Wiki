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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:88c0fa62e0aee6d99c9d7e9ae17c4023af085b01f6c4661bcde0bfc058460d23
  sources: []
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
