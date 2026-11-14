---
aliases:
  - Cost Recognition
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e73c0b21506d7d2c4ac39ac4dbbd23865b9a04ecf15c5fb1af75d15a5de1e316
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actuarial Cost Method.md
---

An **Actuarial Cost Method** is the rule a [[Defined Benefit Plan|defined benefit]] [[Pension Plan|pension plan]] valuation uses to split the present value of each member's future benefits into an [[Actuarial Accrued Liability|actuarial accrued liability]] for the past and a series of [[Normal Cost|normal costs]] for the years still to come. The benefits and the assumptions fix the total cost, and the method decides only when that cost is recognized over a member's career, the pattern of cost recognition.

For a member aged $x$, every method splits the present value of future benefits as

> $$PVFB_x = AL_x + PVFNC_x$$

- $PVFB_x$ is the present value of all projected benefits.
- $AL_x$ is the accrued liability.
- $PVFNC_x$ is the present value of future normal costs.

A cost method changes the timing of contributions, not the total cost of the plan. Only the benefits, the actual experience and the investment return decide what the plan finally costs.

## Unit credit methods

The unit credit methods are accrued benefit methods. The [[Projected Unit Credit Method|projected unit credit]] (PUC) method values the [[Accrued Benefit|benefit accrued]] to date on salary projected by the [[Salary Scale|salary scale]]. Its normal cost for a member aged $x$ who retires at age $r$ is one more year's accrual on the same projected salary,

> $$NC_x^{\text{UC}} = \alpha\,\hat{S}\,v^{\,r-x}\,{}_{r-x}p_x^{(\tau)}\,\ddot{a}_r$$

- $\alpha$ is the accrual rate.
- $\hat{S}$ is the pensionable salary the benefit will be based on.
- $v = 1/(1+i)$ is the discount factor at the valuation interest rate $i$.
- ${}_{r-x}p_x^{(\tau)}$ is the probability of staying in service to $r$, from the [[Service Table|service table]].
- $\ddot{a}_r$ is the value at $r$ of a pension of 1 a year.

The [[Traditional Unit Credit Method|traditional unit credit]] (TUC) method values the benefit on today's salary. Its normal cost is the increase in that accrued benefit over the year, so when pay is expected to rise it also pays to raise every past year's benefit to the new salary.

Under both, the normal cost for one member rises steeply with age, because the same year of benefit is discounted over a shorter period and is more likely to be paid. A stable open group's total unit credit cost can still be level as a share of payroll. It rises for a closed or ageing group.

> [!trap] Leaving the past accruals out of the TUC normal cost
> Under TUC the year's normal cost includes the cost of raising past accruals to the new salary. Forgetting that piece understates the TUC normal cost, especially for an older member.

## Entry age normal method

The entry age normal (EAN) method is a projected benefit method. It spreads each member's projected benefit evenly from entry to retirement, as a level percentage $k$ of pay or as a level dollar amount. For a member who entered at age $e$, the level percentage of pay is

> $$k^{\text{EAN}} = \frac{PVFB_e}{PVFS_e}$$

- $PVFB_e$ is the present value at entry of the projected benefits.
- $PVFS_e$ is the present value at entry of future salaries, projected by the salary scale.

The level dollar version divides by an annuity of 1 a year instead of the present value of future salaries. The accrued liability is whatever the level cost would have built up by now,

> $$AL_x = PVFB_x - k\,PVFS_x$$

- $PVFS_x$ is the present value at age $x$ of future salaries.

The cost is front-loaded relative to unit credit, so the EAN liability is larger at any age before retirement.

> [!example]- How do the PUC and EAN normal costs of this member compare at ages 35, 50 and 64? {Example}
> A plan pays 1.5% of the salary in the year before retirement for each year of service, from age 65. A member enters at 35 on a salary of \$50,000, and salaries rise 3% a year. Use $i = 6\%$, $\ddot{a}_{65} = 12.0$, and ignore all decrements before 65. Take EAN as a level percentage of pay.
>
> > [!answer]-
> > - The salary at 64 is $\hat{S} = 50{,}000(1.03)^{29} = \$117{,}828.28$.
> > - The PUC normal cost at age $x$ is one year's accrual on $\hat{S}$, discounted to $x$: $0.015(117{,}828.28)(12.0)(1.06)^{-(65-x)}$.
> > - That is \$3,692.72 at 35, \$8,849.81 at 50 and \$20,008.58 at 64, or 7.39%, 11.36% and 16.98% of that year's salary.
> > - For EAN, the projected pension is $30(0.015)\hat{S} = \$53{,}022.72$, so $PVFB_{35} = 53{,}022.72(12.0)(1.06)^{-30} = \$110{,}781.52$.
> > - The present value of 30 years of salary at entry uses the ratio $1.03/1.06$: $PVFS_{35} = \$1{,}020{,}053.92$.
> > - So $k = 110{,}781.52 / 1{,}020{,}053.92 = 10.86\%$ of pay, and the EAN normal costs are \$5,430.18, \$8,460.04 and \$12,796.57 at the three ages.
> > - EAN charges more than PUC early in the career and less near retirement. At 50 its accrued liability is \$160,897 against PUC's \$132,747.
> > - Both methods fund the same pension by 65. EAN recognizes the cost sooner.

## Aggregate method

The aggregate method has no accrued liability and so no unfunded liability. The present value of benefits not already covered by assets is spread over the future salaries of the current members, so the normal cost rate is

> $$k^{\text{agg}} = \frac{\sum PVFB_x - AVA}{\sum PVFS_x}$$

- The sums are over the current members.
- $AVA$ is the actuarial value of assets, from the [[Asset Valuation Method|asset valuation method]].

Every gain and loss is absorbed into future normal costs automatically. There is no separate amortization payment, so adding one on top of the normal cost counts the unfunded benefits twice.

> [!example]- What is this plan's normal cost under the aggregate method, before and after an investment loss? {Example}
> A plan funded by the aggregate method has a present value of future benefits of \$40 million, assets of \$25 million, a present value of future salaries of \$150 million and a payroll of \$10 million this year. Then an investment loss leaves assets at \$22 million instead.
>
> > [!answer]-
> > - The unfunded part of the benefits is spread over all future pay, so $k = (40 - 25)/150 = 10\%$.
> > - The normal cost is $0.10(10{,}000{,}000) = \$1{,}000{,}000$.
> > - After the loss, $k = (40 - 22)/150 = 12\%$, and the normal cost rises to \$1,200,000.
> > - The \$3 million loss never appears as an unfunded liability. It is folded into the contribution rate and recovered over the members' remaining careers, which is why aggregate methods are smooth but hide the size of a deficit.

## Frozen initial liability and attained age normal methods

The frozen initial liability method fixes an unfunded liability at inception, by entry age in the usual form, and amortizes it separately. It then runs the aggregate method on the rest. The attained age normal method funds the past service benefit as a unit credit liability and spreads only the future accruals over future pay, from today's age.

## Individual and aggregate methods

Unit credit and EAN are individual methods with a separate amortization of the unfunded liability, so the year's contribution, $C$, is

> $$C = NC + \text{amortization of }(AL - AVA)$$

Aggregate methods spread cost over the group, so their results depend on the plan's demographics as well as each member's own.

## Choosing a method

Funding regulations limit the choice. Canadian going-concern funding commonly uses PUC, and ASC 715 and IAS 19 require a unit credit attribution of benefits to service for accounting, so a member's accounting service cost may differ from the funding normal cost. Public sector plans often fund on EAN level percent of pay because it gives a stable contribution rate as a share of payroll.
