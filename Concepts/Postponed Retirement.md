---
aliases:
  - Late Retirement Option
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2cf00de85834ae79bbe31ec5e29747e7e90fe45296ba91f43d24a8ec91a872f2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Postponed Retirement.md
---
**Postponed Retirement** is the start of a pension after the plan's normal retirement age, usually because the member keeps working. A [[Defined Benefit Plan|defined benefit plan]] must decide what the member gets for the payments not made, and it does so in one of three ways:

1. **Continued accrual.** The member keeps earning pension credits for service after normal retirement age, often on a higher final average salary, but the pension is not otherwise increased.
2. **Actuarial increase.** The deferred pension is increased by a factor that makes its value equal to the pension given up, or by the greater of that factor and the pension with continued accrual.
3. **Suspension of benefits.** The pension is suspended without compensation, where the law allows.

For a member with long service, continued accrual is usually worth less than an actuarial increase. One more year's accrual of, say, 1.5% of salary is small next to the 8% or so an actuarial increase adds for a year of payments forgone.

## Actuarial increase

The pension started $k$ years after normal retirement age $NRA$ is

> $$B_{NRA+k} = g_k\,B_{NRA}$$

- $B_{NRA}$ is the pension the member could have started at $NRA$.
- $g_k$ is the actuarial increase factor that makes the later pension's EPV at $NRA$ equal to the pension given up.

Counting only the payments the member survives to receive, the factor is

> $$g_k = \frac{\ddot{a}_{NRA}}{{}_kE_{NRA}\;\ddot{a}_{NRA+k}}$$

- ${}_kE_{NRA}$ is the [[Pure Endowment|pure endowment]] factor, $v^k\,{}_kp_{NRA}$.
- $\ddot{a}$ is the [[Life Annuity|life annuity]] factor, as in Dickson, Hardy & Waters (chapter 10).

The increase is not $1/{}_kE_{NRA}$. Dividing by the pure endowment alone forgets that the annuity at $NRA+k$ is smaller than at $NRA$, because the member is older.

> [!example]- What is this member's actuarially increased pension at 67? {Example}
> A member reaches 65 with a pension of $\$30{,}000$ a year, payable annually in advance. She keeps working and starts her pension at 67. Using the Standard Ultimate Life Table at 5%, $\ddot{a}_{65} = 13.5498$, ${}_2E_{65} = 0.89570$ and $\ddot{a}_{67} = 12.9542$.
>
> > [!answer]-
> > - The value at 65 of 1 a year starting at 67 is ${}_2E_{65}\,\ddot{a}_{67} = 0.89570 \times 12.9542 = 11.6031$.
> > - The increase factor is $g_2 = 13.5498 / 11.6031 = 1.16778$.
> > - The pension at 67 is $B_{67} = 1.16778 \times 30{,}000 = \$35{,}033$.
> > - Two years of postponement raise the pension by 16.8%, or about 8.1% a year compounded. This is more than two years of interest because it also pays the member for the payments the plan keeps from members who die before 67.

> [!trap] Leaving survival out of the increase factor
> Accumulating the pension with interest alone, $g = (1.05)^2\,\ddot{a}_{65}/\ddot{a}_{67}$, gives about 1.1532 in the example instead of 1.1678. It ignores the payments released by members who die before starting, so it understates the equivalent increase.

## Gain to the sponsor from a non-actuarial increase

Plans often approximate the increase with a fixed percentage per year. One above the equivalent increase is a subsidy, and one below it is a saving for the sponsor. Measured at $NRA$, the sponsor's gain is

> $$\text{Gain} = B_{NRA}\,\ddot{a}_{NRA} - B_{NRA+k}\;{}_kE_{NRA}\;\ddot{a}_{NRA+k}$$

- $B_{NRA+k}$ is the pension the plan actually pays from $NRA+k$.

> [!example]- What does the sponsor gain if the plan increases this pension by a simple 6% a year, or suspends it without increase? {Example}
> The member is the one above: a $\$30{,}000$ pension at 65, started at 67, with ${}_2E_{65}\,\ddot{a}_{67} = 11.6031$ and $\ddot{a}_{65} = 13.5498$.
>
> > [!answer]-
> > - Starting at 65, the pension is worth $30{,}000 \times 13.5498 = \$406{,}494$.
> > - With a simple 6% a year, the pension at 67 is $1.12 \times 30{,}000 = \$33{,}600$, worth $33{,}600 \times 11.6031 = \$389{,}863$ at 65.
> > - The sponsor gains $406{,}494 - 389{,}863 = \$16{,}631$, because 6% simple is below the equivalent 8.1% compound.
> > - With suspension, the pension at 67 is still $\$30{,}000$, worth $30{,}000 \times 11.6031 = \$348{,}092$ at 65.
> > - The sponsor gains $406{,}494 - 348{,}092 = \$58{,}402$, which the member forfeits.

A late retirement increase below the equivalent one is a gain for the sponsor, not a cost. In the United States, a plan may suspend the pension of a member who keeps working past normal retirement age, without an increase, provided it gives the member the required suspension notice. Otherwise the plan must pay an actuarial increase so that the member forfeits nothing. Plans that suspend usually keep crediting service.

## Sponsor risk

The late retirement option is an [[Embedded Option|embedded option]] held by members, and those in good health are the most likely to postpone. An increase set above the equivalent factor makes postponement a subsidy. One set below it, or no increase at all, makes it a forfeiture that can raise legal or fairness concerns and push members to retire as soon as they can. Moving to actuarially equivalent increases removes the subsidy.

## Mandatory commencement

Tax rules stop the deferral. In the United States, payments from a qualified plan must begin by the required beginning date, which for most members is April 1 after the later of reaching age 73 and retiring. Under [[Canadian Pension Legislation|Canadian pension legislation]], a registered pension must begin by the end of the year the member turns 71, and accrual stops then.

## Phased retirement

Some plans let members draw part of the pension while working reduced hours, which is a halfway point between postponed and early retirement. It eases the transition and keeps experienced staff, but it complicates the rules on accrual and in-service payments.
