---
id: "fams-081"
exam: "Exam FAM"
topic: "Loss Elimination Ratio"
learning_objective: "Short-Term Insurance and Reinsurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Loss+Elimination+Ratio
  - Concepts/Inflation
  - Concepts/Exponential+Distribution
  - Concepts/Deductible
  - Concepts/Scale+and+Shape+Parameters
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dad03d68c51193b8c4724bf5bf6ddde2a2d058b01cd61b3db8ca72971929d58d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-081.md
---

Annual losses in Year 1 follow an exponential distribution with mean $\theta$. An inflation factor of 20% applies to all Year 2 losses.

The ordinary deductible for Year 1 is $0.25\theta$. The deductible is doubled in Year 2.

Calculate the percentage increase in the loss elimination ratio from Year 1 to Year 2.

- A) 19%
- B) 28%
- C) 37%
- D) 54%
- E) 78%

## Explanation

For Year 1, we have: $E(X) = \theta$,

$$\begin{align*}
E\left(X \wedge 0.25\theta\right) &= \theta\left(1 - e^{-0.25\theta/\theta}\right) \\
&= \theta\left(1 - e^{-0.25}\right)
\end{align*}$$

Therefore,

$$\begin{align*}
LER_1 &= \frac{E\left(X \wedge 0.25\theta\right)}{E(X)} \\
&= 1 - e^{-0.25} \\
&= 0.2212
\end{align*}$$

For Year 2, $E(Y) = 1.20\theta$,

$$\begin{align*}
E\left(Y \wedge 0.5\theta\right) &= 1.2E\left(X \wedge \frac{0.5\theta}{1.20}\right) \\
&= 1.2\theta\left(1 - e^{-5/12}\right)
\end{align*}$$

and

$$\begin{align*}
LER_2 &= \frac{E\left(Y \wedge 0.5\theta\right)}{E(Y)} \\
&= 1 - e^{-5/12} \\
&= 0.34076
\end{align*}$$

$$\begin{align*}
\frac{LER_2}{LER_1} &= \frac{0.34076}{0.22120} \\
&= 1.54 \Rightarrow 54\% \text{ increase}
\end{align*}$$

The answer is **D**.
