---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:4b37f41f97d7827bb5515e10a3cdf8afc282a033baa2d54aa9829f5a806499ef
  sources:
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Killip, Mahfoud & Pearce, What Is an Intracluster Correlation Coefficient?, Ann. Fam. Med. 2(3), 2004 (open access), equations 1-2, effective sample size and design effect, sha256:515a0e983ed61c862dbd6609f458c9116598d84ce7a17a4f807e5357cbaa4f53 — https://pmc.ncbi.nlm.nih.gov/articles/PMC1466680/"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Intraclass Correlation.md
---

![[Media/Figures/Intraclass_Correlation.svg|340]]

An **Intraclass Correlation** (ICC) is the correlation between two observations of the same cluster in a [[Linear Mixed Model|linear mixed model]], which equals the share of the total variance that lies between clusters. For a random intercept model it is

> $$\text{ICC} = \frac{\sigma_u^2}{\sigma_u^2 + \sigma^2}$$

- $\sigma_u^2$ is the random-intercept variance and $\sigma^2$ the residual variance, the two [[Variance Components|variance components]].

An ICC of $0$ means clusters are indistinguishable and ordinary regression would do. An ICC near $1$ means observations within a cluster are near-copies, so a cluster of $m$ carries little more information than a cluster of one. The ICC is the off-diagonal correlation of the compound-symmetric [[Covariance Structure|covariance structure]] a random intercept implies.

> [!example]- Claim severities by claims office have $\sigma_u^2 = 0.4$ and $\sigma^2 = 1.6$. What is the ICC? {Example}
> - $\text{ICC} = 0.4/(0.4 + 1.6) = 0.20$.
> - Two claims of one office have correlation $0.20$.

## Intraclass correlation in a multilevel model

For observations sharing a given grouping level, the ICC is the covariance of two such observations divided by the total variance. In a [[Nested and Crossed Factors|nested]] model, the covariance of two observations sharing the lower level is the sum of the variances of every level they share.

> [!example]- A three-level model has hospital variance $0.3$, doctor-within-hospital variance $0.2$ and residual variance $0.5$. What is the ICC of two patients of the same doctor? {Example}
> - Two patients of one doctor share both the hospital and the doctor effects, so their covariance is $0.3 + 0.2 = 0.5$.
> - The total variance is $0.3 + 0.2 + 0.5 = 1.0$, so the ICC is $0.5$.

## Design effect

Clustering inflates the variance of a mean by the design effect, and shrinks the effective sample size:

> $$n_{\text{eff}} = \frac{n}{1 + (m - 1)\,\text{ICC}}$$

- $n$ is the total number of observations and $m$ the number per cluster.
- $1 + (m - 1)\,\text{ICC}$ is the design effect.

> [!example]- Each of 25 offices contributes 20 claims, and the ICC is $0.20$. How many independent claims is the 500-claim sample worth? {Example}
> - The design effect is $1 + (20 - 1)(0.20) = 4.8$.
> - The sample is worth $500/4.8 = 104$ independent claims.
> - Treating the claims as independent would understate standard errors by $\sqrt{4.8} = 2.2$.

> [!trap] Ignoring a non-zero ICC
> Fitting clustered data as if independent makes standard errors too small and $t$ statistics too large.
