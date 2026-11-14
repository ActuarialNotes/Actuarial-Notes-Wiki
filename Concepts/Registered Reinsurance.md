---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:be1c539612230abb1820cbbd477e3bd4d1c185fe724be839b12ea29e01ca9084
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §2.3.1, §4.2.1, §4.3.2.2, §4.3.3.1, §4.3.3.2, §4.3.3.3, §4.3.3.4, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Registered Reinsurance.md
---
![[Media/Figures/Registered_Reinsurance.svg|340]]

**Registered Reinsurance** is reinsurance ceded to a reinsurer that is licensed by [[OSFI]] to reinsure risks in Canada. The [[MCT]] gives capital credit for liabilities ceded to a registered reinsurer, whereas [[Unregistered Reinsurance|unregistered]] cessions require collateral before credit is allowed.

OSFI can examine a registered reinsurer, set its capital requirements and, if necessary, intervene in it. It has no such power over a reinsurer operating entirely outside Canada, so the capital framework substitutes collateral for supervision.

## Capital treatment of unregistered reinsurance

Amounts receivable and recoverable from an unregistered reinsurer are deducted from [[Capital Available]] to the extent they are not covered by amounts payable to it or by acceptable collateral. Credit is given for unregistered reinsurance only where it is secured by acceptable collateral. Without registration or collateral, the cedant records the recoverable in its financial statements but gets no capital credit for it.

> [!example]- What does an uncollateralised cession to an unregistered reinsurer buy the cedant, and what can it do about it? {Example}
> An insurer cedes $\$15$ million of claim liabilities to an unregistered reinsurer that has posted no collateral, and owes that reinsurer nothing.
>
> > [!answer]-
> > - The insurer pays reinsurance premium and records a $\$15$ million recoverable in its financial statements.
> > - The recoverable is covered neither by collateral nor by amounts payable to the reinsurer, so the $\$15$ million is deducted from capital available.
> > - From a capital standpoint the cession has bought nothing.
> > - The insurer can obtain collateral from the reinsurer, such as a letter of credit or funds withheld.
> > - It can move the cession to a registered reinsurer at renewal.
> > - It can accept the capital cost knowingly, which is a legitimate choice only if the board has been told.
> > - Where a treaty is placed, and whether the placement is secured, decides its capital effect as much as its terms do, so the [[Appointed Actuary]] should be asked before the treaty is bound.

## Counterparty risk on registered reinsurance

Registration means OSFI supervises the reinsurer. It does not mean the reinsurer is strong. The cedant remains liable to its policyholders regardless of the reinsurer's condition, so [[Rating Agency|rating]], concentration by reinsurer and dispute history all still matter. Under [[IFRS 17]] the non-performance risk allowance on the [[Reinsurance Contracts Held|reinsurance asset]] must reflect them.

Reinsurance is a contract between insurer and reinsurer, and the policyholder has no claim against the reinsurer. A reinsurer's insolvency converts a recoverable asset into a loss, which is why concentration limits exist.

OSFI's B-3 sound reinsurance practices expectations require:

1. A documented reinsurance risk management policy.
2. Due diligence on counterparties.
3. Limits on concentration.
4. Confirmation that ceded risks are within the insurer's stated risk appetite.

> [!trap] Treating registration as a credit rating
> Registration gives the cedant capital credit and OSFI oversight of the reinsurer. It says nothing about whether the reinsurer will pay, so a registered reinsurer still needs counterparty analysis.
