---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f8077f2ab194ba05080fd937ccbca68ae43df2d087a48dc614896b06d74ba4fd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Superimposed Inflation.md
---
**Superimposed Inflation** (SI) is the change in claim costs from one calendar period to the next beyond what economic [[Inflation|inflation]] explains. [[Stochastic Loss Reserving Using Generalized Linear Models (Taylor and McGuire - 2016)|Taylor and McGuire (2016)]] define it as calendar-period changes, positive or negative, net of changes due to economic inflation. Like economic inflation, it is a [[Calendar Year Effect|calendar-period effect]]: it acts on every payment made in a period, whatever the accident period.

Restated net of an economic inflation index, the SI in calendar year $t$ is

> $$\text{SI}_t = \frac{X_t / X_{t-1}}{1 + i_t} - 1$$

- $X_t$ is the average payment per finalized claim in calendar year $t$.
- $i_t$ is the rise in the economic inflation index over year $t$.

> [!example]- What was the superimposed inflation in 2023 and in 2024? {Example}
> For a bodily injury portfolio, the average payment per finalized claim was $\$40{,}000$ in 2022, $\$44{,}096$ in 2023 and $\$45{,}860$ in 2024. The wage index that drives the income-replacement part of these claims rose $4\%$ in each year.
>
> > [!answer]-
> > - Payments grew by $44{,}096/40{,}000 = 1.1024$ in 2023, so $\text{SI}_{2023} = 1.1024/1.04 - 1 = 6.0\%$.
> > - Payments grew by $45{,}860/44{,}096 = 1.0400$ in 2024, so $\text{SI}_{2024} = 1.04/1.04 - 1 = 0.0\%$.
> > - SI ran at $6\%$ and then stopped. A single average rate, $\sqrt{1.06} - 1 = 2.96\%$ a year, would describe neither year.

## Sources of superimposed inflation

Taylor and McGuire's examples of calendar-period effects include award precedents set by court decisions, or other environmental change, that apply from a point in time whatever the accident date. [[A Framework for Assessing Risk Margins (Marshall et al. - 2008)|Marshall et al. (2008)]] list recent and possible future legislative amendments and their erosion, precedents creating new heads of damage, medical and legal costs, and systemic shifts in large claim frequency or severity.

SI is typically variable over time. Payments can outrun economic inflation for years until measures curtail them, and nil or even negative SI can follow.

## Superimposed inflation in a GLM

Past payments are first adjusted to valuation-date dollars with a natural economic inflation series, such as wages for workers compensation or bodily injury, so that future economic inflation becomes an explicit assumption. If the calendar-period and heat-map diagnostics still show calendar effects, calendar terms are added to the [[GLM Loss Reserving|ODP cross-classified model]].

They cannot be one free parameter per diagonal. Accident, development and calendar periods are collinear, since knowing two fixes the third, so the fit has no unique solution. The same caution applies to the Mack formulation, whose latest diagonal acts as the accident-period effect. The modeller imposes a simple structure instead. In Taylor and McGuire's example (their Section 7.5, beyond the chapters Exam 7 assigns), the expected payment in accident period $k$ and development period $j$ is

> $$\mu_{kj} = \alpha_k \, \beta_j \, e^{\min(h,\, k + j - 1)\,\varphi}$$

- $\alpha_k$ and $\beta_j$ are the accident and development parameters.
- $k + j - 1$ is the calendar period of cell $(k, j)$.
- $h$ is the number of calendar periods over which SI ran.
- $\varphi$ is the SI parameter.

With payments in valuation-date dollars, SI runs at $e^{\varphi} - 1$ per period for the first $h$ periods and is flat thereafter. The structure must be extrapolated into the future deliberately, because the data cannot choose how the trend continues.

> [!example]- What is accident period 3's unpaid amount if SI stays flat, and if it continues at the past rate? {Example}
> Payments are in valuation-date dollars. The fitted model gives $\alpha_3 = 1{,}000$, $\beta_2 = 0.30$, $\beta_3 = 0.10$, $\varphi = 0.05$ and $h = 3$. The latest diagonal is calendar period 3, so the unpaid cells are $(3, 2)$ and $(3, 3)$.
>
> > [!answer]-
> > - The future cells lie in calendar periods 4 and 5.
> > - If SI stays flat, $\min(3, 4) = \min(3, 5) = 3$, so both cells carry $3\varphi = 0.15$.
> > - The flat cells are $300\,e^{0.15} = 348.55$ and $100\,e^{0.15} = 116.18$, a total of $464.73$.
> > - If SI continues at $e^{0.05} - 1 = 5.13\%$ per period, the cells carry $4\varphi$ and $5\varphi$: $300\,e^{0.20} = 366.42$ and $100\,e^{0.25} = 128.40$, a total of $494.82$.
> > - The continuing assumption adds $30.09$, or $6.5\%$, although both fit the past identically.
> > - Future economic inflation is then applied on top of both figures.

Because of the same collinearity, the chain ladder absorbs a constant rate of past inflation, economic or superimposed, into its row and column parameters and carries it forward at the same rate. Adjusting to constant dollars first replaces that implicit assumption with an explicit one.

## Superimposed inflation in risk margins

Marshall et al. place most SI in the [[External Systemic Risk|external systemic risk]] category of legislative, political and claims inflation risk. The same analysis that sets that category's coefficient of variation supports the central estimate: the average of the range of possible impacts, combined across the risks, estimates SI. Some sources of SI are highly skewed, so they matter more at high probabilities of adequacy than at the 75th percentile. The "sophistication and performance of superimposed inflation analysis" is also a risk indicator on the [[Internal Systemic Risk|internal systemic risk]] scorecard.
