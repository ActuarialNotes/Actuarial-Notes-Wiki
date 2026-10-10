---
aliases:
  - Captive Reinsurance Transaction
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0656fb8dbf6fd07d8512943fb8e3b890e85d1a700aa55cef4646b6c0fb503e5e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Captive Reinsurance.md
---
**Captive Reinsurance** in life insurance is reinsurance ceded by an insurer to a reinsurer owned by its own group, usually a special purpose captive formed under a U.S. state's captive law or offshore, so that the group can finance statutory reserves on terms its main insurer could not get. Its classic use is the redundant reserve that Regulation XXX requires on level premium term life and that Actuarial Guideline 38 (AXXX) requires on universal life with secondary guarantees. The captive holds assets for the economic part of the reserve and funds the rest with letters of credit, credit-linked notes or other financing that costs much less than equity capital. A related structure, the sidecar, is a vehicle in which outside investors provide capital to take a share of a reinsurer's business.

> $$V^{\text{red}} = V^{\text{stat}} - V^{\text{econ}}$$

> $$\text{PS} \ge \text{RLPS}$$

> $$\text{PS} + \text{OS} \ge V^{\text{stat}}$$

- **Symbols:** $V^{\text{stat}}$ is the formulaic statutory reserve, $V^{\text{econ}}$ the reserve that a realistic, prudent valuation would give, and $V^{\text{red}}$ the redundant part between them. Under Actuarial Guideline 48 (AG48), $\text{RLPS}$ is the Required Level of Primary Security, computed with a VM-20-based actuarial method. $\text{PS}$ is the primary security held, such as cash and qualifying securities, and $\text{OS}$ is the other security that can cover the rest, such as letters of credit.
- **Why reserves are redundant:** XXX and AXXX reserves use conservative mortality, lapse and interest assumptions and long guarantee periods, so they exceed what the business is expected to need. Funding the excess with equity raises the price of term and secondary guarantee products, and captives arose from about 2000 onward to finance it instead.
- **How the structure works:** The cedant coinsures the block to its captive and takes full credit for the reserve, because the captive is licensed in the cedant's state or posts the required security. The captive holds assets for the economic reserve and counts a letter of credit, a credit-linked note or a parental guarantee for the redundant part. Some of these sources are admitted under the captive state's law or a permitted practice even though a commercial insurer could not count them.
- **AG48 limits:** For business issued from 2015 and ceded to a captive, AG48 requires primary security of at least the RLPS, and lets other security cover only the excess up to the statutory reserve. It also limits what counts as primary security, excluding synthetic letters of credit and contingent notes. The NAIC later carried these rules into its Term and Universal Life Insurance Reserve Financing Model Regulation.
- **Principles-based reserving:** Policies valued under [[Principles-Based Reserving|VM-20]] carry smaller redundancies than XXX and AXXX, which reduced the need for new reserve financing captives. Captives remain for older business, for variable annuity guarantees and long-term care, and for affiliated offshore reinsurance.
- **Sidecars:** A sidecar takes a quota share of a reinsurer's business, often asset-intensive annuities, with third-party investors providing most of its capital. It lets the reinsurer write more business than its own capital supports and gives investors a defined exposure to insurance returns.
- **Risks:** The cedant's surplus depends on the financing staying in place, and a letter of credit usually renews over a shorter term than the liabilities run. Parental guarantees bring the risk back into the group, and the structures are hard for outsiders to see through. Captive transactions were criticized as shadow insurance for overstating capital. U.S. tax law adds a cost when an affiliate is foreign, since reinsurance premiums paid to a foreign related party can be subject to the base erosion and anti-abuse tax (BEAT).

> [!example]- Financing a Redundant Term Reserve Through a Captive {Example}
> A life insurer holds a Regulation XXX reserve of \$500 million on a block of 20-year level term. A VM-20-based calculation of the RLPS gives \$300 million. The insurer coinsures the block to its captive, which holds \$300 million of qualifying securities and a \$200 million letter of credit. The letter of credit costs 0.75% a year. The alternative is to fund the redundancy with equity, where the group's cost of capital is 10% and the capital would earn 3.5% after tax. With these illustrative figures, check AG48, find the effect on the cedant's surplus and compare the annual cost of the two ways of funding.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > V^{\text{red}} &= 500 - 300 \\
> > &= 200 \\
> > \text{PS} &= 300 \ge \text{RLPS} = 300 \\
> > \text{PS} + \text{OS} &= 300 + 200 \\
> > &= 500
> > \end{align*}
> > $$
> > The captive meets AG48, so the cedant takes credit for the full \$500 million. It transfers only \$300 million of assets, so its surplus rises by \$200 million, before tax and before any capital it puts into the captive.
> > $$
> > \begin{align*}
> > \text{Cost}_{\text{LOC}} &= 0.0075 \times 200 \\
> > &= 1.5 \\
> > \text{Cost}_{\text{equity}} &= (0.10 - 0.035) \times 200 \\
> > &= 13.0
> > \end{align*}
> > $$
> > Funding the redundancy costs \$1.5 million a year through the captive against \$13.0 million with equity. The saving is why the structures spread, and the dependence on the letter of credit renewing is the risk that comes with it.

> [!tip]- How it appears on the exam
> - **CP-341:** Written questions ask for the types of captive and sidecar, what they are used for and how they work, and the risks they bring to the cedant, its group and policyholders. They also ask how AG48, the reserve financing model regulation and principles-based reserving changed their use.
> - **Calculations:** A short calculation gives the statutory and economic reserves and the financing in place. It asks whether AG48 is met, how much surplus the cedant gains and what the financing saves.

> [!warning]- Exam traps
> - **Primary security covers the economic reserve:** Under AG48, letters of credit and other security cover only the part above the RLPS. Using them to cover the whole statutory reserve fails the test.
> - **The risk stays in the group:** A captive moves reserves within the group, not out of it. On a consolidated basis the liabilities are unchanged, and a parental guarantee puts the parent on the hook.
> - **Renewal risk:** A letter of credit for five or ten years backs liabilities that run for twenty or more. If it is not renewed, the cedant may lose the credit and need capital at the worst time.
> - **Sidecars are not captives:** A sidecar is funded largely by outside investors and takes a share of the business, while a captive is the group's own vehicle for financing its reserves.
