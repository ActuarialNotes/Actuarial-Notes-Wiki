---
id: "faml-7-02"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Recursion
  - Concepts/Endowment+Insurance
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:c9eba579a45135e3b5a83da5d33fa5d47f0e6a90eadde42484bbc52055a2a250
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.2, p.94, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.2, p.64, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-02.md
---

A special fully discrete 2-year endowment insurance with a maturity value of 2000 is issued to ($x$). The death benefit is 2000 plus the net premium policy value at the end of the year of death. For year 2, the net premium policy value is the net premium policy value just before the maturity benefit is paid.

You are given:

(i) $i = 0.10$

(ii) $q_{x} = 0.150$ and $q_{x+1} = 0.165$

Calculate the level annual net premium.

[A modified version of Question 5 on the Fall 2012 exam]

- A) 1070
- B) 1110
- C) 1150
- D) 1190
- E) 1230

## Explanation

$${}_{0}V = 0$$

$${}_{2}V = 2000$$

Year 1:

$$\begin{align*}
\left({}_{0}V + P\right)(1 + i) &= q_{x}\left(2000 + {}_{1}V\right) + p_{x}\,{}_{1}V \\
P(1.1) &= 0.15(2000 + {}_{1}V) + 0.85({}_{1}V) \\
1.1P - 300 &= {}_{1}V
\end{align*}$$

Year 2:

$$\begin{align*}
\left({}_{1}V + P\right)(1 + i) &= q_{x+1}(2000 + {}_{2}V) + p_{x+1}(2000) \\
(1.1P - 300 + P)(1.1) &= 0.165(2000 + 2000) + 0.835(2000) \\
2.31P - 330 &= 2330
\end{align*}$$

$$\begin{align*}
P &= \frac{2330 + 330}{2.31} \\
&= 1152
\end{align*}$$

The answer is **C**.
