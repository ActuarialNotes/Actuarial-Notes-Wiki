---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:84ccaf826a32add76d81f76e53f0d6aa8c3ca276034d02d2481a9278466e60e1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/AIC.md
---

The **Akaike Information Criterion (AIC)** is a model selection measure that balances **goodness of fit** against **model complexity** by penalizing the log-likelihood for the number of parameters.

> $$\text{AIC} = -2\ell(\hat{\boldsymbol{\beta}}) + 2p$$
>
> $$\text{where } \ell(\hat{\boldsymbol{\beta}}) \text{ is the maximized log-likelihood and } p \text{ is the number of parameters}$$

- **Lower AIC** indicates a better model (better fit relative to complexity)
- AIC does **not** require models to be nested, unlike likelihood ratio tests
- Derived from an information-theoretic perspective (Kullback–Leibler divergence)
- For small samples, use the **corrected AIC**: $\text{AIC}_c = \text{AIC} + \dfrac{2p(p+1)}{n-p-1}$
- Compare with [[BIC]], which uses a stronger penalty $\ln(n)$ instead of 2, favoring simpler models more aggressively for large $n$

![[Media/Figures/AIC.svg|340]]

> [!example]- Selecting Between Two GLMs Using AIC {Example}
> A Poisson GLM with 3 predictors has log-likelihood $\ell_1 = -120$. A simpler GLM with 1 predictor has $\ell_2 = -124$. Which model has lower AIC?
>
> > [!answer]-
> > $$\text{AIC}_1 = -2(-120) + 2(3) = 240 + 6 = 246$$
> > $$\text{AIC}_2 = -2(-124) + 2(1) = 248 + 2 = 250$$
> > The 3-predictor model has lower AIC (246 < 250), so it is preferred — the improvement in fit outweighs the added complexity.
