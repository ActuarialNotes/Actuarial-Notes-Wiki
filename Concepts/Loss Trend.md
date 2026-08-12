**Loss Trend** is the annual rate of change in loss cost over time — driven by inflation, the legal environment, technology, safety and mix — applied to bring historical losses from the cost level of the experience period to the cost level of the **future policy period**.

> $$\text{Trend Factor} = (1 + t)^{n}$$

> $$1 + t_{PP} = (1 + t_{\text{freq}})(1 + t_{\text{sev}})$$

- $t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of loss in the experience period to the average date of loss in the forecast period. For annual policies and a full-year accident period, $n$ is typically $2$ to $3$ years, and a common error is measuring it from the wrong end of either period.
- Trend and [[Loss Development|development]] answer different questions and must both be applied: development moves an immature accident year to *its own* ultimate; trend moves that ultimate to a *future* cost level. Werner warns explicitly against the **overlap fallacy** — using calendar-year data that already contains inflation and then trending it again.
- Trend is selected, not merely fitted. Standard practice is to fit exponential regressions over several windows (e.g. latest $4$, $6$, $8$, $12$, $20$ quarters) on internal data, compare with industry and external indices, and select with judgment. [[ASOP 13 - Trending Procedures in Property Casualty Insurance (ASB - 2009)|ASOP 13]] requires the actuary to consider the appropriateness of the data, the period, and the fitted model, and to disclose the basis of the selection.
- **Frequency and severity are trended separately** where possible, because they respond to different forces and often move in opposite directions — falling frequency from vehicle safety technology against rising severity from the cost of repairing that technology.
- A **two-step** trend is used when a level shift (a benefit change, a law amendment, a coverage change) breaks the series: the shift is handled by a separate law-level adjustment and only the residual trend is fitted.
- Trend is applied to **capped** or **basic-limits** losses; excess layers trend faster (leveraged trend) and are handled through [[Increased Limits|ILFs]].

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
> > Fitted exponential trends over different windows:
> >
> > $$\begin{align*}
> > \text{5-year } (2019\text{–}2024): \; \left(\tfrac{11{,}100}{8{,}000}\right)^{1/5} - 1 &= 6.8\% \\[6pt]
> > \text{3-year } (2021\text{–}2024): \; \left(\tfrac{11{,}100}{8{,}700}\right)^{1/3} - 1 &= 8.5\% \\[6pt]
> > \text{2-year } (2022\text{–}2024): \; \left(\tfrac{11{,}100}{9{,}400}\right)^{1/2} - 1 &= 8.7\%
> > \end{align*}$$
> >
> > The series is not a constant trend — it **accelerated** around $2022$. The five-year fit averages the old regime with the new one and understates the current level of inflation; the two-year fit is responsive but rests on three observations.
> >
> > A defensible selection is around $8.5\%$, supported by: (i) the recent fits clustering at $8.5$–$8.8\%$, (ii) whether external evidence — medical cost indices, jury verdict data, the insurer's own settled-claim severities — corroborates an acceleration, and (iii) a judgment as to whether the acceleration is a level shift or a lasting change.
> >
> > What ASOP 13 requires is that the choice be *reasoned and disclosed*: selecting $6.8\%$ because it produces a smaller rate increase, without addressing the acceleration visible in the data, would not meet the standard.
