---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0412c82a281aa898035f7c22712188fe57735d7ef5c6ec50666cd68cfaa1cdf4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Exponential Trend.md
---

An **Exponential Trend** models a ratemaking statistic — frequency, severity, pure premium, average premium, an exposure base — as changing by a **constant percentage** per unit of time. It is fitted by least-squares regression of the natural log of the statistic on time, and it is the standard model for [[Loss Trend|loss]], [[Premium Trend|premium]] and [[Exposure Trend|exposure]] trend.

> $$\hat{y}_t = a\,e^{b t}$$

> $$\ln \hat{y}_t = \ln a + b\,t$$

> $$\hat{T} = e^{b} - 1$$

- $b$ is the [[Linear Regression|least-squares]] slope of $\ln y_t$ on $t$: $b = \sum (t - \bar{t})(\ln y_t - \overline{\ln y}) \big/ \sum (t - \bar{t})^2$. With $t$ in years, $\hat{T}$ is the annual trend; with $t$ in quarters, the annual trend is $e^{4b} - 1$.
- The selected trend is applied as a factor $(1 + \hat{T})^{n}$, where $n$ is the trend period from the average date of the experience period to the average date of the forecast period. Separately selected frequency and severity trends combine multiplicatively: $1 + T_{PP} = (1 + T_F)(1 + T_S)$.
- **Why it is preferred:** a constant rate of change compounds the way inflation does, and the fitted curve never goes negative. A [[Linear Trend|linear trend]] on a decreasing series eventually projects negative frequencies or severities, which Werner & Modlin call its shortcoming.
- **How it is fitted in practice:** for short-tailed lines, calendar-year paid data for the 12 months ending each quarter (the rolling year smooths seasonality); for long-tailed lines, accident-year losses developed to ultimate. Werner's example fits windows of 20, 16, 12, 8, 6 and 4 points, and $R^2$ is the usual diagnostic; the recent windows show whether the trend has shifted.
- Catastrophes are excluded from trend data (with rolling years, one event contaminates four points) and large losses capped; benefit-level changes are removed or the fit will read them as trend. Selection is a judgment informed by external indices, and [[ASOP 13 - Trending Procedures in Property Casualty Insurance (ASB - 2009)|ASOP 13]] requires it to be reasoned and disclosed.

> [!example]- Fitting and Applying an Annual Severity Trend {Example}
> Accident-year severities (developed, capped, excluding catastrophes): $2020$: $\$9{,}800$; $2021$: $\$10{,}150$; $2022$: $\$10{,}700$; $2023$: $\$11{,}150$; $2024$: $\$11{,}800$. New rates take effect for annual policies written in $2026$.
>
> Fit an exponential trend and trend the AY $2024$ severity to the forecast period.
>
> > [!answer]-
> > Centre time at $2022$, so $t = -2, -1, 0, 1, 2$ and $\sum t^2 = 10$. The logs are $9.19014$, $9.22523$, $9.27800$, $9.31919$, $9.37585$.
> >
> > $$
> > \begin{align*}
> > \sum t \ln y_t &= -2(9.19014) - 9.22523 \\
> > &\quad + 9.31919 + 2(9.37585) \\
> > &= 0.46538 \\
> > b &= 0.46538 / 10 = 0.046538 \\
> > \hat{T} &= e^{0.046538} - 1 = 4.76\%
> > \end{align*}
> > $$
> >
> > Select $4.8\%$. The trend runs from the AY $2024$ average accident date, $7/1/2024$, to the average accident date of policies written in $2026$, $12/31/2026$: $n = 2.5$ years.
> >
> > $$
> > \begin{align*}
> > \text{Trend factor} &= 1.048^{2.5} = 1.1244 \\
> > \text{Trended severity} &= \$11{,}800 \times 1.1244 \\
> > &= \$13{,}268
> > \end{align*}
> > $$
> >
> > The end-point shortcut $(11{,}800/9{,}800)^{1/4} - 1 = 4.75\%$ happens to agree here, but it uses only two of the five observations; one unusual year at either end would swing it, while the regression weighs them all.

> [!example]- Quarterly Frequency Fit Combined with Severity {Example}
> Frequencies for the 12 months ending six consecutive quarters: $0.0620$, $0.0615$, $0.0611$, $0.0606$, $0.0602$, $0.0597$. The selected severity trend is $+4.8\%$ a year.
>
> Find the annual frequency trend, the pure premium trend, and the factor for a $4.5$-year trend period.
>
> > [!answer]-
> > Number the quarters $t = 0, \dots, 5$: $\bar{t} = 2.5$ and $\sum (t - \bar{t})^2 = 17.5$. The logs are $-2.78062$, $-2.78872$, $-2.79524$, $-2.80346$, $-2.81008$, $-2.81842$, and $\sum (t - \bar{t}) \ln y_t = -0.13066$.
> >
> > $$
> > \begin{align*}
> > b &= -0.13066 / 17.5 = -0.007466 \text{ per quarter} \\
> > \hat{T}_F &= e^{4(-0.007466)} - 1 = -2.94\%
> > \end{align*}
> > $$
> >
> > Select $-2.9\%$ for frequency. Then
> >
> > $$
> > \begin{align*}
> > 1 + T_{PP} &= (1 - 0.029)(1 + 0.048) \\
> > &= 1.0176 \\
> > \text{Trend factor} &= 1.0176^{4.5} = 1.0817
> > \end{align*}
> > $$
> >
> > Pure premium trends at $+1.8\%$ a year, far less than severity alone suggests, because claims are becoming rarer as they become dearer. Trending pure premium directly would give a similar answer; fitting the components separately shows *why*, and flags when one of them shifts.
