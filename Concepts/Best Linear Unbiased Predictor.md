---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:c1d71276f55c0edfe379792fcc1ac318f512c57faeec5e4d0d82f60ff36ade30
  sources:
    - "West, Additional Notes on Shrinkage Means (author-hosted, assigned MAS-II reading), whole note (1 page): u_i = a_i*mu + (1-a_i)*mu_i, a_i = sigma_i^2/(sigma^2_rf + sigma_i^2), sigma_i^2 = sigma^2_error/n_i, sha256:a843104b0090e1e7c305be0b4a83064c2fe5620f7570937eac321e425aba57f9 — http://www-personal.umich.edu/~bwest/shrinkage.doc"
    - "Klinker, Generalized Linear Mixed Models for Ratemaking, CAS E-Forum Winter 2011 Vol. 2, Sections 2-3, pp.3-10, eq. (3.6), sha256:7ef820482d27ecb454bd80f9b649ed7d8d6a5f0b4bf25a910c457c3726d36b68 — https://www.casact.org/sites/default/files/database/forum_11wforumpt2_klinker.pdf"
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Best Linear Unbiased Predictor.md
---

The **best linear unbiased predictor (BLUP)** is the estimate a [[Linear Mixed Model]] produces for a [[Random Effects|random effect]]. It is the group's raw deviation shrunk toward zero by a factor that is, in the simplest case, exactly a credibility weight.

> $$\hat{\mathbf{b}} = \mathbf{D}\mathbf{Z}^{\top}\mathbf{V}^{-1}\left(\mathbf{y} - \mathbf{X}\hat{\boldsymbol{\beta}}\right)$$
>
> $$\text{random intercept: } \hat{b}_i = \frac{n_i\sigma_b^{2}}{n_i\sigma_b^{2} + \sigma^{2}}\left(\bar{y}_i - \bar{y}\right)$$

- Fixed effects are **estimated**, random effects are **predicted** — a random effect is a realized value of a random variable, not a fixed constant, so "prediction" is the correct word
- The shrinkage factor $\dfrac{n_i}{n_i + \sigma^2/\sigma_b^2}$ is [[Bühlmann Credibility|Bühlmann's]] $Z = n/(n+k)$ with $k = \sigma^2/\sigma_b^2 = \mathrm{EPV}/\mathrm{VHM}$ — the mixed model and the credibility model are the same estimator
- A group with plenty of data keeps nearly all of its own deviation; a thin group is pulled almost all the way back to the population mean
- BLUPs are **shrunk on purpose**: they minimize mean squared prediction error, so their spread is deliberately narrower than the true effects'
- Adding $\mathbf{X}\hat{\boldsymbol\beta} + \mathbf{Z}\hat{\mathbf{b}}$ gives the group-specific (conditional) fitted values, against the population-average fit $\mathbf{X}\hat{\boldsymbol\beta}$

![[Media/Figures/Best_Linear_Unbiased_Predictor.svg|340]]

> [!example]- BLUP as a Credibility Estimate {Example}
> A random-intercept model of pure premium by class has $\hat\sigma_b^2 = 900$ and $\hat\sigma^2 = 3{,}600$. Class C has 6 policy-years averaging 260 against a grand mean of 200. What is its BLUP and its fitted pure premium?
>
> > [!answer]-
> > $k = \sigma^2/\sigma_b^2 = 3{,}600/900 = 4$, so
> > $$Z = \frac{6}{6 + 4} = 0.60 \qquad \hat b_C = 0.60(260 - 200) = 36$$
> > Fitted pure premium $= 200 + 36 = 236$, not the raw 260. Six policy-years earn 60% credibility; the remaining 40% stays with the class mean.
