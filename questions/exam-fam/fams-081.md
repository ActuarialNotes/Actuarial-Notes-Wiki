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
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:dad03d68c51193b8c4724bf5bf6ddde2a2d058b01cd61b3db8ca72971929d58d
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q81, p.63, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q81, p.32, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
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
