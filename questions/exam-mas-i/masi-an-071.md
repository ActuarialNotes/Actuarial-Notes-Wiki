---
id: "masi-an-071"
exam: "Exam MAS-I"
topic: "Severity Distribution"
learning_objective: "Statistics"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Severity+Distribution
  - Concepts/Gamma
  - Concepts/Inflation
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cd9c81f6303ed411b64748107349052320b11269237d03bffa63ad7af9311f9b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-071.md
---

This year's claim severities follow a gamma distribution with shape $\alpha = 2$ and scale $\theta = 500$, so the mean severity is 1,000. Next year every claim is expected to cost 10% more, with no other change.

Which distribution describes next year's claim severities?

- A) Gamma with $\alpha = 2.2$ and $\theta = 500$
- B) Gamma with $\alpha = 2$ and $\theta = 550$
- C) Gamma with $\alpha = 2$ and $\theta = 454.55$
- D) Gamma with $\alpha = 2.2$ and $\theta = 550$
- E) Gamma with $\alpha = 2$ and $\theta = 500$, shifted up by 100

## Explanation

If $Y = 1.1X$, then

$$
\begin{align*}
F_Y(y) &= P(1.1X \le y) \\
&= F_X\!\left(\frac{y}{1.1}\right)
\end{align*}
$$

In the gamma CDF, $x$ only ever appears as $x/\theta$, so replacing $x$ by $y/1.1$ is the same as replacing $\theta$ by $\theta \times 1.1$. Uniform inflation multiplies the **scale** parameter and leaves the shape alone: $Y$ is gamma with $\alpha = 2$ and $\theta = 550$, mean 1,100. The answer is **B**.

**Why not the others**

- **A** — inflates the shape instead of the scale. The mean is still 1,100, but the coefficient of variation, $\alpha^{-1/2}$, would change, and a pure change of currency units cannot change the shape of the distribution.
- **C** — divides the scale by 1.1, a confusion with *deflating* a deductible or limit when losses inflate.
- **D** — inflates both parameters, so the mean rises by 21%, not 10%.
- **E** — adds 10% of the mean to every claim; a \$200 claim then becomes \$300 instead of \$220, and the variance does not change at all.
