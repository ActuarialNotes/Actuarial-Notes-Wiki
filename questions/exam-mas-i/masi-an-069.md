---
id: "masi-an-069"
exam: "Exam MAS-I"
topic: "Pareto Distribution"
learning_objective: "Statistics"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Pareto+Distribution
  - Concepts/Deductible
  - Concepts/Payment+Random+Variable
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:73e509b6069dfc20f32a1f3d268203e5d4df37a291c706325aa005983e55a3a2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-069.md
---

Ground-up losses follow a Pareto distribution with $\alpha = 3$ and $\theta = 2{,}000$:

$$
F(x) = 1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha}, \quad x > 0
$$

A policy has an ordinary deductible of 1,000 and no limit. Which distribution describes the amount paid, $X - 1{,}000$, on a loss that produces a payment?

- A) Pareto with $\alpha = 3$ and $\theta = 1{,}000$
- B) Pareto with $\alpha = 3$ and $\theta = 2{,}000$
- C) Pareto with $\alpha = 2$ and $\theta = 3{,}000$
- D) Exponential with mean 1,500
- E) Pareto with $\alpha = 3$ and $\theta = 3{,}000$

## Explanation

A payment happens only when $X > 1{,}000$, so the payment's survival function is the conditional one:

$$
\begin{align*}
P(X - 1{,}000 > y \mid X > 1{,}000) &= \frac{S(y + 1{,}000)}{S(1{,}000)} \\
&= \left(\frac{3{,}000}{y + 3{,}000}\right)^{3}
\end{align*}
$$

This is again a Pareto survival function, with the same shape $\alpha = 3$ and scale $\theta + d = 3{,}000$. The answer is **E**. Its mean, 3,000/2 = 1,500, is the expected payment per payment — larger than the ground-up mean of 1,000.

**Why not the others**

- **A** — subtracts the deductible from the scale; the scale *grows* by $d$, because a loss that has already passed 1,000 is likely to go further.
- **B** — treats the Pareto as memoryless, which only the exponential is.
- **C** — lowers the shape by one, mixing up the distribution with the mean excess formula $(\theta + d)/(\alpha - 1)$, whose denominator is where the $\alpha - 1$ belongs.
- **D** — has the right mean, 1,500, but the wrong family: the excess of a Pareto keeps its polynomial tail, while an exponential's tail is far lighter.
