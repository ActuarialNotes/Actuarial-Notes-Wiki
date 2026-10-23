---
id: "faml-3-05"
exam: "Exam FAM"
topic: "Fractional Age Assumption"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Fractional+Age+Assumption
  - Concepts/Life+Table
  - Concepts/Standard+Actuarial+Notation
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:97bc91fe5ede2b70d50e109c2be07922cd4e69713b0450f77c966d4cdc86199f
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q3.5, p.16 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q3.5, p.12 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-05.md
---

You are given:

| $x$ | $l_{x}$ |
|---|---|
| 60 | 99,999 |
| 61 | 88,888 |
| 62 | 77,777 |
| 63 | 66,666 |
| 64 | 55,555 |
| 65 | 44,444 |
| 66 | 33,333 |
| 67 | 22,222 |

$a = {}_{3.4|2.5}q_{60}$ assuming a uniform distribution of deaths over each year of age

$b = {}_{3.4|2.5}q_{60}$ assuming a constant force of mortality over each year of age

Calculate $100{,}000(a - b)$.

[Question 25 on the Fall 2013 exam]

- A) –24
- B) 9
- C) 42
- D) 73
- E) 106

## Explanation

Using UDD

$$\begin{align*}
l_{63.4} &= (0.6)66{,}666 + (0.4)(55{,}555) \\
&= 62{,}221.6
\end{align*}$$

$$\begin{align*}
l_{65.9} &= (0.1)(44{,}444) + (0.9)(33{,}333) \\
&= 34{,}444.1
\end{align*}$$

$$\begin{align*}
{}_{3.4|2.5}q_{60} &= \frac{l_{63.4} - l_{65.9}}{l_{60}} \\
&= \frac{62{,}221.6 - 34{,}444.1}{99{,}999} \\
&= 0.277778 \qquad \text{(a)}
\end{align*}$$

Using constant force

$$\begin{align*}
l_{63.4} &= l_{63}\left(\frac{l_{64}}{l_{63}}\right)^{0.4} \\
&= l_{63}^{0.6}\,l_{64}^{0.4} \\
&= \left(66{,}666^{0.6}\right)\left(55{,}555^{0.4}\right) \\
&= 61{,}977.2
\end{align*}$$

$$\begin{align*}
l_{65.9} &= l_{65}^{0.1}\,l_{66}^{0.9} \\
&= \left(44{,}444^{0.1}\right)\left(33{,}333^{0.9}\right) \\
&= 34{,}305.9
\end{align*}$$

$$\begin{align*}
{}_{3.4|2.5}q_{60} &= \frac{61{,}977.2 - 34{,}305.9}{99.999}\text{ (as printed)} \\
&= 0.276716 \qquad \text{(b)}
\end{align*}$$

$$\begin{align*}
100{,}000(a - b) &= 100{,}000(0.277778 - 0.276716) \\
&= 106
\end{align*}$$

The answer is **E**.
