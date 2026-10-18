---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:2d872f544a6cae3f5777aa9649d0d67bc8c9acbb2025a08656e29869d4dcb7dc
  sources:
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Klinker, Generalized Linear Mixed Models for Ratemaking, CAS E-Forum Winter 2011 Vol. 2, Sections 2-3, pp.3-10, eq. (3.6), sha256:7ef820482d27ecb454bd80f9b649ed7d8d6a5f0b4bf25a910c457c3726d36b68 — https://www.casact.org/sites/default/files/database/forum_11wforumpt2_klinker.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Fixed Effects.md
---

**Fixed effects** are the regression coefficients in a [[Linear Mixed Model]] that describe the *population-average* relationship between the predictors and the response. They are unknown constants to be estimated, not draws from a distribution.

> $$\mathbf{y} = \underbrace{\mathbf{X}\boldsymbol{\beta}}_{\text{fixed}} + \underbrace{\mathbf{Z}\mathbf{b}}_{\text{random}} + \boldsymbol{\varepsilon}$$
>
> $$E[\mathbf{y}] = \mathbf{X}\boldsymbol{\beta}$$

- A factor belongs in the fixed part when its levels are **the specific levels you care about** and would reappear in a replication of the study — vehicle class, coverage limit
- Each fixed effect costs **one parameter per level** (less the baseline), so a factor with many levels is expensive and unstable — that is the case for making it a [[Random Effects|random effect]] instead
- Interpretation is the same as in [[Linear Regression|linear regression]]: $\beta_j$ is the change in the mean response per unit of $x_j$, holding the rest fixed
- Fixed effects are **estimated** ($\hat{\boldsymbol\beta}$) by generalized least squares given the variance parameters; random effects are **predicted** ([[Best Linear Unbiased Predictor|BLUP]])
- Comparing two models that differ in their fixed effects requires **maximum likelihood**, not [[Restricted Maximum Likelihood|REML]]

![[Media/Figures/Fixed_Effects.svg|340]]

> [!example]- Fixed or Random? {Example}
> A claims model has three candidate grouping variables: `coverage` (3 levels: liability, collision, comprehensive), `territory` (68 rating territories), and `year` (5 calendar years of data). Which belong in the fixed part?
>
> > [!answer]-
> > **Coverage** — fixed. Three levels, all of interest, and each has plenty of data.
> > **Territory** — random. 68 levels, most thin, and the interest is in the *distribution* of territory effects and a shrunk estimate for each, not in 67 separately fitted coefficients.
> > **Year** — fixed if the five specific years are the object of interest (a trend), random only if they are treated as a sample of years.
