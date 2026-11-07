---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:193370dff1d2d00935e6585e39d86bfdd6193b2012b309813a6c90114d5d3919
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp. 110, 112, 115 (PDF pp. 122, 124, 127); Ch. 5 p. 84 (PDF p. 96), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Linear Trend.md
---

A **Linear Trend** models a ratemaking statistic as changing by a **constant amount** per unit of time, a fixed number of dollars of severity or pure premium a year rather than a fixed percentage. It is fitted by least-squares regression of the statistic itself on time, and projected by adding the slope times the length of the trend period. The fitted statistic at time $t$ is

> $$\hat{y}_t = a + b\,t$$

> $$b = \frac{\sum (t - \bar{t})(y_t - \bar{y})}{\sum (t - \bar{t})^2}$$

- $a$ and $b$ are the intercept and slope of an ordinary [[Linear Regression|least-squares]] fit to the observed values $y_t$.
- $\bar{t}$ and $\bar{y}$ are the means of the times and of the observed values.

The slope is in the units of the statistic, such as dollars of pure premium per year. With a linear selection the trend is a constant amount, so a historical value $y$ is projected over a trend period of $n$ years as

> $$\text{Projected value} = y + b \times n$$

- $n$ is the same trend period used with an [[Exponential Trend|exponential trend]] ([[Loss Trend]]).

For a rising series, the same $b$ is a shrinking share of a growing level, so a linear trend projects a falling percentage rate of change.

> [!example]- Accident-year pure premiums are $\$212$, $\$219$, $\$227$, $\$233$ and $\$241$ for 2020 to 2024. What is the 2022 pure premium trended 4.5 years forward with a linear fit, and with an exponential fit? {Example}
> - With time centered at 2022, $t = -2, \ldots, 2$, so $\sum t^2 = 10$.
> - Since $\sum t = 0$, the numerator is $\sum t\,y_t = -2(212) - 219 + 233 + 2(241) = 72$.
> - The slope is $b = 72/10 = \$7.20$ per year.
> - The linear projection is $227 + 7.20 \times 4.5 = \$259.40$.
> - The slope is 3.4% of the 2020 level but only 3.0% of the 2024 level.
> - An exponential fit gives $3.24\%$ a year and a projection of $\$261.97$, higher because it compounds.

## Linear trend on a falling series

For a *falling* series, a straight line eventually crosses zero and projects negative frequencies or severities, which is impossible in insurance. Werner & Modlin call this the shortcoming of linear trend models. Both models can be reasonable for increasing trends, and the choice between them rests on the data's behavior and the fit statistics. [[ASOP 13 - Trending Procedures in Property Casualty Insurance (ASB - 2009)|ASOP 13]] asks for the choice of model to be reasoned.

> [!example]- Claim frequency on a line where a safety device is spreading is $0.0800$, $0.0725$, $0.0660$, $0.0590$ and $0.0520$ for five consecutive years, $t = 0, \ldots, 4$. What do a linear and an exponential fit project 8 years beyond the last point, at $t = 12$? {Example}
> - The linear slope is $b = -0.0695/10 = -0.00695$ per year, and the intercept is $a = 0.0659 - 2b = 0.0798$.
> - The linear projection is $0.0798 - 0.00695 \times 12 = -0.0036$, a **negative** frequency.
> - The exponential fit gives an annual trend of $-10.1\%$ and a projection of $0.0224$, steep but possible.

## Linear trend in time series

In time series analysis, a linear trend in time model is

> $$y_t = \beta_0 + \beta_1 t + \varepsilon_t$$

- $\beta_0$ and $\beta_1$ are the intercept and slope of the deterministic trend.
- $\varepsilon_t$ are white noise errors, not a random walk.

The forecast at time $t$ is $\hat{\beta}_0 + \hat{\beta}_1 t$, from the estimated intercept and slope.

> [!trap] Adding the slope to the average instead of the value being trended
> The projection starts from the historical value being trended. In the first example, adding $7.20 \times 4.5$ to the average $\bar{y} = \$226.40$ gives $\$258.80$, not the $\$259.40$ projected from the 2022 pure premium of $\$227$.
