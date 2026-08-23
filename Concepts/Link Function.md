---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:706cce7fbd7603a6e8a66e4eb79af9d3129356ab1ea9c3fbe8ecf508927444ad
  sources: []
  open_findings: 0
  log: .verify/Concepts/Link Function.md
---

A **Link Function** $g$ is a monotone, differentiable function in a [[Generalized Linear Model]] that connects the **expected value** of the response $\mu = E[Y]$ to the **linear predictor** $\eta = \mathbf{x}^\top\boldsymbol{\beta}$:

> $$g(\mu) = \eta$$

> $$= \beta_0 + \beta_1 x_1 + \cdots + \beta_p x_p$$

> $$\mu = g^{-1}(\eta)$$

- The **canonical link** is the natural link arising from the exponential family form of the distribution; it often leads to simpler inference
- The choice of link function ensures that fitted means $\hat{\mu}$ respect the support of $Y$ (e.g., positivity for counts and severities)

**Common link functions:**

| Name | $g(\mu)$ | $g^{-1}(\eta)$ | Typical Use |
| :--- | :--- | :--- | :--- |
| Identity | $\mu$ | $\eta$ | Normal regression |
| Log | $\ln\mu$ | $e^\eta$ | Poisson (counts), Gamma (severity) |
| Logit | $\ln\!\frac{\mu}{1-\mu}$ | $\frac{e^\eta}{1+e^\eta}$ | Binomial (binary outcomes) |
| Reciprocal | $1/\mu$ | $1/\eta$ | Gamma (inverse) |
| Probit | $\Phi^{-1}(\mu)$ | $\Phi(\eta)$ | Binary outcomes |

- The **log link** is standard for insurance severity and frequency models because it guarantees positive fitted values and allows multiplicative interpretation: a unit increase in $x_j$ multiplies $\mu$ by $e^{\beta_j}$

![[Media/Figures/Link_Function.svg|340]]

> [!example]- Interpreting a Log-Link Coefficient {Example}
> A Gamma GLM with log link models claim severity. The coefficient on the indicator for "sports car" is $\hat{\beta} = 0.35$. Interpret this coefficient.
>
> > [!answer]-
> > With a log link, $\ln(\mu_{\text{sports}}) - \ln(\mu_{\text{non-sports}}) = 0.35$, so $\mu_{\text{sports}}/\mu_{\text{non-sports}} = e^{0.35} \approx 1.42$.
> > Sports cars are associated with expected claim severity that is approximately **42% higher** than non-sports cars, holding all else equal.
