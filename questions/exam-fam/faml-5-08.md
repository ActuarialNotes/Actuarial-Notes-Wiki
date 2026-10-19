---
id: "faml-5-08"
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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:59dc6a70b02bf21430189fba8792d58c372936a86201c65cbfe8b6d813ee66be
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-08.md
---

For an annual whole life annuity-due of 1 with a 5-year certain period on (55), you are given:

(i) Mortality follows the Standard Ultimate Life Table

(ii) $i = 0.05$

Calculate the probability that the sum of the undiscounted payments actually made under this annuity will exceed the expected present value, at issue, of the annuity.

[A modified version of Question 6 on the Spring 2017 exam]

- A) 0.88
- B) 0.90
- C) 0.92
- D) 0.94
- E) 0.96

## Explanation

The expected present value is:

$$\begin{align*}
\ddot{a}_{\overline{5}|} + {}_{5}E_{55}\,\ddot{a}_{60} &= 4.54595 + 0.77382 \times 14.9041 \\
&= 16.07904
\end{align*}$$

The probability that the sum of the undiscounted payments will exceed the expected present value is the probability that at least 17 payments will be made. This will occur if (55) survives to age 71. The probability is therefore:

$$\begin{align*}
{}_{16}p_{55} &= \frac{l_{71}}{l_{55}} \\
&= \frac{90{,}134.0}{97{,}846.2} \\
&= 0.92118
\end{align*}$$

The answer is **C**.
