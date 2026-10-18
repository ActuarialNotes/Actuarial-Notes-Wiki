---
id: "faml-6-42"
exam: "Exam FAM"
topic: "Future Loss Random Variable"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Future+Loss+Random+Variable
  - Concepts/Endowment+Insurance
  - Concepts/Survival+Model
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:019001a44ffa3eb0ee316da5d39b2d809f98a34bbf653fc83d831c67847f04bf
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-42.md
---

For a fully discrete 3-year endowment insurance of 1000 on $(x)$, you are given:

(i) $\mu_{x+t} = 0.06$, for $0 \le t \le 3$

(ii) $\delta = 0.06$

(iii) The annual premium is 315.80

(iv) $L_{0}$ is the present value random variable for the loss at issue for this insurance

Calculate $\Pr[L_{0} > 0]$.

[Question 10 on the Fall 2016 exam]

- A) 0.03
- B) 0.06
- C) 0.08
- D) 0.11
- E) 0.15

## Explanation

The policy is fully discrete, so all cash flows occur at the start or end of a year.

Die Year 1 $\Longrightarrow$

$$\begin{align*}
L_{0} &= 1000v - 315.80 \\
&= 625.96
\end{align*}$$

Die Year 2 $\Longrightarrow$

$$\begin{align*}
L_{0} &= 1000v^{2} - 315.80(1 + v) \\
&= 273.71
\end{align*}$$

Survive Year 2 $\Longrightarrow$

$$\begin{align*}
L_{0} &= 1000v^{3} - 315.80(1 + v + v^{2}) \\
&= -58.03
\end{align*}$$

There is a loss if death occurs in year 1 or year 2, otherwise the policy was profitable.

$$\begin{align*}
\Pr(\text{death in year 1 or 2}) &= 1 - e^{-2\mu} \\
&= 0.113
\end{align*}$$

The answer is **D**.
