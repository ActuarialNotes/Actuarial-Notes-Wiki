---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b87b2aa28d9c04a7d5e69c4c77852ca138d3a4bcf490bb1afb255470888ebc61
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Appetite.md
---

**Risk Appetite** is the amount and type of risk an insurer's board is willing to accept in pursuit of its objectives, expressed in a **risk appetite framework**: a qualitative statement, quantitative limits and tolerances, and the governance that monitors and enforces them. [[OSFI]]'s [[Corporate Governance]] guideline makes the board's ownership of it explicit.

- **The structure of a framework:**
  - **Risk appetite statement** — the board's qualitative articulation of what risks the insurer takes and why.
  - **Risk limits** — quantitative boundaries: catastrophe [[Probable Maximum Loss|PML]] as a percentage of capital, maximum single-risk exposure, [[Internal Target Capital Ratio|internal capital target]], counterparty concentration limits, asset allocation ranges.
  - **Tolerances and triggers** — the point at which a breach requires escalation, and to whom.
  - **Monitoring and reporting** — regular measurement against limits, with breaches reported to the board.
- **Appetite is not capacity.** *Capacity* is the maximum risk the insurer could bear before failing; *appetite* is how much of that capacity the board chooses to use. The gap between them is deliberate, and a framework that sets appetite at capacity has no margin at all.
- **It must bind decisions.** A framework that does not stop transactions is decorative. The test is whether a profitable opportunity outside appetite has ever been declined — if not, the limits are not limits.
- **It connects to everything else on the syllabus.** [[ORSA]] translates appetite into an internal capital target; [[FCT]] tests whether the position holds under scenarios consistent with it; reinsurance buying implements the catastrophe limits; and the pricing function operates within the underwriting ones.
- **Breaches are the informative events.** How an insurer responds to a limit breach — escalation, remediation, or quiet revision of the limit — tells a supervisor more about its risk culture than the framework document does.

> [!example]- Is the Transaction Within Appetite? {Example}
> An insurer's risk appetite framework states: net catastrophe PML at $1$-in-$250$ shall not exceed $20\%$ of capital available; no single reinsurer shall hold more than $25\%$ of ceded recoverables; and the MCT ratio shall not fall below the $185\%$ internal target under the business plan.
>
> An underwriting team proposes a large coastal property account: premium $\$18$ million, expected combined ratio $88\%$. It would raise net $1$-in-$250$ PML from $\$62$ million to $\$79$ million, and the reinsurance supporting it would raise the largest reinsurer's share of recoverables from $22\%$ to $28\%$. Capital available is $\$395$ million; projected MCT after the account is $181\%$.
>
> Should it be written?
>
> > [!answer]-
> > **Test each limit.**
> >
> > $$\begin{align*}
> > \text{PML} &: \frac{\$79\text{M}}{\$395\text{M}} = 20.0\% \quad \text{— at the limit} \\[6pt]
> > \text{Reinsurer} &: 28\% > 25\% \quad \text{— breach} \\[6pt]
> > \text{MCT} &: 181\% < 185\% \quad \text{— breach}
> > \end{align*}$$
> >
> > **Two limits breached and a third exactly at its boundary. The account is outside appetite and should not be written as proposed** — notwithstanding an attractive $88\%$ expected combined ratio. That is precisely the situation the framework exists for: profitable business is the only kind anyone is ever tempted to write outside appetite.
> >
> > **What could make it writable:**
> >
> > - **Restructure the reinsurance** — place the supporting cover with a different reinsurer to keep the concentration below $25\%$. This addresses one breach at essentially no cost.
> > - **Buy more catastrophe cover** to hold the net PML down, accepting the premium cost against the account's margin.
> > - **Write a share of the account** rather than all of it, scaling the exposure to fit.
> > - **Take it to the board** for an explicit, documented exception with a time limit and a remediation plan.
> >
> > **What is not acceptable** is writing it and revising the limits afterwards. A framework amended each time it binds is not a risk appetite framework, and a supervisor reviewing the insurer's [[ORSA]] will read the amendment history exactly that way.
