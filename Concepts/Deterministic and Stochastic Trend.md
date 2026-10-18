---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:dafaa494f7146a4b478948e757bae5b0a63e3adeca8f306342639bd945a4cf96
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §10.4 Stochastic and deterministic trends, read 2026-10-18, sha256:95550082cbf540253feec34756c1bddb6550fd2cdf02857beb82defb0b570c7e — https://otexts.com/fpp3/dynamic-regression.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §7.3 Spurious regression, read 2026-10-18, sha256:0ef490a9dabfd7bb9be230474135cd45077cf20a695a4fdc3be360ac1ebfd5f4 — https://otexts.com/fpp3/regression.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.1 differencing and unit root tests, Table 9.1, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
    - "CAS, Exam MAS-II Content Outline 2026 (MASII_CO_S_2026), p.3 Domain D tasks 1-4 and p.4 Cowpertwait citation 'Chapters 1-5 (excluding Sections 3.3 and 3.4), 6, 7 (Sections 7.1, 7.2 and 7.3)', D1-D4, B, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Deterministic and Stochastic Trend.md
---

A **deterministic trend** is a fixed function of time that the series returns to after a shock; a **stochastic trend** is a unit root, where each shock permanently moves the level. They look alike on a plot and demand opposite treatments — the distinction that objective D3 turns on.

> $$\text{deterministic: } Y_t = \alpha + \beta t + z_t, \quad z_t \text{ stationary}$$
>
> $$\text{stochastic: } Y_t = \delta + Y_{t-1} + \varepsilon_t \quad (\text{[[Random Walk]] with drift})$$

| | Deterministic (trend-stationary) | Stochastic (difference-stationary) |
| :--- | :--- | :--- |
| Effect of a shock | dies out — the series returns to the line | **permanent** — the level shifts forever |
| Correct treatment | regress on $t$, model the residuals | [[Differencing|difference]] the series |
| $\mathrm{Var}(Y_t)$ | bounded | grows with $t$ |
| Long-horizon forecast | the trend line | last value plus $h\delta$, with a widening interval |

- **Getting it wrong costs both ways.** Differencing a trend-stationary series over-differences it, injecting a spurious negative MA(1) term. Detrending a unit-root series leaves the trend behind and the residuals still non-stationary
- The formal test is a unit-root (Dickey–Fuller) test: $H_0$ is a stochastic trend
- Forecast intervals differ sharply — a deterministic trend gives intervals of roughly constant width, a stochastic one gives intervals widening as $\sqrt{h}$
- **Spurious regression**: two independent series with stochastic trends can show a highly significant regression and a high $R^2$. Always check the residual [[Autocorrelation Function|ACF]] before believing a time-series regression

![[Media/Figures/Deterministic_and_Stochastic_Trend.svg|340]]

> [!example]- Which Trend Is It? {Example}
> A 60-quarter premium index trends upward. Regressing on $t$ gives $R^2 = 0.94$ but residuals with $\hat\rho_1 = 0.93$ decaying very slowly. First-differencing gives a series with $\hat\rho_1 = 0.11$ and nothing else significant. Which trend, and what is the model?
>
> > [!answer]-
> > **Stochastic.** The detrended residuals are still non-stationary — $\hat\rho_1 = 0.93$ with slow decay is a unit root that the regression did not remove. A true deterministic trend would leave stationary residuals.
> > First differencing produces something close to [[White Noise]], so the model is a **random walk with drift**, ARIMA(0,1,0) with a constant. The $R^2 = 0.94$ from the trend regression is the spurious-regression trap.
