---
id: "faml-6-34"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Expenses
  - Concepts/Whole+Life+Insurance
  - Concepts/Life+Annuity
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7a320ed7e5ecbcfb7d182fe0cd33e50177b0373998f94131b4796689eed84d50
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-34.md
---

For a fully discrete whole life insurance policy on (61), you are given:

(i) The annual gross premium using the equivalence principle is 500

(ii) Initial expenses, incurred at policy issue, are 15% of the premium

(iii) Renewal expenses, incurred at the beginning of each year after the first, are 3% of the premium

(iv) Mortality follows the Standard Ultimate Life Table

(v) $i = 0.05$

Calculate the amount of the death benefit.

[A modified version of Question 17 on the Spring 2015 exam]

- A) 23,300
- B) 23,400
- C) 23,500
- D) 23,600
- E) 23,700

## Explanation

Let B be the amount of death benefit.

$$\begin{align*}
\text{EPV(Premiums)} &= 500\ddot{a}_{61} \\
&= 500(14.6491) \\
&= 7324.55
\end{align*}$$

$$\begin{align*}
\text{EPV(Benefits)} &= \text{B} \cdot A_{61} \\
&= (0.30243)\text{B}
\end{align*}$$

$$\begin{align*}
\text{EPV(Expenses)} &= (0.12)(500) + (0.03)(500)\ddot{a}_{61} \\
&= (0.12)(500) + (0.03)(7324.55) \\
&= 279.74
\end{align*}$$

$$\begin{align*}
\text{EPV(Premiums)} &= \text{EPV(Benefits)} + \text{EPV(Expenses)} \\
7324.55 &= (0.30243)\text{B} + 279.74 \\
7044.81 &= (0.30243)\text{B} \\
\text{B} &= 23{,}294
\end{align*}$$

The answer is **A**.
