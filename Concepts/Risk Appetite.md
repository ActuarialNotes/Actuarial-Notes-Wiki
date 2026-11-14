---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3c744312c8d811e2ed086a805b0a04041aaa808ef7f4ce463e9f1e29f96a8bb8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Appetite.md
---

![[Media/Figures/Risk_Appetite.svg|340]]

**Risk Appetite** is the amount and type of risk an insurer's board is willing to accept in pursuit of its objectives, expressed in a **risk appetite framework**: a qualitative statement, quantitative limits and tolerances, and the governance that monitors and enforces them. [[OSFI]]'s [[Corporate Governance]] guideline makes the board's ownership of it explicit.

A risk appetite framework has four parts:

1. **Risk appetite statement** — the board's qualitative articulation of what risks the insurer takes and why.
2. **Risk limits**, the quantitative boundaries. Examples are a catastrophe [[Probable Maximum Loss|PML]] as a percentage of capital, a maximum single-risk exposure, the [[Internal Target Capital Ratio|internal capital target]], counterparty concentration limits and asset allocation ranges.
3. **Tolerances and triggers**, the point at which a breach requires escalation, and to whom.
4. **Monitoring and reporting**, the regular measurement against limits, with breaches reported to the board.

## Risk appetite and risk capacity

**Risk capacity** is the maximum risk the insurer could bear before failing. Risk appetite is how much of that capacity the board chooses to use. The gap between them is deliberate.

## Using the framework

A framework must bind decisions. The test is whether a profitable opportunity outside appetite has ever been declined. If not, the limits are not limits.

The framework connects to the rest of risk management. [[ORSA]] translates appetite into an internal capital target, [[FCT]] tests whether the position holds under scenarios consistent with it, reinsurance buying implements the catastrophe limits, and pricing operates within the underwriting limits.

How an insurer responds to a limit breach, by escalation, remediation or quiet revision of the limit, tells a supervisor more about its risk culture than the framework document does.

> [!example]- Should the insurer write this coastal property account? {Example}
> The insurer's risk appetite framework sets three limits:
>
> | Limit | Threshold |
> | :--- | :--- |
> | Net 1-in-250 catastrophe PML | At most $20\%$ of capital available |
> | Largest reinsurer's share of ceded recoverables | At most $25\%$ |
> | MCT ratio under the business plan | At least the $185\%$ internal target |
>
> The account has $\$18$ million of premium and an expected combined ratio of $88\%$. Writing it would raise the net 1-in-250 PML from $\$62$ million to $\$79$ million and the largest reinsurer's share from $22\%$ to $28\%$. Capital available is $\$395$ million, and the projected MCT ratio after the account is $181\%$.
>
> > [!answer]-
> > - The PML would be $\$79\text{M} / \$395\text{M} = 20.0\%$ of capital available, exactly at the limit.
> > - The largest reinsurer's share of $28\%$ is above $25\%$, a breach.
> > - The MCT ratio of $181\%$ is below $185\%$, a breach.
> > - Placing the supporting cover with another reinsurer, buying more catastrophe cover, writing a share of the account, or a documented board exception could each bring it within appetite.
> > - With two limits breached, the account is outside appetite and should not be written as proposed, despite its $88\%$ expected combined ratio.

> [!trap] Revising a limit after it binds
> Writing the account and then raising the limit to fit it defeats the framework. A framework amended each time it binds is not a risk appetite framework, and a supervisor reviewing the insurer's [[ORSA]] will read the amendment history that way.
