---
id: "masi-an-069"
exam: "Exam MAS-I"
topic: "Pareto Distribution"
learning_objective: "Statistics"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Pareto+Distribution
  - Concepts/Deductible
  - Concepts/Payment+Random+Variable
answer: "E"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:73e509b6069dfc20f32a1f3d268203e5d4df37a291c706325aa005983e55a3a2
  sources:
    - "CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.2.4.1 Pareto survival (theta/(x+theta))^alpha, PDF p.10, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Frees et al., Loss Data Analytics (open text), ch.3 Modeling Loss Severity, 3.4.1 payment per payment Y^P = X - d given X > d, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Tse, Nonlife Actuarial Models (Cambridge, 2009), publisher preview: table of contents, contents: 2.2 continuous severity distributions, 2.3 mixtures, 2.4 tail properties, 2.5 coverage modifications incl. 2.5.4 inflation, PDF pp.9-10 (contents only; text not read), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-069.md
---

Ground-up losses follow a Pareto distribution with $\alpha = 3$ and $\theta = 2{,}000$:

$$
F(x) = 1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha}, \quad x > 0
$$

A policy has an ordinary deductible of 1,000 and no limit. Which distribution describes the amount paid, $X - 1{,}000$, on a loss that produces a payment?

- A) Pareto with $\alpha = 3$ and $\theta = 1{,}000$
- B) Pareto with $\alpha = 3$ and $\theta = 2{,}000$
- C) Pareto with $\alpha = 2$ and $\theta = 3{,}000$
- D) Exponential with mean 1,500
- E) Pareto with $\alpha = 3$ and $\theta = 3{,}000$

## Explanation

A payment happens only when $X > 1{,}000$, so the payment's survival function is the conditional one:

$$
\begin{align*}
P(X - 1{,}000 > y \mid X > 1{,}000) &= \frac{S(y + 1{,}000)}{S(1{,}000)} \\
&= \left(\frac{3{,}000}{y + 3{,}000}\right)^{3}
\end{align*}
$$

This is again a Pareto survival function, with the same shape $\alpha = 3$ and scale $\theta + d = 3{,}000$. The answer is **E**. Its mean, 3,000/2 = 1,500, is the expected payment per payment — larger than the ground-up mean of 1,000.

**Why not the others**

- **A** — subtracts the deductible from the scale; the scale *grows* by $d$, because a loss that has already passed 1,000 is likely to go further.
- **B** — treats the Pareto as memoryless, which only the exponential is.
- **C** — lowers the shape by one, mixing up the distribution with the mean excess formula $(\theta + d)/(\alpha - 1)$, whose denominator is where the $\alpha - 1$ belongs.
- **D** — has the right mean, 1,500, but the wrong family: the excess of a Pareto keeps its polynomial tail, while an exponential's tail is far lighter.
