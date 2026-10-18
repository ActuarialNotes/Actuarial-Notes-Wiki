---
id: "faml-6-01"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Term+Life+Insurance
  - Concepts/Premium
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:075bff714bbf1bab84be6334ddd4ab5b06d481ddcaf424f73b191044e5cfcef3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-01.md
---

You are given the following information about a special fully discrete 2-payment, 2-year term insurance on (80):

(i) Mortality follows the Standard Ultimate Life Table

(ii) $i = 0.03$

(iii) The death benefit is 1000 plus a return of all premiums paid without interest

(iv) Level premiums are calculated using the equivalence principle

Calculate the net premium for this special insurance.

[A modified version of Question 22 on the Fall 2012 exam]

- A) 32
- B) 33
- C) 34
- D) 35
- E) 36

## Explanation

The equation of value is given by

Actuarial Present Value of Premiums = Actuarial Present Value of Death Benefits.

The death benefit in the first year is $1000 + P$. The death benefit in the second year is $1000 + 2P$.

The formula is $P\ddot{a}_{80:\overline{2}|} = 1000A^{1}_{80:\overline{2}|} + P(IA)^{1}_{80:\overline{2}|}$.

Solving for $P$ we obtain $P = \dfrac{1000A^{1}_{80:\overline{2}|}}{\ddot{a}_{80:\overline{2}|} - (IA)^{1}_{80:\overline{2}|}}$.

$$\begin{align*}
\ddot{a}_{80:\overline{2}|} &= 1 + p_{80}v \\
&= 1 + \frac{0.967342}{1.03} \\
&= 1.93917
\end{align*}$$

$$\begin{align*}
1000A^{1}_{80:\overline{2}|} &= 1000\left(vq_{80} + v^{2}p_{80}q_{81}\right) \\
&= 1000\left(\frac{0.032658}{1.03} + \frac{(0.967342)(0.036607)}{1.03^{2}}\right) \\
&= 65.08552
\end{align*}$$

$$\begin{align*}
(IA)^{1}_{80:\overline{2}|} &= vq_{80} + 2v^{2}p_{80}q_{81} \\
&= \frac{0.032658}{1.03} + (2)\frac{(0.967342)(0.036607)}{1.03^{2}} \\
&= 0.09846
\end{align*}$$

$$\begin{align*}
P &= \frac{65.08552}{1.93917 - 0.09846} \\
&= 35.36
\end{align*}$$

The answer is **D**.
