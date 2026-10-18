---
id: "fams-036"
exam: "Exam FAM"
topic: "Loss Elimination Ratio"
learning_objective: "Short-Term Insurance and Reinsurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Loss+Elimination+Ratio
  - Concepts/Inflation
  - Concepts/Pareto+Distribution
  - Concepts/Limited+Expected+Value
  - Concepts/Scale+and+Shape+Parameters
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ab066719382f36c48a62ceb65103054ddffb0c1c7c3472a6355067051daee302
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-036.md
---

Losses in Year 1 follow a Pareto distribution with $\alpha = 2$ and $\theta = 5$.  Losses in Year 2 are uniformly 20% higher than in Year 1.  An insurance covers each loss subject to an ordinary deductible of 10.

Calculate the Loss Elimination Ratio in Year 2.

- A) 0.567
- B) 0.625
- C) 0.667
- D) 0.750
- E) 0.800

## Explanation

A Pareto $(\alpha = 2, \theta = 5)$ distribution with 20% inflation becomes Pareto with $\alpha = 2$, $\theta = 5(1.2) = 6$. In Year 2

$$\begin{align*}
E(X) &= \frac{6}{2 - 1} \\
&= 6 \\
E(X \wedge 10) &= \frac{6}{2 - 1}\left[1 - \left(\frac{6}{10 + 6}\right)^{2 - 1}\right] \\
&= 3.75 \\
E[(X - 10)_+]_+ &= E(X) - E(X \wedge 10) \\
&= 6 - 3.75 - 2.25 \\
\text{LER} &= 1 - \frac{E[(X - 10)_+]}{E(X)} \\
&= 1 - \frac{2.25}{6} \\
&= 0.625
\end{align*}$$

The third line is as the SOA printed it: it means $E[(X - 10)_+] = 6 - 3.75 = 2.25$.

The answer is **B**.
