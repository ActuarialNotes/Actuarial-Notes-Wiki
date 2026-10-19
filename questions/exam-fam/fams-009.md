---
id: "fams-009"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Grouped+Data
  - Concepts/Exponential+Distribution
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f920dee72048f672f60d945e913a2e48f45a2492da2ed6fe6d324802c49cd154
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-009.md
---

You are given:

(i) Losses follow an exponential distribution with mean $\theta$.

(ii) A random sample of 20 losses is distributed as follows:

| Loss Range | Frequency |
|---|---|
| [0, 1000] | 7 |
| (1000, 2000] | 6 |
| (2000, $\infty$) | 7 |

Calculate the maximum likelihood estimate of $\theta$.

- A) Less than 1950
- B) At least 1950, but less than 2100
- C) At least 2100, but less than 2250
- D) At least 2250, but less than 2400
- E) At least 2400

## Explanation

$$\begin{align*}
L &= F(1000)^7[F(2000) - F(1000)]^6[1 - F(2000)]^7 \\
&= (1 - e^{-1000/\theta})^7(e^{-1000/\theta} - e^{-2000/\theta})^6(e^{-2000/\theta})^7 \\
&= (1-p)^7(p-p^2)^6(p^2)^7 \\
&= p^{20}(1-p)^{13}
\end{align*}$$

where $p = e^{-1000/\theta}$. The maximum occurs at $p = 20/33$ and so

$$\begin{align*}
\hat{\theta} &= -1000/\ln(20/33) \\
&= 1996.90
\end{align*}$$

The answer is **B**.
