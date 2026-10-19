---
id: "fams-043"
exam: "Exam FAM"
topic: "Frequency Distribution"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Frequency+Distribution
  - Concepts/Negative+Binomial+Distribution
  - Concepts/Recursion
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1d8aa23b0ff98679ebee52d2fac751d6890f5e6b7d83be0f9c84f08e21de3695
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-043.md
---

A discrete probability distribution has the following properties:

(i) $p_k = c\left(1 + \dfrac{1}{k}\right)p_{k-1}$ for $k = 1, 2, \ldots$

(ii) $p_0 = 0.5$

Calculate $c$.

- A) 0.06
- B) 0.13
- C) 0.29
- D) 0.35
- E) 0.40

## Explanation

Write (i) as

$$\frac{p_k}{p_{k-1}} = c + \frac{c}{k}$$

This is an $(a, b, 0)$ distribution with $a = b = c$.

Which?

1. If Poisson, $a = 0$, so $b = 0$ and thus $p_0 = 0.5$ and $p_1 = p_2 = \cdots = 0$. The probabilities do not sum to 1 and so not Poisson.
2. If Geometric, $b = 0$, so $a = 0$. By same reasoning as #1, not Geometric.
3. If binomial, $a$ and $b$ have opposite signs.  But here $a = b$, so not binomial.
4. Thus negative binomial.

$$\begin{align*}
1 = \frac{a}{b} &= \frac{\beta/(1 + \beta)}{(r - 1)\beta/(1 - \beta)} \\
&= \frac{1}{r - 1}
\end{align*}$$

so, $r = 2$.

$$\begin{align*}
p_0 = 0.5 &= (1 + \beta)^{-r} \\
&= (1 + \beta)^{-2} \\
\Rightarrow \beta &= \sqrt{2} - 1 \\
&= 0.414 \\
c = a &= \beta/(1 + \beta) \\
&= 0.29
\end{align*}$$

The answer is **C**.
