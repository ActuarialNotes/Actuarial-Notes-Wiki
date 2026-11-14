---
aliases:
  - Shared Risk Plan
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ae7c4a3586dffea1623d71d6b329b7f632e20866d2b38f5fe3cbef7f84411fda
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Target Benefit Plan.md
---
A **Target Benefit Plan** (TBP) is a [[Retirement Plan|retirement plan]] in which contributions are fixed, or may move only within a narrow band, while the benefit formula sets a *target* pension that can be raised or cut, for accrued as well as future service, according to the plan's funded status. Funding risk falls on the members as a group rather than on a [[Plan Sponsor|sponsor]] that pays whatever the benefits cost.

The contribution for year $t$ is a rate times the covered payroll $S_t$:

> $$C_t = c\,S_t$$

- $c$ is the contribution rate, held inside a band, $c_{\min} \le c \le c_{\max}$.

The plan's position is measured by its funded ratio, which is

> $$FR_t = \frac{A_t}{L_t}$$

- $A_t$ is the fund.
- $L_t$ is the liability for the target benefits accrued to date.

A written [[Funding Policy|funding policy]] fixes in advance which actions are taken, and in what order, when the plan is in surplus or deficit.

## Comparison with DB and DC plans

| | DB plan | Target benefit plan | DC plan |
| :--- | :--- | :--- | :--- |
| Contributions | Whatever the benefits cost | Fixed, or within a band | Fixed |
| Benefit | Lifetime pension from a formula | Target lifetime pension, adjustable | Individual account balance |
| Who bears funding shocks | The sponsor | All members, active and retired, smoothed by the funding policy | Each member, in their own account |

Like a [[Defined Benefit Plan|DB plan]], a TBP pools assets and pools longevity risk among the members. Like a [[Defined Contribution Plan|DC plan]], it caps the employer's cost, so investment, interest-rate and longevity shocks end up in the benefits. The employer bears little beyond its share of a contribution increase within the band. The timing of the adjustments decides which cohort of members pays. Cutting accrued benefits spreads a loss across retirees and actives, while relying only on future accruals and contributions loads it onto younger members.

## Base and ancillary benefits

Most designs split the target into a base pension, which the policy aims to protect, and ancillary benefits, such as indexation or early retirement subsidies, which are granted only when funding allows. Adjustments run down a ladder:

1. Ancillary benefits are withheld first.
2. Contributions rise within the band next.
3. Accrued base benefits are cut only as a last resort.

On the way back up, restoring past cuts comes before granting new ancillary benefits.

Under an illustrative policy that pays inflation only while the funded ratio after the increase stays at or above a threshold $FR^{*}$, the indexation granted is

> $$I_t = \min\left(\text{CPI}_t,\ \max\left(0,\ \frac{A_t}{FR^{*}\,L_t} - 1\right)\right)$$

- $\text{CPI}_t$ is the year's inflation.

The uniform cut to accrued benefits that restores full funding is

> $$k_t = 1 - \frac{A_t + PV_t^{\Delta C}}{L_t}$$

- $PV_t^{\Delta C}$ is the present value of any contribution increase, counted before the cut.

> [!example]- What indexation is granted at the first valuation, and what action is taken at the second? {Example}
> A target benefit plan's illustrative funding policy has three steps. Inflation indexation is granted only to the extent the funded ratio after it stays at or above 105%. Below 100%, the contribution rate rises by 1% of pay for 15 years. If the plan is still below 100% after that increase, accrued benefits are cut uniformly to restore full funding.
>
> | Valuation | Fund | Liability before indexation | Inflation |
> | :--- | ---: | ---: | ---: |
> | First | $\$1{,}080$ million | $\$1{,}000$ million | 2% |
> | Second | $\$900$ million | $\$1{,}040$ million | |
>
> At the second valuation, payroll is $\$300$ million and is expected to grow 3% a year, and the valuation rate is 5%.
>
> > [!answer]-
> > - At the first valuation the plan can afford up to $1{,}080/1{,}050 - 1 = 2.86\%$ of indexation before it falls below 105%.
> > - So the full 2% is granted, and the funded ratio becomes $1{,}080/1{,}020 = 105.9\%$.
> > - At the second valuation the funded ratio is $900/1{,}040 = 86.5\%$, so there is no indexation.
> > - The contribution increase is a growing annuity-due of 1% of payroll, valued with $q = 1.03/1.05$.
> > - Its present value is $PV^{\Delta C} = 3 \times (1 - q^{15})/(1 - q) = 3 \times 13.156 = 39.47$ million.
> > - That lifts the funded ratio only to $(900 + 39.47)/1{,}040 = 90.3\%$.
> > - The cut is $k = 1 - 90.3\% = 9.67\%$, so every member's accrued pension, retirees' included, is cut by 9.67%.
> > - In a DB plan the same $\$140$ million deficit would be the sponsor's, funded by special payments of about $\$12.8$ million a year, paid at the start of each year, over 15 years at 5%.
> > - If markets recover, the policy's first use of surplus is to restore the 9.67% cut, and indexation resumes only after that.

## Shared risk plans

New Brunswick's **shared risk plan** is the best-known regulated form. Its 2012 framework requires the funding policy to pass a stochastic risk management test, under which base benefits should have at least a 97.5% probability of not being reduced over 20 years. The plan must also carry a deficit recovery plan and a surplus utilization plan that act automatically on the open group funded ratio. Several other provinces have since adopted target benefit rules of their own.

## The CIA Task Force

The Canadian Institute of Actuaries' 2015 *Report of the Task Force on Target Benefit Plans* sets out how such plans should be designed and run. Its recommendations include:

- a board that answers to all members;
- a funding policy with explicit margins, and a benefit adjustment policy;
- a clear statement to members that benefits can fall;
- fairness between generations when deficits and surpluses are shared.

## Related designs

Collective DC plans, as in the Netherlands and the U.K., and the *defined ambition* designs in the RET-101 readings follow the same logic of a fixed contribution and a flexible, pooled pension. The [[Multi-Employer Plan|multi-employer plan]], whose negotiated contributions fix what the trustees can promise, is the older North American form of the same idea.

> [!trap] Calling the target a guarantee
> The target is not a promise. Calling a TBP's benefit "guaranteed", or treating a deficit as the employer's debt, describes a DB plan. Calling it DC misses the pooled lifetime pension paid from a formula.
