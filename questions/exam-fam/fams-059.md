---
id: "fams-059"
exam: "Exam FAM"
topic: "Limited Expected Value"
learning_objective: "Short-Term Insurance and Reinsurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Limited+Expected+Value
  - Concepts/Deductible
  - Concepts/Coinsurance
  - Concepts/Poisson+Distribution
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:345030857c73ee10c705b119e71bb2d57f94fed265ad80467b993061c2ec9a4b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-059.md
---

A risk has a loss amount that has a Poisson distribution with mean 3.

An insurance policy covers the risk with an ordinary deductible of 2. An alternative insurance policy replaces the deductible with coinsurance $\alpha$, which is the proportion of the loss paid by the policy, so that the expected cost remains the same.

Calculate $\alpha$.

- A) 0.22
- B) 0.27
- C) 0.32
- D) 0.37
- E) 0.42

## Explanation

$$\begin{align*}
E(X \wedge 2) &= 1f(1) + 2[1 - F(1)] \\
&= 1f(1) + 2[1 - f(0) - f(1)] \\
&= 1(3e^{-3}) + 2(1 - e^{-3} - 3e^{-3}) \\
&= 2 - 5e^{-3} \\
&= 1.75
\end{align*}$$

Cost per loss with deductible is

$$\begin{align*}
E(X) - E(X \wedge 2) &= 3 - 1.75 \\
&= 1.25
\end{align*}$$

Cost per loss with coinsurance is $\alpha E(X) = 3\alpha$.

Equating cost: $3\alpha = 1.25 \Rightarrow \alpha = 0.42$.

The answer is **E**.
