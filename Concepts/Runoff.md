---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f0ff130007765a0210ec3639fcd335a37b3e5ba4d561292ea293922868b6c62e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Runoff.md
---

**Runoff** is the state of an insurer, or a block of business, that has stopped writing new policies and is paying out its existing obligations until they are exhausted. Valuing a run-off differs from valuing a going concern, and the [[Canadian Institute of Actuaries (CIA)]] has issued guidance on the assumptions that change — which is why run-off appears in the [[FCT]] and professional-responsibility parts of the syllabus.

- **Why the valuation changes.** A going-concern insurer spreads overhead across new and existing business and can reprice; a run-off insurer has a **fixed** expense base falling on a **shrinking** book. Expense assumptions must therefore reflect the cost of running the block to extinction, not a per-policy allocation.
- **What must be reconsidered in a run-off valuation:**
  - **Expenses** — the full cost of claims handling and administration until the last claim closes, including retention of key staff, systems and premises. This is usually the largest adjustment and it is usually understated.
  - **Claims behaviour** — claimants and their counsel behave differently against an insurer known to be in run-off, and settlement strategy often changes toward closing files faster.
  - **[[Reinsurance Contracts Held|Reinsurance]] collectability** — recoveries stretch over decades, so counterparty credit exposure lengthens and disputes become more likely. [[Commutations]] become attractive to both sides.
  - **Investment strategy and [[Duration]]** — a run-off portfolio is matched to a fixed, declining payout pattern rather than to an ongoing business.
- **Voluntary run-off versus wind-up.** A solvent run-off is an orderly business decision; a **wind-up** follows insolvency, and there the valuation basis changes again — priority of claims, [[PACICC]]'s involvement, and the fact that assets may not cover liabilities.
- **[[FCT]] solvency scenarios** ask, in effect, a run-off question: could the insurer meet its obligations if it stopped writing? That is why FCT's addition of solvency scenarios to the old DCAT framework matters.
- **[[Subsequent Events]] interact**: an event that makes the insurer no longer a going concern changes the valuation basis entirely, not merely the amounts.

> [!example]- Valuing a Block in Run-Off {Example}
> An insurer places a $\$220$ million (discounted, going-concern basis) claim liability block into run-off. As a going concern, unallocated claims expense was assumed at $3\%$ of the liability. In run-off, the block will take eight years to extinguish, and the dedicated claims and administration team will cost $\$6$ million in year 1, declining $15\%$ per year.
>
> Re-estimate the expense provision at a $4\%$ discount rate, and comment.
>
> > [!answer]-
> > **Going-concern provision:**
> >
> > $$0.03 \times \$220\text{M} = \$6.6\text{M}$$
> >
> > **Run-off provision.** Costs of $\$6$M declining at $15\%$, discounted at $4\%$, over eight years — a geometric series with ratio $0.85/1.04 = 0.81731$:
> >
> > $$\begin{align*}
> > \text{PV} &= \$6\text{M} \times \frac{1 - 0.81731^{8}}{1 - 0.81731} \\
> > &= \$6\text{M} \times \frac{1 - 0.19899}{0.18269} \\
> > &= \$6\text{M} \times 4.3844 \\
> > &= \$26.3\text{M}
> > \end{align*}$$
> >
> > **Four times the going-concern provision** — an increase of nearly $\$20$ million, on a liability whose *claims* have not changed at all.
> >
> > **Why the gap is so large.** The $3\%$ assumption allocated a share of an expense base supported by ongoing premium. In run-off there is no premium, the team must be retained (and paid more to stay, since their jobs end when the work does), and systems and premises must be maintained until the last claim closes. Expenses do not scale down as fast as the liability does.
> >
> > **What else must change:**
> >
> > - **[[Reinsurance Contracts Held|Reinsurance]]** recoveries now run eight years against a counterparty with no ongoing relationship to protect. The non-performance allowance should rise, and [[Commutations]] should be evaluated.
> > - **[[Risk Adjustment for Non-Financial Risk|Risk adjustment]]** should rise: a run-off block cannot absorb adverse experience with future premium.
> > - **Capital.** The [[Insurance Risk Margin]] falls as liabilities run off, but the block generates no new capital, so the [[MCT]] ratio depends entirely on the adequacy of what is already there — which is precisely the [[FCT]] solvency scenario question.
