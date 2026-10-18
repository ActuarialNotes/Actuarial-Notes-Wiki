---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:2485bfa452b1ef3b852c2882f059b578a22e8abaaac508c653fa1ec3d620aa27
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §2.3.1, §4.2.1, §4.3.2.2, §4.3.3.1, §4.3.3.2, §4.3.3.3, §4.3.3.4, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Registered Reinsurance.md
---

**Registered Reinsurance** is reinsurance ceded to a reinsurer that is licensed by [[OSFI]] to reinsure risks in Canada. The distinction matters because the [[MCT]] gives **capital credit** for liabilities ceded to a registered reinsurer, whereas [[Unregistered Reinsurance|unregistered]] cessions require collateral before credit is allowed.

- **Why registration exists.** OSFI can examine, set capital requirements for, and if necessary intervene in a registered reinsurer. It has no such power over a reinsurer operating entirely outside Canada, so the capital framework substitutes **collateral** for supervision.
- **The capital consequence.** Amounts receivable and recoverable from an unregistered reinsurer, to the extent they are not covered by amounts payable to it or by acceptable collateral, are **deducted from [[Capital Available]]**; credit is given for unregistered reinsurance only where it is secured by acceptable collateral. Without registration or collateral, the cedant gets the accounting recoverable but **no capital credit** for it.
- **Not a substitute for counterparty analysis.** Registration means OSFI supervises the reinsurer; it does not mean the reinsurer is strong. The cedant remains liable to its policyholders regardless of the reinsurer's condition, so [[Rating Agency|rating]], concentration by reinsurer, and dispute history all still matter — and under [[IFRS 17]] the **non-performance risk** allowance on the [[Reinsurance Contracts Held|reinsurance asset]] must reflect them.
- **OSFI's reinsurance guidance** (the B-3 sound reinsurance practices expectations) requires a documented reinsurance risk management policy, due diligence on counterparties, limits on concentration, and confirmation that ceded risks are within the insurer's stated risk appetite.
- **The cedant is never released.** Reinsurance is a contract between insurer and reinsurer; the policyholder has no claim against the reinsurer. A reinsurer's insolvency converts a recoverable asset into a loss, which is why concentration limits exist.

![[Media/Figures/Registered_Reinsurance.svg|340]]

> [!example]- Capital Credit and the Registration Status {Example}
> An insurer cedes $\$120$ million of claim liabilities: $\$80$ million to registered reinsurers, $\$25$ million to an unregistered reinsurer with $\$25$ million of acceptable collateral, and $\$15$ million to an unregistered reinsurer with no collateral. Its gross minimum capital required under the [[MCT]], before reinsurance credit, is $\$210$ million, and in this example ceded liabilities reduce it by $18\%$ of the amount credited.
>
> Compute minimum capital required, and the deduction from capital available.
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
> > \text{MCR} &= \$210\text{M} - 0.18(\$105\text{M}) \\
> > &= \$210\text{M} - \$18.9\text{M} \\
> > &= \$191.1\text{M}
> > \end{align*}$$
> >
> > **The $\$15$ million is deducted from capital available.** The insurer pays reinsurance premium and records a $\$15$ million recoverable in its financial statements, but the recoverable is not covered by collateral or by amounts payable to the reinsurer, so the **$\$15$ million is deducted from capital available** — from a capital standpoint it has bought nothing.
> >
> > **What to do about it.** Three options: obtain collateral (a letter of credit or funds withheld) from that reinsurer; move the cession to a registered reinsurer at renewal; or accept the capital cost knowingly, which is a legitimate choice only if the board has been told.
> >
> > **The lesson for reinsurance purchasing:** the capital effect of a treaty is not determined by its terms alone. Where it is placed, and whether that placement is secured, can be worth as much as the coverage itself — and it is a question the [[Appointed Actuary]] should be asked before the treaty is bound, not after.
