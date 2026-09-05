---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8d55bd2ffb89c90fda67f8055a402b9565b77a7cd7128da2043aeeefeaa3ab37
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Registered Reinsurance.md
---

**Registered Reinsurance** is reinsurance ceded to a reinsurer that is licensed by [[OSFI]] to reinsure risks in Canada. The distinction matters because the [[MCT]] gives **full capital credit** for liabilities ceded to a registered reinsurer, whereas [[Unregistered Reinsurance|unregistered]] cessions require collateral before credit is allowed.

- **Why registration exists.** OSFI can examine, set capital requirements for, and if necessary intervene in a registered reinsurer. It has no such power over a reinsurer operating entirely outside Canada, so the capital framework substitutes **collateral** for supervision.
- **The capital consequence.** Ceded [[Insurance Contract Liabilities]] reduce the cedant's [[Capital Required]] and its [[Base Solvency Buffer]] only where the reinsurer is registered — or where an unregistered cession is secured by acceptable collateral. Without one or the other, the cedant gets the accounting recoverable but **no capital relief**.
- **Not a substitute for counterparty analysis.** Registration means OSFI supervises the reinsurer; it does not mean the reinsurer is strong. The cedant remains liable to its policyholders regardless of the reinsurer's condition, so [[Rating Agency|rating]], concentration by reinsurer, and dispute history all still matter — and under [[IFRS 17]] the **non-performance risk** allowance on the [[Reinsurance Contracts Held|reinsurance asset]] must reflect them.
- **OSFI's reinsurance guidance** (the B-3 sound reinsurance practices expectations) requires a documented reinsurance risk management policy, due diligence on counterparties, limits on concentration, and confirmation that ceded risks are within the insurer's stated risk appetite.
- **The cedant is never released.** Reinsurance is a contract between insurer and reinsurer; the policyholder has no claim against the reinsurer. A reinsurer's insolvency converts a recoverable asset into a loss, which is why concentration limits exist.

> [!example]- Capital Credit and the Registration Status {Example}
> An insurer cedes $\$120$ million of claim liabilities: $\$80$ million to registered reinsurers, $\$25$ million to an unregistered reinsurer with $\$25$ million of acceptable collateral, and $\$15$ million to an unregistered reinsurer with no collateral. Its gross [[Base Solvency Buffer]] before reinsurance credit is $\$210$ million, and ceded liabilities reduce the buffer by $18\%$ of the amount credited.
>
> Compute the buffer.
>
> > [!answer]-
> > **Credited cessions:**
> >
> > $$\begin{align*}
> > &= \$80\text{M} \text{ (registered)} \\
> > &\quad + \$25\text{M} \text{ (collateralised)} \\
> > &\quad + \$0 \text{ (uncollateralised, unregistered)} \\
> > &= \$105\text{M}
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{Buffer} &= \$210\text{M} - 0.18(\$105\text{M}) \\
> > &= \$210\text{M} - \$18.9\text{M} \\
> > &= \$191.1\text{M}
> > \end{align*}$$
> >
> > **The $\$15$ million gets nothing.** The insurer pays reinsurance premium, records a $\$15$ million recoverable in its financial statements, and receives **no capital relief whatsoever** — so from a capital standpoint it has bought nothing.
> >
> > **What to do about it.** Three options: obtain collateral (a letter of credit or funds withheld) from that reinsurer; move the cession to a registered reinsurer at renewal; or accept the capital cost knowingly, which is a legitimate choice only if the board has been told.
> >
> > **The lesson for reinsurance purchasing:** the capital effect of a treaty is not determined by its terms alone. Where it is placed, and whether that placement is secured, can be worth as much as the coverage itself — and it is a question the [[Appointed Actuary]] should be asked before the treaty is bound, not after.
