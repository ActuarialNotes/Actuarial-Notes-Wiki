---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:5fb1ed723e682b868acab1ae5aa6a1d4e0400ac30c626906eb0a260a0679f417
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §2.3.1, §4.2.1, §4.3.2.2, §4.3.3.1, §4.3.3.2, §4.3.3.3, §4.3.3.4, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Unregistered Reinsurance.md
---
![[Media/Figures/Unregistered_Reinsurance.svg|340]]

**Unregistered Reinsurance** is reinsurance ceded to a reinsurer that is not licensed by [[OSFI]] to reinsure in Canada, typically an offshore reinsurer or a foreign parent. It is permitted, but the [[MCT]] gives no capital credit for the ceded liabilities unless the cession is secured by acceptable collateral, so the capital credit for a cession is

> $$\text{Capital credit} = \min\bigl(\text{Ceded liabilities},\; \text{Acceptable collateral}\bigr)$$

- $\text{Ceded liabilities}$ is the amount recoverable from the unregistered reinsurer.
- $\text{Acceptable collateral}$ is the amount secured by assets held in trust in Canada, letters of credit from an acceptable financial institution, or funds withheld (premium the cedant retains rather than paying over, offsetting the recoverable).

The amount recoverable that is not covered by acceptable collateral is deducted from [[Capital Available]]. OSFI imposes the restriction because it cannot examine or intervene in a reinsurer outside its jurisdiction, and cannot compel it to pay. Collateral puts an enforceable asset in place of the supervision OSFI cannot exercise.

> [!example]- Should this insurer pay for the collateral? {Example}
> An insurer cedes $\$50$ million of liabilities to an unregistered reinsurer. The treaty costs $\$18$ million with no collateral, or $\$19.1$ million with a letter of credit securing the full $\$50$ million. The insurer's cost of capital is $10\%$. Assume the letter of credit is acceptable and within the guideline's aggregate limit on letters of credit, and ignore the capital requirement on the collateral itself.
>
> > [!answer]-
> > - Without collateral, the whole $\$50$ million recoverable is deducted from capital available. The letter of credit removes that deduction.
> > - At a $10\%$ cost of capital, the released capital is worth $0.10 \times \$50\text{M} = \$5\text{M}$ a year.
> > - The collateral costs $\$19.1\text{M} - \$18\text{M} = \$1.1\text{M}$.
> > - On the capital arithmetic, the collateralised treaty is cheaper: $\$1.1$ million to save $\$5$ million of capital cost.
> > - The capital is worth less than $10\%$ if the insurer's MCT ratio is comfortably above its internal target, and far more if the ratio is near target.
> > - Without collateral, the recoverable depends on an offshore counterparty's willingness and ability to pay, enforceable only through foreign courts.
> > - Take the collateralised treaty unless the capital is not needed and the counterparty is strong.

## Why insurers use it

Unregistered reinsurance gives access to global reinsurance capacity that is not licensed in Canada, to intra-group cessions to a foreign parent, and to specialist capacity for catastrophe, aviation and other lines with few registered markets.

Collateral is expensive. Letters of credit carry fees and use the reinsurer's own credit lines, and funds withheld reduce the reinsurer's investable assets, which it prices into the treaty. An uncollateralised cession is cheaper in premium and gives no capital credit.

## Collectability risk

Collectability risk is higher than for a registered reinsurer, and not only from insolvency. Enforcement across jurisdictions is slow and expensive, and a dispute with a reinsurer outside Canada is harder to pursue. Under [[IFRS 17]] this risk is reflected in the non-performance risk allowance on the [[Reinsurance Contracts Held|reinsurance asset]].

OSFI's reinsurance expectations require the insurer to be satisfied that ceded risk is genuinely transferred and recoverable. For unregistered cessions this means documented collateral arrangements and counterparty due diligence. Several cessions to the same reinsurer can together breach the insurer's own counterparty limits.

> [!trap] Pricing only the premium
> Comparing treaty premiums alone favours the uncollateralised treaty. Count the capital deduction it brings: on the example's figures, $\$1.1$ million of collateral cost saves $\$5$ million a year of capital cost.
