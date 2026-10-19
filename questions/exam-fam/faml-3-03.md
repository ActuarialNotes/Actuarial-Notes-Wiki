---
id: "faml-3-03"
exam: "Exam FAM"
topic: "Life Table"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Life+Table
  - Concepts/Fractional+Age+Assumption
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8da9466c04d166345b5674419226eac54dd22fb8f26c308c805ab23721a6b2f2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-03.md
---

You are given:

(i) An excerpt from a select and ultimate life table with a select period of 2 years:

| $x$ | $l_{[x]}$ | $l_{[x]+1}$ | $l_{x+2}$ | $x+2$ |
|---|---|---|---|---|
| 50 | 99,000 | 96,000 | 93,000 | 52 |
| 51 | 97,000 | 93,000 | 89,000 | 53 |
| 52 | 93,000 | 88,000 | 83,000 | 54 |
| 53 | 90,000 | 84,000 | 78,000 | 55 |

(ii) Deaths are uniformly distributed over each year of age

Calculate $10{,}000\;{}_{2.2}q_{[51]+0.5}$.

[Question 3 on the Fall 2013 exam]

- A) 705
- B) 709
- C) 713
- D) 1070
- E) 1074

## Explanation

$${}_{2.2}q_{[51]+0.5} = \frac{l_{[51]+0.5} - l_{53.7}}{l_{[51]+0.5}}$$

$$\begin{align*}
l_{[51]+0.5} &= 0.5l_{[51]} + 0.5l_{[51]+1} \\
&= 0.5(97{,}000) + 0.5(93{,}000) \\
&= 95{,}000
\end{align*}$$

$$\begin{align*}
l_{53.7} &= 0.3l_{53} + 0.7l_{54} \\
&= 0.3(89{,}000) + 0.7(83{,}000) \\
&= 84{,}800
\end{align*}$$

$$\begin{align*}
{}_{2.2}q_{[51]+0.5} &= \frac{95{,}000 - 84{,}800}{95{,}000} \\
&= 0.1074
\end{align*}$$

$$10{,}000\;{}_{2.2}q_{[51]+0.5} = 1{,}074$$

The answer is **E**.
