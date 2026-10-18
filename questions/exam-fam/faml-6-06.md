---
id: "faml-6-06"
exam: "Exam FAM"
topic: "Portfolio Percentile Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Portfolio+Percentile+Principle
  - Concepts/Future+Loss+Random+Variable
  - Concepts/Normal+Approximation
  - Concepts/Expenses
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:befc4ba0edcdb8039712904a2d40a2548f84b5170bc65bef7b5f58dfd27652e4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-06.md
---

For fully discrete whole life insurance policies of 10,000 issued on 600 lives with independent future lifetimes, each age 62, you are given:

(i) Mortality follows the Standard Ultimate Life Table

(ii) $i = 0.05$

(iii) Expenses of 5% of the first year gross premium are incurred at issue

(iv) Expenses of 5 per policy are incurred at the beginning of each policy year

(v) The gross premium is 103% of the net premium.

(vi) $_{0}L$ is the aggregate present value of future loss at issue random variable

Calculate $\Pr({}_{0}L < 40{,}000)$, using the normal approximation.

[A modified version of Question 15 on the Spring 2013 exam]

- A) 0.75
- B) 0.79
- C) 0.83
- D) 0.87
- E) 0.91

## Explanation

$$\begin{align*}
\text{Net Premium} &= 10{,}000A_{62}/\ddot{a}_{62} \\
&= 10{,}000(0.31495)/14.3861 \\
&= 218.93
\end{align*}$$

$$\begin{align*}
G &= 218.93(1.03) \\
&= 225.50
\end{align*}$$

Let ${}_{0}L^{*}$ be the present value of future loss at issue for one policy.

$$\begin{align*}
{}_{0}L^{*} &= 10{,}000v^{K+1} - (G-5)\ddot{a}_{\overline{K+1}|} + 0.05G \\
&= 10{,}000v^{K+1} - (225.50-5)\frac{1-v^{K+1}}{d} + 0.05(225.50) \\
&= \left(10{,}000 + 4630.50\right)v^{K+1} - 4630.50 + 11.28 \\
&= 14{,}630.50v^{K+1} - 4619.22
\end{align*}$$

$$\begin{align*}
E({}_{0}L^{*}) &= 14{,}630.50A_{62} - 4619.22 \\
&= 14{,}630.50(0.31495) - 4619.22 \\
&= -11.34
\end{align*}$$

$$\begin{align*}
Var({}_{0}L^{*}) &= (14{,}630.50)^{2}\left({}^{2}A_{62} - A_{62}^{2}\right) \\
&= (14{,}630.50)^{2}\left(0.12506 - 0.31495^{2}\right) \\
&= 5{,}536{,}763
\end{align*}$$

Let ${}_{0}L$ be the aggregate loss for 600 such policies.

$$\begin{align*}
E({}_{0}L) &= 600E({}_{0}L^{*}) \\
&= 600(-11.34) \\
&= -6804
\end{align*}$$

$$\begin{align*}
Var({}_{0}L) &= 600Var({}_{0}L^{*}) \\
&= 600(5{,}536{,}763) \\
&= 3{,}322{,}057{,}800
\end{align*}$$

$$\begin{align*}
StdDev({}_{0}L) &= 3{,}322{,}057{,}800^{0.5} \\
&= 57{,}637
\end{align*}$$

$$\begin{align*}
\Pr\left({}_{0}L < 40{,}000\right) &= \Phi\left(\frac{40{,}000 + 6804}{57{,}637}\right) \\
&= \Phi\left(0.81\right) \\
&= 0.7910
\end{align*}$$

The answer is **B**.
