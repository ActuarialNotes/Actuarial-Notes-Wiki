---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8d9130e444ee6c492227b2ac9e78b8594da0b56599b71e3044b30ba6f3d910e0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Strategy.md
---

**Reinsurance Strategy** is the choice of what to cede, in what form and to whom — [[Quota Share|quota share]], [[Excess of Loss|excess of loss]], catastrophe and [[Aggregate Excess of Loss|aggregate]] covers, retroactive transfers — judged by its effect on the financial statements and on the metrics regulators, rating agencies and investors watch. Reinsurance lets an insurer use a reinsurer's capital in place of its own; strategy is deciding when that capital is the cheaper kind.

> $$\text{Net cost} = \text{Ceded premium} - \text{Ceding commission} - E[\text{Ceded losses}]$$

> $$\Delta\text{Surplus}_{\text{SAP}} = \text{Commission rate} \times \text{Ceded UPR}$$

- The second formula is the immediate **statutory surplus relief** from ceding unearned premium on a pro rata treaty — valid while the commission does not exceed the acquisition cost of the business ceded; any excess must be deferred as a liability under SSAP No. 62R.
- **What reinsurance is bought for.** Cedar and Thompson list nine functions: large-line capacity, catastrophe protection, surplus relief and capital efficiency, stabilisation of results, market entrance, withdrawal from a segment, mandatory and voluntary pools, internal (affiliate) reinsurance, and fronting. Each starts as a business problem; the form of cover follows from it.
- **Pro rata versus excess.** A quota share cedes premium and losses proportionally: it leaves the loss ratio unchanged, cuts net written premium and so premium-to-surplus, and gives statutory surplus relief through the commission. Excess of loss and catastrophe covers leave most premium net, cut the tail and the volatility, and usually cost more than their expected recoveries.
- **Metrics to evaluate:** surplus and the [[Risk-Based Capital|RBC ratio]] (lower premium, reserve and catastrophe charges, but a new credit charge on recoverables); [[Insurance Leverage|premium- and reserves-to-surplus]]; net [[Loss Ratio|loss]], [[Expense Ratio|expense]] and [[Combined Ratio|combined ratios]]; expected net income and return on surplus; the volatility of earnings and the net [[Probable Maximum Loss|PML]]; and counterparty exposure in [[Schedule F]] ([[Reinsurance Credit Risk]]). See [[Key Financial Measures]].
- **Accounting shapes the answer.** Quota share surplus relief is a statutory effect — under [[GAAP]] the commission reduces DAC and equity barely moves. A retroactive cover's gain goes to restricted special surplus (SAP) or is deferred (GAAP). A contract that fails risk transfer is a deposit and delivers none of these benefits ([[Insurance Accounting]], [[Deposit Accounting]]).
- **The trade-off is always the same:** reinsurance gives up expected profit — the reinsurer's margin — for lower required capital and lower variance. A programme is effective when the capital and volatility it saves are worth more than its net cost, which is a comparison with the [[Cost of Capital|cost of the capital]] it replaces.

> [!example]- Quota Share for Surplus Relief {Example}
> An insurer has statutory surplus of $\$200$M, net written premium of $\$600$M a year and unearned premium of $\$300$M. Acquisition costs are $27\%$ of premium; the expected loss ratio is $68\%$. It buys a $40\%$ quota share covering the in-force unearned premium and next year's writings, with a $25\%$ ceding commission.
>
> Evaluate the effect on surplus, leverage and expected profit.
>
> > [!answer]-
> > **Surplus now.** Ceded unearned premium is $0.40 \times 300 = \$120$M. The commission is below acquisition cost, so all of it is recognised:
> >
> > $$
> > \begin{align*}
> > \Delta\text{Surplus} &= 0.25 \times 120 \\
> > &= 30 \\
> > \text{Surplus} &= 200 + 30 \\
> > &= 230
> > \end{align*}
> > $$
> >
> > **Leverage next year:**
> >
> > $$
> > \begin{align*}
> > \text{NWP} &= 0.60 \times 600 \\
> > &= 360 \\
> > \text{Premium to surplus} &= \frac{360}{230} \\
> > &= 1.57
> > \end{align*}
> > $$
> >
> > down from $600/200 = 3.00$.
> >
> > **Cost.** On $\$240$M of ceded premium the reinsurer expects $240 \times (1 - 0.68 - 0.25) = \$16.8$M of margin — expected profit the insurer gives up each year.
> >
> > Under GAAP the $\$30$M commission reduces DAC instead, so equity does not jump: the relief is statutory. The trade is sound if the insurer needs the capacity (or the RBC ratio) and $\$16.8$M a year is cheaper than raising the equivalent capital.

> [!example]- Catastrophe Cover: Expected Cost versus Tail Protection {Example}
> An insurer with $\$500$M of surplus faces a 1-in-100-year hurricane loss of $\$260$M. A catastrophe excess of loss cover of $\$150$M excess of $\$50$M costs $\$18$M, with expected recoveries of $\$6$M. Ignoring tax and reinstatement premium, compare the outcomes.
>
> > [!answer]-
> > **Expected cost:** $18 - 6 = \$12$M a year off expected pre-tax income.
> >
> > **In the 1-in-100 event:**
> >
> > $$
> > \begin{align*}
> > \text{Recovery} &= \min(260 - 50,\ 150) \\
> > &= 150 \\
> > \text{Net loss plus premium} &= 260 - 150 + 18 \\
> > &= 128 \\
> > \text{Surplus with cover} &= 500 - 128 \\
> > &= 372 \\
> > \text{Surplus without} &= 500 - 260 \\
> > &= 240
> > \end{align*}
> > $$
> >
> > The cover turns a $52\%$ loss of surplus into a $26\%$ loss, for $\$12$M a year. It also lowers the net modelled catastrophe loss on which the RBC catastrophe charge and rating-agency capital tests are based, so it frees capital even in years without a hurricane. Whether $\$12$M is worth it depends on what the insurer would otherwise pay to hold the extra capital, and on how its rating and regulators would react to losing half its surplus in one event.
