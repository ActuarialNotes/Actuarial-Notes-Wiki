---
id: "faml-2-13"
exam: "Exam FAM"
topic: "Parametric Survival Model"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Parametric+Survival+Model
  - Concepts/Life+Table
  - Concepts/Survival+Model
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:80de21e19e00ea1f273394f7d998196bdb9284277eafcfecbda133ea22c09f0d
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q2.13, p.12 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q2.13, p.9 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (Oct 2024), Standard Ultimate Life Table, p.21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-13.md
---

You are given:

i) The Standard Ultimate Life Table follows Makeham's law with parameters $A^{SULT}$, $B^{SULT}$, and $c^{SULT}$.

ii) Mortality follows Makeham's law with parameters $A = 1.035A^{SULT} + 0.01$, $B = 1.035B^{SULT}$, $c = c^{SULT}$.

Calculate $_{4}q_{89}$.

- A) 0.34
- B) 0.35
- C) 0.38
- D) 0.40
- E) 0.44

## Explanation

$$\begin{align*}
\mu_{x} &= 1.035A^{SULT} + 0.01 + 1.035B^{SULT} \times \left(c^{SULT}\right)^{x} \\
&= 1.035\left[A^{SULT} + B^{SULT}\left(c^{SULT}\right)^{x}\right] + 0.01
\end{align*}$$

$$\mu_{x} = 1.035\mu_{x}^{SULT} + 0.01$$

$$\begin{align*}
{}_{4}p_{89} &= \exp\left[-\int_{0}^{4}\left(1.035\mu_{89+t}^{SULT} + 0.01\right)dt\right] \\
&= \exp\left[-1.035\int_{0}^{4}\mu_{89+t}^{SULT}\,dt - \int_{0}^{4}0.01\,dt\right] \\
&= \left[{}_{4}p_{89}^{SULT}\right]^{1.035}e^{-4 \times 0.01} \\
&= \left[\frac{29{,}183.3}{45{,}995.6}\right]^{1.035}(0.96079)\text{ (as printed)} \\
&= 0.59996
\end{align*}$$

$$\begin{align*}
{}_{4}q_{89} &= 1 - 0.59996 \\
&= 0.40004
\end{align*}$$

The answer is **D**.
