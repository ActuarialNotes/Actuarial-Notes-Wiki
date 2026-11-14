---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:e996a6cd8a95fe21f5d9509c185b7c9ec43a517348aacb2a846fa13a72d15702
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 4 pp.61-62 (Exposure Trend); Ch. 5 pp.81-82, 88; Ch. 6 pp.109-110 (Loss Trend), 112-115 (trend periods), 119 (PDF pp.73-74, 93-94, 100, 121-122, 124-127, 131), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "SOA Exam FAM-S sample solutions (Oct 2024), Q69, Q76, Q95, Q96, Q107 (pp.29, 31, 37), sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Trend.md
---

**Trend** is the systematic change in loss costs or exposures over time. Ratemaking applies it to project historical experience forward to the future rating period, by multiplying each historical value by a trend factor. For an annual trend rate $r$ over a trend period of $n$ years, the trend factor is

> $$\text{Trend Factor} = (1 + r)^n$$

## Trend period

The trend period runs from the average date of historical losses to the average date of future losses:

> $$\text{Trend Period} = \text{Forecast date} - \text{Experience date}$$

- $\text{Experience date}$ is the average accident date of the experience period. For an accident year it is the midpoint of the year, July 1 for a calendar year.
- $\text{Forecast date}$ is the average accident date of the forecast period, the midpoint of the period over which the new policies' coverage runs.

For annual policies written over one year, the average accident date of the forecast period is one year after the effective date.

## Loss trend and exposure trend

Loss trend is the change in claim frequency and severity over time. It is driven by factors such as monetary inflation, medical costs, safety technology, social influences and distributional changes. It is applied in both the [[Loss Ratio Method|loss ratio method]] and the [[Pure Premium Method|pure premium method]].

Exposure trend arises where the exposure base is inflation-sensitive, such as payroll for workers compensation, which grows with wages. In a loss ratio analysis it is projected as part of the premium. How it enters a pure premium indication depends on how the loss trends were measured.

> [!example]- What is the trended pure premium per $\$100$ of payroll for this accident year? {Example}
> Accident year 2023 has ultimate losses of $\$1{,}000{,}000$ and payroll exposures of $\$50{,}000{,}000$. The average accident date of the experience period is 7/1/2023, and of the forecast period 7/1/2026. Loss trend is 4% a year and exposure trend 2% a year.
>
> > [!answer]-
> > - The trend period is 7/1/2023 to 7/1/2026, which is 3.0 years.
> > - The trended losses are $1{,}000{,}000 \times 1.04^{3} = \$1{,}124{,}864$.
> > - The trended exposures are $50{,}000{,}000 \times 1.02^{3} = \$53{,}060{,}400$ of payroll, or 530,604 units of $\$100$.
> > - The trended pure premium is $1{,}124{,}864/530{,}604 = \$2.12$ per $\$100$ of payroll.

> [!trap] Trending to the effective date
> The trend period ends at the average accident date of the forecast period, not at the date the rates take effect. For annual policies written over one year, stopping at the effective date leaves out a full year of trend.
