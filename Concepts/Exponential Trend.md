---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:56b23c290dcf226b74ae54ef3618df71de62341704905391271e39ab0c26a9b8
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp. 110-116 (PDF pp. 122-128: linear vs exponential, Table 6.14 windows, R², pure premium trend combination, catastrophes/rolling years fn. 22, benefit changes, trend period 4.5 years); Ch. 5 p. 84 (PDF p. 96), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Exponential Trend.md
---

An **Exponential Trend** models a ratemaking statistic, such as frequency, severity, pure premium, average premium or an exposure base, as changing by a **constant percentage** per unit of time. It is fitted by least-squares regression of the natural log of the statistic on time, and it is the standard model for [[Loss Trend|loss]], [[Premium Trend|premium]] and [[Exposure Trend|exposure]] trend. The fitted statistic $\hat{y}_t$ at time $t$ is

> $$\hat{y}_t = a\,e^{b t}$$

> $$\ln \hat{y}_t = \ln a + b\,t$$

- $a$ is the fitted value at $t = 0$.
- $b$ is the [[Linear Regression|least-squares]] slope of $\ln y_t$ on $t$, for the observed values $y_t$.

The slope and the fitted trend are

> $$b = \frac{\sum (t - \bar{t})(\ln y_t - \overline{\ln y})}{\sum (t - \bar{t})^2}$$

> $$\hat{T} = e^{b} - 1$$

- $\bar{t}$ and $\overline{\ln y}$ are the means of the times and of the logged values.

With $t$ in years, $\hat{T}$ is the annual trend. With $t$ in quarters, the annual trend is $e^{4b} - 1$. The selected trend is applied as a factor $(1 + \hat{T})^{n}$, where $n$ is the trend period from the average date of the experience period to the average date of the forecast period.

> [!example]- Accident-year severities, developed, capped and excluding catastrophes, are $\$9{,}800$, $\$10{,}150$, $\$10{,}700$, $\$11{,}150$ and $\$11{,}800$ for 2020 to 2024. New rates take effect for annual policies written in 2026. What is the fitted annual trend, and what is the trended 2024 severity? {Example}
> - With time centered at 2022, $t = -2, -1, 0, 1, 2$, so $\bar{t} = 0$ and $\sum t^2 = 10$.
> - The logged severities are $9.19014$, $9.22523$, $9.27800$, $9.31919$ and $9.37585$, and $\sum t \ln y_t = 0.46538$.
> - The slope is $b = 0.46538/10 = 0.046538$, so $\hat{T} = e^{0.046538} - 1 = 4.76\%$, and $4.8\%$ is selected.
> - The trend runs from the 2024 average accident date, $7/1/2024$, to the average accident date of policies written in 2026, $12/31/2026$, so $n = 2.5$ years.
> - The trend factor is $1.048^{2.5} = 1.1244$, and the trended severity is $11{,}800 \times 1.1244 = \$13{,}268$.

## Fitting trend data in practice

For short-tailed lines the data is usually calendar-year paid data for the 12 months ending each quarter, a rolling year that smooths seasonality. For long-tailed lines, it is accident-year losses developed to ultimate. Werner's example fits windows of 20, 16, 12, 8, 6 and 4 points, and $R^2$ is the usual diagnostic. The recent windows show whether the trend has shifted. Catastrophes are excluded from trend data, since with rolling years one event contaminates four points, and large losses are capped. Likewise, benefit-level changes are removed or the fit will read them as trend.

Selection is a judgment informed by external indices, and [[ASOP 13 - Trending Procedures in Property Casualty Insurance (ASB - 2009)|ASOP 13]] requires it to be reasoned and disclosed.

## Frequency and severity trends

Separately selected frequency and severity trends combine multiplicatively: $1 + T_{PP} = (1 + T_F)(1 + T_S)$. Fitting the two separately shows which one drives the pure premium trend, and flags when one of them shifts.

> [!example]- Frequencies for the 12 months ending six consecutive quarters are $0.0620$, $0.0615$, $0.0611$, $0.0606$, $0.0602$ and $0.0597$. The selected severity trend is $+4.8\%$ a year. What are the annual frequency trend, the pure premium trend, and the factor over a 4.5-year trend period? {Example}
> - With the quarters numbered $t = 0, \ldots, 5$, $\bar{t} = 2.5$ and $\sum (t - \bar{t})^2 = 17.5$.
> - The sum $\sum (t - \bar{t}) \ln y_t$ is $-0.13066$, so $b = -0.13066/17.5 = -0.007466$ per quarter.
> - The annual frequency trend is $e^{4(-0.007466)} - 1 = -2.94\%$, and $-2.9\%$ is selected.
> - The pure premium trend is $(1 - 0.029)(1 + 0.048) - 1 = 1.76\%$ a year.
> - The trend factor is $1.0176^{4.5} = 1.0817$.

## Exponential and linear trends

A constant rate of change compounds the way inflation does, and the fitted curve never goes negative. A [[Linear Trend|linear trend]] on a decreasing series eventually projects negative frequencies or severities, which Werner & Modlin call its shortcoming. The exponential model is therefore used far more often.

> [!trap] Using the end points instead of the fit
> The end-point shortcut for the severities, $(11{,}800/9{,}800)^{1/4} - 1 = 4.75\%$, happens to agree with the fit's 4.76%. It uses only two of the five observations, so one unusual year at either end swings it, while the regression weighs them all.
