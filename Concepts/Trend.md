---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:e9b720c41c5b7b6ae802f5afac2f98d61df9aee83696c189afc60e16ea56263b
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 4 pp.61-62 (Exposure Trend); Ch. 5 pp.81-82, 88; Ch. 6 pp.109-110 (Loss Trend), 112-115 (trend periods), 119 (PDF pp.73-74, 93-94, 100, 121-122, 124-127, 131), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "SOA Exam FAM-S sample solutions (Oct 2024), Q69, Q76, Q95, Q96, Q107 (pp.29, 31, 37), sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
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
