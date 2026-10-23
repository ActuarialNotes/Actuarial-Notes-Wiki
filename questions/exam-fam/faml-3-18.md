---
id: "faml-3-18"
exam: "Exam FAM"
topic: "Fractional Age Assumption"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Fractional+Age+Assumption
  - Concepts/Hazard+Rate
  - Concepts/Life+Table
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:b675f67d031efb260bae7b7961af54c5ec79f4310c131606bfd1b0dd2c4a04ee
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q3.18, p.25 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q3.18, p.17 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (Oct 2024), Standard Ultimate Life Table, p.21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-18.md
---

You are given:

(i) Mortality follows the Standard Ultimate Life Table.

(ii) Deaths are uniformly distributed over each year of age.

Calculate $1000\dfrac{d}{dt}\mu_{100+t}$ at $t = 0.10$.

- A) 90
- B) 150
- C) 300
- D) 340
- E) 390

## Explanation

Under UDD,

$$\begin{align*}
\mu_{100+t} &= \frac{q_{100}}{1 - tq_{100}} \\
&= q_{100}(1 - tq_{100})^{-1}.
\end{align*}$$

The required derivative is,

$$\begin{align*}
1000\frac{d}{dt}\mu_{100+t} &= 1000q_{100}(-1)(1 - tq_{100})^{-2}(-q_{100}) \\
&= 1000\left(\frac{q_{100}}{1 - tq_{100}}\right)^{2}.
\end{align*}$$

At $t = 0.10$ the derivative is

$$\begin{align*}
1000\left(\frac{0.289584}{1 - 0.1(0.289584)}\right)^{2} &= 89.
\end{align*}$$

The answer is **A**.
