---
id: "fams-071"
exam: "Exam FAM"
topic: "Bornhuetter-Ferguson Method"
learning_objective: "Pricing and Reserving for Short-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Bornhuetter-Ferguson+Method
  - Concepts/Development+Factor
  - Concepts/Cumulative+Development+Factor
  - Concepts/Chain+Ladder+Method
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c9992f9f1497420d46e061377b8297b7e2b5db1719b6ef06b6babbbe2274dfb6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-071.md
---

You are given the following information:

| Accident Year | Earned Premium | Expected Loss Ratio | Cumulative Loss Payments through Development Month 12 | 24 | 36 | 48 |
|---|---|---|---|---|---|---|
| AY5 | 19,000 | 0.90 | 4,850 | 9,700 | 14,100 | 16,200 |
| AY6 | 20,000 | 0.85 | 5,150 | 10,300 | 14,900 | |
| AY7 | 21,000 | 0.91 | 5,400 | 10,800 | | |
| AY8 | 22,000 | 0.88 | 7,200 | | | |

There is no development past 48 months.

Calculate the indicated loss reserve using the Bornhuetter-Ferguson method and volume-weighted average loss development factors.

- A) 22,600
- B) 23,400
- C) 24,200
- D) 25,300
- E) 26,200

## Explanation

The year-to-year development factors are

$$\begin{align*}
\text{12-24}: \quad &30{,}800/15{,}400 \\
&= 2 \\
\text{24-36}: \quad &29{,}000/20{,}000 \\
&= 1.45 \\
\text{36-48}: \quad &16{,}200/14{,}100 \\
&= 1.149
\end{align*}$$

Then the factor for 24-48 is $1.45(1.149) = 1.666$ and for 12-48 is $2(1.666) = 3.332$. The expected ultimate losses are AY6: $20{,}000(0.85) = 17{,}000$; AY7: $21{,}000(0.91) = 19{,}110$; and AY8: $22{,}000(0.88) = 19{,}360$. The B-F reserves are

$$\begin{align*}
17{,}000(1 - 1/1.149) &= 2205 \\
19{,}110(1 - 1/1.666) &= 7639 \\
19{,}360(1 - 1/3.332) &= 13{,}550
\end{align*}$$

The total is 23,394.

The answer is **B**.
