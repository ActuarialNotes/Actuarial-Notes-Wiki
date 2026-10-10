---
aliases:
  - Benefit Eligibility Requirement
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8ce9a173aec27a0eae44a41be31c4c6dbc40d824e22fc63e43c94cfadcd2642f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Vesting.md
---
**Vesting** is the point at which a member's [[Accrued Benefit|accrued benefit]] in a [[Retirement Plan|retirement plan]] becomes the member's own, so that it is kept on leaving the employer rather than forfeited. The plan's vesting schedule sets what share of the employer-provided benefit is kept after each year of service, and its benefit eligibility requirements set the age and service a member needs before early, unreduced or other benefits can be taken.

> $$B^{\text{vest}}(s) = v(s)\,B(s)$$

> $$v_{\text{cliff}}(s) = \begin{cases} 0 & s < 5 \\ 1 & s \geq 5 \end{cases}$$

> $$v_{\text{graded}}(s) = \min\Bigl(1,\ \max\bigl(0,\ 0.2\,(s - 2)\bigr)\Bigr)$$

> $$\text{EPV}_x = B^{\text{vest}}\;{}_{65-x}E_x\;\ddot{a}_{65}$$

- **Symbols:** $s$ is the member's years of vesting service, $B(s)$ is the accrued benefit earned by that service, and $v(s)$ is the vested share. The cliff schedule above vests nothing until five years and everything after, and the graded schedule vests 20% after three years and 20% more each year until it is complete after seven. ${}_{n}E_x$ is the [[Pure Endowment|pure endowment]] factor and $\ddot{a}_{65}$ the [[Life Annuity|life annuity]] factor, following Dickson, Hardy & Waters (chapter 10).
- **What vesting covers:** A member's own contributions, with credited interest, are always fully vested, because they are the member's money. The schedule applies only to the benefit the employer pays for, in a [[Defined Benefit Plan|defined benefit plan]] or in the employer's account in a [[Defined Contribution Plan|defined contribution plan]]. A plan also vests every member fully at normal retirement age and on [[Plan Termination|termination of the plan]].
- **U.S. schedules:** In the United States the law sets the slowest schedule a qualified plan may use. A DB plan may use five-year cliff or three-to-seven-year graded vesting, as above, and employer contributions to a DC plan must vest under a three-year cliff or a two-to-six-year graded schedule. Many sponsors vest faster than the minimum.
- **Canadian vesting and locking-in:** Most Canadian jurisdictions now require immediate vesting, so a terminating member keeps the whole accrued pension (see [[Canadian Pension Legislation|Canadian pension legislation]]). A vested pension is also locked in: its [[Commuted Value|commuted value]] may be left in the plan as a deferred pension or transferred to another locked-in arrangement, but it cannot be taken as cash except in narrow cases such as a small benefit.
- **Benefit eligibility requirements:** These are the conditions a member must meet before a particular benefit can be taken. Typical ones are an earliest retirement age (55 is common), a minimum service for early retirement, and a points rule for an unreduced pension, such as age plus service of at least 85 or age 60 with 30 years. A member who leaves before meeting them keeps only the vested pension, payable from normal retirement age or actuarially reduced if taken early.
- **Vested and non-vested subsidies:** An early-retirement subsidy the member has already earned the right to take is vested. A subsidy that depends on staying until an eligibility condition is met is non-vested, because it is lost on leaving early, and its value jumps on the day the member becomes eligible. This jump is a strong incentive to stay until eligibility and then to leave, which is why McGill treats vesting and eligibility as human-resource tools.
- **Design trade-offs:** Slower vesting lowers the sponsor's cost, because forfeitures by short-service leavers reduce the plan's cost or, in a DC plan, fund other contributions. It also rewards the employees who stay. Faster vesting improves portability and fairness to mobile workers and supports recruitment, and it is the trend in both countries.

> [!example]- Cliff Versus Graded Vesting for a Four-Year Leaver {Example}
> A final-average-salary plan accrues 1.5% of final average salary for each year of service, payable from age 65. A member aged 40 leaves with 4 years of service and a final average salary of \$60,000. Find the deferred pension she keeps, and its EPV at 40, if the plan uses (a) five-year cliff vesting and (b) three-to-seven-year graded vesting. Use the Standard Ultimate Life Table at 5%: ${}_{25}E_{40} = 0.28116$ and $\ddot{a}_{65} = 13.5498$.
>
> > [!answer]-
> > Her accrued benefit is the same under both schedules. Only the vested share differs.
> > $$
> > \begin{align*}
> > B(4) &= 0.015 \times 4 \times 60{,}000 \\
> > &= 3{,}600 \\
> > v_{\text{graded}}(4) &= 0.2\,(4 - 2) \\
> > &= 0.40 \\
> > B^{\text{vest}}_{\text{graded}} &= 0.40 \times 3{,}600 \\
> > &= 1{,}440
> > \end{align*}
> > $$
> > Under cliff vesting she has less than five years, so she keeps nothing from the employer and receives only a refund of any contributions she made. Under graded vesting she keeps a deferred pension of \$1,440 a year from 65.
> > $$
> > \begin{align*}
> > \text{EPV}_{40} &= 1{,}440 \times 0.28116 \times 13.5498 \\
> > &= 5{,}486
> > \end{align*}
> > $$
> > The full accrued benefit would be worth $3{,}600 \times 0.28116 \times 13.5498 = 13{,}715$, so the forfeiture is \$8,229 under the graded schedule and the whole \$13,715 under the cliff. Under the immediate vesting most Canadian plans now require, she would keep all of it.

> [!example]- The Value of Reaching an Unreduced Retirement Point {Example}
> A plan pays an unreduced pension once age plus service reaches 85. A member who leaves before that keeps a vested deferred pension from 65. A member turns 58 with 27 years of service and an accrued pension of \$27,000 a year. Compare the EPV at 58 of retiring now with leaving just short of eligibility, ignoring the small difference in accrual. Use the SULT at 5%: $\ddot{a}_{58} = 15.3901$, ${}_{7}E_{58} = 0.69155$ and $\ddot{a}_{65} = 13.5498$.
>
> > [!answer]-
> > At 58 she has $58 + 27 = 85$ points, so she can take the full pension immediately. Just short of that, she could take only the deferred pension.
> > $$
> > \begin{align*}
> > \text{EPV}_{\text{eligible}} &= 27{,}000 \times 15.3901 \\
> > &= 415{,}533 \\
> > \text{EPV}_{\text{deferred}} &= 27{,}000 \times 0.69155 \times 13.5498 \\
> > &= 253{,}000 \\
> > \text{Subsidy} &= 415{,}533 - 253{,}000 \\
> > &= 162{,}533
> > \end{align*}
> > $$
> > The subsidy is worth 64% of the deferred pension, and it is non-vested until the day she reaches 85 points. A member a few months short has a strong reason to stay, and once eligible she has a strong reason to retire, because each further year of work adds one year's accrual but gives up a year of an already unreduced pension.

> [!tip]- How it appears on the exam
> - **RET-101 plan features:** Objective 1b asks candidates to explain the relevance and range of benefit eligibility requirements, accrual and vesting for a given plan type. Expect a written answer comparing cliff, graded and immediate vesting from the sponsor's and the member's point of view, or matching a schedule to a sponsor's goals, such as retaining mid-career staff or attracting mobile workers.
> - **Subsidy values:** Objective 1b also asks for the value of benefit subsidies, vested or non-vested. A calculation gives a member's age, service and accrued pension, and asks what is kept on termination and what the subsidy is worth once eligibility is reached, using annuity factors and pure endowments as in AMLCR chapter 10.
> - **Design recommendations:** Recommendation questions bring vesting into a wider design, for example asking how faster vesting changes the cost of a DB plan or the forfeitures available in a DC plan.

> [!warning]- Exam traps
> - **Contributions are always vested:** A member who leaves before vesting still gets a refund of her own contributions with interest. Saying that a non-vested member leaves with nothing is wrong whenever the plan is contributory.
> - **Vested benefit is not commuted value:** Vesting fixes the deferred pension, payable from normal retirement age. Its value today is the commuted value, which needs the pure endowment and annuity factors, so do not quote the annual pension as the amount the member takes away.
> - **Eligibility is not vesting:** A member can be fully vested and still not eligible for an early or unreduced pension. The early-retirement subsidy is valued separately and is non-vested until the age and service conditions are met.
> - **Graded schedule arithmetic:** Under three-to-seven-year graded vesting a member with four years is 40% vested, not 80%. Check which year the schedule starts in before multiplying by 20%.
