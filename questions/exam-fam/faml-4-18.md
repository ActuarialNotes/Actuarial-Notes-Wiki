---
id: "faml-4-18"
exam: "Exam FAM"
topic: "Percentile"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Percentile
  - Concepts/Present+Value
  - Concepts/Future+Lifetime+Random+Variable
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:eebba05e8d68318032ea33c0c2fcfc687eddfd090c6d66ee7c7093294666ac64
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-18.md
---

You are given that $T$, the time to first failure of an industrial robot, has a density $f(t)$ given by

$$f(t) = \begin{cases} 0.1, & 0 \le t < 2 \\ 0.4t^{-2}, & 2 \le t < 10 \end{cases}$$

with $f(t)$ undetermined on $[10, \infty)$.

Consider a supplemental warranty on this robot that pays 100,000 at the time $T$ of its first failure if $2 \le T \le 10$, with no benefits payable otherwise.

You are also given that $\delta = 5\%$.

Calculate the 90th percentile of the present value of the future benefits under this warranty.

[Question 5 on the Spring 2017 exam]

- A) 82,000
- B) 84,000
- C) 87,000
- D) 91,000
- E) 95,000

## Explanation

The present value random variable $\text{PV} = 1{,}000{,}000e^{-0.05T}$, $2 \le T \le 10$ is a decreasing function of $T$ so that its 90th percentile is

$1{,}000{,}000e^{-0.05p}$ where $p$ is the solution to $\displaystyle\int_{2}^{p} 0.4t^{-2}\,dt = 0.10$.

$$\begin{align*}
\int_{2}^{p} 0.4t^{-2}\,dt &= -0.4\left(\frac{t^{-1}}{-1}\right)\Bigg|_{2}^{p} \\
&= 0.4\left(\frac{1}{2} - \frac{1}{p}\right) \\
&= 0.10 \\
p &= 4
\end{align*}$$

$$\begin{align*}
1{,}000{,}000e^{-0.05 \times 4} &= 81{,}873.08
\end{align*}$$

The answer is **A**.
