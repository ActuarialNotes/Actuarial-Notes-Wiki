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
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:00fcad30c55ff49f9b91c3c07bf5695a3802e5208fd0405f655d60c99ef49bde
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q84, p.66, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q84, p.33, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
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
