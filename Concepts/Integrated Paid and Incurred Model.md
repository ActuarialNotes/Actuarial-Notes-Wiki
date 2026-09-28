---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c0d3852fdb35fab963d7b68851e6401fa20314f447af121d9fc38356bb40f74e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Integrated Paid and Incurred Model.md
---

**Integrated Paid and Incurred Model** (IPI) is the model Meyers builds in "Combining the CAY and CSR Models". It fits the paid and the incurred triangle of one line together. A [[Changing Settlement Rate Model|CSR model]] describes the paid losses and a [[Correlated Accident Year Model|CAY model]] the incurred losses, and the two **share** the loss-ratio level $\mathit{logelr}$ and the accident-year parameters $\alpha_w$.

> $$
> \begin{aligned}
> {}_P\mu_{w,d} = {} & \log(\text{Premium}_w) + \mathit{logelr} \\
> & + \alpha_w + {}_P\beta_d \cdot (1-\gamma)^{w-1}
> \end{aligned}
> $$

> $$
> \begin{aligned}
> {}_I\mu_{w,d} = {} & \log(\text{Premium}_w) + \mathit{logelr} + \alpha_w + {}_I\beta_d \\
> & + \rho \cdot \big(\log({}_I C_{w-1,d}) - {}_I\mu_{w-1,d}\big)
> \end{aligned}
> $$

> $$
> \begin{aligned}
> {}_P C_{w,d} &\sim \text{lognormal}({}_P\mu_{w,d},\ {}_P\sigma_d) \\
> {}_I C_{w,d} &\sim \text{lognormal}({}_I\mu_{w,d},\ {}_I\sigma_d)
> \end{aligned}
> $$

- The left subscripts $P$ and $I$ mark the paid-only and incurred-only parameters. The incurred equation holds for $w > 1$; for $w = 1$, ${}_I\mu_{1,d} = \log(\text{Premium}_1) + \mathit{logelr} + {}_I\beta_d$. The 15-step specification in [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]], Section 9, has these priors:
    - **Shared:** $\mathit{logelr} \sim \text{normal}(-0.4, \sqrt{10})$, and $\alpha_w \sim \text{normal}(0, \sqrt{10})$ for $w = 2, \dots, 10$ with $\alpha_1 = 0$.
    - **Paid (CSR steps):** ${}_P\beta_d \sim \text{normal}(0, \sqrt{10})$ for $d = 1, \dots, 10$; $\gamma \sim \text{normal}(0, 0.05)$; ${}_P\sigma_d^2 = \sum_{i=d}^{10} {}_P a_i$ with ${}_P a_i \sim \text{uniform}(0, 1)$.
    - **Incurred (CAY steps):** ${}_I\beta_d \sim \text{normal}(0, \sqrt{10})$ for $d = 1, \dots, 9$ with ${}_I\beta_{10} = 0$; $\rho = 2\rho_{pos} - 1$ with $\rho_{pos} \sim \text{beta}(2, 2)$; ${}_I\sigma_d^2 = \sum_{i=d}^{10} {}_I a_i$ with ${}_I a_i \sim \text{uniform}(0, 1)$.
- **Why combine.** The CSR model performs best on paid data and the CAY model on incurred data. In both, $\mathit{logelr}$ and $\alpha_w$ have the same interpretation and possibly the same values. The rest of the parameters should differ, since each model fits a different but related set of losses. Fitting both triangles at once gives more data behind the shared parameters. The idea is credited to Ned Tyrrell: estimates from paid and incurred data together should have lower variability.
- **The one change to the CSR half.** ${}_P\beta_{10}$ is **not** fixed at 0. That reduces the distortion when the paid triangle's loss ratio level differs significantly from the incurred one's, which often happens in Workers' Compensation. So the paid and incurred expected losses at development year 10 can differ.
- **Results for the illustrative insurer.**
    - The shared parameters are similar to the separate CSR and CAY fits, but with noticeably smaller standard deviations. For $\mathit{logelr}$ they are $0.0109$, against $0.0246$ (CSR) and $0.0150$ (CAY); for $\alpha_{10}$, $0.1947$ against $0.3467$ and $0.2984$.
    - The standard error of the total falls to $1{,}253$ (paid, from the CSR's $2{,}401$) and $1{,}225$ (incurred, from the CAY's $1{,}859$).
    - $\widehat{elpd}_{loo}$ is $63.54$ (paid) and $78.36$ (incurred), above every other model for this triangle. It is computed from $55 \times 10{,}000$ log-likelihood matrices for the paid and incurred data.
- **Validation** on 200 triangles:
    - The standard error falls for almost all of them.
    - $\widehat{elpd}$ favors IPI over CSR in $146$ ($\widehat{elpd}_{loo}$) and $156$ ($\widehat{elpd}_{test}$) paid triangles, and over CAY in $107$ and $111$ incurred ones. The advantage is stronger on the paid side.
    - Its residual box plots are slightly worse than the CSR's and CAY's, but still reasonable: zero lies within the interquartile range for every accident year.
    - Seven of its eight [[PP Plot|p-p plots]] fall within the Kolmogorov-Smirnov bounds, including both combined plots ($D = 8.7$ paid, $9.4$ incurred, against $9.6$). The exception is Workers' Compensation incurred, which is light-tailed ($D = 19.3$ against $19.2$).
    - It works best for the auto lines, where paid and incurred are almost equal by development year 10. It works less well for Workers' Compensation, whose long-term annuity benefits leave a large part of losses unpaid after 10 years.
- **Use in risk margins.** Meyers computes payout patterns and cost of capital [[Risk Margin|risk margins]] with the CSR model and with the IPI's paid parameters. Under the IPI, expected incurred at development year 10 will differ from expected paid, so the difference is treated as one more payment:

> $$P_{w,11} = e^{{}_I\mu_{w,10} + {}_I\sigma_{10}^2/2} - e^{{}_P\mu_{w,10} + {}_P\sigma_{10}^2/2}$$

- The ultimate uses the incurred parameters. For the illustrative insurer the IPI needs an initial capital of $3{,}087$ against the CSR's $7{,}139$, and its mean risk margin is $233$ against $597$.
- **In practice.** Meyers' suggested workflow ends here. Once a paid and an incurred model are satisfactory and in close agreement on the ultimate, use them as parts of an IPI model to obtain a more accurate estimate of the liability.

> [!example]- Paid and Incurred Log Means From One Draw {Example}
> One IPI posterior draw for accident year $10$ (premium $5{,}000$) has $\mathit{logelr} = -0.40$, $\alpha_{10} = 0.10$, ${}_P\beta_{10} = -0.05$, $\gamma = 0.04$, ${}_P\sigma_{10} = 0.03$, ${}_I\sigma_{10} = 0.02$ and $\rho = 0.2$. Accident year $9$'s incurred loss at development year $10$ is $0.03$ above its log mean.
>
> Compute the expected paid and incurred losses at development year $10$, and the extra payment $P_{10,11}$ used in the risk margin.
>
> > [!answer]-
> > The shared part is $\ln 5{,}000 - 0.40 + 0.10 = 8.21719$. The paid development factor is scaled by $(0.96)^9 = 0.69253$:
> >
> > $$
> > \begin{align*}
> > {}_P\mu_{10,10} &= 8.21719 - 0.05 \times 0.69253 \\
> > &= 8.18257 \\
> > E[{}_P C_{10,10}] &= e^{8.18257 + 0.03^2/2} \\
> > &= 3{,}580 \\
> > {}_I\mu_{10,10} &= 8.21719 + 0 + 0.2 \times 0.03 \\
> > &= 8.22319 \\
> > E[{}_I C_{10,10}] &= e^{8.22319 + 0.02^2/2} \\
> > &= 3{,}727 \\
> > P_{10,11} &= 3{,}727 - 3{,}580 \\
> > &= 147
> > \end{align*}
> > $$
> >
> > Both triangles use the same $\mathit{logelr}$ and $\alpha_{10}$. The gap comes only from ${}_P\beta_{10} \neq 0$ and the CAY's correlation term. Fixing ${}_P\beta_{10} = 0$, as in the stand-alone CSR, would tie the paid level at year 10 to the shared loss ratio. Meyers drops that constraint to reduce the distortion when the paid and incurred loss ratio levels differ.

> [!example]- Where the Lower Standard Error Comes From {Example}
> Meyers' Table 9.1 gives the posterior standard deviation of $\alpha_{10}$ as $0.3467$ (CSR), $0.2984$ (CAY) and $0.1947$ (IPI).
>
> Treating $\alpha_{10}$ as the only source of uncertainty, approximate the coefficient of variation of accident year $10$'s ultimate under each model. Compare with Meyers' reported CVs of $0.3736$ (CSR paid), $0.3282$ (CAY incurred) and about $0.20$ (IPI, paid and incurred).
>
> > [!answer]-
> > A lognormal with log standard deviation $s$ has $\mathrm{CV} = \sqrt{e^{s^2} - 1}$:
> >
> > $$
> > \begin{align*}
> > \text{CSR}: \sqrt{e^{0.3467^2} - 1} &= 0.357 \\
> > \text{CAY}: \sqrt{e^{0.2984^2} - 1} &= 0.305 \\
> > \text{IPI}: \sqrt{e^{0.1947^2} - 1} &= 0.197
> > \end{align*}
> > $$
> >
> > Each is close to the reported CV, so the newest year's uncertainty is almost all [[Parameter Risk|parameter risk]] in its level $\alpha_{10}$. The IPI estimates $\alpha_{10}$ from the paid and the incurred triangle together, so its posterior is narrower and the CV nearly halves. The more accurate IPI also needs far less capital: $3{,}087 / 7{,}139 = 43\%$ of the CSR's for this insurer.
