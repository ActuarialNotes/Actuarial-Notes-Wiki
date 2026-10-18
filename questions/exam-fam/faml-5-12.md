---
id: "faml-5-12"
exam: "Exam FAM"
topic: "Deferred Annuity"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Deferred+Annuity
  - Concepts/Annuity+Due
  - Concepts/Life+Annuity
  - Concepts/Life+Table
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2fe3c899e7251d10913110f03433f1f1ca4554da09e2402972fd5afa25b8357e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-12.md
---

For a life annuity-due issued to (55), you are given:

i) The annuity pays an annual benefit of $X$ through age 64

ii) Beginning at age 65, the annuity pays 75% of $X$

iii) The present value of this annuity is 250,000

iv) Mortality follows the Standard Ultimate Life Table

v) $i = 0.05$

Calculate $X$.

[Question on October 2022 FAM-L Exam]

- A) 17,400
- B) 17,500
- C) 17,600
- D) 17,700
- E) 17,800

## Explanation

Any of these ways of viewing the benefit structure would be fine; all give the same answer:

(i) A temporary life annuity-due of $X$ plus a deferred life annuity-due of $0.75X$.

(ii) A whole life annuity-due of $0.75X$ plus a temporary deferred life annuity-due of $0.25X$

(iii) A whole life annuity-due of $X$ minus a deferred life annuity-due of $0.25X$

This solution views it the first way.

$$\begin{align*}
X\ddot{a}_{55:\overline{10}|} + 0.75X\ddot{a}_{65} \cdot {}_{10}E_{55} &= 8.0192X + (0.75X)(0.59342)(13.5498) \\
&= 14.05X \\
&= 250{,}000 \\
\Rightarrow X &= 17{,}794
\end{align*}$$

The answer is **E**.
