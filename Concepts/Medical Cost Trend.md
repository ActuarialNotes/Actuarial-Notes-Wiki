---
aliases:
  - Medical Cost Trend Experience
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:220132991206c6140b614e75b4417500168ff67f356035a56d574c0d0d4e3334
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Medical Cost Trend.md
---

**Medical Cost Trend** is the annual rate at which the claim cost of a health plan changes for a fixed population and a fixed benefit design, measured per member per month (PMPM). The pricing actuary measures it from the plan's own claim experience and projects it forward to bring an experience period's claim cost to the level of the rating period in a [[Manual Rate|manual rate]] or an [[Experience Rating|experience rate]].

Trend is the product of changes in [[Utilization|utilization]], unit cost and the intensity or mix of services. The allowed-cost trend $T$ is

> $$1 + T = (1 + u)(1 + c)(1 + s)$$

- $u$ is the change in services per 1,000 members per year.
- $c$ is the change in the average price paid per service (unit cost).
- $s$ is the change in intensity and mix, such as a shift from generic to brand drugs or from an office visit to an outpatient procedure.

> [!example]- How does this plan's 7% PMPM trend split into utilization and unit cost? {Example}
> A group plan's allowed PMPM rose from \$500.00 to \$535.00 between two consecutive 12-month periods, an increase of 7%. Over the same periods, utilization rose from 16,000 to 16,400 services per 1,000 members per year. The population and the benefits did not change.
>
> > [!answer]-
> > - PMPM is utilization times unit cost divided by 12,000, so the unit cost is the PMPM times 12,000 divided by utilization.
> > - The unit cost was $500.00 \times 12{,}000/16{,}000 = \$375.00$ in the first period and $535.00 \times 12{,}000/16{,}400 = \$391.46$ in the second.
> > - Utilization grew $16{,}400/16{,}000 - 1 = 2.5\%$.
> > - Unit cost grew $1.07/1.025 - 1 = 4.39\%$, the same as $391.46/375.00 - 1$.
> > - Any change in intensity or mix is inside the 4.39%, because the unit cost is an average over all services.

## Drivers of medical trend

Provider price increases, renegotiated network contracts and new fee schedules raise the unit cost. Changes in the discount the plan gets from its network, or in where members go for care, also change it.

New technology, new drugs, an aging membership and changes in medical practice raise the number and intensity of services. Care management and plan design that steers members to cheaper settings can lower them.

When a public payer such as [[Medicare]] or [[Medicaid]] pays providers less than cost, providers may raise the prices they charge commercial plans to make up the shortfall. This is cost shifting, and it makes the commercial unit cost trend exceed the providers' own cost inflation.

## Leveraging

A fixed-dollar deductible, copay or out-of-pocket maximum does not grow with costs, so the member pays a falling share of a rising bill. The plan's paid trend is therefore higher than the allowed trend. This is why trend is studied on allowed claims and the paid trend is derived from it. A trend measured on paid claims includes the leveraging of the cost sharing in force at the time, so applying it to a plan with a different deductible double counts or misses the leveraging.

> [!example]- What are this plan's paid trend and member cost-sharing trend? {Example}
> A small plan has three members whose allowed claims this year are \$400, \$2,000 and \$9,000. The plan has a \$1,000 deductible, then pays 80% of allowed charges. Allowed costs rise 7% next year for every member, and the deductible stays at \$1,000.
>
> > [!answer]-
> > - The plan pays 80% of each member's allowed claims above \$1,000.
> > - This year it pays $0 + 0.8 \times 1{,}000 + 0.8 \times 8{,}000 = \$7{,}200$.
> > - Next year's allowed claims are \$428, \$2,140 and \$9,630, so it pays $0 + 0.8 \times 1{,}140 + 0.8 \times 8{,}630 = \$7{,}816$.
> > - The paid trend is $7{,}816/7{,}200 - 1 = 8.56\%$.
> > - Total allowed claims grow from \$11,400 to \$12,198, so members pay \$4,200 this year and \$4,382 next year, a cost-sharing trend of 4.33%.
> > - Indexing the deductible to \$1,070 would remove the leveraging and bring the paid trend back to 7%.

## Measuring trend from experience

Before a historical trend is read, the claims are completed for claims incurred but not yet paid, adjusted for benefit changes, and adjusted for changes in the population's age, sex, area and industry. A deductible increase in the middle of the experience lowers paid claims and looks like a low trend, so the history is normalized to one benefit design before trend is measured. The most recent months are not fully paid, and measuring trend before completing them makes the latest trend look too low. Large claims are often capped.

A 12-month moving window removes [[Seasonality|seasonality]], because deductibles reset each January and claims rise through the year. The rolling 12-month trend ending in month $t$ is

> $$T_{12}(t) = \frac{\overline{\text{PMPM}}_{\,t-11:\,t}}{\overline{\text{PMPM}}_{\,t-23:\,t-12}} - 1$$

- Each $\overline{\text{PMPM}}$ is a member-month weighted average PMPM over the twelve months in its subscript.

## Projecting to the rating period

The selected trend is a judgment that blends the measured trend with published surveys, provider contract terms, known price changes and expected new drugs. The projected claim cost is

> $$\text{PMPM}_{\text{proj}} = \text{PMPM}_{\text{exp}} \times (1 + T)^{m/12}$$

- $\text{PMPM}_{\text{exp}}$ is the experience period's normalized claim cost.
- $m$ is the number of months from the midpoint of the experience period to the midpoint of the rating period.

The trend is applied from midpoint to midpoint, as in [[Trend|property-casualty trending]] and [[Loss Trend|loss trend]]. Using the end of the experience period, or the start of the rating period, understates or overstates the projection by six months or more.

> [!example]- What is this plan's projected allowed PMPM? {Example}
> A plan's experience period runs from January 1 to December 31, 2025, and its normalized allowed PMPM is \$500. The rates will apply from January 1 to December 31, 2027, and the selected allowed trend is 7% a year.
>
> > [!answer]-
> > - The midpoints are July 1, 2025 and July 1, 2027, so the trend period is 24 months.
> > - The projected allowed PMPM is $500 \times 1.07^{24/12} = 500 \times 1.1449 = \$572.45$.
> > - The paid PMPM is then found by applying the rating period's plan design to the projected allowed cost, which picks up the leveraging of any fixed cost sharing.

> [!trap] Adding the trend components
> Trend components combine by multiplication. Adding a 2.5% utilization trend to a 4.39% unit cost trend gives 6.89%, but $1.025 \times 1.0439 = 1.07$, so the total is 7.00%. The gap grows as the components get larger.
