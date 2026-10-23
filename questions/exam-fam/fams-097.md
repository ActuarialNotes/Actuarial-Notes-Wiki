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
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:6dd4cea4b496ca607bd29b8acbb5bc1220c897e64e833bfb48650745de3c5a48
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q97, p.79, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q97, p.38, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
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

First, use the Borhuetter-Ferguson (as printed) method to calculate the estimated ultimate loss as

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
