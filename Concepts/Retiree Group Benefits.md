---
aliases:
  - Retiree Group Benefit
  - Retiree Health
  - Post-Retirement
  - Post-Employment Benefit
  - Employer Liability
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1941f1eeb54dfa35831c58122bc39254d1e4552c60e3ec5e34cab1a433cad644
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Retiree Group Benefits.md
---
A **Retiree Group Benefit** is a health, dental or life insurance benefit an employer continues to provide to former employees after they retire, and to their spouses, on terms set by the plan's design. It is a non-pension post-retirement benefit, whose cost is a liability earned over the employees' working lives, measured by an actuarial valuation and reported in the employer's financial statements under IAS 19 or U.S. GAAP.

The same accounting covers post-employment benefits paid to former or inactive employees before retirement, such as coverage continued during long-term disability.

For an employee aged $x$, the present value of all expected benefits, the expected postretirement benefit obligation (EPBO), is

> $$\text{EPBO} = \sum_{t \geq 0} v^{t}\,{}_tp_x\,B_{x+t}$$

- $v$ is the discount factor at the discount rate $d$.
- ${}_tp_x$ is the survival probability. It includes mortality and, for an active employee, the chance of reaching retirement eligibility.
- $B_{x+t}$ is the employer's expected net cost at age $x+t$: per capita claims cost by age, grown by health care [[Trend|trend]], less retiree contributions and government plan payments.

## Attribution, service cost and interest cost

U.S. GAAP (ASC 715-60) calls the part of the EPBO attributed to service already rendered the accumulated postretirement benefit obligation (APBO). The APBO is

> $$\text{APBO} = \text{EPBO} \times \frac{s}{S}$$

- $S$ is the attribution period, from the start of service that counts toward the benefit to the full eligibility date.
- $s$ is the part of the attribution period already served.

Only the APBO is the employer's liability for an active employee. IAS 19 calls the attributed part the defined benefit obligation and measures it with the [[Projected Unit Credit Method|projected unit credit method]]. For a [[Retiree|retiree]], or an employee past full eligibility, the whole EPBO is attributed.

The service cost for the year is

> $$\text{SC} = \frac{\text{EPBO}}{S}$$

With service cost taken at the start of the year, the interest cost for the year is

> $$\text{IC} = d\,(\text{APBO} + \text{SC})$$

> [!example]- What are this employee's APBO, service cost and interest cost for the coming year? {Example}
> An active employee aged 50 was hired at 40 and becomes fully eligible for retiree health at 55. The EPBO for the employee is $\$60{,}000$ and the discount rate is 5%. Attribution runs from hire to full eligibility.
>
> > [!answer]-
> > - The attribution period is 15 years, of which 10 have been served.
> > - $\text{APBO} = 60{,}000 \times 10/15 = 40{,}000$.
> > - $\text{SC} = 60{,}000/15 = 4{,}000$.
> > - $\text{IC} = 0.05 \times (40{,}000 + 4{,}000) = 2{,}200$, so the year's cost is $\$6{,}200$.
> > - The expected APBO a year from now is $40{,}000 + 4{,}000 + 2{,}200 = 46{,}200$.
> > - As a check, with no decrements assumed before 51, the EPBO grows with interest to $63{,}000$, and $63{,}000 \times 11/15 = 46{,}200$.
> > - Once the employee reaches 55, service cost stops, even though the benefit is not paid until retirement.

## Expense

The annual cost is service cost plus interest cost, less the return on any plan assets, plus the effects of plan amendments and gains and losses. Under IAS 19, actuarial gains and losses on post-employment benefits are remeasurements recognized in other comprehensive income. U.S. GAAP first records them in accumulated other comprehensive income and usually amortizes them into income over time. Long-term disability benefits are other long-term employee benefits under IAS 19, and their remeasurements go through profit or loss.

## Assumptions

A retiree health valuation needs:

1. Per capita claims costs by age.
2. A trend rate that grades down from a near-term level to an ultimate rate.
3. A [[Discount Rate|discount rate]] based on high-quality corporate bond yields.
4. [[Mortality]], retirement and termination rates.
5. The share of retirees who elect coverage for themselves and a spouse.

Per capita costs rise both with age and with trend, and a projection needs both. Applying trend to a single average cost understates the obligation for a workforce that is getting older.

## Design elements

Eligibility rules, such as a minimum age and years of service, decide who qualifies. Cost sharing through retiree contributions, deductibles and caps on the employer's cost decides how much of future trend the employer bears. A defined-dollar design pays a fixed amount, often per year of service. An access-only plan lets retirees join the group plan at their own cost.

## Integration with government plans

In the U.S., the plan coordinates with [[Medicare]] at 65, by standard coordination of benefits, carve-out or exclusion. The three differ in how much of Medicare's payment reduces the plan's:

- Under standard coordination of benefits, the plan pays the lesser of its normal benefit and the charges Medicare leaves unpaid.
- Under carve-out, the plan pays its normal benefit less Medicare's payment, but not less than zero.
- Under exclusion, the plan applies its benefit formula to the charges Medicare leaves unpaid.

In Canada, the plan sits on top of provincial hospital and physician coverage and coordinates drug coverage with provincial plans for seniors.

> [!example]- What does this retiree plan pay under each of the three ways to coordinate with Medicare? {Example}
> A retiree plan has a $\$500$ deductible and pays 80% of the rest. A Medicare-eligible retiree incurs $\$10{,}000$ of covered charges, and Medicare pays $\$8{,}000$.
>
> > [!answer]-
> > - The plan's normal benefit, as if Medicare did not exist, is $0.80 \times (10{,}000 - 500) = 7{,}600$.
> > - Under standard coordination, the plan pays $\min(7{,}600,\ 10{,}000 - 8{,}000) = 2{,}000$, and the retiree pays nothing.
> > - Under carve-out, the plan pays $\max(7{,}600 - 8{,}000,\ 0) = 0$, and the retiree pays $\$2{,}000$.
> > - Under exclusion, the plan pays $0.80 \times (2{,}000 - 500) = 1{,}200$, and the retiree pays $\$800$.
> > - Carve-out leaves the retiree paying up to the cost sharing an active member would pay, here $\$2{,}000$ against an active member's $\$2{,}400$. This is why employers that want to control cost choose carve-out or exclusion.

## Risks and current issues

An access-only plan still costs the employer when retirees are pooled with actives at one blended premium, because older retirees cost more than the premium charged. This implicit subsidy is a liability even when retirees pay the full blended premium. The [[Plan Sponsor|sponsor]] bears trend, longevity, interest rate and legal risk, since reducing promised benefits may be limited by plan wording or collective agreements.

Rising health costs and balance-sheet liabilities have led many employers to close retiree plans to new hires, cap their cost, or move retirees to defined-dollar accounts and individual coverage. These changes shift trend and longevity risk to retirees, who then rely more on government programs and their own savings.

> [!trap] Attributing to retirement instead of full eligibility
> Service cost stops when the employee first has all the service needed for the full benefit, not at retirement. Attributing to the expected retirement age understates the obligation of employees who work past eligibility.
