---
id: "faml-7-33"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Endowment+Insurance
  - Concepts/Life+Table
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3b35eb0c8fa78006d11953c63e434d455071d6937dba3aa29a19f2f874d96ffe
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-33.md
---

For a special semi-continuous 20-year endowment insurance on (70), you are given:

i) The death benefit is 1000

ii) The endowment benefit is 500

iii) Mortality follows the Standard Ultimate Life Table

iv) Deaths are uniformly distributed over each year of age

v) The annual net premium is 35.26

vi) $i = 0.05$

Calculate the net premium policy value at the end of year 10.

[Question on October 2022 FAM-L Exam]

- A) 268
- B) 272
- C) 276
- D) 280
- E) 284

## Explanation

$$\begin{align*}
A^{1}_{80:\overline{10}|} &= A_{80:\overline{10}|} - {}_{10}E_{80} \\
&= 0.67674 - 0.33952 \\
&= 0.33722
\end{align*}$$

$$\begin{align*}
\bar{A}^{1}_{80:\overline{10}|} &= \frac{0.05}{\ln(1.05)}\,0.33722 \\
&= 0.34559
\end{align*}$$

$$\begin{align*}
\text{EPV future benefits} &= 1000(0.34559) + 500(0.33952) \\
&= 515.35
\end{align*}$$

$$\begin{align*}
\text{EPV future net premiums} &= \ddot{a}_{80:\overline{10}|}P \\
&= 6.7885(35.26) \\
&= 239.36
\end{align*}$$

$$\begin{align*}
\text{Policy value} &= 515.36 - 239.36 \\
&= 276
\end{align*}$$

The answer is **C**.
