---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:40203295c4e8fe988afba327fc849b4bd00ae5825238a11bd8898b927d224605
  sources:
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
    - "Klinker, Generalized Linear Mixed Models for Ratemaking, CAS E-Forum Winter 2011 Vol. 2, Sections 2-3, pp.3-10, eq. (3.6), sha256:7ef820482d27ecb454bd80f9b649ed7d8d6a5f0b4bf25a910c457c3726d36b68 — https://www.casact.org/sites/default/files/database/forum_11wforumpt2_klinker.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variance Components.md
---

**Variance components** are the parameters that split the total variance of a [[Linear Mixed Model]] into a piece for each source of randomness — one per [[Random Effects|random effect]] plus the residual.

> $$\mathrm{Var}(\mathbf{y}) = \mathbf{V} = \mathbf{Z}\mathbf{D}\mathbf{Z}^{\top} + \mathbf{R}$$
>
> $$\text{random intercept: } \mathrm{Var}(y_{ij}) = \sigma_b^{2} + \sigma^{2}$$

- $\mathbf{D}$ collects the random-effect variances (and their covariances); $\mathbf{R}$ is the residual [[Covariance Structure|covariance structure]], usually $\sigma^2 \mathbf{I}$
- They are the mixed-model counterpart of the [[Variance of Hypothetical Means]] ($\sigma_b^2$) and [[Expected Value of Process Variance]] ($\sigma^2$) in credibility
- Variances are **non-negative**, so a fitted component at the boundary $\hat\sigma_b^2 = 0$ is a signal that the grouping factor explains nothing — the mixed model has collapsed to ordinary regression
- They drive everything downstream: the [[Intraclass Correlation]], the shrinkage of each [[Best Linear Unbiased Predictor|BLUP]], and the standard errors of the [[Fixed Effects|fixed effects]]
- [[Restricted Maximum Likelihood|REML]] is the default estimator because ML variance components are biased downward

![[Media/Figures/Variance_Components.svg|340]]

> [!example]- Reading Variance Components from Software Output {Example}
> A random-intercept model of claim severity by claims adjuster reports: `Random effects: adjuster (Intercept) Variance 250, Residual Variance 1,000`. How much of the variation is between adjusters, and what does one adjuster's total variance look like?
>
> > [!answer]-
> > $$\mathrm{Var}(y_{ij}) = \sigma_b^{2} + \sigma^{2} = 250 + 1{,}000 = 1{,}250$$
> > $$\mathrm{ICC} = \frac{250}{1{,}250} = 0.20$$
> > **20%** of the variance in severity sits between adjusters and 80% within. Two claims handled by the same adjuster have correlation 0.20; two handled by different adjusters are uncorrelated.
