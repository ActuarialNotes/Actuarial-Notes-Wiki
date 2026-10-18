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
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:84b0cf1d1c7f3dbc07ea6616f03678dfff6bfb02efe3832ae26de943a5c61211
  sources: []
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
{}_{3.4|2.5}q_{60} &= \frac{61{,}977.2 - 34{,}305.9}{99.999} \\
&= 0.276716 \qquad \text{(b)}
\end{align*}$$

$$\begin{align*}
100{,}000(a - b) &= 100{,}000(0.277778 - 0.276716) \\
&= 106
\end{align*}$$

The answer is **E**.
