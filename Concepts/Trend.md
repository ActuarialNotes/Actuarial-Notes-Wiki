---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ded45e74ba328a190b13166dd44a53633ab20ea45f8dd2aba74835319b72d8a9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Trend.md
---

**Trend** is the systematic change in loss costs or exposures over time, applied in ratemaking to project historical experience forward to the future rating period.

> $$\text{Trend Factor} = (1 + r)^n$$

> $$\text{Trend Period} = \text{Average accident date of forecast period} - \text{Average accident date of experience period}$$

- Loss trend is the change in claim frequency and severity over time, driven by factors such as monetary inflation, medical costs, safety technology, social influences and distributional changes; it is applied in both the [[Loss Ratio Method]] and the [[Pure Premium Method]]
- Exposure trend (e.g., wage growth for workers comp payroll) arises where the exposure base is inflation-sensitive; in a loss ratio analysis it is projected as part of the premium, and how it enters a [[Pure Premium Method|pure premium]] indication depends on how the loss trends were measured
- The trend period runs from the average date of historical losses (midpoint of the accident year) to the average date of future losses: the midpoint of the period over which the new policies' coverage runs, which for annual policies written over one year is one year after the effective date

> [!example]- Applying Loss and Exposure Trend {Example}
> AY 2023 ultimate losses $= \$1{,}000{,}000$; payroll exposures $= \$50{,}000{,}000$. Average accident date of the experience period $= 7/1/2023$; of the forecast period $= 7/1/2026$. Loss trend $= 4\%/\text{yr}$; exposure trend $= 2\%/\text{yr}$.
>
> > [!answer]-
> > Trend period $= 3.0$ years.
> > $$\text{Trended losses} = 1{,}000{,}000 \times 1.04^{3} = 1{,}124{,}864$$
> > $$\text{Trended exposures} = 50{,}000{,}000 \times 1.02^{3} = 53{,}060{,}400$$
> > $$\text{Trended pure premium} = 1{,}124{,}864 / 53{,}060{,}400 = \$2.12 \text{ per } \$100 \text{ payroll}$$
