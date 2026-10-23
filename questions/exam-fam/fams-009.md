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
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:f920dee72048f672f60d945e913a2e48f45a2492da2ed6fe6d324802c49cd154
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q9, p.8, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q9, p.5, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
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
