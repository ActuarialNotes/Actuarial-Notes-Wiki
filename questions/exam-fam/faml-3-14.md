---
id: "faml-3-14"
exam: "Exam FAM"
topic: "Life Table"
learning_objective: "Mortality Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Life+Table
  - Concepts/Fractional+Age+Assumption
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:ea40faed0509d97750dcd66d27eb29833561d82b054d1279e1ed11bac9ba8317
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q3.14, p.23 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q3.14, p.16 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-14.md
---

You are given the following information from a life table:

| $x$ | $l_{x}$ | $d_{x}$ | $p_{x}$ | $q_{x}$ |
|---|---|---|---|---|
| 95 | - | - | - | 0.40 |
| 96 | - | - | 0.20 | - |
| 97 | - | 72 | - | 1.00 |

You are also given:

(i) $l_{90} = 1000$ and $l_{93} = 825$

(ii) Deaths are uniformly distributed over each year of age.

Calculate the probability that (90) dies between ages 93 and 95.5.

[Question 1 on the Spring 2014 exam]

- A) 0.195
- B) 0.220
- C) 0.345
- D) 0.465
- E) 0.668

## Explanation

We need to determine $_{3|2.5}q_{90}$.

$$\begin{align*}
{}_{3|2.5}q_{90} &= \frac{l_{90+3} - l_{90+3+2.5}}{l_{90}} \\
&= \frac{l_{93} - l_{95.5}}{l_{90}} \\
&= \frac{l_{93} - (l_{95} - 0.5d_{95})}{l_{90}} \\
&= \frac{825 - [600 - 0.5(240)]}{1{,}000} \\
&= 0.3450
\end{align*}$$

where $l_{90} = 1{,}000$, $l_{93} = 825$,

$$\begin{align*}
l_{97} &= \frac{d_{97}}{q_{97}} \\
&= \frac{72}{1} \\
&= 72, \\
l_{96} &= \frac{l_{97}}{p_{96}} \\
&= \frac{72}{0.2} \\
&= 360, \\
l_{95} &= \frac{l_{96}}{p_{95}} \\
&= \frac{360}{1 - 0.4} \\
&= 600,
\end{align*}$$

and

$$\begin{align*}
d_{95} &= l_{95} - l_{96} \\
&= 600 - 360 \\
&= 240.
\end{align*}$$

The answer is **C**.
