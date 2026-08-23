---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:98dd81f805e47993b4903b7dd34a366f71795a3c9f1fcd44388f37ee6b2843e4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Dispersion Parameter.md
---

The **Dispersion Parameter** $\phi$ is the scale factor in an [[Exponential Family]] variance: $\text{Var}(Y) = \phi\,V(\mu)$. It separates *how the variance depends on the mean* (the variance function $V$, fixed by the chosen distribution) from *how large the variance is overall* (the scale, estimated from the data).

> $$\text{Var}(Y_i) = \frac{\phi\,V(\mu_i)}{w_i}$$

> $$\hat\phi = \frac{1}{n-p}\sum_{i=1}^{n}\frac{w_i\,(y_i - \hat\mu_i)^2}{V(\hat\mu_i)} \qquad \text{(Pearson estimate)}$$

- For the **Normal** response $\phi = \sigma^2$; for **Poisson** and **binomial** the theory fixes $\phi = 1$; for **[[Gamma]]** $\phi$ is the squared coefficient of variation
- $\phi$ does **not** affect the fitted coefficients $\hat\beta$ — it scales their standard errors by $\sqrt{\hat\phi}$, and so changes every p-value and [[Confidence Interval]] in [[Parameter Estimate Tables]]
- $\hat\phi > 1$ in a Poisson or binomial model is **overdispersion**: more spread than the distribution permits, usually from unmodelled heterogeneity, correlated observations, or a missing predictor
- Two estimators are in common use — the Pearson $\chi^2$ statistic over degrees of freedom (above) and the residual [[Deviance]] over degrees of freedom. The Pearson version is generally preferred
- The **scaled deviance** $D^* = D/\phi$ is what is compared against $\chi^2$; when $\phi$ has to be estimated, model comparisons use the $F$ statistic $\frac{\Delta D/r}{\hat\phi}$ instead
- Prior weights $w_i$ (e.g. exposure or claim count) divide the variance: a group average built from many observations is more precisely known, which is how grouped data is fitted correctly

![[Media/Figures/Dispersion_Parameter.svg|340]]

> [!example]- Estimating and Applying the Dispersion {Example}
> A Poisson GLM on $500$ observations with $8$ parameters has a Pearson $\chi^2$ of $1{,}230$. Estimate $\phi$ and adjust a coefficient with $\hat\beta = 0.40$ and unscaled $\text{SE} = 0.15$.
>
> > [!answer]-
> > $$\hat\phi = \frac{1{,}230}{500 - 8} = \frac{1{,}230}{492} = 2.50$$
> > $$\text{SE}_{\text{scaled}} = 0.15\sqrt{2.50} = 0.237$$
> > The Wald statistic falls from $0.40/0.15 = 2.67$ (significant) to $0.40/0.237 = 1.69$ (not significant at $5\%$). Ignoring overdispersion would have kept a predictor the data does not support.

> [!example]- Dispersion in a Gamma Severity Model {Example}
> A Gamma GLM for severity returns $\hat\phi = 0.64$. What does that say about the spread of individual claims?
>
> > [!answer]-
> > For a Gamma, $\text{Var}(Y) = \phi\mu^2$, so the coefficient of variation is $\sqrt{\phi} = 0.80$ — the standard deviation of a claim is about $80\%$ of its expected size, whatever the size. It also corresponds to a Gamma shape of $\alpha = 1/\phi = 1.56$, a right-skewed severity distribution, and here $\phi$ is a genuine parameter of the model rather than a symptom of anything wrong.
