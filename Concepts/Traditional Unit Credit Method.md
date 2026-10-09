---
aliases:
  - Traditional Unit Credit
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e34485fc90fa035292329a934d86f5eb7612e7705e482257d7428187fa93c722
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Traditional Unit Credit Method.md
---
The **Traditional Unit Credit Method** (TUC) is a cost method for a [[Defined Benefit Plan|defined benefit]] [[Pension Plan|pension plan]] that values the [[Accrued Benefit|accrued benefit]] on the member's current salary, with no allowance for future salary increases. Its [[Actuarial Accrued Liability|actuarial accrued liability]] is the expected present value of that benefit over every possible exit. Its [[Normal Cost|normal cost]] comes from the funding equation, so it pays for the year's new accrual and also for raising the benefit for past service to the new salary.

> $${}_0V = n\,\alpha\,S \sum_{k} \mathrm{EPV}_k$$

> $$C = \mathrm{EPV}(\text{exit benefits in year}) + v\,p_x^{(\tau)}\,{}_1V - {}_0V$$

> $$\begin{aligned} C = {} & \alpha\,S' \textstyle\sum_{k} \mathrm{EPV}_k \\ & + n\,\alpha\,(S' - S) \textstyle\sum_{k} \mathrm{EPV}_k \end{aligned}$$

- **Symbols:** Following Dickson, Hardy & Waters (chapter 10), the member is aged $x$ with $n$ years of service, $\alpha$ is the accrual rate, $S$ is her current pensionable salary and $S'$ is her salary a year from now. $\mathrm{EPV}_k$ is the EPV at $x$ of 1 a year of pension paid on exit $k$, built from the [[Service Table|service table]], and ${}_1V$ is the liability a year later for a member still in service, on $n+1$ years and salary $S'$. The third block holds when no exit during the year pays a benefit; a member who leaves mid-year instead receives the benefit on $n + \frac12$ years and her salary at exit.
- **Catch-up on past service:** The second line of the third block is the cost of applying this year's salary increase to the $n$ years already worked. It is the reason the TUC normal cost is more than one year's accrual on current pay, and the reason it grows with service.
- **Comparison with PUC:** When salaries rise, the TUC liability is smaller than the [[Projected Unit Credit Method|projected unit credit]] liability, because it leaves out the salary growth still to come. Both methods fund the same benefits by retirement, so TUC's low costs for young members are paid for by high costs near retirement, and a plan whose membership is ageing sees its TUC contributions rise. In a career-average plan without revaluation the accrued benefit does not depend on future salary, and the two methods give the same result.
- **Benefits earned to date:** The TUC liability values the benefits members have earned on the salaries they have now. That is the same set of benefits a plan wind-up would have to secure, although a wind-up valuation uses settlement discount rates rather than funding assumptions.

> [!example]- Liability and Normal Cost with Several Exits {Example}
> A final-salary plan pays 2% of the salary rate at exit for each year of service, as a pension from 65, with early retirement from 62 and a deferred pension for a member who leaves before 62. A member aged exactly 60 has 25 years of service and a salary rate of \$90,000, which rises 3% a year to \$91,340.02 at 60.5 and \$92,700 at 61. With mid-year exits, the EPV at 60 of \$1 a year of accrued pension is 0.52041 on withdrawal at 60.5, and the five later exits (withdrawal at 61.5 and retirement at 62.5, 63.5, 64.5 and 65) add up to 10.04205. A member who withdraws at 60.5 is credited with 25.5 years on her salary at exit, and death pays nothing. Find the TUC accrued liability and normal cost.
>
> > [!answer]-
> > The six exits sum to $0.52041 + 10.04205 = 10.56246$, and the accrued pension on current salary is $25(0.02)(90{,}000) = 45{,}000$.
> > $$
> > \begin{align*}
> > {}_0V &= 45{,}000(10.56246) \\
> > &= 475{,}310.70
> > \end{align*}
> > $$
> > The withdrawal benefit in the year is worth $25.5(0.02)(91{,}340.02)(0.52041) = 24{,}242.47$. A member still in service at 61 has 26 years and a salary of \$92,700, so $v\,p_{60}^{(\tau)}\,{}_1V = 26(0.02)(92{,}700)(10.04205) = 484{,}066.98$.
> > $$
> > \begin{align*}
> > C &= 24{,}242.47 + 484{,}066.98 - 475{,}310.70 \\
> > &= 32{,}998.75
> > \end{align*}
> > $$
> > The new year's accrual accounts for \$19,093.30 of this: a full year on \$92,700 for members who stay, $0.02(92{,}700)(10.04205) = 18{,}617.96$, and \$475.34 for the half year that leavers earn. The remaining \$13,905.45 lifts the 25 past years to the higher salary: \$13,556.77 for the \$2,700 raise of members who stay and \$348.68 for the \$1,340.02 raise of those who leave. The projected unit credit method gives \$533,261.70 and \$20,855.12 for the same member, so at 60 TUC holds \$57,951 less but charges \$12,144 more for the year.

> [!example]- Normal Cost over a Career {Example}
> A member joins the same plan at 35, and her salary rate rises 3% a year. Ignore every exit except death, which pays nothing, and retirement at 65. The EPV at age $x$ of \$1 a year from 65 for a member in service is 2.9784 at 35, 4.8771 at 45, 8.0407 at 55 and 12.8363 at 64 (SULT at 5%). Find the normal cost as a percentage of her current salary rate at each of these ages under TUC and under PUC.
>
> > [!answer]-
> > Write $E_x$ for the EPV at $x$ and $n = x - 35$. Under PUC the normal cost is one year's accrual on the salary projected to 65, and under TUC the third block gives the new accrual on next year's salary plus the raise on $n$ past years.
> > $$
> > \begin{align*}
> > C^{\text{PUC}}/S &= 0.02\,(1.03)^{65-x}\,E_x \\
> > C^{\text{TUC}}/S &= 0.02\,(1.03 + 0.03\,n)\,E_x
> > \end{align*}
> > $$
> >
> > | Age | $(1.03)^{65-x}$ | PUC | $1.03 + 0.03n$ | TUC |
> > |---|---|---|---|---|
> > | 35 | 2.4273 | 14.46% | 1.03 | 6.14% |
> > | 45 | 1.8061 | 17.62% | 1.33 | 12.97% |
> > | 55 | 1.3439 | 21.61% | 1.63 | 26.21% |
> > | 64 | 1.0300 | 26.44% | 1.90 | 48.78% |
> >
> > TUC costs less than half as much as PUC at 35, overtakes it in the early fifties, and at 64 costs almost half of salary, because one 3% raise then lifts 29 years of past service. PUC's cost rises too, as retirement gets closer and less discounting applies, but it rises far more evenly.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to calculate and interpret the actuarial accrued liability and the normal cost of an active member under TUC, for the benefit on age retirement and for benefits on early exit, and to compare them with PUC for the same member.
> - **The funding equation:** The normal cost is found from ${}_0V + C = \mathrm{EPV}(\text{exit benefits in year}) + v\,p_x^{(\tau)}\,{}_1V$, so the candidate needs this year's and next year's salaries and the probabilities of leaving and of staying.
> - **Interpretation:** Other parts ask why TUC normal costs rise steeply with age, why the TUC liability is smaller than PUC's, and what that means for an ageing or a young membership.

> [!warning]- Exam traps
> - **One year's accrual only:** Taking the normal cost as $\alpha S'\sum_k \mathrm{EPV}_k$ leaves out the raise on past service, which is \$13,905.45 of the \$32,998.75 in the first example. The funding equation includes it automatically.
> - **Projecting salary in ${}_0V$:** TUC uses the current salary in the accrued liability. A projected salary there gives the PUC liability instead, since the two methods differ only in that salary.
> - **The wrong salary in ${}_1V$:** The liability a year later uses next year's salary on $n+1$ years. Keeping this year's salary in ${}_1V$ removes the catch-up and gives a normal cost that is too small.
> - **Discounting ${}_1V$ with interest alone:** The liability at time 1 is held only for members still in service, so it is multiplied by $v\,p_x^{(\tau)}$, and the exit benefits during the year are added separately.
