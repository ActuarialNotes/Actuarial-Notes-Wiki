---
aliases:
  - Regulatory Framework
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f8ae5f9673e3c190d7ba5e5f080d0c072e6e2a90605122f1bba6888c084ce521
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Credit for Reinsurance.md
---
**Credit for Reinsurance** is the regulatory rule that decides whether a ceding insurer may reduce its statutory [[Reserve|reserves]], or count a reinsurance asset, for the business it has ceded, and so whether a [[Reinsurance Transaction|reinsurance transaction]] gives it any capital relief. Regulators allow full credit when they can supervise or rely on the reinsurer, and otherwise require collateral that the cedant can reach if the reinsurer does not pay. In the U.S. the rules follow the NAIC's Credit for Reinsurance Model Law and Regulation, in Canada they turn on whether the reinsurer is registered with [[OSFI]], and under [[Solvency II]] they turn on the reinsurer's home regime.

> $$\text{Credit} = \min(R,\ C)$$

> $$C_{\text{req}} = c \times R$$

> $$V_{\text{net}} = V_{\text{gross}} - \sum \text{Credit}$$

- **Symbols:** $R$ is the reserve, or the obligation, ceded to one reinsurer, and $C$ is the acceptable collateral securing it. For a reinsurer that must post collateral, the first block caps the credit at the collateral. $c$ is the collateral ratio that applies to a certified reinsurer, which falls as its rating improves, and $C_{\text{req}}$ is the collateral it must post for full credit. $V_{\text{gross}}$ and $V_{\text{net}}$ are the cedant's reserves before and after the credit.
- **U.S. categories:** Full credit without collateral is allowed for a reinsurer licensed in the cedant's state of domicile, for an accredited reinsurer that meets the state's filing and solvency standards, and for one domiciled in a state with substantially similar credit rules. A certified reinsurer posts reduced collateral based on its rating and its home supervisor, and a reinsurer from a reciprocal jurisdiction that meets minimum capital and solvency standards posts none. Any other, unauthorized, reinsurer gets credit only up to the collateral it posts.
- **Acceptable collateral:** Collateral includes assets in a trust for the cedant's benefit, clean and irrevocable letters of credit from qualified banks, and funds withheld by the cedant. Under modified coinsurance and funds withheld the cedant already holds the assets, which is why those forms are used with offshore and unauthorized reinsurers. See [[Reinsurance Credit Risk]].
- **Covered agreements:** The U.S. covered agreements with the European Union and the United Kingdom removed collateral and local presence requirements for qualifying reinsurers on each side. The NAIC put them into effect through the reciprocal jurisdiction category, and a state law inconsistent with an agreement can be preempted.
- **Canada:** [[Registered Reinsurance|Registered reinsurers]] are supervised by OSFI, and cessions to them reduce the cedant's capital requirement in full. Cessions to [[Unregistered Reinsurance|unregistered reinsurers]] earn capital credit only to the extent of collateral held in Canada under a security agreement, and OSFI expects every cedant to manage its reinsurance risk under a documented policy.
- **Solvency II:** A reinsurer based in a third country whose solvency regime has been found equivalent is treated like an EU reinsurer, so no collateral can be required from it. Credit elsewhere is reflected through the counterparty default risk charge on the reinsurance recoverable.
- **Why the rules matter:** The cedant stays liable to its policyholders whatever happens to the reinsurer. The credit rules protect those policyholders, and they decide whether a transaction designed for capital relief achieves it.

> [!example]- Reserve Credit Across Four Reinsurers {Example}
> A U.S. life insurer holds gross reserves of \$500 million and cedes \$300 million of them: \$100 million to a reinsurer licensed in its state, \$80 million to a certified reinsurer with an illustrative collateral ratio of 20% that has posted \$16 million in trust, \$70 million to an unauthorized offshore reinsurer backed by a \$50 million letter of credit, and \$50 million to a reinsurer that qualifies under a reciprocal jurisdiction. Find the credit, the net reserves and the effect on statutory surplus.
>
> > [!answer]-
> > The certified reinsurer has posted its required collateral, $0.20 \times 80 = 16$, so the cession earns full credit. The unauthorized cession earns credit only up to the letter of credit.
> > $$
> > \begin{align*}
> > \text{Credit} &= 100 + 80 + \min(70,\ 50) + 50 \\
> > &= 280 \\
> > V_{\text{net}} &= 500 - 280 \\
> > &= 220
> > \end{align*}
> > $$
> > The insurer reports net reserves of \$220 million rather than the \$200 million full credit would give. The \$20 million of reserve credit it cannot take lowers its statutory surplus by \$20 million, even though the treaty is in force and the reinsurer may well pay. Raising the letter of credit to \$70 million, moving the cession to funds withheld, or placing it with a certified or reciprocal jurisdiction reinsurer would restore the credit.

> [!tip]- How it appears on the exam
> - **CP-341:** Questions ask candidates to describe and compare the regulatory frameworks for reinsurance transactions across U.S., Canadian and global jurisdictions. A case describes a proposed treaty, often with an offshore or affiliated reinsurer, and the answer explains whether the cedant receives credit, what collateral is needed, and how the form of the treaty, such as coinsurance, modified coinsurance or funds withheld, changes the answer.
> - **Calculations:** Short calculations give the reserve credit or capital relief from a set of cessions, as in the example, and the effect on the cedant's surplus or capital ratio.

> [!warning]- Exam traps
> - **Credit is capped by collateral:** An unauthorized cession earns credit only up to its collateral. Taking credit for the full ceded reserve overstates the cedant's surplus by the shortfall.
> - **The category depends on the cedant's regulator:** Whether a reinsurer is authorized is decided by the cedant's domiciliary state, or OSFI for a Canadian cedant, not by where the reinsurer is licensed. A reinsurer licensed in another state may still be unauthorized for this cedant.
> - **Registration is not strength:** Full credit for a registered, licensed or reciprocal jurisdiction reinsurer means the regulator relies on its supervision. It does not remove the cedant's credit risk, which still needs counterparty limits and monitoring.
> - **Modified coinsurance and reserve credit:** Under modco the cedant keeps both the reserve and the assets, so it takes no reserve credit for the ceded share. The question of collateral does not arise in the same way as it does for coinsurance.
