---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e92806cf2c98761987b28a7fc0aed9696e625c67b46385fd3c1cee13f93c010b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Integrated Paid and Incurred Model.md
---

The **Integrated Paid and Incurred Model** (IPI) is the model Meyers builds in "Combining the CAY and CSR Models" to fit the paid and the incurred triangle of one line together. A [[Changing Settlement Rate Model|CSR model]] describes the paid losses and a [[Correlated Accident Year Model|CAY model]] the incurred losses, and the two share the loss-ratio level $\mathit{logelr}$ and the accident-year parameters $\alpha_w$.

The left subscripts $P$ and $I$ mark the paid-only and incurred-only parameters. The log mean of the paid loss of accident year $w$ at development year $d$ is

> $$
> \begin{aligned}
> {}_P\mu_{w,d} = {} & \log(\text{Premium}_w) + \mathit{logelr} \\
> & + \alpha_w + {}_P\beta_d \cdot (1-\gamma)^{w-1}
> \end{aligned}
> $$

- $\text{Premium}_w$ is the premium of accident year $w$.
- ${}_P\beta_d$ is the paid development parameter of development year $d$.
- $\gamma$ is the CSR model's settlement rate parameter.

For $w > 1$, the log mean of the incurred loss is

> $$
> \begin{aligned}
> {}_I\mu_{w,d} = {} & \log(\text{Premium}_w) + \mathit{logelr} + \alpha_w + {}_I\beta_d \\
> & + \rho \cdot \big(\log({}_I C_{w-1,d}) - {}_I\mu_{w-1,d}\big)
> \end{aligned}
> $$

- ${}_I\beta_d$ is the incurred development parameter of development year $d$.
- ${}_I C_{w-1,d}$ is the incurred loss of the previous accident year at the same development year.
- $\rho$ is the CAY model's correlation between accident years.

For $w = 1$, ${}_I\mu_{1,d} = \log(\text{Premium}_1) + \mathit{logelr} + {}_I\beta_d$. The paid loss is distributed as

> $${}_P C_{w,d} \sim \text{lognormal}({}_P\mu_{w,d},\ {}_P\sigma_d)$$

and the incurred loss as

> $${}_I C_{w,d} \sim \text{lognormal}({}_I\mu_{w,d},\ {}_I\sigma_d)$$

- ${}_P\sigma_d$ and ${}_I\sigma_d$ are the log standard deviations of the paid and incurred losses at development year $d$.

## Priors

The 15-step specification in [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]], Section 9, has these priors:

- Shared: $\mathit{logelr} \sim \text{normal}(-0.4, \sqrt{10})$, and $\alpha_w \sim \text{normal}(0, \sqrt{10})$ for $w = 2, \dots, 10$ with $\alpha_1 = 0$.
- Paid (the CSR steps): ${}_P\beta_d \sim \text{normal}(0, \sqrt{10})$ for $d = 1, \dots, 10$, $\gamma \sim \text{normal}(0, 0.05)$, and ${}_P\sigma_d^2 = \sum_{i=d}^{10} {}_P a_i$ with ${}_P a_i \sim \text{uniform}(0, 1)$.
- Incurred (the CAY steps): ${}_I\beta_d \sim \text{normal}(0, \sqrt{10})$ for $d = 1, \dots, 9$ with ${}_I\beta_{10} = 0$, $\rho = 2\rho_{pos} - 1$ with $\rho_{pos} \sim \text{beta}(2, 2)$, and ${}_I\sigma_d^2 = \sum_{i=d}^{10} {}_I a_i$ with ${}_I a_i \sim \text{uniform}(0, 1)$.

## Why the paid and incurred models are combined

The CSR model performs best on paid data and the CAY model on incurred data. In both, $\mathit{logelr}$ and $\alpha_w$ have the same interpretation and possibly the same values. The rest of the parameters should differ, since each model fits a different but related set of losses. Fitting both triangles at once gives more data behind the shared parameters. The idea is credited to Ned Tyrrell: estimates from paid and incurred data together should have lower variability.

The CSR half has one change. ${}_P\beta_{10}$ is **not** fixed at 0. That reduces the distortion when the paid triangle's loss ratio level differs significantly from the incurred one's, which often happens in Workers' Compensation. So the paid and incurred expected losses at development year 10 can differ.

## Results for the illustrative insurer

The shared parameters are similar to the separate CSR and CAY fits, but with noticeably smaller standard deviations. For $\mathit{logelr}$ they are $0.0109$, against $0.0246$ (CSR) and $0.0150$ (CAY). For $\alpha_{10}$ they are $0.1947$, against $0.3467$ and $0.2984$. The standard error of the total falls to $1{,}253$ (paid, from the CSR's $2{,}401$) and $1{,}225$ (incurred, from the CAY's $1{,}859$). $\widehat{elpd}_{loo}$ is $63.54$ (paid) and $78.36$ (incurred), above every other model for this triangle. It is computed from $55 \times 10{,}000$ log-likelihood matrices for the paid and incurred data.

> [!example]- Treating $\alpha_{10}$ as the only source of uncertainty, what is the coefficient of variation of accident year 10's ultimate under each model? {Example}
> Meyers' Table 9.1 gives the posterior standard deviation of $\alpha_{10}$ as $0.3467$ (CSR), $0.2984$ (CAY) and $0.1947$ (IPI). His reported CVs are $0.3736$ (CSR paid), $0.3282$ (CAY incurred) and about $0.20$ (IPI, paid and incurred).
>
> > [!answer]-
> > - A lognormal with log standard deviation $s$ has $\mathrm{CV} = \sqrt{e^{s^2} - 1}$.
> > - The CVs are $\sqrt{e^{0.3467^2} - 1} = 0.357$ for the CSR, $\sqrt{e^{0.2984^2} - 1} = 0.305$ for the CAY and $\sqrt{e^{0.1947^2} - 1} = 0.197$ for the IPI.
> > - Each is close to the reported CV, so the newest year's uncertainty is almost all [[Parameter Risk|parameter risk]] in its level $\alpha_{10}$.
> > - The IPI estimates $\alpha_{10}$ from the paid and the incurred triangle together, so its posterior is narrower and the CV nearly halves.

## Validation on 200 triangles

The standard error falls for almost all of the 200 triangles. $\widehat{elpd}$ favors the IPI over the CSR in $146$ ($\widehat{elpd}_{loo}$) and $156$ ($\widehat{elpd}_{test}$) paid triangles, and over the CAY in $107$ and $111$ incurred ones. The advantage is stronger on the paid side.

The IPI's residual box plots are slightly worse than the CSR's and CAY's, but still reasonable: zero lies within the interquartile range for every accident year. Seven of its eight [[PP Plot|p-p plots]] fall within the Kolmogorov-Smirnov bounds, including both combined plots ($D = 8.7$ paid and $9.4$ incurred, against $9.6$). The exception is Workers' Compensation incurred, which is light-tailed ($D = 19.3$ against $19.2$).

The model works best for the auto lines, where paid and incurred are almost equal by development year 10. It works less well for Workers' Compensation, whose long-term annuity benefits leave a large part of losses unpaid after 10 years.

## Use in risk margins

Meyers computes payout patterns and cost of capital [[Risk Margin|risk margins]] with the CSR model and with the IPI's paid parameters. Under the IPI, expected incurred at development year 10 differs from expected paid, so the difference is treated as one more payment:

> $$P_{w,11} = e^{{}_I\mu_{w,10} + {}_I\sigma_{10}^2/2} - e^{{}_P\mu_{w,10} + {}_P\sigma_{10}^2/2}$$

The ultimate uses the incurred parameters. For the illustrative insurer the IPI needs an initial capital of $3{,}087$, $43\%$ of the CSR's $7{,}139$, and its mean risk margin is $233$ against $597$.

> [!example]- What are this draw's expected paid and incurred losses at development year 10, and the extra payment $P_{10,11}$? {Example}
> One IPI posterior draw for accident year $10$, with premium $5{,}000$, has:
>
> | Parameter | Value |
> | :--- | ---: |
> | $\mathit{logelr}$ | $-0.40$ |
> | $\alpha_{10}$ | $0.10$ |
> | ${}_P\beta_{10}$ | $-0.05$ |
> | $\gamma$ | $0.04$ |
> | ${}_P\sigma_{10}$ | $0.03$ |
> | ${}_I\sigma_{10}$ | $0.02$ |
> | $\rho$ | $0.2$ |
>
> Accident year $9$'s incurred loss at development year $10$ is $0.03$ above its log mean.
>
> > [!answer]-
> > - The shared part is $\ln 5{,}000 - 0.40 + 0.10 = 8.21719$.
> > - The paid development parameter is scaled by $(0.96)^9 = 0.69253$, so ${}_P\mu_{10,10} = 8.21719 - 0.05 \times 0.69253 = 8.18257$.
> > - The expected paid loss is $e^{8.18257 + 0.03^2/2} = 3{,}580$.
> > - With ${}_I\beta_{10} = 0$, ${}_I\mu_{10,10} = 8.21719 + 0.2 \times 0.03 = 8.22319$.
> > - The expected incurred loss is $e^{8.22319 + 0.02^2/2} = 3{,}727$.
> > - The extra payment is $P_{10,11} = 3{,}727 - 3{,}580 = 147$. It comes only from ${}_P\beta_{10} \neq 0$ and the CAY's correlation term, since both triangles use the same $\mathit{logelr}$ and $\alpha_{10}$.

Meyers' suggested workflow ends with this model. Once a paid and an incurred model are satisfactory and in close agreement on the ultimate, they are used as parts of an IPI model to obtain a more accurate estimate of the liability.
