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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:e319046a0616e7bec60d55dab03a194c0726b2db85165f9e57fff2a85cd3f59b
  sources:
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (LibreTexts/Random), 'The Student t Distribution', Var(T) = n/(n - 2) for n > 2, tending to 1, sha256:6ff2ac51f78d5041cdf14dc24203650bbb08a608351a120f40e498876fd660c7 — https://www.randomservices.org/random/special/Student.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
