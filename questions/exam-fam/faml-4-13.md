---
id: "faml-4-13"
exam: "Exam FAM"
topic: "Term Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Term+Life+Insurance
  - Concepts/Life+Table
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a10f7626900c56b6e7b075a06854b11f583ae702baceed9a109f3fefca55091b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-13.md
---

For a 2-year deferred, 2-year term insurance of 2000 on [65], you are given:

(i) The following select and ultimate mortality table with a 3-year select period:

| $x$ | $q_{[x]}$ | $q_{[x]+1}$ | $q_{[x]+2}$ | $q_{x+3}$ | $x+3$ |
|---|---|---|---|---|---|
| 65 | 0.08 | 0.10 | 0.12 | 0.14 | 68 |
| 66 | 0.09 | 0.11 | 0.13 | 0.15 | 69 |
| 67 | 0.10 | 0.12 | 0.14 | 0.16 | 70 |
| 68 | 0.11 | 0.13 | 0.15 | 0.17 | 71 |
| 69 | 0.12 | 0.14 | 0.16 | 0.18 | 72 |

(ii) $i = 0.04$

(iii) The death benefit is payable at the end of the year of death

Calculate the actuarial present value of this insurance.

[Question 9 on the Fall 2015 exam]

- A) 260
- B) 290
- C) 350
- D) 370
- E) 410

## Explanation

$$\begin{align*}
{}_{2|2}A_{65} &= \underbrace{v^{3}}_{\text{payment year 3}}\;\underbrace{{}_{2}p_{[65]}}_{\text{Lives 2 years}} \times \underbrace{q_{[65]+2}}_{\text{Die year 3}} + \underbrace{v^{4}}_{\text{payment year 4}}\;\underbrace{{}_{3}p_{[65]}}_{\text{Lives 3 years}} \times \underbrace{q_{65+3}}_{\text{Die year 4}} \\
&= \left(\frac{1}{1.04}\right)^{3}(0.92)(0.9)(0.12) + \left(\frac{1}{1.04}\right)^{4}(0.92)(0.9)(0.88)(0.14) \\
&= 0.088 + 0.087 \\
&= 0.176
\end{align*}$$

The actuarial present value of this insurance is therefore $2000 \times 0.176 = 352$.

The answer is **C**.
