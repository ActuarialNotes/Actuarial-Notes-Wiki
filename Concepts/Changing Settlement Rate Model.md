---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:75563592b75e1adc8e147d189fa3a75716f7c90844a849c99b3b4db0ba2f4440
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Changing Settlement Rate Model.md
---

**Changing Settlement Rate Model** (CSR) is Meyers' Bayesian model for **paid** loss triangles that lets the payment pattern speed up or slow down from one [[Accident Year|accident year]] to the next. It adds a single parameter $\gamma$ to the [[Cross Classified Model|cross classified (CRC) model]], and scales every development parameter by $(1-\gamma)^{w-1}$.

> $$
> \begin{aligned}
> \mu_{w,d} = {} & \log(\text{Premium}_w) + \mathit{logelr} \\
> & + \alpha_w + \beta_d \cdot (1-\gamma)^{w-1}
> \end{aligned}
> $$

> $$C_{w,d} \sim \text{lognormal}(\mu_{w,d},\ \sigma_d)$$

- $C_{w,d}$ is the cumulative paid loss of accident year $w$ at development year $d$ ($w, d = 1, \dots, 10$). The priors in [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]] are:
    - $\mathit{logelr} \sim \text{normal}(-0.4, \sqrt{10})$
    - $\alpha_w \sim \text{normal}(0, \sqrt{10})$ for $w = 2, \dots, 10$, with $\alpha_1 = 0$
    - $\beta_d \sim \text{normal}(0, \sqrt{10})$ for $d = 1, \dots, 9$, with $\beta_{10} = 0$
    - $\gamma \sim \text{normal}(0, 0.05)$
    - $\sigma_d^2 = \sum_{i=d}^{10} a_i$ with $a_i \sim \text{uniform}(0, 1)$, so $\sigma_1^2 > \dots > \sigma_{10}^2$
- **Reading $\gamma$.** Cumulative paid losses grow with $d$ and $\beta_{10} = 0$, so the paid $\beta_d$ are usually negative for $d < 10$. A **positive** $\gamma$ moves the "log-development factors" $\beta_d(1-\gamma)^{w-1}$ toward zero as $w$ increases, so later years pay a larger share early. That is a **speedup** in the [[Settlement Rate|claim settlement rate]]. A negative $\gamma$ is a slowdown, and $\gamma = 0$ gives back the CRC model.
- **What it fixes.** On paid data the [[Mack Chain Ladder Model|Mack]], [[ODP Bootstrap Model|bootstrap ODP]] and CRC models all tend to **overestimate** ultimate losses. A settlement speedup that the development factors ignore would do exactly that: factors from slower years, applied to the faster recent years, overproject them. The CSR model was proposed to correct this.
- **Simulating the outcome.** Because $\beta_{10} = 0$, $\gamma$ drops out at development year 10. The Estimate and the outcome percentile are calculated exactly as for the CRC model.
- **Results for the illustrative insurer.** The posterior mean of $\gamma$ is $0.0446$ (standard deviation $0.0282$), a speedup. The estimated total ultimate falls to $37{,}597$ from the CRC's $40{,}121$, and the actual $40{,}000$ lands at the $86.26$th percentile. $\widehat{elpd}_{loo}$ favors CSR over CRC.
- **Validation** on 200 triangles:
    - A speedup in claim settlement is fairly common across all four lines.
    - CSR beats CRC in over half the triangles on both $\widehat{elpd}_{loo}$ and $\widehat{elpd}_{test}$ ($119$ of $200$ on the test data). One would expect CRC to win for insurers that are not changing their settlement rate.
    - Every [[PP Plot|p-p plot]] lies within the Kolmogorov-Smirnov band: $D = 3.1$ against $9.6$ for all lines combined. Among the models before the integrated one, it performs best on paid data.
    - Its standardized residual box plots are slightly better than the CRC model's.
- **Where it is used next.** The CSR model is the paid half of the [[Integrated Paid and Incurred Model|integrated paid and incurred model]], which shares $\mathit{logelr}$ and $\alpha_w$ with a [[Correlated Accident Year Model|CAY model]] on incurred data. With the paid side of that model, it drives Meyers' payout patterns and cost of capital [[Risk Margin|risk margins]]. Meyers also suggests letting $\gamma$ change linearly with $w$ as one refinement.
- **First edition (2015).** The CSR model is also in the monograph's first edition, in a different parameterisation:
    - $\mu_{w,d} = \alpha_w + \beta_d(1-\gamma)^{w-1}$, with $\alpha_w \sim \text{normal}(\log(\text{Premium}_w) + \mathit{logelr}, \sqrt{10})$ and $\mathit{logelr} \sim \text{uniform}(-1, 0.5)$.
    - $\beta_d \sim \text{uniform}(-5, 5)$, $\gamma \sim \text{normal}(0, 0.025)$, and $\sigma_d = \sum_{i=d}^{10} a_i$.
    - There it corrected the paid bias for three of the four lines. Personal auto remained biased ($D = 25.1$ against $19.2$), though significantly less than under the other models, and the combined plot passed ($D = 4.2$).

> [!example]- How Much Faster Does the Latest Year Pay? {Example}
> For Meyers' illustrative paid triangle the CSR posterior means include $\beta_1 = -1.3794$ and $\gamma = 0.0446$.
>
> Compute the log-development factor at development year $1$ for accident years $1$, $5$ and $10$. Convert each to the ratio of the median loss at year $1$ to that at year $10$, and compare with the triangle: accident year $1$ paid $952$ in its first year of an eventual $3{,}912$, and accident year $10$ paid $1{,}413$ of an eventual $4{,}139$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > w = 1: \quad \beta_1 (1-\gamma)^0 &= -1.3794 \\
> > w = 5: \quad \beta_1 (0.9554)^4 &= -1.3794 \times 0.8332 \\
> > &= -1.1493 \\
> > w = 10: \quad \beta_1 (0.9554)^9 &= -1.3794 \times 0.6632 \\
> > &= -0.9149
> > \end{align*}
> > $$
> >
> > $\beta_{10} = 0$, so $e^{\beta_1(1-\gamma)^{w-1}}$ is the ratio of median year-1 paid to median year-10 paid:
> >
> > | AY | Log-dev factor | Year 1 as share of year 10 |
> > |---|---|---|
> > | $1$ | $-1.3794$ | $25.2\%$ |
> > | $5$ | $-1.1493$ | $31.7\%$ |
> > | $10$ | $-0.9149$ | $40.1\%$ |
> >
> > The data agree in direction: $952/3{,}912 = 24.3\%$ for the first year against $1{,}413/4{,}139 = 34.1\%$ for the latest. A CRC model applies one first-year factor, estimated from all ten years, to every year. It reads a year that pays faster than that average as a large year and overstates its ultimate, which is the paid bias the CSR model corrects.

> [!example]- Choosing Between CSR and CRC {Example}
> For the illustrative paid triangle, Meyers reports these leave-one-out statistics:
>
> | Model | $\widehat{elpd}_{loo}$ | $p_{loo}$ |
> |---|---|---|
> | CSR | $49.76$ | $15.09$ |
> | CRC | $47.80$ | $14.97$ |
>
> Compute each model's LOOIC and say which model the upper triangle favors.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{LOOIC}_{CSR} &= -2 \times 49.76 \\
> > &= -99.52 \\
> > \text{LOOIC}_{CRC} &= -2 \times 47.80 \\
> > &= -95.60
> > \end{align*}
> > $$
> >
> > A higher $\widehat{elpd}_{loo}$, or equivalently a lower LOOIC (the [[AIC]]-like deviance scale), is preferred, so the triangle favors **CSR**. Meyers prints $-99.53$ from unrounded values.
> >
> > The gain costs little: $p_{loo}$, the effective number of parameters, rises only from $14.97$ to $15.09$ for the extra $\gamma$. This statistic uses only the upper triangle, so it can be computed at the reserve date. The retrospective check, $\widehat{elpd}_{test}$ on the lower triangle, favored CSR in $119$ of the $200$ triangles.
