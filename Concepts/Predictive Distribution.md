---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-16
  last_checked_by: agent:validate-v1
  content_hash: sha256:aaadb8162b54840cc8e568fe4aab4da09c2096e57c4f4fae68bd1c5ce7715f00
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

The **predictive distribution** is the distribution of the *next* observation given the ones already seen, with the unknown risk parameter integrated out against its posterior. It is what a [[Bayesian Credibility]] forecast is really a mean of.

> $$f(x_{n+1} \mid \mathbf{x}) = \int f(x_{n+1} \mid \theta)\, \pi(\theta \mid \mathbf{x})\, d\theta$$

- The **prior predictive** (or marginal) distribution uses $\pi(\theta)$ instead of the posterior — it is the denominator of [[Bayes Theorem]] and describes a risk you know nothing about
- The Bayesian credibility estimate is its mean: $E[X_{n+1} \mid \mathbf{x}] = E_\theta\!\left[\mu(\theta) \mid \mathbf{x}\right]$
- Mixing over the unknown parameter adds variance: the Gamma-Poisson's Negative Binomial has the same mean as the Poisson but a larger variance, from the uncertainty of not knowing which risk was selected
- Gamma-Poisson gives a Negative Binomial predictive, with the posterior Gamma's parameters in place of the prior's; Beta-Bernoulli and Normal-Normal are other conjugate pairs
- Only the mean is needed for a credibility estimate, but the full distribution gives probabilities, such as the chance of two or more claims next year
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
