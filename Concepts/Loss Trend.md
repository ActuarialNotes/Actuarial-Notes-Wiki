---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:da75221437baab6bde09d6bc30d99663c3855b771c65bc65928a24ced6c585ec
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp.109-121 (PDF pp.121-133), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "ASOP No. 13, Trending Procedures in Property/Casualty Insurance (ASB, 2009), Sections 1-4, pp.1-4 (PDF pp.5-8), sha256:5d985e9cbf666cda56b67bb6489e2f1430313278145e87816c7b2297dcd59acd — https://www.casact.org/sites/default/files/2021-03/5_ASOP_13.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Trend.md
---

**Loss Trend** is the annual rate of change in loss cost over time — driven by inflation, the legal environment, technology, safety and mix — applied to bring historical losses from the cost level of the experience period to the cost level of the **future policy period**.

> $$\text{Trend Factor} = (1 + t)^{n}$$

> $$1 + t_{PP} = (1 + t_{\text{freq}})(1 + t_{\text{sev}})$$

- $t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of loss in the experience period to the average date of loss in the forecast period. In Werner & Modlin's example — accident year 2011 losses, annual policies written during 2015 — that is $7/1/2011$ to $12/31/2015$, or $4.5$ years; a common error is measuring it from the wrong end of either period.
- Trend and [[Loss Development|development]] answer different questions and must both be applied: development brings immature losses to *their own* ultimate level; trend restates past losses to the level expected for similar losses in the *future* period. Werner & Modlin call the belief that doing both double-counts inflation the **overlap fallacy**: development does include the inflation that raises payments on reported claims after reporting, but that does not prove an overlap.
- Trend is selected, not merely fitted. Linear and exponential regressions are the most common measures; exponential models may be fit to the whole of the data and to more recent periods, supplemented with multi-state, countrywide or industry data and non-insurance indices, and the trend selected with judgment. [[ASOP 13 - Trending Procedures in Property Casualty Insurance (ASB - 2009)|ASOP 13]] asks the actuary to select data appropriate to the trend being analyzed, consider the lengths of the experience and forecast periods in setting the trending period, evaluate each procedure's results for reasonableness, and document the methods, assumptions and data sources.
- **Frequency and severity are analyzed separately** to understand the drivers of the trend, because they can move in opposite directions — Werner & Modlin's example is a heavily marketed higher deductible, which lowers frequency but is likely to increase severity, a shift that is hard to see in pure premium.
- A **two-step** trend is used when the trend in the historical period differs from the trend expected in the forecast period (legislative changes are one example): losses are first trended at a *current* trend from the experience period's average accident date to that of the latest data point in the trend data, then projected at a separately selected trend to the forecast period's average accident date. A benefit-level change is restated in the data, or allowed for in the selection, so that it is not double counted.
- Limits **leverage** severity trend: for a positive trend, basic-limits losses trend more slowly than total-limits losses and the excess layer faster, so a severity trend measured on total-limits data must be adjusted before it is applied to basic-limits losses, or the trend is measured on basic-limits data (see [[Increased Limits|ILFs]]).

![[Media/Figures/Loss_Trend.svg|340]]

> [!example]- Getting the Trend Period Right {Example}
> Rates will be in effect for annual policies written from $7/1/2025$ to $6/30/2026$. The experience period is accident year $2023$. Selected annual severity trend is $5\%$.
>
> Compute the trend period and the trend factor.
>
> > [!answer]-
> > **Average date of loss in the experience period.** Accident year $2023$ runs $1/1$–$12/31/2023$; with losses occurring uniformly, its average loss date is $7/1/2023$.
> >
> > **Average date of loss in the forecast period.** Policies are written between $7/1/2025$ and $6/30/2026$; each provides coverage for a year after it is written. The first policy is exposed $7/1/2025$–$6/30/2026$ and the last $7/1/2026$–$6/30/2027$, so the exposure period runs $7/1/2025$ to $6/30/2027$ and its midpoint — the average loss date — is $7/1/2026$.
> >
> > $$\begin{align*}
> > n &= 7/1/2026 - 7/1/2023 = 3.0 \text{ years} \\[4pt]
> > \text{Trend factor} &= 1.05^{3.0} = 1.1576
> > \end{align*}$$
> >
> > The common mistake is to measure to the *start* of the policy period ($7/1/2025$, giving $n = 2.0$) or to its midpoint ($1/1/2026$, giving $n = 2.5$). Both understate the projection — here by $5\%$ and $2\%$ of the entire loss provision.

> [!example]- Fitting and Selecting a Trend {Example}
> Annual severity for a liability line:
>
> | AY | Severity | Change |
> |---|---|---|
> | $2019$ | $\$8{,}000$ | |
> | $2020$ | $\$8{,}300$ | $+3.8\%$ |
> | $2021$ | $\$8{,}700$ | $+4.8\%$ |
> | $2022$ | $\$9{,}400$ | $+8.0\%$ |
> | $2023$ | $\$10{,}200$ | $+8.5\%$ |
> | $2024$ | $\$11{,}100$ | $+8.8\%$ |
>
> What trend should be selected?
>
> > [!answer]-
> > Annual trends over different windows, from end point to end point (an exponential regression through every point gives $6.9\%$, $8.5\%$ and $8.7\%$):
> >
> > $$\begin{align*}
> > \text{5-year } (2019\text{–}2024): \; \left(\tfrac{11{,}100}{8{,}000}\right)^{1/5} - 1 &= 6.8\% \\[6pt]
> > \text{3-year } (2021\text{–}2024): \; \left(\tfrac{11{,}100}{8{,}700}\right)^{1/3} - 1 &= 8.5\% \\[6pt]
> > \text{2-year } (2022\text{–}2024): \; \left(\tfrac{11{,}100}{9{,}400}\right)^{1/2} - 1 &= 8.7\%
> > \end{align*}$$
> >
> > The series is not a constant trend — it **accelerated** around $2022$. The five-year figure averages the old regime with the new one and understates the current level of inflation; the two-year figure is responsive but rests on three observations.
> >
> > A defensible selection is around $8.5\%$, supported by: (i) the recent fits clustering at $8.5$–$8.8\%$, (ii) whether external evidence — medical cost indices, jury verdict data, the insurer's own settled-claim severities — corroborates an acceleration, and (iii) a judgment as to whether the acceleration is a level shift or a lasting change.
> >
> > ASOP 13 asks for the trend estimate to be evaluated for reasonableness and documented so that another actuary could assess it: selecting $6.8\%$ because it produces a smaller rate increase, without addressing the acceleration visible in the data, would not survive that review.
