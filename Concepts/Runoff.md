---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b7df4878d4a029b14bf492da4e1f31e9fa8445bb6776ca834cb89d074201047d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Runoff.md
---

![[Media/Figures/Runoff.svg|340]]

**Runoff** is the state of an insurer, or a block of business, that has stopped writing new policies and is paying out its existing obligations until they are exhausted. Valuing a run-off differs from valuing a going concern, and the [[Canadian Institute of Actuaries (CIA)]] has issued guidance on the assumptions that change.

A going-concern insurer spreads overhead across new and existing business and can reprice. A run-off insurer has a **fixed** expense base falling on a **shrinking** book. A run-off valuation therefore reconsiders four assumptions:

1. **Expenses.** The provision covers the full cost of claims handling and administration until the last claim closes, including retention of key staff, systems and premises. This is usually the largest adjustment.
2. **Claims behaviour.** Claimants and their counsel behave differently against an insurer known to be in run-off, and settlement strategy often changes toward closing files faster.
3. **[[Reinsurance Contracts Held|Reinsurance]] collectability.** Recoveries stretch over decades, so counterparty credit exposure lengthens and disputes become more likely. [[Commutations]] become attractive to both sides.
4. **Investment strategy and [[Duration|duration]].** A run-off portfolio is matched to a fixed, declining payout pattern rather than to an ongoing business.

> [!example]- What expense provision does this block need in run-off? {Example}
> An insurer places a $\$220$ million claim liability block (discounted, going-concern basis) into run-off. As a going concern, unallocated claims expense was assumed at $3\%$ of the liability. In run-off, the block will take eight years to extinguish. The dedicated claims and administration team will cost $\$6$ million in year 1, declining $15\%$ a year, paid at the start of each year. The discount rate is $4\%$.
>
> > [!answer]-
> > - The going-concern provision is $0.03 \times \$220\text{M} = \$6.6\text{M}$.
> > - The run-off costs form a geometric series with ratio $0.85/1.04 = 0.81731$ over eight years.
> > - Their present value is $\$6\text{M} \times \dfrac{1 - 0.81731^{8}}{1 - 0.81731} = \$6\text{M} \times 4.3838 = \$26.3\text{M}$.
> > - The run-off provision is four times the going-concern provision, an increase of nearly $\$20$ million on a liability whose claims have not changed.
> > - The $3\%$ assumption allocated a share of an expense base supported by ongoing premium. In run-off there is no premium, and expenses do not scale down as fast as the liability does.
> > - The [[Risk Adjustment for Non-Financial Risk|risk adjustment]] should also rise, because a run-off block cannot absorb adverse experience with future premium.
> > - The [[Insurance Risk Margin]] falls as liabilities run off, but the block generates no new capital, so the [[MCT]] ratio depends entirely on the adequacy of the capital already there.

## Voluntary run-off and wind-up

A solvent run-off is an orderly business decision. A **wind-up** follows insolvency, and there the valuation basis changes again: claims are paid in order of priority, [[PACICC]] is involved, and assets may not cover liabilities.

## Run-off in financial condition testing

The [[FCT]] solvency scenarios ask, in effect, a run-off question: could the insurer meet its obligations if it stopped writing? A [[Subsequent Events|subsequent event]] that makes the insurer no longer a going concern changes the valuation basis entirely, not merely the amounts.

> [!trap] Keeping the going-concern expense assumption
> A per-policy expense allocation understates the cost of running a block to extinction, because the staff, systems and premises must be kept until the last claim closes. Re-estimate expenses as the full cost of the run-off, as in the example, where the provision rose from $\$6.6$ million to $\$26.3$ million.
