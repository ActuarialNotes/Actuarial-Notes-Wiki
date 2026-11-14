---
aliases:
  - Traditional Unit Credit
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3fbcac3f907a2b853c63391dfe96a1c449606462dbebffe62b0934267b2c6397
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Traditional Unit Credit Method.md
---
The **Traditional Unit Credit Method** (TUC) is a cost method for a [[Defined Benefit Plan|defined benefit]] [[Pension Plan|pension plan]] that values the [[Accrued Benefit|accrued benefit]] on the member's current salary, with no allowance for future salary increases. For a member aged $x$ with $n$ years of service, its [[Actuarial Accrued Liability|actuarial accrued liability]] is the expected present value of that benefit over every possible exit, which is

> $${}_0V = n\,\alpha\,S \sum_{k} \mathrm{EPV}_k$$

- $\alpha$ is the accrual rate.
- $S$ is the member's current pensionable salary.
- $\mathrm{EPV}_k$ is the EPV at age $x$ of 1 a year of pension paid on exit $k$, built from the [[Service Table|service table]].

The TUC liability values the benefits members have earned on the salaries they have now. That is the same set of benefits a plan wind-up would have to secure, although a wind-up valuation uses settlement discount rates rather than funding assumptions.

## Normal cost

The [[Normal Cost|normal cost]] $C$ comes from the funding equation, which is

> $$C = \mathrm{EPV}(\text{exit benefits in year}) + v\,p_x^{(\tau)}\,{}_1V - {}_0V$$

- $p_x^{(\tau)}$ is the probability that the member is still in service at age $x + 1$.
- ${}_1V$ is the liability a year later for a member still in service, on $n + 1$ years and her salary a year from now, $S'$.

The liability at time 1 is held only for members still in service, so it is multiplied by $v\,p_x^{(\tau)}$, and the exit benefits during the year are added separately. When no exit during the year pays a benefit, the normal cost splits into two parts, which is

> $$\begin{aligned} C = {} & \alpha\,S' \textstyle\sum_{k} \mathrm{EPV}_k \\ & + n\,\alpha\,(S' - S) \textstyle\sum_{k} \mathrm{EPV}_k \end{aligned}$$

The first line is the year's new accrual on next year's salary. The second line is the cost of applying this year's salary increase to the $n$ years already worked. It is the reason the TUC normal cost is more than one year's accrual on current pay, and the reason it grows with service. A member who leaves mid-year instead receives the benefit on $n + \frac12$ years and her salary at exit.

> [!example]- What are the TUC accrued liability and normal cost for this member? {Example}
> A final-salary plan pays 2% of the salary rate at exit for each year of service, as a pension from 65, with early retirement from 62 and a deferred pension for a member who leaves before 62. A member aged exactly 60 has 25 years of service and a salary rate of $\$90{,}000$, which rises 3% a year to $\$91{,}340.02$ at 60.5 and $\$92{,}700$ at 61. Exits are mid-year, and death pays nothing. A member who withdraws at 60.5 is credited with 25.5 years on her salary at exit. The EPV at 60 of $\$1$ a year of accrued pension is:
>
> | Exit | EPV at 60 |
> | :--- | ---: |
> | Withdrawal at 60.5 | 0.52041 |
> | The five later exits, together | 10.04205 |
>
> > [!answer]-
> > - The six exits sum to $0.52041 + 10.04205 = 10.56246$.
> > - The accrued pension on current salary is $25(0.02)(90{,}000) = 45{,}000$.
> > - So ${}_0V = 45{,}000(10.56246) = 475{,}310.70$.
> > - The withdrawal benefit in the year is worth $25.5(0.02)(91{,}340.02)(0.52041) = 24{,}242.47$.
> > - A member still in service at 61 has 26 years and a salary of $\$92{,}700$, so $v\,p_{60}^{(\tau)}\,{}_1V = 26(0.02)(92{,}700)(10.04205) = 484{,}066.98$.
> > - So $C = 24{,}242.47 + 484{,}066.98 - 475{,}310.70 = 32{,}998.75$.
> > - The new year's accrual is $\$19{,}093.30$ of this: $\$18{,}617.96$ for members who stay and $\$475.34$ for the half year that leavers earn.
> > - The other $\$13{,}905.45$ lifts the 25 past years to the higher salary.

## Comparison with the projected unit credit method

When salaries rise, the TUC liability is smaller than the [[Projected Unit Credit Method|projected unit credit]] (PUC) liability, because it leaves out the salary growth still to come. The two methods differ only in that salary, so a projected salary in ${}_0V$ gives the PUC liability instead. Both methods fund the same benefits by retirement, so TUC's low costs for young members are paid for by high costs near retirement. A plan whose membership is ageing sees its TUC contributions rise. In a career-average plan without revaluation the accrued benefit does not depend on future salary, and the two methods give the same result.

For the member in the first example, PUC gives $\$533{,}261.70$ and $\$20{,}855.12$. At 60, TUC holds $\$57{,}951$ less but charges $\$12{,}144$ more for the year.

> [!example]- What is this member's normal cost as a percentage of salary at 35, 45, 55 and 64, under TUC and under PUC? {Example}
> A member joins the same plan at 35, and her salary rate rises 3% a year. Ignore every exit except death, which pays nothing, and retirement at 65. Write $E_x$ for the EPV at age $x$ of $\$1$ a year from 65 for a member in service, on the SULT at 5%, and $n = x - 35$:
>
> | Age $x$ | $E_x$ |
> | :--- | ---: |
> | 35 | 2.9784 |
> | 45 | 4.8771 |
> | 55 | 8.0407 |
> | 64 | 12.8363 |
>
> > [!answer]-
> > - Under PUC the normal cost is one year's accrual on the salary projected to 65, so $C/S = 0.02\,(1.03)^{65-x}\,E_x$.
> > - Under TUC it is the new accrual on next year's salary plus the raise on $n$ past years, so $C/S = 0.02\,(1.03 + 0.03\,n)\,E_x$.
> > - The results are:
> >
> > | Age | $(1.03)^{65-x}$ | PUC | $1.03 + 0.03n$ | TUC |
> > | :--- | ---: | ---: | ---: | ---: |
> > | 35 | 2.4273 | 14.46% | 1.03 | 6.14% |
> > | 45 | 1.8061 | 17.62% | 1.33 | 12.97% |
> > | 55 | 1.3439 | 21.61% | 1.63 | 26.21% |
> > | 64 | 1.0300 | 26.44% | 1.90 | 48.78% |
> >
> > - TUC costs less than half as much as PUC at 35 and overtakes it in the early fifties.
> > - At 64 TUC costs almost half of salary, because one 3% raise then lifts 29 years of past service.

> [!trap] Taking the normal cost as one year's accrual
> Taking the normal cost as $\alpha S'\sum_k \mathrm{EPV}_k$ leaves out the raise on past service, which is $\$13{,}905.45$ of the $\$32{,}998.75$ in the first example. The funding equation includes it automatically, as long as ${}_1V$ uses next year's salary on $n+1$ years.
