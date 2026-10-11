---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:be9884122e1e34a5e74ffb04b2bfb647bc3292bab26be419781ea97db3808708
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Predictive Distribution.md
---

The **predictive distribution** is the distribution of the *next* observation given the ones already seen, with the unknown risk parameter integrated out against its posterior. It is what a [[Bayesian Credibility]] forecast is really a mean of.

> $$f(x_{n+1} \mid \mathbf{x}) = \int f(x_{n+1} \mid \theta)\, \pi(\theta \mid \mathbf{x})\, d\theta$$

- The **prior predictive** (or marginal) distribution uses $\pi(\theta)$ instead of the posterior — it is the denominator of [[Bayes Theorem]] and describes a risk you know nothing about
- The Bayesian credibility estimate is its mean: $E[X_{n+1} \mid \mathbf{x}] = E_\theta\!\left[\mu(\theta) \mid \mathbf{x}\right]$
- It is **wider** than the conditional distribution $f(x \mid \hat\theta)$ at a plugged-in point estimate, because it carries parameter uncertainty as well as process variance
- Gamma-Poisson gives a Negative Binomial predictive; Beta-Bernoulli gives a Beta-Binomial — mixing always produces a heavier tail than the component
- Only the mean is needed for a credibility estimate, but the full distribution is what prices a limit or a reinsurance layer
- **Unpaid claims (Exam 7).** Verrall (2007) calls loss reserving a predictive process: the observed data are used to predict future loss emergence, and the mean of the predictive distribution of future losses is the prediction. Its root mean squared error of prediction is the [[Prediction Error|prediction error]], and prediction variance = process variance + estimation variance. The three readings below differ in how they obtain the whole distribution.
  - **Verrall (2007).** Bayesian models, simulated by [[Markov Chain Monte Carlo]], give the full predictive distribution of the reserves, and the prediction error is the standard deviation of that distribution. Expert opinion enters through the prior distributions, either on individual development factors or on each accident year's expected ultimate in a stochastic [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] model. Priors with large variances reproduce the [[Chain Ladder Method|chain ladder]], and priors with very small variances reproduce Bornhuetter-Ferguson.
  - **Shapland (2016).** The ODP [[Bootstrap|bootstrap]] resamples residuals to build sample triangles and applies each sample's development factors to give a distribution of point estimates. It then adds process variance by drawing each future incremental value from a gamma distribution with mean $m_{w,d}$ and variance $\phi\, m_{w,d}$. The result reflects both process variance and parameter variance, and some authors call it the full predictive distribution of the cash flows.
  - **Meyers (2019).** A Bayesian MCMC model gives a sample of 10,000 parameter vectors from the posterior distribution. For each one, the loss at development year 10 is simulated (lognormal in his cross classified model), and the simulated outcomes form the predictive distribution, with their mean as the estimate. A model is validated by checking that the percentiles of actual outcomes, over many triangles, are uniformly distributed. On his data the Mack and ODP bootstrap models did not accurately predict the distribution of outcomes.

![[Media/Figures/Predictive_Distribution.svg|340]]

> [!example]- Negative Binomial from a Gamma-Poisson Mixture {Example}
> Claim counts are Poisson$(\Lambda)$ with $\Lambda \sim$ Gamma$(\alpha = 2, \theta = 0.5)$ and no experience yet. Find $E[N]$ and $\mathrm{Var}(N)$ under the prior predictive distribution.
>
> > [!answer]-
> > Mixing a Poisson over a Gamma gives a Negative Binomial with $r = \alpha = 2$, $\beta = \theta = 0.5$:
> > $$E[N] = E[\Lambda] = \alpha\theta = 1.0$$
> > $$\mathrm{Var}(N) = E[\Lambda] + \mathrm{Var}(\Lambda) = \alpha\theta + \alpha\theta^{2} = 1.0 + 0.5 = 1.5$$
> > The variance exceeds the mean — the parameter uncertainty adds $\alpha\theta^2$ on top of Poisson process variance, which is why mixed claim counts are overdispersed.

> [!tip]- How it appears on the exam
> - **Exam 7** objective A10 asks candidates to derive predictive distributions using stochastic methods, and the content outline assigns it to Meyers, Shapland, and Taylor and McGuire. Verrall is assigned to the neighbouring objectives on the mean and prediction error of a reserve (A9) and on a range of indications (A13).
