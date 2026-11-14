---
aliases:
  - Captive Reinsurance Transaction
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9fc97c9d45c4f5703194dd9f6761bb6254f371a6c8a81068ec68463c831218c2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Captive Reinsurance.md
---
**Captive Reinsurance** in life insurance is reinsurance ceded by an insurer to a reinsurer owned by its own group, usually a special purpose captive formed under a U.S. state's captive law or offshore. It lets the group finance statutory reserves on terms its main insurer could not get.

Its classic use is the redundant reserve that Regulation XXX requires on level premium term life and that Actuarial Guideline 38 (AXXX) requires on universal life with secondary guarantees. The redundant part of a reserve is

> $$V^{\text{red}} = V^{\text{stat}} - V^{\text{econ}}$$

- $V^{\text{stat}}$ is the formulaic statutory reserve.
- $V^{\text{econ}}$ is the reserve that a realistic, prudent valuation would give.

XXX and AXXX reserves use conservative mortality, lapse and interest assumptions and long guarantee periods, so they exceed what the business is expected to need. Funding the excess with equity raises the price of term and secondary guarantee products. Captives arose from about 2000 onward to finance it instead.

## How a captive transaction works

The cedant coinsures the block to its captive and takes full credit for the reserve, because the captive is licensed in the cedant's state or posts the required security. The captive holds assets for the economic reserve. It funds the redundant part with a letter of credit, a credit-linked note or a parental guarantee, which cost much less than equity capital. Some of these sources are admitted under the captive state's law or a permitted practice even though a commercial insurer could not count them.

## Actuarial Guideline 48

For business issued from 2015 and ceded to a captive, Actuarial Guideline 48 (AG48) requires the primary security held, $\text{PS}$, such as cash and qualifying securities, to be at least the Required Level of Primary Security. The first test is

> $$\text{PS} \ge \text{RLPS}$$

- $\text{RLPS}$ is the Required Level of Primary Security, computed with a VM-20-based actuarial method.

Other security, $\text{OS}$, such as letters of credit, may cover only the excess up to the statutory reserve. The second test is

> $$\text{PS} + \text{OS} \ge V^{\text{stat}}$$

AG48 also limits what counts as primary security, excluding synthetic letters of credit and contingent notes. The NAIC later carried these rules into its Term and Universal Life Insurance Reserve Financing Model Regulation.

> [!example]- Does this captive meet AG48, and what does the financing save each year compared with equity? {Example}
> A life insurer holds a Regulation XXX reserve of $\$500$ million on a block of 20-year level term, and a VM-20-based calculation gives an RLPS of $\$300$ million. It coinsures the block to its captive, which holds $\$300$ million of qualifying securities and a $\$200$ million letter of credit. The letter of credit costs 0.75% a year. Funding the redundancy with equity instead would cost the group 10% a year, and the capital would earn 3.5% after tax. The figures are illustrative.
>
> > [!answer]-
> > - The redundant reserve is $500 - 300 = \$200$ million.
> > - Primary security of $\$300$ million equals the RLPS, so the first test is met.
> > - Primary and other security total $300 + 200 = \$500$ million, the whole statutory reserve, so the second test is met.
> > - The cedant takes credit for the full $\$500$ million but transfers only $\$300$ million of assets, so its surplus rises by $\$200$ million, before tax and before any capital it puts into the captive.
> > - The letter of credit costs $0.0075 \times 200 = \$1.5$ million a year.
> > - Equity would cost $(0.10 - 0.035) \times 200 = \$13.0$ million a year.
> > - The captive meets AG48 and saves $\$11.5$ million a year. The risk that comes with the saving is that the letter of credit may not be renewed.

## Principles-based reserving

Policies valued under [[Principles-Based Reserving|VM-20]] carry smaller redundancies than XXX and AXXX, which reduced the need for new reserve financing captives. Captives remain for older business, for variable annuity guarantees and long-term care, and for affiliated offshore reinsurance.

## Sidecars

A sidecar is a vehicle in which outside investors provide most of the capital to take a quota share of a reinsurer's business, often asset-intensive annuities. It lets the reinsurer write more business than its own capital supports and gives investors a defined exposure to insurance returns. A sidecar differs from a captive, which is the group's own vehicle for financing its reserves.

## Risks of captive reinsurance

A captive moves reserves within the group, not out of it. On a consolidated basis the liabilities are unchanged, and a parental guarantee brings the risk back to the parent. The cedant's surplus depends on the financing staying in place, and a letter of credit for five or ten years backs liabilities that run for twenty or more. If it is not renewed, the cedant may lose the credit and need capital at the worst time.

The structures are hard for outsiders to see through, and captive transactions were criticized as shadow insurance for overstating capital. U.S. tax law adds a cost when an affiliate is foreign, since reinsurance premiums paid to a foreign related party can be subject to the base erosion and anti-abuse tax (BEAT).

> [!trap] Covering the whole reserve with other security
> Under AG48, letters of credit and other security cover only the part of the reserve above the RLPS. A captive that holds $\$200$ million of securities and a $\$300$ million letter of credit against a $\$500$ million reserve with an RLPS of $\$300$ million fails the first test, even though the total reaches the statutory reserve.
