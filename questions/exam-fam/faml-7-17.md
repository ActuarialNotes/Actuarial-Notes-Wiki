---
id: "faml-7-17"
exam: "Exam FAM"
topic: "Loss Random Variable"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Loss+Random+Variable
  - Concepts/Variance
  - Concepts/Policy+Value
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:918245b591ffeeb67fa12a4660a48ded653bd75cc269d1e99328d958765a48f4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-17.md
---

For a fully discrete whole life insurance of 1 on ($x$), you are given:

(i) $q_{x+10} = 0.02067$

(ii) $v^{2} = 0.90703$

(iii) $A_{x+11} = 0.52536$

(iv) ${}^{2}A_{x+11} = 0.30783$

(v) $_{k}L$ is the prospective loss random variable at time $k$

Calculate $\dfrac{\text{Var}({}_{10}L)}{\text{Var}({}_{11}L)}$.

[Question 16 on the Fall 2014 exam]

- A) 1.006
- B) 1.010
- C) 1.014
- D) 1.018
- E) 1.022

## Explanation

$$\frac{V[{}_{10}L]}{V[{}_{11}L]} = \frac{\left(1 + \dfrac{P}{d}\right)^{2}\left({}^{2}A_{x+10} - A_{x+10}^{2}\right)}{\left(1 + \dfrac{P}{d}\right)^{2}\left({}^{2}A_{x+11} - A_{x+11}^{2}\right)}$$

$$\begin{align*}
A_{x+10} &= vq_{x+10} + vp_{x+10}\,A_{x+11} \\
&= (0.90703)^{1/2}(0.02067) + (0.90703)^{1/2}(1 - 0.02067)(0.52536) \\
&= 0.50969
\end{align*}$$

$$\begin{align*}
{}^{2}A_{x+10} &= v^{2}q_{x+10} + v^{2}p_{x+10}\,{}^{2}A_{x+11} \\
&= (0.90703)(0.02067) + (0.90703)(1 - 0.02067)(0.30783) \\
&= 0.29219
\end{align*}$$

$$\begin{align*}
\Rightarrow \frac{\text{Var}({}_{k}L)}{\text{Var}({}_{k+1}L)} &= \frac{(0.29219) - (0.50969)^{2}}{(0.30783) - (0.52536)^{2}} \\
&= \frac{0.03241}{0.03183} \\
&= 1.018
\end{align*}$$

The answer is **D**.
