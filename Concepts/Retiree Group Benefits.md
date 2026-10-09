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
  content_hash: sha256:1f073620fde0bbb6eb89e5dee9b167e06b8337ef2fcd6ca9b40a05360841238c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Retiree Group Benefits.md
---
**Retiree Group Benefits** are the health, dental and life insurance benefits an employer continues to provide to former employees after they retire, and to their spouses, on terms set by the plan's design. They are a non-pension post-retirement benefit: the employer's cost is a liability earned over the employees' working lives, measured by an actuarial valuation and reported in the employer's financial statements under IAS 19 or U.S. GAAP. The same accounting covers post-employment benefits paid to former or inactive employees before retirement, such as coverage continued during long-term disability.

> $$\text{EPBO} = \sum_{t \geq 0} v^{t}\,{}_tp_x\,B_{x+t}$$

> $$\text{APBO} = \text{EPBO} \times \frac{s}{S}$$

> $$\text{SC} = \frac{\text{EPBO}}{S}$$

> $$\text{IC} = d\,(\text{APBO} + \text{SC})$$

- **Symbols:** $B_{x+t}$ is the employer's expected net cost at age $x+t$: per capita claims cost by age, grown by health care [[Trend|trend]], less retiree contributions and government plan payments. ${}_tp_x$ includes mortality and, for an active employee, the chance of reaching retirement eligibility, and $v$ discounts at the rate $d$. $S$ is the attribution period, from the start of service that counts toward the benefit to the full eligibility date, and $s$ is the part of it already served. $\text{SC}$ is the service cost and $\text{IC}$ the interest cost for the year, with service cost taken at the start of the year.
- **Obligations:** U.S. GAAP (ASC 715-60) calls the present value of all expected benefits the expected postretirement benefit obligation (EPBO), and the part attributed to service already rendered the accumulated postretirement benefit obligation (APBO). IAS 19 calls the attributed part the defined benefit obligation and measures it with the [[Projected Unit Credit Method|projected unit credit method]]. For a retiree, or an employee past full eligibility, the whole EPBO is attributed ([[Retiree]]).
- **Expense:** The annual cost is service cost plus interest cost, less the return on any plan assets, plus the effects of plan amendments and gains and losses. Under IAS 19, actuarial gains and losses on post-employment benefits are remeasurements recognized in other comprehensive income. U.S. GAAP first records them in accumulated other comprehensive income and usually amortizes them into income over time. Long-term disability benefits are other long-term employee benefits under IAS 19, and their remeasurements go through profit or loss.
- **Assumptions:** The valuation needs per capita claims costs by age, a trend rate that grades down from a near-term level to an ultimate rate, a [[Discount Rate|discount rate]] based on high-quality corporate bond yields, [[Mortality|mortality]], retirement and termination rates, and the share of retirees who elect coverage for themselves and a spouse.
- **Design elements:** Eligibility rules, such as a minimum age and years of service, decide who qualifies. Cost sharing through retiree contributions, deductibles and caps on the employer's cost decides how much of future trend the employer bears. A defined-dollar design pays a fixed amount, often per year of service, while an access-only plan lets retirees join the group plan at their own cost.
- **Integration with government plans:** In the U.S., the plan coordinates with [[Medicare]] at 65, by standard coordination of benefits, carve-out or exclusion, which differ in how much of Medicare's payment reduces the plan's. In Canada, the plan sits on top of provincial hospital and physician coverage and coordinates drug coverage with provincial plans for seniors.
- **Hidden costs and risks:** An access-only plan still costs the employer when retirees are pooled with actives at one blended premium, because older retirees cost more than the premium charged. The [[Plan Sponsor|sponsor]] bears trend, longevity, interest rate and legal risk, since reducing promised benefits may be limited by plan wording or collective agreements.
- **Current issues:** Rising health costs and balance-sheet liabilities have led many employers to close retiree plans to new hires, cap their cost, or move retirees to defined-dollar accounts and individual coverage. These changes shift trend and longevity risk to retirees, who then rely more on government programs and their own savings.

> [!example]- Three Ways to Coordinate With Medicare {Example}
> A retiree plan has a \$500 deductible and pays 80% of the rest. A Medicare-eligible retiree incurs \$10,000 of covered charges, and Medicare pays \$8,000. Find the plan's payment under standard coordination of benefits, carve-out and exclusion.
>
> > [!answer]-
> > The plan's normal benefit, as if Medicare did not exist, is $0.80(10{,}000 - 500) = 7{,}600$.
> > $$
> > \begin{align*}
> > \text{COB} &= \min(7{,}600,\ 10{,}000 - 8{,}000) \\
> > &= 2{,}000 \\
> > \text{Carve-out} &= \max(7{,}600 - 8{,}000,\ 0) \\
> > &= 0 \\
> > \text{Exclusion} &= 0.80(2{,}000 - 500) \\
> > &= 1{,}200
> > \end{align*}
> > $$
> > Under standard coordination the retiree pays nothing, under carve-out the retiree pays \$2,000, and under exclusion \$800. Carve-out leaves the retiree paying up to the cost sharing an active member would pay, here \$2,000 against an active member's \$2,400, which is why employers that want to control cost choose it or exclusion.

> [!example]- Attributing a Retiree Health Benefit {Example}
> An active employee aged 50 was hired at 40 and becomes fully eligible for retiree health at 55. The EPBO for the employee is \$60,000 and the discount rate is 5%. Attribution runs from hire to full eligibility. Find the APBO, the service cost and the interest cost for the coming year, and the expected APBO a year from now.
>
> > [!answer]-
> > The attribution period is 15 years, of which 10 have been served.
> > $$
> > \begin{align*}
> > \text{APBO} &= 60{,}000 \times \tfrac{10}{15} \\
> > &= 40{,}000 \\
> > \text{SC} &= 60{,}000 / 15 \\
> > &= 4{,}000 \\
> > \text{IC} &= 0.05\,(40{,}000 + 4{,}000) \\
> > &= 2{,}200
> > \end{align*}
> > $$
> > The year's cost is \$6,200, and the expected APBO a year from now is $40{,}000 + 4{,}000 + 2{,}200 = 46{,}200$. As a check, with no decrements assumed before 51, the EPBO grows with interest to \$63,000, and $63{,}000 \times 11/15 = 46{,}200$. Once the employee reaches 55, service cost stops even though the benefit is not paid until retirement.

> [!tip]- How it appears on the exam
> - **CP-321 valuation:** Questions ask candidates to set demographic, economic and benefit assumptions for a retiree health valuation and apply them, to determine the employer's liabilities, service cost and expense for post-retirement and post-employment benefits, and to prepare the disclosures for financial reporting.
> - **CP-321 design:** Written questions ask why employers offer retiree benefits, what issues governments, employers and employees face, how retiree health and life designs manage the risks retirees face, and which design elements to recommend to a plan sponsor in a given situation.
> - **CP-321 practice:** Questions apply actuarial standards and best practices to post-retirement and post-employment benefit plans, such as how trend and the discount rate are set.

> [!warning]- Exam traps
> - **Attribution ends at full eligibility:** Service cost stops when the employee first has all the service needed for the full benefit, not at retirement. Attributing to the expected retirement age understates the obligation of employees who work past eligibility.
> - **EPBO versus APBO:** The EPBO is the whole expected cost, and only the APBO, the attributed part, is the employer's liability for an active employee. Reporting the EPBO for actives overstates the liability.
> - **Aging and trend together:** Per capita costs rise both with age and with trend, and a projection needs both. Applying trend to a single average cost understates the obligation for a workforce that is getting older.
> - **Implicit subsidy:** A plan where retirees pay the full blended premium can still have a liability, because retirees cost more than the premium charged to them. Valuing it as zero misses the subsidy hidden in the active employees' rates.
