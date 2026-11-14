---
aliases:
  - Early Exit
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:92d133c84bf02c4c387e177525d0f286643c159edb537655de48c5c06160678f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Accrued Benefit.md
---

The **Accrued Benefit** of a member of a [[Defined Benefit Plan|defined benefit plan]] is the pension earned by service to date under the plan's benefit formula. It is what the member keeps on early exit, and the [[Actuarial Accrued Liability|actuarial accrued liability]] is its expected present value. In a final-salary plan with normal retirement at 65, the accrued benefit of a member with $n$ years of service is

> $$B = n\,\alpha\,S^{\text{pen}}$$

- $\alpha$ is the accrual rate.
- $S^{\text{pen}}$ is the pensionable salary the plan defines, such as the final salary, a final average or a career average.

The service already worked is fixed, but in a final-salary plan the salary it will be paid on is not. The [[Traditional Unit Credit Method|traditional unit credit method]] values the accrued benefit on today's salary, and the [[Projected Unit Credit Method|projected unit credit method]] values it on salary projected with the [[Salary Scale|salary scale]] to each exit date. In a career-average plan without revaluation the accrued benefit does not depend on future salary, so the two methods agree.

> [!example]- What is this member's accrued benefit on her current salary, and on her salary projected to 65? {Example}
> A final-salary plan pays 2% of the salary rate at exit for each year of service, as a pension from age 65. A member aged exactly 60 has 25 years of service and a salary rate of $\$90{,}000$, and salary rates rise 3% a year.
>
> > [!answer]-
> > - On today's salary, the accrued benefit is $25(0.02)(90{,}000) = \$45{,}000$ a year.
> > - Projected to 65, her salary rate is $90{,}000(1.03)^5 = \$104{,}334.67$.
> > - On the projected salary, the same 25 years are worth $25(0.02)(104{,}334.67) = \$52{,}167.33$ a year.
> > - The five years she may still work are future service, so neither figure includes them.

## Benefit on withdrawal

A member who leaves before the earliest retirement age keeps her accrued benefit as a deferred pension from the normal retirement age, based on her salary at exit. Without revaluation, inflation erodes it during deferment, so many plans revalue it with prices or at a fixed rate. For a member who withdraws at age $y$, the deferred pension is

> $$B^{\text{wd}} = n\,\alpha\,S^{\text{pen}}\,(1+j)^{\,65-y}$$

- $n$ is the service completed by the exit date.
- $j$ is the rate at which the deferred pension is revalued, $0$ if it is not.

The deferred pension grows only by any revaluation, never with salary after exit. Its value at exit uses survival from mortality alone, ${}_{65-y}p_y$, because a deferred member can no longer withdraw or retire from service.

> [!example]- What is this leaver's deferred pension, and its value at withdrawal, with and without revaluation? {Example}
> The member above withdraws at 61.5. Deferred pensions are either not revalued or revalued by 2% a year. On the SULT at 5%, $v^{3.5} = 0.84302$, ${}_{3.5}p_{61.5} = 0.98389$ and $\ddot{a}_{65} = 13.5498$.
>
> > [!answer]-
> > - At 61.5 she has 26.5 years of service and a salary rate of $90{,}000(1.03)^{1.5} = \$94{,}080.22$.
> > - Without revaluation, $B^{\text{wd}} = 26.5(0.02)(94{,}080.22) = \$49{,}862.52$ a year.
> > - The value at exit of 1 a year from 65 is $v^{3.5}\,{}_{3.5}p_{61.5}\,\ddot{a}_{65} = 0.84302(0.98389)(13.5498) = 11.23873$.
> > - Without revaluation, the value at exit is $49{,}862.52(11.23873) = \$560{,}391$.
> > - Revaluation for the 3.5 years to 65 multiplies the pension by $(1.02)^{3.5} = 1.071768$, giving $\$53{,}441.03$ a year.
> > - With revaluation, the value at exit is $53{,}441.03(11.23873) = \$600{,}609$, 7.2% more.

## Benefit on early retirement

A pension that starts before 65 is paid for more years, so the plan reduces it. For a member who retires at age $y$, a reduction of $\rho$ a year gives the pension

> $$B^{\text{er}} = n\,\alpha\,S^{\text{pen}}\,\bigl(1 - \rho\,(65-y)\bigr)$$

The reduction applies to the pension paid from the early date. The actuarially equivalent reduction factor is the fraction of the full pension that, paid from age $y$, has the same EPV as the full pension deferred to 65. It is

> $$f_y = \frac{v^{\,65-y}\;{}_{65-y}p_y\;\ddot{a}_{65}}{\ddot{a}_y}$$

A reduction to $f_y$ keeps the EPV equal to that of the full pension deferred to 65. A smaller reduction, such as a fixed percentage a year, subsidises early retirement and raises the plan's cost. The accrued liability captures that cost through the early-retirement rates in the [[Service Table|service table]].

> [!example]- Is this plan's early-retirement reduction actuarially fair, and what is its subsidy worth? {Example}
> The plan above allows retirement from 62 and reduces the pension by 5% for each year before 65. The member retires at 62.5 with 27.5 years of service, when her salary rate is $\$96{,}902.63$. Given $\ddot{a}_{62.5} = 14.2516$, ${}_{2.5}p_{62.5} = 0.98785$, $v^{2.5} = 0.88517$ and $\ddot{a}_{65} = 13.5498$:
>
> > [!answer]-
> > - Her accrued pension is $27.5(0.02)(96{,}902.63) = \$53{,}296.45$ a year.
> > - A reduction of 5% for 2.5 years multiplies it by $0.875$, so the plan pays $\$46{,}634.39$ a year from 62.5.
> > - The value at 62.5 of 1 a year from 65 is $0.88517(0.98785)(13.5498) = 11.84815$.
> > - $f_{62.5} = 11.84815/14.2516 = 0.8314$, a reduction of 16.9%, about 6.7% a year.
> > - The reduced pension is worth $46{,}634.39(14.2516) = \$664{,}615$ at 62.5.
> > - The full pension deferred to 65 is worth $53{,}296.45(11.84815) = \$631{,}464$.
> > - The 5% a year is less than the fair reduction, so it is a subsidy of $\$33{,}150$, 5.2% of the value of the deferred pension.

> [!trap] Counting future service
> The accrued benefit uses the service completed so far. Using the service the member would have at 65 values benefits she has not yet earned: 30 years in place of 25 in the first example.
