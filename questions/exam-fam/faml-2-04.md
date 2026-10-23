---
id: "faml-2-04"
exam: "Exam FAM"
topic: "Future Lifetime Random Variable"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Future+Lifetime+Random+Variable
  - Concepts/Survival+Model
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:648734aec3cdde7065fc50b74fea7fec7cdffda7675ec820eec4840ba14a3e5a
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q2.4, p.7 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q2.4, p.6 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-04.md
---

You are given $_{t}q_{0} = \dfrac{t^{2}}{10{,}000}$ for $0 < t < 100$.

Calculate $\mathring{e}_{75:\overline{10}|}$.

- A) 6.6
- B) 7.0
- C) 7.4
- D) 7.8
- E) 8.2

## Explanation

$$\mathring{e}_{75:\overline{10}|} = \int_{t=0}^{t=10} {}_{t}p_{75}\,dt$$

where

$$\begin{align*}
{}_{t}p_{x} &= \frac{{}_{t+x}p_{0}}{{}_{x}p_{0}} \\
&= \frac{1 - \frac{(t+x)^{2}}{10000}}{1 - \frac{x^{2}}{10000}} \\
&= \frac{10000 - (t+x)^{2}}{10000 - x^{2}} \quad \text{for } 0 < t < 100 - x
\end{align*}$$

$$\begin{align*}
\mathring{e}_{75:\overline{10}|} &= \int_{0}^{10} \frac{10000 - 75^{2} - 150t - t^{2}}{10000 - 75^{2}}\,dt \\
&= \frac{1}{4375} \cdot \left[4375t - 75t^{2} - \frac{t^{3}}{3}\right]_{t=0}^{t=10} \\
&= 8.21
\end{align*}$$

The answer is **E**.
