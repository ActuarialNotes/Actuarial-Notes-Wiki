---
id: "faml-7-21"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Deferred+Annuity
  - Concepts/Equivalence+Principle
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4b1894bf3bd9dc1f68aeeac6d27517a1d5d27153ebf71f85315b7677c6c63ec4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-21.md
---

A special fully discrete 10-payment 10-year deferred whole life annuity-due on (55) of 1000 per year provides for a return of premiums without interest in the event of death within the first 10 years. You are given:

(i) Annual net premiums are level

(ii) Mortality follows the Standard Ultimate Life Table

(iii) $i = 0.05$

(iv) $(IA)^{1}_{55:\overline{10}|} = 0.14743$

Calculate $_{9}V$, the net premium policy value at the end of year 9.

[A modified version of Question 16 on the Fall 2015 exam]

- A) 11,540
- B) 11,650
- C) 11,760
- D) 11,870
- E) 11,980

## Explanation

$$\begin{align*}
\pi &= \frac{1000\;{}_{10|}\ddot{a}_{55}}{\ddot{a}_{55:\overline{10}|} - (IA)^{1}_{55:\overline{10}|}} \\
&= \frac{1000(0.59342)(13.5498)}{8.0192 - 0.14743} \\
&= 1021.46
\end{align*}$$

$$\begin{align*}
{}_{9}V &= 1000\;{}_{1|}\ddot{a}_{64} + 10\pi A^{1}_{64:\overline{1}|} - \pi\ddot{a}_{64:\overline{1}|} \\
&= 1000\,\frac{1}{1.05}\left(\frac{94{,}579.7}{95{,}082.5}\right)13.5498 + 10(1021.46)\frac{1}{1.05}(0.005288) - 1021.46 \\
&= 11{,}866
\end{align*}$$

The answer is **D**.
