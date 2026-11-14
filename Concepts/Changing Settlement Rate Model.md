---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a68128ceba743b706a8c99d8be5eedefdfefcd8a05dbffdd6b2ae6a0c4d2209d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Changing Settlement Rate Model.md
---

The **Changing Settlement Rate Model** (CSR) is Meyers' Bayesian model for **paid** loss triangles that lets the payment pattern speed up or slow down from one [[Accident Year|accident year]] to the next. It adds one parameter, $\gamma$, to the [[Cross Classified Model|cross classified (CRC) model]].

The cumulative paid loss $C_{w,d}$ of accident year $w$ at development year $d$, for $w, d = 1, \ldots, 10$, is

> $$C_{w,d} \sim \text{lognormal}(\mu_{w,d},\ \sigma_d)$$

and its log mean is

> $$
> \begin{aligned}
> \mu_{w,d} = {} & \log(\text{Premium}_w) + \mathit{logelr} \\
> & + \alpha_w + \beta_d \cdot (1-\gamma)^{w-1}
> \end{aligned}
> $$

- $\text{Premium}_w$ is the premium of accident year $w$.
- $\mathit{logelr}$ is the log of the expected loss ratio, common to all accident years.
- $\alpha_w$ is the level of accident year $w$, with $\alpha_1 = 0$.
- $\beta_d$ is the development parameter of year $d$, with $\beta_{10} = 0$.
- $\gamma$ scales every development parameter by $(1-\gamma)^{w-1}$, so its effect compounds with each later accident year.
- $\sigma_d$ is the standard deviation of the log loss at development year $d$, with $\sigma_1 > \sigma_2 > \cdots > \sigma_{10}$.

The priors in [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]] are:

- $\mathit{logelr} \sim \text{normal}(-0.4, \sqrt{10})$.
- $\alpha_w \sim \text{normal}(0, \sqrt{10})$ for $w = 2, \ldots, 10$.
- $\beta_d \sim \text{normal}(0, \sqrt{10})$ for $d = 1, \ldots, 9$.
- $\gamma \sim \text{normal}(0, 0.05)$.
- $\sigma_d^2 = \sum_{i=d}^{10} a_i$, with $a_i \sim \text{uniform}(0, 1)$.

## The settlement rate parameter

Cumulative paid losses grow with $d$ and $\beta_{10} = 0$, so the paid $\beta_d$ are usually negative for $d < 10$. A positive $\gamma$ moves the log-development factors $\beta_d(1-\gamma)^{w-1}$ toward zero as $w$ increases, so later years pay a larger share early. That is a speedup in the [[Settlement Rate|claim settlement rate]]. A negative $\gamma$ is a slowdown, and $\gamma = 0$ gives back the CRC model.

> [!example]- How much larger a share of its losses does accident year 10 pay in its first year than accident year 1? {Example}
> For Meyers' illustrative paid triangle, the CSR posterior means include $\beta_1 = -1.3794$ and $\gamma = 0.0446$. In the triangle, accident year 1 paid $952$ in its first year of an eventual $3{,}912$, and accident year 10 paid $1{,}413$ of an eventual $4{,}139$.
>
> > [!answer]-
> > - The log-development factor at $d = 1$ is $\beta_1(1-\gamma)^{w-1}$, with $1 - \gamma = 0.9554$.
> > - For $w = 1$ it is $-1.3794$.
> > - For $w = 10$ it is $-1.3794 \times 0.9554^9 = -1.3794 \times 0.6632 = -0.9149$.
> > - Because $\beta_{10} = 0$, $e^{\beta_1(1-\gamma)^{w-1}}$ is the ratio of the median year-1 paid loss to the median year-10 paid loss.
> > - That ratio is $e^{-1.3794} = 25.2\%$ for accident year 1 and $e^{-0.9149} = 40.1\%$ for accident year 10.
> > - The data agree in direction: $952/3{,}912 = 24.3\%$ against $1{,}413/4{,}139 = 34.1\%$.
> > - Accident year 10 pays about $40\%$ of its losses in its first year, against $25\%$ for accident year 1.

## The paid bias it corrects

On paid data the [[Mack Chain Ladder Model|Mack]], [[ODP Bootstrap Model|bootstrap ODP]] and CRC models all tend to overestimate ultimate losses. A settlement speedup that the development factors ignore would do exactly that. A CRC model applies one first-year factor, estimated from all ten years, to every year, so it reads a year that pays faster than that average as a large year and overstates its ultimate. The CSR model was proposed to correct this.

Because $\beta_{10} = 0$, $\gamma$ drops out at development year 10, and the estimate and the outcome's percentile are calculated exactly as for the CRC model. For the illustrative insurer, the posterior mean of $\gamma$ is $0.0446$ (standard deviation $0.0282$), a speedup. The estimated total ultimate falls to $37{,}597$ from the CRC's $40{,}121$, and the actual $40{,}000$ lands at the $86.26$th percentile.

## Model comparison and validation

The CSR and CRC models are compared on the upper triangle by $\widehat{elpd}_{loo}$, where a higher value, or a lower LOOIC $= -2\,\widehat{elpd}_{loo}$, is preferred. This can be computed at the reserve date. The retrospective check is $\widehat{elpd}_{test}$ on the lower triangle.

> [!example]- Which model does the illustrative paid triangle favour, with $\widehat{elpd}_{loo}$ of $49.76$ for CSR and $47.80$ for CRC? {Example}
> - $\text{LOOIC}_{CSR} = -2 \times 49.76 = -99.52$. Meyers prints $-99.53$ from unrounded values.
> - $\text{LOOIC}_{CRC} = -2 \times 47.80 = -95.60$.
> - The CSR model has the lower LOOIC, so the triangle favours **CSR**.
> - The effective number of parameters, $p_{loo}$, rises only from $14.97$ to $15.09$ for the extra $\gamma$.

On 200 triangles, Meyers found:

- A speedup in claim settlement is fairly common across all four lines.
- CSR beats CRC in over half the triangles on both $\widehat{elpd}_{loo}$ and $\widehat{elpd}_{test}$ ($119$ of $200$ on the test data). One would expect CRC to win for insurers that are not changing their settlement rate.
- Every [[PP Plot|p-p plot]] lies within the Kolmogorov-Smirnov band: $D = 3.1$ against $9.6$ for all lines combined. Among the models before the integrated one, it performs best on paid data.
- Its standardized residual box plots are slightly better than the CRC model's.

The CSR model is the paid half of the [[Integrated Paid and Incurred Model|integrated paid and incurred model]], which shares $\mathit{logelr}$ and $\alpha_w$ with a [[Correlated Accident Year Model|CAY model]] on incurred data. With the paid side of that model, it drives Meyers' payout patterns and cost of capital [[Risk Margin|risk margins]]. The monograph's first edition (2015) also has the CSR model, in a different parameterisation.

> [!trap] Reading a positive $\gamma$ as a slowdown
> The paid $\beta_d$ are negative, so multiplying them by $(1-\gamma)^{w-1} < 1$ raises the log-development factor toward zero. A positive $\gamma$ means later accident years pay faster.
