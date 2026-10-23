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
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:c3cb35ee3ddb0a60354577ce5b05615eac5d2f44abbf44134a3a29253ab63ba0
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q43, p.35, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q43, p.20, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
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
1 = \frac{a}{b} &= \frac{\beta/(1 + \beta)}{(r - 1)\beta/(1 - \beta)}\text{ (as printed)} \\
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
