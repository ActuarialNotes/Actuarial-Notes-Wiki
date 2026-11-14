---
aliases:
  - Regulatory Framework
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f414ccdd60bd30f791bd8a95a45e64de34492fdff793329cea5be2b3846be429
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Credit for Reinsurance.md
---
**Credit for Reinsurance** is the regulatory rule that decides whether a ceding insurer may reduce its statutory [[Reserve|reserves]], or count a reinsurance asset, for the business it has ceded. It decides whether a [[Reinsurance Transaction|reinsurance transaction]] gives the cedant any capital relief.

Regulators allow full credit when they can supervise or rely on the reinsurer, and otherwise require collateral that the cedant can reach if the reinsurer does not pay. For a reserve $R$ ceded to a reinsurer that must post collateral $C$, the credit is

> $$\text{Credit} = \min(R,\ C)$$

The cedant's reserves after the credit are

> $$V_{\text{net}} = V_{\text{gross}} - \sum \text{Credit}$$

- $V_{\text{gross}}$ is the cedant's reserve before credit for reinsurance.
- The sum runs over every reinsurer the cedant cedes to.

The cedant stays liable to its policyholders whatever happens to the reinsurer. The credit rules protect those policyholders, and they decide whether a transaction designed for capital relief achieves it. Full credit means the regulator relies on the reinsurer's supervision. It does not remove the cedant's credit risk, which still needs counterparty limits and monitoring.

## United States

In the U.S. the rules follow the NAIC's Credit for Reinsurance Model Law and Regulation. Whether a reinsurer is authorized is decided by the cedant's domiciliary state, so a reinsurer licensed in another state may still be unauthorized for this cedant. The categories are:

| Reinsurer | Collateral for full credit |
| :--- | :--- |
| Licensed in the cedant's state of domicile | None |
| Accredited, meeting the state's filing and solvency standards | None |
| Domiciled in a state with substantially similar credit rules | None |
| Certified, by its rating and its home supervisor | Reduced |
| From a reciprocal jurisdiction, meeting minimum capital and solvency standards | None |
| Any other (unauthorized) | The full ceded reserve |

A certified reinsurer with collateral ratio $c$ must post, for full credit,

> $$C_{\text{req}} = c \times R$$

- $c$ falls as the reinsurer's rating improves.

The U.S. covered agreements with the European Union and the United Kingdom removed collateral and local presence requirements for qualifying reinsurers on each side. The NAIC put them into effect through the reciprocal jurisdiction category, and a state law inconsistent with an agreement can be preempted.

> [!example]- What reserve credit does this insurer take, and what are its net reserves? {Example}
> A U.S. life insurer holds gross reserves of $\$500$ million and cedes $\$300$ million of them:
>
> | Reinsurer | Ceded reserve ($ millions) | Collateral |
> | :--- | ---: | :--- |
> | Licensed in its state | 100 | None |
> | Certified, illustrative collateral ratio 20% | 80 | $\$16$ million in trust |
> | Unauthorized offshore | 70 | $\$50$ million letter of credit |
> | Reciprocal jurisdiction | 50 | None |
>
> > [!answer]-
> > - The licensed and reciprocal jurisdiction cessions earn full credit, $\$100$ million and $\$50$ million.
> > - The certified reinsurer must post $0.20 \times 80 = \$16$ million, which it has, so its cession earns the full $\$80$ million.
> > - The unauthorized cession earns $\min(70,\ 50) = \$50$ million.
> > - The credit is $100 + 80 + 50 + 50 = \$280$ million.
> > - Net reserves are $500 - 280 = \$220$ million, against $\$200$ million with full credit.
> > - The $\$20$ million of credit it cannot take lowers statutory surplus by $\$20$ million, even though the treaty is in force. A larger letter of credit, funds withheld, or a certified or reciprocal jurisdiction reinsurer would restore it.

## Acceptable collateral

Collateral includes assets in a trust for the cedant's benefit, clean and irrevocable letters of credit from qualified banks, and funds withheld by the cedant. Under modified coinsurance and funds withheld the cedant already holds the assets, which is why those forms are used with offshore and unauthorized reinsurers. Under modco the cedant keeps both the reserve and the assets, so it takes no reserve credit for the ceded share, and the question of collateral does not arise as it does for coinsurance. See [[Reinsurance Credit Risk]].

## Canada

[[Registered Reinsurance|Registered reinsurers]] are supervised by [[OSFI]], and cessions to them reduce the cedant's capital requirement in full. Cessions to [[Unregistered Reinsurance|unregistered reinsurers]] earn capital credit only to the extent of collateral held in Canada under a security agreement. OSFI expects every cedant to manage its reinsurance risk under a documented policy.

## Solvency II

Under [[Solvency II]], a reinsurer based in a third country whose solvency regime has been found equivalent is treated like an EU reinsurer, so no collateral can be required from it. Credit elsewhere is reflected through the counterparty default risk charge on the reinsurance recoverable.

> [!trap] Taking credit for the whole ceded reserve
> An unauthorized cession earns credit only up to its collateral. Taking credit for the full ceded reserve overstates the cedant's surplus by the shortfall, $\$20$ million in the example.
