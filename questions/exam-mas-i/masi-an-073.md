---
id: "masi-an-073"
exam: "Exam MAS-I"
topic: "Tail Weight"
learning_objective: "Statistics"
difficulty: medium
type: multiple-choice
bloom: remember
wiki_link:
  - Concepts/Tail+Weight
  - Concepts/Gamma
  - Concepts/Weibull+Distribution
  - Concepts/Lognormal+Distribution
  - Concepts/Pareto+Distribution
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:df648b8c942afe260c3a203ed83c831ee45905e4b8e6003184848a21d1561ac6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-073.md
---

Which of the following claim-severity distributions has a moment generating function $E\big[e^{tX}\big]$ that is finite for some $t > 0$?

- A) Pareto with $\alpha = 4$
- B) Lognormal with $\sigma = 0.5$
- C) Weibull with $\tau = 0.5$
- D) Gamma with $\alpha = 0.5$
- E) Single-parameter Pareto with $\alpha = 6$

## Explanation

The gamma's moment generating function is

$$
M_X(t) = (1 - \theta t)^{-\alpha}, \quad t < \frac{1}{\theta}
$$

for **every** shape $\alpha > 0$, including $\alpha = 0.5$: its density ends in the factor $e^{-x/\theta}$, which overpowers $e^{tX}$ whenever $t < 1/\theta$. The answer is **D**. (A gamma with shape below 1 has a decreasing hazard rate, yet its tail is still exponentially light — it approaches an exponential's.)

**Why not the others**

- **A** — a Pareto's survival function falls only like $x^{-\alpha}$, so $E[X^k]$ is infinite for $k \ge 4$ and $E[e^{tX}]$ is infinite for every $t > 0$.
- **B** — the lognormal has every moment, at any $\sigma$, but no moment generating function: its tail, though lighter than any Pareto's, is heavier than any exponential's. This is the case where the moment test and the MGF test disagree.
- **C** — a Weibull with $\tau < 1$ has survival function $e^{-(x/\theta)^{0.5}}$, which decays more slowly than $e^{-tx}$ for any $t > 0$, so the integral diverges even though every moment exists.
- **E** — the single-parameter Pareto is a shifted two-parameter Pareto with the same polynomial tail; moments exist only below order 6, and there is no moment generating function.
