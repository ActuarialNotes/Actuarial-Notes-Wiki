---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5dfd8fc29744d1c1017dff7bca0c4c55c506a52b188eac323c464c742eb7f12c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hybrid Plan.md
---

A **Hybrid Plan** is a [[Retirement Plan|retirement plan]] that combines features of a [[Defined Benefit Plan|defined benefit]] plan and a [[Defined Contribution Plan|defined contribution]] plan, so that the risks one type leaves with the [[Plan Sponsor|sponsor]] and the other leaves with the member are shared between them. The common designs are the cash balance plan, the pension equity plan, the floor-offset plan and the market-return designs (the market-return cash balance plan and the variable annuity plan), and each is best described by which risks it moves to whom.

> $$AB_{t+1} = AB_t\,(1 + r_t) + \pi\,S_t$$

> $$B_{65} = \frac{AB_{65}}{\ddot{a}_{65}}$$

> $$LS_{\text{PEP}} = \text{FAE} \times \sum_{k=1}^{n} c_k$$

> $$B^{\text{DB}} = \max\left(0,\ B^{\text{floor}} - \frac{F^{\text{DC}}}{\ddot{a}_{65}}\right)$$

- **Symbols:** $AB_t$ is the member's notional account balance at time $t$, $\pi$ is the pay credit rate, $S_t$ is the salary for year $t$ (the $S_y$ of Dickson, Hardy & Waters, ch. 10), $r_t$ is the interest crediting rate, and $\ddot{a}_{65}$ is the plan's annuity conversion factor at 65. In a pension equity plan, FAE is final average earnings and $c_k$ is the percentage credit earned in year $k$, which usually rises with age. In a floor-offset plan, $B^{\text{floor}}$ is the pension the DB formula promises and $F^{\text{DC}}$ is the member's DC account at retirement.
- **Cash balance plan:** The benefit is stated as an account, but the account is a bookkeeping entry. The sponsor holds one pooled fund, as in a DB plan, and promises the pay and interest credits, so it bears the investment risk: it gains when the fund earns more than the crediting rate and must fund the shortfall when it earns less. The member sees an account that grows steadily and can be taken as a lump sum on termination, as in a DC plan.
- **Pension equity plan:** The benefit is a lump sum equal to final average earnings times the sum of the credits earned, often 5% to 15% of pay a year depending on age. Like a final average pay plan it protects the member against pay inflation up to retirement, but because it is paid as a lump sum the member bears longevity and post-retirement investment risk unless the sum is annuitized.
- **Floor-offset plan:** The member has a DC account, and a DB plan guarantees a minimum pension, paying only the excess of the floor over the annuity the account can buy. The member keeps the upside of the account, and the sponsor bears the downside below the floor.
- **Market-return designs:** A market-return cash balance plan credits the actual return on a reference portfolio, usually with a floor so that the account cannot fall below the pay credits. A variable annuity plan expresses the pension in units that are adjusted each year by $(1+R_t)/(1+h)$, where $R_t$ is the asset return and $h$ is a hurdle rate. In both, the member bears most of the investment risk while the plan still pools longevity, so the sponsor's cost is close to the credits it promises.
- **Accrual pattern:** A level pay credit builds value evenly over a career, whereas a final average pay plan earns most of its value in the last years of service. A conversion from final pay to cash balance therefore favours short-service and mobile employees and costs older long-service members, which is why conversions often grandfather them or add transition credits.
- **Who bears which risk:** Investment risk before retirement sits with the sponsor in a cash balance plan with a fixed crediting rate, with the member in a market-return plan, and with the sponsor only below the floor in a floor-offset plan. Annuity price risk sits with the member when the conversion factor follows market rates, and longevity risk passes to the member whenever a lump sum is taken instead of a pension.
- **Legal form:** In the United States a cash balance plan is legally a defined benefit plan, so it is funded, insured and tested as one, and its crediting rate may not exceed a market rate of return. The Hybrid Handbook reading compares the designs on this basis.

> [!example]- Cash Balance Credits for a Late-Career Member {Example}
> A member joins a cash balance plan at 55 earning \$80,000, with raises of 3% a year. The plan credits 5% of each year's pay at the end of the year and 4% interest on the opening balance, and converts the account at 65 with a factor of 12.5. A comparable final pay DB plan would pay 1.25% of the final year's salary per year of service. Find the account and the pension from each plan, and the cash balance pension as a DB-equivalent accrual rate.
>
> > [!answer]-
> > The credit for year $k$ is $0.05 \times 80{,}000 \times 1.03^k$, and it earns interest for $9-k$ more years, so the account is a sum with a closed form.
> > $$
> > \begin{align*}
> > AB_{65} &= 4{,}000 \sum_{k=0}^{9} 1.03^{k}\,1.04^{9-k} \\
> > &= 4{,}000 \times \frac{1.04^{10} - 1.03^{10}}{0.01} \\
> > &= 4{,}000 \times 13.6328 \\
> > &= 54{,}531 \\
> > B_{65} &= \frac{54{,}531}{12.5} \\
> > &= 4{,}362
> > \end{align*}
> > $$
> > The final year's salary is $80{,}000 \times 1.03^9 = 104{,}382$, so the DB plan pays $0.0125 \times 10 \times 104{,}382 = 13{,}048$ a year. The cash balance pension is $4{,}362 / (10 \times 104{,}382) = 0.42\%$ of final pay per year of service, about a third of the DB accrual. Ten late-career years of a 5% credit buy little, because each credit has no time to compound, while a final pay formula gives an older member its richest accruals. If the fund behind the credits earns 6%, it holds \$59,591 at 65 and the sponsor keeps a gain of \$5,060. If it earns 2%, it holds \$49,969 and the sponsor must fund the \$4,562 shortfall.

> [!example]- A Floor-Offset Plan at Retirement {Example}
> A floor-offset plan promises a floor of 1.5% of final average earnings per year of service. A member retires at 65 with 20 years of service and final average earnings of \$90,000, and the plan converts DC balances with a factor of 12.5. Find what the DB plan pays if the member's DC account is \$250,000, and if it is \$400,000.
>
> > [!answer]-
> > The floor is $0.015 \times 90{,}000 \times 20 = 27{,}000$ a year.
> > $$
> > \begin{align*}
> > B^{\text{DB}}_{250} &= \max\left(0,\ 27{,}000 - \frac{250{,}000}{12.5}\right) \\
> > &= 27{,}000 - 20{,}000 \\
> > &= 7{,}000 \\
> > B^{\text{DB}}_{400} &= \max\left(0,\ 27{,}000 - 32{,}000\right) \\
> > &= 0
> > \end{align*}
> > $$
> > With \$250,000 the member receives \$27,000 in total, \$20,000 from the account and \$7,000 from the DB plan. With \$400,000 the member receives the account's \$32,000 and the DB plan pays nothing. The sponsor carries the downside of the DC investments and the member keeps the upside, which makes the floor a put option the sponsor has written.

> [!tip]- How it appears on the exam
> - **RET-101 (1a, 1b):** Candidates describe the structure of a cash balance, pension equity, floor-offset or variable annuity plan, then compare it with a traditional DB plan and a DC plan on accrual pattern, portability, cost stability and who bears each risk. The readings are Allen et al. ch. 21 and the Hybrid Handbook.
> - **RET-101 (2d, 3):** A hybrid appears as a way to manage participant risk, for example a market-return cash balance plan that pays a lifetime annuity, and as a source of sponsor risk through its guaranteed crediting rate and lump-sum options.
> - **Calculations:** Short calculations project a cash balance account and convert it to a pension, find the DB-equivalent accrual of a pay credit at a given age, or apply a floor-offset formula.

> [!warning]- Exam traps
> - **The account is notional:** A cash balance account is not a pot of assets the member owns. The plan's fund can be larger or smaller than the sum of the accounts, and in a fixed-rate design any deficit is the sponsor's to fund.
> - **Crediting rate versus return:** The interest credit is set by the plan document, not by the fund's return. The sponsor's gain or loss each year is the difference between the two, applied to the accounts.
> - **Equal credits are not equal value:** A 5% credit at age 30 compounds for 35 years before retirement and a 5% credit at 60 compounds for 5, so a level pay credit is worth far more as a pension when earned young. Comparing it with a DB accrual at one age only is misleading.
> - **Offset, not addition:** In a floor-offset plan the DB plan pays only the excess of the floor over the account's annuity value. Adding the floor to the account's pension double counts the benefit.
> - **Conversion basis:** The pension a cash balance account buys depends on the conversion factor in force at retirement. If that factor follows current interest rates and mortality, the member bears annuity price risk even though the sponsor guaranteed the credits.
