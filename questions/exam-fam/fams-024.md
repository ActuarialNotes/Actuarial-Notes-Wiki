---
id: "fams-024"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Normal+Approximation
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:542e7a4552f14862887c68b1cbb29c2c850df73286bb6e288934733f70909cb4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-024.md
---

You own a light bulb factory. Your workforce is a bit clumsy – they keep dropping boxes of light bulbs. The boxes have varying numbers of light bulbs in them, and when dropped, the entire box is destroyed.

You are given:

- Expected number of boxes dropped per month: 50
- Variance of the number of boxes dropped per month: 100
- Expected value per box: 200
- Variance of the value per box: 400

You pay your employees a bonus if the value of light bulbs destroyed in a month is less than 8000.

Assuming independence and using the normal approximation, calculate the probability that you will pay your employees a bonus next month.

- A) 0.16
- B) 0.19
- C) 0.23
- D) 0.27
- E) 0.31

## Explanation

$$\begin{align*}
\text{E}(S) &= \text{E}(N)\text{E}(X) \\
&= 50(200) \\
&= 10{,}000 \\
Var(S) &= E(N)Var(X) + E(X)^2Var(N) \\
&= 50(400) + 200^2(100) \\
&= 4{,}020{,}000
\end{align*}$$

$$\begin{align*}
\Pr(S < 8{,}000) &\approx \Pr\left(Z < \frac{8{,}000 - 10{,}000}{\sqrt{4{,}020{,}000}} = -0.998\right) \\
&= 0.16
\end{align*}$$

The answer is **A**.
