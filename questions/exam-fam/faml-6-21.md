---
id: "faml-6-21"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Endowment+Insurance
  - Concepts/Pure+Endowment
  - Concepts/Term+Life+Insurance
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:9ef90d527f82b85889463a2eaabc6023c87f191706bf6f639fdd946f868d9107
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.21, p.66, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.21, p.44, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-21.md
---

For a special fully discrete 15-year endowment insurance on (75), you are given:

(i) The death benefit is 1000

(ii) The endowment benefit is the sum of the net premiums paid without interest

(iii) $d = 0.04$

(iv) $A_{75:\overline{15}|} = 0.70$

(v) $A_{75:\overline{15}|}^{\phantom{75:}1} = 0.11$

Calculate the annual net premium.

[Question 9 on the Fall 2014 exam]

- A) 80
- B) 90
- C) 100
- D) 110
- E) 120

## Explanation

$$P \times \ddot{a}_{75:\overline{15}|} = 1000\left(A^{1}_{75:\overline{15}|} + 15 \times P \times A_{75:\overline{15}|}^{\phantom{75:}1}\right) \text{ (as printed)} \;\rightarrow\; P = \frac{1000\,A^{1}_{75:\overline{15}|}}{\ddot{a}_{75:\overline{15}|} - 15 \times A_{75:\overline{15}|}^{\phantom{75:}1}}$$

$$\begin{align*}
A^{1}_{75:\overline{15}|} &= A_{75:\overline{15}|} - A_{75:\overline{15}|}^{\phantom{75:}1} \\
&= 0.7 - 0.11 \\
&= 0.59
\end{align*}$$

$$\begin{align*}
\ddot{a}_{75:\overline{15}|} &= \frac{1 - A_{75:\overline{15}|}}{d} \\
&= (1 - 0.7)/0.04 \\
&= 7.5
\end{align*}$$

So

$$\begin{align*}
P &= \frac{590}{7.5 - 15(0.11)} \\
&= 100.85
\end{align*}$$

The answer is **C**.
