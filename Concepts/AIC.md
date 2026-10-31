---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:be9114e7527fe60c12db968ccf1eb277fe4a63c5287f86afc927b0ac7036909d
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §6.1.3 eq (6.2) Cp with σ̂² from the full model, AIC display, footnote 4 (two least-squares formulas, log(RSS) form), pp.233-234 (PDF 241-242), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
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
- **For least squares with Gaussian errors** (James et al., §6.1.3), maximum likelihood and least squares coincide, and for a model with $d$ predictors fitted to $n$ observations AIC takes the form below, up to irrelevant constants. It is proportional to Mallows' $C_p$, so the two choose the same model:

> $$\text{AIC} = \frac{1}{n}\left(\text{RSS} + 2d\,\hat\sigma^2\right)$$

- Here $\hat\sigma^2$ is an estimate of the error variance obtained **once, from the full model containing all the predictors** (the square of its residual standard error), and the **same value is used for every candidate**. The form comes from the likelihood one with $\sigma^2$ treated as known: then $-2\ell = \text{RSS}/\sigma^2$ plus a constant, so $-2\ell + 2p$ is $(\text{RSS} + 2p\sigma^2)/\sigma^2$ plus a constant, and multiplying by $\sigma^2/n$ gives the form above (counting the intercept or not shifts every model equally). James et al. note a second least-squares formula, for when $\sigma^2$ is not to be estimated, with a $\log(\text{RSS})$ term in place of $\text{RSS}$

![[Media/Figures/AIC.svg|340]]

> [!example]- Selecting Between Two GLMs Using AIC {Example}
> A Poisson GLM with 3 predictors and an intercept has log-likelihood $\ell_1 = -120$. A simpler Poisson GLM, fitted to the same data, with 1 predictor and an intercept has $\ell_2 = -124$. Which model has lower AIC?
>
> > [!answer]-
> > The intercept is a parameter, so the models have $p_1 = 4$ and $p_2 = 2$.
> > $$\text{AIC}_1 = -2(-120) + 2(4) = 240 + 8 = 248$$
> > $$\text{AIC}_2 = -2(-124) + 2(2) = 248 + 4 = 252$$
> > The 3-predictor model has lower AIC (248 < 252), so it is preferred — the improvement in fit outweighs the added complexity.

> [!example]- Least-Squares AIC With a Fixed Error Variance {Example}
> Regressions are fitted to $n = 50$ observations. The full model, with every available predictor, has residual standard error $2$. Model A has $d = 2$ predictors and $\text{RSS} = 230$; model B has $d = 4$ and $\text{RSS} = 210$. Which has the lower AIC?
>
> > [!answer]-
> > **Plan.** Take $\hat\sigma^2 = 2^2 = 4$ from the full model and use it for both candidates.
> >
> > $$
> > \begin{align*}
> > \text{AIC}_A &= \frac{230 + 2(2)(4)}{50} \\
> > &= 4.92 \\
> > \text{AIC}_B &= \frac{210 + 2(4)(4)}{50} \\
> > &= 4.84
> > \end{align*}
> > $$
> >
> > Model B is preferred: its two extra predictors cut the RSS by $20$, more than the $16$ they add to the penalty.
