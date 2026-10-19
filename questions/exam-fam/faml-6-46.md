---
id: "faml-6-46"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Deferred+Annuity
  - Concepts/Annuity+Due
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d037bfaf98a8ee07dc6f75d98419bf61372c2266203e3fb57feb7ca023c67644
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-46.md
---

For a special 10-year deferred whole life annuity-due of 300 per year issued to (55), you are given:

(i) Annual premiums are payable for 10 years

(ii) If death occurs during the deferral period, all premiums paid are returned without interest at the end of the year of death

(iii) $\ddot{a}_{55} = 12.2758$

(iv) $\ddot{a}_{55:\overline{10}|} = 7.4575$

(v) $(IA)^{1}_{55:\overline{10}|} = 0.51213$

Calculate the level net premium.

[Question 7 on the Fall 2017 exam]

- A) 195
- B) 198
- C) 201
- D) 204
- E) 208

## Explanation

Let $P$ be the premium per 1 of insurance.

$$P\ddot{a}_{55:\overline{10}|} = 0.51213P + v^{10}\,{}_{10}p_{55}\,\ddot{a}_{65}$$

$$\begin{align*}
\ddot{a}_{55} &= \ddot{a}_{55:\overline{10}|} + v^{10}\,{}_{10}p_{55}\,\ddot{a}_{65} \\
\Rightarrow v^{10}\,{}_{10}p_{55}\,\ddot{a}_{65} &= 12.2758 - 7.4575 \\
&= 4.8183
\end{align*}$$

$$\begin{align*}
7.4575P &= 0.51213P + 4.8183 \\
\Rightarrow P &= 0.693742738
\end{align*}$$

$$300P = 208.12$$

The answer is **E**.
