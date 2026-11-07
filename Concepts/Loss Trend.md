---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:8ac94bada316717cb67dfc9ec0fadb2b6a7d02063332d82273e54f9ccefdd106
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp. 117-118 (PDF pp. 129-130), Tables 6.20-6.21, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "CAS Exam 5 Fall 2016 — sample answers and examiner's report, Q11(b), report p.53, sha256:ca09c50a744a462ecef90f59e436daec7da51ede0493cd5ebadc65f761e826f7 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f16-5.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Trend.md
---

![[Media/Figures/Loss_Trend.svg|340]]

**Loss Trend** is the annual rate of change in loss cost over time, driven by inflation, the legal environment, technology, safety and the mix of business. It is applied to bring historical losses from the cost level of the experience period to the cost level of the **future policy period**. Historical losses are trended by the factor

> $$\text{Trend Factor} = (1 + t)^{n}$$

- $t$ is the selected annual trend and $n$ the **trend period**, measured from the average date of loss in the experience period to the average date of loss in the forecast period.

Trend and [[Loss Development|development]] answer different questions, and both are applied. Development brings immature losses to *their own* ultimate level, and trend restates past losses to the level expected for similar losses in the *future* period. Werner & Modlin call the belief that doing both double-counts inflation the **overlap fallacy**.

> [!example]- Rates will be in effect for annual policies written from $7/1/2025$ to $6/30/2026$. The experience period is Accident Year 2023, and the selected annual trend is 5%. What are the trend period and the trend factor? {Example}
> - Accident Year 2023 runs from $1/1/2023$ to $12/31/2023$. With losses occurring uniformly, its average loss date is $7/1/2023$.
> - Policies are written between $7/1/2025$ and $6/30/2026$, and each provides coverage for a year after it is written.
> - The first policy is exposed from $7/1/2025$ and the last until $6/30/2027$, so the average loss date of the forecast period is the midpoint, $7/1/2026$.
> - The trend period is $7/1/2023$ to $7/1/2026$, which is 3.0 years.
> - The trend factor is $1.05^{3.0} = 1.1576$.

## Frequency and severity trends

[[Frequency]] and [[Severity|severity]] are analyzed separately to understand the drivers of the trend, because they can move in opposite directions. Werner & Modlin's example is a heavily marketed higher deductible, which lowers frequency but is likely to increase severity, a shift that is hard to see in pure premium. The two combine into the pure premium trend:

> $$1 + t_{PP} = (1 + t_{\text{freq}})(1 + t_{\text{sev}})$$

- $t_{PP}$ is the annual [[Pure Premium|pure premium]] trend.
- $t_{\text{freq}}$ and $t_{\text{sev}}$ are the annual frequency and severity trends.

> [!example]- Frequency trend is $-2\%$ a year and severity trend is $+6\%$ a year. What is the pure premium trend factor over a trend period of 3 years? {Example}
> - The annual pure premium trend is $0.98 \times 1.06 - 1 = 3.88\%$.
> - The trend factor is $1.0388^{3} = 1.1210$.

## Selecting a trend

Linear and exponential regressions are the most common measures ([[Linear Trend]], [[Exponential Trend]]). Exponential models may be fit to the whole of the data and to more recent periods. They are supplemented with multi-state, countrywide or industry data and non-insurance indices, and the trend is selected with judgment. [[ASOP 13 - Trending Procedures in Property Casualty Insurance (ASB - 2009)|ASOP 13]] asks the actuary to select data appropriate to the trend being analyzed, to evaluate each procedure's results for reasonableness, and to document the methods, assumptions and data sources.

A benefit-level change is restated in the data, or allowed for in the selection, so that it is not double counted.

> [!example]- Annual severity for a liability line is $\$8{,}000$, $\$8{,}300$, $\$8{,}700$, $\$9{,}400$, $\$10{,}200$ and $\$11{,}100$ for accident years 2019 to 2024. What trend should be selected? {Example}
> - From end point to end point, the 5-year annual trend is $(11{,}100/8{,}000)^{1/5} - 1 = 6.8\%$.
> - The 3-year trend is $(11{,}100/8{,}700)^{1/3} - 1 = 8.5\%$, and the 2-year trend is $(11{,}100/9{,}400)^{1/2} - 1 = 8.7\%$.
> - An exponential fit through 6, 4 and 3 points gives $6.9\%$, $8.5\%$ and $8.7\%$.
> - The series **accelerated** around 2022, so the 6-point figure averages the old trend with the new one and understates the current trend.
> - The 3-point figure is responsive but rests on few observations.
> - A selection around 8.5% follows the recent fits, if external indices corroborate the acceleration.

## Two-step trending

A **two-step** trend is used when the trend in the historical period differs from the trend expected in the forecast period. Losses are first trended at a *current* trend from the experience period's average accident date to that of the latest data point in the trend data. They are then projected at a separately selected trend to the forecast period's average accident date. The factor is

> $$\text{Trend Factor} = (1 + t_1)^{n_1} \times (1 + t_2)^{n_2}$$

- $t_1$ is the current trend and $n_1$ the period from the experience period's average accident date to the latest data point's.
- $t_2$ is the projected trend and $n_2$ the period from the latest data point's average accident date to the forecast period's.

> [!example]- Accident Year 2023's average accident date is $7/1/2023$. The latest point in the trend data is the year ending $12/31/2024$, with average accident date $7/1/2024$, and the forecast period's is $7/1/2026$. The current trend is 8% and the projected trend 5%. What is the trend factor? {Example}
> - The first step is 1 year at 8%, a factor of $1.08$.
> - The second step is 2 years at 5%, a factor of $1.05^2 = 1.1025$.
> - The trend factor is $1.08 \times 1.1025 = 1.1907$.

## Trend in limited and excess layers

Limits **leverage** severity trend. For a positive trend, basic-limits losses trend more slowly than total-limits losses and the excess layer faster, so a severity trend measured on total-limits data must be adjusted before it is applied to basic-limits losses. Alternatively, the trend is measured on basic-limits data ([[Increased Limits|ILFs]]).

The trend in a layer is measured by applying the total-limits trend to each ground-up loss, then capping both the original and the trended losses at the basic limit and comparing the totals. The excess losses are the total-limits losses less the basic-limits losses, before and after trend.

> [!example]- Three claims of $\$50{,}000$, $\$95{,}000$ and $\$200{,}000$ are trended at 10%. The basic limit is $\$100{,}000$. What are the basic-limits and excess trends? {Example}
> - The trended ground-up claims are $\$55{,}000$, $\$104{,}500$ and $\$220{,}000$, a total trend of 10%.
> - Capped at the basic limit, the losses go from $50{,}000 + 95{,}000 + 100{,}000 = \$245{,}000$ to $55{,}000 + 100{,}000 + 100{,}000 = \$255{,}000$.
> - The basic-limits trend is $255{,}000/245{,}000 - 1 = 4.1\%$.
> - The excess losses go from $\$100{,}000$ to $4{,}500 + 120{,}000 = \$124{,}500$.
> - The excess trend is $124{,}500/100{,}000 - 1 = 24.5\%$.

> [!trap] Measuring the trend period to the start of the policy period
> The trend period ends at the average date of loss in the forecast period, not at the date the rates take effect. In the first example, measuring to $7/1/2025$ gives $n = 2.0$ and a factor of $1.1025$, against the correct $1.1576$, understating the projected losses by about 5%.
