---
id: "faml-4-03"
exam: "Exam FAM"
topic: "Endowment Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Endowment+Insurance
  - Concepts/Interest+Rate
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5b53eebd57e7a87bbb0e5de95821640ec5f51b6ad8b3dea48337d937729e93bb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-03.md
---

You are given:

(i) $q_{60} = 0.01$

(ii) Using $i = 0.05$, $A_{60:\overline{3}|} = 0.86545$

Using $i = 0.045$ calculate $A_{60:\overline{3}|}$.

[Question 7 on the Spring 2013 exam]

- A) 0.866
- B) 0.870
- C) 0.874
- D) 0.878
- E) 0.882

## Explanation

$$\begin{align*}
A_{60:\overline{3}|} &= q_{60}v + (1 - q_{60})q_{60+1}v^{2} + (1 - q_{60})(1 - q_{60+1})v^{3} \\
&= 0.86545
\end{align*}$$

$$\begin{align*}
q_{60+1} &= \frac{A_{60:\overline{3}|} - q_{60}v - (1 - q_{60})v^{3}}{(1 - q_{60})v^{2} - (1 - q_{60})v^{3}} \\
&= \frac{0.86545 - \dfrac{0.01}{1.05} - \dfrac{0.99}{1.05^{3}}}{\dfrac{0.99}{1.05^{2}} - \dfrac{0.99}{1.05^{3}}} \\
&= 0.017
\end{align*}$$

when $v = 1/1.05$.

The primes indicate calculations at 4.5% interest.

$$\begin{align*}
A'_{60:\overline{3}|} &= q_{60}v' + (1 - q_{60})q_{60+1}v'^{2} + (1 - q_{60})(1 - q_{60+1})v'^{3} \\
&= \frac{0.01}{1.045} + \frac{0.99(0.017)}{1.045^{2}} + \frac{0.99(0.983)}{1.045^{3}} \\
&= 0.87777
\end{align*}$$

The answer is **D**.
