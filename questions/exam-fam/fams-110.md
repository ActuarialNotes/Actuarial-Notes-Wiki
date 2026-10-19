---
id: "fams-110"
exam: "Exam FAM"
topic: "Coverage Modifications"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Coverage+Modifications
  - Concepts/Payment+Random+Variable
  - Concepts/Pareto+Distribution
  - Concepts/Inflation
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e2c506941347575749ee7db38d5d1872ed9a72cf23b2825b0f67271ac74902c6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-110.md
---

In Year 1, individual losses follow the Pareto distribution with $\alpha = 3$ and $\theta = 1200$.

Losses experience 10% inflation in Year 2.

An insurance policy covering these losses has a 250 deductible, a 700 policy limit, and 70% coinsurance.

Calculate the expected cost per payment for the policy in Year 2.

- A) 205
- B) 218
- C) 313
- D) 344
- E) 409

## Explanation

The maximum covered loss is

$$\begin{align*}
u &= 700/0.7 + 250 \\
&= 1250.
\end{align*}$$

With inflation, the Year 2 losses have a Pareto distribution with $\alpha = 3$ and $\theta = 1.1(1200) = 1320$.

The expected cost per payment is:

$$\begin{align*}
(0.7)\frac{E(X \wedge 1250) - E(X \wedge 250)}{1 - F(250)} &= (0.7)\frac{\dfrac{1320}{2}\left\{\left[1 - \left(\dfrac{1320}{2570}\right)^2\right] - \left[1 - \left(\dfrac{1320}{1570}\right)^2\right]\right\}}{1 - \left[1 - \left(\dfrac{1320}{1570}\right)^3\right]} \\
&= (0.7)\frac{660(0.73620 - 0.29312)}{0.59432} \\
&= 344.43.
\end{align*}$$

Note: Per the text, the policy limit is the maximum amount payable, while maximum covered loss, $u$, is the loss above which no additional benefits are paid. Solving the problem with $u = 700$ instead of $u = 1250$ produces an incorrect answer of 218.

The answer is **D**.
