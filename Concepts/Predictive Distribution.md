---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-16
  last_checked_by: agent:validate-v1
  content_hash: sha256:8edc131becadfda65e8514ef949abcf0112972dc229a76556ea1e1f00aff7d87
  sources:
    - "Mahler & Dean, Credibility, ch. 8 of Foundations of Casualty Actuarial Science, 4th ed. (CAS, 2001), prepublication copy, SOA study note C-21-01, §4.2-4.3 (pp. 8-80 to 8-90) and §5.2-5.3 (pp. 8-95 to 8-104), sha256:bccdb7968ae276e041bf7f6eb5aea3aea473f1dc7739bc64352419c8a6a0f3c5 — https://www.soa.org/globalassets/assets/files/edu/c-21-01.pdf"
    - "Verrall, Variance 1(1) 2007, Sections 1, 3, 5, 6.1 (pp. 53-60, 61-63, 65-66; PDF 1-8, 9-11, 13-14), sha256:da4a19ac50ec7756ad651c5632e73b71ff99f584d7db436772f94de1ec024506 — https://www.casact.org/sites/default/files/2021-03/7_Verrall.pdf"
    - "Shapland, CAS Monograph 4 (2016), Sections 1, 3.2-3.4, 4.1.1, 5.5.1, 6, 6.1 (pp. 1-3, 8-19, 21-22, 41-49; PDF 9-11, 16-27, 29-30, 49-57), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
    - "Meyers, Stochastic Loss Reserving Using Bayesian MCMC Models, 2nd ed., CAS Monograph 8 (2019), title/copyright and contents (PDF 1-5), Preface, Sections 1-12, References and Appendix, pp. 1-85 (PDF 11-98), sha256:3c01999f6c8a170dc412968658d4f7d673d637e74cb27d84b4173ea60532d2d1 — https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf"
    - "Exam 7 Content Outline, Fall 2026, PDF pp.4-6, readings list and complete text references, sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Predictive Distribution.md
---

![[Media/Figures/Predictive_Distribution.svg|340]]

A **Predictive Distribution** is the distribution of the next observation $X_{n+1}$ given the observations $\mathbf{x} = (x_1, \ldots, x_n)$ already seen, with the unknown parameter $\theta$ integrated out against its [[Posterior Distribution|posterior distribution]]. Its density is

> $$f(x_{n+1} \mid \mathbf{x}) = \int f(x_{n+1} \mid \theta)\, \pi(\theta \mid \mathbf{x})\, d\theta$$

- $f(x_{n+1} \mid \theta)$ is the distribution of one observation given $\theta$.

The Bayesian credibility estimate is its mean: $E[X_{n+1} \mid \mathbf{x}] = E_\theta\!\left[\mu(\theta) \mid \mathbf{x}\right]$. Only the mean is needed for a credibility estimate, but the full distribution gives probabilities, such as the chance of two or more claims next year.

> [!example]- Drivers are 75% good (Poisson mean $0.2$) and 25% bad (Poisson mean $0.6$). After one claim in a year, a driver's posterior probabilities are $0.5987$ good and $0.4013$ bad. What is the probability the driver has a claim next year? {Example}
> - The probability of no claim is the posterior-weighted average of the class probabilities, $0.5987e^{-0.2} + 0.4013e^{-0.6} = 0.7104$.
> - The probability of at least one claim is $1 - 0.7104 = 0.2896$.

## Prior predictive distribution

The prior predictive (or marginal) distribution uses the prior $\pi(\theta)$ in place of the posterior:

> $$f(x) = \int f(x \mid \theta)\,\pi(\theta)\,d\theta$$

It is the denominator of [[Bayes Theorem|Bayes' theorem]], and it describes a risk nothing is yet known about. Mixing over the unknown parameter adds variance: the Gamma-Poisson's Negative Binomial has the same mean as the Poisson but a larger variance, from the uncertainty of not knowing which risk was selected. By the law of total variance,

> $$\mathrm{Var}(N) = E[\Lambda] + \mathrm{Var}(\Lambda)$$

- $\Lambda$ is the Poisson mean of the risk selected.

> [!example]- Claim counts are Poisson with mean $\Lambda$, and $\Lambda$ is gamma with shape $\alpha = 2$ and scale $\beta = 0.5$. With no experience yet, what are $E[N]$ and $\mathrm{Var}(N)$? {Example}
> - Mixing a Poisson over a gamma gives a negative binomial with $r = \alpha = 2$ and $\beta = 0.5$.
> - $E[N] = E[\Lambda] = \alpha\beta = 1.0$.
> - $\mathrm{Var}(N) = \alpha\beta + \alpha\beta^2 = 1.0 + 0.5 = 1.5$.
> - The variance exceeds the mean, which is why mixed claim counts are overdispersed.

## Gamma-Poisson predictive distribution

For Poisson counts and a gamma prior with shape $\alpha$ and scale $\beta$, the predictive distribution of next year's count is negative binomial with the posterior gamma's parameters in place of the prior's:

> $$r = \alpha + \sum x_i$$

> $$\beta^* = \frac{\beta}{1 + n\beta}$$

Beta-Bernoulli and normal-normal are other [[Conjugate Prior|conjugate pairs]] with predictive distributions in closed form.

> [!example]- With the gamma prior above ($\alpha = 2$, $\beta = 0.5$), a driver had 0, 2 and 1 claims in 3 years. What is the probability of two or more claims next year? {Example}
> - The predictive distribution is negative binomial with $r = 2 + 3 = 5$ and $\beta^* = 0.5/(1 + 1.5) = 0.2$.
> - $P(N = 0) = (1.2)^{-5} = 0.4019$.
> - $P(N = 1) = 5(0.2)(1.2)^{-6} = 0.3349$.
> - $P(N \ge 2) = 1 - 0.4019 - 0.3349 = 0.2632$.

## Predictive distribution of unpaid claims

Verrall (2007) calls loss reserving a predictive process: the observed data are used to predict future loss emergence, and the mean of the predictive distribution of future losses is the prediction. Its root mean squared error of prediction is the [[Prediction Error|prediction error]], and prediction variance = process variance + estimation variance. The Exam 7 readings differ in how they obtain the whole distribution:

1. **Verrall (2007).** Bayesian models, simulated by [[Markov Chain Monte Carlo]], give the full predictive distribution of the reserves, and the prediction error is the standard deviation of that distribution. Expert opinion enters through the prior distributions, either on individual development factors or on each accident year's expected ultimate in a stochastic [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] model. Priors with large variances reproduce the [[Chain Ladder Method|chain ladder]], and priors with very small variances reproduce Bornhuetter-Ferguson.
2. **Shapland (2016).** The ODP [[Bootstrap|bootstrap]] resamples residuals to build sample triangles and applies each sample's development factors to give a distribution of point estimates. It then adds process variance by drawing each future incremental value from a gamma distribution with mean $m_{w,d}$ and variance $\phi\, m_{w,d}$. The result reflects both process variance and parameter variance, and some authors call it the full predictive distribution of the cash flows.
3. **Meyers (2019).** A Bayesian MCMC model gives a sample of 10,000 parameter vectors from the posterior distribution. For each one, the loss at development year 10 is simulated (lognormal in his cross classified model), and the simulated outcomes form the predictive distribution, with their mean as the estimate. A model is validated by checking that the percentiles of actual outcomes, over many triangles, are uniformly distributed. On his data the Mack and ODP bootstrap models did not accurately predict the distribution of outcomes.
