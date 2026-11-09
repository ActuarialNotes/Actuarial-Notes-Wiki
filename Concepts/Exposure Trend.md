---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:d3aff079c26759dc779c5d0c9d78c4aef739f5947eda7f7b58ac27f4be6cb307
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 4 pp. 61-62 (PDF pp. 73-74); Ch. 6 pp. 119-120 (PDF pp. 131-132); App. D pp. D-1-D-2, D-6 (PDF pp. 394-395, 399), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Exposure Trend.md
---

![[Media/Figures/Exposure_Trend.svg|340]]

**Exposure Trend** is the change over time in the average value of an inflation-sensitive [[Exposure Base|exposure base]], such as payroll, sales or amount of insurance, arising from inflation rather than from a change in the number of risks. Historical exposures are projected to the forecast period by

> $$\text{Trended Exposure} = \text{Historical Exposure} \times (1 + t_E)^{n}$$

- $t_E$ is the annual exposure trend.
- $n$ is the trend period in years, measured from the average date of the historical period to the average date of the forecast period.

The trend period is the same one used for [[Loss Trend|loss trend]]. Exposure trend applies **only** to inflation-sensitive bases. Car-years and house-years do not inflate, while payroll, receipts and amount of insurance do. The trend can be estimated from the insurer's own data, such as workers compensation payroll, or from industry or government indices, such as an average wage index.

> [!example]- A workers compensation book's Accident Year 2023 payroll is $\$50{,}000{,}000$. Wages rise 3% a year, and the trend period is 2.5 years. What is the trended payroll? {Example}
> - The exposure trend factor is $1.03^{2.5} = 1.0767$.
> - The trended payroll is $50{,}000{,}000 \times 1.03^{2.5} = \$53{,}834{,}795$.

## Exposure trend in the pure premium method

In the [[Pure Premium Method|pure premium method]] the exposures are the denominator, so exposure trend **offsets** loss trend. The pure premium moves at the net trend

> $$1 + t_{\text{net}} = \frac{1 + t_L}{1 + t_E}$$

- $t_L$ is the annual loss trend.

> [!example]- The same book has Accident Year 2023 losses of $\$1{,}600{,}000$ and a loss trend of 6% a year. What is the projected pure premium per $\$100$ of payroll? {Example}
> - The trended losses are $1{,}600{,}000 \times 1.06^{2.5} = \$1{,}850{,}907$.
> - The trended payroll in units of $\$100$ is $53{,}834{,}795/100 = 538{,}348$.
> - The projected pure premium is $1{,}850{,}907/538{,}348 = \$3.438$ per $\$100$.
> - Against the historical $1{,}600{,}000/500{,}000 = \$3.200$, the increase is $(1.06/1.03)^{2.5} = 1.0744$, about 2.9% a year.

## Exposure trend in the loss ratio method

Under the [[Loss Ratio Method|loss ratio method]] the effect enters through [[Premium Trend|premium trend]] instead. The premium at current rates grows with the exposure base even with no rate change. The two methods handle the same inflation in different places, and it is not applied twice.

For workers compensation, Werner & Modlin bring historical premium at current rate level to the current payroll level with the cumulative product of the annual payroll level changes after each year. It is then multiplied by one plus the wage increase expected up to the period the rates will be in effect.

> [!example]- Wages have risen 2% in 2023 and 3% in 2024, and a further 2.5% is expected up to the period the new rates will be in effect. What composite factor brings Accident Year 2022 premium to the projected payroll level? {Example}
> - The changes after 2022 bring it to the current payroll level, $1.02 \times 1.03 = 1.0506$.
> - The expected change projects it forward, so the composite factor is $1.0506 \times 1.025 = 1.0769$.
> - The 2024 premium's factor uses no historical change, only the projection, $1.025$.

> [!trap] Trending the losses but not an inflating exposure base
> The rate is charged per $\$100$ of payroll, so premium rises with wages at an unchanged rate. Trending the losses but leaving payroll at $\$50{,}000{,}000$ gives a pure premium of $\$3.702$, against the correct $\$3.438$, and indicates a rate 7.7% higher than needed.
