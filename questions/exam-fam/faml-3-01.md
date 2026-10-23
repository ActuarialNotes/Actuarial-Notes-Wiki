---
id: "faml-3-01"
exam: "Exam FAM"
topic: "Life Table"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Life+Table
  - Concepts/Fractional+Age+Assumption
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:daf7953e6bfe5123878f0636f019262cb664bc29ce4fb0dab0eec58942f308d8
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q3.1, p.13 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q3.1, p.10 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-01.md
---

You are given:

(i) An excerpt from a select and ultimate life table with a select period of 3 years:

| $x$ | $l_{[x]}$ | $l_{[x]+1}$ | $l_{[x]+2}$ | $l_{x+3}$ | $x+3$ |
|---|---|---|---|---|---|
| 60 | 80,000 | 79,000 | 77,000 | 74,000 | 63 |
| 61 | 78,000 | 76,000 | 73,000 | 70,000 | 64 |
| 62 | 75,000 | 72,000 | 69,000 | 67,000 | 65 |
| 63 | 71,000 | 68,000 | 66,000 | 65,000 | 66 |

(ii) Deaths follow a constant force of mortality over each year of age

Calculate $1000\;{}_{2|3}q_{[60]+0.75}$.

[Question 2 on the Fall 2012 exam]

- A) 104
- B) 117
- C) 122
- D) 135
- E) 142

## Explanation

Under constant force over each year of age, $l_{x+k} = (l_{x})^{1-k}(l_{x+1})^{k}$ for $x$ an integer and $0 \le k \le 1$.

$${}_{2|3}q_{[60]+0.75} = \frac{l_{[60]+2.75} - l_{[60]+5.75}}{l_{[60]+0.75}}$$

$$\begin{align*}
l_{[60]+0.75} &= (80{,}000)^{0.25}(79{,}000)^{0.75} \\
&= 79{,}249
\end{align*}$$

$$\begin{align*}
l_{[60]+2.75} &= (77{,}000)^{0.25}(74{,}000)^{0.75} \\
&= 74{,}739
\end{align*}$$

$$\begin{align*}
l_{[60]+5.75} &= (67{,}000)^{0.25}(65{,}000)^{0.75} \\
&= 65{,}494
\end{align*}$$

$$\begin{align*}
{}_{2|3}q_{[60]+0.75} &= \frac{l_{[60]+2.75} - l_{[60]+5.75}}{l_{[60]+0.75}} \\
&= \frac{74{,}739 - 65{,}494}{79{,}249} \\
&= 0.11679\text{ (as printed)}
\end{align*}$$

$$1000\;{}_{2|3}q_{[60]+0.75} = 116.8\text{ (as printed)}$$

The answer is **B**.
