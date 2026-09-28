---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:4a4230d6fc5740c627613fbff505e8db52f3c92ba3103426c862548332783663
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), sec. 6.2 definition of V(X), Thm 6.6 and Thm 6.7, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, sec. 3.2.4 Variance (fetched 2026-09-27), sha256:90ca917f6141a0c49d353bdae1e824585656afd7d76c80823c31247f0c522008 — https://www.probabilitycourse.com/chapter3/3_2_4_variance.php"
    - "SOA Probability Exam syllabus, November 2026, univariate random variables learning objectives c) (expected values incl. moments, mode, median, percentiles) and d) (variance, standard deviation, coefficient of variation), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Variance.md
---

**Variance** $\sigma^2$ measures the spread or dispersion of a [[Random Variable]]'s distribution as the expected squared deviation from the mean.
- Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$
- $\text{Var}(aX + b) = a^2 \text{Var}(X)$ — scaling changes variance, shifts do not
- $\text{Var}(X) \geq 0$, with equality only if $X$ is constant

> $$\text{Var}(X) = E\left[(X - \mu)^2\right]$$

> $$= E[X^2] - \mu^2$$

![[Media/Figures/Variance.svg|340]]

> [!example]- Variance of an Insurance Payment {Example}
> A loss $X$ has $E[X] = 500$ and $E[X^2] = 310{,}000$. Find $\text{Var}(X)$.
>
> > [!answer]-
> > Using the computational formula:
> > $$\text{Var}(X) = E[X^2] - (E[X])^2 = 310{,}000 - 500^2 = 310{,}000 - 250{,}000 = 60{,}000$$
