---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:19095c309afc1a4255b4f78e2ea16f5d5d578008b1138952c2929648194a58c4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Superimposed Inflation.md
---

**Superimposed inflation** (SI) is the change in claim costs from one calendar period to the next beyond what economic inflation explains. [[Stochastic Loss Reserving Using Generalized Linear Models (Taylor and McGuire - 2016)|Taylor and McGuire (2016)]] define it as calendar-period changes, positive or negative, net of changes due to economic inflation; the term was introduced by Benktander (1979). Like economic inflation it is a [[Calendar Year Effect|calendar-period effect]]: it acts on every payment made in a period, whatever the accident year.

> $$\mu_{kj} = \exp\!\big(\ln\alpha_k + \ln\beta_j + \min(h,\,k + j - 1)\,\varphi\big)$$

- This is Taylor and McGuire's example of SI in an [[GLM Loss Reserving|ODP cross-classified model]] (their Section 7.5, beyond the chapters Exam 7 assigns): $\alpha_k$ and $\beta_j$ are the accident and development parameters and $k + j - 1$ is the calendar period of cell $(k, j)$. With payments already restated in valuation-date dollars, SI runs at $e^{\varphi} - 1$ per period for the first $h$ periods and is flat thereafter.
- **Where it comes from.** Among Taylor and McGuire's examples of calendar-period effects are award precedents set by court decisions, or other environmental change, that apply from a point in time whatever the accident date. [[A Framework for Assessing Risk Margins (Marshall et al. - 2008)|Marshall et al. (2008)]] list recent and possible future legislative amendments and their erosion, precedents creating new heads of damage, medical and legal costs, and systemic shifts in large claim frequency or severity. SI is typically variable over time: payments can outrun economic inflation for years until measures curtail them, followed by nil or even negative SI.
- **Modelling it in a GLM.** First adjust past payments to valuation-date dollars with a natural economic [[Inflation|inflation]] series, such as wages for workers compensation or bodily injury, so that future economic inflation becomes an explicit assumption. If the calendar-period and heat-map diagnostics still show calendar effects, add calendar terms. They cannot be one free parameter per diagonal: accident, development and calendar periods are collinear, since knowing two fixes the third, so the fit has no unique solution. The same caution applies to the Mack formulation, whose latest diagonal acts as the accident-period effect. The modeller imposes a simple structure like the one above instead, and must extrapolate it into the future deliberately.
- **The chain ladder's implicit assumption.** Because of that collinearity, a constant rate of past inflation, economic or superimposed, is absorbed into the chain ladder's row and column parameters and carried forward at the same rate. Adjusting to constant dollars first replaces that implicit assumption with an explicit one.
- **In risk margins.** Marshall et al. place most SI in the [[External Systemic Risk|external systemic risk]] category of legislative, political and claims inflation risk. The same analysis that sets that category's CoV supports the central estimate: the average of the range of possible impacts, combined across the risks, estimates SI. Some sources of SI are highly skewed, mattering more at high probabilities of adequacy than at the 75th percentile. The "sophistication and performance of superimposed inflation analysis" is also a risk indicator on the [[Internal Systemic Risk|internal systemic risk]] scorecard.

> [!example]- Separating Superimposed Inflation from Wage Inflation {Example}
> For a bodily injury portfolio, the average payment per finalized claim was \$40,000 in calendar year 2022, \$44,096 in 2023 and \$45,860 in 2024. The wage index that drives the income-replacement part of these claims rose $4\%$ in each year.
>
> Estimate the SI in each year.
>
> > [!answer]-
> > Restate each year's growth net of the wage index:
> >
> > $$
> > \begin{align*}
> > \text{SI}_{2023} &= \frac{44{,}096/40{,}000}{1.04} - 1 \\
> > &= \frac{1.1024}{1.04} - 1 \\
> > &= 6.0\% \\
> > \text{SI}_{2024} &= \frac{45{,}860/44{,}096}{1.04} - 1 \\
> > &= \frac{1.0400}{1.04} - 1 \\
> > &= 0.0\%
> > \end{align*}
> > $$
> >
> > SI ran at $6\%$ and then stopped, perhaps after a reform took hold: variable over time, as Taylor and McGuire say SI typically is. A single average rate, $\sqrt{1.06} - 1 = 2.96\%$ a year, would describe neither year. A GLM on wage-adjusted data would see a calendar trend that flattens, and would model it with a structure like the one above.

> [!example]- Forecasting with a Capped SI Trend {Example}
> Payments are in valuation-date dollars. A cross-classified GLM with an SI term gives, for accident period 3, $\alpha_3 = 1{,}000$ with $\beta_2 = 0.30$ and $\beta_3 = 0.10$. It also gives $\varphi = 0.05$ with $h = 3$: SI ran over the first three calendar periods, and the latest diagonal is period 3.
>
> Forecast accident period 3's unpaid amount (cells $(3, 2)$ and $(3, 3)$) if SI stays flat, and if it continues at the past rate.
>
> > [!answer]-
> > The future cells lie in calendar periods $4$ and $5$, so $\min(3, 4) = \min(3, 5) = 3$ and both carry $3\varphi = 0.15$:
> >
> > $$
> > \begin{align*}
> > \hat Y_{32} &= 1{,}000 \times 0.30 \times e^{0.15} \\
> > &= 348.55 \\
> > \hat Y_{33} &= 1{,}000 \times 0.10 \times e^{0.15} \\
> > &= 116.18 \\
> > \text{Unpaid (flat)} &= 464.73
> > \end{align*}
> > $$
> >
> > If SI instead continues at $e^{0.05} - 1 = 5.13\%$ per period, the cells carry $4\varphi$ and $5\varphi$:
> >
> > $$
> > \begin{align*}
> > \hat Y_{32} &= 300 \times e^{0.20} \\
> > &= 366.42 \\
> > \hat Y_{33} &= 100 \times e^{0.25} \\
> > &= 128.40 \\
> > \text{Unpaid (continuing)} &= 494.82
> > \end{align*}
> > $$
> >
> > The continuing assumption adds $30.09$, or $6.5\%$. The data cannot choose between them, since both fit the past identically. This is why the monograph insists that the extrapolation of any calendar trend is a deliberate assumption, and why Marshall et al. treat its uncertainty as external systemic risk. Future economic inflation is then applied on top of both figures.
