**Loss Trend** is the systematic annual rate of change in average claim severity (or pure premium) over time, driven by factors such as general inflation, medical cost inflation, changes in the legal environment, jury awards, or shifts in claim mix; it is applied in ratemaking to project historical losses to the future rating period.

> $$\text{Trend Factor} = (1 + t)^{n}$$

- $t$ = annual trend rate; $n$ = trend period, measured from the midpoint of the historical experience period to the midpoint of the prospective rating period
- Severity trend and frequency trend are often estimated separately and combined into a pure premium trend: $(1 + t_{\text{sev}})^n \times (1 + t_{\text{freq}})^n$
- Trend is typically estimated via linear or exponential regression of average severity or pure premium on historical data; the selected rate may be a weighted average of several indications
- A positive trend means historical losses understate future costs; failing to apply trend results in rates that are inadequate when the policy is actually in effect

> [!example]- Applying a Loss Trend Factor {Example}
> Losses are evaluated at the midpoint of accident year 2023 (July 1, 2023). The prospective rating period runs from July 1, 2025 to June 30, 2026, with a midpoint of January 1, 2026. The selected annual severity trend is 5%.
>
> > [!answer]-
> > The trend period $n$ runs from July 1, 2023 to January 1, 2026, which is 2.5 years.
> > $$\text{Trend Factor} = 1.05^{2.5} = 1.1314$$
> > Historical average severity is multiplied by 1.1314 to project it to the future rating period.
