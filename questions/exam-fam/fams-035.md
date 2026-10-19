---
id: "fams-035"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Limited+Expected+Value
  - Concepts/Pareto+Distribution
  - Concepts/Deductible
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0d7abf9284afac9050e991216398064ec110896c8e2d0712c53ec6ec5d3d54e4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-035.md
---

The number of annual losses has a Poisson distribution with a mean of 5.  The size of each loss has a Pareto distribution with $\theta = 10$ and $\alpha = 2.5$.  An insurance policy for the losses has an ordinary deductible of 5 per loss.

Calculate the expected value of the aggregate annual payments for this policy.

- A) 8
- B) 13
- C) 18
- D) 23
- E) 28

## Explanation

Let $X$ be the loss random variable. Then, $(X - 5)_+$ is the claim random variable.

$$\begin{align*}
E(X) &= \frac{10}{2.5 - 1} \\
&= 6.667 \\
E(X \wedge 5) &= \left(\frac{10}{2.5 - 1}\right)\left[1 - \left(\frac{10}{5 + 10}\right)^{2.5 - 1}\right] \\
&= 3.038 \\
E[(X - 5)_+] &= E(X) - E(X \wedge 5) \\
&= 6.667 - 3.038 \\
&= 3.629
\end{align*}$$

$$\begin{align*}
\text{Expected aggregate claims} &= E(N)E[(X - 5)_+] \\
&= 5(3.629) \\
&= 18.15
\end{align*}$$

The answer is **C**.
