---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:c8c969f0c376aa54233b200e84858ed845ae67b74ceaa63393da2d4375dbd22c
  sources:
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
    - "Klinker, Generalized Linear Mixed Models for Ratemaking, CAS E-Forum Winter 2011 Vol. 2, Sections 2-3, pp.3-10, eq. (3.6), sha256:7ef820482d27ecb454bd80f9b649ed7d8d6a5f0b4bf25a910c457c3726d36b68 — https://www.casact.org/sites/default/files/database/forum_11wforumpt2_klinker.pdf"
    - "West, Additional Notes on Shrinkage Means (author-hosted, assigned MAS-II reading), whole note (1 page): u_i = a_i*mu + (1-a_i)*mu_i, a_i = sigma_i^2/(sigma^2_rf + sigma_i^2), sigma_i^2 = sigma^2_error/n_i, sha256:a843104b0090e1e7c305be0b4a83064c2fe5620f7570937eac321e425aba57f9 — http://www-personal.umich.edu/~bwest/shrinkage.doc"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Random Effects.md
---

**Random effects** are the group-level departures from the population-average fit in a [[Linear Mixed Model]]. Unlike [[Fixed Effects|fixed effects]] they are treated as *draws from a distribution*, so a group with thin data is pulled toward the overall mean rather than fitted on its own.

> $$\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \mathbf{Z}\mathbf{b} + \boldsymbol{\varepsilon}$$
>
> $$\mathbf{b} \sim N(\mathbf{0}, \mathbf{D}), \quad \boldsymbol{\varepsilon} \sim N(\mathbf{0}, \mathbf{R}), \quad \mathbf{b} \perp \boldsymbol{\varepsilon}$$

- A random effect costs **one variance parameter**, not one coefficient per level — 68 territories add a single $\sigma_b^2$ to the model
- $\mathbf{Z}$ is the design matrix mapping each observation to its group; $\mathbf{D}$ holds the [[Variance Components|variance components]]
- Random effects induce **correlation between observations in the same group** — this is what lets a mixed model handle repeated measures on one policyholder
- Their predicted values are shrunk toward zero by exactly a credibility factor — see [[Best Linear Unbiased Predictor]]
- The effects are assumed **mean zero**: the population average lives entirely in the fixed part, so a random effect adds no intercept of its own

![[Media/Figures/Random_Effects.svg|340]]

> [!example]- Why the Random Effect Shrinks a Thin Territory {Example}
> A random-intercept model of loss ratio by territory has $\hat\sigma_b^2 = 0.010$ (between territories) and $\hat\sigma^2 = 0.090$ (within). Territory A has 9 observations averaging 0.15 above the grand mean; territory B has 1 observation 0.15 above. What are their predicted effects?
>
> > [!answer]-
> > The shrinkage factor is $Z_i = \dfrac{n_i \sigma_b^2}{n_i \sigma_b^2 + \sigma^2}$:
> > $$Z_A = \frac{9(0.010)}{9(0.010) + 0.090} = \frac{0.09}{0.18} = 0.50 \Rightarrow \hat b_A = 0.50(0.15) = 0.075$$
> > $$Z_B = \frac{0.010}{0.010 + 0.090} = 0.10 \Rightarrow \hat b_B = 0.10(0.15) = 0.015$$
> > Same raw deviation, very different predictions — the model trusts nine observations five times as much as one. This is [[Bühlmann Credibility]] in another notation.
