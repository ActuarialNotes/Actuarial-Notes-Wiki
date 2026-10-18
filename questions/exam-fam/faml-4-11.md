---
id: "faml-4-11"
exam: "Exam FAM"
topic: "Endowment Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Endowment+Insurance
  - Concepts/Term+Life+Insurance
  - Concepts/Pure+Endowment
  - Concepts/Variance
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:29e45828c09d439519eb88bcd3daee8af234264bde348f0dc75647c163fda6c5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-11.md
---

You are given:

(i) $Z_{1}$ is the present value random variable for an $n$-year term insurance of 1000 issued to $(x)$

(ii) $Z_{2}$ is the present value random variable for an $n$-year endowment insurance of 1000 issued to $(x)$

(iii) For both $Z_{1}$ and $Z_{2}$ the death benefit is payable at the end of the year of death

(iv) $E[Z_{1}] = 528$

(v) $Var(Z_{2}) = 15{,}000$

(vi) $A_{x:\overline{n}|}^{\phantom{x:}1} = 0.209$

(vii) ${}^{2}A_{x:\overline{n}|}^{\phantom{x:}1} = 0.136$

Calculate $Var(Z_{1})$.

[Question 5 on the Spring 2015 exam]

- A) 143,400
- B) 177,500
- C) 211,200
- D) 245,300
- E) 279,300

## Explanation

Here $A^{1}_{x:\overline{n}|}$ is the term insurance and $A_{x:\overline{n}|}^{\phantom{x:}1}$ the pure endowment.

$$\begin{align*}
Var(Z_{2}) &= (1000)^{2}\left[{}^{2}A_{x:\overline{n}|} - \left(A_{x:\overline{n}|}\right)^{2}\right] \\
&= 15{,}000
\end{align*}$$

$$\begin{align*}
Var(Z_{2}) &= (1000)^{2}\left({}^{2}A^{1}_{x:\overline{n}|} + {}^{2}A_{x:\overline{n}|}^{\phantom{x:}1}\right) - (1000)^{2}\left[A^{1}_{x:\overline{n}|} + A_{x:\overline{n}|}^{\phantom{x:}1}\right]^{2} \\
&= (1000)^{2}\,{}^{2}A^{1}_{x:\overline{n}|} + (1000)^{2}\,{}^{2}A_{x:\overline{n}|}^{\phantom{x:}1} - (1000)^{2}\left(A^{1}_{x:\overline{n}|}\right)^{2} - (1000)^{2}\left(A_{x:\overline{n}|}^{\phantom{x:}1}\right)^{2} - 2(1000)^{2}\left(A^{1}_{x:\overline{n}|}\right)\left(A_{x:\overline{n}|}^{\phantom{x:}1}\right) \\
&= (1000)^{2}\left[{}^{2}A^{1}_{x:\overline{n}|} - \left(A^{1}_{x:\overline{n}|}\right)^{2}\right] + \left(1000^{2}\,{}^{2}A_{x:\overline{n}|}^{\phantom{x:}1}\right) - \left(1000A_{x:\overline{n}|}^{\phantom{x:}1}\right)^{2} - \left(1000A^{1}_{x:\overline{n}|}\right)^{2} - (2)\left(1000A^{1}_{x:\overline{n}|}\right)\left(1000A_{x:\overline{n}|}^{\phantom{x:}1}\right) \\
&= V(Z_{1}) + (1000)\left(1000\,{}^{2}A_{x:\overline{n}|}^{\phantom{x:}1}\right) - \left(1000A_{x:\overline{n}|}^{\phantom{x:}1}\right)^{2} - \left(1000A^{1}_{x:\overline{n}|}\right)^{2} - (2)\left(1000A^{1}_{x:\overline{n}|}\right)\left(1000A_{x:\overline{n}|}^{\phantom{x:}1}\right)
\end{align*}$$

$$\begin{align*}
15{,}000 &= Var(Z_{1}) + (1000)(136) - (209)^{2} - 2(528)(209)
\end{align*}$$

Therefore,

$$\begin{align*}
Var(Z_{1}) &= 15{,}000 - 136{,}000 + 43{,}681 + 220{,}704 \\
&= 143{,}385.
\end{align*}$$

The answer is **A**.
