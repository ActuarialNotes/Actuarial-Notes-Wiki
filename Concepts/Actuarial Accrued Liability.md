---
aliases:
  - Accrued Liability
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4da692e4c3e906f65a788a39f868e196a23ee8e439e3ecede9851a06711cf231
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actuarial Accrued Liability.md
---

The **Actuarial Accrued Liability** (AAL) of a [[Defined Benefit Plan|defined benefit]] [[Pension Plan|pension plan]] is the expected present value, at the valuation date, of the benefits members have earned for service up to that date. AMLCR writes it ${}_0V$. It is the target the plan's assets are measured against.

For an active member aged $x$ with $n$ years of service in a final-salary plan with accrual rate $\alpha$, normal retirement at 65 and a pension paid annually in advance, the AAL for the age-retirement benefit is

> $${}_0V^{\,\text{ret}} = n\,\alpha\,S^{*}\,v^{\,65-x}\;{}_{65-x}p_x^{(\tau)}\;\ddot{a}_{65}$$

- $S^{*}$ is the final salary the cost method uses.
- ${}_{65-x}p_x^{(\tau)}$ is the probability of staying in service to 65, across all decrements.
- $v$ is at the valuation rate.

The AAL counts only the $n$ years already worked. The projected total service at 65 belongs to the present value of all future benefits.

## Projected and traditional unit credit

The cost method decides which salary the earned benefit is based on. Under the [[Projected Unit Credit Method|projected unit credit method]] (PUC), $S^{*}$ is the projected final salary. When $S$ is the salary of the year just completed, from age $x-1$ to $x$, the projected final salary is

> $$S^{*} = S\,\frac{s_{64}}{s_{x-1}}$$

- $s_y$ is the [[Salary Scale|salary scale]] at age $y$.

Writing $s_{64}/s_x$ drops a year of salary increases. Under the [[Traditional Unit Credit Method|traditional unit credit method]] (TUC), $S^{*}$ is the current salary $S$, with no allowance for future increases. The two methods differ only in $S^{*}$, so with salaries rising the TUC liability is smaller.

> [!example]- What is this member's AAL under PUC and under TUC? {Example}
> A final-salary plan pays 1.5% of the salary in the year before retirement for each year of service, from age 65, annually in advance. A member aged 50 has 20 years of service and earned $\$80{,}000$ in the year just completed. Salaries rise 3% a year, ${}_{15}p_{50}^{(\tau)} = 0.85$, $\ddot{a}_{65} = 13.0$ and $i = 5\%$.
>
> > [!answer]-
> > - The projected final salary is $80{,}000(1.03)^{15} = \$124{,}637.39$.
> > - The EPV of 1 a year from 65 for an active member is $v^{15}\,{}_{15}p_{50}^{(\tau)}\,\ddot{a}_{65} = 0.48102(0.85)(13.0) = 5.31524$.
> > - Under PUC, the accrued pension is $20(0.015)(124{,}637.39) = \$37{,}391.22$, and the AAL is $37{,}391.22(5.31524) = \$198{,}743$.
> > - Under TUC, the accrued pension is $20(0.015)(80{,}000) = \$24{,}000$, and the AAL is $24{,}000(5.31524) = \$127{,}566$.
> > - TUC holds about 36% less today and makes it up through larger [[Normal Cost|normal costs]] later.

## Early exits, retirees and deferred members

Benefits on early exit (withdrawal, death in service, early retirement) add their own EPV terms, each based on service to date. Retirees and deferred members contribute the EPV of their fixed pensions. The AAL less the actuarial value of assets is the **unfunded** liability.

> [!example]- What are this plan's total AAL, unfunded liability and funded ratio? {Example}
> The plan above has three members: the active member, valued under PUC, a retiree aged 72 receiving $\$24{,}000$ a year with $\ddot{a}_{72} = 10.2$, and a deferred member aged 55 entitled to $\$9{,}000$ a year from 65 with ${}_{10}p_{55} = 0.88$. Assets are $\$420{,}000$.
>
> > [!answer]-
> > - The retiree's liability is $24{,}000(10.2) = \$244{,}800$.
> > - The deferred member's liability is $9{,}000\,v^{10}(0.88)(13.0) = 9{,}000(0.61391)(0.88)(13.0) = \$63{,}209$.
> > - The total AAL is $198{,}743 + 244{,}800 + 63{,}209 = \$506{,}752$.
> > - The unfunded liability is $506{,}752 - 420{,}000 = \$86{,}752$.
> > - The funded ratio is $420{,}000/506{,}752 = 82.9\%$.
> > - The [[Plan Sponsor|sponsor]] pays the normal cost plus an amortization of the shortfall.

## The funding equation

The AAL rolls forward through the normal cost. For one active member, the AAL at the start of the year plus the normal cost $C$ funds the expected exit benefits in the year and the AAL at the end of it:

> $${}_0V + C = \text{EPV(exit benefits in year)} + v\,p_x^{(\tau)}\,{}_1V$$

- ${}_1V$ is the AAL one year later.
- $p_x^{(\tau)}$ is the probability of staying in service for the year.

> [!trap] Mortality-only survival for an active member
> While in service, the member also leaves by withdrawal, so the age-retirement benefit is discounted with ${}_{65-x}p_x^{(\tau)}$ across all decrements. Using the mortality-only ${}_{65-x}p_x$ overstates the AAL. The mortality-only probability is right for a deferred member, who can no longer leave service.
