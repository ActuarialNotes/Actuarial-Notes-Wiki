---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0ce03467e6807dd6bdbe6f79be886020e3ca59578947d9c44c495858c616158f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Normal Cost.md
---

The **Normal Cost** of a [[Defined Benefit Plan|defined benefit]] [[Pension Plan|pension plan]] is the contribution that, paid at the start of a year, funds the benefits that year's service adds, so that if every assumption is borne out the assets keep pace with the [[Actuarial Accrued Liability|actuarial accrued liability]]. For a member aged $x$, the normal cost $C$ for the coming year is defined by the funding equation, which is

> $${}_0V + C = \text{EPV}_0(\text{exit benefits in year}) + v\,p_x^{(\tau)}\,{}_1V$$

- ${}_0V$ is the accrued liability now.
- $\text{EPV}_0(\text{exit benefits in year})$ is the expected present value now of the benefits paid on exits during the year.
- ${}_1V$ is the liability one year on for a member still in service, with one more year of service.
- $p_x^{(\tau)}$ is the probability of remaining in service for the year.
- $v$ is the discount factor at the valuation rate.

The sponsor's total contribution is the normal cost plus an amortization of any unfunded liability. Members' contributions, if any, are part of $C$.

> [!example]- What is this member's TUC normal cost for the coming year? {Example}
> A member aged 45 has 15 years of service in a plan paying $1.5\%$ of final-year salary per year of service from 65, with $\ddot{a}_{65} = 13.0$ and $i = 5\%$. Her salary was $\$60{,}000$ last year and is $\$61{,}800$ this year. In the coming year she dies with probability $0.002$, with no benefit, or withdraws at year end with probability $0.04$, keeping a deferred pension on her 16 years and final salary $\$61{,}800$. For a life no longer subject to withdrawal ${}_{19}p_{46} = 0.90$, and withdrawal does not change mortality.
>
> > [!answer]-
> > - A pension of 1 from 65, valued at age 46, is $v^{19}(0.90)(13.0) = 4.63009$.
> > - Her accrued pension is paid from 65 whether she stays or leaves, so ${}_0V$ needs survival only: ${}_{20}p_{45} = 0.998(0.90) = 0.8982$.
> > - The accrued pension now is $15(0.015)(60{,}000) = 13{,}500$, so ${}_0V = 13{,}500\,v^{20}(0.8982)(13.0) = 59{,}410.63$.
> > - The accrued pension at 46 is $16(0.015)(61{,}800) = 14{,}832$, so ${}_1V = 14{,}832(4.63009) = 68{,}673.45$.
> > - A leaver is valued with the mortality-only ${}_{19}p_{46}$, the same as a stayer, so the withdrawal term is $v(0.04)(68{,}673.45) = 2{,}616.13$.
> > - The in-service term is $v(0.958)(68{,}673.45) = 62{,}656.35$.
> > - $C = 2{,}616.13 + 62{,}656.35 - 59{,}410.63 = \$5{,}861.85$.

## Projected unit credit normal cost

Under the [[Projected Unit Credit Method|projected unit credit]] (PUC) method, for the age-retirement benefit alone with no exit benefits, the normal cost of a member aged $x$ is one year's accrual on the projected final salary, which is

> $$C^{\,\text{PUC}} = \alpha\,\hat{S}\,v^{\,65-x}\;{}_{65-x}p_x^{(\tau)}\;\ddot{a}_{65}$$

- $\alpha$ is the accrual rate per year of service.
- $\hat{S}$ is the projected final salary.
- ${}_{65-x}p_x^{(\tau)}$ is the probability of remaining in service to 65.

For a member with $n$ years of service it equals ${}_0V/n$.

## Traditional unit credit normal cost

Under the [[Traditional Unit Credit Method|traditional unit credit]] (TUC) method, ${}_1V$ uses next year's salary on all $n+1$ years of service. The normal cost therefore also pays for raising the past $n$ years' benefit to the new salary, and for the age-retirement benefit alone it is

> $$C^{\,\text{TUC}} = \alpha\left[(n+1)S_{x+1} - n\,S_x\right]v^{\,65-x}\;{}_{65-x}p_x^{(\tau)}\;\ddot{a}_{65}$$

- $S_x$ is the salary in the year just completed and $S_{x+1}$ the salary in the coming year.

The TUC normal cost climbs steeply with age, while the PUC normal cost grows more evenly.

> [!example]- What is this member's normal cost for the coming year under PUC and under TUC? {Example}
> A plan pays $1.5\%$ of the salary in the year before retirement per year of service, from age 65, annually in advance. A member aged 50 has 20 years of service and earned $\$80{,}000$ in the year just completed. Salaries rise $3\%$ a year, ${}_{15}p_{50}^{(\tau)} = 0.85$, $\ddot{a}_{65} = 13.0$ and $i = 5\%$. No benefit is paid on any exit before 65.
>
> > [!answer]-
> > - The EPV of 1 a year from 65 is $v^{15}(0.85)(13.0) = 5.31524$.
> > - The projected final salary is $80{,}000(1.03)^{15} = 124{,}637.39$.
> > - $C^{\,\text{PUC}} = 0.015(124{,}637.39)(5.31524) = \$9{,}937.16$.
> > - Next year's salary is $82{,}400$, and $21(82{,}400) - 20(80{,}000) = 130{,}400$.
> > - $C^{\,\text{TUC}} = 130{,}400(0.015)(5.31524) = \$10{,}396.61$.
> > - Of the TUC cost, $6{,}569.64$ is the new year's accrual and $3{,}826.97$ lifts the 20 past years to the higher salary, so at age 50 TUC already costs more than PUC.

> [!trap] Leaving out the TUC catch-up on past service
> Under TUC, one year's accrual on the new salary ($6{,}569.64$ in the example) is not the normal cost. The funding equation also charges the $3{,}826.97$ that raises the past 20 years' benefit to the new salary.
