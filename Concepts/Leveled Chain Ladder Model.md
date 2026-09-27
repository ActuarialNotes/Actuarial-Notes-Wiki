---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:384fcf724f9c1b8a31a8abba70773713fd2f888784f73e42dbc3896de8a40b4d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Leveled Chain Ladder Model.md
---

**Leveled Chain Ladder Model** (LCL) is the first Bayesian model in the 2015 first edition of Meyers' *Stochastic Loss Reserving Using Bayesian MCMC Models*. It keeps the [[Chain Ladder Method|chain ladder's]] accident-year level and development-year effects. Where Mack fixes each year's level at its latest reported loss, the LCL makes the level a random parameter $\alpha_w$, and it models each cumulative loss as [[Lognormal Distribution|lognormal]].

> $$\mu_{w,d} = \alpha_w + \beta_d$$

> $$C_{w,d} \sim \text{lognormal}(\mu_{w,d},\ \sigma_d), \quad \sigma_1 > \sigma_2 > \dots > \sigma_{10}$$

- $C_{w,d}$ is the cumulative loss of accident year $w$ at development year $d$ ($w, d = 1, \dots, 10$), and $\beta_{10} = 0$ to prevent overdetermining the model. The priors are deliberately wide:
    - $\alpha_w \sim \text{normal}\big(\log(\text{Premium}_w) + \mathit{logelr},\ \sqrt{10}\big)$, with $\mathit{logelr} \sim \text{uniform}(-1, 0.5)$
    - $\beta_d \sim \text{uniform}(-5, 5)$ for $d < 10$
    - $\sigma_d = \sum_{i=d}^{10} a_i$ with $a_i \sim \text{uniform}(0, 1)$. This hierarchy forces $\sigma_d$ to fall with $d$, since fewer claims remain open and subject to random outcomes.
- **What it fixes.** The [[Mack Chain Ladder Model|Mack model]] multiplies the age-to-age factors by the last observed loss $C_{w,11-w}$, so it treats those losses as fixed level parameters. A model that treats the level of each accident year as random predicts more risk. Mack's model had understated the variability of incurred ultimates.
- **Fitting.** The parameters are fitted by [[Markov Chain Monte Carlo|MCMC]] (JAGS, in the first edition), and 10,000 posterior draws are used to simulate the outcome at development year 10.
- **Validation** on 200 incurred triangles, with [[PP Plot|p-p plots]] and Kolmogorov-Smirnov bands of $19.2$ for one line and $9.6$ combined:
    - The plots lie within the band for Commercial Auto, Personal Auto and Workers' Compensation ($D = 9.3$, $13$, $15.4$) but not Other Liability ($20.6$).
    - All four lines show the slanted "S" of a model **too thin in the tails**. The combined plot lies outside the band ($D = 11.4$), though it improves on Mack.
    - The LCL "improves the estimation of the variability, but does not go far enough". The next model, the [[Correlated Chain Ladder Model|correlated chain ladder (CCL)]], adds correlation between accident years, and reduces to the LCL when $\rho = 0$.
- **For the illustrative insurer** (incurred), the LCL's standard deviation of the total ultimate is $1{,}551$, against Mack's $1{,}057$. The actual outcome falls at the $76.38$th percentile against Mack's $86.03$rd.
- **Not in the current reading.** The second edition, [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]], assigned for Exam 7, drops the name. Its [[Cross Classified Model|cross classified (CRC) model]] keeps the same $\alpha_w + \beta_d$ lognormal structure but writes the level as $\log(\text{Premium}_w) + \mathit{logelr} + \alpha_w$, uses normal priors, and sums the $a_i$ to give $\sigma_d^2$ rather than $\sigma_d$. Meyers also notes that the LCL of his 2012 working paper differs from this one.
- Source: Meyers, [first edition, CAS Monograph No. 1 (2015)](https://www.casact.org/sites/default/files/2021-02/01-Meyers.PDF), Section 5.

> [!example]- Moments From One Posterior Draw {Example}
> One posterior draw for accident year $w$ has $\alpha_w = 8.39$, and $\sigma_{10} = 0.02$. Since $\beta_{10} = 0$, compute the mean and standard deviation of $C_{w,10}$ given this draw.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \mu_{w,10} &= 8.39 + 0 \\
> > &= 8.39 \\
> > E[C_{w,10}] &= e^{8.39 + 0.02^2/2} \\
> > &= 4{,}404 \\
> > \mathrm{SD}[C_{w,10}] &= 4{,}404 \times \sqrt{e^{0.02^2} - 1} \\
> > &= 88
> > \end{align*}
> > $$
> >
> > Given the parameters, the year's ultimate has a coefficient of variation of only $2\%$. That is [[Process Risk|process risk]] alone, and at development year 10 it is small because $\sigma_{10}$ is.

> [!example]- A Random Level Adds Parameter Risk {Example}
> Four equally likely posterior draws give $\alpha_w = 8.30$, $8.36$, $8.42$ and $8.48$ for one accident year, each with $\sigma_{10} = 0.02$. Compute the predictive mean of $C_{w,10}$ and split its variance into parameter and process risk.
>
> > [!answer]-
> > The mean given each draw is $e^{\alpha_w + 0.0002}$: $4{,}025$, $4{,}274$, $4{,}538$ and $4{,}818$.
> >
> > $$
> > \begin{align*}
> > \text{Predictive mean} &= \tfrac{1}{4}(4{,}025 + 4{,}274 + 4{,}538 + 4{,}818) \\
> > &= 4{,}414 \\
> > \text{Parameter var} &= \mathrm{Var}\big(E[C \mid \alpha]\big) \\
> > &= 87{,}544 \\
> > \text{Process var} &= E\big[(e^{0.0004} - 1)\, E[C \mid \alpha]^2\big] \\
> > &= 7{,}829 \\
> > \mathrm{SD} &= \sqrt{87{,}544 + 7{,}829} \\
> > &= 309
> > \end{align*}
> > $$
> >
> > $92\%$ of the variance comes from not knowing the level. A model that fixes the level at the latest reported loss has no such term, which is the mechanism behind the LCL's wider distributions. In the first edition Meyers makes the same split for the CCL on the illustrative insurer and finds process risk minimal.
