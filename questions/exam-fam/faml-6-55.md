---
id: "faml-6-55"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Deferred+Annuity
  - Concepts/Term+Life+Insurance
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7aad80fb6941d8ebd6c823a870b149f4ab5f16872550cccb85b10bc178984b4c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-55.md
---

An insurer issues a special 20 payment insurance policy on (45) with the following benefits:

- A death benefit of 1000, payable at the end of year of death, provided death occurs before age 65; and
- An annuity benefit that pays 2500 at the start of each year, starting at age 65

You are given:

i) Level annual premiums of $P$ are paid at the beginning of each year

ii) Premiums are calculated based on the equivalence principle

iii) Mortality follows the Standard Ultimate Life Table

iv) $i = 0.05$

Calculate $P$.

[Question on October 2022 FAM-L Exam]

- A) 872
- B) 896
- C) 920
- D) 944
- E) 968

## Explanation

$$\begin{align*}
\text{EPV(benefits)} &= 1000 \times A^{1}_{45:\overline{20}|} + 2500 \times {}_{20|}\ddot{a}_{45} \\
&= 1000(0.15161 - 0.35994 \times 0.35477) + 2500 \times 0.35994 \times 13.5498 \\
&= 12{,}216.7
\end{align*}$$

$$\begin{align*}
\text{EPV(premiums)} &= P \times (17.8161 - 0.35994 \times 13.5498) \\
&= P \times 12.9391
\end{align*}$$

$$\begin{align*}
P &= \frac{12216.7}{12.9391} \\
&= 944.17
\end{align*}$$

The answer is **D**.
