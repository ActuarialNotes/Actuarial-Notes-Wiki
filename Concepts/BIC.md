The **Bayesian Information Criterion (BIC)** (also called the **Schwarz criterion**) is a model selection measure that penalizes model complexity more heavily than [[AIC]] by using $\ln(n)$ as the penalty per parameter.

> $$\text{BIC} = -2\ell(\hat{\boldsymbol{\beta}}) + p\ln(n)$$
>
> $$\text{where } \ell(\hat{\boldsymbol{\beta}}) \text{ is the maximized log-likelihood, } p \text{ is the number of parameters, and } n \text{ is the sample size}$$

- **Lower BIC** indicates a better model; like [[AIC]], it does not require nested models
- BIC tends to select **simpler models** than AIC for large $n$ since $\ln(n) > 2$ when $n > 7$
- BIC is consistent: as $n \to \infty$, it selects the true model (if it is among the candidates); AIC is not consistent but is **asymptotically efficient**
- In practice, if AIC and BIC disagree, BIC typically selects a more parsimonious model

> [!example]- Comparing AIC and BIC for Model Selection {Example}
> With $n = 100$ observations, compare two models: Model A has $p_A = 5$ parameters and $\ell_A = -200$; Model B has $p_B = 2$ parameters and $\ell_B = -210$.
>
> > [!answer]-
> > $$\text{AIC}_A = -2(-200) + 2(5) = 410; \quad \text{AIC}_B = -2(-210) + 2(2) = 424$$
> > AIC prefers Model A (410 < 424).
> > $$\text{BIC}_A = 400 + 5\ln(100) = 400 + 23.03 = 423.03$$
> > $$\text{BIC}_B = 420 + 2\ln(100) = 420 + 9.21 = 429.21$$
> > BIC also prefers Model A (423.03 < 429.21) in this case, though the margin is much smaller.
