**On-Leveling** is the process of restating historical earned premium to the rate level currently in effect, so that loss ratios across the experience period are comparable and not distorted by intervening [[Rate Change]]s. The output of the process is [[On Level Premium|on-level premium]].

> $$\text{On-Level Factor}$$
>
> $$= \frac{\text{Current Rate Level Index}}{\text{Average Rate Level Index of Period}}$$

- The **parallelogram (geometric) method** maps each rate change as a diagonal line across a calendar-time/policy-age square; the area of each rate-level region equals the proportion of a year's earned premium written at that rate level. It assumes premium is written uniformly throughout the year.
- The **extension of exposures method** re-rates every historical policy under the current rate manual. It is more accurate (handles distributional shifts and non-uniform writing) but data-intensive; the parallelogram method is the common shortcut.
- On-leveling is required for the [[Loss Ratio Method]]; the [[Pure Premium Method]] sidesteps it by working from exposures and losses directly rather than premium.
- Rate level indices compound multiplicatively: each change is applied on top of the running index, and the period's *average* index is the exposure-weighted blend of the levels in force during that period.

> [!example]- Parallelogram On-Level Factor {Example}
> Rates changed $+12\%$ on $7/1/2023$. Premium is written uniformly. What on-level factor brings CY 2023 earned premium to the current rate level (assume no later changes)?
>
> > [!answer]-
> > Set the pre-change index $= 1.000$, so the post-change (current) index $= 1.120$.
> >
> > A $+12\%$ change at mid-year, with uniform writing of annual policies, earns over a parallelogram. The portion of CY 2023 earned premium at the **new** rate level is $0.125$ (the area $\tfrac12 \times \tfrac12 \times \tfrac12$), and $0.875$ remains at the old level.
> >
> > Average 2023 index $= 0.875(1.000) + 0.125(1.120) = 1.015$
> >
> > On-level factor $= 1.120 / 1.015 = 1.103$ — multiply CY 2023 earned premium by $1.103$.
