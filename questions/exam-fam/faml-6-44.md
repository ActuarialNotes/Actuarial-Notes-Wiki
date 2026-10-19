---
id: "faml-6-44"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
  - Concepts/Pure+Endowment
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:122832d0417f008c92697bfc8993acacfc1b418e1c212bf57c4c363ffe604f8a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-44.md
---

For a special fully discrete 10-year deferred whole life insurance of 100 on (50), you are given:

(i) Premiums are payable annually, at the beginning of each year, only during the deferral period

(ii) For deaths during the deferral period, the benefit is equal to the return of all premiums paid, without interest

(iii) $i = 0.05$

(iv) $\ddot{a}_{50} = 17.0$

(v) $\ddot{a}_{60} = 15.0$

(vi) $_{10}E_{50} = 0.60$

(vii) $(IA)^{1}_{50:\overline{10}|} = 0.15$

Calculate the annual net premium for this insurance.

[Question 7 on the Spring 2017 exam]

- A) 1.3
- B) 1.6
- C) 1.9
- D) 2.2
- E) 2.5

## Explanation

Let $P$ be the premium per 1 of insurance.

$$P\ddot{a}_{50:\overline{10}|} = P(IA)^{1}_{50:\overline{10}|} + {}_{10}E_{50}A_{60}$$

$$\begin{align*}
\ddot{a}_{50:\overline{10}|} &= \ddot{a}_{50} - {}_{10}E_{50}\,\ddot{a}_{60} \\
&= 17.0 - 0.60 \times 15.0 \\
&= 8
\end{align*}$$

$$\begin{align*}
A_{60} &= 1 - d\ddot{a}_{60} \\
&= 1 - \left(\frac{0.05}{1.05}\right)15 \\
&= 0.285714
\end{align*}$$

$$P\left(\ddot{a}_{50:\overline{10}|} - (IA)^{1}_{50:\overline{10}|}\right) = {}_{10}E_{50}A_{60}$$

$$\begin{align*}
P &= \frac{{}_{10}E_{50}A_{60}}{\ddot{a}_{50:\overline{10}|} - (IA)^{1}_{50:\overline{10}|}} \\
&= \frac{0.6 \times 0.285714}{8 - 0.15} \\
&= 0.021838
\end{align*}$$

$$100P = 2.18$$

The answer is **D**.
