---
aliases:
  - Projected Unit Credit
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fb8c9f6f9d952899c7d716751215f5470352da8d177b5430569961687de3af93
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Projected Unit Credit Method.md
---
The **Projected Unit Credit Method** (PUC) is a cost method for a [[Defined Benefit Plan|defined benefit]] [[Pension Plan|pension plan]] in which the [[Actuarial Accrued Liability|actuarial accrued liability]] is the expected present value of the [[Accrued Benefit|benefit accrued]] for service to date, with the pensionable salary projected by the [[Salary Scale|salary scale]] to the date of each possible exit. Its [[Normal Cost|normal cost]] is the expected present value of one more year's accrual on the same projected salaries.

For a member aged $x$ with $n$ years of service, in a plan with accrual rate $\alpha$, the actuarial accrued liability is

> $${}_0V = n\,\alpha \sum_{k} \hat{S}_k\,\mathrm{EPV}_k$$

- $k$ runs over the possible exits, each an age and a cause from the [[Service Table|service table]].
- $\hat{S}_k$ is the pensionable salary at exit $k$, projected from today's salary.
- $\mathrm{EPV}_k$ is the EPV at $x$ of 1 a year of pension paid on exit $k$: the probability of that exit, times the discount to it, times the value at exit of the pension after any reduction.

The liability uses the $n$ years already worked, not the service the member would have at retirement. A final-salary benefit for service already worked will be paid on the salary at exit, so PUC holds a liability for the salary growth that the accrued benefit is already exposed to. Whenever salaries rise, this makes it larger than the [[Traditional Unit Credit Method|traditional unit credit]] liability, which uses today's salary. PUC is also the method that IAS 19 prescribes for the defined benefit obligation in an employer's financial statements.

Each exit contributes its own term. Age retirement gives an immediate pension, reduced if it is early. Withdrawal gives a deferred pension from 65, valued with mortality alone after exit. Death in service gives whatever lump sum or survivor's pension the plan pays. Every term uses the same accrued service $n$, but each uses the salary projected to its own exit date.

> [!example]- What is this member's actuarial accrued liability under PUC? {Example}
> A final-salary plan pays 2% of the salary rate at exit for each year of service, as a pension from 65. It allows retirement from 62 with a 5% reduction for each year before 65, and a member who leaves before 62 receives a deferred pension from 65. Death in service pays nothing. A member aged exactly 60 has 25 years of service and a salary rate of $\$90{,}000$, and salary rates rise 3% a year. From the plan's service table, with mid-year exits, $i = 5\%$ and SULT annuities, the EPV at 60 of $\$1$ a year of accrued pension paid on each exit is:
>
> | Exit | Age | EPV per \$1 |
> |---|---|---|
> | Withdrawal | 60.5 | 0.52041 |
> | Withdrawal | 61.5 | 0.41782 |
> | Retirement | 62.5 | 1.98688 |
> | Retirement | 63.5 | 1.52585 |
> | Retirement | 64.5 | 1.82236 |
> | Retirement | 65 | 4.28914 |
>
> > [!answer]-
> > - Her 25 years give a pension of $25(0.02) = 0.5$ times pensionable salary.
> > - Her salary rate at an exit $t$ years from now is $90{,}000(1.03)^t$, so each row's EPV is multiplied by the salary ratio $(1.03)^t$.
> >
> > | Exit at | EPV per \$1 | $(1.03)^t$ | Product |
> > |---|---|---|---|
> > | 60.5 | 0.52041 | 1.01489 | 0.52816 |
> > | 61.5 | 0.41782 | 1.04534 | 0.43676 |
> > | 62.5 | 1.98688 | 1.07670 | 2.13927 |
> > | 63.5 | 1.52585 | 1.10900 | 1.69216 |
> > | 64.5 | 1.82236 | 1.14227 | 2.08162 |
> > | 65 | 4.28914 | 1.15927 | 4.97229 |
> > | Total | 10.56246 | | 11.85026 |
> >
> > - On her current salary the same benefits are worth $45{,}000(10.56246) = \$475{,}310.70$, which is the traditional unit credit liability.
> > - Projection adds 12.2%, the salary growth on which her past service will be paid. The withdrawal terms are small because she is close to the retirement window.
> > - The PUC liability is ${}_0V = 0.5(90{,}000)(11.85026) = \$533{,}261.70$.

## Normal cost

The liability a year from now, ${}_1V$, uses the same projected salaries with one more year of service. The funding equation is

> $${}_0V + C = \mathrm{EPV}(\text{exit benefits in year}) + v\,p_x^{(\tau)}\,{}_1V$$

- $C$ is the normal cost for the year.
- ${}_1V$ is the liability a year later for a member still in service.
- $p_x^{(\tau)}$ is the probability that the member is still in service a year later.

The funding equation leaves exactly one year's accrual as the normal cost, which is

> $$C = \alpha \sum_{k} \tau_k\,\hat{S}_k\,\mathrm{EPV}_k$$

- $\tau_k$ is the service that exit $k$ adds in the coming year: 1 for an exit after the year, and $\frac12$ for a mid-year exit during it.

The normal cost equals ${}_0V/n$ when no exit during the year pays a benefit. It is slightly less when members who leave mid-year with a benefit earn only half a year. As a percentage of salary it rises with age far more slowly than the traditional unit credit normal cost.

> [!example]- What is this member's PUC normal cost for the coming year, and does it satisfy the funding equation? {Example}
> The member is the one in the accrued liability example: aged 60, with 25 years of service, a salary rate of $\$90{,}000$ and ${}_0V = \$533{,}261.70$. A member who withdraws at 60.5 is credited with 25.5 years of service.
>
> > [!answer]-
> > - The withdrawal at 60.5 is the only exit during the year that pays a benefit, so it accrues half a year. Every later exit accrues a full year.
> > - The later exits' products sum to $11.85026 - 0.52816 = 11.32210$.
> > - With $0.02(90{,}000) = 1{,}800$, the normal cost is $C = 1{,}800 \times 11.58618$, where $11.58618 = 11.32210 + \tfrac12(0.52816)$. So $C = \$20{,}855.12$.
> > - The withdrawal benefit in the year is worth $25.5(1{,}800)(0.52816) = \$24{,}242.54$.
> > - A member still in service at 61 has 26 years, so $v\,p_{60}^{(\tau)}\,{}_1V$ is $26(1{,}800)(11.32210) = \$529{,}874.28$.
> > - Both sides of the funding equation are $\$554{,}116.82$: $533{,}261.70 + 20{,}855.12$ on the left and $24{,}242.54 + 529{,}874.28$ on the right.
> > - The normal cost is $\$475.34$ below ${}_0V/25 = \$21{,}330.47$. The difference is the half year of accrual that members leaving mid-year do not earn.

> [!trap] Projecting every exit's salary to 65
> Each exit uses the salary projected to its own date. Projecting every term to 65 overstates the benefits of members who retire early or withdraw. In the example, the withdrawal at 60.5 is multiplied by $(1.03)^{0.5}$, not $(1.03)^5$.
