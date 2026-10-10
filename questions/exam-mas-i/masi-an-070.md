---
id: "masi-an-070"
exam: "Exam MAS-I"
topic: "Pareto Distribution"
learning_objective: "Statistics"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Pareto+Distribution
  - Concepts/Limited+Expected+Value
  - Concepts/Loss+Elimination+Ratio
  - Concepts/Tail+Weight
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:aa77a58be89922f6f9cd1f4914ccb9c0f4ac938a0c6b5b7e43830d5e031f320b
  sources:
    - "CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.2.4.1 Pareto E[X^x], PDF p.10, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Frees et al., Loss Data Analytics (open text), ch.3 Modeling Loss Severity, 3.4.1 E(Y^L) = E(X) - E(X^d); LER, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Tse, Nonlife Actuarial Models (Cambridge, 2009), publisher preview: table of contents, contents: 2.2 continuous severity distributions, 2.3 mixtures, 2.4 tail properties, 2.5 coverage modifications incl. 2.5.4 inflation, PDF pp.9-10 (contents only; text not read), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-070.md
---

Two Pareto models have been fitted to the same claim data, and both have a mean of 1,000:

- Model 1: $\alpha = 3$, $\theta = 2{,}000$
- Model 2: $\alpha = 6$, $\theta = 5{,}000$

The selected model will be used to price both a deductible of 500 and an unlimited excess layer above 5,000.

Determine which of the following statements are true.

- I. Model 1 gives the larger expected loss in the layer above 5,000, $E[(X - 5{,}000)_+]$.
- II. Model 1 gives the larger expected loss eliminated by the deductible, $E[X \wedge 500]$.
- III. The two models give the same expected payment per payment under the deductible of 500, because their means are equal.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

Use the Pareto limited expected value, $E[X \wedge x] = \frac{\theta}{\alpha - 1}\left[1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha - 1}\right]$, and $E[(X - x)_+] = E[X] - E[X \wedge x]$.

**I — true.**

$$
\begin{align*}
\text{Model 1: } E[(X - 5{,}000)_+] &= 1{,}000\left(\tfrac{2{,}000}{7{,}000}\right)^{2} \\
&= 81.63 \\
\text{Model 2: } E[(X - 5{,}000)_+] &= 1{,}000\left(\tfrac{5{,}000}{10{,}000}\right)^{5} \\
&= 31.25
\end{align*}
$$

Model 1, with the smaller shape parameter, has the heavier tail and puts more than two and a half times as much expected loss above 5,000.

**II — false.**

$$
\begin{align*}
\text{Model 1: } E[X \wedge 500] &= 1{,}000\left[1 - (0.8)^{2}\right] \\
&= 360 \\
\text{Model 2: } E[X \wedge 500] &= 1{,}000\left[1 - \left(\tfrac{5{,}000}{5{,}500}\right)^{5}\right] \\
&= 379.08
\end{align*}
$$

With the mean held at 1,000, the expected loss Model 1 moves into the tail comes out of the lower layers, so it eliminates less below 500.

**III — false.** Given $X > d$, the excess is Pareto with shape $\alpha$ and scale $\theta + d$, so the expected payment per payment is $(\theta + d)/(\alpha - 1)$:

$$
\begin{align*}
\text{Model 1: } \frac{2{,}500}{2} &= 1{,}250 \\
\text{Model 2: } \frac{5{,}500}{5} &= 1{,}100
\end{align*}
$$

Equal means say nothing about how the losses above a deductible are spread.

Only I is true, so the answer is **A**.

**Why not the others**

- **B** — accepts II, assuming the heavier-tailed model is larger in every layer; with the mean fixed, loss it puts in the tail must come out of the lower layers.
- **C** and **D** — accept III, treating the mean as if it set every layer and every conditional expectation; these depend on the whole survival function, not just its integral.
- **E** — would need a true set other than I alone.
