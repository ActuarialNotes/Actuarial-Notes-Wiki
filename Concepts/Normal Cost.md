---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dd2afb0295aefa9e7cd60534c8e26b06007ea9653b6182d77257d0cddb22dea1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Normal Cost.md
---

The **Normal Cost** ($C$ in AMLCR) of a [[Defined Benefit Plan|defined benefit]] [[Pension Plan|pension plan]] is the contribution that, paid at the start of a year, funds the benefits that year's service adds, so that if every assumption is borne out the assets keep pace with the [[Actuarial Accrued Liability|actuarial accrued liability]]. It is defined by the one-year funding equation.

> $${}_0V + C = \text{EPV}_0(\text{exit benefits in year}) + v\,p_x^{(\tau)}\,{}_1V$$

> $$C^{\,\text{PUC}} = \alpha\,\hat{S}\,v^{\,65-x}\;{}_{65-x}p_x^{(\tau)}\;\ddot{a}_{65}$$

- ${}_0V$ is the accrued liability now and ${}_1V$ the liability one year on for a member still in service, with one more year of service and, under TUC, the new salary. $p_x^{(\tau)}$ is the probability of remaining in service and $v$ is at the valuation rate
- **PUC:** the second block, for the age-retirement benefit alone with no exit benefits. The year's normal cost is one year's accrual $\alpha$ on the **projected** final salary $\hat{S}$, so it equals ${}_0V/n$
- **TUC:** ${}_1V$ uses next year's salary on all $n+1$ years, so the normal cost also pays for raising the past $n$ years' benefit to the new salary. It therefore climbs steeply with age, while PUC's grows more evenly
- The sponsor's total contribution is the normal cost plus an amortization of any unfunded liability; members' contributions, if any, are part of $C$

> [!example]- PUC Versus TUC Normal Cost {Example}
> A plan pays $1.5\%$ of the salary in the year before retirement per year of service, from age 65, annually in advance. A member aged 50 has 20 years of service and earned $\$80{,}000$ in the year just completed; salaries rise $3\%$ a year. Given ${}_{15}p_{50}^{(\tau)} = 0.85$, $\ddot{a}_{65} = 13.0$, $i = 5\%$ and no benefit on any exit before 65, find the normal cost for the coming year under PUC and TUC.
>
> > [!answer]-
> > EPV of 1 a year from 65: $v^{15}(0.85)(13.0) = 5.31524$. Projected final salary: $80{,}000(1.03)^{15} = 124{,}637.39$.
> > $$
> > \begin{align*}
> > C^{\,\text{PUC}} &= 0.015(124{,}637.39)(5.31524) \\
> > &= 9{,}937.16
> > \end{align*}
> > $$
> > Under TUC, $v\,p_{50}^{(\tau)}\,{}_1V = 21(0.015)(82{,}400)(5.31524)$, since $v\,p_{50}^{(\tau)} \cdot v^{14}\,{}_{14}p_{51}^{(\tau)} = v^{15}\,{}_{15}p_{50}^{(\tau)}$:
> > $$
> > \begin{align*}
> > C^{\,\text{TUC}} &= \left[21(82{,}400) - 20(80{,}000)\right](0.015)(5.31524) \\
> > &= 130{,}400(0.015)(5.31524) \\
> > &= 10{,}396.61
> > \end{align*}
> > $$
> > Of the TUC cost, $6{,}569.64$ is the new year's accrual and $3{,}826.97$ lifts the 20 past years to the $3\%$ higher salary. At age 50 TUC already costs more than PUC.

> [!example]- Funding Equation With a Withdrawal Benefit {Example}
> A member aged 45 has 15 years of service in a plan paying $1.5\%$ of final-year salary per year of service from 65 ($\ddot{a}_{65} = 13.0$, $i = 5\%$). Her salary was $\$60{,}000$ last year and is $\$61{,}800$ this year. In the coming year she dies with probability $0.002$ (no benefit) or withdraws at year end with probability $0.04$, keeping a deferred pension on her 16 years and final salary $\$61{,}800$. Given ${}_{19}p_{46} = 0.90$ for a life no longer subject to withdrawal, and that withdrawal does not change mortality, find the TUC normal cost.
>
> > [!answer]-
> > A pension of 1 from 65, valued at age 46: $u = v^{19}(0.90)(13.0) = 4.63009$. The accrued pension at 46 is $16(0.015)(61{,}800) = 14{,}832$. Her accrued pension is paid from 65 whether she stays or leaves, so ${}_0V$ needs survival only: ${}_{20}p_{45} = 0.998(0.90) = 0.8982$.
> > $$
> > \begin{align*}
> > {}_0V &= 15(0.015)(60{,}000)\,v^{20}(0.998)(0.90)(13.0) \\
> > &= 59{,}410.63
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > {}_1V &= 14{,}832(4.63009) \\
> > &= 68{,}673.45
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > C &= v(0.04)(68{,}673.45) + v(0.958)(68{,}673.45) - 59{,}410.63 \\
> > &= 2{,}616.13 + 62{,}656.35 - 59{,}410.63 \\
> > &= 5{,}861.85
> > \end{align*}
> > $$
> > Because a leaver keeps exactly the benefit a stayer has accrued, the withdrawal and in-service terms combine and the result is the no-exit formula $[16(61{,}800) - 15(60{,}000)](0.015)\,v^{20}(0.8982)(13.0)$.

> [!tip]- How it appears on the exam
> - **ALTAM** asks for the normal cost of an active member under PUC and TUC, for the age-retirement benefit and for early-exit benefits, from a salary scale, service table and annuity values; it is almost always paired with the [[Actuarial Accrued Liability|accrued liability]] in the same question.
> - ALTAM's interpretation parts ask why TUC normal costs rise faster with age, and which method suits a plan with an older membership.
> - **RET-201** asks for normal cost under a range of cost methods in an ongoing-plan valuation, and how it combines with amortization of the unfunded liability into the required [[Funding|contribution]].

> [!warning]- Exam traps
> - Under TUC, taking the normal cost as one year's accrual on the new salary ($6{,}569.64$ in the first example) and leaving out the catch-up on past service. The funding equation includes it automatically.
> - Discounting ${}_1V$ with interest only. The liability at time 1 is held only for members still in service, so it needs $v\,p_x^{(\tau)}$, and exit benefits in the year are added separately.
> - Valuing a withdrawal benefit with the in-service probability ${}_{65-x}p^{(\tau)}$. Once a member leaves, only mortality applies, so the deferred pension is discounted with the mortality-only ${}_tp$.
