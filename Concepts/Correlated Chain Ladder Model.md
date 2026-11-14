---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b733a084b0c7cfc11e928427612ee8053cd66c2a07f081d0938155cfa9c41c28
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Correlated Chain Ladder Model.md
---

The **Correlated Chain Ladder Model** (CCL) is the Bayesian model for **incurred** triangles in the 2015 first edition of Meyers' *Stochastic Loss Reserving Using Bayesian MCMC Models*. It adds correlation between successive [[Accident Year|accident years]] to the [[Leveled Chain Ladder Model|leveled chain ladder (LCL) model]], so each year's log mean moves by $\rho$ times the previous year's deviation from its own log mean.

The cumulative loss $C_{w,d}$ of accident year $w$ at development year $d$, for $w, d = 1, \ldots, 10$, is

> $$C_{w,d} \sim \text{lognormal}(\mu_{w,d},\ \sigma_d)$$

The log mean of accident year 1 is

> $$\mu_{1,d} = \alpha_1 + \beta_d$$

and for $w > 1$ it is

> $$
> \begin{aligned}
> \mu_{w,d} = {} & \alpha_w + \beta_d \\
> & + \rho \cdot \big(\log(C_{w-1,d}) - \mu_{w-1,d}\big)
> \end{aligned}
> $$

- $\alpha_w$ is the level of accident year $w$.
- $\beta_d$ is the development parameter of year $d$, with $\beta_{10} = 0$.
- $\rho$ is the correlation parameter.
- $\sigma_d$ is the standard deviation of the log loss at development year $d$, with $\sigma_1 > \sigma_2 > \cdots > \sigma_{10}$.

The expected ultimate loss of accident year $w$ is $e^{\mu_{w,10} + \sigma_{10}^2/2}$. The priors are:

- $\alpha_w \sim \text{normal}\big(\log(\text{Premium}_w) + \mathit{logelr},\ \sqrt{10}\big)$, with $\mathit{logelr} \sim \text{uniform}(-1, 0.5)$.
- $\beta_d \sim \text{uniform}(-5, 5)$ for $d < 10$.
- $\rho \sim \text{uniform}(-1, 1)$, the full permissible range.
- $\sigma_d = \sum_{i=d}^{10} a_i$, with $a_i \sim \text{uniform}(0, 1)$.

$\rho = 0$ gives back the LCL model. Meyers chose diffuse priors because he knew nothing of each insurer beyond Schedule P. An actuary who knows the expected loss ratio can tighten the priors on $\alpha_w$ and $\mathit{logelr}$, in the spirit of the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] method.

## Correlation between accident years

The [[Mack Chain Ladder Model|Mack model]] assumes the accident years are independent, and it understated the variability of incurred outcomes. The LCL's random levels helped but not enough. [[Correlation]] between accident years can raise the standard deviation of the total further.

The first edition states that, given $\{\alpha_w\}$, $\{\beta_d\}$ and $\rho$, $\rho$ is the coefficient of correlation between $\log C_{w-1,d}$ and $\log C_{w,d}$. The second edition's [[Correlated Accident Year Model|CAY model]] has the same $\rho$ term, and there a proposition credited to John Major gives the correlation as $\rho/(1+\rho^2)$ for adjacent years and $0$ for years further apart.

## Simulating the outcome

The predictive distribution is a mixture over the posterior. For each of 10,000 [[Markov Chain Monte Carlo|MCMC]] parameter sets, start from the known $C_{1,10}$. Compute $\mu_{2,10}$ and simulate $\tilde C_{2,10}$, then use that draw to compute $\mu_{3,10}$, and so on to $\tilde C_{10,10}$. The outcome's percentile is the share of simulated totals at or below the actual total.

> [!example]- What are $\mu_{2,10}$, $\mu_{3,10}$ and the expected $C_{3,10}$ on this simulation path? {Example}
> The first MCMC draw for Meyers' illustrative incurred triangle has $\alpha_1 = 8.2763$, $\alpha_2 = 7.8226$, $\alpha_3 = 8.2625$, $\beta_{10} = 0$, $\rho = 0.1828$ and $\sigma_{10} = 0.0170$. The known $C_{1,10} = 3{,}917$, and the simulation draws $\tilde C_{2,10} = 2{,}520$.
>
> > [!answer]-
> > - $\mu_{1,10} = \alpha_1 + \beta_{10} = 8.2763$.
> > - Accident year 1's log residual is $\ln 3{,}917 - 8.2763 = -0.00322$, almost exactly on its log mean.
> > - $\mu_{2,10} = 7.8226 + 0.1828 \times (-0.00322) = 7.8220$, so year 1 barely moves year 2.
> > - The simulated year 2 has log residual $\ln 2{,}520 - 7.8220 = 0.0100$, $1\%$ above its log mean.
> > - $\mu_{3,10} = 8.2625 + 0.1828 \times 0.0100 = 8.2643$.
> > - $E[C_{3,10}] = e^{8.2643 + 0.0170^2/2} = 3{,}883$.
> > - Both log means match Meyers' Table 6 ($7.8221$ and $8.2643$). Chained over nine years and 10,000 draws, these carry-overs widen the distribution of the total.

For the illustrative insurer's incurred triangle, the total's standard deviation is $1{,}901$, and the standard deviation of its expected value across the posterior draws is $1{,}893$. So nearly all of the variance is [[Parameter Risk|parameter risk]], and [[Process Risk|process risk]] is under $1\%$ of it. Meyers found the same on several other insurers, some very large, and prefers to focus on total risk, the only risk that can be tested against actual outcomes.

## Validation

On [[PP Plot|p-p plots]], with Kolmogorov-Smirnov bands of $19.2$ per line and $9.6$ combined:

- **Incurred:** all four lines lie within the band, Other Liability only just ($19.1$). The combined plot is within too ($D = 7.4$), though its slanted "S" shows a mildly thin tail. Meyers concludes that the CCL predicts the distribution of incurred outcomes correctly within the specified confidence level.
- **Paid:** like the ODP bootstrap and Mack, it produces estimates that are too high ($D = 25.1$ combined). That led to the incremental trend models and the [[Changing Settlement Rate Model|changing settlement rate model]].

The standard deviations exceed the LCL's, which Meyers attributes to generally positive posterior $\rho$s. For the illustrative insurer the total's standard deviation is $1{,}901$, against $1{,}551$ for the LCL and $1{,}057$ for Mack.

The second edition, [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]], assigned for Exam 7, has no CCL. Its [[Correlated Accident Year Model|correlated accident year (CAY) model]] applies the same $\rho$ term to a [[Cross Classified Model|cross classified]] base, with a $\text{beta}(2,2)$-based prior on $\rho$. The CCL is in Sections 5 and 7 of the [first edition, CAS Monograph No. 1 (2015)](https://www.casact.org/sites/default/files/2021-02/01-Meyers.PDF).
