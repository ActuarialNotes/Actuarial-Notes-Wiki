---
id: "faml-3-09"
exam: "Exam FAM"
topic: "Normal Approximation"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Normal+Approximation
  - Concepts/Life+Table
  - Concepts/Percentile
  - Concepts/Binomial+Distribution
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5b9e792f42b3adfdc65335a52b62659d0421f7c2c7e4f47a54e165f519de70bb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-09.md
---

A father-son club has 4000 members, 2000 of which are age 20 and the other 2000 are age 45. In 25 years, the members of the club intend to hold a reunion.

You are given:

(i) All lives have independent future lifetimes.

(ii) Mortality follows the Standard Ultimate Life Table.

Using the normal approximation, without the continuity correction, calculate the 99th percentile of the number of surviving members at the time of the reunion.

[A modified version of Question 1 on the Fall 2015 exam]

- A) 3810
- B) 3820
- C) 3830
- D) 3840
- E) 3850

## Explanation

From the SULT, we have:

$$\begin{align*}
{}_{25}p_{20} &= \frac{l_{45}}{l_{20}} \\
&= \frac{99{,}033.9}{100{,}000.0} \\
&= 0.99034
\end{align*}$$

$$\begin{align*}
{}_{25}p_{45} &= \frac{l_{70}}{l_{45}} \\
&= \frac{91{,}082.4}{99{,}033.9} \\
&= 0.91971
\end{align*}$$

The expected number of survivors from the sons is 1980.68 with variance 19.133.

The expected number of survivors from fathers is 1839.42 with variance 147.687.

The total expected number of survivors is therefore 3820.10.

The standard deviation of the total expected number of survivors is therefore

$$\begin{align*}
\sqrt{19.133 + 147.687} &= \sqrt{166.82} \\
&= 12.916
\end{align*}$$

The 99th percentile equals

$$\begin{align*}
3820.10 + (2.326)(12.916) &= 3850
\end{align*}$$

The answer is **E**.
