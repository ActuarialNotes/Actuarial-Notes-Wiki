---
id: "fams-019"
exam: "Exam FAM"
topic: "Loss Elimination Ratio"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Loss+Elimination+Ratio
  - Concepts/Exponential+Distribution
  - Concepts/Deductible
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:4b7e202c18e33c2c20b8b25b69c1aff94b2c18609d7822e1df1f38db02f4cbed
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q19, p.17, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q19, p.10, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-019.md
---

You are given:

(i) Losses follow an exponential distribution with the same mean in all years.

(ii) The loss elimination ratio this year is 70%.

(iii) The ordinary deductible for the coming year is 4/3 of the current deductible.

Calculate the loss elimination ratio for the coming year.

- A) 70%
- B) 75%
- C) 80%
- D) 85%
- E) 90%

## Explanation

$$\begin{align*}
\text{LER} &= \frac{E(X \wedge d)}{E(X)} \\
&= \frac{\theta(1 - e^{-d/\theta})}{\theta} \\
&= 1 - e^{-d/\theta}
\end{align*}$$

Last year: $0.70 = 1 - e^{-d/\theta} \Rightarrow -d = \theta\log(0.30)$

Next year: $-d_{new} = \theta\log(1 - \text{LER}_{new})$

Hence

$$\begin{align*}
\theta\log(1 - \text{LER}_{new}) &= -d_{new} \\
&= \frac{4}{3}\theta\log(0.30) \\
\log(1 - \text{LER}_{new}) &= -1.6053 \\
(1 - \text{LER}_{new}) &= e^{-1.6053} \\
&= 0.20 \\
\text{LER}_{new} &= 0.80
\end{align*}$$

The answer is **C**.
