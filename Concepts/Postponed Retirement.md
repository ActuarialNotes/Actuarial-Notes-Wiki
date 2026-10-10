---
aliases:
  - Late Retirement Option
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d74bfaacb0658bfbedd1fc41824ef8326c97c254cfd8f3190424f7d7f71c08b8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Postponed Retirement.md
---
**Postponed Retirement** is the start of a pension after the plan's normal retirement age, usually because the member keeps working. A [[Defined Benefit Plan|defined benefit plan]] must decide what the member gets for the payments not made, and it does so in one of three ways: it keeps crediting service, it increases the pension actuarially, or it suspends payment without compensation where the law allows.

> $$B_{NRA+k} = g_k\,B_{NRA}$$

> $$g_k = \frac{\ddot{a}_{NRA}}{{}_kE_{NRA}\;\ddot{a}_{NRA+k}}$$

> $$\text{Gain to sponsor} = B_{NRA}\,\ddot{a}_{NRA} - B_{NRA+k}\;{}_kE_{NRA}\;\ddot{a}_{NRA+k}$$

- **Symbols:** $B_{NRA}$ is the pension the member could have started at normal retirement age $NRA$, $k$ is the number of years of postponement, and $g_k$ is the actuarial increase factor that makes the later pension's EPV at $NRA$ equal to the pension given up. ${}_kE_{NRA}$ is the [[Pure Endowment|pure endowment]] factor and $\ddot{a}$ the [[Life Annuity|life annuity]] factor, following Dickson, Hardy & Waters (chapter 10).
- **Continued accrual:** The member keeps earning pension credits for service after $NRA$, often on a higher final average salary, but the pension is not otherwise increased. For a member with long service this is usually worth less than an actuarial increase, because one more year's accrual is small next to a year of payments forgone.
- **Actuarial increase:** The deferred pension is increased by $g_k$, or by the greater of $g_k$ and the pension with continued accrual. Plans often approximate the increase with a fixed percentage per year, which is a subsidy when it is above the equivalent increase and a saving for the sponsor when it is below.
- **Suspension of benefits:** In the United States a plan may suspend the pension of a member who keeps working past normal retirement age, without an increase, provided it gives the member the required suspension notice. Otherwise the plan must pay an actuarial increase so that the member forfeits nothing.
- **Mandatory commencement:** Tax rules stop the deferral. In the United States, payments from a qualified plan must begin by the required beginning date, which for most members is April 1 after the later of reaching age 73 and retiring. In Canada, a registered pension must begin by the end of the year the member turns 71, and accrual stops then (see [[Canadian Pension Legislation|Canadian pension legislation]]).
- **Phased retirement:** Some plans let members draw part of the pension while working reduced hours, which is a halfway point between postponed and early retirement. It eases the transition and keeps experienced staff, but it complicates the rules on accrual and in-service payments.
- **Sponsor risk:** The late retirement option is an [[Embedded Option|embedded option]] held by members, and those in good health are the most likely to postpone. An increase set above the equivalent factor makes postponement a subsidy, and one set below it, or no increase at all, makes it a forfeiture that can raise legal or fairness concerns and push members to retire as soon as they can.

> [!example]- The Actuarial Increase for Two Years of Postponement {Example}
> A member reaches 65 with a pension of \$30,000 a year, payable annually in advance. She keeps working and starts her pension at 67. Using the Standard Ultimate Life Table at 5%, $\ddot{a}_{65} = 13.5498$, ${}_2E_{65} = 0.89570$ and $\ddot{a}_{67} = 12.9542$. Find the actuarially increased pension at 67.
>
> > [!answer]-
> > The pension at 67 must have the same EPV at 65 as the pension she gave up, counting only the payments she survives to receive.
> > $$
> > \begin{align*}
> > {}_2E_{65}\,\ddot{a}_{67} &= 0.89570 \times 12.9542 \\
> > &= 11.6031 \\
> > g_2 &= \frac{13.5498}{11.6031} \\
> > &= 1.16778 \\
> > B_{67} &= 1.16778 \times 30{,}000 \\
> > &= 35{,}033
> > \end{align*}
> > $$
> > Two years of postponement raise the pension by 16.8%, or about 8.1% a year compounded. The increase is larger than two years of interest alone because it also pays the member for the risk of dying before 67, whose payments the plan keeps.

> [!example]- When the Plan's Increase Is Not Actuarial {Example}
> Using the same member and factors, find the gain or loss to the sponsor, measured at 65, if the plan (a) increases the pension by a simple 6% for each year of postponement, or (b) suspends the pension without increase.
>
> > [!answer]-
> > Under (a) the pension at 67 is $1.12 \times 30{,}000 = 33{,}600$. Compare each pension's EPV at 65 with the \$406,494 value of starting at 65.
> > $$
> > \begin{align*}
> > \text{EPV}_{(a)} &= 33{,}600 \times 11.6031 \\
> > &= 389{,}863 \\
> > \text{Gain}_{(a)} &= 406{,}494 - 389{,}863 \\
> > &= 16{,}631 \\
> > \text{EPV}_{(b)} &= 30{,}000 \times 11.6031 \\
> > &= 348{,}092 \\
> > \text{Gain}_{(b)} &= 406{,}494 - 348{,}092 \\
> > &= 58{,}402
> > \end{align*}
> > $$
> > A 6% simple increase is below the equivalent 8.1% compound, so the sponsor gains about \$16,600 and the member gives up that much. Suspension without increase costs the member about \$58,400, which is why U.S. law allows it only with a suspension notice and why plans that suspend usually keep crediting service. If the plan paid 10% a year instead, the increase would exceed the equivalent one and become a subsidy.

> [!tip]- How it appears on the exam
> - **RET-101 plan features:** Objective 1b asks candidates to explain the relevance and range of early and late retirement options. Expect a written comparison of continued accrual, actuarial increase and suspension, with the member's and the sponsor's view of each.
> - **RET-101 sponsor risk:** Objective 3b lists postponed retirement among the options whose sponsor risk candidates must assess. A typical question gives a plan's late retirement factor and annuity factors, asks for the gain or loss against the equivalent factor, and then asks how to mitigate the risk, for example by moving to actuarially equivalent increases.
> - **Calculation inputs:** The calculations use pure endowments and life annuities from the SULT or a given table, as in AMLCR chapter 10.

> [!warning]- Exam traps
> - **Survival matters:** The increase factor uses ${}_kE_{NRA} = v^k\,{}_kp_{NRA}$. Accumulating the pension with interest alone, $g = (1.05)^2\,\ddot{a}_{65}/\ddot{a}_{67}$, gives about 1.1532 instead of 1.1678, because it ignores the payments released by members who die before starting.
> - **Ratio of annuities:** The increase is not $1/{}_kE_{NRA}$. Dividing by the pure endowment alone, about 1.116 here, forgets that the annuity at 67 is smaller than at 65 because the member is older.
> - **Continued accrual is not an increase:** One more year's accrual of, say, 1.5% of salary is usually far less than the 8% or so an actuarial increase adds. A question that says the plan gives continued accrual only is describing a plan where postponement costs the member value.
> - **Direction of the sponsor's risk:** A late retirement increase below the equivalent one is a gain for the sponsor, not a cost. The cost arises when the increase is too generous or when the healthiest members postpone.
