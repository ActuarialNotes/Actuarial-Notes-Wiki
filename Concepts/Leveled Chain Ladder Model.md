---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b3b336b7d2760f7ecd0bef99a29b4a42ec5296ca41f3ebaed2c81ea53704db7a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Leveled Chain Ladder Model.md
---
The **Leveled Chain Ladder Model** (LCL) is a Bayesian loss reserving model that keeps the [[Chain Ladder Method|chain ladder's]] accident-year level and development-year effects. Where Mack fixes each year's level at its latest reported loss, the LCL makes the level a random parameter $\alpha_w$, and it models each cumulative loss as [[Lognormal Distribution|lognormal]]. It is the first Bayesian model in the 2015 first edition of Meyers' *Stochastic Loss Reserving Using Bayesian MCMC Models*. The mean of the log of the cumulative loss of accident year $w$ at development year $d$ is

> $$\mu_{w,d} = \alpha_w + \beta_d$$

- $w, d = 1, \dots, 10$.
- $\beta_d$ is the effect of development year $d$, with $\beta_{10} = 0$ to prevent overdetermining the model.

and the cumulative loss itself is

> $$C_{w,d} \sim \text{lognormal}(\mu_{w,d},\ \sigma_d)$$

- $\sigma_1 > \sigma_2 > \dots > \sigma_{10}$.

The priors are deliberately wide:

1. $\alpha_w \sim \text{normal}\big(\log(\text{Premium}_w) + \mathit{logelr},\ \sqrt{10}\big)$, with $\mathit{logelr} \sim \text{uniform}(-1, 0.5)$.
2. $\beta_d \sim \text{uniform}(-5, 5)$ for $d < 10$.
3. $\sigma_d = \sum_{i=d}^{10} a_i$ with $a_i \sim \text{uniform}(0, 1)$.

The sum forces $\sigma_d$ to fall with $d$, since fewer claims remain open and subject to random outcomes.

> [!example]- One posterior draw for accident year $w$ has $\alpha_w = 8.39$ and $\sigma_{10} = 0.02$. What are the mean and standard deviation of $C_{w,10}$ given this draw? {Example}
> - Since $\beta_{10} = 0$, $\mu_{w,10} = 8.39$.
> - The lognormal mean is $E[C_{w,10}] = e^{8.39 + 0.02^2/2} = 4{,}404$.
> - The standard deviation is $4{,}404 \times \sqrt{e^{0.02^2} - 1} = 88$.
> - Given the parameters, the ultimate has a coefficient of variation of only $2\%$. That is [[Process Risk|process risk]] alone, and at development year 10 it is small because $\sigma_{10}$ is.

## Comparison with the Mack model

The [[Mack Chain Ladder Model|Mack model]] multiplies the age-to-age factors by the last observed loss $C_{w,11-w}$, so it treats those losses as fixed level parameters. A model that treats the level of each accident year as random predicts more risk. Mack's model had understated the variability of incurred ultimates. For the illustrative insurer's incurred losses, the LCL's standard deviation of the total ultimate is $1{,}551$, against Mack's $1{,}057$. The actual outcome falls at the $76.38$th percentile, against Mack's $86.03$rd.

> [!example]- How much of the variance of $C_{w,10}$ is parameter risk, given these four posterior draws? {Example}
> Four equally likely posterior draws give $\alpha_w = 8.30$, $8.36$, $8.42$ and $8.48$ for one accident year, each with $\sigma_{10} = 0.02$.
>
> > [!answer]-
> > - The mean given each draw is $e^{\alpha_w + 0.0002}$: $4{,}025$, $4{,}274$, $4{,}538$ and $4{,}818$.
> > - The predictive mean is their average, $4{,}414$.
> > - The parameter variance is the variance of those four means, $\mathrm{Var}\big(E[C \mid \alpha]\big) = 87{,}544$.
> > - The process variance is the average of $(e^{0.0004} - 1)\, E[C \mid \alpha]^2$, which is $7{,}829$.
> > - The predictive standard deviation is $\sqrt{87{,}544 + 7{,}829} = 309$.
> > - Parameter risk is $87{,}544/95{,}373 = 92\%$ of the variance. A model that fixes the level at the latest reported loss has no such term, which is why the LCL's distributions are wider.

## Fitting and validation

The parameters are fitted by [[Markov Chain Monte Carlo|MCMC]] (JAGS, in the first edition), and 10,000 posterior draws are used to simulate the outcome at development year 10. Meyers sets the model out in Section 5 of the [first edition, CAS Monograph No. 1 (2015)](https://www.casact.org/sites/default/files/2021-02/01-Meyers.PDF).

It was validated on 200 incurred triangles, with [[PP Plot|p-p plots]] and Kolmogorov-Smirnov bands of $19.2$ for one line and $9.6$ combined. The plots lie within the band for Commercial Auto, Personal Auto and Workers' Compensation ($D = 9.3$, $13$, $15.4$) but not Other Liability ($20.6$). All four lines show the slanted "S" of a model too thin in the tails. The combined plot lies outside the band ($D = 11.4$), though it improves on Mack.

The LCL "improves the estimation of the variability, but does not go far enough". The next model, the [[Correlated Chain Ladder Model|correlated chain ladder (CCL)]], adds correlation between accident years, and reduces to the LCL when $\rho = 0$.

## The cross classified model

The second edition, [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]], assigned for Exam 7, drops the name. Its [[Cross Classified Model|cross classified (CRC) model]] keeps the same $\alpha_w + \beta_d$ lognormal structure but writes the level as $\log(\text{Premium}_w) + \mathit{logelr} + \alpha_w$, uses normal priors, and sums the $a_i$ to give $\sigma_d^2$ rather than $\sigma_d$. Meyers also notes that the LCL of his 2012 working paper differs from this one.
