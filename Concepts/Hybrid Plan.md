---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c54312f8a3041cf45e44e69098d8715a559719d70899c25b7d5b9298a723b47d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hybrid Plan.md
---

A **Hybrid Plan** is a [[Retirement Plan|retirement plan]] that combines features of a [[Defined Benefit Plan|defined benefit]] plan and a [[Defined Contribution Plan|defined contribution]] plan, so that the risks one type leaves with the [[Plan Sponsor|sponsor]] and the other leaves with the member are shared between them. The common designs are the cash balance plan, the pension equity plan, the floor-offset plan and the market-return designs, and each is best described by which risks it moves to whom.

## Cash balance plan

The benefit is stated as an account, but the account is a bookkeeping entry. The sponsor holds one pooled fund, as in a DB plan, and promises the pay and interest credits. The member sees an account that grows steadily and can be taken as a lump sum on termination, as in a DC plan. The member's notional account balance grows as

> $$AB_{t+1} = AB_t\,(1 + r_t) + \pi\,S_t$$

- $AB_t$ is the notional account balance at time $t$.
- $r_t$ is the interest crediting rate.
- $\pi$ is the pay credit rate.
- $S_t$ is the salary for year $t$.

At 65 the account is converted to a pension of

> $$B_{65} = \frac{AB_{65}}{\ddot{a}_{65}}$$

- $\ddot{a}_{65}$ is the plan's annuity conversion factor at 65.

The interest credit is set by the plan document, not by the fund's return. The plan's fund can be larger or smaller than the sum of the accounts, and the sponsor's gain or loss each year is the difference between the fund's return and the crediting rate, applied to the accounts. In a fixed-rate design the sponsor bears the investment risk and funds any shortfall.

> [!example]- What pension does this late-career member's cash balance account buy, against a final pay DB plan? {Example}
> A member joins a cash balance plan at 55 earning $\$80{,}000$, with raises of 3% a year. The plan credits 5% of each year's pay at the end of the year and 4% interest on the opening balance, and converts the account at 65 with a factor of 12.5. A comparable final pay DB plan would pay 1.25% of the final year's salary per year of service.
>
> > [!answer]-
> > - The credit for year $k$ is $0.05 \times 80{,}000 \times 1.03^k$, and it earns interest for $9-k$ more years.
> > - The account at 65 is $4{,}000 \times (1.04^{10} - 1.03^{10})/0.01 = 4{,}000 \times 13.6328 = \$54{,}531$.
> > - The cash balance pension is $54{,}531/12.5 = \$4{,}362$ a year.
> > - The final year's salary is $80{,}000 \times 1.03^9 = \$104{,}382$, so the DB plan pays $0.0125 \times 10 \times 104{,}382 = \$13{,}048$ a year.
> > - The cash balance pension is $4{,}362/(10 \times 104{,}382) = 0.42\%$ of final pay per year of service, about a third of the DB accrual.
> > - If the fund behind the credits earns 6%, it holds $\$59{,}591$ at 65 and the sponsor keeps a gain of $\$5{,}060$. If it earns 2%, it holds $\$49{,}969$ and the sponsor must fund the $\$4{,}562$ shortfall.

## Pension equity plan

The benefit is a lump sum equal to final average earnings times the sum of the credits earned:

> $$LS_{\text{PEP}} = \text{FAE} \times \sum_{k=1}^{n} c_k$$

- $\text{FAE}$ is final average earnings.
- $c_k$ is the percentage credit earned in year $k$, often 5% to 15% depending on age.

Like a final average pay plan it protects the member against pay inflation up to retirement. Because it is paid as a lump sum, the member bears longevity and post-retirement investment risk unless the sum is annuitized.

## Floor-offset plan

The member has a DC account, and a DB plan guarantees a minimum pension, paying only the excess of the floor over the annuity the account can buy:

> $$B^{\text{DB}} = \max\left(0,\ B^{\text{floor}} - \frac{F^{\text{DC}}}{\ddot{a}_{65}}\right)$$

- $B^{\text{floor}}$ is the pension the DB formula promises.
- $F^{\text{DC}}$ is the member's DC account at retirement.

The member keeps the upside of the account, and the sponsor bears the downside below the floor.

> [!example]- What does the DB plan pay this member if the DC account is $\$250{,}000$, and if it is $\$400{,}000$? {Example}
> A floor-offset plan promises a floor of 1.5% of final average earnings per year of service. A member retires at 65 with 20 years of service and final average earnings of $\$90{,}000$, and the plan converts DC balances with a factor of 12.5.
>
> > [!answer]-
> > - The floor is $0.015 \times 90{,}000 \times 20 = \$27{,}000$ a year.
> > - With $\$250{,}000$ the account buys $250{,}000/12.5 = \$20{,}000$, so the DB plan pays $27{,}000 - 20{,}000 = \$7{,}000$.
> > - With $\$400{,}000$ the account buys $\$32{,}000$, above the floor, so the DB plan pays nothing.
> > - The sponsor carries the downside of the DC investments and the member keeps the upside, which makes the floor a put option the sponsor has written.

> [!trap] Adding the floor to the account's pension
> In a floor-offset plan the DB plan pays only the excess of the floor over the account's annuity value. Adding the floor to the account's pension double counts the benefit.

## Market-return designs

A market-return cash balance plan credits the actual return on a reference portfolio, usually with a floor so that the account cannot fall below the pay credits. A variable annuity plan expresses the pension in units that are adjusted each year by $(1+R_t)/(1+h)$, where $R_t$ is the asset return and $h$ is a hurdle rate. In both, the member bears most of the investment risk while the plan still pools longevity, so the sponsor's cost is close to the credits it promises.

## Accrual pattern

A level pay credit builds value evenly over a career, whereas a final average pay plan earns most of its value in the last years of service. A 5% credit at age 30 compounds for 35 years before retirement and a 5% credit at 60 compounds for 5, so a level pay credit is worth far more as a pension when earned young. A conversion from final pay to cash balance therefore favours short-service and mobile employees and costs older long-service members, which is why conversions often grandfather them or add transition credits.

## Who bears which risk

Investment risk before retirement sits with the sponsor in a cash balance plan with a fixed crediting rate, with the member in a market-return plan, and with the sponsor only below the floor in a floor-offset plan. Annuity price risk sits with the member when the conversion factor follows market rates, even though the sponsor guaranteed the credits. Longevity risk passes to the member whenever a lump sum is taken instead of a pension.

## Legal form

In the United States a cash balance plan is legally a defined benefit plan, so it is funded, insured and tested as one, and its crediting rate may not exceed a market rate of return. The Hybrid Handbook reading compares the designs on this basis.
