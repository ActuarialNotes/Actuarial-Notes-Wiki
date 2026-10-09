---
aliases:
  - Projected Unit Credit
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7f3a45df2c1564280e224832f078a50520d6613452b4e0a45c781386b88fac4e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Projected Unit Credit Method.md
---
The **Projected Unit Credit Method** (PUC) is a cost method for a [[Defined Benefit Plan|defined benefit]] [[Pension Plan|pension plan]]. Its [[Actuarial Accrued Liability|actuarial accrued liability]] is the expected present value of the [[Accrued Benefit|benefit accrued]] for service to date, with the pensionable salary projected by the [[Salary Scale|salary scale]] to the date of each possible exit. Its [[Normal Cost|normal cost]] is the expected present value of one more year's accrual on the same projected salaries.

> $${}_0V = n\,\alpha \sum_{k} \hat{S}_k\,\mathrm{EPV}_k$$

> $${}_0V + C = \mathrm{EPV}(\text{exit benefits in year}) + v\,p_x^{(\tau)}\,{}_1V$$

> $$C = \alpha \sum_{k} \tau_k\,\hat{S}_k\,\mathrm{EPV}_k$$

- **Symbols:** Following Dickson, Hardy & Waters (chapter 10), the member is aged $x$ with $n$ years of service, $\alpha$ is the accrual rate, and $k$ runs over the possible exits, each an age and a cause from the [[Service Table|service table]]. $\hat{S}_k$ is the pensionable salary at exit $k$, projected from today's salary, and $\mathrm{EPV}_k$ is the EPV at $x$ of 1 a year of pension paid on exit $k$: the probability of that exit, times the discount to it, times the value at exit of the pension after any reduction. ${}_1V$ is the liability a year later for a member still in service, and $\tau_k$ is the service that exit $k$ adds in the coming year, which is 1 for an exit after the year and $\frac12$ for a mid-year exit during it.
- **Why project:** A final-salary benefit for service already worked will be paid on the salary at exit, not on today's salary. PUC therefore holds a liability for the salary growth that the accrued benefit is already exposed to, which makes it larger than the [[Traditional Unit Credit Method|traditional unit credit]] liability whenever salaries rise. It is also the method that IAS 19 prescribes for the defined benefit obligation in an employer's financial statements.
- **Several exits:** Each exit contributes its own term. Age retirement gives an immediate pension, reduced if it is early; withdrawal gives a deferred pension from 65, valued with mortality alone after exit; and death in service gives whatever lump sum or survivor's pension the plan pays. Every term uses the same accrued service $n$, but each uses the salary projected to its own exit date.
- **One year's accrual:** Because ${}_1V$ uses the same projected salaries with one more year of service, the funding equation leaves exactly one year's accrual as the normal cost. It equals ${}_0V/n$ when no exit during the year pays a benefit, and it is slightly less when members who leave mid-year earn only half a year. As a percentage of salary it rises with age far more slowly than the traditional unit credit normal cost.

> [!example]- Accrued Liability with Several Exit Modes {Example}
> A final-salary plan pays 2% of the salary rate at exit for each year of service, as a pension from 65. It allows retirement from 62 with a 5% reduction for each year before 65, and a member who leaves before 62 receives a deferred pension from 65. Death in service pays nothing. A member aged exactly 60 has 25 years of service and a salary rate of \$90,000, and salary rates rise 3% a year. From the plan's service table, with mid-year exits, $i = 5\%$ and SULT annuities, the EPV at 60 of \$1 a year of accrued pension paid on each exit is below. Find the actuarial accrued liability under PUC.
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
> > Her 25 years give a pension of $25(0.02) = 0.5$ times pensionable salary, and her salary rate at an exit $t$ years from now is $90{,}000(1.03)^t$. Each row's EPV is therefore multiplied by the salary ratio $(1.03)^t$.
> >
> > | Exit at | EPV per \$1 | $(1.03)^t$ | Product |
> > |---|---|---|---|
> > | 60.5 | 0.52041 | 1.01489 | 0.52816 |
> > | 61.5 | 0.41782 | 1.04534 | 0.43676 |
> > | 62.5 | 1.98688 | 1.07670 | 2.13927 |
> > | 63.5 | 1.52585 | 1.10900 | 1.69217 |
> > | 64.5 | 1.82236 | 1.14227 | 2.08163 |
> > | 65 | 4.28914 | 1.15927 | 4.97227 |
> > | Total | 10.56246 | | 11.85026 |
> >
> > $$
> > \begin{align*}
> > {}_0V &= 0.5(90{,}000)(11.85026) \\
> > &= 45{,}000(11.85026) \\
> > &= 533{,}261.70
> > \end{align*}
> > $$
> > On her current salary the same benefits are worth $45{,}000(10.56246) = 475{,}310.70$, which is the traditional unit credit liability. Projection adds 12.2%, the salary growth on which her past service will be paid. The withdrawal terms are small because she is close to the retirement window.

> [!example]- Normal Cost and the Funding Equation {Example}
> For the member in the previous example, find the PUC normal cost for the coming year, and check it against the funding equation. A member who withdraws at 60.5 is credited with 25.5 years of service.
>
> > [!answer]-
> > The withdrawal at 60.5 is the only exit during the year that pays a benefit, so it accrues half a year, and every later exit accrues a full year. The later exits sum to $11.85026 - 0.52816 = 11.32210$.
> > $$
> > \begin{align*}
> > C &= 0.02(90{,}000)\left[11.32210 + \tfrac12(0.52816)\right] \\
> > &= 1{,}800(11.58618) \\
> > &= 20{,}855.12
> > \end{align*}
> > $$
> > For the check, the withdrawal benefit in the year is worth $25.5(1{,}800)(0.52816) = 24{,}242.54$. A member still in service at 61 has 26 years, so $v\,p_{60}^{(\tau)}\,{}_1V = 26(1{,}800)(11.32210) = 529{,}874.28$.
> > $$
> > \begin{align*}
> > {}_0V + C &= 533{,}261.70 + 20{,}855.12 \\
> > &= 554{,}116.82 \\
> > 24{,}242.54 + 529{,}874.28 &= 554{,}116.82
> > \end{align*}
> > $$
> > The two sides agree. The normal cost is \$475.34 below ${}_0V/25 = 21{,}330.47$, which is the half year of accrual that members leaving mid-year do not earn.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to calculate and interpret the actuarial accrued liability and the normal cost of an active member under PUC, for the benefit on age retirement and for benefits on early exit.
> - **The inputs:** The question gives a salary scale or a salary growth rate, a service table or exit probabilities, and annuity values, and the candidate builds one EPV term per exit with its own projected salary.
> - **Comparisons:** Interpretation parts set PUC beside the [[Traditional Unit Credit Method|traditional unit credit method]] and ask why PUC's liability is larger and its normal cost steadier over a member's career.

> [!warning]- Exam traps
> - **One projected salary for every exit:** Each exit uses the salary projected to its own date. Projecting every term to 65 overstates the benefits of members who retire early or withdraw.
> - **Future service in the liability:** The accrued liability uses the $n$ years already worked. Using the service the member would have at retirement gives the present value of all future benefits instead.
> - **The ${}_0V/n$ shortcut:** Taking the normal cost as ${}_0V/n$ fails when members can leave with a benefit during the year, because they accrue only half a year. Here it overstates the normal cost by \$475.34.
> - **Salary-scale ages:** A salary rate at exact age $x$ is projected with $s_y/s_{x-1/2}$, and the salary over the year just completed with $s_y/s_{x-1}$. Using $s_x$ as the base drops half a year or a full year of growth.
