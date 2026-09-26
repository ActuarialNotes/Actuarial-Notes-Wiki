---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9360f134ff6540ea801e57889cd8fee945b49371ef92b4404d1c468661cfe243
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Linear Trend.md
---

A **Linear Trend** models a ratemaking statistic as changing by a **constant amount** per unit of time — a fixed number of dollars of severity or pure premium a year, rather than a fixed percentage. It is fitted by least-squares regression of the statistic itself on time, and projected by adding the slope times the length of the trend period.

> $$\hat{y}_t = a + b\,t$$

> $$b = \frac{\sum (t - \bar{t})(y_t - \bar{y})}{\sum (t - \bar{t})^2}$$

> $$\text{Projected value} = y + b \times n$$

- $a$ and $b$ are the intercept and slope of an ordinary [[Linear Regression|least-squares]] fit, $y$ the historical value being trended, and $n$ the trend period in years — the same period used with an [[Exponential Trend|exponential trend]] (see [[Loss Trend]]). Werner & Modlin: with a linear selection the trend is a constant amount, so the projected change is the selected annual amount multiplied by the length of the trend period.
- The analysis works on **differences** between periods rather than percentage changes, and a linear fit's slope is in the units of the statistic (dollars of pure premium per year, claims per exposure per year).
- **The implied percentage falls over time.** For a rising series, the same $b$ is a shrinking share of a growing level, so a linear trend projects a decelerating rate of change.
- **Its shortcoming.** For a *falling* series, a straight line eventually crosses zero and projects negative frequencies or severities — impossible in insurance. Both models can be reasonable for increasing trends; the exponential model is used far more often because it has neither problem.
- Choose between the two by the data's behaviour and the fit statistics ($R^2$, residual pattern), not by which gives the more convenient answer; [[ASOP 13 - Trending Procedures in Property Casualty Insurance (ASB - 2009)|ASOP 13]] asks for the choice of model to be reasoned. The same fitting approach serves [[Premium Trend|premium]] and [[Exposure Trend|exposure]] trend.

> [!example]- Linear Fit to Pure Premiums {Example}
> Accident-year pure premiums: $2020$: $\$212$; $2021$: $\$219$; $2022$: $\$227$; $2023$: $\$233$; $2024$: $\$241$. Trend the AY $2022$ pure premium $4.5$ years forward using a linear fit, and compare with an exponential fit.
>
> > [!answer]-
> > Centre time at $2022$ ($t = -2, \dots, 2$; $\bar{y} = \$226.40$; $\sum t^2 = 10$):
> >
> > $$
> > \begin{align*}
> > \sum t\,(y_t - \bar{y}) &= -2(212) - 219 + 233 + 2(241) \\
> > &= 72 \\
> > b &= 72 / 10 = \$7.20 \text{ per year} \\
> > \text{Projected PP} &= \$227 + \$7.20 \times 4.5 \\
> > &= \$259.40
> > \end{align*}
> > $$
> >
> > (Since $\sum t = 0$, subtracting $\bar{y}$ does not change the sum.) The slope is $3.4\%$ of the $2020$ level but only $3.0\%$ of the $2024$ level: a constant amount is a falling percentage.
> >
> > An exponential fit to the same data gives $3.24\%$ a year and a projection of $\$227 \times e^{4.5 \times 0.03183} = \$261.97$. The linear projection is $\$2.57$ lower because it does not compound. Over a $4.5$-year period the two nearly agree; the gap widens with the trend period and the steepness of the trend.

> [!example]- A Falling Frequency Projected Too Far {Example}
> Claim frequency on a line where a safety device is spreading: $0.0800$, $0.0725$, $0.0660$, $0.0590$, $0.0520$ for five consecutive years ($t = 0, \dots, 4$). Project the frequency $8$ years beyond the last point ($t = 12$) with a linear and an exponential fit.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > b &= \frac{\sum (t - 2)(y_t - \bar{y})}{10} = \frac{-0.0695}{10} \\
> > &= -0.00695 \text{ per year} \\
> > a &= \bar{y} - 2b = 0.0659 + 0.0139 = 0.0798 \\
> > \hat{y}_{12} &= 0.0798 - 0.00695 \times 12 \\
> > &= -0.0036
> > \end{align*}
> > $$
> >
> > The linear model projects a **negative** frequency. The exponential fit to the same five points gives an annual trend of $-10.1\%$ and $\hat{y}_{12} = 0.0224$ — still steep, but a possible number.
> >
> > Even before it crosses zero the linear projection misbehaves: its fixed decline of $0.00695$ is $13\%$ of the last observed value ($0.0520$) but $40\%$ of its own $t = 9$ value ($0.0173$), an accelerating percentage decline that no one intended to select. For a decreasing statistic the exponential form is the defensible default.
