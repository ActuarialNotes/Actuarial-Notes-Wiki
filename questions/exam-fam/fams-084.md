---
id: "fams-084"
exam: "Exam FAM"
topic: "Frequency Distribution"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Frequency+Distribution
  - Concepts/Poisson+Distribution
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:00fcad30c55ff49f9b91c3c07bf5695a3802e5208fd0405f655d60c99ef49bde
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-084.md
---

You are given the following properties of the distribution of the annual number of claims, $N$:

i) $P(N = k) = p_k$, $\quad k = 0, 1, 2, \ldots$

ii) $p_0 = 0.45$

iii) $\dfrac{p_n}{p_m} = \dfrac{m!}{n!}$ $\quad$ for $m \ge 1$ and $n \ge 1$

Calculate the probability that at least two claims occur during a year.

- A) 0.16
- B) 0.18
- C) 0.21
- D) 0.23
- E) 0.26

## Explanation

Members of the $(a, b, 1)$ class have $\dfrac{p_k}{p_{k-1}} = a + \dfrac{b}{k}$ for $k = 2, 3, 4, \ldots$, so point iii) implies that $N$ is an $(a, b, 1)$ distribution with $a = 0$ and $b = \lambda = 1$. This, together with point ii), implies the distribution is a zero-modified Poisson distribution with $p_0^M = 0.45$.

$$\begin{align*}
P(N \ge 2) &= 1 - P(N \le 1) \\
&= 1 - \left(P(N = 0) + P(N = 1)\right) \\
&= 1 - \left(0.45 + \frac{1 - p_0^M}{1 - P(L = 0)}P(L = 1)\right),
\end{align*}$$

where $L$ has a Poisson distribution with $\lambda = 1$ and $P(L = 0) = P(L = 1) = e^{-1}$, so

$$\begin{align*}
P(N \ge 2) &= 1 - \left(0.45 + \frac{0.55}{1 - e^{-1}}e^{-1}\right) \\
&= 0.2299
\end{align*}$$

The answer is **D**.
