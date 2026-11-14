---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c8d8b00a7b3c01d7b2359a3b8b034a0bd361b539b80332fc09ebe27d0aca0fe8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Funding.md
---
**Funding** is the arrangement by which money is set aside to pay for the benefits a plan promises: how much, when, and who bears the cost if experience differs from expectation. For a [[Pension Plan|pension plan]] it is the [[Plan Sponsor|sponsor's]] contribution policy, which builds assets ahead of benefit payments. For group [[Health Insurance|health]] and life benefits it is the funding arrangement, which decides how much claim risk the employer keeps.

## Pension fund roll-forward

A pension fund's assets $A_t$ grow by contributions and investment income and fall by benefits and expenses, so the assets a year later are

> $$A_{t+1} = A_t + C_t + I_t - B_t - E_t$$

- $C_t$ is the contributions in year $t$.
- $I_t$ is the investment income.
- $B_t$ is the benefits paid.
- $E_t$ is the expenses paid.

Over a plan's life this gives the fundamental identity $C + I = B + E$. Every dollar of benefit not earned by investment must come from contributions, so a funding method changes only the timing of contributions, not their total.

## Going-concern contribution

The sponsor's contribution is the [[Normal Cost|normal cost]] plus a payment amortizing the unfunded [[Actuarial Accrued Liability|actuarial accrued liability]] over $n$ years. With level payments at the start of each year, the contribution is

> $$C_t = NC_t + \frac{AAL_t - A_t}{\ddot{a}_{\overline{n}|}}$$

- $NC_t$ is the normal cost.
- $AAL_t$ is the actuarial accrued liability.
- $\ddot{a}_{\overline{n}|}$ is the annuity-due over the amortization period, at the valuation rate.

The funded ratio is $A/AAL$. Canadian plans fund on both a going-concern and a [[Solvency|solvency]] (hypothetical wind-up) basis, and RET-301 is about choosing the assumptions for each: discount rate, [[Mortality|mortality]] and expenses. The solvency basis values a hypothetical wind-up, with settlement-based discount rates.

> [!example]- What are this plan's funded ratio and this year's contribution? {Example}
> A defined benefit plan has an actuarial accrued liability of $\$12.0$M, assets of $\$10.5$M and a normal cost of $\$400{,}000$. The unfunded liability is amortized over 15 years by level payments at the start of each year, at 5.5%.
>
> > [!answer]-
> > - The funded ratio is $10.5/12.0 = 87.5\%$.
> > - The unfunded liability is $12{,}000{,}000 - 10{,}500{,}000 = \$1{,}500{,}000$.
> > - The annuity-due is $\ddot{a}_{\overline{15}|5.5\%} = 10.5896$.
> > - The amortization payment is $1{,}500{,}000/10.5896 = \$141{,}648$.
> > - The contribution is $400{,}000 + 141{,}648 = \$541{,}648$, about 35% above normal cost.
> > - Lengthening the period lowers this year's cost and raises total contributions later, which is the trade between stability and security a funding policy has to defend.

A funding policy (RET-201; CAPSA Guideline No. 7) sets the sponsor's objectives, which are benefit security, contribution stability and intergenerational equity, and the margins, methods and amortization rules that serve them.

## Group insurance funding arrangements

The arrangements run from most risk with the insurer to most with the employer:

1. **Fully insured**: a pooled premium with no refund.
2. **Experience-refund or retrospective premium**: surplus is refunded, and a deficit is carried forward.
3. **Minimum premium**: the employer funds claims up to a trigger.
4. **Self-funded or ASO with stop-loss**: the employer pays claims, and buys stop-loss cover.
5. **Level funding**: a small-group self-funded plan billed as level monthly payments.

[[Experience Rating|Experience rating]] and [[Credibility|credibility]] sit inside the middle options. Under an experience refund, the refund is

> $$\text{Refund} = P - \text{Claims} - \text{Retention}$$

- $P$ is the premium.
- $\text{Retention}$ is the part of the premium the insurer keeps.

A negative refund is a deficit. It is carried forward against the group's future refunds, so the insurer absorbs it only if the group leaves before repaying it.

> [!example]- What does each arrangement cost this employer if claims are $\$900{,}000$, and if they are $\$1{,}250{,}000$? {Example}
> An employer's group medical plan has expected claims of $\$1{,}000{,}000$. No single claim reaches the stop-loss deductible.
>
> | Arrangement | Terms |
> | :--- | :--- |
> | Fully insured | Premium $\$1{,}150{,}000$, no refund |
> | Retrospective premium | Premium $\$1{,}150{,}000$, retention $\$130{,}000$ |
> | ASO with stop-loss | Administration fee $\$100{,}000$, stop-loss premium $\$40{,}000$ |
>
> > [!answer]-
> > - Fully insured costs $\$1{,}150{,}000$ either way.
> > - At $\$900{,}000$ of claims, the refund is $1{,}150{,}000 - 900{,}000 - 130{,}000 = \$120{,}000$, so the retrospective arrangement costs $\$1{,}030{,}000$.
> > - At $\$900{,}000$ of claims, ASO costs $900{,}000 + 140{,}000 = \$1{,}040{,}000$.
> > - At $\$1{,}250{,}000$ of claims, the balance is $1{,}150{,}000 - 1{,}250{,}000 - 130{,}000 = -\$230{,}000$, so the retrospective arrangement costs $\$1{,}150{,}000$ now plus a $\$230{,}000$ deficit carried forward.
> > - At $\$1{,}250{,}000$ of claims, ASO costs $1{,}250{,}000 + 140{,}000 = \$1{,}390{,}000$.
> > - Fully insured fixes the cost, the retrospective arrangement shares the good year and defers the bad one, and ASO passes every claim dollar through. The employer's tolerance for that swing, and its cash flow, picks the arrangement.

> [!trap] Treating a retrospective deficit as the insurer's loss
> A deficit is carried forward against the group's future refunds, so the employer's true cost of the bad year is the premium plus the deficit. In the example above that is $\$1{,}380{,}000$, not $\$1{,}150{,}000$.
