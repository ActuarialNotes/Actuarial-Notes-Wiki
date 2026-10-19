---
id: "faml-6-54"
exam: "Exam FAM"
topic: "Loss Random Variable"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Loss+Random+Variable
  - Concepts/Variance
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b262345e7fb8ffd5e8fcc8e903940171e77bc9892263544c058a1fb6b71346d0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-54.md
---

For a fully discrete whole life insurance of 200,000 on (45), you are given:

(i) Mortality follows the Standard Ultimate Life Table.

(ii) $i = 0.05$

(iii) The annual premium is determined using the equivalence principle.

Calculate the standard deviation of $L_0$, the present value random variable for the loss at issue.

[A modified version of Question 12 on the Fall 2017 exam]

- A) 25,440
- B) 30,440
- C) 35,440
- D) 40,440
- E) 45,440

## Explanation

On a unit basis,

$$\begin{align*}
Var(L_0) &= \left(1 + \frac{P}{d}\right)^{2}\left[{}^{2}A_{45} - (A_{45})^{2}\right] \\
&= \left(1 + \frac{A_{45}}{d\ddot{a}_{45}}\right)^{2}\left[{}^{2}A_{45} - (A_{45})^{2}\right] \\
&= \left(\frac{d\ddot{a}_{45} + 1 - d\ddot{a}_{45}}{d\ddot{a}_{45}}\right)^{2}\left[{}^{2}A_{45} - (A_{45})^{2}\right] \\
&= \frac{{}^{2}A_{45} - (A_{45})^{2}}{(d\ddot{a})^{2}} \\
&= \frac{0.03463 - 0.15161^{2}}{\left(\dfrac{0.05}{1.05} \times 17.8162\right)^{2}} \\
&= 0.016178038
\end{align*}$$

The standard deviation of $L_0 = 0.127193$

$$(200{,}000)(\text{The standard deviation of } L_0) = 25{,}439$$

The answer is **A**.
