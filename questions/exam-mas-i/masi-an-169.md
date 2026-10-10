---
id: "masi-an-169"
exam: "Exam MAS-I"
topic: "Student's t-Distribution"
learning_objective: "Extended Linear Models"
difficulty: easy
type: multiple-choice
bloom: remember
wiki_link:
  - Concepts/Student's+t-Distribution
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e319046a0616e7bec60d55dab03a194c0726b2db85165f9e57fff2a85cd3f59b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-169.md
---

The random variable $T$ has a Student's t-distribution with 6 degrees of freedom. Calculate $\text{Var}(T)$.

- A) 0.667
- B) 1.000
- C) 1.200
- D) 1.500
- E) 12.000

## Explanation

For $n > 2$ degrees of freedom, a $t(n)$ variable has mean 0 and

$$
\begin{align*}
\text{Var}(T) &= \frac{n}{n - 2} \\
&= \frac{6}{4} \\
&= 1.500
\end{align*}
$$

The variance exceeds 1 because the t-distribution has heavier tails than the standard normal; it falls toward 1 as $n$ grows. The answer is **D**.

**Why not the others**

- **A** — inverts the ratio, $(n - 2)/n$, which would make the t-distribution *less* spread out than the normal.
- **B** — the variance of the standard normal, the limit as $n \to \infty$, not the value at 6 degrees of freedom.
- **C** — uses $n/(n - 1) = 6/5$, confusing the degrees-of-freedom adjustment with the sample-variance correction.
- **E** — the variance of a $\chi^2(6)$ variable, 2 × 6 = 12, which is the denominator's building block, not the variance of $T$.
