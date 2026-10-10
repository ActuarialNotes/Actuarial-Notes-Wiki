---
id: "masi-an-005"
exam: "Exam MAS-I"
topic: "Limited Expected Value"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: medium
type: multi-part
bloom: apply
wiki_link:
  - Concepts/Limited+Expected+Value
  - Concepts/Pareto+Distribution
  - Concepts/Deductible
  - Concepts/Policy+Limit
  - Concepts/Inflation
points: 3
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3d50a741bb5ba58110da2d2716798e69f74012093f595a6882b55a93c5b18784
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-005.md
---

Ground-up losses $X$ follow a Pareto distribution with $\alpha = 3$ and $\theta = 2{,}000$, so that

$$
E[X \wedge u] = \frac{\theta}{\alpha - 1}\left[1 - \left(\frac{\theta}{\theta + u}\right)^{\alpha - 1}\right].
$$

## Part a (1 point)
Calculate $E[X \wedge 5{,}000]$. Give your answer to the nearest whole number.

### Answer
918

### Explanation
$$
\begin{align*}
E[X \wedge 5{,}000] &= \frac{2{,}000}{2}\left[1 - \left(\frac{2{,}000}{7{,}000}\right)^{2}\right] \\
&= 1{,}000\,(1 - 0.08163) \\
&= \mathbf{918}
\end{align*}
$$

**Common wrong entries:** **1000** is the unlimited mean $\theta/(\alpha - 1)$, ignoring the limit; **977** raises $\theta/(\theta + u)$ to the power $\alpha$ instead of $\alpha - 1$.

## Part b (1 point)
A policy has an ordinary deductible of 1,000 and a maximum covered loss of 5,000: it pays $X - 1{,}000$ for losses between 1,000 and 5,000, and 4,000 for losses above 5,000. Calculate the expected payment per loss. Give your answer to the nearest whole number.

### Answer
363

### Explanation
The payment per loss is $(X \wedge 5{,}000) - (X \wedge 1{,}000)$:

$$
\begin{align*}
E[X \wedge 1{,}000] &= 1{,}000\left[1 - \left(\tfrac{2{,}000}{3{,}000}\right)^{2}\right] \\
&= 555.56 \\
E[\text{payment per loss}] &= 918.37 - 555.56 \\
&= \mathbf{363}
\end{align*}
$$

**Common wrong entries:** **382** treats 5,000 as a cap on the *payment*, computing $E[X \wedge 6{,}000] - E[X \wedge 1{,}000]$; **1224** divides by $\Pr(X > 1{,}000) = 0.2963$, giving the expected payment per *payment*.

## Part c (1 point)
All losses increase by 10%, and the deductible and maximum covered loss are unchanged. Calculate the new expected payment per loss. Give your answer to the nearest whole number.

### Answer
417

### Explanation
Multiplying a Pareto loss by 1.1 multiplies $\theta$ by 1.1, so inflated losses are Pareto with $\alpha = 3$ and $\theta = 2{,}200$:

$$
\begin{align*}
E[X' \wedge 5{,}000] &= 1{,}100\left[1 - \left(\tfrac{2{,}200}{7{,}200}\right)^{2}\right] \\
&= 997.30 \\
E[X' \wedge 1{,}000] &= 1{,}100\left[1 - \left(\tfrac{2{,}200}{3{,}200}\right)^{2}\right] \\
&= 580.08 \\
E[\text{payment per loss}] &= 997.30 - 580.08 \\
&= \mathbf{417}
\end{align*}
$$

That is a 15.0% increase from 10% inflation: the fixed deductible leverages the trend more than the fixed maximum dampens it.

**Common wrong entries:** **399** multiplies the Part b answer by 1.1, as if the layer inflated with the losses; **363** assumes a fixed layer shields the payment from inflation entirely.
