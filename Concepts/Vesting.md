---
aliases:
  - Benefit Eligibility Requirement
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:80c93b40913f13d6370e16475aa9cc1a9e0e11361ebabb2b2bb3e81082fb2384
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Vesting.md
---
**Vesting** is the point at which a member's [[Accrued Benefit|accrued benefit]] in a [[Retirement Plan|retirement plan]] becomes the member's own, so that it is kept on leaving the employer rather than forfeited. The plan's vesting schedule sets the vested share $v(s)$ of the employer-provided benefit kept after $s$ years of vesting service, so the vested benefit is

> $$B^{\text{vest}}(s) = v(s)\,B(s)$$

- $B(s)$ is the accrued benefit earned by that service.

A member's own contributions, with credited interest, are always fully vested, because they are the member's money. The schedule applies only to the benefit the employer pays for, in a [[Defined Benefit Plan|defined benefit plan]] or in the employer's account in a [[Defined Contribution Plan|defined contribution plan]]. A plan also vests every member fully at normal retirement age and on [[Plan Termination|termination of the plan]].

The expected present value at age $x$ of a vested deferred pension payable from 65 is

> $$\text{EPV}_x = B^{\text{vest}}\;{}_{65-x}E_x\;\ddot{a}_{65}$$

- ${}_{65-x}E_x$ is the [[Pure Endowment|pure endowment]] factor from $x$ to 65.
- $\ddot{a}_{65}$ is the [[Life Annuity|life annuity]] factor at 65.

Vesting fixes the deferred pension, payable from normal retirement age. Its value today, the [[Commuted Value|commuted value]], needs the pure endowment and annuity factors.

## Cliff and graded vesting

A five-year cliff schedule vests nothing until five years and everything after:

> $$v_{\text{cliff}}(s) = \begin{cases} 0 & s < 5 \\ 1 & s \geq 5 \end{cases}$$

A three-to-seven-year graded schedule vests 20% after three years and 20% more each year until it is complete after seven:

> $$v_{\text{graded}}(s) = \min\Bigl(1,\ \max\bigl(0,\ 0.2\,(s - 2)\bigr)\Bigr)$$

In the United States the law sets the slowest schedule a qualified plan may use. A DB plan may use five-year cliff or three-to-seven-year graded vesting. Employer contributions to a DC plan must vest under a three-year cliff or a two-to-six-year graded schedule. Many sponsors vest faster than the minimum.

> [!example]- What deferred pension does this four-year leaver keep, and what is it worth, under each schedule? {Example}
> A final-average-salary plan accrues 1.5% of final average salary for each year of service, payable from age 65. A member aged 40 leaves with 4 years of service and a final average salary of $\$60{,}000$. The plan uses either (a) five-year cliff or (b) three-to-seven-year graded vesting. Use the Standard Ultimate Life Table at 5%: ${}_{25}E_{40} = 0.28116$ and $\ddot{a}_{65} = 13.5498$.
>
> > [!answer]-
> > - Her accrued benefit is the same under both schedules: $B(4) = 0.015 \times 4 \times 60{,}000 = \$3{,}600$.
> > - Under cliff vesting she has less than five years, so she keeps nothing from the employer and receives only a refund of any contributions she made.
> > - Under graded vesting $v(4) = 0.2\,(4 - 2) = 0.40$, so she keeps $0.40 \times 3{,}600 = \$1{,}440$ a year from 65.
> > - Its EPV at 40 is $1{,}440 \times 0.28116 \times 13.5498 = \$5{,}486$.
> > - The full accrued benefit would be worth $3{,}600 \times 0.28116 \times 13.5498 = \$13{,}715$.
> > - The forfeiture is $\$8{,}229$ under the graded schedule and the whole $\$13{,}715$ under the cliff.

## Canadian vesting and locking-in

Most Canadian jurisdictions' [[Canadian Pension Legislation|pension legislation]] now requires immediate vesting, so a terminating member keeps the whole accrued pension. A vested pension is also locked in. Its commuted value may be left in the plan as a deferred pension or transferred to another locked-in arrangement, but it cannot be taken as cash except in narrow cases such as a small benefit.

## Benefit eligibility requirements

Benefit eligibility requirements are the conditions a member must meet before a particular benefit can be taken. Typical ones are:

1. an earliest retirement age, 55 being common;
2. a minimum service for early retirement;
3. a points rule for an unreduced pension, such as age plus service of at least 85, or age 60 with 30 years.

A member who leaves before meeting them keeps only the vested pension, payable from normal retirement age or actuarially reduced if taken early. A member can be fully vested and still not eligible for an early or unreduced pension.

An early-retirement subsidy the member has already earned the right to take is vested. A subsidy that depends on staying until an eligibility condition is met is non-vested, because it is lost on leaving early, and its value jumps on the day the member becomes eligible. This jump is a strong incentive to stay until eligibility and then to leave, which is why McGill treats vesting and eligibility as human-resource tools.

> [!example]- What is this member's unreduced retirement subsidy worth on the day she reaches 85 points? {Example}
> A plan pays an unreduced pension once age plus service reaches 85. A member who leaves before that keeps a vested deferred pension from 65. A member turns 58 with 27 years of service and an accrued pension of $\$27{,}000$ a year. Ignore the small difference in accrual. Use the SULT at 5%: $\ddot{a}_{58} = 15.3901$, ${}_{7}E_{58} = 0.69155$ and $\ddot{a}_{65} = 13.5498$.
>
> > [!answer]-
> > - At 58 she has $58 + 27 = 85$ points, so she can take the full pension immediately.
> > - The EPV of retiring now is $27{,}000 \times 15.3901 = \$415{,}533$.
> > - Just short of eligibility she could take only the deferred pension, worth $27{,}000 \times 0.69155 \times 13.5498 = \$253{,}000$.
> > - The subsidy is $415{,}533 - 253{,}000 = \$162{,}533$, or 64% of the deferred pension.
> > - It is non-vested until the day she reaches 85 points.

## Design trade-offs

Slower vesting lowers the sponsor's cost, because forfeitures by short-service leavers reduce the plan's cost or, in a DC plan, fund other contributions. It also rewards the employees who stay. Faster vesting improves portability and fairness to mobile workers and supports recruitment, and it is the trend in both countries.

> [!trap] Miscounting the graded schedule
> Under three-to-seven-year graded vesting a member with four years is 40% vested, not 80%. The 20% steps start after the second year, so the vested share is $0.2\,(s - 2)$.
