---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7ad2ea6ddb900e0fe23e07ad8747bc75b5854380a9aedb7b7d40115d0ec81e04
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Fitted Values.md
---

**Fitted values** are a model's estimates of the mean response for the observations it was fitted to — $\hat{y}_i$ in [[Linear Regression]], $\hat\mu_i$ in a [[Generalized Linear Model]]. The gap between each observation and its fitted value is the [[Residual|residual]], so fitted values are the reference point for every [[Model Diagnostics|diagnostic]].

> $$\hat{\mathbf{y}} = \mathbf{X}\hat{\boldsymbol\beta} = \mathbf{H}\mathbf{y}$$

> $$\hat\mu_i = g^{-1}(\hat\eta_i) = g^{-1}(\mathbf{x}_i^\top\hat{\boldsymbol\beta})$$

- $\mathbf{X}$ is the [[Design Matrix|design matrix]], $\mathbf{H}$ the [[Hat Matrix|hat matrix]], $g$ the [[Link Function|link function]] and $\hat\eta_i$ the fitted linear predictor. In OLS, each $\hat{y}_i = \sum_j h_{ij}\,y_j$ is a weighted combination of all the responses
- **Two scales in a GLM.** $\hat\eta_i$ is the fitted value on the *link* scale and $\hat\mu_i$ on the *response* scale; R returns either with `predict(fit, type = "link")` or `type = "response"`. With a log link $\hat\mu_i = e^{\hat\eta_i}$, and a log-exposure [[Offset Variable|offset]] is part of $\hat\eta_i$
- **OLS with an intercept**: the residuals sum to zero, so the fitted values average to $\bar{y}$, and the residuals are uncorrelated with the fitted values. That is why a residuals-versus-fitted [[Residual Plot|plot]] never shows a linear trend — any pattern it does show is curvature or changing spread. [[R-Squared]] equals the squared correlation between $y$ and $\hat{y}$
- **Balance in a GLM**: with the canonical link and an intercept (Poisson with log, binomial with logit, Normal with identity), the fitted values reproduce the observed total — and, for each level of a categorical predictor, that level's total. A [[Gamma]] model with a log link is not canonical and balances only approximately
- **Fitted is not predicted.** A fitted value is in-sample: the model was chosen to match it, so the fitted error understates the [[Prediction Error|error on new data]]. Judge a model on a [[Holdout Sample|holdout sample]] or by [[Cross-Validation|cross-validation]]
- A [[Linear Mixed Model]] has two kinds: **marginal** fitted values $\mathbf{X}\hat{\boldsymbol\beta}$, the population average, and **conditional** ones $\mathbf{X}\hat{\boldsymbol\beta} + \mathbf{Z}\hat{\mathbf{b}}$, which add each group's [[Best Linear Unbiased Predictor|BLUP]]

> [!example]- Fitted Claim Counts on Both Scales {Example}
> A Poisson frequency GLM has $\hat\eta = \ln(\text{exposure}) - 2.0 + 0.4\,I_{\text{urban}}$. Policy A is rural with $0.5$ years of exposure and no claims; policy B is urban with $1.0$ year and one claim. Find each fitted value on the link and response scales, and each raw residual.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \hat\eta_A &= \ln 0.5 - 2.0 \\
> > &= -2.693 \\
> > \hat\mu_A &= e^{-2.693} \\
> > &= 0.0677 \\
> > \hat\eta_B &= 0 - 2.0 + 0.4 \\
> > &= -1.6 \\
> > \hat\mu_B &= e^{-1.6} \\
> > &= 0.2019
> > \end{align*}
> > $$
> > The residuals are $0 - 0.0677 = -0.0677$ for A and $1 - 0.2019 = 0.7981$ for B. B's large residual is not evidence against the model: a Poisson count with mean $0.2019$ is positive with probability $1 - e^{-0.2019} = 0.183$. Individual residuals of a count model are lumpy by nature, which is why they are read in aggregate.

> [!example]- Fitted Values That Balance by Construction {Example}
> A Poisson GLM with a log link, an intercept and territory as its only predictor is fitted to: A — $1{,}000$ car-years, $50$ claims; B — $400$ car-years, $30$ claims; C — $600$ car-years, $24$ claims. The coefficients are $\hat\beta_0 = \ln 0.05$, $\hat\beta_B = \ln 1.5$ and $\hat\beta_C = \ln 0.8$. Compute the fitted claim counts. Does their agreement with the data show a good model?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \hat\mu_A &= 1{,}000 \times 0.05 \\
> > &= 50 \\
> > \hat\mu_B &= 400 \times 0.05 \times 1.5 \\
> > &= 30 \\
> > \hat\mu_C &= 600 \times 0.05 \times 0.8 \\
> > &= 24
> > \end{align*}
> > $$
> > The fitted counts match each territory's observed count exactly, and so match the total of $104$. This is not evidence of quality: with the canonical log link the maximum likelihood equations are $\mathbf{X}^\top(\mathbf{y} - \hat{\boldsymbol\mu}) = \mathbf{0}$, which force the fitted total of every indicator column to equal the observed total. The model has simply spent one parameter per territory. Whether the relativities $1.5$ and $0.8$ hold up is a question for a holdout period.
