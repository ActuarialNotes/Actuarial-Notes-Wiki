---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:c88820159ca207b04de25b64c477534bc934f688186cde20e440cac8d153d241
  sources:
    - "R Core Team, R documentation 'AIC {stats}' (R-devel manual, stats 4.6.0), Description and Details, sha256:f55c97cef5d53ab762953509b4e5c4da1e8891b8263ce021ef04dcb27c81b8df — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/AIC.html"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2.2 Penalized Measures of Fit, eq.18, PDF pp.76-77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Ding, Tarokh & Yang, 'Model Selection Techniques - An Overview', IEEE Signal Processing Magazine 2018 (arXiv:1810.09583v1), §II-A eqs (8) and AICc, PDF p.5; §III PDF p.10 (KL motivation), sha256:fd9744e006712c6d59f8da05f42769eeed90244d857e031cc70ec41d139446b6 — https://arxiv.org/pdf/1810.09583v1"
    - "Penn State STAT 504, Lesson 9 'Poisson Regression', SAS output for the horseshoe-crab width model (Full Log Likelihood -461.5881, AIC 927.1762, AICC 927.2468, BIC 933.4828; deviance df 171, n = 173, 2 parameters), sha256:f8021fab7a1c8cfeb2de7ebfe3b5d1977a32671dd3acefc9ade531369c5da506 — https://online.stat.psu.edu/stat504/Lesson09"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §6.1.3 Cp, AIC, BIC and adjusted R^2, printed pp.232-234 (PDF pp.240-242), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Fall 2018, Q39 — official exam paper (scan), PDF p.43; Final Answer Key PDF p.50 (B), sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/AIC.md
---

The **Akaike Information Criterion (AIC)** is a model selection measure that balances **goodness of fit** against **model complexity** by penalizing the log-likelihood for the number of parameters.

> $$\text{AIC} = -2\ell(\hat{\boldsymbol{\beta}}) + 2p$$
>
> $$\text{where } \ell(\hat{\boldsymbol{\beta}}) \text{ is the maximized log-likelihood and } p \text{ is the number of parameters}$$

- **Lower AIC** indicates a better model (better fit relative to complexity)
- AIC does **not** require models to be nested, unlike likelihood ratio tests — but the models must be fitted by maximum likelihood to the **same data**: the same observations of the same, untransformed response. A model for $\ln Y$ cannot be compared with one for $Y$, and comparing a Poisson GLM with a Gamma GLM is meaningless, since one response is discrete and the other continuous
- Derived from an information-theoretic perspective (Kullback–Leibler divergence)
- For small samples, use the **corrected AIC**: $\text{AIC}_c = \text{AIC} + \dfrac{2p(p+1)}{n-p-1}$
- Compare with [[BIC]], which uses a stronger penalty $\ln(n)$ instead of 2, favoring simpler models more aggressively for large $n$

![[Media/Figures/AIC.svg|340]]

> [!example]- Selecting Between Two GLMs Using AIC {Example}
> A Poisson GLM with 3 predictors and an intercept has log-likelihood $\ell_1 = -120$. A simpler Poisson GLM, fitted to the same data, with 1 predictor and an intercept has $\ell_2 = -124$. Which model has lower AIC?
>
> > [!answer]-
> > The intercept is a parameter, so the models have $p_1 = 4$ and $p_2 = 2$.
> > $$\text{AIC}_1 = -2(-120) + 2(4) = 240 + 8 = 248$$
> > $$\text{AIC}_2 = -2(-124) + 2(2) = 248 + 4 = 252$$
> > The 3-predictor model has lower AIC (248 < 252), so it is preferred — the improvement in fit outweighs the added complexity.
