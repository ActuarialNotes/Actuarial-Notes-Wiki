---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:e9a98e7ff8914dfa91a7670bcf752372ee41e8bbad72cfd689c947a41c6f65bc
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Empirical Bayes Credibility.md
---

![[Media/Figures/Empirical_Bayes_Credibility.svg|340]]

**Empirical Bayes Credibility** is the estimation of the structural parameters $\mu$, $v$ and $a$ of a [[Bühlmann Credibility|Bühlmann]] or [[Bühlmann-Straub Credibility|Bühlmann-Straub]] model from the observed experience itself. With $r$ risks each observed for $n$ periods with equal exposure, risk $i$ has observations $X_{ij}$ and mean $\bar{X}_i$, and the overall mean is estimated by the average of the risk means, $\hat{\mu} = \bar{X}$. The EPV estimate is

> $$\hat{v} = \frac{1}{r(n - 1)}\sum_{i=1}^{r}\sum_{j=1}^{n}\left(X_{ij} - \bar{X}_i\right)^2$$

and the VHM estimate is

> $$\hat{a} = \frac{1}{r - 1}\sum_{i=1}^{r}\left(\bar{X}_i - \bar{X}\right)^2 - \frac{\hat{v}}{n}$$

$\hat{v}$ is the average of the risks' sample variances. $\hat{a}$ is the sample variance of the risk means, corrected by $\hat{v}/n$ for the process variance those means contain. This nonparametric method makes no assumption about the distribution of the observations.

> [!example]- Risk 1 reports 4 and 6 claims in two years, and risk 2 reports 10 and 12. What is the credibility estimate for risk 1? {Example}
> - $\bar{X}_1 = 5$, $\bar{X}_2 = 11$ and $\bar{X} = 8$.
> - $\hat{v} = (1 + 1 + 1 + 1)/(2 \times 1) = 2$.
> - $\hat{a} = \big((5 - 8)^2 + (11 - 8)^2\big)/1 - 2/2 = 17$.
> - $\hat{k} = 2/17 = 0.118$, and $Z = 2/(2 + 0.118) = 0.944$.
> - Risk 1's estimate is $0.944(5) + 0.056(8) = 5.17$.

## Semiparametric estimation

Assuming a family for the observations given $\Theta$ shortens one estimate. For Poisson claim counts the process variance equals the hypothetical mean, so $\hat{v} = \hat{\mu} = \bar{X}$. With one period per risk, the VHM estimate is

> $$\hat{a} = S^2 - \bar{X}$$

- $S^2$ is the sample variance of the risks' claim counts, with divisor $r - 1$.

> [!example]- 100 policyholders have 0, 1, 2 and 3 claims in one year in the numbers 50, 30, 15 and 5. What is the credibility estimate for a policyholder with 3 claims? {Example}
> - $\bar{X} = (30 + 30 + 15)/100 = 0.75$, so $\hat{v} = 0.75$.
> - $S^2 = 78.75/99 = 0.7955$, so $\hat{a} = 0.7955 - 0.75 = 0.0455$.
> - $\hat{k} = 0.75/0.0455 = 16.5$, and $Z = 1/(1 + 16.5) = 0.0571$.
> - The estimate is $0.0571(3) + 0.9429(0.75) = 0.879$.

With unequal exposures the same idea carries over with exposure weights, as in [[Bühlmann-Straub Credibility#Estimating the structural parameters|Bühlmann-Straub's estimators]].

> [!trap] A negative VHM estimate
> When the risk means differ no more than the process variance explains, $\hat{a}$ comes out negative. It is then set to 0, which gives $Z = 0$ and puts all the weight on the overall mean.
