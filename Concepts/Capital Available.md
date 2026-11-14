---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:d0569cf68b47b675d801afff6e4473d7bbcc5d2db5419a99d1a0dffd13466d06
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Capital Available.md
---

![[Media/Figures/Capital_Available.svg|340]]

**Capital Available** is the capital an insurer holds that is available to absorb losses, and the numerator of the [[MCT]] ratio. It starts from accounting equity, applies regulatory adjustments and deductions for items that would not absorb a loss, and classifies what remains into quality tiers.

Capital available is

> $$\text{Capital Available} = \text{Category A} + \text{Category B} - \text{Deductions}$$

- $\text{Category A}$ is the highest-quality capital, such as common shares, retained earnings and [[Comprehensive Income|accumulated other comprehensive income]], which is permanently available and freely usable to absorb losses.
- $\text{Category B}$ is capital with more limited loss absorbency, such as certain preferred shares and subordinated debt. Category B and Category C instruments are subject to limits relative to Category A.
- $\text{Deductions}$ are the regulatory deductions for items that would not in fact absorb a loss.

> [!example]- What is this insurer's capital available? {Example}
> An insurer's equity is $\$340$ million: common shares $\$120$ million, retained earnings $\$185$ million and accumulated OCI $\$35$ million. It has $\$50$ million of subordinated debt that qualifies as Category B. Its goodwill is $\$45$ million, its intangible assets $\$22$ million, and its deferred tax assets that depend on future profitability $\$16$ million.
>
> > [!answer]-
> > - Category A is $\$120\text{M} + \$185\text{M} + \$35\text{M} = \$340\text{M}$.
> > - The deductions are $\$45\text{M} + \$22\text{M} + \$16\text{M} = \$83\text{M}$.
> > - Capital available is $\$340\text{M} + \$50\text{M} - \$83\text{M} = \$307\text{M}$.

## Deductions

Every question about whether an item counts comes down to one test: would it absorb a loss when the insurer is in trouble? Common equity would. The principal deductions are the items that would not:

1. Goodwill and intangible assets, which cannot be sold to pay claims.
2. Deferred tax assets that depend on future profitability, which are worthless exactly when they are needed.
3. Interests in unconsolidated financial institutions.
4. Certain other assets OSFI does not accept.

The deductions can be large. An acquisitive insurer's goodwill reduces its capital available dollar for dollar while leaving its accounting equity untouched, so a strong balance sheet can still produce a weak MCT ratio.

## What changes capital available

Capital available moves with the income statement and with markets. Losses and dividends reduce it. Unrealised losses on FVOCI investments reduce it through OCI. Under [[IFRS 17]], an [[Onerous Contract|onerous group]]'s loss reduces it in the year the business is written.

> [!example]- The insurer above, with capital available of $\$307$ million and minimum capital required of $\$180$ million, has a $\$30$ million unrealised loss on its FVOCI bonds. What happens to its MCT ratio? {Example}
> - The loss is recognised in OCI, so accumulated OCI falls from $\$35\text{M}$ to $\$5\text{M}$.
> - Capital available falls to $\$307\text{M} - \$30\text{M} = \$277\text{M}$, about $10\%$ lower.
> - The MCT ratio falls from $\$307\text{M}/\$180\text{M} = 171\%$ to $\$277\text{M}/\$180\text{M} = 154\%$, close to the $150\%$ [[Supervisory Target Capital Ratio|supervisory target]], for a reason unrelated to underwriting.
> - Selling the bonds would only realise the loss. If the insurer has elected the [[Other Comprehensive Income Option|OCI option]] on its liabilities, the gain on its liabilities at higher interest rates also runs through OCI, and the net effect is only the duration mismatch.

> [!trap] Treating accounting equity as capital available
> Equity of $\$340$ million is not capital available of $\$340$ million. Add qualifying Category B capital and subtract the deductions first: goodwill, intangibles and profit-dependent deferred tax assets absorb no loss.
