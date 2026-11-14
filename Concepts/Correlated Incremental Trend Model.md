---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8caf98d7aa5e178b95b2298f5199ccc91f392809c7666473ffb49e30da79bd03
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Correlated Incremental Trend Model.md
---

The **Correlated Incremental Trend Model** (CIT) is the Bayesian model for **incremental paid** losses in the 2015 first edition of Meyers' *Stochastic Loss Reserving Using Bayesian MCMC Models*. It adds a payment-year (calendar-year) trend $\tau$ and correlation between accident years, and it uses a mixed lognormal-normal distribution, which is skewed to the right yet allows negative incremental losses.

For accident year $w$ and development year $d$, the log mean of the latent loss is

> $$\mu_{w,d} = \alpha_w + \beta_d + \tau \cdot (w + d - 1)$$

- $\alpha_w$ is the level of accident year $w$.
- $\beta_d$ is the development parameter, with $\beta_{10} = 0$ to prevent overdetermining the model.
- $w + d - 1$ is the payment year of the cell.

The latent mean of the cell is lognormal:

> $$Z_{w,d} \sim \text{lognormal}(\mu_{w,d},\ \sigma_d)$$

- $\sigma_1 < \sigma_2 < \dots < \sigma_{10}$.

> [!example]- A CIT posterior draw has $\alpha_4 = 5.0$, $\beta_3 = 3.2$, $\tau = -0.02$ and $\sigma_3 = 0.3$. What are $\mu_{4,3}$ and the expected incremental paid loss $E[Z_{4,3}]$? {Example}
> - Accident year $4$, development year $3$ is payment year $4 + 3 - 1 = 6$.
> - The log mean is $\mu_{4,3} = 5.0 + 3.2 + (-0.02)(6) = 8.08$.
> - The lognormal mean is $E[Z_{4,3}] = e^{8.08 + 0.3^2/2} = 3{,}378$.
> - The trend multiplies this cell by $e^{-0.12} = 0.887$, an $11.3\%$ reduction over six payment years.
> - The normal layer has mean $Z$ and the correlation term averages to zero, so $3{,}378$ is also the unconditional expected incremental loss.
> - A negative $\tau$ lowers every future diagonal, which is how the model was meant to pull down paid estimates that ran high.

The incremental paid loss of the first accident year in development year $d$ is

> $$\tilde I_{1,d} \sim \text{normal}(Z_{1,d},\ \delta)$$

- $\delta$ is the standard deviation of the normal layer.

For each later accident year, $w > 1$, the incremental paid loss is

> $$\tilde I_{w,d} \sim \text{normal}\big(Z_{w,d} + \rho\,(\tilde I_{w-1,d} - Z_{w-1,d})\, e^{\tau},\ \delta\big)$$

- $\rho$ is, for given parameters, the coefficient of correlation between $\tilde I_{w-1,d}$ and $\tilde I_{w,d}$.

With $\rho = 0$ the CIT becomes the **Leveled Incremental Trend (LIT) model**.

> [!example]- What are the mean of this incremental payment and the probability that it is negative, under the CIT and under the LIT model? {Example}
> For a late development year, a draw has latent means $Z_{w,d} = 50$ and $Z_{w-1,d} = 60$, and the previous accident year's simulated payment was $\tilde I_{w-1,d} = 20$. Also $\rho = 0.4$, $\tau = -0.02$ and $\delta = 30$.
>
> > [!answer]-
> > - The previous year paid $40$ below its latent mean, and with $\rho = 0.4$ that shortfall carries forward.
> > - The CIT mean is $E[\tilde I_{w,d}] = 50 + 0.4\,(20 - 60)\, e^{-0.02} = 50 - 15.68 = 34.32$.
> > - The CIT probability of a negative payment is $\Phi(-34.32/30) = \Phi(-1.144) = 0.126$.
> > - Under the LIT model the mean stays at $50$, and the probability is $\Phi(-50/30) = \Phi(-1.667) = 0.048$.
> > - A lognormal alone could never produce the negative payments that salvage and subrogation cause late in development. The normal layer allows them while the lognormal keeps the right skew.

## Priors

The first edition states these priors:

- $\alpha_w \sim \text{normal}\big(\log(\text{Premium}_w) + \mathit{logelr},\ \sqrt{10}\big)$, with $\mathit{logelr} \sim \text{uniform}(-5, 1)$.
- $\beta_d \sim \text{uniform}(0, 10)$ for $d = 1$ to $4$, and $\beta_d \sim \text{uniform}(0, \beta_{d-1})$ for $d > 4$, so $\beta_d$ decreases after $d = 4$.
- $\rho \sim \text{uniform}(-1, 1)$.
- $\tau \sim \text{normal}(0, 0.0316)$, a JAGS precision of $1{,}000$.
- $\sigma_1^2 \sim \text{uniform}(0, 0.5)$ and $\sigma_d^2 \sim \text{uniform}(\sigma_{d-1}^2,\ \sigma_{d-1}^2 + 0.1)$.
- $\delta \sim \text{uniform}(0, \text{average premium})$.

Two priors are deliberately narrow. A wider prior on $\tau$ often gave values below $-0.1$, offset by high $\alpha$ or $\beta$ values. Unrestricted growth in $\sigma_d$ produced unreasonably high simulated losses.

## Why the model uses incremental losses

On paid data the bootstrap ODP, Mack and [[Correlated Chain Ladder Model|CCL]] models all predicted results that were too high. A payment-year trend, as in Zehnwirth's models, was a plausible fix. The trend forces the model onto **incremental** losses, because cumulative losses include settled claims, which do not change with time. Incremental paid losses are skewed to the right and occasionally negative.

The skew normal distribution can never be more skewed than a truncated normal (coefficient of skewness $0.995$), and in trial fits its shape parameter sat near that limit. Meyers therefore mixes a lognormal into a normal instead: $X \sim \text{normal}(Z, \delta)$ with $Z \sim \text{lognormal}(\mu, \sigma)$.

## Differences from the correlated chain ladder model

- $\sigma_d$ *rises* with $d$, since smaller, less volatile claims settle earlier.
- The correlation acts outside the log space, on the incremental losses themselves, so that they can be negative.
- The trend enters in log space but the correlation does not, so the prior year's deviation is multiplied by $e^{\tau}$ to trend it.

## Results on paid data

On 200 paid triangles, the posterior means of $\tau$ were predominantly negative, but a negative $\tau$ may be offset by higher $\alpha_w$ and $\beta_d$. The level, development and trend parameters stayed correlated, and the models found it hard to separate them. Posterior means of $\rho$ were not as overwhelmingly positive as on incurred data, and the CIT and LIT standard deviations differed only a little.

The [[PP Plot|p-p plots]] still show estimates that are **too high**: combined $D = 25.3$ for CIT and $29.6$ for LIT, against a critical value of $9.6$. Only a handful of triangles, mostly Other Liability, had noticeably lower estimates than under the CCL. Meyers read this as support for the view that incurred data carry real information that paid data lack. A reviewer's point that claims now settle faster led to the [[Changing Settlement Rate Model|changing settlement rate (CSR) model]], which did correct the bias. The MCMC chains also converged noticeably more slowly than for the other models, with burn-in raised to $50{,}000$ iterations.

## The second edition

The second edition, [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]], assigned for Exam 7, drops the incremental paid models. Meyers tried to build a new one, but none of his attempts validated.

The source is Meyers, [first edition, CAS Monograph No. 1 (2015)](https://www.casact.org/sites/default/files/2021-02/01-Meyers.PDF), Sections 6 and 8 and Appendix C.
