---
id: "fams-094"
exam: "Exam FAM"
topic: "Bornhuetter-Ferguson Method"
learning_objective: "Pricing and Reserving for Short-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Bornhuetter-Ferguson+Method
  - Concepts/Chain+Ladder+Method
  - Concepts/Expected+Loss+Method
  - Concepts/Development+Factor
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ca7fa86fee92f1ca51450f40d4720524e582f7cb87ac28e3fbe05c902dbdbf48
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-094.md
---

An actuary is establishing reserves for a group of policies as of December 31, CY3. You are given the following table of reserve estimates for AY1 and AY2:

| | Reserve estimates as of December 31, CY3 | | |
|---|---|---|---|
| | $R_{BF}$ | $R_{LR}$ | $R_{CL}$ |
| AY1 | 400,000 | 250,000 | 437,500 |
| AY2 | 1,120,000 | 1,200,000 | 1,050,000 |

where $R_{BF}$ is the loss reserve under the Bornhuetter-Ferguson method, $R_{LR}$ is the loss reserve under the Expected Loss Ratio method, and $R_{CL}$ is the loss reserve under the Chain Ladder method.

Calculate $f_2$, the loss development factor from the paid-loss-development triangle at duration 2.

- A) 1.250
- B) 1.500
- C) 1.875
- D) 2.150
- E) 2.500

## Explanation

$$R_{BF} = \left(1 - \frac{1}{f}\right)R_{LR} + \frac{1}{f}R_{CL}$$

For AY1:

$$\begin{align*}
400{,}000 &= \left(1 - \frac{1}{f}\right)250{,}000 + \frac{1}{f}437{,}500 \\
\Rightarrow f &= 1.25 \\
&= \prod_{j=3}^{\infty} f_j
\end{align*}$$

For AY2:

$$\begin{align*}
1{,}120{,}000 &= \left(1 - \frac{1}{f}\right)1{,}200{,}000 + \frac{1}{f}1{,}050{,}000 \\
\Rightarrow f &= 1.875 \\
&= \prod_{j=2}^{\infty} f_j
\end{align*}$$

$$\begin{align*}
f_2 &= \frac{1.875}{1.25} \\
&= 1.5
\end{align*}$$

The answer is **B**.
