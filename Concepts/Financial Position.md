---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:8db81ec86b452799f91797ca7579150a5eeade38fc00c3f0272efe2f67fc6965
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Financial Position.md
---

![[Media/Figures/Financial_Position.svg|340]]

**Financial Position** is an insurer's assets, liabilities and equity at a point in time, as reported in its statement of financial position, the balance sheet. The balance sheet balances, so

> $$\text{Assets} = \text{Liabilities} + \text{Equity}$$

- $\text{Equity}$ is share capital, retained earnings and accumulated other comprehensive income.

Accumulated other comprehensive income is where unrealised gains on investments measured at fair value through OCI accumulate, and, if the [[Other Comprehensive Income Option|OCI option]] is elected, the effect of discount rate changes on the insurance liabilities.

## Assets and liabilities under IFRS 17

[[IFRS 17]] changed the balance sheet of an insurer in three ways:

1. Unearned premium and deferred acquisition costs are no longer shown. They are part of the [[Liability for Remaining Coverage]].
2. Reinsurance moved to the asset side as a separate [[Reinsurance Contracts Held|reinsurance contract asset]].
3. Claim liabilities are carried at present value plus a [[Risk Adjustment for Non-Financial Risk|risk adjustment]].

The principal assets of a Canadian P&C insurer are invested assets (mostly bonds, some equities, and cash), premiums receivable, reinsurance contract assets, deferred tax assets, and property and equipment. The investment mix is constrained by the need to match the [[Duration|duration]] of the liabilities and by the [[MCT]]'s [[Market Risk Margin|market risk]] charges.

The principal liabilities are the [[Insurance Contract Liabilities|insurance contract liabilities]] (the [[Liability for Remaining Coverage|LRC]] plus the [[Liability for Incurred Claims|LIC]]), payables and any debt.

Because reinsurance is no longer netted, an insurer that cedes heavily reports a larger balance sheet on both sides than it did before IFRS 17, with no change in its economics. A comparison across the transition date must allow for this gross-up.

## Equity and capital available

[[Capital Available|Capital available]] starts from equity and applies regulatory adjustments. They deduct goodwill, intangibles and certain deferred tax assets, and adjust for other items OSFI does not accept as able to absorb a loss. Equity and capital available are therefore related but not equal.

> [!example]- What are this insurer's equity and capital available? {Example}
> An insurer reports:
>
> | Item | $ millions |
> | :--- | ---: |
> | Total assets | 1,240 |
> | of which goodwill | 40 |
> | of which intangibles | 18 |
> | Total liabilities | 980 |
> | Deferred tax assets that rely on future profitability | 12 |
>
> Its minimum capital required is $\$120$ million.
>
> > [!answer]-
> > - Equity is $1{,}240 - 980 = \$260$ million.
> > - Goodwill and intangibles cannot be sold to pay claims, so they are deducted.
> > - A deferred tax asset that depends on future profits is worth nothing when the insurer is unprofitable, which is when capital is needed, so it is deducted too.
> > - Capital available is $260 - 40 - 18 - 12 = \$190$ million, 27% less than equity.
> > - The [[MCT]] ratio is $190/120 = 158\%$, not the $217\%$ that equity would suggest.

An acquisition that creates goodwill therefore consumes regulatory capital dollar for dollar, although it leaves accounting equity unchanged.

A balance sheet can also show ample equity while its assets are illiquid relative to a catastrophe's payment pattern. This is why the [[FCT]] tests cash flows and not only capital.

> [!trap] Reading equity as capital available
> The MCT is measured on capital available, not on the equity the balance sheet shows. Deduct goodwill, intangibles and deferred tax assets that rely on future profits before computing a ratio.
