---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:301896d0fba1f9cfe0803e452effb560a5f0fbcf6dcb59aaaeb65aec03d3b94d
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §3.2.4 Variance (definition, Var >= 0, variance 0 for a variable equal to its mean), sha256:2eb1d22be0e78ad88e2d456fbf134ecbb4b1515f0eacaef640e8483d4ac88547 — https://www.probabilitycourse.com/chapter3/3_2_4_variance.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorems 6.6 and 6.7, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variance.md
---

**Variance** $\sigma^2$ measures the spread or dispersion of a [[Random Variable]]'s distribution as the expected squared deviation from the mean.
- Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$
- $\text{Var}(aX + b) = a^2 \text{Var}(X)$ — scaling changes variance, shifts do not
- $\text{Var}(X) \geq 0$, since $(X - \mu)^2 \geq 0$; a variable that always equals its mean, such as a constant, has variance 0

> $$\text{Var}(X) = E\left[(X - \mu)^2\right]$$

> $$= E[X^2] - \mu^2$$

![[Media/Figures/Variance.svg|340]]

> [!example]- Variance of an Insurance Payment {Example}
> A loss $X$ has $E[X] = 500$ and $E[X^2] = 310{,}000$. Find $\text{Var}(X)$.
>
> > [!answer]-
> > Using the computational formula:
> > $$\text{Var}(X) = E[X^2] - (E[X])^2 = 310{,}000 - 500^2 = 310{,}000 - 250{,}000 = 60{,}000$$
