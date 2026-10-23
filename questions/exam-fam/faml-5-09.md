---
id: "faml-5-09"
exam: "Exam FAM"
topic: "Life Annuity"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Life+Annuity
  - Concepts/Annuity+Due
  - Concepts/Life+Table
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:f2802b99a0e7c471eb1348e8652e50d0ca713284bfc36769466e63498d0649e3
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q5.9, p.46 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q5.9, p.31 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-09.md
---

For a select and ultimate mortality model with a one-year select period, you are given:

(i) $p_{[x]} = (1+k)\,p_{x}$, for some constant $k$

(ii) $\ddot{a}_{x:\overline{n}|} = 21.854$

(iii) $\ddot{a}_{[x]:\overline{n}|} = 22.167$

Calculate $k$.

[Question 5 on the Spring 2016 exam]

- A) 0.005
- B) 0.010
- C) 0.015
- D) 0.020
- E) 0.025

## Explanation

$$\begin{align*}
\ddot{a}_{[x]:\overline{n}|} &= 1 + v\,p_{[x]}\,\ddot{a}_{x+1:\overline{n-1}|} \\
&= 1 + (1+k)\left(v\,p_{x}\,\ddot{a}_{x+1:\overline{n-1}|}\right) \\
&= 1 + (1+k)\left(\ddot{a}_{x:\overline{n}|} - 1\right)
\end{align*}$$

Therefore, we have

$$\begin{align*}
k &= \frac{\ddot{a}_{[x]:\overline{n}|} - 1}{\ddot{a}_{x:\overline{n}|} - 1} - 1 \\
&= \frac{21.167}{20.854} - 1 \\
&= 0.015
\end{align*}$$

The answer is **C**.
