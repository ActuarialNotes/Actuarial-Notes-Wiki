---
id: "fams-097"
exam: "Exam FAM"
topic: "Bornhuetter-Ferguson Method"
learning_objective: "Pricing and Reserving for Short-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Bornhuetter-Ferguson+Method
  - Concepts/IBNR
  - Concepts/Chain+Ladder+Method
  - Concepts/Expected+Loss+Method
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f917f68359e701beb05956c1ac73a2bfe7f54bfd2399869b64567a307c38313f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-097.md
---

You are given the following information:

(i) Case reserves = 187,047

(ii) Losses paid-to-date = 243,005

(iii) Age-to-ultimate reported loss development factor = 1.08

(iv) IBNR using Bornhuetter-Ferguson method = 47,387

Calculate the absolute difference in the IBNR based on the chain-ladder method and the expected loss ratio method.

- A) 12,983
- B) 43,787
- C) 98,101
- D) 146,754
- E) 175,268

## Explanation

First, use the Borhuetter-Ferguson method to calculate the estimated ultimate loss as

$$\begin{align*}
&\frac{47{,}387}{1 - 1/1.08} \\
&= 639{,}724.5
\end{align*}$$

Next, calculate IBNR under the expected loss ratio method as

$$\begin{align*}
&639{,}724.5 - (187{,}047 + 243{,}005) \\
&= 209{,}672.5
\end{align*}$$

Then, IBNR under the chain-ladder method is

$$\begin{align*}
&(187{,}047 + 243{,}005)(0.08) \\
&= 34{,}404.16
\end{align*}$$

The absolute difference is

$$\begin{align*}
&209{,}672.5 - 34{,}404.16 \\
&= 175{,}268.34
\end{align*}$$

The answer is **E**.
