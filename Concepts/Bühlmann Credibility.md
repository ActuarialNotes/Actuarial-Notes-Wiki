---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:a28a88a7dd70d0413a9a8014d764f1b72e3ee03c9e5e7d9e53f8b1cdc34bf122
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Bühlmann Credibility.md"
---

**Bühlmann Credibility** (also called **Greatest Accuracy Credibility**) is a least-squares credibility framework that derives the credibility factor $Z$ by minimizing the expected squared error between the credibility estimate and the true (unknown) risk parameter $\theta$.

> $$\text{Estimate} = Z \cdot \bar{X} + (1-Z) \cdot \mu$$
>
> $$Z = \frac{n}{n + k}, \quad k = \frac{v}{a}$$

**Variance components:**

| Symbol | Name | Definition |
| :--- | :--- | :--- |
| $\mu = E[X]$ | Overall mean | Expected value of $X$ |
| $v = E[\sigma^2(\theta)]$ | Expected process variance | Expected within-risk variance |
| $a = \text{Var}(\mu(\theta))$ | Variance of hypothetical means | Between-risk variance |
| $k = v/a$ | Bühlmann credibility parameter | Ratio of process variance to structural variance |

- As $n \to \infty$, $Z \to 1$ (full credibility to observed data)
- As $k \to 0$ (low process variance), $Z \to 1$ even for small $n$
- Bühlmann credibility is the **best linear estimate** of $\mu(\theta)$ given $X_1, \ldots, X_n$
- When $\theta$ has a conjugate prior, Bühlmann = Bayesian credibility ([[Bayesian Credibility]])

![[Media/Figures/Bühlmann_Credibility.svg|340]]

> [!example]- Bühlmann Credibility Calculation {Example}
> A risk has process variance $v = 400$ and structural variance $a = 100$. Three years of observations give $\bar{X} = 50$ and the overall mean is $\mu = 40$. Calculate the credibility estimate.
>
> > [!answer]-
> > $k = v/a = 400/100 = 4$; $Z = n/(n+k) = 3/(3+4) = 3/7 \approx 0.4286$.
> > $$\text{Estimate} = \frac{3}{7}(50) + \frac{4}{7}(40) = 21.43 + 22.86 \approx 44.29$$
