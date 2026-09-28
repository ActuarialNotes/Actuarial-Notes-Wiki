---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:5bcac9fa170e3697692cb666c9cbdac745232befa3a31feed86bf80f907463d3
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), sec. 6.2 definition of D(X), Thm 6.6 and Thm 6.7, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, sec. 3.2.4 Variance (fetched 2026-09-27), sha256:90ca917f6141a0c49d353bdae1e824585656afd7d76c80823c31247f0c522008 — https://www.probabilitycourse.com/chapter3/3_2_4_variance.php"
    - "SOA Probability Exam syllabus, November 2026, univariate random variables learning objectives c) (expected values incl. moments, mode, median, percentiles) and d) (variance, standard deviation, coefficient of variation), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Standard Deviation.md
---

**Standard Deviation** $\sigma$ is the positive square root of [[Variance]], measuring the typical spread of a random variable $X$ around its mean in the same units as $X$.
- The standard deviation is directly interpretable because it shares units with $X$, unlike variance
- It satisfies $\sigma(aX + b) = |a|\,\sigma(X)$, so location shifts do not affect spread

> $$\sigma = \sqrt{\text{Var}(X)}$$

> $$= \sqrt{E[X^2] - (E[X])^2}$$

![[Media/Figures/Standard_Deviation.svg|340]]

> [!example]- Standard Deviation of a Claim Amount {Example}
> Claim amounts $X$ follow a distribution with $E[X] = 200$ and $E[X^2] = 50{,}000$. Find the standard deviation of $X$.
>
> > [!answer]-
> > First compute variance:
> > $$\text{Var}(X) = E[X^2] - (E[X])^2 = 50{,}000 - 200^2 = 50{,}000 - 40{,}000 = 10{,}000$$
> > Then:
> > $$\sigma = \sqrt{10{,}000} = 100$$
> > The standard deviation of the claim amount is \$100.
