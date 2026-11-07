---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:checker-tse
  content_hash: sha256:7f46684a72d32d07a93e9edf5c3b7b9576706c5a6518197aa878c2f2c292b6d4
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Bühlmann-Straub Credibility.md"
---

![[Media/Figures/Bühlmann-Straub_Credibility.svg|340]]

**Bühlmann-Straub Credibility** is the extension of [[Bühlmann Credibility|Bühlmann credibility]] to observations with unequal exposures. Period $j$ has exposure $m_j$ and loss per exposure $X_j$, and given $\Theta = \theta$ its variance is $v(\theta)/m_j$. The observed mean is the exposure-weighted average

> $$\bar{X} = \frac{\sum_{j=1}^{n} m_j X_j}{m}$$

- $m = \sum_{j=1}^{n} m_j$ is the total exposure.

$\bar{X}$ is the total losses divided by the total exposure. The credibility is

> $$Z = \frac{m}{m + k}$$

- $k = v/a$, the [[Expected Value of Process Variance|expected value of the process variance]] divided by the [[Variance of Hypothetical Means|variance of the hypothetical means]], both per unit of exposure.

The credibility estimate per exposure is $Z\bar{X} + (1 - Z)\mu$. The exposure $m$ is in the same unit as $k$, such as car years. $Z$ depends only on the exposures and the structural parameters, not on the observed losses. When every $m_j = 1$, the model is the Bühlmann model.

> [!example]- A risk has exposures 100, 200 and 150 in three years, with losses per exposure 0.08, 0.06 and 0.09. Given $k = 250$ and $\mu = 0.07$, what is its credibility estimate? {Example}
> - $m = 100 + 200 + 150 = 450$.
> - $\bar{X} = (8 + 12 + 13.5)/450 = 33.5/450 = 0.0744$.
> - $Z = 450/(450 + 250) = 0.643$.
> - The estimate is $0.643(0.0744) + 0.357(0.07) = 0.0729$ per exposure.

## Estimating the structural parameters

With unequal exposures, $\mu$, $v$ and $a$ are estimated from a portfolio of $r$ risks by nonparametric [[Empirical Bayes Credibility|empirical Bayes]]. Risk $i$ has $n_i$ periods with exposures $m_{ij}$, total exposure $m_i$ and weighted mean $\bar{X}_i$, and $m = \sum_i m_i$ is the exposure of all risks combined. The overall mean is

> $$\hat{\mu} = \bar{X} = \frac{1}{m}\sum_{i=1}^{r} m_i \bar{X}_i$$

The EPV estimate pools the within-risk variation:

> $$\hat{v} = \frac{\sum_{i=1}^{r}\sum_{j=1}^{n_i} m_{ij}\left(X_{ij} - \bar{X}_i\right)^2}{\sum_{i=1}^{r}(n_i - 1)}$$

The VHM estimate is

> $$\hat{a} = \frac{\sum_{i=1}^{r} m_i\left(\bar{X}_i - \bar{X}\right)^2 - (r - 1)\hat{v}}{m - \frac{1}{m}\sum_{i=1}^{r} m_i^2}$$

With these, $\hat{k} = \hat{v}/\hat{a}$, and each risk gets its own credibility $Z_i = m_i/(m_i + \hat{k})$. The overall mean is the average loss per exposure over all risks, not the plain average of the $\bar{X}_i$.

> [!example]- Risk A has 100 exposures with mean 0.30, and risk B has 300 exposures with mean 0.10. The pooled EPV estimate is $\hat{v} = 0.6$. What is each risk's credibility estimate? {Example}
> - $m = 400$, and $\hat{\mu} = (30 + 30)/400 = 0.15$.
> - $\sum m_i(\bar{X}_i - \hat{\mu})^2 = 100(0.15)^2 + 300(0.05)^2 = 3.0$.
> - The denominator is $400 - (100^2 + 300^2)/400 = 150$, so $\hat{a} = (3.0 - 0.6)/150 = 0.016$.
> - $\hat{k} = 0.6/0.016 = 37.5$.
> - $Z_A = 100/137.5 = 0.727$, so A's estimate is $0.727(0.30) + 0.273(0.15) = 0.259$.
> - $Z_B = 300/337.5 = 0.889$, so B's estimate is $0.889(0.10) + 0.111(0.15) = 0.106$.
