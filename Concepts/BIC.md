---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:e3f7c2b4d02131bb746233214e214f91276885666e62e91b3ab7d713f79db436
  sources:
    - "R Core Team, R documentation 'AIC {stats}' (R-devel manual, stats 4.6.0), Description and Details, sha256:f55c97cef5d53ab762953509b4e5c4da1e8891b8263ce021ef04dcb27c81b8df — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/AIC.html"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2.2 PDF pp.76-77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Ding, Tarokh & Yang, 'Model Selection Techniques - An Overview', IEEE Signal Processing Magazine 2018 (arXiv:1810.09583v1), §I PDF p.2 (frameworks); eq.(10) PDF p.5; §III PDF p.10, sha256:fd9744e006712c6d59f8da05f42769eeed90244d857e031cc70ec41d139446b6 — https://arxiv.org/pdf/1810.09583v1"
    - "Penn State STAT 504, Lesson 9 'Poisson Regression', SAS output for the horseshoe-crab width model (Full Log Likelihood -461.5881, AIC 927.1762, AICC 927.2468, BIC 933.4828; deviance df 171, n = 173, 2 parameters), sha256:f8021fab7a1c8cfeb2de7ebfe3b5d1977a32671dd3acefc9ade531369c5da506 — https://online.stat.psu.edu/stat504/Lesson09"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §6.1.3 printed pp.232-235 (PDF pp.240-243), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/BIC.md
---

The **Bayesian Information Criterion (BIC)** (also called the **Schwarz criterion**) is a model selection measure that penalizes model complexity more heavily than [[AIC]] by using $\ln(n)$ as the penalty per parameter.

> $$\text{BIC} = -2\ell(\hat{\boldsymbol{\beta}}) + p\ln(n)$$
>
> $$\text{where } \ell(\hat{\boldsymbol{\beta}}) \text{ is the maximized log-likelihood, } p \text{ is the number of parameters, and } n \text{ is the sample size}$$

- **Lower BIC** indicates a better model; like [[AIC]], it does not require nested models, but the models must be fitted by maximum likelihood to the **same data**: the same $n$ observations of the same, untransformed response (a model for $\ln Y$ cannot be compared with one for $Y$, nor a Poisson GLM with a Gamma GLM)
- BIC tends to select **simpler models** than AIC for large $n$ since $\ln(n) > 2$ when $n > 7$
- When the true model is among the candidates, BIC is **consistent**: as $n \to \infty$ it selects the smallest true model with probability approaching 1; AIC is not consistent when a larger candidate also contains the true model. When the true model is not among the candidates, AIC is **asymptotically efficient**: its chosen model predicts asymptotically as well as the best candidate
- In practice, if AIC and BIC disagree, BIC typically selects a more parsimonious model

![[Media/Figures/BIC.svg|340]]

> [!example]- Comparing AIC and BIC for Model Selection {Example}
> With $n = 100$ observations, compare two models: Model A has $p_A = 5$ parameters and $\ell_A = -200$; Model B has $p_B = 2$ parameters and $\ell_B = -210$.
>
> > [!answer]-
> > $$\text{AIC}_A = -2(-200) + 2(5) = 410; \quad \text{AIC}_B = -2(-210) + 2(2) = 424$$
> > AIC prefers Model A (410 < 424).
> > $$\text{BIC}_A = 400 + 5\ln(100) = 400 + 23.03 = 423.03$$
> > $$\text{BIC}_B = 420 + 2\ln(100) = 420 + 9.21 = 429.21$$
> > BIC also prefers Model A (423.03 < 429.21) in this case, though the margin is much smaller.
