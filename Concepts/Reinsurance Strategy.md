---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b663ba708588b7cce91363729f3b82347c0f53724ca3d816fd3828fd93a16fac
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Strategy.md
---
**Reinsurance Strategy** is the choice of what to cede, in what form and to whom, judged by its effect on the financial statements and on the metrics regulators, rating agencies and investors watch. The forms include [[Quota Share|quota share]], [[Excess of Loss|excess of loss]], catastrophe and [[Aggregate Excess of Loss|aggregate]] covers, and retroactive transfers. Reinsurance lets an insurer use a reinsurer's capital in place of its own, and strategy is deciding when that capital is the cheaper kind.

The net cost of a reinsurance programme is

> $$\text{Net cost} = \text{Ceded premium} - \text{Ceding commission} - E[\text{Ceded losses}]$$

- $E[\text{Ceded losses}]$ is the expected losses the reinsurer pays.

> [!idea] The idea
> Reinsurance gives up expected profit, the reinsurer's margin, for lower required capital and lower variance.

A programme is effective when the capital and volatility it saves are worth more than its net cost, which is a comparison with the [[Cost of Capital|cost of the capital]] it replaces.

## What reinsurance is bought for

Cedar and Thompson list nine functions:

1. Large-line capacity.
2. Catastrophe protection.
3. Surplus relief and capital efficiency.
4. Stabilisation of results.
5. Market entrance.
6. Withdrawal from a segment.
7. Mandatory and voluntary pools.
8. Internal (affiliate) reinsurance.
9. Fronting.

Each starts as a business problem, and the form of cover follows from it.

## Quota share and surplus relief

A quota share cedes premium and losses proportionally. It leaves the loss ratio unchanged, cuts net written premium and so premium-to-surplus, and gives statutory surplus relief through the ceding commission. The immediate statutory surplus relief from ceding unearned premium on a pro rata treaty is

> $$\Delta\text{Surplus}_{\text{SAP}} = \text{Commission rate} \times \text{Ceded UPR}$$

- $\text{Ceded UPR}$ is the unearned premium reserve ceded.
- The commission does not exceed the acquisition cost of the business ceded. Any excess must be deferred as a liability under SSAP No. 62R.

> [!example]- What does this quota share do to the insurer's surplus, leverage and expected profit? {Example}
> An insurer has statutory surplus of $\$200$M, net written premium of $\$600$M a year and unearned premium of $\$300$M. Acquisition costs are $27\%$ of premium, and the expected loss ratio is $68\%$. It buys a $40\%$ quota share covering the in-force unearned premium and next year's writings, with a $25\%$ ceding commission.
>
> > [!answer]-
> > - Ceded unearned premium is $0.40 \times 300 = \$120$M.
> > - The commission is below acquisition cost, so all of it is recognised: surplus rises by $0.25 \times 120 = \$30$M to $\$230$M.
> > - Next year's net written premium is $0.60 \times 600 = \$360$M.
> > - Premium to surplus falls from $600/200 = 3.00$ to $360/230 = 1.57$.
> > - On $\$240$M of ceded premium, the reinsurer expects a margin of $240 \times (1 - 0.68 - 0.25) = \$16.8$M, the expected profit the insurer gives up each year.
> > - Under GAAP the $\$30$M commission reduces DAC instead, so equity does not jump. The relief is statutory.
> > - The trade is sound if the insurer needs the capacity (or the RBC ratio) and $\$16.8$M a year is cheaper than raising the equivalent capital.

## Excess of loss and catastrophe covers

Excess of loss and catastrophe covers leave most premium net, cut the tail and the volatility, and usually cost more than their expected recoveries. Programmes are compared on their net cost and on the protection they give at extreme return periods.

> [!example]- Is this catastrophe cover worth its expected cost? {Example}
> An insurer with $\$500$M of surplus faces a 1-in-100-year hurricane loss of $\$260$M. A catastrophe excess of loss cover of $\$150$M excess of $\$50$M costs $\$18$M, with expected recoveries of $\$6$M. Ignore tax and reinstatement premium.
>
> > [!answer]-
> > - The expected cost is $18 - 6 = \$12$M a year off expected pre-tax income.
> > - In the 1-in-100 event, the recovery is $\min(260 - 50,\ 150) = \$150$M.
> > - The net loss plus premium is $260 - 150 + 18 = \$128$M, leaving surplus of $500 - 128 = \$372$M.
> > - Without the cover, surplus falls to $500 - 260 = \$240$M.
> > - The cover turns a $52\%$ loss of surplus into a $26\%$ loss, for $\$12$M a year.
> > - It also lowers the net modelled catastrophe loss on which the RBC catastrophe charge and rating-agency capital tests are based, so it frees capital even in years without a hurricane.
> > - Whether $\$12$M is worth it depends on what the insurer would otherwise pay to hold the extra capital, and on how its rating and regulators would react to losing half its surplus in one event.

## Metrics for evaluating a programme

A programme is evaluated on:

1. Surplus and the [[Risk-Based Capital|RBC ratio]], with lower premium, reserve and catastrophe charges but a new credit charge on recoverables.
2. [[Insurance Leverage|Premium-to-surplus and reserves-to-surplus]] ratios.
3. Net [[Loss Ratio|loss]], [[Expense Ratio|expense]] and [[Combined Ratio|combined]] ratios.
4. Expected net income and return on surplus.
5. The volatility of earnings and the net [[Probable Maximum Loss|PML]].
6. Counterparty exposure in [[Schedule F]] ([[Reinsurance Credit Risk|reinsurance credit risk]]).

[[Key Financial Measures]] defines the ratios.

## Accounting effects

Quota share surplus relief is a statutory effect. Under [[GAAP]] the commission reduces DAC and equity barely moves. A retroactive cover's gain goes to restricted special surplus under SAP, or is deferred under GAAP. A contract that fails risk transfer is a deposit and delivers none of these benefits ([[Insurance Accounting]], [[Deposit Accounting]]).

> [!trap] Counting quota share surplus relief under GAAP
> The ceding commission raises statutory surplus at once, but under GAAP it reduces deferred acquisition costs and equity barely moves. Say which basis a surplus or leverage figure is on before crediting the treaty with relief.
