---
id: "faml-4-09"
exam: "Exam FAM"
topic: "Endowment Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Endowment+Insurance
  - Concepts/Whole+Life+Insurance
  - Concepts/Term+Life+Insurance
  - Concepts/Pure+Endowment
  - Concepts/Expected+Value
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:8aa5b8e99b909b4e378174286fb5fe8579367a58cbc65c29e65edabd352e60a8
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.9, p.30 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.9, p.21 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-09.md
---

You are given:

(i) $A_{35:\overline{15}|} = 0.39$

(ii) $A^{1}_{35:\overline{15}|}\ 0.25$ (as printed)

(iii) $A_{35} = 0.32$

Calculate $A_{50}$.

[Question 4 on the Fall 2014 exam (as printed)

- A) 0.35
- B) 0.40
- C) 0.45
- D) 0.50
- E) 0.55

## Explanation

Item (ii) is printed without its equals sign: it gives $A^{1}_{35:\overline{15}|} = 0.25$.

$$\begin{align*}
A_{35} &= A^{1}_{35:\overline{15}|} + A_{35:\overline{15}|}^{\phantom{35:}1}\,A_{50} \\
0.32 &= 0.25 + 0.14\,A_{50} \\
A_{50} &= \frac{0.07}{0.14} \\
&= 0.50
\end{align*}$$

The answer is **D**.
