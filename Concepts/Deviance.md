---
verification:
  status: disputed
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:5a5518a750b0e1399198a03bf19b30f3a526eb2c37a24efddd76fbac3cc8abd0
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.6.1.2 eqs 15-16 and fn.12 (scaled vs unscaled deviance; Dobson & Barnett's opposite naming), printed pp.63-64, PDF pp.73-74; sec.6.2 eq.17 F-test on unscaled deviance, printed p.65, PDF p.75"
    - "Rodriguez, GLM lecture notes (Princeton), App. B, sec.B.3.2 Likelihood Ratio Tests and The Deviance (eqs B.11-B.13; Normal deviance = RSS) (PDF pp.6-7), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), ch.4 sec.4.2.2 Poisson deviance and its chi^2 on n-p df (PDF pp.7-8), sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sec.6.1.1 (deviance as -2 x maximized log-likelihood, printed p.228, PDF p.236)"
  open_findings: 1
  open_critical: 1
  log: .verify/Concepts/Deviance.md
---

**Deviance** is a goodness-of-fit measure for [[Generalized Linear Model]]s based on the log-likelihood. It compares the fitted model to the **saturated model** (a model with one parameter per observation, achieving perfect fit).

> $$D^* = 2\left[\ell_{\text{sat}} - \ell(\hat{\boldsymbol{\beta}})\right] = 2\left[\ell(\text{saturated model}) - \ell(\text{fitted model})\right]$$

> $$D = \phi\, D^*, \qquad D^* = \frac{D}{\phi}$$

- $D^*$ is the **scaled deviance** and $D$, the scaled deviance multiplied by the [[Dispersion Parameter]] $\phi$, the **unscaled deviance**. $D$ does not depend on $\phi$, which makes it the one to compare models with different dispersion estimates. For Poisson and binomial models $\phi = 1$ and the two coincide
- The names are not standard: these follow McCullagh & Nelder and CAS Monograph 5, while Dobson & Barnett call $2[\ell_{\text{sat}} - \ell]$ the "deviance" and its product with $\hat\phi$ the "scaled deviance" — the reverse. ISLR calls $-2\ell(\hat{\boldsymbol{\beta}})$ itself the deviance. Read which one a question means
- Deviance is always **non-negative**; the saturated model has deviance $0$ (a perfect fit)
- For a Normal linear model the unscaled deviance is the **residual sum of squares**, $D = \text{RSS} = \sum(y_i - \hat{y}_i)^2$, so $D^* = \text{RSS}/\sigma^2$
- For Poisson regression ($\phi = 1$): $D = 2\sum_i \left[y_i\ln\!\frac{y_i}{\hat{\mu}_i} - (y_i - \hat{\mu}_i)\right]$; in large samples a model that fits has $D \approx \chi^2_{n-p}$
- **Analysis of Deviance**: for nested models, $\dfrac{D_{\text{reduced}} - D_{\text{full}}}{\phi} \approx \chi^2_{\Delta p}$ when $\phi$ is known (large samples). When $\phi$ is estimated, use $F = \dfrac{D_{\text{reduced}} - D_{\text{full}}}{\Delta p\,\hat\phi_{\text{full}}}$ on $(\Delta p,\ n - p_{\text{full}})$ degrees of freedom

![[Media/Figures/Deviance.svg|340]]

> [!example]- Analysis of Deviance to Test a Predictor {Example}
> A Poisson GLM with intercept only has deviance $D_0 = 45.2$ on 49 df. Adding "territory" (3 levels, 2 extra parameters) gives $D_1 = 30.8$ on 47 df. Test whether territory significantly improves fit at $\alpha = 0.05$.
>
> > [!answer]-
> > $\Delta D = 45.2 - 30.8 = 14.4$ on $\Delta\text{df} = 2$.
> > The critical value $\chi^2_{0.05, 2} = 5.99$. Since $14.4 > 5.99$, **reject $H_0$** — territory significantly improves the model.
