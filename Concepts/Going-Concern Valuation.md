---
aliases:
  - Ongoing Plan
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:aa95d61311f051f410019eb529c1b91533454072fc72084957988ca8d1401054
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Going-Concern Valuation.md
---

A **Going-Concern Valuation** is the [[Valuation|valuation]] of a [[Defined Benefit Plan|defined benefit]] [[Pension Plan|pension plan]] on the assumption that the plan and its sponsor continue indefinitely: members keep working, earning service and pay increases, and the fund keeps investing for the long term. It uses an actuarial cost method to split the value of the benefits into a [[Normal Cost|normal cost]] $NC_t$ for the coming year and an [[Actuarial Accrued Liability|actuarial accrued liability]] $AAL_t$ for service to date, and it sets the contributions that [[Funding|fund]] the plan.

The unfunded liability, a surplus when negative, is

> $$UAL_t = AAL_t - AVA_t$$

- $AVA_t$ is the actuarial value of assets, either market value or a smoothed value set by the [[Asset Valuation Method|asset valuation method]].

The contribution for the year is

> $$C_t = NC_t + SP_t$$

- $SP_t$ is the special payments that amortize the unfunded liability.

A going-concern unfunded liability is amortized by special payments over a period that the governing legislation caps. A going-concern surplus can be used to reduce contributions, within the limits set by the plan terms, the legislation and the Income Tax Act.

## Cost methods

Unit credit methods value the benefit accrued to date and charge each year's accrual as the normal cost. The [[Projected Unit Credit Method|projected unit credit]] (PUC) method uses projected pay, and the [[Traditional Unit Credit Method|traditional unit credit]] (TUC) method uses current pay. Entry age normal spreads the cost of each member's projected benefit as a level amount or a level percentage of pay over the career, which front-loads cost relative to PUC. Aggregate methods spread the whole unfunded present value over future pay and produce no separate unfunded liability. The method changes the pattern of cost recognition, not the benefits.

## Assumptions and margins

The going-concern basis uses best-estimate economic and demographic assumptions. The discount rate is usually built from the expected return on the plan's asset mix, less investment expenses, with or without an explicit margin. The CIA's standards require the actuary to disclose the margins included and the method used to set the rate.

A provision for adverse deviations (PfAD) is a margin that makes the going-concern liability more conservative than best estimate, usually through a lower discount rate. The rate used is

> $$i_{\text{val}} = i_{\text{BE}} - m$$

- $i_{\text{BE}}$ is the best-estimate discount rate.
- $m$ is the margin for adverse deviation.

The margin lowers the rate and so raises the liability. Some Canadian jurisdictions now prescribe a minimum PfAD for funding, which links the margin to how much of the fund is invested in non-fixed-income assets.

> [!example]- What does a PfAD of 0.5% in the discount rate do to this plan's AAL, normal cost and funded ratio? {Example}
> An ongoing plan's active members have a total accrued pension, on projected pay, of $\$2{,}000{,}000$ a year payable from age 65. The coming year's service adds $\$100{,}000$ a year of projected pension. Treat the members as all aged 50, with a probability of 0.85 of reaching 65 in service and no benefit on earlier exit. The assets are $\$9{,}000{,}000$, the best-estimate rate is 5.5%, and the illustrative annuity factors are $\ddot{a}_{65} = 12.40$ at 5.5% and $12.95$ at 5.0%.
>
> > [!answer]-
> > - Under PUC, each $\$1$ of annual pension from 65 is worth $v^{15}(0.85)\,\ddot{a}_{65}$ today.
> > - At 5.5% that factor is $0.44793(0.85)(12.40) = 4.72121$, so the AAL is $\$9{,}442{,}420$ and the normal cost $\$472{,}121$.
> > - At 5.0% it is $0.48102(0.85)(12.95) = 5.29480$, so the AAL is $\$10{,}589{,}600$ and the normal cost $\$529{,}480$.
> > - The funded ratio is $9{,}000{,}000/9{,}442{,}420 = 95.3\%$ at best estimate and $9{,}000{,}000/10{,}589{,}600 = 85.0\%$ with the margin.
> > - The PfAD raises the AAL and normal cost by about 12%, and the unfunded liability that special payments must amortize grows from $\$442{,}420$ to $\$1{,}589{,}600$.

## Gains and losses

Rolled forward a year with the normal cost and contributions paid at the start of the year, the unfunded liability expected at the next valuation if every assumption is realized is

> $$UAL_{t+1}^{\text{exp}} = \left(UAL_t + NC_t - C_t\right)(1+i)$$

- $i$ is the valuation rate.

The difference between the actual and expected values is the experience gain or loss. It is split by source (investment return, salary increases, mortality, terminations) so that an [[Experience Study|experience study]] can test the assumptions behind it. Assets above expected and a liability below expected are both gains.

> [!example]- What is this plan's gain or loss for the year, split between assets and liabilities? {Example}
> At the last valuation the AAL was $\$30{,}000{,}000$ and the actuarial value of assets $\$27{,}000{,}000$. The normal cost of $\$1{,}200{,}000$ and contributions of $\$1{,}600{,}000$ were paid at the start of the year, benefits of $\$1{,}000{,}000$ were paid at the end, and the valuation rate is 5.5%. A year later the assets are $\$28{,}400{,}000$ and the AAL is $\$31{,}700{,}000$.
>
> > [!answer]-
> > - The expected unfunded liability is $(3{,}000{,}000 + 1{,}200{,}000 - 1{,}600{,}000)(1.055) = \$2{,}743{,}000$.
> > - The actual unfunded liability is $31{,}700{,}000 - 28{,}400{,}000 = \$3{,}300{,}000$, so the plan had a net loss of $\$557{,}000$.
> > - The expected assets are $(27{,}000{,}000 + 1{,}600{,}000)(1.055) - 1{,}000{,}000 = \$29{,}173{,}000$, so the assets fell $\$773{,}000$ short, an investment loss.
> > - The expected AAL is $(30{,}000{,}000 + 1{,}200{,}000)(1.055) - 1{,}000{,}000 = \$31{,}916{,}000$, so the AAL came in $\$216{,}000$ below expected, a liability gain.
> > - The net loss is added to the unfunded liability and amortized by new special payments.

> [!trap] Getting the cash-flow timing wrong in the roll-forward
> Contributions paid at the start of the year earn a full year's interest and benefits paid at year-end earn none. Treating every cash flow as mid-year, or ignoring the timing, misstates the expected unfunded liability and so the gain or loss.

## Going concern and solvency

In Canada the going-concern valuation is paired with a solvency or hypothetical wind-up valuation, which values the benefits as if the plan were [[Plan Termination|wound up]] on the valuation date at settlement rates and with no future salary increases. The legislation sets contributions from both results, under the [[Canadian Pension Legislation#Funding rules|funding rules]]. Using the going-concern basis where a solvency or wind-up liability is asked for usually understates the liability.
