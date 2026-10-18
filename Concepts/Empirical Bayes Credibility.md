---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:3d37fe58c9a5bc2c3f2e68a222814d492ee41e2dd3105472c7fd8ff019f7793f
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Empirical Bayes Credibility.md
---

**Empirical Bayes credibility** estimates the structural parameters $\mu$, $v$ and $a$ of a [[Bühlmann Credibility]] or [[Bühlmann-Straub Credibility]] model *from the observed experience itself*, rather than assuming them known. It is how credibility is actually applied when no prior is given.

> $$\hat{v} = \frac{1}{r(n-1)}\sum_{i=1}^{r}\sum_{j=1}^{n}\left(X_{ij} - \bar{X}_i\right)^{2}$$
>
> $$\hat{a} = \frac{1}{r-1}\sum_{i=1}^{r}\left(\bar{X}_i - \bar{X}\right)^{2} - \frac{\hat{v}}{n}$$

- **Non-parametric**: no distributional assumption at all — $\hat v$ is the pooled within-risk variance, $\hat a$ the between-risk variance *corrected* for the process noise that inflates it
- **Semi-parametric**: assume a family for the conditional distribution to shortcut one estimate — for Poisson frequency $\hat v = \bar{X}$, leaving only $\hat a$ to compute
- The correction term $\hat v / n$ matters: the raw spread of the group means already contains process variance, and subtracting it is what makes $\hat a$ unbiased
- $\hat a$ can come out **negative** when the groups look no more different than noise; it is then set to 0, giving $Z = 0$ and full weight to the overall mean
- With unequal exposures the same idea carries over with exposure weights — the Bühlmann-Straub form

![[Media/Figures/Empirical_Bayes_Credibility.svg|340]]

> [!example]- Estimating the Structural Parameters {Example}
> Two risks are observed for 2 years each: risk 1 reports 4 and 6 claims, risk 2 reports 10 and 12. Estimate $\mu$, $v$, $a$ and the credibility for one risk's 2 years.
>
> > [!answer]-
> > $\bar{X}_1 = 5$, $\bar{X}_2 = 11$, $\bar{X} = 8$.
> > $$\hat v = \frac{(4-5)^2 + (6-5)^2 + (10-11)^2 + (12-11)^2}{2(2-1)} = \frac{4}{2} = 2$$
> > $$\hat a = \frac{(5-8)^2 + (11-8)^2}{2-1} - \frac{2}{2} = 18 - 1 = 17$$
> > $$\hat k = \frac{2}{17} = 0.1176 \qquad Z = \frac{2}{2 + 0.1176} = 0.944$$
> > The risks differ far more than the year-to-year noise, so each risk's own experience carries 94% of the weight: risk 1 is estimated at $0.944(5) + 0.056(8) = 5.17$.
