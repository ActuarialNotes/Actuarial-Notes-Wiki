---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cf2d9bca7cf3458715c9989379eeb40be86dda8f42c2af6a8f70d9a43094abfb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Correlated Incremental Trend Model.md
---

**Correlated Incremental Trend Model** (CIT) is the Bayesian model for **incremental paid** losses in the 2015 first edition of Meyers' *Stochastic Loss Reserving Using Bayesian MCMC Models*. It adds a payment-year (calendar-year) trend $\tau$ and correlation between accident years. It uses a mixed lognormal-normal distribution, which is skewed to the right yet allows negative incremental losses. With $\rho = 0$ it becomes the **Leveled Incremental Trend (LIT) model**.

> $$\mu_{w,d} = \alpha_w + \beta_d + \tau \cdot (w + d - 1)$$

> $$Z_{w,d} \sim \text{lognormal}(\mu_{w,d},\ \sigma_d), \quad \sigma_1 < \sigma_2 < \dots < \sigma_{10}$$

> $$\tilde I_{1,d} \sim \text{normal}(Z_{1,d},\ \delta)$$

> $$
> \begin{aligned}
> \tilde I_{w,d} \sim \text{normal}\big( & Z_{w,d} + \rho\,(\tilde I_{w-1,d} - Z_{w-1,d})\, e^{\tau}, \\
> & \delta\big), \quad w > 1
> \end{aligned}
> $$

- $\tilde I_{w,d}$ is the incremental paid loss of accident year $w$ in development year $d$, and $w + d - 1$ is its payment year. $Z_{w,d}$ is a lognormal latent mean, and $\delta$ is the standard deviation of the normal layer. $\beta_{10} = 0$ to prevent overdetermining the model.
- **Priors**, as the first edition states them:
    - $\alpha_w \sim \text{normal}\big(\log(\text{Premium}_w) + \mathit{logelr},\ \sqrt{10}\big)$, with $\mathit{logelr} \sim \text{uniform}(-5, 1)$
    - $\beta_d \sim \text{uniform}(0, 10)$ for $d = 1$ to $4$, and $\beta_d \sim \text{uniform}(0, \beta_{d-1})$ for $d > 4$, so $\beta_d$ decreases after $d = 4$
    - $\rho \sim \text{uniform}(-1, 1)$
    - $\tau \sim \text{normal}(0, 0.0316)$, a JAGS precision of $1{,}000$
    - $\sigma_1^2 \sim \text{uniform}(0, 0.5)$ and $\sigma_d^2 \sim \text{uniform}(\sigma_{d-1}^2,\ \sigma_{d-1}^2 + 0.1)$
    - $\delta \sim \text{uniform}(0, \text{average premium})$
    - Two priors are deliberately narrow. A wider prior on $\tau$ often gave values below $-0.1$, offset by high $\alpha$ or $\beta$ values. Unrestricted growth in $\sigma_d$ produced unreasonably high simulated losses.
- **Why it was built.** On paid data the bootstrap ODP, Mack and [[Correlated Chain Ladder Model|CCL]] models all predicted results that were too high. A payment-year trend, as in Zehnwirth's models, was a plausible fix. A trend has two consequences:
    - The model must use **incremental** losses, because cumulative losses include settled claims, which do not change with time.
    - Incremental paid losses are skewed to the right and occasionally negative.
    - The skew normal distribution can never be more skewed than a truncated normal (coefficient of skewness $0.995$), and in trial fits its shape parameter sat near that limit. Meyers therefore mixes a lognormal into a normal instead: $X \sim \text{normal}(Z, \delta)$ with $Z \sim \text{lognormal}(\mu, \sigma)$.
- **How it differs from the CCL.**
    - $\sigma_d$ *rises* with $d$, since smaller, less volatile claims settle earlier.
    - The correlation acts outside the log space, on the incremental losses themselves, so that they can be negative. For given parameters, $\rho$ is the coefficient of correlation between $\tilde I_{w-1,d}$ and $\tilde I_{w,d}$.
    - Because the trend enters in log space but the correlation does not, the prior year's deviation is multiplied by $e^{\tau}$ to trend it.
- **Findings** (paid data, 200 triangles):
    - The posterior means of $\tau$ were predominantly negative, but a negative $\tau$ may be offset by higher $\alpha_w$ and $\beta_d$. The level, development and trend parameters stayed correlated, and the models found it hard to separate them.
    - Posterior means of $\rho$ were not as overwhelmingly positive as on incurred data, and CIT and LIT standard deviations differed only a little.
    - The [[PP Plot|p-p plots]] still show estimates that are **too high**: combined $D = 25.3$ for CIT and $29.6$ for LIT, against a critical value of $9.6$. Only a handful of triangles, mostly Other Liability, had noticeably lower estimates than under the CCL.
    - The CIT and LIT models did not achieve the desired improvement. Meyers read this as support for the view that incurred data carry real information that paid data lack. A reviewer's point that claims now settle faster led to the [[Changing Settlement Rate Model|changing settlement rate (CSR) model]], which did correct the bias.
    - The MCMC chains converged noticeably more slowly than for the other models (burn-in raised to $50{,}000$ iterations).
- **Not in the current reading.** The second edition, [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]], assigned for Exam 7, drops the incremental paid models. Meyers tried to build a new one, but none of his attempts validated.
- Source: Meyers, [first edition, CAS Monograph No. 1 (2015)](https://www.casact.org/sites/default/files/2021-02/01-Meyers.PDF), Sections 6 and 8 and Appendix C.

> [!example]- The Trend in the Log Mean {Example}
> A CIT posterior draw has $\alpha_4 = 5.0$, $\beta_3 = 3.2$, $\tau = -0.02$ and $\sigma_3 = 0.3$. Compute $\mu_{4,3}$ and the expected incremental paid loss $E[Z_{4,3}]$, and the effect of the trend.
>
> > [!answer]-
> > Accident year $4$, development year $3$ is payment year $4 + 3 - 1 = 6$.
> >
> > $$
> > \begin{align*}
> > \mu_{4,3} &= 5.0 + 3.2 + (-0.02)(6) \\
> > &= 8.08 \\
> > E[Z_{4,3}] &= e^{8.08 + 0.3^2/2} \\
> > &= 3{,}378
> > \end{align*}
> > $$
> >
> > The trend multiplies this cell by $e^{-0.12} = 0.887$, an $11.3\%$ reduction over six payment years. The normal layer has mean $Z$, and the correlation term averages to zero, so $3{,}378$ is also the unconditional expected incremental loss. A negative $\tau$ lowers every future diagonal, which is how the model was meant to pull down paid estimates that ran high.

> [!example]- A Negative Incremental Payment {Example}
> For a late development year, a draw has latent means $Z_{w,d} = 50$ and $Z_{w-1,d} = 60$, and the previous accident year's simulated payment was $\tilde I_{w-1,d} = 20$. Also $\rho = 0.4$, $\tau = -0.02$ and $\delta = 30$.
>
> Find the mean of $\tilde I_{w,d}$ and the probability that it is negative. Repeat for the LIT model ($\rho = 0$).
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[\tilde I_{w,d}] &= 50 + 0.4\,(20 - 60)\, e^{-0.02} \\
> > &= 50 - 15.68 \\
> > &= 34.32 \\
> > P(\tilde I_{w,d} < 0) &= \Phi\!\left(\frac{-34.32}{30}\right) \\
> > &= \Phi(-1.144) \\
> > &= 0.126
> > \end{align*}
> > $$
> >
> > Under the LIT model the mean stays at $50$, and $P = \Phi(-50/30) = \Phi(-1.667) = 0.048$.
> >
> > The previous year paid $40$ below its latent mean, and with $\rho = 0.4$ that shortfall carries forward. A lognormal alone could never produce the negative payments that salvage and subrogation cause late in development. The normal layer allows them while the lognormal keeps the right skew.
